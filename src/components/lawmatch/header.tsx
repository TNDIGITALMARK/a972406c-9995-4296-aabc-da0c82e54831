"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BrandName } from "@/components/brand/brand-name";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--primary))] text-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <Image
              src="/stafi-logo.jpeg"
              alt="Stafi Logo"
              width={60}
              height={60}
              className="rounded-md"
            />
            <BrandName className="text-2xl" />
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
