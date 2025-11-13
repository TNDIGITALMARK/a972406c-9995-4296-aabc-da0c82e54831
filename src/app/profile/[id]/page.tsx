"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/lawmatch/header";
import { AvatarPlaceholder } from "@/components/lawmatch/avatar-placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Calendar,
  MapPin,
  Star,
  Briefcase,
  Award,
  Clock,
  MessageSquare,
  CheckCircle2,
  ArrowLeft,
  Linkedin,
  Phone,
} from "lucide-react";

interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  matchScore: number;
  availability: string;
  hourlyRate: string;
  experience: string;
  bio: string;
  skills: string[];
  certifications: string[];
  softwareExpertise: { name: string; level: string }[];
  workHistory: { company: string; role: string; duration: string; description: string }[];
  education: { degree: string; institution: string; year: string }[];
  communicationPreferences: string[];
  languages: string[];
  timezone: string;
  preferredWorkStyle: string;
}

// Mock profile data
const MOCK_PROFILES: Record<string, CandidateProfile> = {
  "1": {
    id: "1",
    name: "Sarah R.",
    title: "Paralegal - Executive Support Specialist",
    location: "Remote (Eastern Time)",
    matchScore: 94,
    availability: "Monday-Thursday, 9am-4pm Eastern",
    hourlyRate: "$45-55/hour",
    experience: "5 years in Personal Injury Law",
    bio: "Experienced paralegal with a strong background in personal injury litigation and client communication. Known for proactive problem-solving and excellent organizational skills. Specialized in case management systems and client intake processes.",
    skills: [
      "Legal Research",
      "Document Drafting",
      "Client Communication",
      "Case Management",
      "Court Filing",
      "Discovery Support",
      "Medical Records Review",
      "Settlement Negotiations Support",
    ],
    certifications: [
      "Certified Paralegal (CP) - NALA",
      "E-Discovery Specialist",
      "Notary Public",
    ],
    softwareExpertise: [
      { name: "Clio", level: "Expert" },
      { name: "QuickBooks", level: "Advanced" },
      { name: "Microsoft Office Suite", level: "Expert" },
      { name: "Adobe Acrobat Pro", level: "Advanced" },
      { name: "Zoom/Teams", level: "Expert" },
    ],
    workHistory: [
      {
        company: "Johnson & Associates Law Firm",
        role: "Senior Paralegal",
        duration: "2020 - Present",
        description:
          "Managed 30+ personal injury cases simultaneously. Coordinated client intake, medical records review, and settlement documentation. Improved case processing time by 25%.",
      },
      {
        company: "Thompson Legal Group",
        role: "Paralegal",
        duration: "2018 - 2020",
        description:
          "Supported 3 attorneys with personal injury litigation. Drafted pleadings, managed discovery, and maintained case files. Implemented new filing system improving efficiency.",
      },
    ],
    education: [
      {
        degree: "Paralegal Studies Certificate",
        institution: "Boston University",
        year: "2018",
      },
      {
        degree: "Bachelor of Arts in Political Science",
        institution: "University of Massachusetts",
        year: "2016",
      },
    ],
    communicationPreferences: ["Email", "Video Calls", "Project Management Tools"],
    languages: ["English (Native)", "Spanish (Conversational)"],
    timezone: "Eastern Time (ET)",
    preferredWorkStyle: "Independent with regular check-ins",
  },
  "2": {
    id: "2",
    name: "David L.",
    title: "Executive Assistant - Operations Coordinator",
    location: "Remote (Central Time)",
    matchScore: 88,
    availability: "Full-time (40 hrs/week)",
    hourlyRate: "$40-50/hour",
    experience: "7 years in Corporate Law support",
    bio: "Detail-oriented executive assistant with extensive experience supporting legal teams in corporate environments. Expert in process optimization and administrative coordination. Strong background in CRM systems and project management.",
    skills: [
      "Calendar Management",
      "Executive Support",
      "Meeting Coordination",
      "Travel Arrangements",
      "Expense Management",
      "Project Coordination",
      "Client Relations",
      "Process Documentation",
    ],
    certifications: ["Certified Administrative Professional (CAP)", "Project Management Basics"],
    softwareExpertise: [
      { name: "MyCase", level: "Advanced" },
      { name: "Salesforce", level: "Expert" },
      { name: "Asana", level: "Advanced" },
      { name: "Microsoft Office Suite", level: "Expert" },
      { name: "Google Workspace", level: "Expert" },
    ],
    workHistory: [
      {
        company: "Corporate Legal Solutions",
        role: "Executive Assistant to Partners",
        duration: "2019 - Present",
        description:
          "Supporting 5 partners with scheduling, client relations, and operational coordination. Implemented new CRM system increasing client satisfaction scores by 30%.",
      },
      {
        company: "Davis & Partners LLC",
        role: "Legal Administrative Assistant",
        duration: "2016 - 2019",
        description:
          "Managed administrative operations for corporate law department. Coordinated meetings, travel, and client events. Maintained document management system.",
      },
    ],
    education: [
      {
        degree: "Bachelor of Business Administration",
        institution: "University of Illinois",
        year: "2015",
      },
    ],
    communicationPreferences: ["Email", "Phone", "Instant Messaging"],
    languages: ["English (Native)"],
    timezone: "Central Time (CT)",
    preferredWorkStyle: "Structured with clear processes",
  },
  "3": {
    id: "3",
    name: "Michael C.",
    title: "Paralegal - Research Specialist",
    location: "Remote (Pacific Time)",
    matchScore: 82,
    availability: "Part-time (20-30 hrs/week)",
    hourlyRate: "$38-48/hour",
    experience: "4 years in Immigration Law",
    bio: "Research-focused paralegal specializing in immigration law and complex legal documentation. Strong analytical skills and attention to detail. Comfortable with technology and adapting to new systems quickly.",
    skills: [
      "Legal Research",
      "Immigration Documentation",
      "Case Analysis",
      "Form Preparation",
      "Client Interviews",
      "File Management",
      "Compliance Review",
      "Multilingual Support",
    ],
    certifications: ["Immigration Law Specialist Certificate", "Legal Research Certification"],
    softwareExpertise: [
      { name: "Filevine", level: "Advanced" },
      { name: "LeanLaw", level: "Intermediate" },
      { name: "Slack", level: "Expert" },
      { name: "Westlaw", level: "Advanced" },
      { name: "LexisNexis", level: "Advanced" },
    ],
    workHistory: [
      {
        company: "Global Immigration Services",
        role: "Immigration Paralegal",
        duration: "2020 - Present",
        description:
          "Prepare visa applications, green card petitions, and citizenship documents. Conduct client consultations and maintain case tracking systems. 95% approval rate on applications.",
      },
    ],
    education: [
      {
        degree: "Paralegal Studies Certificate",
        institution: "UCLA Extension",
        year: "2019",
      },
      {
        degree: "Bachelor of Arts in International Relations",
        institution: "UC Berkeley",
        year: "2017",
      },
    ],
    communicationPreferences: ["Email", "Video Calls"],
    languages: ["English (Native)", "Mandarin (Fluent)", "Spanish (Intermediate)"],
    timezone: "Pacific Time (PT)",
    preferredWorkStyle: "Flexible and collaborative",
  },
};

