import "./Home.css";
import { useState, useEffect, useRef } from "react";
import { Element, scroller } from "react-scroll";


const AnimatedName = ({ text }) => {
  // split into letters and wrap
  return (
    <span className="animated-name" aria-hidden="false">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="letter"
          style={{ ['--i' /* eslint-disable-line no-useless-computed-key */]: i }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
};

const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const typingStarted = useRef(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (typingStarted.current) return;
    typingStarted.current = true;

    // const words = ["Designer", "Full Stack Developer", "App Developer", "AI/ML Enthusiast", "Tech Lover"];
    const words = ["AI/ ML Engineer", "Software Engineer"];
    let cancelled = false;
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    async function loopTyping(list) {
      while (!cancelled) {
        for (const word of list) {
          // type in
          for (let i = 1; i <= word.length; i++) {
            if (cancelled) return;
            setDisplayedText(word.slice(0, i));
            await sleep(90);
          }

          // pause on full word
          await sleep(400);

          // delete
          for (let i = word.length; i >= 0; i--) {
            if (cancelled) return;
            setDisplayedText(word.slice(0, i));
            await sleep(40);
          }

          // brief pause before next word
          await sleep(120);
        }
      }
    }

    loopTyping(words);

    return () => {
      cancelled = true;
      typingStarted.current = false;
    };
  }, []);

  // Mouse move parallax
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    function onMove(e) {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 -> 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      // push CSS vars for parallax usage
      hero.style.setProperty("--mx", x.toFixed(3));
      hero.style.setProperty("--my", y.toFixed(3));
      // spotlight position
      hero.style.setProperty("--sx", `${((x + 0.5) * 100).toFixed(1)}%`);
      hero.style.setProperty("--sy", `${((y + 0.5) * 100).toFixed(1)}%`);
    }

    function onLeave() {
      hero.style.setProperty("--mx", 0);
      hero.style.setProperty("--my", 0);
    }

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("touchmove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("touchmove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Element id="home" name="home" className="w-full h-screen reveal">
      <div
        ref={heroRef}
        className="hero-stage"
        /* CSS vars: --mx, --my, --sx, --sy will be updated on mousemove */
      >
        {/* morphing SVG blob */}
        <svg
  className="morph-blob"
  viewBox="0 0 600 400"
  preserveAspectRatio="xMidYMid meet"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="g1" x1="0" x2="1">
      <stop offset="0%" stopColor="#6b6bff" />
      <stop offset="45%" stopColor="#9b6bff" />
      <stop offset="100%" stopColor="#ff6b9a" />
    </linearGradient>

    <filter id="f1" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="22" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.6 0
        "
      />
    </filter>
  </defs>

  <g filter="url(#f1)">
    <path
      d="M156 22c56-8 120-39 178-6s106 86 115 142-24 122-76 150-120 10-174-18S76 226 64 166 100 30 156 22z"
      fill="url(#g1)"
      opacity="0.85"
    />
    <path
      d="M180 10c58 2 120 4 170 36s94 94 86 150-36 108-86 132-118 12-170-12S50 232 56 170 122 8 180 10z"
      fill="url(#g1)"
      opacity="0.45"
    />
  </g>
</svg>
      
<svg
  className="morph-blob blob-secondary"
  viewBox="0 0 600 400"
  preserveAspectRatio="xMidYMid meet"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#3967b2ff" />
      <stop offset="30%" stopColor="#12aaa5ff" />
      <stop offset="65%" stopColor="#A7E399" />
      <stop offset="100%" stopColor="#eff983ff" />
    </linearGradient>

    {/* expanded filter to avoid line artifacts */}
    <filter id="f2" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="20" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.55 0
        "
      />
    </filter>
  </defs>

  <g filter="url(#f2)">
    <path
      d="M110 60c70-50 190-40 260 10s100 140 60 200-140 100-230 80S20 230 40 150 40 110 110 60z"
      fill="url(#g2)"
      opacity="0.7"
      transform={`translate(calc(var(--mx) * 14px), calc(var(--my) * 10px))`}
    />
  </g>
</svg>
{/* warm accent blob */}
<svg
  className="morph-blob blob-warm"
  viewBox="0 0 600 400"
  preserveAspectRatio="xMidYMid meet"
  aria-hidden="true"
>
  <defs>
    <linearGradient id="g-warm" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#f3bc3dff" />
      <stop offset="35%" stopColor="#f8b286ff" />
      <stop offset="65%" stopColor="#f13f3fff" />
      <stop offset="100%" stopColor="#b6527aff" />
    </linearGradient>

    {/* expanded filter prevents banding */}
    <filter id="f-warm" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="22" result="blur" />
      <feColorMatrix
        in="blur"
        type="matrix"
        values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.5 0
        "
      />
    </filter>
  </defs>

  <g filter="url(#f-warm)">
    <path
      d="M120 40c90-60 240-40 310 40s60 200-20 260-220 80-300 20S20 200 40 120 40 80 120 40z"
      fill="url(#g-warm)"
      opacity="0.65"
      transform={`translate(calc(var(--mx) * 12px), calc(var(--my) * 10px))`}
    />
  </g>
</svg>




        {/* spotlight / glow that follows cursor */}
        <div className="hero-spotlight" />

        {/* Right profile */}
        <div
          className="profile-wrap"
          style={{
            transform: `translate3d(calc(var(--mx) * 40px), calc(var(--my) * 20px), 0)`,
          }}
        >
          {/* <div className="profile-ring">
            <img src={profileImg} alt="Reethika" className="profile-photo" />
          </div> */}
        </div>

        {/* Left content */}
        <div className="hero-content">
          <h1 className="hero-heading">
    <div className="line-one">
      <span className="wave" aria-hidden="true">👋</span>
    </div>

    <div className="line-two">
      <span className="iam">I am</span> {" "}
    </div>
    <div className="line-three">
      <AnimatedName text="Siddharth Gogireddy" />
    </div>
  </h1>

          <p className="hero-sub">
            I enjoy turning complex problems and ideas into {" "}
            <span className="italicized">interactive experiences.</span>
          </p>

          <div className="hero-actions">
                  <button
    type="button"
    className="cta"
    onClick={() =>
      window.open(
        "https://drive.google.com/file/d/1FA9pA5iTrsrkPZsS98JaEPB1nDyE1tPd/view?usp=drive_link",
        "_blank",
        "noopener,noreferrer"
      )
    }
  >
    View Resume
  </button>
                {/* <button
                  type="button"
                  className="resume-cta"
                  onClick={() => {
                    const nav = document.querySelector("nav");
                    const navH = nav ? Math.round(nav.getBoundingClientRect().height) : 80;
                    const el = document.getElementById("contact");
                    const paddingTop = el ? parseFloat(getComputedStyle(el).paddingTop) || 0 : 0;
                    const offset = Math.round(paddingTop - navH - 12);
                    scroller.scrollTo("contact", { smooth: true, duration: 500, offset });
                  }}
                >
                  View Resume
                </button> */}

                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    const nav = document.querySelector("nav");
                    const navH = nav ? Math.round(nav.getBoundingClientRect().height) : 80;
                    const el = document.getElementById("contact");
                    const paddingTop = el ? parseFloat(getComputedStyle(el).paddingTop) || 0 : 0;
                    const offset = Math.round(paddingTop - navH - 12);
                    scroller.scrollTo("contact", { smooth: true, duration: 500, offset });
                  }}
                >
                  Contact
                </button>
                
          </div>

          <pre className="typing-line">
            {displayedText}
            <span className="cursor">|</span>
          </pre>
        </div>
      </div>
    </Element>
  );
};

export default Home;
