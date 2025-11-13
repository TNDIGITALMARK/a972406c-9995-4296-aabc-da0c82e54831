"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/lawmatch/header";
import { AvatarPlaceholder } from "@/components/lawmatch/avatar-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mail, Calendar, MapPin, Star, TrendingUp, CheckCircle2 } from "lucide-react";

interface CandidateMatch {
  id: string;
  name: string;
  title: string;
  experience: string;
  matchScore: number;
  availability: string;
  location: string;
  softwareSkills: string[];
  practiceAreaMatch: number;
  softwareMatch: number;
  availabilityMatch: number;
  personalityMatch: number;
  strengths: string[];
}

// Mock candidate data based on the assessment
const MOCK_CANDIDATES: CandidateMatch[] = [
  {
    id: "1",
    name: "Sarah R.",
    title: "Paralegal - Executive Support",
    experience: "5 years Personal Injury experience",
    matchScore: 94,
    availability: "Monday-Thursday, 9am-4pm Eastern",
    location: "Remote (Eastern Time)",
    softwareSkills: ["Clio (Expert)", "QuickBooks (Advanced)"],
    practiceAreaMatch: 95,
    softwareMatch: 92,
    availabilityMatch: 98,
    personalityMatch: 92,
    strengths: [
      "Highly independent client communication",
      "Expert in case management systems",
      "Strong document preparation skills",
    ],
  },
  {
    id: "2",
    name: "David L.",
    title: "Executive Assistant - Operations",
    experience: "7 years Corporate Law support",
    matchScore: 88,
    availability: "Full-time availability (40 hrs/week)",
    location: "Remote (Central Time)",
    softwareSkills: ["MyCase", "Salesforce", "Asana"],
    practiceAreaMatch: 85,
    softwareMatch: 88,
    availabilityMatch: 90,
    personalityMatch: 89,
    strengths: [
      "Process-oriented and detail-focused",
      "Excellent administrative coordination",
      "CRM and project management expertise",
    ],
  },
  {
    id: "3",
    name: "Michael C.",
    title: "Paralegal - Research Specialist",
    experience: "4 years Immigration Law",
    matchScore: 82,
    availability: "Part-time (20-30 hrs/week)",
    location: "Remote (Pacific Time)",
    softwareSkills: ["Filevine", "LeanLaw", "Slack"],
    practiceAreaMatch: 78,
    softwareMatch: 85,
    availabilityMatch: 80,
    personalityMatch: 86,
    strengths: [
      "Strong legal research background",
      "Immigration documentation expert",
      "Tech-savvy and adaptable",
    ],
  },
];

export default function ResultsPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<CandidateMatch[]>([]);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    // Load assessment data from sessionStorage
    const data = sessionStorage.getItem("assessmentData");
    if (data) {
      setAssessmentData(JSON.parse(data));
      // In a real app, this would fetch from an API based on assessment data
      setCandidates(MOCK_CANDIDATES);
    } else {
      // If no assessment data, redirect to assessment page
      router.push("/assessment");
    }
  }, [router]);

  const viewProfile = (candidateId: string) => {
    router.push(`/profile/${candidateId}`);
  };

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">
              Your Candidate Matches
            </h1>
            <p className="text-[hsl(var(--muted-foreground))]">
              Based on your assessment, we've identified {candidates.length} potential matches ranked by compatibility
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - Candidate List */}
            <div className="lg:col-span-2 space-y-6">
              {candidates.map((candidate, index) => (
                <Card key={candidate.id} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <AvatarPlaceholder name={candidate.name} size="lg" />
                        <div>
                          <CardTitle className="text-xl">{candidate.name}</CardTitle>
                          <CardDescription>{candidate.title}</CardDescription>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                            {candidate.experience}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2 mb-1">
                          <Star className="w-5 h-5 text-[hsl(var(--secondary))] fill-current" />
                          <span className="text-2xl font-bold text-[hsl(var(--primary))]">
                            {candidate.matchScore}%
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-[hsl(var(--success))] text-white hover:bg-[hsl(var(--success))]"
                        >
                          {index === 0 ? "Top Match" : "Great Fit"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Compatibility Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold">Compatibility Breakdown:</h4>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[hsl(var(--muted-foreground))]">Practice Area Experience</span>
                          <span className="font-medium">{candidate.practiceAreaMatch}%</span>
                        </div>
                        <Progress value={candidate.practiceAreaMatch} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[hsl(var(--muted-foreground))]">Software Proficiency</span>
                          <span className="font-medium">{candidate.softwareMatch}%</span>
                        </div>
                        <Progress value={candidate.softwareMatch} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[hsl(var(--muted-foreground))]">Availability Overlap</span>
                          <span className="font-medium">{candidate.availabilityMatch}%</span>
                        </div>
                        <Progress value={candidate.availabilityMatch} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[hsl(var(--muted-foreground))]">Personality Fit</span>
                          <span className="font-medium">{candidate.personalityMatch}%</span>
                        </div>
                        <Progress value={candidate.personalityMatch} className="h-2" />
                      </div>
                    </div>

                    {/* Key Details */}
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span className="text-[hsl(var(--muted-foreground))]">{candidate.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span className="text-[hsl(var(--muted-foreground))]">{candidate.location}</span>
                      </div>
                    </div>

                    {/* Software Skills */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Software Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {candidate.softwareSkills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Strengths */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Key Strengths:</h4>
                      <ul className="space-y-1">
                        {candidate.strengths.map((strength, i) => (
                          <li key={i} className="flex items-start space-x-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                            <span className="text-[hsl(var(--muted-foreground))]">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button
                        className="flex-1 bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--lawmatch-orange-hover))] text-white"
                        onClick={() => viewProfile(candidate.id)}
                      >
                        View Full Profile
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar - Assessment Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Your Assessment Summary</CardTitle>
                  <CardDescription>What we're looking for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Firm Details</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-[hsl(var(--muted-foreground))]">Firm:</span>{" "}
                        <span className="font-medium">{assessmentData.firmName || "Not specified"}</span>
                      </p>
                      <p>
                        <span className="text-[hsl(var(--muted-foreground))]">Practice Area:</span>{" "}
                        <span className="font-medium capitalize">{assessmentData.practiceArea || "N/A"}</span>
                      </p>
                      <p>
                        <span className="text-[hsl(var(--muted-foreground))]">Role:</span>{" "}
                        <span className="font-medium capitalize">{assessmentData.role || "N/A"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Support Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessmentData.supportNeeded && assessmentData.supportNeeded.length > 0 ? (
                        assessmentData.supportNeeded.map((support: string) => (
                          <Badge key={support} variant="secondary">
                            {support}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-[hsl(var(--muted-foreground))]">None specified</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Weekly Hours</h4>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {assessmentData.weeklyHours || "Not specified"}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2">Time Zone</h4>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {assessmentData.timeZone || "Not specified"}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/assessment")}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Refine Assessment
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* How It Works Card */}
              <Card className="mt-6 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <p className="text-sm font-medium">Create Profile</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Complete your firm assessment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <p className="text-sm font-medium">Get Matches</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Review ranked candidates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--secondary))] text-white flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <p className="text-sm font-medium">Collaborate</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">
                        Connect and start working
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
