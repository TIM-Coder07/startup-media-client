"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { Check } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/All_API's/Auth_API's/ImageBBAPI";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const [preview, setPreview] = useState("");
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const role = formData.get("role") as string;
    const image = formData.get("profilePicture") as File;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    let profilePicture = "";

    if (image && image.size > 0) {
      profilePicture = await uploadImage(image);
    }

    // Better Auth Signup
    const { data, error } = await authClient.signUp.email({
      name: fullName,
      email,
      password,
      fetchOptions: {
        body: {
          role,
          profilePicture,
        },
      },
    });

    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/users/profile",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          profilePicture,
        }),
      }
    );

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl border bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h2>

      <Form
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        <TextField isRequired name="fullName">
          <Label>Full Name</Label>
          <Input placeholder="Enter your full name" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                value
              )
            ) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters.";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="********" />
          <Description>
            Minimum 8 characters.
          </Description>
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="confirmPassword"
          type="password"
        >
          <Label>Confirm Password</Label>
          <Input placeholder="********" />
          <FieldError />
        </TextField>

        <div className="space-y-2">
          <Label>Role</Label>

          <select
            name="role"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="user">User</option>
            <option value="investor">Investor</option>
            <option value="founder">Founder</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Profile Picture</Label>

          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            className="block w-full rounded-lg border p-2"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-28 w-28 rounded-full border object-cover"
            />
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Check className="mr-2 h-4 w-4" />
          Register
        </Button>
      </Form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}