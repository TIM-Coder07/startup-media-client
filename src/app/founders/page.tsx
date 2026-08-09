import FounderCard from "./FounderCard";


type Founder = {
    _id: string;

    name: string;
    email: string;
    industry: string;
    experience: string;
    location: string;
    linkedin: string;
    profileImage: string;
    skills: string[];
    bio: string;

    createdAt: string;
};


async function getFounders() {

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/founders`,
        {
            cache: "no-store",
        }
    );


    if (!res.ok) {
        throw new Error(
            "Failed to fetch founders"
        );
    }


    return res.json();
}


export default async function FounderPage() {

    const founders: Founder[] =
        await getFounders();


    return (
        <div className="mx-auto max-w-7xl px-5 py-10">

            <div className="mb-10 text-center">

                <h1 className="text-4xl font-bold">
                    Find a Founder
                </h1>

                <p className="mt-3 text-gray-500">
                    Connect with talented entrepreneurs,
                    developers, designers, and marketers.
                </p>

            </div>


            {founders.length === 0 ? (

                <div className="py-20 text-center">
                    No approved founders available.
                </div>

            ) : (

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {founders.map((founder) => (

                        <FounderCard
                            key={founder._id}
                            founder={founder}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}