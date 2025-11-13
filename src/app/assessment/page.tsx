"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/lawmatch/header";
import { StepIndicator } from "@/components/lawmatch/step-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, FileText, Handshake } from "lucide-react";
import { BrandName } from "@/components/brand/brand-name";

interface TaskSelection {
  administrative: { [key: string]: number };
  legal: { [key: string]: number };
  peopleFacing: { [key: string]: number };
  marketing: { [key: string]: number };
}

interface OtherOptions {
  administrative: string;
  legal: string;
  peopleFacing: string;
  marketing: string;
}

interface AssessmentData {
  firmName: string;
  role: string[];
  practiceArea: string[];
  taskSelection: TaskSelection;
  otherOptions: OtherOptions;
  supportNeeded: string[];
  weeklyHours: string;
  software: string[];
  timeZone: string;
  availability: string;
  personality: string;
}

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AssessmentData>({
    firmName: "",
    role: [],
    practiceArea: [],
    taskSelection: {
      administrative: {},
      legal: {},
      peopleFacing: {},
      marketing: {},
    },
    otherOptions: {
      administrative: "",
      legal: "",
      peopleFacing: "",
      marketing: "",
    },
    supportNeeded: [],
    weeklyHours: "",
    software: [],
    timeZone: "",
    availability: "",
    personality: "",
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save assessment data to sessionStorage
      sessionStorage.setItem("assessmentData", JSON.stringify(formData));
      // Navigate to results page
      router.push("/results");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckboxChange = (field: "supportNeeded" | "software", value: string) => {
    const current = formData[field];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData({ ...formData, [field]: updated });
  };

  const handleTaskSelection = (category: keyof TaskSelection, task: string, priority: number) => {
    const updated = { ...formData.taskSelection[category] };

    if (priority === 0) {
      // Remove the task if priority is set to 0 (not specified)
      delete updated[task];
    } else {
      // Set the task with the selected priority
      updated[task] = priority;
    }

    setFormData({
      ...formData,
      taskSelection: {
        ...formData.taskSelection,
        [category]: updated,
      },
    });
  };

  const handleOtherOptionChange = (category: keyof OtherOptions, value: string) => {
    setFormData({
      ...formData,
      otherOptions: {
        ...formData.otherOptions,
        [category]: value,
      },
    });
  };

  const handleRoleSelection = (value: string) => {
    const current = formData.role;
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData({ ...formData, role: updated });
  };

  const handlePracticeAreaSelection = (value: string) => {
    const current = formData.practiceArea;
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    setFormData({ ...formData, practiceArea: updated });
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[hsl(var(--primary))] mb-2">
              Find Your Perfect Legal Support Match
            </h1>
            <p className="text-[hsl(var(--muted-foreground))]">
              Complete this assessment to identify the best paralegal or executive assistant for your firm
            </p>
          </div>

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

          {/* Main Form Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentStep === 1 && "Section 1: Understanding Your Firm"}
                {currentStep === 2 && "Section 2: Key Task Areas"}
                {currentStep === 3 && "Section 3: Support Requirements"}
                {currentStep === 4 && "Section 4: Software & Tools"}
                {currentStep === 5 && "Section 5: Schedule & Availability"}
                {currentStep === 6 && "Section 6: Cultural Fit"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your firm and role"}
                {currentStep === 2 && "Select the most important tasks for your practice"}
                {currentStep === 3 && "Define the type of support you need most"}
                {currentStep === 4 && "Indicate the tools your team uses"}
                {currentStep === 5 && "Set availability expectations"}
                {currentStep === 6 && "Choose personality traits you value"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Firm Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="firmName">Law Firm Name</Label>
                    <Input
                      id="firmName"
                      placeholder="Enter your firm name"
                      value={formData.firmName}
                      onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Select Your Role(s) (Select all that apply)</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="attorney"
                          checked={formData.role.includes("attorney")}
                          onCheckedChange={() => handleRoleSelection("attorney")}
                        />
                        <Label htmlFor="attorney" className="font-normal cursor-pointer">⚖️ Attorney / Partner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="paralegal"
                          checked={formData.role.includes("paralegal")}
                          onCheckedChange={() => handleRoleSelection("paralegal")}
                        />
                        <Label htmlFor="paralegal" className="font-normal cursor-pointer">👩‍💼 Paralegal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="operations"
                          checked={formData.role.includes("operations")}
                          onCheckedChange={() => handleRoleSelection("operations")}
                        />
                        <Label htmlFor="operations" className="font-normal cursor-pointer">🧾 Operations Manager</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketing"
                          checked={formData.role.includes("marketing")}
                          onCheckedChange={() => handleRoleSelection("marketing")}
                        />
                        <Label htmlFor="marketing" className="font-normal cursor-pointer">📈 Marketing Lead</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="finance"
                          checked={formData.role.includes("finance")}
                          onCheckedChange={() => handleRoleSelection("finance")}
                        />
                        <Label htmlFor="finance" className="font-normal cursor-pointer">💳 Finance Admin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="solo"
                          checked={formData.role.includes("solo")}
                          onCheckedChange={() => handleRoleSelection("solo")}
                        />
                        <Label htmlFor="solo" className="font-normal cursor-pointer">👤 Solo Practitioner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="consultant"
                          checked={formData.role.includes("consultant")}
                          onCheckedChange={() => handleRoleSelection("consultant")}
                        />
                        <Label htmlFor="consultant" className="font-normal cursor-pointer">🌐 Consultant</Label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Practice Area(s) (Select all that apply)</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="business"
                          checked={formData.practiceArea.includes("business")}
                          onCheckedChange={() => handlePracticeAreaSelection("business")}
                        />
                        <Label htmlFor="business" className="font-normal cursor-pointer">⚖️ Business</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="civil"
                          checked={formData.practiceArea.includes("civil")}
                          onCheckedChange={() => handlePracticeAreaSelection("civil")}
                        />
                        <Label htmlFor="civil" className="font-normal cursor-pointer">📋 Civil</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="criminal"
                          checked={formData.practiceArea.includes("criminal")}
                          onCheckedChange={() => handlePracticeAreaSelection("criminal")}
                        />
                        <Label htmlFor="criminal" className="font-normal cursor-pointer">🔒 Criminal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="general"
                          checked={formData.practiceArea.includes("general")}
                          onCheckedChange={() => handlePracticeAreaSelection("general")}
                        />
                        <Label htmlFor="general" className="font-normal cursor-pointer">⚡ General</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="immigration"
                          checked={formData.practiceArea.includes("immigration")}
                          onCheckedChange={() => handlePracticeAreaSelection("immigration")}
                        />
                        <Label htmlFor="immigration" className="font-normal cursor-pointer">🌍 Immigration</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="personal-injury"
                          checked={formData.practiceArea.includes("personal-injury")}
                          onCheckedChange={() => handlePracticeAreaSelection("personal-injury")}
                        />
                        <Label htmlFor="personal-injury" className="font-normal cursor-pointer">🏥 Personal Injury</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Key Task Areas */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base">Rate the priority of tasks for your practice</Label>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                      0 = Not Specified, 1 = Low, 2 = Medium, 3 = High
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Administrative Column */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-[hsl(var(--primary))] border-b pb-2">
                        ADMINISTRATIVE
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Use CRM & CMS</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">330/year</p>
                          <Select
                            value={String(formData.taskSelection.administrative["Use CRM & CMS"] || 0)}
                            onValueChange={(value) => handleTaskSelection("administrative", "Use CRM & CMS", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Organize & File Documents</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">308/year</p>
                          <Select
                            value={String(formData.taskSelection.administrative["Organize & File Documents"] || 0)}
                            onValueChange={(value) => handleTaskSelection("administrative", "Organize & File Documents", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Manage Emails</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">298/year</p>
                          <Select
                            value={String(formData.taskSelection.administrative["Manage Emails"] || 0)}
                            onValueChange={(value) => handleTaskSelection("administrative", "Manage Emails", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Manage Simple Projects</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">256/year</p>
                          <Select
                            value={String(formData.taskSelection.administrative["Manage Simple Projects"] || 0)}
                            onValueChange={(value) => handleTaskSelection("administrative", "Manage Simple Projects", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Track & Update Cases</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">243/year</p>
                          <Select
                            value={String(formData.taskSelection.administrative["Track & Update Cases"] || 0)}
                            onValueChange={(value) => handleTaskSelection("administrative", "Track & Update Cases", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Other</Label>
                          <Select
                            value={formData.otherOptions.administrative}
                            onValueChange={(value) => {
                              handleOtherOptionChange("administrative", value);
                              if (value) handleTaskSelection("administrative", value, 2);
                            }}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Data Entry">Data Entry</SelectItem>
                              <SelectItem value="Meeting Coordination">Meeting Coordination</SelectItem>
                              <SelectItem value="Travel Arrangements">Travel Arrangements</SelectItem>
                              <SelectItem value="Expense Management">Expense Management</SelectItem>
                              <SelectItem value="Office Supply Management">Office Supply Management</SelectItem>
                              <SelectItem value="Records Management">Records Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Legal Column */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-[hsl(var(--primary))] border-b pb-2">
                        LEGAL
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Draft Legal Documents</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">197/year</p>
                          <Select
                            value={String(formData.taskSelection.legal["Draft Legal Documents"] || 0)}
                            onValueChange={(value) => handleTaskSelection("legal", "Draft Legal Documents", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">File/E-File Court Cases</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">127/year</p>
                          <Select
                            value={String(formData.taskSelection.legal["File/E-File Court Cases"] || 0)}
                            onValueChange={(value) => handleTaskSelection("legal", "File/E-File Court Cases", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Draft Cover Letters</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">116/year</p>
                          <Select
                            value={String(formData.taskSelection.legal["Draft Cover Letters"] || 0)}
                            onValueChange={(value) => handleTaskSelection("legal", "Draft Cover Letters", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Draft Affidavits</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">94/year</p>
                          <Select
                            value={String(formData.taskSelection.legal["Draft Affidavits"] || 0)}
                            onValueChange={(value) => handleTaskSelection("legal", "Draft Affidavits", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Draft Motions</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">88/year</p>
                          <Select
                            value={String(formData.taskSelection.legal["Draft Motions"] || 0)}
                            onValueChange={(value) => handleTaskSelection("legal", "Draft Motions", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Other</Label>
                          <Select
                            value={formData.otherOptions.legal}
                            onValueChange={(value) => {
                              handleOtherOptionChange("legal", value);
                              if (value) handleTaskSelection("legal", value, 2);
                            }}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Legal Research">Legal Research</SelectItem>
                              <SelectItem value="Case Brief Preparation">Case Brief Preparation</SelectItem>
                              <SelectItem value="Discovery Assistance">Discovery Assistance</SelectItem>
                              <SelectItem value="Trial Preparation">Trial Preparation</SelectItem>
                              <SelectItem value="Deposition Summaries">Deposition Summaries</SelectItem>
                              <SelectItem value="Document Review">Document Review</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* People Facing Column */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-[hsl(var(--primary))] border-b pb-2">
                        PEOPLE FACING
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Reception: Answer Inquires</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">318/year</p>
                          <Select
                            value={String(formData.taskSelection.peopleFacing["Reception: Answer Inquires"] || 0)}
                            onValueChange={(value) => handleTaskSelection("peopleFacing", "Reception: Answer Inquires", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Request Documentation</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">309/year</p>
                          <Select
                            value={String(formData.taskSelection.peopleFacing["Request Documentation"] || 0)}
                            onValueChange={(value) => handleTaskSelection("peopleFacing", "Request Documentation", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Confirm Appointments With Clients</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">246/year</p>
                          <Select
                            value={String(formData.taskSelection.peopleFacing["Confirm Appointments With Clients"] || 0)}
                            onValueChange={(value) => handleTaskSelection("peopleFacing", "Confirm Appointments With Clients", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Intake: Qualify & Obtain Retainer</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">165/year</p>
                          <Select
                            value={String(formData.taskSelection.peopleFacing["Intake: Qualify & Obtain Retainer"] || 0)}
                            onValueChange={(value) => handleTaskSelection("peopleFacing", "Intake: Qualify & Obtain Retainer", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Intake: Qualify & Schedule Leads</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">136/year</p>
                          <Select
                            value={String(formData.taskSelection.peopleFacing["Intake: Qualify & Schedule Leads"] || 0)}
                            onValueChange={(value) => handleTaskSelection("peopleFacing", "Intake: Qualify & Schedule Leads", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Other</Label>
                          <Select
                            value={formData.otherOptions.peopleFacing}
                            onValueChange={(value) => {
                              handleOtherOptionChange("peopleFacing", value);
                              if (value) handleTaskSelection("peopleFacing", value, 2);
                            }}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Client Follow-up">Client Follow-up</SelectItem>
                              <SelectItem value="Witness Coordination">Witness Coordination</SelectItem>
                              <SelectItem value="Court Appearance Support">Court Appearance Support</SelectItem>
                              <SelectItem value="Translation Services">Translation Services</SelectItem>
                              <SelectItem value="Conflict Checks">Conflict Checks</SelectItem>
                              <SelectItem value="Customer Service">Customer Service</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Column */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-[hsl(var(--primary))] border-b pb-2">
                        MARKETING
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Manage Social Media</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">71/year</p>
                          <Select
                            value={String(formData.taskSelection.marketing["Manage Social Media"] || 0)}
                            onValueChange={(value) => handleTaskSelection("marketing", "Manage Social Media", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Create Graphic Material</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">51/year</p>
                          <Select
                            value={String(formData.taskSelection.marketing["Create Graphic Material"] || 0)}
                            onValueChange={(value) => handleTaskSelection("marketing", "Create Graphic Material", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Keep Website Up To Date</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">43/year</p>
                          <Select
                            value={String(formData.taskSelection.marketing["Keep Website Up To Date"] || 0)}
                            onValueChange={(value) => handleTaskSelection("marketing", "Keep Website Up To Date", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Reply to Messages On Social Media</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">43/year</p>
                          <Select
                            value={String(formData.taskSelection.marketing["Reply to Messages On Social Media"] || 0)}
                            onValueChange={(value) => handleTaskSelection("marketing", "Reply to Messages On Social Media", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Create & Edit Simple Videos</Label>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">37/year</p>
                          <Select
                            value={String(formData.taskSelection.marketing["Create & Edit Simple Videos"] || 0)}
                            onValueChange={(value) => handleTaskSelection("marketing", "Create & Edit Simple Videos", parseInt(value))}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0 - Not Specified</SelectItem>
                              <SelectItem value="1">1 - Low</SelectItem>
                              <SelectItem value="2">2 - Medium</SelectItem>
                              <SelectItem value="3">3 - High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-sm font-normal">Other</Label>
                          <Select
                            value={formData.otherOptions.marketing}
                            onValueChange={(value) => {
                              handleOtherOptionChange("marketing", value);
                              if (value) handleTaskSelection("marketing", value, 2);
                            }}
                          >
                            <SelectTrigger className="h-9">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                              <SelectItem value="SEO Optimization">SEO Optimization</SelectItem>
                              <SelectItem value="Content Writing">Content Writing</SelectItem>
                              <SelectItem value="Event Coordination">Event Coordination</SelectItem>
                              <SelectItem value="Newsletter Management">Newsletter Management</SelectItem>
                              <SelectItem value="Brand Management">Brand Management</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Support Requirements */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label>Legal Admin Support Needed Most (Select all that apply)</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="client-intake"
                        checked={formData.supportNeeded.includes("client-intake")}
                        onCheckedChange={() => handleCheckboxChange("supportNeeded", "client-intake")}
                      />
                      <Label htmlFor="client-intake" className="font-normal">
                        Client intake and communication / People-Facing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="document-prep"
                        checked={formData.supportNeeded.includes("document-prep")}
                        onCheckedChange={() => handleCheckboxChange("supportNeeded", "document-prep")}
                      />
                      <Label htmlFor="document-prep" className="font-normal">
                        Document preparation and filing / Legal Research
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="admin"
                        checked={formData.supportNeeded.includes("admin")}
                        onCheckedChange={() => handleCheckboxChange("supportNeeded", "admin")}
                      />
                      <Label htmlFor="admin" className="font-normal">
                        Calendar, emails, billing / Administrative
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.supportNeeded.includes("marketing")}
                        onCheckedChange={() => handleCheckboxChange("supportNeeded", "marketing")}
                      />
                      <Label htmlFor="marketing" className="font-normal">
                        Social media and outreach / Marketing
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="other"
                        checked={formData.supportNeeded.includes("other")}
                        onCheckedChange={() => handleCheckboxChange("supportNeeded", "other")}
                      />
                      <Label htmlFor="other" className="font-normal">Other (customized)</Label>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label>Contractor's Expected Weekly Hours</Label>
                    <RadioGroup value={formData.weeklyHours} onValueChange={(value) => setFormData({ ...formData, weeklyHours: value })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time" id="part-time" />
                        <Label htmlFor="part-time" className="font-normal">Part-time</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time" className="font-normal">Full-time</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 4: Software Requirements */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <Label>Do you need specific software proficiency?</Label>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Select all software tools that your candidate should be proficient in
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">⚖️ Case Management (e.g., Clio, MyCase, Filevine)</p>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="clio"
                            checked={formData.software.includes("clio")}
                            onCheckedChange={() => handleCheckboxChange("software", "clio")}
                          />
                          <Label htmlFor="clio" className="font-normal">Clio</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="mycase"
                            checked={formData.software.includes("mycase")}
                            onCheckedChange={() => handleCheckboxChange("software", "mycase")}
                          />
                          <Label htmlFor="mycase" className="font-normal">MyCase</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="filevine"
                            checked={formData.software.includes("filevine")}
                            onCheckedChange={() => handleCheckboxChange("software", "filevine")}
                          />
                          <Label htmlFor="filevine" className="font-normal">Filevine</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">👥 CRM (Client Relationship Management) (e.g., Lawmatics, HubSpot, Salesforce)</p>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="lawmatics"
                            checked={formData.software.includes("lawmatics")}
                            onCheckedChange={() => handleCheckboxChange("software", "lawmatics")}
                          />
                          <Label htmlFor="lawmatics" className="font-normal">Lawmatics</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="hubspot"
                            checked={formData.software.includes("hubspot")}
                            onCheckedChange={() => handleCheckboxChange("software", "hubspot")}
                          />
                          <Label htmlFor="hubspot" className="font-normal">HubSpot</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="salesforce"
                            checked={formData.software.includes("salesforce")}
                            onCheckedChange={() => handleCheckboxChange("software", "salesforce")}
                          />
                          <Label htmlFor="salesforce" className="font-normal">Salesforce</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">💬 Communication & Collaboration (e.g., Outlook, Teams, Slack, Zoom)</p>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="outlook"
                            checked={formData.software.includes("outlook")}
                            onCheckedChange={() => handleCheckboxChange("software", "outlook")}
                          />
                          <Label htmlFor="outlook" className="font-normal">Outlook</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="teams"
                            checked={formData.software.includes("teams")}
                            onCheckedChange={() => handleCheckboxChange("software", "teams")}
                          />
                          <Label htmlFor="teams" className="font-normal">Microsoft Teams</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="slack"
                            checked={formData.software.includes("slack")}
                            onCheckedChange={() => handleCheckboxChange("software", "slack")}
                          />
                          <Label htmlFor="slack" className="font-normal">Slack</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="zoom"
                            checked={formData.software.includes("zoom")}
                            onCheckedChange={() => handleCheckboxChange("software", "zoom")}
                          />
                          <Label htmlFor="zoom" className="font-normal">Zoom</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">💳 Billing & Accounting (e.g., QuickBooks, TimeSolv, LeanLaw)</p>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="quickbooks"
                            checked={formData.software.includes("quickbooks")}
                            onCheckedChange={() => handleCheckboxChange("software", "quickbooks")}
                          />
                          <Label htmlFor="quickbooks" className="font-normal">QuickBooks</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="timesolv"
                            checked={formData.software.includes("timesolv")}
                            onCheckedChange={() => handleCheckboxChange("software", "timesolv")}
                          />
                          <Label htmlFor="timesolv" className="font-normal">TimeSolv</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="leanlaw"
                            checked={formData.software.includes("leanlaw")}
                            onCheckedChange={() => handleCheckboxChange("software", "leanlaw")}
                          />
                          <Label htmlFor="leanlaw" className="font-normal">LeanLaw</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">🗓️ Project / Task Management (e.g., Asana, Trello, ClickUp, Notion)</p>
                      <div className="space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="asana"
                            checked={formData.software.includes("asana")}
                            onCheckedChange={() => handleCheckboxChange("software", "asana")}
                          />
                          <Label htmlFor="asana" className="font-normal">Asana</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="trello"
                            checked={formData.software.includes("trello")}
                            onCheckedChange={() => handleCheckboxChange("software", "trello")}
                          />
                          <Label htmlFor="trello" className="font-normal">Trello</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="clickup"
                            checked={formData.software.includes("clickup")}
                            onCheckedChange={() => handleCheckboxChange("software", "clickup")}
                          />
                          <Label htmlFor="clickup" className="font-normal">ClickUp</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notion"
                            checked={formData.software.includes("notion")}
                            onCheckedChange={() => handleCheckboxChange("software", "notion")}
                          />
                          <Label htmlFor="notion" className="font-normal">Notion</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Schedule & Availability */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timeZone">Firm's Time Zone</Label>
                    <Select value={formData.timeZone} onValueChange={(value) => setFormData({ ...formData, timeZone: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ET">Eastern Time (ET)</SelectItem>
                        <SelectItem value="CT">Central Time (CT)</SelectItem>
                        <SelectItem value="MT">Mountain Time (MT)</SelectItem>
                        <SelectItem value="PT">Pacific Time (PT)</SelectItem>
                        <SelectItem value="AT">Alaska Time (AT)</SelectItem>
                        <SelectItem value="HAT">Hawaii-Aleutian Time (HAT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Time Zone & Availability Preference</Label>
                    <RadioGroup value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="exact-overlap" id="exact-overlap" />
                        <Label htmlFor="exact-overlap" className="font-normal">
                          Exact overlap - Must work during my time zone hours
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partial-overlap" id="partial-overlap" />
                        <Label htmlFor="partial-overlap" className="font-normal">
                          Partial overlap - Some shared hours are fine
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible" className="font-normal">
                          Flexible - Asynchronous work is acceptable
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 6: Cultural Fit */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <Label>Personality Traits You Value Most</Label>
                  <RadioGroup value={formData.personality} onValueChange={(value) => setFormData({ ...formData, personality: value })}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="independent" id="independent" />
                      <Label htmlFor="independent" className="font-normal">
                        Independent / Proactive - Self-starter who takes initiative
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="structured" id="structured" />
                      <Label htmlFor="structured" className="font-normal">
                        Structured / Process-Oriented - Follows established procedures closely
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-8 p-6 bg-[hsl(var(--muted))] rounded-lg">
                    <h3 className="font-semibold mb-2">Ready to find your match?</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      Click "Find Matches" to see candidates that best fit your firm's needs based on the assessment you've completed.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                <Button
                  className="bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--lawmatch-orange-hover))] text-white"
                  onClick={handleNext}
                >
                  {currentStep === totalSteps ? "Find Matches" : "Continue"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Why Choose LawWork Section */}
          <div className="mt-16 mb-8">
            <h2 className="text-2xl font-bold text-center text-[hsl(var(--primary))] mb-8">
              Why Choose <BrandName className="text-2xl" />?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                      <Scale className="w-8 h-8 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Expertise</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Legal professionals with proven experience
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Efficiency</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Streamlined matching process saves time
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[hsl(var(--muted))] rounded-lg flex items-center justify-center">
                      <Handshake className="w-8 h-8 text-[hsl(var(--primary))]" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Reliability</h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    Vetted candidates you can trust
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
