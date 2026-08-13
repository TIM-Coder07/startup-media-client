import { cookies } from "next/headers";
import ProfileContainer from "./ProfileContainer";

const ProfilePage = async () => {
    const cookieStore = await cookies();

    const res = await fetch(
        "http://localhost:5000/api/auth/get-session",
        {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        }
    );

    const session = await res.json();

    console.log("Session:", session.user);

    return (
        <div>
            <ProfileContainer session={session} />
        </div>
    );
};

export default ProfilePage;