import { cookies } from "next/headers";

export default async function getSession() {
    const cookieStore = await cookies();

    const res = await fetch(
        "http://localhost:5000/api/auth/get-session",
        {
            headers: {
                cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    return res.json();
}