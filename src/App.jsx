import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Terminal,
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  GitCommit,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

/* ---------------------------------------------------------------
   DATA — sourced from resume
---------------------------------------------------------------- */

const PROFILE = {
  name: "Rohit Kumar Patel",
  title: "Senior Software Engineer",
  tagline: "PHP · Laravel · AI-Integrated Backends",
  location: "Gurugram, India",
  email: "rohitpatel84000@gmail.com",
  phone: "+91 8400013726",
  summary:
    "Software engineer with 4+ years building scalable web applications and RESTful APIs on the LAMP stack. I ship enterprise and government systems end to end — API design, database architecture, and increasingly, AI-assisted workflows layered into Laravel with LLM providers.",
};

const EXPERIENCE = [
  {
    hash: "a3f91e2",
    role: "Software Engineer",
    company: "Kellton",
    period: "Apr 2022 — Present",
    points: [
      "Integrated AI-powered features into Laravel apps using Laravel AI SDKs and third-party LLM providers for conversational, intelligent workflows.",
      "Built AI-assisted modules on OpenAI-compatible APIs for content generation, summarization, and context-aware responses.",
      "Led the Leave Management module for FCI's HRMS, lifting leave-tracking efficiency by 35%.",
      "Engineered real-time data flows on the LAMP stack, improving system performance and reliability.",
      "Designed a scalable pricing engine for high-purity quartz and ceramics on the Momentive WOC project.",
    ],
  },
  {
    hash: "7c02fd8",
    role: "Software Engineer Trainee",
    company: "Kellton",
    period: "Oct 2021 — Apr 2022",
    points: [
      "Built a secure, scalable CMS for blogs, engineered for usability and industry compliance.",
      "Deepened PHP and LAMP-stack fundamentals shipping user-facing web applications.",
      "Owned testing and optimization passes, keeping deployments clean and predictable.",
    ],
  },
];

const PROJECTS = [
  {
    id: "fci",
    name: "FCI · HRMS",
    org: "Food Corporation of India",
    endpoint: "POST /api/v1/leave/apply",
    description:
      "Leave Management module inside a national HR platform serving 50,000+ employees — application, approval routing, policy compliance, and automated notifications.",
    metrics: [
      { label: "Employees served", value: "50,000+" },
      { label: "Manual effort cut", value: "35%" },
    ],
    stack: ["PHP", "Laravel", "MySQL", "REST API"],
  },
  {
    id: "momentive",
    name: "Momentive · WOC",
    org: "Momentive Performance Materials",
    endpoint: "POST /api/v1/pricing/calculate",
    description:
      "Product pricing engine for high-purity quartz and ceramics — validation rules and pricing algorithms that streamlined configuration for cross-functional teams.",
    metrics: [
      { label: "Product lines", value: "Quartz + Ceramics" },
      { label: "Config time", value: "Streamlined" },
    ],
    stack: ["PHP", "Laravel", "MariaDB", "API Integration"],
  },
];

const SKILLS = [
  {
    group: "Backend",
    icon: Terminal,
    items: ["PHP", "Laravel", "Lumen", "REST API", "API Integration", "Laravel AI SDK"],
  },
  {
    group: "AI & Automation",
    icon: Cpu,
    items: ["OpenAI API", "Prompt Engineering", "Workflow Automation", "Conversational AI"],
  },
  {
    group: "Database",
    icon: Database,
    items: ["MySQL", "MariaDB"],
  },
  {
    group: "Frontend & Tools",
    icon: Layers,
    items: ["HTML", "CSS", "JavaScript", "Bootstrap", "GitHub", "JIRA", "Postman", "Composer"],
  },
];

/* ---------------------------------------------------------------
   HELPERS
---------------------------------------------------------------- */

