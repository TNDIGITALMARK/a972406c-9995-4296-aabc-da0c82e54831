"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-[hsl(var(--primary))] text-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/stafi-logo.jpeg"
              alt="Stafi Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <div className="text-xl font-bold">LawWork</div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#how-it-works"
              className="text-sm hover:text-[hsl(var(--secondary))] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#for-firms"
              className="text-sm hover:text-[hsl(var(--secondary))] transition-colors"
            >
              For Firms
            </Link>
            <Link
              href="#for-professionals"
              className="text-sm hover:text-[hsl(var(--secondary))] transition-colors"
            >
              For Professionals
            </Link>
            <Link
              href="#resources"
              className="text-sm hover:text-[hsl(var(--secondary))] transition-colors"
            >
              Resources
            </Link>
            <Link
              href="#resources"
              className="text-sm hover:text-[hsl(var(--secondary))] transition-colors"
            >
              Resources
            </Link>
          </nav>

          {/* CTA Button */}
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[hsl(var(--primary))]"
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
}
