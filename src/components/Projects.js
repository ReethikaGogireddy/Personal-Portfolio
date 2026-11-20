import React, { useState, useRef, useEffect } from "react";
import imagenotavail from "../assets/imagenotavail.png";

const projects = [
  {
    id: 1,
    title: "SentinelAI",
    image: imagenotavail,
    short: "AI-Powered Privacy Policy Analyzer.",
    description:
      "An AI-powered privacy policy analyzer that extracts text and identifies high-risk permissions such as camera, microphone, location, and clipboard access. Built with a clause-level document processing pipeline and an LLM guidance layer.",
    bullets: [
      "Built an AI-powered privacy policy analyzer that extracts text and identifies high-risk permissions such as camera, microphone, location, and clipboard access.",
      "Developed a document processing pipeline for PDF, URL, and text inputs with text extraction and clause-level segmentation.",
      "Implemented rule-based and NLP-driven permission detection, risk assessment, and prioritized alert generation using REST APIs.",
      "Integrated an LLM-based guidance layer to generate user-friendly explanations and recommendations for detected privacy risks.",
    ],
    tech: ["React", "FastAPI", "Python", "NLP", "LLMs", "REST APIs", "Docker"],
    color: "#FF6B6B",
    link: "https://github.com/SiddharthGogireddy/SentinelAI",
  },
  {
    id: 2,
    title: "AI Interview Simulator",
    image: imagenotavail,
    short: "Personalized AI-powered interview practice.",
    description:
      "A RAG-powered interview preparation platform that generates personalized technical and behavioral interview questions from uploaded resumes, enabling realistic mock interviews with AI-driven feedback.",
    bullets: [
      "Built an AI interview platform generating personalized technical and behavioral questions from uploaded resumes.",
      "Developed a RAG pipeline using resume chunking, embeddings, and semantic search for context-aware interactions.",
      "Implemented resume upload, PDF extraction, storage, and backend APIs for interview sessions, question generation, and response evaluation.",
      "Integrated LLMs to deliver real-time interview feedback.",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "LLMs", "RAG"],
    color: "#FFE66D",
    link: "https://github.com/SiddharthGogireddy/ai-interview-simulator",
  },
  {
    id: 3,
    title: "TravelSync AI",
    image: imagenotavail,
    short: "AI-Powered Personalized Travel Planner.",
    description:
      "An AI-powered travel planning platform that generates personalized trip itineraries based on user preferences, destinations, and budgets with intelligent recommendations, route planning, and day-wise scheduling.",
    bullets: [
      "Built an AI-powered travel planning platform that generates personalized trip itineraries based on user preferences, destinations, and budgets.",
      "Implemented intelligent recommendations for tourist attractions, hotels, restaurants, and transportation.",
      "Developed features for route planning, budget estimation, weather updates, and day-wise trip scheduling.",
      "Integrated external APIs and AI-driven recommendations to deliver context-aware travel suggestions.",
    ],
    tech: ["Next.js", "React", "FastAPI", "Python", "AI/LLMs", "Maps API", "Weather API"],
    color: "#4ECDC4",
    link: "https://github.com/SiddharthGogireddy/TravelSync-AI",
  },
];

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (selected && closeBtnRef.current) closeBtnRef.current.focus();
  }, [selected]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="w-full min-h-screen py-20 px-6 text-white" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-left">Projects</h2>

        {/* Project Grid */}
        <div className="projects-grid">
          {projects.map((p) => (
            <article
              key={p.id}
              className="project-card-custom"
              onClick={() => setSelected(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") setSelected(p); }}
            >
              <div className="project-image-container">
                <img src={p.image} alt={p.title} className="project-img" />
              </div>
              <div className="project-content" style={{ background: `linear-gradient(135deg, ${p.color}20, ${p.color}40)` }}>
                <h3 className="project-card-title">{p.title}</h3>
                <p className="project-card-short">{p.short}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            role="dialog" 
            aria-modal="true" 
            onClick={() => setSelected(null)}
          >
            <div 
              className="bg-gray-900 max-w-4xl w-full rounded-xl overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                ref={closeBtnRef}
                className="absolute right-4 top-4 text-white text-2xl bg-transparent border-none cursor-pointer hover:text-gray-300 z-10"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <img 
                  src={selected.image} 
                  alt={selected.title} 
                  className="w-full md:w-1/2 max-h-96 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-white mb-4">{selected.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{selected.description}</p>
                  {selected.bullets && (
                    <ul className="list-disc list-inside text-gray-300 text-sm mb-4 space-y-1.5">
                      {selected.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  )}
                  <p className="text-sm text-gray-400 mb-6">
                    <strong>Tech Stack:</strong> {selected.tech.join(", ")}
                  </p>
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-6 py-2 bg-[#865DFF] text-white rounded-lg hover:bg-[#7d52e8] transition-colors font-semibold"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        @media (min-width: 640px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1200px) {
          .projects-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .project-card-custom {
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .project-card-custom:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 32px rgba(0,0,0,0.6);
          z-index: 10;
        }

        .project-image-container {
          height: 160px;
          background: #0b1220;
          overflow: hidden;
          flex-shrink: 0;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card-custom:hover .project-img {
          transform: scale(1.05);
        }

        .project-content {
          padding: 12px;
          text-align: center;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .project-card-title {
          margin: 0 0 8px 0;
          font-size: 0.95rem;
          font-weight: 600;
          color: #ffffff;
        }

        .project-card-short {
          margin: 0;
          font-size: 0.8rem;
          color: #f3f4f6;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .project-image-container {
            height: 140px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;