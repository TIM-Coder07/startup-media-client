const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginUser) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};