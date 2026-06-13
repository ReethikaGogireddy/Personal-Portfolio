import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, scrollSpy } from "react-scroll";

const MOBILE_BREAKPOINT = 768;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [navHeight, setNavHeight] = useState(80);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (navRef.current) setNavHeight(navRef.current.getBoundingClientRect().height);
      if (scrollSpy && typeof scrollSpy.update === "function") scrollSpy.update();
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (scrollSpy && typeof scrollSpy.update === "function") scrollSpy.update();
  }, []);

  // Detect mobile width
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // ensure menu closes when returning to desktop
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close mobile menu on scroll (optional but nice UX)
  useEffect(() => {
    if (!isMobile || !menuOpen) return;
    const onScroll = () => setMenuOpen(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, menuOpen]);

  // Observe sections to reliably update activeSection
  useEffect(() => {
    const ids = ["home", "about", "skills", "projects", "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visible[0].target.id);
      },
      {
        root: null,
        rootMargin: `-${Math.round(navHeight)}px 0px -40% 0px`,
        threshold: [0.25, 0.5, 0.75],
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [navHeight]);

  const computeOffset = (targetId, gap = 12) => {
    if (typeof document === "undefined") return -Math.round(navHeight) - gap;
    const el = document.getElementById(targetId);
    const paddingTop = el ? parseFloat(getComputedStyle(el).paddingTop) || 0 : 0;
    return Math.round(paddingTop - navHeight - gap);
  };

  const handleNavClick = () => {
    if (isMobile) setMenuOpen(false);
  };

  const NavLinks = ({ mobile = false }) => (
    <ul
      className={`list-none flex font-fjalla tracking-widest text-xl pointer-events-auto text-yellow-400
        ${mobile ? "nav-mobile-list" : "flex-row space-x-4 top-0 right-0 pr-5"}
      `}
    >
      {["home", "about", "skills", "projects", "contact"].map((id) => (
        <li key={id}>
          <Link
            to={id}
            smooth={true}
            duration={500}
            offset={computeOffset(id)}
            onClick={handleNavClick}
            className={`font-bold cursor-pointer nav-link ${activeSection === id ? "active" : ""}`}
            aria-current={activeSection === id ? "page" : undefined}
          >
            {id.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
  <nav
    ref={navRef}
    className="fixed top-0 left-0 w-full z-50 flex pt-5 justify-between navbar-root"
    role="navigation"
    aria-label="Main Navigation"
  >
    <div className="top-0 left-0 ml-10 pb-10" />

    {/* Desktop links */}
    <div className="nav-desktop">
      <NavLinks />
    </div>

    {/* Mobile hamburger */}
    <div className="nav-mobile">
      <button
        type="button"
        className="hamburger-btn"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={`hamburger ${menuOpen ? "open" : ""}`} />
      </button>

      {/* Mobile overlay */}
      {isMobile && menuOpen && (
        <div className="mobile-overlay">
          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          <div className="mobile-menu-content">
            <NavLinks mobile />
          </div>
        </div>
      )}
    </div>
  </nav>
);
};

export default Navbar;