"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/lawmatch/header";
import { StepIndicator } from "@/components/lawmatch/step-indicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, FileText, Handshake } from "lucide-react";

interface AssessmentData {
  firmName: string;
  role: string;
  practiceArea: string;
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
    role: "",
    practiceArea: "",
    supportNeeded: [],
    weeklyHours: "",
    software: [],
    timeZone: "",
    availability: "",
    personality: "",
  });

  const totalSteps = 5;

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
                {currentStep === 2 && "Section 2: Support Requirements"}
                {currentStep === 3 && "Section 3: Software & Tools"}
                {currentStep === 4 && "Section 4: Schedule & Availability"}
                {currentStep === 5 && "Section 5: Cultural Fit"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your firm and role"}
                {currentStep === 2 && "Define the type of support you need most"}
                {currentStep === 3 && "Indicate the tools your team uses"}
                {currentStep === 4 && "Set availability expectations"}
                {currentStep === 5 && "Choose personality traits you value"}
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
                    <Label>Select Your Role</Label>
                    <RadioGroup value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="attorney" id="attorney" />
                        <Label htmlFor="attorney" className="font-normal">⚖️ Attorney / Partner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paralegal" id="paralegal" />
                        <Label htmlFor="paralegal" className="font-normal">👩‍💼 Paralegal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="operations" id="operations" />
                        <Label htmlFor="operations" className="font-normal">🧾 Operations Manager</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="marketing" id="marketing" />
                        <Label htmlFor="marketing" className="font-normal">📈 Marketing Lead</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="finance" id="finance" />
                        <Label htmlFor="finance" className="font-normal">💳 Finance Admin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="solo" id="solo" />
                        <Label htmlFor="solo" className="font-normal">👤 Solo Practitioner</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="consultant" id="consultant" />
                        <Label htmlFor="consultant" className="font-normal">🌐 Consultant</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="practiceArea">Practice Area</Label>
                    <Select value={formData.practiceArea} onValueChange={(value) => setFormData({ ...formData, practiceArea: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your focus area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                        <SelectItem value="criminal">Criminal</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="immigration">Immigration</SelectItem>
                        <SelectItem value="personal-injury">Personal Injury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Support Requirements */}
              {currentStep === 2 && (
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
                        <RadioGroupItem value="part-time-10-20" id="part-time-10-20" />
                        <Label htmlFor="part-time-10-20" className="font-normal">Part-time (10-20 hours/week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="part-time-20-30" id="part-time-20-30" />
                        <Label htmlFor="part-time-20-30" className="font-normal">Part-time (20-30 hours/week)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time" className="font-normal">Full-time (40+ hours/week)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Step 3: Software Requirements */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <Label>Software Proficiency Requirements (Select all that apply)</Label>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">⚖️ Case Management</p>
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
                      <p className="text-sm font-medium mb-2">👥 CRM</p>
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
                      <p className="text-sm font-medium mb-2">💳 Billing</p>
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
                            id="leanlaw"
                            checked={formData.software.includes("leanlaw")}
                            onCheckedChange={() => handleCheckboxChange("software", "leanlaw")}
                          />
                          <Label htmlFor="leanlaw" className="font-normal">LeanLaw</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="timesolv"
                            checked={formData.software.includes("timesolv")}
                            onCheckedChange={() => handleCheckboxChange("software", "timesolv")}
                          />
                          <Label htmlFor="timesolv" className="font-normal">TimeSolv</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Schedule & Availability */}
              {currentStep === 4 && (
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

              {/* Step 5: Cultural Fit */}
              {currentStep === 5 && (
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
              Why Choose LawWork?
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
