"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Profile } from "./Profile/Profile";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Browse Startups", href: "/startups" },
  { name: "Founders", href: "/founders" },
  { name: "About", href: "/about" },
];

export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  if (isPending) return null;

  const isAuthenticated = !!session;

  const dashboardLink = isAuthenticated
    ? `/dashboard/${session.user.role.toLowerCase()}/overview`
    : "/login";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-blue-600"
        >
          StartupHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navItems.map(({ name, href }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                {name}
              </Link>
            );
          })}

          {isAuthenticated && (
            <Link
              href={dashboardLink}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${pathname.startsWith("/dashboard")
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <Profile />
          ) : (
            <>
              <Link href="/login">
                <Button variant="bordered">
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button color="primary">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <Button
          isIconOnly
          variant="light"
          className="md:hidden"
          onPress={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-white shadow-lg md:hidden">
          <div className="space-y-2 p-5">
            {navItems.map(({ name, href }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  {name}
                </Link>
              );
            })}

            {isAuthenticated && (
              <>
                <Link
                  href={dashboardLink}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all ${pathname.startsWith("/dashboard")
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                >
                  Dashboard
                </Link>

                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold capitalize">
                    {session.user.role}
                  </p>
                </div>
              </>
            )}

            <div className="pt-3">
              {isAuthenticated ? (
                <Profile />
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="bordered" className="w-full">
                      Login
                    </Button>
                  </Link>

                  <Link href="/signup" onClick={() => setIsOpen(false)}>
                    <Button color="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}