export default function ProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  useEffect(() => {
    const id = params.id as string;
    if (id && MOCK_PROFILES[id]) {
      setProfile(MOCK_PROFILES[id]);
    } else {
      // Profile not found, redirect to results
      router.push("/results");
    }
  }, [params, router]);

  if (!profile) {
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
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/results")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>

          {/* Profile Header Card */}
          <Card className="shadow-lg mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex items-start space-x-6 mb-6 md:mb-0">
                  <AvatarPlaceholder name={profile.name} size="lg" />
                  <div>
                    <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-1">
                      {profile.name}
                    </h1>
                    <p className="text-lg text-[hsl(var(--muted-foreground))] mb-3">
                      {profile.title}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span>{profile.availability}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                        <span>{profile.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end space-x-2 mb-2">
                    <Star className="w-6 h-6 text-[hsl(var(--secondary))] fill-current" />
                    <span className="text-3xl font-bold text-[hsl(var(--primary))]">
                      {profile.matchScore}%
                    </span>
                  </div>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                    Match Score
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--lawmatch-orange-hover))] text-white"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Info Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                    {profile.hourlyRate}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Hourly Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                    {profile.workHistory.length}+
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                    {profile.certifications.length}
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Certifications</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--primary))]">
                    {profile.softwareExpertise.length}+
                  </p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">Software Tools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                        {profile.bio}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Core Competencies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Award className="w-5 h-5 inline mr-2" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {profile.certifications.map((cert) => (
                          <li key={cert} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                            <span className="text-[hsl(var(--muted-foreground))]">{cert}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Work History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {profile.workHistory.map((job, index) => (
                        <div key={index} className={index > 0 ? "pt-6 border-t" : ""}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{job.role}</h3>
                              <p className="text-[hsl(var(--muted-foreground))]">{job.company}</p>
                            </div>
                            <Badge variant="outline">{job.duration}</Badge>
                          </div>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-2">
                            {job.description}
                          </p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {profile.education.map((edu, index) => (
                        <div key={index} className={index > 0 ? "pt-4 border-t" : ""}>
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">
                            {edu.institution}
                          </p>
                          <p className="text-sm text-[hsl(var(--muted-foreground))]">{edu.year}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Skills Tab */}
                <TabsContent value="skills" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Software Expertise</CardTitle>
                      <CardDescription>Proficiency levels in legal and business software</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {profile.softwareExpertise.map((software) => (
                        <div key={software.name}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{software.name}</span>
                            <Badge
                              variant={
                                software.level === "Expert"
                                  ? "default"
                                  : software.level === "Advanced"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {software.level}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Availability Tab */}
                <TabsContent value="availability" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Schedule & Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Availability</h4>
                        <p className="text-[hsl(var(--muted-foreground))]">{profile.availability}</p>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Time Zone</h4>
                        <p className="text-[hsl(var(--muted-foreground))]">{profile.timezone}</p>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-2">Preferred Work Style</h4>
                        <p className="text-[hsl(var(--muted-foreground))]">{profile.preferredWorkStyle}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <MessageSquare className="w-5 h-5 inline mr-2" />
                        Communication Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.communicationPreferences.map((pref) => (
                          <Badge key={pref} variant="outline">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--lawmatch-orange-hover))] text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Request Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Linkedin className="w-4 h-4 mr-2" />
                    View LinkedIn
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">Why This Match Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                    <p className="text-[hsl(var(--muted-foreground))]">
                      Strong practice area alignment with your firm's focus
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                    <p className="text-[hsl(var(--muted-foreground))]">
                      Expert proficiency in your required software tools
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                    <p className="text-[hsl(var(--muted-foreground))]">
                      Availability matches your schedule requirements
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-0.5 flex-shrink-0" />
                    <p className="text-[hsl(var(--muted-foreground))]">
                      Work style aligns with your cultural preferences
                    </p>
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
