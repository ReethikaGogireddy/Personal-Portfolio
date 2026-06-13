// src/components/About.js
import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";

/* ---------- Small content components ---------- */
const ExperienceContent = () => (
  <div className="space-y-6">
    <div className="reveal-child" data-order="0">
      <h3 className="text-base font-semibold text-white/90">Software Engineer Intern  - Axentra OS</h3>
      <p className="text-xs text-gray-400">March 2026 - Present</p>
      <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
        <li>Responsible for contributing to full-stack development using React, FastAPI, and PostgreSQL, while supporting
data analytics and AI-driven feature development.</li>
      </ul>
    </div>
    <div className="reveal-child" data-order="1">
      <h3 className="text-base font-semibold text-white/90">Freelancer</h3>
      <p className="text-xs text-gray-400">Self-employed · Oct 2024 - Dec 2024</p>
      <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
        <li> Developed a responsive React.js interface enabling real-time interaction with contextual responses powered by embedding-based databases.</li>
        <li>Designed and built personal websites tailored to individual requirements.</li>
      </ul>
    </div>

    <div className="reveal-child" data-order="2">
      <h3 className="text-base font-semibold text-white/90">SAP BTP Developer</h3>
      <p className="text-xs text-gray-400">SATINFOTECH · Mar 2024 - Sept 2024</p>
      <ul className="list-disc text-base list-inside mt-2 text-gray-300  space-y-1">
        <li>Contributed to the development of a full-stack invoicing application with automated tax calculation.</li>
        <li> Implemented features to create and track business invoices across different tax scenarios.</li>
        <li>Developed an interactive dashboard to visualize product usage and tax impact across transactions.</li>
      </ul>
    </div>
  </div>
);

const EducationContent = () => (
  <div className="space-y-6">
    <div className="reveal-child" data-order="0">
      <h3 className="text-base font-semibold text-white/90">Bachelor's of Technology in Computer Science (AI and ML Specialization)</h3>
      <p className="text-xs text-gray-400">Jawaharlal Nehru Technological University · 2023 – Present</p>
      <p className="mt-2 text-gray-300">Coursework: Data Structures and Algorithms, Databases, Web Development, Software Engineering.</p>
      <p className="mt-1 text-gray-300 font-semibold">CGPA</p>
    </div>
  </div>
);

// const ExtracurricularContent = () => (
//   <div className="space-y-6">

//     <div className="reveal-child" data-order="0">
//       <h3 className="text-base font-semibold text-white/90">Mentor - Women in Computer Science at ASU</h3>
//       <p className="text-xs text-gray-400">Jan 2026 - Present</p>
//       <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
//         <li>Responsible for mentoring and developing project by guiding junior developers in a team environment.</li>
//       </ul>
//     </div>
//     <div className="reveal-child" data-order="1">
//       <h3 className="text-base font-semibold text-white/90">Hackathon JNTUH</h3>
//       <p className="text-xs text-gray-400">Participant · 2022 – 2024</p>
//       <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
//         <li>Placed top 3 in College Hackathon for a Interactive analytics web app prototype.</li>
//         <li>Won cash prize and qualified for next level.</li>
//       </ul>
//     </div>

//     <div className="reveal-child" data-order="2">
//       <h3 className="text-base font-semibold text-white/90">Volunteering & Clubs, JNTUH</h3>
//       <p className="text-xs text-gray-400">Volunteer · Nov 2020 - Jan 2021  </p>
//       <ul className="list-disc list-inside mt-2 text-gray-300 space-y-1">
//         <li>Mentored junior developers in weekly coding workshops.</li>
//         <li>Organized campus tech talks and study groups.</li>
//       </ul>
//     </div>
//   </div>
// );

/* ---------- Shared glass card classes ---------- */
const glassCardClasses =
  "rounded-2xl bg-white/6 backdrop-blur-sm border border-white/8 p-4 shadow-[0_10px_30px_rgba(2,6,23,0.6)] transition-transform duration-300";

