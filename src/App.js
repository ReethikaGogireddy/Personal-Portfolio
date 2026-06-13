import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import About from "./components/About";
import Home from "./components/Home";
import Projects from "./components/Projects";
// Use the ProjectDetail component (modal-enabled project view)
import "./App.css";

// ⬇️ import the global scroll reveal utility
import initScrollReveal from "./components/ScrollReveal.js";
import Skills from "./components/Skills.js";

function App() {

  // ⬇️ initialize scroll reveal ONCE for the whole app
  useEffect(() => {
    const cleanup = initScrollReveal({
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
      once: true, // animate only once
    });

    return () => cleanup && cleanup();
  }, []);

  return (
    <div className="App bg-[#141414] text-white">
      <div
        className="magicpattern"
        aria-hidden="true"
      />
      <div className="main">
        
        <Navbar />

        {/* add className="reveal" to any section you want animated */}
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />

      </div>
    </div>
  );
}

export default App;
