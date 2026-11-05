import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type FlowItem = { title: string; detail: string; visual: string[] };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("identity");
  const pathname = useRouterState({ select: s => s.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["identity", "discipline", "work", "systems", "experience", "process", "about", "contact"];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-22% 0px -65% 0px" });
    ids.forEach(id => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [pathname]);
  const nav = [["work", "WORK"], ["about", "ABOUT"], ["experience", "EXPERIENCE"], ["contact", "CONTACT"]];
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div className="header-inner">
      <Link to="/" className="wordmark" onClick={() => setOpen(false)}>BETELHEM <span>TSEGA</span><span className="wordmark-mark">✳</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([id, label]) => <a key={id} href={`/#${id}`} aria-current={pathname === "/" && active === id ? "location" : undefined}>{label}</a>)}<a className="resume-link" href="#" onClick={e => e.preventDefault()} title="Resume link coming soon">↗ RESUME</a></nav>
      <Button variant="ghost" size="icon" className="mobile-menu-toggle" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([id, label], i) => <a key={id} href={`/#${id}`} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<ArrowUpRight size={19} /></a>)}<a href="#" onClick={e => e.preventDefault()}><span>05</span>RESUME <ArrowUpRight size={19} /></a></nav>}
  </header>;
}

export function ChapterLabel({ number, label }: { number: string; label: string }) {
  return <div className="chapter-label"><span>{number} / 08</span><span className="chapter-line"/><span>{label}</span></div>;
}

export function TextLink({ to, children, external = false }: { to: string; children: ReactNode; external?: boolean }) {
  const content = <>{children}<ArrowUpRight size={18} strokeWidth={1.6} /></>;
  return external ? <a className="text-link" href={to} target="_blank" rel="noreferrer">{content}</a> : to.startsWith("#") ? <a className="text-link" href={to}>{content}</a> : <Link className="text-link" to={to as "/work/maternal-health" | "/work/referral-system"}>{content}</Link>;
}

export const disciplines: FlowItem[] = [
  { title: "SOFTWARE ENGINEERING", detail: "Building the structure behind an experience, from logic and APIs to the data that makes it work.", visual: ["INTERFACE", "LOGIC", "API", "DATA"] },
  { title: "FRONTEND DEVELOPMENT", detail: "Translating a design into responsive, reusable interfaces that feel right on every screen.", visual: ["DESIGN", "COMPONENTS", "STATE", "RESPONSIVE UI"] },
  { title: "UI/UX DESIGN", detail: "Understanding the problem first, then shaping a clear path from the first flow to the final interface.", visual: ["PROBLEM", "USER FLOW", "WIREFRAME", "INTERFACE"] },
];
export const process: FlowItem[] = [
  { title: "UNDERSTAND", detail: "I start by understanding the problem, the people using the product, and what the experience needs to accomplish.", visual: ["PROBLEM", "USER", "REQUIREMENT"] },
  { title: "DESIGN", detail: "I map out user flows and interfaces in Figma, thinking through structure, hierarchy, and how the user moves through the product.", visual: ["USER FLOW", "WIREFRAME", "UI"] },
  { title: "BUILD", detail: "I turn those designs into responsive, reusable interfaces with React, Next.js, TypeScript, and modern frontend tools.", visual: ["COMPONENT", "STATE", "INTERFACE"] },
  { title: "CONNECT", detail: "I work with APIs and backend services to connect the interface to real data and functionality.", visual: ["FRONTEND", "API", "DATA"] },
  { title: "REFINE", detail: "I test, debug, adjust, and iterate until the experience feels right across different screens and use cases.", visual: ["TEST", "DEBUG", "IMPROVE"] },
];