/* ---------- Main About component (reverted design with reveal) ---------- */
export default function About() {
  const [activeTab, setActiveTab] = useState("education");
  const sectionRef = useRef(null);
  const linksRef = useRef(null);
  const observerRef = useRef(null);

  // Inject minimal reveal CSS once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = "about-reveal-styles";
    if (document.getElementById(id)) return;

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = `
      /* reveal base */
      .reveal { opacity: 0; transform: translateY(10px); transition: opacity 560ms cubic-bezier(.2,.9,.3,1), transform 560ms cubic-bezier(.2,.9,.3,1); }
      .reveal.is-revealed { opacity: 1; transform: translateY(0); }

      /* reveal-child (staggered children) */
      .reveal-child { opacity: 0; transform: translateY(6px); transition: opacity 420ms ease, transform 420ms ease; }
      .reveal-child.is-revealed { opacity: 1; transform: translateY(0); }

      /* small helper so we can temporarily hide children before they are revealed */
      .reveal .reveal-child { will-change: transform, opacity; }
    `;
    document.head.appendChild(style);
  }, []);

  // IntersectionObserver to reveal .reveal containers and stagger reveal-child elements
  useEffect(() => {
    if (typeof window === "undefined") return;

    const revealTargets = Array.from(document.querySelectorAll(".reveal"));
    if (!revealTargets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("is-revealed");

            // stagger children
            const children = Array.from(el.querySelectorAll(".reveal-child"));
            children.forEach((child, idx) => {
              // if element has explicit data-order, use it. otherwise use index.
              const orderAttr = child.getAttribute("data-order");
              const order = orderAttr != null ? Number(orderAttr) : idx;
              const delay = 60 + order * 80; // ms
              setTimeout(() => child.classList.add("is-revealed"), delay);
            });

            // If already visible, unobserve to avoid repeated work
            io.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -8% 0px", // reveal slightly before bottom
        threshold: 0.08,
      }
    );

    revealTargets.forEach((t) => io.observe(t));
    observerRef.current = io;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // keep your existing hash / scroll-to-about behavior
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollWithHeaderOffset = (targetEl, extraOffset = 8) => {
      if (!targetEl) return;
      const header =
        document.querySelector("header") ||
        document.querySelector(".site-header") ||
        document.querySelector("#header");
      const headerHeight = header ? header.getBoundingClientRect().height : 72;
      const rect = targetEl.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const targetY = Math.max(absoluteTop - headerHeight - extraOffset, 0);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    };

    const ensureLinksVisible = () => {
      if (!linksRef.current) return;
      const linksRect = linksRef.current.getBoundingClientRect();
      const bottomVisible = window.innerHeight - 8;
      if (linksRect.bottom > bottomVisible) {
        const overflow = linksRect.bottom - bottomVisible;
        window.scrollBy({ top: overflow + 8, behavior: "smooth" });
      }
    };

    const handleInitialHash = () => {
      if (window.location.hash === "#about" && sectionRef.current) {
        setTimeout(() => {
          scrollWithHeaderOffset(sectionRef.current);
          setTimeout(ensureLinksVisible, 250);
          try {
            sectionRef.current.focus({ preventScroll: true });
          } catch (e) {}
        }, 60);
      }
    };

    handleInitialHash();

    const onHashChange = () => {
      if (window.location.hash === "#about" && sectionRef.current) {
        scrollWithHeaderOffset(sectionRef.current);
        setTimeout(ensureLinksVisible, 250);
        try {
          sectionRef.current.focus({ preventScroll: true });
        } catch (e) {}
      }
    };

    const onCustomGo = () => {
      if (sectionRef.current) {
        scrollWithHeaderOffset(sectionRef.current);
        setTimeout(ensureLinksVisible, 250);
      }
    };

    window.addEventListener("hashchange", onHashChange, false);
    window.addEventListener("go-to-about", onCustomGo, false);

    return () => {
      window.removeEventListener("hashchange", onHashChange, false);
      window.removeEventListener("go-to-about", onCustomGo, false);
    };
  }, []);

  return (
    <Element id="about" name="about" className="w-full min-h-screen pt-16 px-6 text-white">
      <div ref={sectionRef} tabIndex={-1} style={{ scrollMarginTop: "96px" }}>
        {/* Header */}
        <div className="max-w-5xl mx-auto reveal">
          <h1 className="text-left text-3xl font-extrabold text-white mb-6 reveal-child" data-order="0">
            About Me
          </h1>
        </div>

        {/* Content grid */}
        <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="md:col-span-1 space-y-6 reveal">
            {/* Combined Summary & Skills */}
            <section className={`${glassCardClasses} reveal-child`} data-order="0">
              <h2 className="text-lg font-semibold text-white/95 mb-2">Summary</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
               I’m a curious full-stack developer with AI and ML skills and currently a Computer Science ( AI and ML ) student at Jawaharlal Nehru Technological University, Hyderbad.
              </p>
            </section>

            {/* Links */}
            <section ref={linksRef} className={`${glassCardClasses} reveal-child`} data-order="1">
              <h2 className="text-lg font-semibold text-white/95 mb-2">Links</h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>
                  <a href="https://www.linkedin.com/in/siddharth-gogireddy-67b427298/" target="_blank" rel="noreferrer" className="hover:text-white transition">
                    🔗 LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/SiddharthGogireddy" target="_blank" rel="noreferrer" className="hover:text-white transition">
                    💻 GitHub
                  </a>
                </li>
              </ul>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-2 reveal">
            <div className={`${glassCardClasses} p-4 sm:p-6 reveal-child`} data-order="0">
              {/* tab buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
                  {/* <button
                    type="button"
                    // onClick={() => setActiveTab("experience")}
                    className={`px-4 py-2 sm:py-1 rounded-full text-sm font-medium transition focus:outline-none ${
                      activeTab === "experience" ? "bg-[#865DFF] text-white shadow-lg" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Experience
                  </button> */}

                  <button
                    type="button"
                    onClick={() => setActiveTab("education")}
                    className={`px-4 py-2 sm:py-1 rounded-full text-sm font-medium transition focus:outline-none ${
                      activeTab === "education" ? "bg-[#865DFF] text-white shadow-lg" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Education
                  </button>

                  {/* <button
                    type="button"
                    onClick={() => setActiveTab("extracurricular")}
                    className={`px-4 py-2 sm:py-1 rounded-full text-sm font-medium transition focus:outline-none ${
                      activeTab === "extracurricular" ? "bg-[#865DFF] text-white shadow-lg" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    Extracurricular
                  </button> */}
                </div>

                {/* <div className="hidden md:block text-sm text-gray-400">
                  Toggle to view detailed experience, education or extracurriculars
                </div> */}
              </div>

              {/* content */}
              {activeTab === "experience" ? (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4 reveal-child" data-order="1">
                    Experience
                  </h2>
                  <div className="space-y-6 pl-5 reveal-child" data-order="2">
                    <ExperienceContent />
                  </div>
                </div>
              ) : activeTab === "education" ? (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4 reveal-child" data-order="1">
                    Education
                  </h2>
                  <div className="space-y-6 pl-5 reveal-child" data-order="2">
                    <EducationContent />
                  </div>
                </div>
              ) : (
                <div>
                  {/* <h2 className="text-2xl font-semibold text-white mb-4 reveal-child" data-order="1">
                    Extracurricular
                  </h2>
                  <div className="space-y-6 pl-5 reveal-child" data-order="2">
                    <ExtracurricularContent />
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-28" />
      </div>
    </Element>
  );
}