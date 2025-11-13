"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/lawmatch/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, FileText, Handshake, ArrowRight } from "lucide-react";
import { BrandName } from "@/components/brand/brand-name";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--lawmatch-navy-dark))]">
      <Header />

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-white">
              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-[hsl(var(--secondary))] text-white text-sm font-semibold rounded-full mb-4">
                  ⚖️ Legal Staffing Made Simple
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Connect with Top Legal Talent. Simplified.
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Find the perfect paralegal or executive assistant match for your law firm through our data-driven assessment platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--lawmatch-orange-hover))] text-white text-lg px-8"
                  onClick={() => router.push("/assessment")}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="bg-[#60A5FA] hover:bg-[#2563EB] text-white text-lg px-8 border-0"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div>
                  <div className="text-3xl font-bold text-[hsl(var(--secondary))]">94%</div>
                  <div className="text-sm text-blue-100">Match Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[hsl(var(--secondary))]">500+</div>
                  <div className="text-sm text-blue-100">Legal Professionals</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[hsl(var(--secondary))]">250+</div>
                  <div className="text-sm text-blue-100">Law Firms Served</div>
                </div>
              </div>
            </div>

            {/* Assessment Preview Card */}
            <div>
              <Card className="shadow-2xl">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[hsl(var(--primary))] mb-2">
                      Find Your Perfect Match
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))]">
                      Our comprehensive assessment identifies candidates that fit your exact needs
                    </p>
                  </div>

                  {/* Assessment Steps Preview */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--muted))] rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Understanding Your Firm</h4>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          Tell us about your practice area and role
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--muted))] rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Define Your Needs</h4>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          Specify the type of support you require
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-[hsl(var(--muted))] rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Get Matched</h4>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">
                          Review ranked candidates with compatibility scores
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--lawmatch-orange-hover))] text-white"
                    size="lg"
                    onClick={() => router.push("/assessment")}
                  >
                    Start Your Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Why Choose <BrandName className="text-3xl" />?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-xl">
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[hsl(var(--muted))] rounded-xl flex items-center justify-center">
                      <Scale className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Expertise</h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    Vetted legal professionals with proven track records in various practice areas and specializations
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[hsl(var(--muted))] rounded-xl flex items-center justify-center">
                      <FileText className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Efficiency</h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    Our streamlined matching process saves you time and resources in finding the perfect candidate
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-xl">
                <CardContent className="pt-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[hsl(var(--muted))] rounded-xl flex items-center justify-center">
                      <Handshake className="w-10 h-10 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Reliability</h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                    Background-checked professionals you can trust with your most important legal work
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[hsl(var(--lawmatch-navy-dark))] text-white py-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 <BrandName className="text-sm" />. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-[hsl(var(--secondary))] transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-[hsl(var(--secondary))] transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-[hsl(var(--secondary))] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[hsl(var(--secondary))] transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}