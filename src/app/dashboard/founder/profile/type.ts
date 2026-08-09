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

    createdAt?: string;
};