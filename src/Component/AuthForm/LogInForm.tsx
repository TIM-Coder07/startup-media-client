"use client";

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
import { loginUser } from "@/All_API's/Auth_API's/signUp/loginUser";
import Link from "next/link";

export default function LogInForm() {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const userData = {
      email,
      password,
    };

    try {
      const result = await loginUser(userData);

      console.log("Logged in:", result);

      // TODO:
      // Save token
      // Redirect user
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl border bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Welcome Back
      </h2>

      <Form className="space-y-5" onSubmit={handleSubmit}>
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
          <Description>Enter your account password.</Description>
          <FieldError />
        </TextField>

        <Button
          type="submit"
          className="w-full bg-blue-600 text-white hover:bg-blue-700"
        >
          <Check className="mr-2 h-4 w-4" />
          Login
        </Button>
      </Form>
      <p className=" mt-2">You don`t have an account ? <Link className=" text-blue-500 hover:underline" href="/signup">Sign up</Link></p>
    </div>
  );
}