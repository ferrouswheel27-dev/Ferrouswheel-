import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Bookmarks",
    tagline: "A little spark to every story",
    description: "Playful metal bookmarks with cute hobby-themed shapes. Personalized with your name.",
    materials: "Stainless Steel · Brass · Copper",
    emoji: "📖",
    accent: "#E63946",
    shapes: ["violin", "chef knife", "tools", "guitar"],
  },
  {
    id: 2,
    name: "Keychains",
    tagline: "No one likes boring keys",
    description: "Fun custom metal keychains in any shape you love — sports, cars, music, you name it.",
    materials: "Stainless Steel · Brass · Copper",
    emoji: "🔑",
    accent: "#FF6B35",
    shapes: ["tennis racket", "cassette", "F1 car", "football"],
  },
  {
    id: 3,
    name: "Nameplates",
    tagline: "A subtle way to claim your territory",
    description: "Custom nameplates featuring your passion — tennis, sneakers, cars — with your name.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    emoji: "🏷️",
    accent: "#E63946",
    shapes: ["tennis player", "sneaker", "sports car", "hockey"],
  },
  {
    id: 4,
    name: "Medal Hangers",
    tagline: "Show off your wins",
    description: "Custom medal hangers that put your achievements on display — your sport, your style.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    emoji: "🏅",
    accent: "#FFD700",
    shapes: ["hockey player", "multi-sport", "runner", "swimmer"],
  },
  {
    id: 5,
    name: "Necklaces",
    tagline: "Made to turn heads & spark laughs",
    description: "Fun custom metal necklaces that let you wear your personality loud and proud.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    emoji: "📿",
    accent: "#FF6B35",
    shapes: ["dollar sign", "initials", "sport icon", "custom shape"],
  },
  {
    id: 6,
    name: "Clocks",
    tagline: "Watching time pass can be fun",
    description: "Custom wall clocks where your favorite sport replaces the numbers. Seriously cool.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    emoji: "🕐",
    accent: "#E63946",
    shapes: ["cricket", "football", "F1 tire", "skateboard"],
  },
  {
    id: 7,
    name: "Models",
    tagline: "Smooth rides & cool looks",
    description: "Handcrafted metal scale models — bikes, cars, anything with wheels and soul.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    emoji: "🏍️",
    accent: "#C0C0C0",
    shapes: ["chopper", "vintage bike", "sports car", "go-kart"],
  },
];

const steps = [
  { num: "01", title: "Pick or Describe", desc: "Tell us what you want — any product, any design, any hobby." },
  { num: "02", title: "WhatsApp / Instagram", desc: "Reach out to us directly. No complicated forms." },
  { num: "03", title: "Approve the Design", desc: "We send you a preview. You say yes (or tweak it)." },
  { num: "04", title: "Pay & Relax", desc: "Make payment and let us handle the rest." },
  { num: "05", title: "It Ships to You", desc: "Your custom piece, delivered pan India." },
  { num: "06", title: "ENJOYYY 🔥", desc: "It's so good, you'll want to keep it for yourself." },
];

