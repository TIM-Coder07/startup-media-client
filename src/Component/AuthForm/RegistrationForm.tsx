"use client";

import { useState } from "react";
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
import { uploadImage } from "@/All_API's/Auth_API's/signUp/ImageBBAPI";
import { registerUser } from "@/All_API's/Auth_API's/signUp/registerUser";
import Link from "next/link";

export default function RegistrationForm() {
  const [preview, setPreview] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const image = formData.get("profilePicture") as File;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    let profilePicture = "";

    if (image && image.size > 0) {
      profilePicture = await uploadImage(image);
    }

    const userData = {
      fullName,
      email,
      password,
      profilePicture,
    };

    const result = await registerUser(userData);
    console.log('Registered userData:', result);
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl border bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Create Account
      </h2>

      <Form className="space-y-5" onSubmit={handleSubmit}>
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
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
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
          <Description>Minimum 8 characters.</Description>
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
          <Label>Profile Picture</Label>

          <input
            className="block w-full rounded-lg border p-2"
            type="file"
            name="profilePicture"
            accept="image/*"
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
              className="h-28 w-28 rounded-full object-cover border"
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

      <p className=" mt-2">Already you have an account ? <Link className=" text-blue-500 hover:underline" href="/login">Login</Link></p>
    </div>
  );
}