export function EditorialFlow({ items, compact = false }: { items: FlowItem[]; compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  return <div className={`editorial-flow ${compact ? "flow-compact" : ""}`}>
    <div className="flow-list">{items.map((item, i) => <Button key={item.title} variant="ghost" className={`flow-item ${selected === i ? "active" : ""}`} onClick={() => setSelected(i)} onMouseEnter={() => setSelected(i)} aria-pressed={selected === i}><span className="flow-index">0{i + 1}</span><span>{item.title}</span><ArrowUpRight className="flow-arrow" size={22}/></Button>)}</div>
    <div className="flow-visual" aria-live="polite"><div className="visual-top"><span>FIG. 0{selected + 1} — {compact ? "PROCESS" : "DISCIPLINE"}</span><span>BETELHEM / 2026</span></div><div className="visual-title">{(items[selected] ?? items[0] ?? { title: "", detail: "", visual: [] }).title.toLowerCase()}</div><div className="flow-diagram">{(items[selected] ?? items[0] ?? { title: "", detail: "", visual: [] }).visual.map((step, i) => <div className="diagram-step" key={step}><span className="diagram-number">0{i + 1}</span><span>{step}</span>{i < (items[selected] ?? items[0] ?? { title: "", detail: "", visual: [] }).visual.length - 1 && <ArrowDown size={17} strokeWidth={1.2}/>}</div>)}</div><p>{(items[selected] ?? items[0] ?? { title: "", detail: "", visual: [] }).detail}</p></div>
  </div>;
}

const roles = [
  { name: "DOCTOR", title: "Care overview", note: "A clearer view of each patient's care journey.", metric: "08", metricLabel: "FOLLOW-UPS TODAY", rows: ["Patient follow-up", "Referral review", "Rule-based recommendations"] },
  { name: "NURSE", title: "Daily follow-ups", note: "Keep vaccinations and care schedules in sight.", metric: "12", metricLabel: "SCHEDULED VISITS", rows: ["Vaccination tracking", "Follow-up schedule", "Reminders"] },
  { name: "ADMIN", title: "Facility overview", note: "Coordinate care across teams and facilities.", metric: "04", metricLabel: "ACTIVE REFERRALS", rows: ["Role-specific dashboards", "Birth certificate records", "Emergency contacts"] },
  { name: "MOTHER", title: "My care journey", note: "An approachable mobile view of important moments.", metric: "02", metricLabel: "UPCOMING CHECK-INS", rows: ["My next visit", "Vaccination record", "Emergency contacts"] },
] as const;
const technologies = [
  ["Next.js", "Web application structure"], ["TypeScript", "Reliable interface logic"], ["Tailwind", "Responsive UI styling"], ["NestJS", "Backend service support"], ["MongoDB", "Application data"], ["Flutter", "Mobile experience"],
];
export function HealthDemo() {
  const [tab, setTab] = useState("OVERVIEW");
  const [role, setRole] = useState(0);
  const tabs = ["OVERVIEW", "USERS", "WORKFLOW", "INTERFACE", "TECH"];
  return <div className="demo health-demo"><div className="demo-header"><span className="demo-kicker"><span className="live-dot"/> PROJECT EXPLORER / 01</span><span>MATERNAL & CHILD HEALTH</span></div><div className="demo-tabs" role="tablist" aria-label="Explore maternal health project">{tabs.map(t => <Button key={t} variant="ghost" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`demo-tab ${tab === t ? "selected" : ""}`}>{t}</Button>)}</div>
    <div className="demo-body" role="tabpanel" aria-live="polite">
      {tab === "OVERVIEW" && <div className="demo-overview"><div><span className="eyebrow">THE SYSTEM / 01</span><h3>Care should feel<br/><em>connected.</em></h3><p>A digital platform designed to improve maternal and child healthcare follow-ups and referrals.</p></div><div className="overview-graphic"><div className="orbit-label">ONE CONNECTED JOURNEY</div><div className="overview-rings"><div className="ring ring-outer"><span>FOLLOW-UP</span><span>REFERRAL</span></div><div className="ring ring-middle"><span>CARE</span></div><div className="ring-center">M<br/><small>+</small></div></div><div className="graphic-foot">DESIGNED AROUND PEOPLE, NOT PAGES.</div></div></div>}
      {(tab === "USERS" || tab === "INTERFACE") && <div className="roles-layout"><div className="role-select"><span className="eyebrow">{tab === "USERS" ? "SELECT A PERSPECTIVE" : "EXPLORE THE INTERFACE"}</span><h3>Different people.<br/><em>One system.</em></h3><div className="role-buttons">{roles.map((r, i) => <Button key={r.name} variant="ghost" className={`role-button ${role === i ? "active" : ""}`} onClick={() => setRole(i)}><span>0{i + 1}</span>{r.name}<ArrowUpRight size={16}/></Button>)}</div></div><div className={`app-preview ${role === 3 ? "mother-preview" : ""}`}><div className="preview-top"><span className="preview-logo">m<span>+</span></span><span>CARE PLATFORM <span className="preview-avatar">{(roles[role] ?? roles[0]).name.slice(0, 1)}</span></span></div><div className="preview-content"><div className="preview-greeting">{(roles[role] ?? roles[0]).name} / DASHBOARD</div><h4>{(roles[role] ?? roles[0]).title}</h4><p>{(roles[role] ?? roles[0]).note}</p><div className="preview-metric"><strong>{(roles[role] ?? roles[0]).metric}</strong><span>{(roles[role] ?? roles[0]).metricLabel}</span><span className="metric-spark">↗</span></div><div className="preview-row-title">YOUR WORKSPACE <span>VIEW ALL ↗</span></div>{(roles[role] ?? roles[0]).rows.map((row, i) => <div className="preview-row" key={row}><span className="row-icon">{i === 0 ? "✳" : i === 1 ? "◎" : "↗"}</span><span>{row}</span><ArrowUpRight size={15}/></div>)}</div></div></div>}
      {tab === "WORKFLOW" && <div className="workflow-pane"><span className="eyebrow">FOLLOWING THE CARE JOURNEY</span><h3>Every handoff<br/><em>matters.</em></h3><div className="workflow-track">{["FOLLOW-UP", "REFERRAL", "HEALTHCARE FACILITY", "ACTION", "FOLLOW-UP"].map((step, i) => <div className="workflow-node" key={`${step}-${i}`}><span>0{i + 1}</span><strong>{step}</strong>{i < 4 && <ArrowRight size={22}/>}</div>)}</div><p>From a scheduled check-in to coordinated care between facilities, the system keeps the next step visible.</p></div>}
      {tab === "TECH" && <div className="tech-pane"><span className="eyebrow">TOOLS THAT MAKE IT WORK</span><h3>Built across<br/><em>the system.</em></h3><div className="tech-list">{technologies.map(([name, detail], i) => <div className="tech-line" key={name}><span>0{i + 1}</span><strong>{name}</strong><span>{detail}</span></div>)}</div></div>}
    </div><div className="demo-footer"><span>INTERACTIVE PROJECT STUDY</span><span>EXPLORE THE TABS ↗</span></div></div>;
}

