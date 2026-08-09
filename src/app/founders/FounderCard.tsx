import Image from "next/image";
import Link from "next/link";

import {
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react";


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
};


type FounderCardProps = {
  founder: Founder;
};


export default function FounderCard({
  founder,
}: FounderCardProps) {

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-6">

        <div className="flex items-center gap-4">

          {/*
                        Using normal img here avoids
                        external hostname problems.
                    */}

          <img
            src={
              founder.profileImage ||
              "/default-avatar.png"
            }
            alt={founder.name}
            className="h-20 w-20 rounded-full border-4 border-white object-cover"
          />


          <div>

            <h2 className="text-xl font-bold text-white">
              {founder.name}
            </h2>

            <p className="text-indigo-100">
              {founder.industry}
            </p>

          </div>

        </div>

      </div>


      {/* Body */}

      <div className="space-y-5 p-6">

        <p className="line-clamp-3 text-sm leading-6 text-gray-600">
          {founder.bio}
        </p>


        <div className="space-y-3 text-sm text-gray-600">

          <div className="flex items-center gap-2">

            <Briefcase
              size={18}
              className="text-indigo-600"
            />

            <span>
              {founder.industry}
            </span>

          </div>


          <div className="flex items-center gap-2">

            <Clock
              size={18}
              className="text-emerald-600"
            />

            <span>
              {founder.experience}
            </span>

          </div>


          <div className="flex items-center gap-2">

            <MapPin
              size={18}
              className="text-rose-500"
            />

            <span>
              {founder.location}
            </span>

          </div>

        </div>


        {/* Skills */}

        <div>

          <h3 className="mb-2 text-sm font-semibold text-gray-800">
            Skills
          </h3>


          <div className="flex flex-wrap gap-2">

            {founder.skills
              ?.slice(0, 3)
              .map((skill) => (

                <span
                  key={skill}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                >
                  {skill}
                </span>

              ))}

          </div>

        </div>


        {/* Buttons */}

        <div className="flex gap-3 pt-3">

          <Link
            href={`/co-founder/${founder._id}`}
            className="flex-1 rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            View Profile
          </Link>


          {founder.linkedin && (

            <Link
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              LinkedIn
            </Link>

          )}

        </div>

      </div>

    </div>
  );
}