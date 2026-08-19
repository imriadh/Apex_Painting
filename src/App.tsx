import { useCallback, useState } from "react";
import type { ProjectType } from "./config/site";
import { usePrefersReducedMotion } from "./lib/hooks";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhyUs from "./components/WhyUs";
import Services from "./components/Services";
import BeforeAfter from "./components/BeforeAfter";
import Reviews from "./components/Reviews";
import EstimateForm from "./components/EstimateForm";
import Footer from "./components/Footer";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | "">("");
  const reduced = usePrefersReducedMotion();

  /** Service cards preselect the project type and hand the visitor to the form. */
  const handleServiceRequest = useCallback(
    (type: ProjectType) => {
      setSelectedProject(type);
      document.getElementById("estimate")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  return (
    <div className="min-h-screen bg-navy-950">
      <a
        href="#why-us"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-5 focus:py-3 focus:font-bold focus:text-navy-950"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero />
        <WhyUs />
        <Services onRequest={handleServiceRequest} />
        <BeforeAfter />
        <Reviews />
        <EstimateForm selectedProject={selectedProject} />
      </main>

      <Footer />

      {/* Ambient film grain */}
      <div className="noise-overlay" aria-hidden="true" />
    </div>
  );
}
