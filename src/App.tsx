import { useEffect, useState } from "react";
import { Mail, Phone, Linkedin, Github, Download } from "lucide-react";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    const classIsDark = document.documentElement.classList.contains("dark");
    if (classIsDark) return "dark";
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  } catch {
    return "light";
  }
}

function buildMailto({ name, email, message }: {name:string; email:string; message:string}) {
  const subject = encodeURIComponent(`Portfolio Contact from ${name || ""}`);
  const body = encodeURIComponent(`Name: ${name || ""}\nEmail: ${email || ""}\n\nMessage:\n${message || ""}`);
  return `mailto:nikhilsaikaranki1@gmail.com?subject=${subject}&body=${body}`;
}

export default function App() {
  const BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/';
  const [theme, setTheme] = useState<string>(getInitialTheme);

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    let stored: string | null = null;
    try { stored = localStorage.getItem("theme"); } catch {}
    if (stored) return;
    const mql = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    if (!mql) return;
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? "dark" : "light");
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    // @ts-expect-error Safari
    else if (mql.addListener) mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      // @ts-expect-error Safari
      else if (mql.removeListener) mql.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    const safeReplaceHash = (hash: string) => {
      try {
        const href = (typeof window !== "undefined" && window && window.location && window.location.href) || "";
        if (typeof window !== "undefined" && window.history && typeof window.history.replaceState === "function" && !String(href).startsWith("about:")) {
          window.history.replaceState(null, "", hash);
        }
      } catch {}
    };

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target && target.closest && (target.closest("a[href^='#']") as HTMLAnchorElement | null);
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
        safeReplaceHash(id);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = buildMailto(contactForm);
    try { window.location.href = mailto; } catch {}
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight text-zinc-900 dark:text-white">Karanki Nikhil Sai</a>
            <nav className="hidden md:flex items-center gap-6 text-base">
              <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="#about">About</a>
              <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="#skills">Skills</a>
              <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="#experience">Work Experience</a>
              <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="#projects">Projects</a>
              <a className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white" href="#contact">Contact</a>
            </nav>
            <div className="flex items-center gap-2">
              <a href={BASE + 'Karanki_Nikhil_Sai.pdf'} className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-base hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <Download className="h-4 w-4" /> Resume
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Landing */}
      <section id="home" className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid md:grid-cols-12 gap-6 py-12 md:py-16 items-center">
            <div className="md:col-span-7">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Karanki Nikhil Sai</h1>
              <p className="mt-2 text-xl text-zinc-600 dark:text-zinc-400">Data Engineering Analyst</p>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
                Detail-oriented Data Analyst & ETL QA Engineer with 2.9+ years of experience in data validation,
                automation, and quality assurance across large-scale pipelines using Python, SQL, Talend, and AWS.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#projects" className="rounded-xl bg-zinc-900 text-white px-5 py-3 text-base font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">View Projects</a>
                <a href="#contact" className="rounded-xl border border-zinc-300 px-5 py-3 text-base font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">Contact Me</a>
              </div>
            </div>

            <div className="md:col-span-5 order-first md:order-none">
              <div className="relative w-full">
                <img
                  src={BASE + 'nikhil-portrait.jpg'}
                  alt="Karanki Nikhil Sai portrait"
                  className="w-full h-[380px] md:h-[460px] object-cover rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5 bg-zinc-200/20 dark:bg-zinc-800/30"
                  loading="eager"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    if (el.getAttribute('data-fallback') !== '1') {
                      el.setAttribute('data-fallback', '1');
                      el.src = BASE + '1695800248919.jpg';
                      return;
                    }
                    el.src = 'data:image/svg+xml;utf8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%231f2937%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%23ffffff%22 font-size=%2220%22%3EAdd%20nikhil-portrait.jpg%20to%20/public%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white">About</h2>
          <div className="mt-6 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-7 space-y-4 text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                I focus on validating large-scale data pipelines, analyzing rejections, and building automation that reduces manual work. I enjoy collaborating with QA and client teams, and I'm passionate about AI, process optimization, and data quality improvement.
              </p>
              <p>
                Currently a Data & ETL Testing Analyst at Accenture (McDonald's account) since Sep 2022; promoted in Feb 2024.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-base">
                <div className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">Professional Highlights</div>
                <ul className="mt-4 space-y-2 text-lg text-zinc-700 dark:text-zinc-300">
                  <li>Promoted to Data & ETL Testing Analyst (Feb 2024).</li>
                  <li>~70% reduction in manual reporting via Python automation.</li>
                  <li>Hands-on with AWS (S3, Redshift, Athena) and Airflow/Talend.</li>
                  <li>Client recognition: "Star of the Sprint" (2×).</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div data-eca-card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="text-base font-semibold text-zinc-900 dark:text-white">Education</div>
              <ul className="mt-3 space-y-2 text-base text-zinc-700 dark:text-zinc-300">
                <li>B.Tech in Computer Science (2018—2022) — CGPA 8.09</li>
                <li>10th Grade (2014—2015) — CGPA 9.7/10</li>
                <li>12th Grade (2015—2017) — 94.6%</li>
              </ul>
            </div>
            <div data-eca-card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="text-base font-semibold text-zinc-900 dark:text-white">Certifications</div>
              <ul className="mt-3 space-y-2 text-base text-zinc-700 dark:text-zinc-300">
                <li>Microsoft Power BI Data Analyst Associate (2023)</li>
                <li>Databricks Data Engineer Associate (Expected: Sep 2025)</li>
              </ul>
            </div>
            <div data-eca-card className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="text-base font-semibold text-zinc-900 dark:text-white">Achievements</div>
              <ul className="mt-3 space-y-2 text-base text-zinc-700 dark:text-zinc-300">
                <li>"Star of the Sprint" (2x) and client appreciation for proactive insights & communication.</li>
                <li>~70% automation improvement in reporting; reduced daily tasks from 1.5 hrs to 20 mins.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white">Skills</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Languages", items: ["Python", "SQL", "HTML"] },
              { title: "Data and Business Intelligence", items: ["Power BI", "DAX", "Excel", "Pandas"] },
              { title: "Extract, Transform, Load and Cloud", items: ["Talend", "Airflow", "AWS S3", "Redshift", "Athena"] },
              { title: "Testing and Development", items: ["ETL QA", "Git"] },
              { title: "Data Platforms", items: ["AWS", "Redshift", "Athena", "S3"] },
              { title: "Project Management", items: ["Agile / Scrum", "JIRA", "Client Collaboration"] },
              { title: "Artificial Intelligence and Automation", items: ["LLMs", "Prompting", "Python Bots"] },
            ].map((cat) => (
              <div key={cat.title} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <div className="text-xl font-semibold text-zinc-900 dark:text-white">{cat.title}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((s) => (
                    <span key={s} className="rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-medium text-zinc-800 dark:text-zinc-100">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white">Work Experience</h2>
          <div className="mt-6 space-y-6">
            <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-semibold">Accenture — McDonald's</h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400">Data & ETL Testing Analyst</p>
                </div>
                <div className="text-lg text-zinc-600 dark:text-zinc-400">Sep 2022 — Present (Promoted Feb 2024)</div>
              </div>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-lg text-zinc-700 dark:text-zinc-300">
                <li>Streamlined daily data validation using SQL and Redshift, investigating 500+ records weekly.</li>
                <li>Automated status & defect reporting (Python), cutting manual effort by ~70%.</li>
                <li>Wrote/optimized queries across S3, Athena; scheduled jobs via Airflow/Talend.</li>
                <li>Partnered with QA & client teams to improve data quality and reduce rejections.</li>
                <li>Recognized as "Star of the Sprint" (2x); frequent client appreciation.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white">Projects</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              { title: "Power BI sales dashboard", stack: "Power BI, DAX, Excel", desc: "Interactive dashboard highlighting trends and KPIs for sales performance.", link: "https://github.com/Nikhil0258/PowerBI-Sales-Dashboard" },
              { title: "AI chatbot", stack: "Python, LLM APIs", desc: "Prototype assistant to answer student queries and generate study aids.", link: "https://github.com/Nikhil0258/AI-Edu-Assist-Chatbot" },
              { title: "CricImpact", stack: "HTML/CSS/JS", desc: "Lightweight site concept with fixtures, scores, and team stats.", link: "https://github.com/Nikhil0258/Cric_Impact" },
              { title: "Error Monitoring Automation", stack: "Python, Scheduling", desc: "Automated error parsing and daily reporting to improve incident response.", link: "#" },
            ].map((p) => (
              <a key={p.title} href={p.link} className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-zinc-300">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold text-zinc-900 dark:text-white">{p.title}</div>
                    <div className="mt-2">
                      <div className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Technology Stack</div>
                      <div className="mt-1 text-base text-zinc-600 dark:text-zinc-300">{p.stack}</div>
                    </div>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-200">View</span>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Project Description</div>
                  <p className="mt-1 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight dark:text-white">Contact</h2>
          <div className="mt-6 grid md:grid-cols-12 gap-8">
            <form className="md:col-span-7 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6" onSubmit={handleContactSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-base text-zinc-600 dark:text-zinc-400" htmlFor="name">Name</label>
                  <input id="name" name="name" value={contactForm.name} onChange={handleContactChange} className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-base px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800" required />
                </div>
                <div>
                  <label className="text-base text-zinc-600 dark:text-zinc-400" htmlFor="email">Email</label>
                  <input id="email" type="email" name="email" value={contactForm.email} onChange={handleContactChange} className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-base px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800" required />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-base text-zinc-600 dark:text-zinc-400" htmlFor="message">Message</label>
                <textarea id="message" name="message" value={contactForm.message} onChange={handleContactChange} className="mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-base h-32 px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800" required />
              </div>
              <button className="mt-6 rounded-xl bg-zinc-900 text-white px-5 py-3 text-base font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white" type="submit">Send Message</button>
            </form>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <div className="text-base font-semibold text-zinc-900 dark:text-white">Connect</div>
                <ul className="mt-4 space-y-3 text-base text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-center gap-3"><Mail className="h-4 w-4" /><a className="hover:text-zinc-900" href="mailto:nikhilsaikaranki1@gmail.com">nikhilsaikaranki1@gmail.com</a></li>
                  <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> +91 93817 82476</li>
                  <li className="flex items-center gap-3"><Linkedin className="h-4 w-4" /><a className="hover:text-zinc-900" href="https://linkedin.com/in/nikhil-sai-karanki">LinkedIn</a></li>
                  <li className="flex items-center gap-3"><Github className="h-4 w-4" /><a className="hover:text-zinc-900" href="https://github.com/Nikhil0258">GitHub</a></li>
                </ul>
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <div className="text-lg md:text-xl font-semibold text-zinc-900 dark:text-white">Future Goals</div>
                <p className="mt-3 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Grow into roles involving AI-based automation, Data Engineering, and Prompt Engineering; continue exploring LLMs and building Python-based automation tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Karanki Nikhil Sai • Built with React & Tailwind
        </div>
      </footer>
    </div>
  );
}