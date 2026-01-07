
import { useState } from "react";
import { Bug, ChevronDown, ChevronUp } from "lucide-react";
import aboutImg1 from "@/assets/AboutUs/image21.png";
import aboutImg2 from "@/assets/AboutUs/image22.png";
import { cn } from "@/lib/utils";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-16 md:space-y-24">
      {/* Section 1: In a world full of bugs */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            In a world full of bugs <Bug className="w-5 h-5" />
          </h2>
          <p className="text-base font-medium">
            <span className="text-red-500">Bugsy</span> is the Ladybug that finds them{" "}
            <span className="text-green-500">before they grow</span>
          </p>
          <div className="space-y-3 text-gray-700">
            <p className="font-medium text-gray-900">Bugsy was built to:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm md:text-base">
              <li>Detect vulnerabilities that are not always obvious</li>
              <li>Bridge the gap between design and security</li>
              <li>Help you build stronger and more secure web applications</li>
            </ul>
          </div>
          <p className="font-medium flex items-center gap-2 text-sm md:text-base">
            Because every small bug <Bug className="w-4 h-4" /> can turn into a big problem
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={aboutImg1}
            alt="Bugsy visual representation"
            className="rounded-lg shadow-lg w-full max-w-md object-cover md:h-64 h-auto"
          />
        </div>
      </section>

      {/* Section 2: Why Bugsy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:flex-row-reverse">
        {/* Image on Left for Desktop, Top for Mobile */}
        <div className="flex justify-center md:justify-start order-2 md:order-1">
          <img
            src={aboutImg2}
            alt="Why Bugsy"
            className="rounded-lg shadow-lg w-full max-w-md object-cover md:h-64 h-auto"
          />
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <h2 className="text-2xl font-bold flex items-center justify-end md:justify-start gap-2">
            Why Bugsy <Bug className="w-5 h-5" />
          </h2>
          <p className="text-gray-700 leading-relaxed text-right md:text-left">
            Instead of hiding security issues behind complex reports, Bugsy makes
            vulnerabilities visible and understandable by clearly marking where they
            exist, what type they are, and how they impact the system.
          </p>
        </div>
      </section>

      {/* Section 3: Definition */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        <p className="text-gray-800 leading-relaxed text-lg">
          <span className="text-red-500 font-bold">Bugsy</span> is a web-based
          platform designed to detect, visualize, highlight, and explain security
          vulnerabilities in web applications. aims to help developers, students,
          and security learners understand security flaws, analyze them
          effectively, and improve the overall security of web applications.
        </p>
      </section>

      {/* Section 4: Goal & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Our goal</h3>
          <div className="text-gray-700 space-y-2">
            <p>to make security vulnerabilities:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Easier to detect</li>
              <li>Clear to understand</li>
              <li>Faster to fix</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To simplify web security analysis by providing a clear and organized way
            to discover and classify vulnerabilities before they can be exploited.
          </p>
        </div>
      </section>

      {/* Section 5: Levels Accordion */}
      <section className="max-w-3xl mx-auto space-y-6">
        <AccordionItem
          level="Level 1"
          color="red"
          description="Minor security issues that have limited impact on the system."
          includes={[
            "Informational security warnings",
            "Best practice violations",
            "Low-risk exposure points",
          ]}
          impact="Low immediate risk, but should be fixed to improve overall security posture"
        />
        <AccordionItem
          level="Level 2"
          color="green"
          description="Vulnerabilities that do not immediately compromise the system but can be exploited under certain conditions."
          includes={[
            "Misconfigurations",
            "Insecure data handling",
            "Weak validation mechanisms",
          ]}
          impact="Potential security risk if combined with other vulnerabilities."
        />
        <AccordionItem
          level="Level 3"
          color="blue"
          description="Critical vulnerabilities that can lead to serious security breaches."
          includes={[
            "Unauthorized access",
            "Data leakage",
            "Injection attacks",
            "Authentication bypass",
          ]}
          impact="Immediate risk to the system and user data.\nMust be fixed as soon as possible"
        />
      </section>

      {/* Footer Quote */}
      <div className="text-center md:pb-12">
        <p className="font-semibold text-gray-900 text-lg">
          Bugsy is not just about finding vulnerabilities it's about understanding
          how they work and how to prevent them.
        </p>
      </div>
    </div>
  );
};

const AccordionItem = ({
  level,
  color,
  description,
  includes,
  impact,
}: {
  level: string;
  color: "red" | "green" | "blue";
  description: string;
  includes: string[];
  impact: string;
}) => {
  const [isOpen, setIsOpen] = useState(true); // Default open based on screenshot, or maybe toggleable. Screenshot shows all open or just titles? Screenshot shows Level 1 Expanded, others closed? No, image has all expanded in the screenshot actually? Wait, the screenshot shows content for all levels. So they might be just cards, or open accordions. The prompt says "Accordion" in my own thought process, but looking at the image, they have carets (maybe). Let's make them collapsible but default open or closed. Let's make them default open for now or standard accordion. 
  // Actually, looking closely at the screenshot crop "Level 1 v", it has a caret.
  // I will make them collapsible.

  const bugColors = {
    red: "text-red-500",
    green: "text-green-500",
    blue: "text-blue-500",
  };

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left group hover:bg-gray-50/50 transition-colors rounded-lg px-2"
      >
        <div className="flex items-center gap-3">
          {/* Bug Icon */}
          <Bug className={cn("w-6 h-6", bugColors[color])} />
          <span className="text-lg font-bold text-gray-900">{level}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="pl-4 md:pl-11 pr-4 pb-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-gray-700">{description}</p>

          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-900">Includes:</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {includes.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-900">Impact:</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">{impact}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;