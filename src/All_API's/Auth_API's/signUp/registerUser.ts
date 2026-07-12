const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Register User
export const registerUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  profilePicture: string;
}) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
};