const referralSteps = [
  { title: "REFERRAL", sub: "Doctor referral", detail: "A doctor starts a referral with the patient's information and reason for care.", status: "DRAFT CREATED", visual: "01" },
  { title: "APPROVAL", sub: "Liaison approval", detail: "The liaison reviews the request before forwarding it to the receiving facility.", status: "AWAITING REVIEW", visual: "02" },
  { title: "ACCEPT / REJECT", sub: "Facility decision", detail: "The receiving liaison can accept or reject the request with a clear next step.", status: "DECISION POINT", visual: "03" },
  { title: "QR CHECK-IN", sub: "Arrival & check-in", detail: "At arrival, a QR check-in connects the patient to the accepted referral.", status: "PATIENT ARRIVED", visual: "04" },
  { title: "DOCTOR NOTIFIED", sub: "Handoff complete", detail: "The referring doctor is notified, closing the loop on the transfer of care.", status: "CARE CONNECTED", visual: "05" },
] as const;
export function ReferralDemo() {
  const [step, setStep] = useState(0);
  const selected = referralSteps[step] ?? referralSteps[0];
  return <div className="referral-demo"><div className="referral-head"><span className="eyebrow">INTERACTIVE WORKFLOW / 02</span><span>RMS — SYSTEM MAP</span></div><div className="referral-stepper" aria-label="Referral workflow steps">{referralSteps.map((s, i) => <Button key={s.title} variant="ghost" className={`referral-step ${step === i ? "active" : ""}`} onClick={() => setStep(i)} aria-pressed={step === i}><span className="step-index">0{i + 1}</span><span>{s.title}</span>{i < 4 && <ArrowRight size={15}/>}</Button>)}</div><div className="referral-content" aria-live="polite"><div className="referral-description"><span className="eyebrow">STEP 0{step + 1} / 05</span><h3>{selected.sub}<span>.</span></h3><p>{selected.detail}</p><div className="step-controls"><Button variant="outline" size="icon" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} aria-label="Previous step"><ChevronLeft size={17}/></Button><Button variant="outline" size="icon" onClick={() => setStep(Math.min(4, step + 1))} disabled={step === 4} aria-label="Next step"><ArrowRight size={17}/></Button></div></div><div className="referral-visual"><div className="visual-bar"><span>RMS / LIVE WORKFLOW</span><span>● ● ●</span></div><div className="referral-visual-inner"><span className="visual-counter">{selected.visual}<span>/05</span></span><div className="visual-document"><div className="document-icon">{step === 3 ? "▦" : step === 4 ? <Check size={32} strokeWidth={1.3}/> : "✳"}</div><span>REFERRAL ID #BD-2026-004</span><strong>{selected.status}</strong><div className="document-progress"><span style={{ width: `${(step + 1) * 20}%` }}/></div><small>HEALTHCARE FACILITY NETWORK</small></div></div></div></div><div className="referral-foot"><span>FROM REQUEST TO HANDOFF</span><span>SELECT A STEP TO EXPLORE</span></div></div>;
}

export function SiteFooter() { return <footer className="site-footer"><div><span>BETELHEM TSEGA</span><span>Software Engineer · Frontend Developer · UI/UX Designer</span></div><div><span>Built with curiosity, designed with intention.</span><span>© 2026</span></div></footer>; }