function useTilt(strength = 10) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * strength;
    const rotateX = (0.5 - py) * strength;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`,
    });
  };

  const onLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    });
  };

  return { ref, style, onMove, onLeave };
}

/* Typing effect for the hero terminal */
function useTypedLines(lines, speed = 22, pause = 900) {
  const [output, setOutput] = useState([""]);
  useEffect(() => {
    let li = 0;
    let ci = 0;
    let cancelled = false;
    let timeout;

    function typeNext() {
      if (cancelled) return;
      if (li >= lines.length) {
        timeout = setTimeout(() => {
          if (cancelled) return;
          li = 0;
          ci = 0;
          setOutput([""]);
          typeNext();
        }, 2200);
        return;
      }
      const line = lines[li];
      if (ci <= line.length) {
        setOutput((prev) => {
          const next = [...prev];
          next[li] = line.slice(0, ci);
          return next;
        });
        ci++;
        timeout = setTimeout(typeNext, speed);
      } else {
        li++;
        ci = 0;
        setOutput((prev) => [...prev, ""]);
        timeout = setTimeout(typeNext, pause);
      }
    }
    typeNext();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []); // eslint-disable-line

  return output;
}

/* ---------------------------------------------------------------
   COMPONENTS
---------------------------------------------------------------- */

function NavBar({ active }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["about", "About"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["skills", "Skills"],
    ["contact", "Contact"],
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav className="w-full max-w-5xl glass-panel flex items-center justify-between px-5 py-3 rounded-2xl">
        <button
          onClick={() => scrollTo("top")}
          className="flex items-center gap-2 font-display text-sm tracking-wide text-white/90"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
          RKP<span className="text-white/40">.dev</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wide transition-colors ${
                active === id
                  ? "text-white bg-white/10"
                  : "text-white/50 hover:text-white/90 hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="mailto:rohitpatel84000@gmail.com"
            className="ml-2 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[var(--accent)] text-[#170302] font-semibold hover:brightness-110 transition"
          >
            Hire me
          </a>
        </div>

        <button
          className="md:hidden text-white/80"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="absolute top-20 w-[92%] max-w-5xl glass-panel rounded-2xl p-3 flex flex-col md:hidden">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-mono text-white/70 hover:bg-white/5"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function HeroTerminal() {
  const tilt = useTilt(8);
  const lines = useTypedLines(
    [
      "$ php artisan ai:generate --context=hrms",
      "→ analyzing intent... done (212ms)",
      '→ response: "Leave request routed for approval"',
      "$ status: 200 OK",
    ],
    24,
    1400
  );

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      style={{ ...tilt.style, transition: "transform 120ms ease-out" }}
      className="glass-panel rounded-2xl p-5 w-full max-w-md shadow-2xl"
    >
      <div className="flex items-center gap-1.5 mb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-mono text-white/35">
          rohit@kellton ~ %
        </span>
      </div>
      <div className="font-mono text-[12.5px] leading-relaxed min-h-[110px]">
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              i === 0
                ? "text-white/90"
                : i === lines.length - 1
                ? "text-emerald-400"
                : "text-[var(--accent-ai)]"
            }
          >
            {l}
            {i === lines.length - 1 && (
              <span className="inline-block w-[6px] h-[13px] bg-white/70 ml-1 animate-pulse align-middle" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/35">
          LAMP · Laravel AI SDK
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          live
        </span>
      </div>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grid-floor" />
    </div>
  );
}

function ProjectCard({ project }) {
  const tilt = useTilt(6);
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      style={{ ...tilt.style, transition: "transform 150ms ease-out" }}
      className="glass-panel rounded-2xl p-6 flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] px-2 py-1 rounded-md bg-white/5 text-[var(--accent-ai)] border border-white/10">
          {project.endpoint}
        </span>
        <ArrowUpRight size={16} className="text-white/30" />
      </div>
      <h3 className="font-display text-lg text-white mb-0.5">{project.name}</h3>
      <p className="text-xs text-white/40 mb-3 font-mono">{project.org}</p>
      <p className="text-sm text-white/60 leading-relaxed mb-5 flex-1">
        {project.description}
      </p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {project.metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-3">
            <div className="text-base font-display text-[var(--accent)]">{m.value}</div>
            <div className="text-[10px] font-mono text-white/40 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 text-white/50 border border-white/5"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAIN
---------------------------------------------------------------- */

export default function Portfolio() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const ids = ["top", "about", "experience", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #0a0d14;
          --bg-alt: #0f1420;
          --accent: #ff2d20;
          --accent-ai: #f5a623;
          --text-muted: #8a93a6;
        }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        body, .font-body { font-family: 'Inter', sans-serif; }

        .glass-panel {
          background: rgba(255,255,255,0.045);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255,255,255,0.09);
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.35;
        }
        .orb-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, var(--accent), transparent 70%);
          top: -120px; left: -100px;
          animation: float1 16s ease-in-out infinite;
        }
        .orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, var(--accent-ai), transparent 70%);
          top: 30%; right: -140px;
          animation: float2 20s ease-in-out infinite;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #6d7bff, transparent 70%);
          bottom: -100px; left: 30%;
          animation: float1 18s ease-in-out infinite reverse;
        }
        @keyframes float1 {
          0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(40px,60px,0) rotate(20deg); }
        }
        @keyframes float2 {
          0%,100% { transform: translate3d(0,0,0) rotate(0deg); }
          50% { transform: translate3d(-50px,40px,0) rotate(-15deg); }
        }

        .grid-floor {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        .fade-up {
          animation: fadeUp 0.7s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .orb, .fade-up, .animate-pulse { animation: none !important; }
        }

        ::selection { background: var(--accent); color: white; }
      `}</style>

      <NavBar active={active} />

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-center pt-28 pb-16 px-6">
        <FloatingOrbs />
        <div className="relative max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[11px] font-mono text-white/60 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open to new roles · {PROFILE.location}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.1] mb-4">
              {PROFILE.name}
            </h1>
            <p className="text-lg text-white/70 font-display mb-1">
              {PROFILE.title}
            </p>
            <p className="text-sm font-mono text-[var(--accent-ai)] mb-6">
              {PROFILE.tagline}
            </p>
            <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-md mb-8">
              {PROFILE.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:rohitpatel84000@gmail.com"
                className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[#170302] text-sm font-semibold hover:brightness-110 transition"
              >
                Get in touch
              </a>
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-5 py-2.5 rounded-xl glass-panel text-sm font-medium text-white/80 hover:bg-white/10 transition"
              >
                View projects
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end fade-up" style={{ animationDelay: "0.15s" }}>
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative px-6 py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-10">
          <div>
            <span className="text-[11px] font-mono text-[var(--accent-ai)]">// about</span>
            <h2 className="font-display text-3xl font-semibold mt-2">
              Backend-first, AI-fluent.
            </h2>
          </div>
          <div className="space-y-5 text-white/60 text-sm leading-relaxed">
            <p>
              I spend most of my time inside Laravel — designing schemas, shaping REST
              APIs, and making sure the system underneath a product holds up under real
              usage. Government HR platforms, enterprise pricing engines, the kind of work
              where reliability isn't optional.
            </p>
            <p>
              More recently that's expanded into wiring LLMs into those same Laravel apps:
              Laravel AI SDKs, OpenAI-compatible endpoints, and the prompt engineering that
              makes an AI feature actually useful instead of a gimmick bolted onto a form.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <div className="font-display text-2xl text-white">4+</div>
                <div className="text-[11px] font-mono text-white/40">years experience</div>
              </div>
              <div>
                <div className="font-display text-2xl text-white">50k+</div>
                <div className="text-[11px] font-mono text-white/40">users served</div>
              </div>
              <div>
                <div className="font-display text-2xl text-white">2</div>
                <div className="text-[11px] font-mono text-white/40">flagship systems</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE — git log style */}
      <section id="experience" className="relative px-6 py-24 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] font-mono text-[var(--accent-ai)]">// experience</span>
          <h2 className="font-display text-3xl font-semibold mt-2 mb-12">
            git log --author=rohit
          </h2>

          <div className="space-y-10">
            {EXPERIENCE.map((job, idx) => (
              <div key={job.hash} className="relative pl-8 md:pl-10">
                <div className="absolute left-0 top-1.5 flex flex-col items-center h-full">
                  <span className="h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                  {idx !== EXPERIENCE.length - 1 && (
                    <span className="w-px flex-1 bg-white/10 mt-2" />
                  )}
                </div>
                <div className="glass-panel rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-white/40">
                      <GitCommit size={12} /> {job.hash}
                    </span>
                    <span className="text-[11px] font-mono text-white/30">{job.period}</span>
                  </div>
                  <h3 className="font-display text-xl text-white">{job.role}</h3>
                  <p className="text-sm font-mono text-[var(--accent-ai)] mb-4">
                    {job.company}
                  </p>
                  <ul className="space-y-2.5">
                    {job.points.map((p, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-white/60 leading-relaxed">
                        <CheckCircle2 size={15} className="text-emerald-400/70 mt-0.5 shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] font-mono text-[var(--accent-ai)]">// projects</span>
          <h2 className="font-display text-3xl font-semibold mt-2 mb-12">
            Systems in production
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative px-6 py-24 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <span className="text-[11px] font-mono text-[var(--accent-ai)]">// stack</span>
          <h2 className="font-display text-3xl font-semibold mt-2 mb-12">
            Tools of the trade
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SKILLS.map(({ group, icon: Icon, items }) => (
              <div key={group} className="glass-panel rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <Icon size={15} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="font-display text-sm text-white/90">{group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg bg-white/5 text-white/60 border border-white/5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-6 mt-6">
            <span className="text-[11px] font-mono text-[var(--accent-ai)]">// education</span>
            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="font-display text-white">
                  B.Tech, Computer Science
                </h3>
                <p className="text-sm text-white/50">
                  Dr. A.P.J. Abdul Kalam Technical University, Lucknow
                </p>
              </div>
              <span className="text-xs font-mono text-white/40">
                2017 — 2021 · CGPA 7.2/10
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 text-xs text-white/40 font-mono">
              Certification — Udemy: PHP for Beginners, CMS Project
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 py-24">
        <FloatingOrbs />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[11px] font-mono text-[var(--accent-ai)]">// contact</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2 mb-4">
            Let's build something reliable.
          </h2>
          <p className="text-white/55 text-sm max-w-md mx-auto mb-10">
            Open to backend and full-stack roles where Laravel meets AI. Reach out
            directly — I read every message myself.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="glass-panel rounded-xl p-5 flex flex-col items-center gap-2 hover:bg-white/10 transition"
            >
              <Mail size={18} className="text-[var(--accent)]" />
              <span className="text-xs font-mono text-white/60 break-all">{PROFILE.email}</span>
            </a>
            <a
              href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
              className="glass-panel rounded-xl p-5 flex flex-col items-center gap-2 hover:bg-white/10 transition"
            >
              <Phone size={18} className="text-[var(--accent)]" />
              <span className="text-xs font-mono text-white/60">{PROFILE.phone}</span>
            </a>
            <div className="glass-panel rounded-xl p-5 flex flex-col items-center gap-2">
              <MapPin size={18} className="text-[var(--accent)]" />
              <span className="text-xs font-mono text-white/60">{PROFILE.location}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <a href="https://github.com/rohit7985" target="_blank" className="glass-panel h-11 w-11 rounded-full flex items-center justify-center hover:bg-white/10 transition">
              <Github size={17} />
            </a>
            <a href="https://www.linkedin.com/in/rohit84000" target="_blank" className="glass-panel h-11 w-11 rounded-full flex items-center justify-center hover:bg-white/10 transition">
              <Linkedin size={17} />
            </a>
          </div>
        </div>
      </section>

      <footer className="relative px-6 py-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-white/30">
          <span>© {new Date().getFullYear()} Rohit Kumar Patel</span>
          <span>Built with React · Tailwind · glass & motion</span>
        </div>
      </footer>
    </div>
  );
}
