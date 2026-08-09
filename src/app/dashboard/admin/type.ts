export type FounderProfile = {
    _id?: string;

    name: string;
    email: string;
    industry: string;
    experience: string;
    location: string;
    linkedin: string;
    profileImage: string;

    skills: string[];

    bio: string;

    status?: "pending" | "approved" | "rejected";

    createdAt?: string;
    updatedAt?: string;
};
