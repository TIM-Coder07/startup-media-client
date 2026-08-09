"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Rocket, ArrowRight, Users } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      className="
      relative
      min-h-[85vh]
      flex
      items-center
      overflow-hidden
      bg-gradient-to-br
      from-indigo-950
      via-purple-900
      to-cyan-900
      px-5
      "
    >
      {/* Glow Background */}

      <div
        className="
        absolute
        -top-40
        -left-40
        w-96
        h-96
        rounded-full
        bg-purple-500/30
        blur-3xl
        "
      />

      <div
        className="
        absolute
        -bottom-40
        -right-40
        w-96
        h-96
        rounded-full
        bg-cyan-500/30
        blur-3xl
        "
      />

      <div
        className="
        relative
        z-10
        max-w-7xl
        mx-auto
        w-full
        grid
        md:grid-cols-2
        gap-10
        items-center
        "
      >
        {/* Left Content */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-white/10
            border
            border-white/20
            text-white
            text-sm
            "
          >
            <Rocket size={18} />
            Startup Collaboration Platform
          </div>

          <h1
            className="
            mt-6
            text-5xl
            md:text-6xl
            font-extrabold
            text-white
            leading-tight
            "
          >
            Build Your
            <span
              className="
              block
              bg-gradient-to-r
              from-cyan-400
              to-purple-400
              bg-clip-text
              text-transparent
              "
            >
              Dream Startup
            </span>
          </h1>

          <p
            className="
            mt-6
            text-lg
            text-slate-300
            max-w-xl
            "
          >
            Connect with talented co-founders, discover innovative startup
            ideas, validate your vision, and build the next generation of
            successful businesses together.
          </p>

          <div
            className="
            mt-8
            flex
            flex-wrap
            gap-4
            "
          >
            <Link
              href="/startup-ideas"
              className="
              flex
              items-center
              gap-2
              px-7
              py-3
              rounded-full
              bg-white
              text-black
              font-semibold
              hover:scale-105
              transition
              "
            >
              Explore Ideas
              <ArrowRight size={18} />
            </Link>

            <div
              className="
              flex
              items-center
              gap-2
              px-5
              py-3
              rounded-full
              bg-white/10
              border
              border-white/20
              text-white
              "
            >
              <Users size={18} />
              Find Co-Founders
            </div>
          </div>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div
            className="
            relative
            w-80
            h-[420px]
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            p-6
            shadow-2xl
            "
          >
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80"
              alt="startup team"
              className="
              w-full
              h-full
              object-cover
              rounded-2xl
              "
            />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
              absolute
              -bottom-5
              -left-5
              bg-white
              text-black
              px-5
              py-3
              rounded-xl
              shadow-xl
              font-semibold
              "
            >
              🚀 5K+ Startup Ideas
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
