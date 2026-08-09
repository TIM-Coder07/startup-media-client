import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Mail,
  MapPin,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";

type CoFounder = {
  _id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  experience: string;
  bio: string;
  industry: string;
  location: string;
  linkedin: string;
  profileImage: string;
  createdAt: string;
};

const CoFounderDetailsCard = ({ coFounder }: { coFounder: CoFounder }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12">
      <div className="mx-auto max-w-6xl px-5">

        {/* Back Button */}
        <Link
          href="/founders"
          className="mb-8 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Founders
        </Link>

        {/* Hero Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="h-40 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600"></div>

          <div className="relative px-8 pb-8">
            <Image
              src={coFounder.profileImage}
              alt={coFounder.name}
              width={150}
              height={150}
              className="-mt-20 rounded-full border-8 border-white object-cover shadow-lg"
            />

            <div className="mt-5">
              <h1 className="text-4xl font-bold text-slate-900">
                {coFounder.name}
              </h1>

              <p className="mt-2 text-lg text-indigo-600">
                {coFounder.role}
              </p>

              <p className="mt-4 max-w-3xl leading-8 text-gray-600">
                {coFounder.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow">
            <Briefcase className="mb-3 text-indigo-600" />
            <p className="text-sm text-gray-500">Industry</p>
            <h3 className="mt-1 font-semibold">
              {coFounder.industry}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <Clock className="mb-3 text-emerald-600" />
            <p className="text-sm text-gray-500">Experience</p>
            <h3 className="mt-1 font-semibold">
              {coFounder.experience}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <MapPin className="mb-3 text-rose-500" />
            <p className="text-sm text-gray-500">Location</p>
            <h3 className="mt-1 font-semibold">
              {coFounder.location}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <Mail className="mb-3 text-amber-500" />
            <p className="text-sm text-gray-500">Email</p>
            <h3 className="break-all font-semibold">
              {coFounder.email}
            </h3>
          </div>

        </div>

        {/* Skills */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Skills & Expertise
          </h2>

          <div className="flex flex-wrap gap-3">
            {coFounder.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-indigo-100 px-5 py-2 font-medium text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-8 text-white shadow-xl">

          <h2 className="text-3xl font-bold">
            Interested in collaborating?
          </h2>

          <p className="mt-3 max-w-2xl text-indigo-100">
            Connect with {coFounder.name} to discuss startup ideas,
            partnerships, or investment opportunities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href={`mailto:${coFounder.email}`}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-gray-100"
            >
              Send Email
            </a>

            <Link
              href={coFounder.linkedin}
              target="_blank"
              className="flex items-center gap-2 rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-indigo-700"
            >
              <LiaLinkedin size={18} />
              LinkedIn Profile
            </Link>

          </div>
        </div>

      </div>
    </div>
    );
};

export default CoFounderDetailsCard;