function MetalPattern() {
  return (
    <svg className="metal-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(230,57,70,0.08)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#grid)" />
    </svg>
  );
}

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => scrollTo("hero")}>
        <span className="logo-fw">FERROUS</span>
        <span className="logo-wheel">WHEEL</span>
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {["products", "about", "order", "contact"].map((s) => (
          <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
            {s.toUpperCase()}
          </button>
        ))}
        <a href="https://wa.me/918105677799" target="_blank" rel="noreferrer" className="nav-cta">
          ORDER NOW
        </a>
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <MetalPattern />
      <div className="hero-content">
        <div className="hero-badge">EST. 2024 · BANGALORE</div>
        <h1 className="hero-title">
          <span className="hero-line1">METAL</span>
          <span className="hero-line2">GIFTS</span>
          <span className="hero-line3">THAT HIT</span>
          <span className="hero-accent">DIFFERENT.</span>
        </h1>
        <p className="hero-tagline">"Gifts sooo good you want to keep them for yourself!"</p>
        <div className="hero-actions">
          <a href="https://wa.me/918105677799" target="_blank" rel="noreferrer" className="btn-primary">
            ORDER ON WHATSAPP
          </a>
          <button className="btn-secondary" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
            SEE PRODUCTS ↓
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">7+</span><span className="stat-label">Product Types</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">4</span><span className="stat-label">Materials</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">∞</span><span className="stat-label">Customizations</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-ring ring1" />
        <div className="hero-ring ring2" />
        <div className="hero-ring ring3" />
        <div className="hero-icon-grid">
          {["🎾", "🏒", "🏎️", "⚽", "🎸", "🏆", "🔑", "📿"].map((icon, i) => (
            <span key={i} className="floating-icon" style={{ animationDelay: `${i * 0.3}s` }}>{icon}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`product-card ${hovered ? "hovered" : ""}`}
      style={{ "--accent": product.accent, animationDelay: `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-number">0{product.id}</div>
      <div className="card-emoji">{product.emoji}</div>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-tagline">"{product.tagline}"</p>
      <p className="card-desc">{product.description}</p>
      <div className="card-materials">{product.materials}</div>
      <a href="https://wa.me/918105677799" target="_blank" rel="noreferrer" className="card-cta">
        CUSTOMIZE THIS →
      </a>
      <div className="card-glow" />
    </div>
  );
}

function Products() {
  return (
    <section id="products" className="products">
      <div className="section-header">
        <span className="section-tag">WHAT WE MAKE</span>
        <h2 className="section-title">PRODUCT<br /><span className="outline-text">CATEGORIES</span></h2>
        <p className="section-sub">Every piece is custom. Every piece is metal. Every piece is yours.</p>
      </div>
      <div className="products-grid">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about">
      <MetalPattern />
      <div className="about-content">
        <div className="about-text">
          <span className="section-tag">THE STORY</span>
          <h2 className="section-title">BUILT IN A<br /><span className="outline-text">WORKSHOP,</span><br />BORN FROM A DREAM.</h2>
          <p className="about-para">
            Meet Yousuf — in January 2025, he stood on top of a go-kart he built himself. 
            That same day, he started dreaming about his next creation: a business.
          </p>
          <p className="about-para">
            Ferrous Wheel was born in Bommasandra, Bangalore — a workshop where sparks fly 
            and ideas take shape in metal. Run by Yousuf and his sister, every piece is 
            designed with love, cut with precision, and shipped with pride.
          </p>
          <div className="about-values">
            <div className="value-chip">⚡ Craft-forward</div>
            <div className="value-chip">🎯 100% Custom</div>
            <div className="value-chip">🚀 Pan India Delivery</div>
            <div className="value-chip">❤️ Made with passion</div>
          </div>
        </div>
        <div className="about-visual">
          <div className="about-card">
            <div className="about-card-inner">
              <div className="welder-icon">⚙️</div>
              <div className="about-quote">"With a full tank of petrol and a workshop where he can bring ideas to life — ready to craft your custom keepsake."</div>
              <div className="about-sig">— Yousuf, Founder</div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"This silhouette was created by an 18-year-old artist — and I'm honestly in awe of the detailing. Talent like this deserves to be seen."</p>
            <span className="testimonial-author">— Sandhya</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowToOrder() {
  return (
    <section id="order" className="how-to-order">
      <div className="section-header">
        <span className="section-tag">SIMPLE PROCESS</span>
        <h2 className="section-title">HOW TO<br /><span className="outline-text">ORDER</span></h2>
      </div>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={i} className="step-card" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="step-num">{step.num}</div>
            <div className="step-content">
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
            {i < steps.length - 1 && <div className="step-arrow">→</div>}
          </div>
        ))}
      </div>
      <div className="order-cta-box">
        <p>Ready? It takes 30 seconds to get started.</p>
        <a href="https://wa.me/918105677799" target="_blank" rel="noreferrer" className="btn-primary large">
          💬 CHAT ON WHATSAPP
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <MetalPattern />
      <div className="contact-content">
        <div className="section-header left">
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">LET'S MAKE<br /><span className="outline-text">SOMETHING</span><br />COOL.</h2>
        </div>
        <div className="contact-cards">
          <a href="https://wa.me/918105677799" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">📱</span>
            <span className="contact-label">WHATSAPP</span>
            <span className="contact-value">+91 81056 77799</span>
          </a>
          <a href="https://instagram.com/ferrouswheel27" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">📸</span>
            <span className="contact-label">INSTAGRAM</span>
            <span className="contact-value">@ferrouswheel27</span>
          </a>
          <a href="mailto:ferrouswheel27@gmail.com" className="contact-card">
            <span className="contact-icon">✉️</span>
            <span className="contact-label">EMAIL</span>
            <span className="contact-value">ferrouswheel27@gmail.com</span>
          </a>
          <div className="contact-card">
            <span className="contact-icon">📍</span>
            <span className="contact-label">WORKSHOP</span>
            <span className="contact-value">235/E Bommasandra, Bangalore 560099</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <span className="logo-fw">FERROUS</span><span className="logo-wheel">WHEEL</span>
      </div>
      <p className="footer-tagline">"Gifts sooo good you want to keep them for yourself!"</p>
      <p className="footer-copy">© 2026 Ferrous Wheel · Est. 2024 · Bangalore, India</p>
    </footer>
  );
}

export default function FerrousWheelWebsite() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    ["hero", "products", "about", "order", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fw-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red: #E63946;
          --orange: #FF6B35;
          --black: #0A0A0A;
          --dark: #111111;
          --card-bg: #161616;
          --border: rgba(255,255,255,0.07);
          --text: #F0F0F0;
          --muted: #888;
          --font-display: 'Bebas Neue', sans-serif;
          --font-body: 'Barlow', sans-serif;
          --font-cond: 'Barlow Condensed', sans-serif;
        }

        .fw-app {
          background: var(--black);
          color: var(--text);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        /* NAVBAR */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 40px;
          background: rgba(10,10,10,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo { cursor: pointer; display: flex; align-items: baseline; gap: 6px; }
        .logo-fw { font-family: var(--font-display); font-size: 22px; color: var(--red); letter-spacing: 2px; }
        .logo-wheel { font-family: var(--font-display); font-size: 22px; color: var(--text); letter-spacing: 2px; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { background: none; border: none; color: var(--muted); font-family: var(--font-cond); font-size: 13px; letter-spacing: 2px; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--red); }
        .nav-cta { background: var(--red); color: #fff; padding: 8px 20px; font-family: var(--font-cond); font-size: 13px; font-weight: 700; letter-spacing: 2px; text-decoration: none; border-radius: 2px; transition: background 0.2s; }
        .nav-cta:hover { background: #c0303b; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { width: 24px; height: 2px; background: var(--text); display: block; transition: 0.3s; }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 100px 40px 60px;
          position: relative; overflow: hidden;
          background: radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.08) 0%, transparent 60%);
        }
        .metal-pattern { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.5; }
        .hero-content { flex: 1; max-width: 700px; position: relative; z-index: 2; }
        .hero-badge { font-family: var(--font-cond); font-size: 12px; letter-spacing: 4px; color: var(--red); margin-bottom: 24px; }
        .hero-title { font-family: var(--font-display); line-height: 0.9; margin-bottom: 24px; }
        .hero-line1, .hero-line2, .hero-line3 { display: block; font-size: clamp(72px, 12vw, 140px); color: var(--text); }
        .hero-accent { display: block; font-size: clamp(72px, 12vw, 140px); color: var(--red); -webkit-text-stroke: 0px; }
        .hero-tagline { font-size: 16px; color: var(--muted); font-style: italic; margin-bottom: 40px; }
        .hero-actions { display: flex; gap: 16px; margin-bottom: 60px; flex-wrap: wrap; }
        .btn-primary { background: var(--red); color: #fff; padding: 14px 28px; font-family: var(--font-cond); font-size: 14px; font-weight: 700; letter-spacing: 2px; text-decoration: none; border-radius: 2px; border: none; cursor: pointer; transition: all 0.2s; display: inline-block; }
        .btn-primary:hover { background: #c0303b; transform: translateY(-2px); }
        .btn-primary.large { padding: 18px 40px; font-size: 16px; }
        .btn-secondary { background: transparent; color: var(--text); padding: 14px 28px; font-family: var(--font-cond); font-size: 14px; font-weight: 700; letter-spacing: 2px; border: 1px solid var(--border); border-radius: 2px; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--red); color: var(--red); }
        .hero-stats { display: flex; align-items: center; gap: 32px; }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-family: var(--font-display); font-size: 36px; color: var(--red); }
        .stat-label { font-size: 11px; letter-spacing: 2px; color: var(--muted); font-family: var(--font-cond); }
        .stat-divider { width: 1px; height: 40px; background: var(--border); }
        .hero-visual { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; height: 400px; }
        .hero-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(230,57,70,0.2); }
        .ring1 { width: 300px; height: 300px; animation: spin 20s linear infinite; }
        .ring2 { width: 220px; height: 220px; border-color: rgba(255,107,53,0.15); animation: spin 14s linear infinite reverse; }
        .ring3 { width: 140px; height: 140px; border-color: rgba(230,57,70,0.25); animation: spin 8s linear infinite; }
        .hero-icon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; position: relative; z-index: 2; }
        .floating-icon { font-size: 32px; text-align: center; animation: float 3s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        /* SECTIONS COMMON */
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header.left { text-align: left; }
        .section-tag { font-family: var(--font-cond); font-size: 11px; letter-spacing: 4px; color: var(--red); display: block; margin-bottom: 12px; }
        .section-title { font-family: var(--font-display); font-size: clamp(48px, 8vw, 90px); line-height: 0.95; color: var(--text); }
        .outline-text { -webkit-text-stroke: 1px var(--red); color: transparent; }
        .section-sub { color: var(--muted); font-size: 15px; margin-top: 16px; }

        /* PRODUCTS */
        .products { padding: 100px 40px; }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .product-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          animation: fadeUp 0.5s ease both;
          cursor: pointer;
        }
        .product-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .product-card:hover .card-glow { opacity: 1; }
        .card-glow { position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: var(--accent); filter: blur(40px); opacity: 0; transition: opacity 0.3s; pointer-events: none; border-radius: 50%; }
        .card-number { font-family: var(--font-display); font-size: 48px; color: rgba(255,255,255,0.04); position: absolute; top: 12px; right: 20px; }
        .card-emoji { font-size: 36px; margin-bottom: 16px; display: block; }
        .card-name { font-family: var(--font-display); font-size: 32px; color: var(--text); margin-bottom: 4px; }
        .card-tagline { font-size: 12px; color: var(--accent); font-style: italic; margin-bottom: 12px; font-family: var(--font-body); }
        .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 16px; }
        .card-materials { font-family: var(--font-cond); font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.3); margin-bottom: 20px; }
        .card-cta { font-family: var(--font-cond); font-size: 12px; letter-spacing: 2px; color: var(--accent); text-decoration: none; font-weight: 700; transition: opacity 0.2s; }
        .card-cta:hover { opacity: 0.7; }

        /* ABOUT */
        .about { padding: 100px 40px; position: relative; background: rgba(255,255,255,0.01); }
        .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-para { color: var(--muted); font-size: 15px; line-height: 1.8; margin-bottom: 16px; }
        .about-values { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
        .value-chip { background: rgba(230,57,70,0.1); border: 1px solid rgba(230,57,70,0.3); color: var(--text); padding: 6px 14px; border-radius: 100px; font-size: 12px; font-family: var(--font-cond); letter-spacing: 1px; }
        .about-visual { display: flex; flex-direction: column; gap: 20px; }
        .about-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 32px; }
        .welder-icon { font-size: 48px; margin-bottom: 16px; }
        .about-quote { font-size: 15px; color: var(--text); line-height: 1.7; font-style: italic; margin-bottom: 12px; }
        .about-sig { font-family: var(--font-cond); font-size: 12px; color: var(--red); letter-spacing: 2px; }
        .testimonial-card { background: rgba(230,57,70,0.06); border: 1px solid rgba(230,57,70,0.2); border-radius: 4px; padding: 24px; }
        .stars { color: #FFD700; font-size: 18px; margin-bottom: 10px; }
        .testimonial-card p { font-size: 13px; color: var(--muted); line-height: 1.7; font-style: italic; margin-bottom: 10px; }
        .testimonial-author { font-family: var(--font-cond); font-size: 12px; color: var(--red); letter-spacing: 2px; }

        /* HOW TO ORDER */
        .how-to-order { padding: 100px 40px; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-bottom: 60px; }
        .step-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 24px; display: flex; flex-direction: column; gap: 12px; position: relative; animation: fadeUp 0.5s ease both; transition: border-color 0.2s; }
        .step-card:hover { border-color: rgba(230,57,70,0.4); }
        .step-num { font-family: var(--font-display); font-size: 40px; color: var(--red); opacity: 0.6; }
        .step-content h4 { font-family: var(--font-cond); font-size: 18px; letter-spacing: 1px; color: var(--text); margin-bottom: 6px; }
        .step-content p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .order-cta-box { text-align: center; border: 1px solid var(--border); border-radius: 4px; padding: 48px; background: rgba(230,57,70,0.04); }
        .order-cta-box p { color: var(--muted); font-size: 16px; margin-bottom: 24px; }

        /* CONTACT */
        .contact { padding: 100px 40px; position: relative; background: rgba(255,255,255,0.01); }
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .contact-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 24px; display: flex; flex-direction: column; gap: 6px; text-decoration: none; transition: all 0.2s; }
        .contact-card:hover { border-color: var(--red); transform: translateY(-2px); }
        .contact-icon { font-size: 24px; }
        .contact-label { font-family: var(--font-cond); font-size: 10px; letter-spacing: 3px; color: var(--red); }
        .contact-value { font-size: 13px; color: var(--text); }

        /* FOOTER */
        .footer { padding: 40px; border-top: 1px solid var(--border); text-align: center; }
        .footer-logo { display: flex; align-items: baseline; gap: 6px; justify-content: center; margin-bottom: 10px; }
        .footer-tagline { font-size: 13px; color: var(--muted); font-style: italic; margin-bottom: 8px; }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,0.2); font-family: var(--font-cond); letter-spacing: 2px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .navbar { padding: 16px 24px; }
          .nav-links { display: none; flex-direction: column; position: fixed; inset: 0; background: var(--black); align-items: center; justify-content: center; gap: 32px; }
          .nav-links.open { display: flex; }
          .hamburger { display: flex; z-index: 101; }
          .hero { flex-direction: column; padding: 100px 24px 60px; gap: 40px; }
          .hero-visual { width: 100%; }
          .about-content, .contact-content { grid-template-columns: 1fr; gap: 40px; }
          .products { padding: 60px 24px; }
          .about, .how-to-order, .contact { padding: 60px 24px; }
        }

        @media (max-width: 600px) {
          .contact-cards { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .btn-primary, .btn-secondary { text-align: center; }
        }
      `}</style>

      <Navbar activeSection={activeSection} />
      <Hero />
      <Products />
      <About />
      <HowToOrder />
      <Contact />
      <Footer />
    </div>
  );
}
