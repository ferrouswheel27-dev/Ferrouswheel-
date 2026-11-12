import { useState, useEffect, useMemo, useRef } from "react";
import PAGES from "./pages.json";
const CLD = "https://res.cloudinary.com/dbzmj5nvh/image/upload/w_800,q_auto,f_auto";
const LOGO = "/logo.svg";
const sized = (url, w) => url.replace("/w_800,", `/w_${w},`);
const WA = (msg) => `https://wa.me/918105677799?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA("Hi Ferrouswheel! I'd like to order a custom metal gift.");
const WA_BULK = WA("Hi Ferrouswheel! I have a bulk order enquiry.\nSchool / company:\nProduct:\nQuantity:\nNeeded by:");
const MAIL_BULK = "mailto:ferrouswheel27@gmail.com?subject=" + encodeURIComponent("Bulk order enquiry");
const CURRENT_PATH = (globalThis.__FW_PATH__ || (typeof window !== "undefined" ? window.location.pathname : "/")).replace(/\.html$/, "").replace(/\/+$/, "") || "/";
const pageFor = (product) => PAGES.categories.find((c) => c.id === product.id);
const hrefFor = (product) => `/${pageFor(product).slug}`;
function setMeta(title, description, path) {
  document.title = title;
  const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', "content", description);
  set('link[rel="canonical"]', "href", PAGES.site + (path === "/" ? "/" : path));
}
const products = [
  {
    id: 1,
    name: "Bookmarks",
    tagline: "A little spark to every story",
    description: "Metal bookmarks shaped around your favourite hobby, with your name on them.",
    materials: "Stainless Steel · Brass · Copper",
    accent: "#E63946",
    image: `${CLD}/Photoroom_20260304_111937_eeelb5.jpg`,
    gallery: [
      `${CLD}/Photoroom_20260304_111937_eeelb5.jpg`,
      `${CLD}/Photoroom_20260106_150230_srgjsu.jpg`,
    ],
  },
  {
    id: 2,
    name: "Keychains",
    tagline: "No one likes boring keys",
    description: "Keychains in any shape you like. Your sport, your car, your music, you name it.",
    materials: "Stainless Steel · Brass · Copper",
    accent: "#FF6B35",
    image: `${CLD}/Photoroom_20260304_113441_g30qtp.jpg`,
    gallery: [
      `${CLD}/Photoroom_20260304_113441_g30qtp.jpg`,
      `${CLD}/Photoroom_20260304_120831_srxvpo.jpg`,
      `${CLD}/Photoroom_20260307_152338_sfesbn.jpg`,
      `${CLD}/Photoroom_20260304_112748_qwu95i.jpg`,
    ],
  },
  {
    id: 3,
    name: "Nameplates",
    tagline: "A subtle way to claim your territory",
    description: "Your name, plus the thing you love most. Tennis, sneakers, cars, anything.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#E63946",
    image: `${CLD}/Photoroom_20260106_144610_hkysfs.jpg`,
    gallery: [
      `${CLD}/Photoroom_20260106_144610_hkysfs.jpg`,
      `${CLD}/Photoroom_20260304_121434_l9xqgx.jpg`,
      `${CLD}/Photoroom_20260304_121357_wivy4l.jpg`,
    ],
  },
  {
    id: 4,
    name: "Medal Hangers",
    tagline: "Show off your wins",
    description: "Get your medals out of the drawer and onto the wall, with your sport and your name.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#FFD700",
    image: `${CLD}/Photoroom_20260106_145241_suigyq.jpg`,
    gallery: [
      `${CLD}/Photoroom_20260106_145241_suigyq.jpg`,
      `${CLD}/Photoroom_20260609_180217_hgtmxn.jpg`,
    ],
  },
  {
    id: 5,
    name: "Necklaces",
    tagline: "Made to turn heads & spark laughs",
    description: "Necklaces with a name, a hobby or an inside joke. A gift nobody else will have.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#FF6B35",
    image: `${CLD}/Photoroom_20260106_151606_ijijur.jpg`,
    gallery: [
      `${CLD}/Photoroom_20260106_151606_ijijur.jpg`,
    ],
  },
  {
    id: 6,
    name: "Clocks",
    tagline: "Watching time pass can be fun",
    description: "Wall clocks where your favourite sport or hobby takes the place of the numbers.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#E63946",
    image: `${CLD}/Photoroom_20260304_124930_nnyeos.jpg`,
    gallery: [
      `${CLD}/Photoroom_20260304_124930_nnyeos.jpg`,
      `${CLD}/Photoroom_20260304_124110_zgtqyn.jpg`,
      `${CLD}/IMG_4524_wamzit.png`,
      `${CLD}/Photoroom_20260107_131931_yilnxv.jpg`,
    ],
  },
  {
    id: 7,
    name: "Models",
    tagline: "Smooth rides & cool looks",
    description: "Metal models of bikes, cars and anything else with wheels.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#C0C0C0",
    image: `${CLD}/Photoroom_20260107_123614_qnwlfz.png`,
    gallery: [
      `${CLD}/Photoroom_20260107_123614_qnwlfz.png`,
      `${CLD}/IMG_4185_l5qtnc.jpg`,
      `${CLD}/Photoroom_20260107_123237_vszgn6.png`,
    ],
  },
  {
    id: 8,
    name: "Fandom",
    tagline: "For the fans who want it in metal",
    description: "Wall art for fans of movies, shows, games and sport.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#FFD700",
    image: `${CLD}/IMG_4831_gwwcmr.jpg`,
    gallery: [
      `${CLD}/IMG_4831_gwwcmr.jpg`,
    ],
  },
];
const steps = [
  { num: "01", title: "Pick or Describe", desc: "Tell us what you want. Any product, any design, any hobby." },
  { num: "02", title: "WhatsApp / Instagram", desc: "Reach out to us directly. No complicated forms." },
  { num: "03", title: "Approve the Design", desc: "We send you a preview. You say yes (or tweak it)." },
  { num: "04", title: "Pay & Relax", desc: "Make payment and let us handle the rest." },
  { num: "05", title: "It Ships to You", desc: "Your custom piece, delivered pan India." },
  { num: "06", title: "ENJOYYY 🔥", desc: "It's so good, you'll want to keep it for yourself." },
];
const REDUCED = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function MetalPattern({ innerRef }) {
  return (
    <svg ref={innerRef} className="metal-pattern" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(230,57,70,0.08)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#grid)" />
    </svg>
  );
}
function Embers({ count = 12 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 7 + Math.random() * 9,
        delay: Math.random() * 9,
        drift: (Math.random() - 0.5) * 70,
      })),
    [count]
  );
  return (
    <div className="embers" aria-hidden="true">
      {items.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
            "--drift": `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        if (REDUCED()) { el.textContent = `${to}${suffix}`; return; }
        const t0 = performance.now();
        const dur = 900;
        const step = (t) => {
          const p = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(to * eased)}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span className="stat-num" ref={ref}>0{suffix}</span>;
}
function GalleryModal({ product, onClose, start = 0, showPageLink = true }) {
  const [current, setCurrent] = useState(start);
  const gallery = product.gallery || [product.image];
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={`${product.name} gallery`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close gallery" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-tagline">"{product.tagline}"</p>
        </div>
        <div className="modal-main-image">
          <img src={gallery[current]} alt={`Custom metal ${product.name.toLowerCase()} by Ferrouswheel, Bangalore`} />
          {gallery.length > 1 && (
            <>
              <button className="modal-nav prev" aria-label="Previous image" onClick={() => setCurrent(c => (c - 1 + gallery.length) % gallery.length)}>‹</button>
              <button className="modal-nav next" aria-label="Next image" onClick={() => setCurrent(c => (c + 1) % gallery.length)}>›</button>
            </>
          )}
        </div>
        {gallery.length > 1 && (
          <div className="modal-thumbs">
            {gallery.map((img, i) => (
              <img key={i} src={sized(img, 160)} alt="" loading="lazy" width="70" height="70" className={`thumb ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
        )}
        <div className="modal-footer">
          <p className="modal-materials">{product.materials}</p>
          {showPageLink && <a href={hrefFor(product)} className="modal-page-link">SEE ALL {product.name.toUpperCase()} →</a>}
          <a href={WA(`Hi Ferrouswheel! I'd love to customize one of your ${product.name.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="btn-primary">
            💬 CUSTOMIZE THIS
          </a>
        </div>
      </div>
    </div>
  );
}
function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  const isHome = CURRENT_PATH === "/";
  const scrollTo = (id) => {
    setMenuOpen(false);
    if (!isHome) { window.location.href = id === "hero" ? "/" : `/#${id}`; return; }
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 30);
  };
  const links = ["products", "about", "order", "bulk", "contact"];
  return (
    <>
      <nav className="navbar">
        <a href="/" className="nav-logo" onClick={(e) => { if (isHome) { e.preventDefault(); scrollTo("hero"); } }}>
          <img src={LOGO} alt="Ferrouswheel — custom made gifts" width="166" height="40" style={{ height: "40px", width: "auto", display: "block" }} />
        </a>
        <div className="nav-links">
          {links.map((s) => (
            <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
              {s === "bulk" ? "BULK ORDERS" : s.toUpperCase()}
            </button>
          ))}
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="nav-cta">ORDER NOW</a>
        </div>
        <button className={`hamburger ${menuOpen ? "open" : ""}`} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((s, i) => (
            <button key={s} className="mobile-link" style={{ "--i": i }} onClick={() => scrollTo(s)}>
              {s === "bulk" ? "BULK ORDERS" : s.toUpperCase()}
            </button>
          ))}
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="nav-cta mobile-cta" style={{ "--i": links.length }}>ORDER NOW</a>
        </div>
      )}
    </>
  );
}
function Hero() {
  const patternRef = useRef(null);
  const visualRef = useRef(null);
  useEffect(() => {
    if (REDUCED() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          if (patternRef.current) patternRef.current.style.transform = `translateY(${y * 0.18}px)`;
          if (visualRef.current) visualRef.current.style.transform = `translateY(${y * 0.28}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <section id="hero" className="hero">
      <MetalPattern innerRef={patternRef} />
      <Embers count={12} />
      <div className="hero-content">
        <p className="hero-badge">CUSTOM METAL GIFTS · BANGALORE</p>
        <h1 className="hero-title">
          <span className="sr-only">Custom metal gifts made in Bangalore: </span>
          <span className="hero-line1">METAL</span>
          <span className="hero-line2">GIFTS</span>
          <span className="hero-line3">THAT HIT</span>
          <span className="hero-accent">DIFFERENT.</span>
        </h1>
        <p className="hero-tagline">"Gifts sooo good you want to keep them for yourself!"</p>
        <div className="hero-actions">
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn-primary">ORDER ON WHATSAPP</a>
          <button className="btn-secondary" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>SEE PRODUCTS ↓</button>
        </div>
        <div className="hero-stats">
          <div className="stat"><Counter to={8} suffix="+" /><span className="stat-label">Product Types</span></div>
          <div className="stat-divider" />
          <div className="stat"><Counter to={4} /><span className="stat-label">Materials</span></div>
          <div className="stat-divider" />
          <div className="stat"><span className="stat-num">∞</span><span className="stat-label">Customizations</span></div>
        </div>
      </div>
      <div className="hero-visual" ref={visualRef}>
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
function ProductCard({ product, onClick, index }) {
  return (
    <div className="product-card reveal" style={{ "--accent": product.accent, "--reveal-delay": `${index * 0.07}s` }} onClick={onClick}>
      <div className="card-number">0{product.id}</div>
      <div className="card-image-wrap">
        <img src={sized(product.image, 600)} alt={`Custom metal ${product.name.toLowerCase()} by Ferrouswheel, Bangalore`} loading="lazy" width="600" height="400" className="card-image" />
        <div className="card-image-overlay">
          <span>VIEW GALLERY →</span>
        </div>
      </div>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-tagline">"{product.tagline}"</p>
      <p className="card-desc">{product.description}</p>
      <div className="card-materials">{product.materials}</div>
      <a className="card-cta" href={hrefFor(product)} onClick={(e) => e.stopPropagation()}>EXPLORE {product.name.toUpperCase()} →</a>
      <div className="card-glow" />
    </div>
  );
}
function SpinShowcase({ onSelect }) {
  const ringRef = useRef(null);
  const stageRef = useRef(null);
  const st = useRef({ rot: 0, vel: 0.07, dragging: false, lastX: 0, moved: 0, raf: null }).current;
  useEffect(() => {
    const ring = ringRef.current;
    const stage = stageRef.current;
    if (!ring || !stage) return;
    if (REDUCED()) { ring.style.transform = "rotateY(0deg)"; return; }
    const IDLE = 0.07;
    const tick = () => {
      st.raf = requestAnimationFrame(tick);
      if (!st.dragging) st.vel += (Math.sign(st.vel || 1) * IDLE - st.vel) * 0.03;
      st.rot += st.vel;
      ring.style.transform = `rotateY(${st.rot}deg)`;
    };
    tick();
    const down = (e) => { st.dragging = true; st.lastX = e.clientX; st.moved = 0; st.vel = 0; };
    const move = (e) => {
      if (!st.dragging) return;
      const dx = e.clientX - st.lastX;
      st.lastX = e.clientX;
      st.moved += Math.abs(dx);
      st.vel = Math.max(-6, Math.min(6, dx * 0.35));
    };
    const up = () => { st.dragging = false; };
    stage.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
      stage.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [st]);
  const n = products.length;
  return (
    <div className="spin-showcase reveal">
      <div className="lc-copy">
        <span className="section-tag">WORKSHOP SHOWCASE</span>
        <h3 className="lc-title">FRESH FROM<br /><span className="outline-text">THE WORKSHOP</span></h3>
        <p className="lc-sub">Real pieces, cut in Bommasandra. <strong>Drag to spin</strong> the lineup — tap any piece for a closer look.</p>
      </div>
      <div className="spin-stage" ref={stageRef}>
        <div className="spin-ring" ref={ringRef}>
          {products.map((p, i) => (
            <button
              key={p.id}
              className="spin-card"
              style={{ transform: `rotateY(${(360 / n) * i}deg) translateZ(285px)` }}
              aria-label={`View ${p.name}`}
              onClick={() => { if (st.moved < 8) onSelect(p); }}
            >
              <img src={sized(p.image, 320)} alt="" loading="lazy" draggable="false" width="150" height="150" />
              <span>{p.name.toUpperCase()}</span>
            </button>
          ))}
        </div>
        <div className="spin-floor" />
      </div>
    </div>
  );
}
function Products() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="products" className="products">
      <div className="section-header reveal">
        <span className="section-tag">WHAT WE MAKE</span>
        <h2 className="section-title">PRODUCT<br /><span className="outline-text">CATEGORIES</span></h2>
        <p className="section-sub">Every piece is custom. Every piece is metal. Every piece is yours.</p>
      </div>
      <SpinShowcase onSelect={setSelected} />
      <div className="products-grid">
        {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} onClick={() => setSelected(p)} />)}
      </div>
      {selected && <GalleryModal product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
function About() {
  return (
    <section id="about" className="about">
      <MetalPattern />
      <div className="about-content">
        <div className="about-text reveal">
          <span className="section-tag">THE STORY</span>
          <h2 className="section-title">BUILT IN A<br /><span className="outline-text">WORKSHOP,</span><br />BORN FROM A DREAM.</h2>
          <p className="about-para">Meet Yousuf — in January 2025, he stood on top of a go-kart he built himself. That same day, he started dreaming about his next creation: a business.</p>
          <p className="about-para">Ferrouswheel was born in Bommasandra, Bangalore — a workshop where sparks fly and ideas take shape in metal. Run by Yousuf and his sister, every piece is designed with love, cut with precision, and shipped with pride.</p>
          <div className="about-values">
            <div className="value-chip">⚡ Craft-forward</div>
            <div className="value-chip">🎯 100% Custom</div>
            <div className="value-chip">🚀 Pan India Delivery</div>
            <div className="value-chip">❤️ Made with passion</div>
          </div>
        </div>
        <div className="about-visual">
          <div className="about-card reveal" style={{ "--reveal-delay": "0.1s" }}>
            <div className="welder-icon">⚙️</div>
            <div className="about-quote">"With a full tank of petrol and a workshop where he can bring ideas to life — ready to craft your custom keepsake."</div>
            <div className="about-sig">— Yousuf, Founder</div>
          </div>
          <div className="testimonial-card reveal" style={{ "--reveal-delay": "0.2s" }}>
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
      <div className="section-header reveal">
        <span className="section-tag">SIMPLE PROCESS</span>
        <h2 className="section-title">HOW TO<br /><span className="outline-text">ORDER</span></h2>
      </div>
      <div className="steps-grid">
        {steps.map((step, i) => (
          <div key={i} className="step-card reveal" style={{ "--reveal-delay": `${i * 0.07}s` }}>
            <div className="step-num">{step.num}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-cta-box">
        <p>Ready? It takes 30 seconds to get started.</p>
        <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn-primary large">💬 CHAT ON WHATSAPP</a>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section id="contact" className="contact">
      <MetalPattern />
      <Embers count={8} />
      <div className="contact-content">
        <div className="section-header left reveal">
          <span className="section-tag">GET IN TOUCH</span>
          <h2 className="section-title">LET'S MAKE<br /><span className="outline-text">SOMETHING</span><br />COOL.</h2>
        </div>
        <div className="contact-cards">
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="contact-card reveal" style={{ "--reveal-delay": "0s" }}>
            <span className="contact-icon">📱</span>
            <span className="contact-label">WHATSAPP</span>
            <span className="contact-value">+91 81056 77799</span>
          </a>
          <a href="https://instagram.com/ferrouswheel27" target="_blank" rel="noreferrer" className="contact-card reveal" style={{ "--reveal-delay": "0.07s" }}>
            <span className="contact-icon">📸</span>
            <span className="contact-label">INSTAGRAM</span>
            <span className="contact-value">@ferrouswheel27</span>
          </a>
          <a href="mailto:ferrouswheel27@gmail.com" className="contact-card reveal" style={{ "--reveal-delay": "0.14s" }}>
            <span className="contact-icon">✉️</span>
            <span className="contact-label">EMAIL</span>
            <span className="contact-value">ferrouswheel27@gmail.com</span>
          </a>
          <a href="https://maps.app.goo.gl/7Umhcvtc46e2WFeg7" target="_blank" rel="noreferrer" className="contact-card reveal" style={{ "--reveal-delay": "0.21s" }}>
            <span className="contact-icon">📍</span>
            <span className="contact-label">WORKSHOP</span>
            <span className="contact-value">235/E Bommasandra Industrial Area, Bangalore 560099</span>
          </a>
        </div>
      </div>
    </section>
  );
}
const BULK_POINTS = [
  { icon: "🏫", title: "Your logo, in metal", desc: "We can cut your school crest or company logo in full detail, even on small pieces." },
  { icon: "🔥", title: "We make it ourselves", desc: "Everything is cut in our own workshop in Bommasandra. Nothing is outsourced." },
  { icon: "🧾", title: "Simple payment", desc: "Pay 50% to get started, or send us a purchase order and we'll invoice against it." },
  { icon: "📦", title: "Delivered anywhere in India", desc: "We pack it well and ship it to your school, office or venue." },
];
const BULK_USES = [
  { id: 4, use: "For Sports Day, clubs and races" },
  { id: 1, use: "Return gifts, prizes, Teacher's Day" },
  { id: 2, use: "For teams, events and conferences" },
  { id: 3, use: "Staff awards and desk plates" },
];
function BulkSection() {
  return (
    <section id="bulk" className="bulk">
      <div className="section-header reveal">
        <span className="section-tag">SCHOOLS · CLUBS · COMPANIES</span>
        <h2 className="section-title">BULK<br /><span className="outline-text">ORDERS</span></h2>
        <p className="section-sub">Medal hangers for Sports Day, bookmarks as return gifts, keychains for your team. All with your logo on them.</p>
      </div>
      <div className="bulk-grid">
        {BULK_POINTS.map((b, i) => (
          <div key={b.title} className="step-card reveal" style={{ "--reveal-delay": `${i * 0.07}s` }}>
            <div className="bulk-icon">{b.icon}</div>
            <div className="step-content"><h3>{b.title}</h3><p>{b.desc}</p></div>
          </div>
        ))}
      </div>
      <div className="order-cta-box">
        <p>Got Sports Day or an event coming up? Message us early. 200 pieces take about 4 weeks.</p>
        <div className="cta-row">
          <a href={WA_BULK} target="_blank" rel="noreferrer" className="btn-primary large">💬 BULK ENQUIRY</a>
          <a href={`/${PAGES.bulk.slug}`} className="btn-secondary large">HOW BULK ORDERS WORK →</a>
        </div>
      </div>
    </section>
  );
}
function Crumbs({ label, inProducts = true }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a><span>/</span>{inProducts && <><a href="/#products">Products</a><span>/</span></>}<span aria-current="page">{label}</span>
    </nav>
  );
}
function CategoryPage({ product, page }) {
  const [open, setOpen] = useState(null);
  const gallery = product.gallery || [product.image];
  const others = products.filter((p) => p.id !== product.id);
  return (
    <div className="cat-page" style={{ "--accent": product.accent }}>
      <section className="cat-hero">
        <MetalPattern />
        <div className="cat-hero-copy">
          <Crumbs label={product.name} />
          <h1 className="cat-title">{page.h1}</h1>
          <p className="cat-tagline">"{product.tagline}"</p>
          {page.intro.map((t, i) => <p key={i} className="cat-intro">{t}</p>)}
          <p className="cat-materials">{product.materials}</p>
          <div className="cta-row">
            <a href={WA(`Hi Ferrouswheel! I'd love to customize ${page.h1.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="btn-primary">💬 CUSTOMIZE ON WHATSAPP</a>
            <a href={`/${PAGES.bulk.slug}`} className="btn-secondary">BULK ORDER →</a>
          </div>
        </div>
        <button className="cat-hero-img" onClick={() => setOpen(0)} aria-label={`Open ${product.name} gallery`}>
          <img src={product.image} alt={`${page.h1} by Ferrouswheel, Bangalore`} />
        </button>
      </section>
      {gallery.length > 1 && (
        <section className="cat-section">
          <span className="section-tag">FROM THE WORKSHOP</span>
          <h2 className="cat-h2">Some we've made recently</h2>
          <div className="cat-gallery">
            {gallery.map((img, i) => (
              <button key={img} className="cat-thumb" onClick={() => setOpen(i)} aria-label={`View photo ${i + 1}`}>
                <img src={sized(img, 600)} alt={`${page.h1} — piece ${i + 1} by Ferrouswheel`} loading="lazy" width="600" height="600" />
              </button>
            ))}
          </div>
        </section>
      )}
      <section className="cat-section">
        <span className="section-tag">POPULAR IDEAS</span>
        <h2 className="cat-h2">Ideas people love</h2>
        <div className="idea-chips">{page.ideas.map((t) => <span key={t} className="value-chip">{t}</span>)}</div>
        <p className="cat-note">Have something else in mind? Send us a photo or a rough sketch on WhatsApp. If you can describe it, we can probably make it.</p>
      </section>
      <section className="cat-section">
        <span className="section-tag">QUESTIONS</span>
        <h2 className="cat-h2">Good to know</h2>
        <div className="faq">
          <details>
            <summary>How do I order {page.h1.toLowerCase()}?</summary>
            <p>Message us on WhatsApp at +91 81056 77799 with your idea, a name, and a photo or sketch if you have one. We send you the design first and only cut once you're happy with it.</p>
          </details>
          <details>
            <summary>Which metals can you use?</summary>
            <p>{product.materials.replace(/ · /g, ", ")}. We'll suggest what suits your design and budget.</p>
          </details>
          <details>
            <summary>Do you deliver outside Bangalore?</summary>
            <p>Yes. We're based in Bommasandra, Bangalore, and we ship across India.</p>
          </details>
          <details>
            <summary>Can I order in bulk for a school, club or company?</summary>
            <p>Yes. We cut your crest or logo in, and can invoice against a purchase order. See <a href={`/${PAGES.bulk.slug}`}>bulk orders</a> for how it works.</p>
          </details>
        </div>
      </section>
      <HowToOrder />
      <section className="cat-section">
        <span className="section-tag">MORE FROM THE WORKSHOP</span>
        <h2 className="cat-h2">See what else we make</h2>
        <div className="related-grid">
          {others.map((p) => (
            <a key={p.id} href={hrefFor(p)} className="related-card" style={{ "--accent": p.accent }}>
              <img src={sized(p.image, 480)} alt="" loading="lazy" width="480" height="360" />
              <span>{pageFor(p).h1}</span>
            </a>
          ))}
        </div>
      </section>
      <Contact />
      {open !== null && <GalleryModal product={product} start={open} showPageLink={false} onClose={() => setOpen(null)} />}
    </div>
  );
}
function BulkPage() {
  const page = PAGES.bulk;
  const steps = [
    { num: "01", title: "Tell us what you need", desc: "What you want, how many, your logo, and when you need it." },
    { num: "02", title: "See the design and price", desc: "We send you a design and a quote. We'll change it until you're happy." },
    { num: "03", title: "Confirm", desc: "Pay 50% upfront, or send us a purchase order." },
    { num: "04", title: "We make it", desc: "Everything is cut and finished in our workshop in Bangalore." },
    { num: "05", title: "We deliver", desc: "Packed and sent to your school, office or venue, anywhere in India." },
  ];
  return (
    <div className="cat-page">
      <section className="cat-hero bulk-hero">
        <MetalPattern />
        <div className="cat-hero-copy">
          <Crumbs label="Bulk Orders" inProducts={false} />
          <h1 className="cat-title">{page.h1}</h1>
          <p className="cat-tagline">"One for every kid on the team."</p>
          <p className="cat-intro">We make custom metal gifts in bulk for schools, sports clubs and companies. Medal hangers for Sports Day, bookmarks as prizes or return gifts, keychains for teams and events, and plaques for staff awards.</p>
          <p className="cat-intro">You see the design before we cut anything. Everything is made in our own workshop in Bommasandra, so your logo comes out sharp, even on small pieces.</p>
          <div className="cta-row">
            <a href={WA_BULK} target="_blank" rel="noreferrer" className="btn-primary">💬 WHATSAPP US</a>
            <a href={MAIL_BULK} className="btn-secondary">✉️ EMAIL US</a>
          </div>
        </div>
      </section>
      <section className="cat-section">
        <span className="section-tag">WHAT SCHOOLS & COMPANIES ORDER</span>
        <h2 className="cat-h2">Popular for bulk</h2>
        <div className="related-grid">
          {BULK_USES.map(({ id, use }) => {
            const p = products.find((x) => x.id === id);
            return (
              <a key={id} href={hrefFor(p)} className="related-card" style={{ "--accent": p.accent }}>
                <img src={sized(p.image, 480)} alt="" loading="lazy" width="480" height="360" />
                <span>{pageFor(p).h1}</span>
                <small>{use}</small>
              </a>
            );
          })}
        </div>
      </section>
      <section className="cat-section">
        <span className="section-tag">WHY FERROUSWHEEL</span>
        <h2 className="cat-h2">Why order from us</h2>
        <div className="bulk-grid">
          {BULK_POINTS.map((b) => (
            <div key={b.title} className="step-card">
              <div className="bulk-icon">{b.icon}</div>
              <div className="step-content"><h3>{b.title}</h3><p>{b.desc}</p></div>
            </div>
          ))}
        </div>
      </section>
      <section className="cat-section">
        <span className="section-tag">HOW IT WORKS</span>
        <h2 className="cat-h2">How it works</h2>
        <div className="steps-grid">
          {steps.map((s) => (
            <div key={s.num} className="step-card">
              <div className="step-num">{s.num}</div>
              <div className="step-content"><h3>{s.title}</h3><p>{s.desc}</p></div>
            </div>
          ))}
        </div>
        <div className="order-cta-box">
          <p><strong>Please plan ahead.</strong> 200 pieces take about 4 weeks, and we can only take a few bulk orders each month. If it's for Sports Day, Annual Day or Diwali, message us early so we can save you a slot.</p>
          <div className="cta-row">
            <a href={WA_BULK} target="_blank" rel="noreferrer" className="btn-primary large">💬 MESSAGE US ON WHATSAPP</a>
          </div>
        </div>
      </section>
      <Contact />
    </div>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <img src={LOGO} alt="Ferrouswheel — custom made gifts" width="232" height="56" style={{ height: "56px", width: "auto", maxWidth: "80vw", marginBottom: "12px" }} />
      <p className="footer-tagline">"Gifts sooo good you want to keep them for yourself!"</p>
      <nav className="footer-links" aria-label="Product categories">
        {products.map((p) => <a key={p.id} href={hrefFor(p)}>{pageFor(p).h1}</a>)}
        <a href={`/${PAGES.bulk.slug}`}>Bulk Orders</a>
      </nav>
      <p className="footer-copy">© 2026 Ferrouswheel · Est. 2024 · Bangalore, India</p>
    </footer>
  );
}
export default function FerrouswheelWebsite() {
  const [activeSection, setActiveSection] = useState("hero");
  const category = PAGES.categories.find((c) => `/${c.slug}` === CURRENT_PATH);
  const product = category && products.find((p) => p.id === category.id);
  const isBulk = CURRENT_PATH === `/${PAGES.bulk.slug}`;
  const isHome = !product && !isBulk;
  useEffect(() => {
    if (product) setMeta(category.title, category.description, CURRENT_PATH);
    else if (isBulk) setMeta(PAGES.bulk.title, PAGES.bulk.description, CURRENT_PATH);
    else {
      setMeta(PAGES.home.title, PAGES.home.description, "/");
      const id = window.location.hash.slice(1);
      if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 120);
    }
  }, []);
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    ["hero", "products", "about", "order", "bulk", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);
  return (
    <div className="fw-app">
      <style dangerouslySetInnerHTML={{ __html: `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --red: #E63946; --red-btn: #D62839; --orange: #FF6B35; --black: #0A0A0A; --dark: #111111;
          --card-bg: #161616; --border: rgba(255,255,255,0.07); --text: #F0F0F0; --muted: #888;
          --font-display: 'Bebas Neue', sans-serif; --font-body: 'Barlow', sans-serif; --font-cond: 'Barlow Condensed', sans-serif;
        }
        .fw-app { background: var(--black); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 12px 40px; background: rgba(10,10,10,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-logo { cursor: pointer; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { background: none; border: none; color: var(--muted); font-family: var(--font-cond); font-size: 13px; letter-spacing: 2px; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--red); }
        .nav-cta { background: var(--red-btn); color: #fff; padding: 8px 20px; font-family: var(--font-cond); font-size: 13px; font-weight: 700; letter-spacing: 2px; text-decoration: none; border-radius: 2px; transition: background 0.2s; }
        .nav-cta:hover { background: #c0303b; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; z-index: 102; }
        .hamburger span { width: 24px; height: 2px; background: var(--text); display: block; transition: transform 0.25s, opacity 0.2s; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu { position: fixed; inset: 0; z-index: 101; background: rgba(10,10,10,0.98); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 36px; }
        .mobile-link { background: none; border: none; color: var(--text); font-family: var(--font-display); font-size: 34px; letter-spacing: 4px; cursor: pointer; opacity: 0; transform: translateY(16px); animation: menuIn 0.35s cubic-bezier(0.22,1.36,0.36,1) forwards; animation-delay: calc(var(--i) * 0.06s); }
        .mobile-link:active { color: var(--red); }
        .mobile-cta { font-size: 16px; padding: 14px 34px; opacity: 0; transform: translateY(16px); animation: menuIn 0.35s cubic-bezier(0.22,1.36,0.36,1) forwards; animation-delay: calc(var(--i) * 0.06s); }
        @keyframes menuIn { to { opacity: 1; transform: translateY(0); } }
        .hero { min-height: 100vh; display: flex; align-items: center; padding: 100px 40px 60px; position: relative; overflow: hidden; background: radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.08) 0%, transparent 60%); }
        .metal-pattern { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.5; will-change: transform; }
        .embers { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .ember { position: absolute; bottom: -10px; border-radius: 50%; background: #ff8a3c; box-shadow: 0 0 6px 2px rgba(255,120,40,0.5); opacity: 0; animation: emberRise linear infinite; }
        @keyframes emberRise {
          0% { transform: translate(0, 0); opacity: 0; }
          8% { opacity: 0.9; }
          55% { opacity: 0.45; }
          100% { transform: translate(var(--drift), -102vh); opacity: 0; }
        }
        .hero-content { flex: 1; max-width: 700px; position: relative; z-index: 2; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .hero-badge { font-family: var(--font-cond); font-size: 12px; letter-spacing: 4px; color: var(--red); margin-bottom: 24px; }
        .hero-title { font-family: var(--font-display); line-height: 0.9; margin-bottom: 24px; }
        .hero-line1, .hero-line2, .hero-line3 { display: block; font-size: clamp(72px, 12vw, 140px); color: var(--text); }
        .hero-accent { display: block; font-size: clamp(72px, 12vw, 140px); color: var(--red); }
        .hero-tagline { font-size: 16px; color: var(--muted); font-style: italic; margin-bottom: 40px; }
        .hero-actions { display: flex; gap: 16px; margin-bottom: 60px; flex-wrap: wrap; }
        .btn-primary { background: var(--red-btn); color: #fff; padding: 14px 28px; font-family: var(--font-cond); font-size: 14px; font-weight: 700; letter-spacing: 2px; text-decoration: none; border-radius: 2px; border: none; cursor: pointer; transition: all 0.2s; display: inline-block; }
        .btn-primary:hover { background: #b81f2e; transform: translateY(-2px); }
        .btn-primary.large { padding: 18px 40px; font-size: 16px; }
        .btn-secondary { background: transparent; color: var(--text); padding: 14px 28px; font-family: var(--font-cond); font-size: 14px; font-weight: 700; letter-spacing: 2px; border: 1px solid var(--border); border-radius: 2px; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { border-color: var(--red); color: var(--red); }
        .hero-stats { display: flex; align-items: center; gap: 32px; }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-family: var(--font-display); font-size: 36px; color: var(--red); }
        .stat-label { font-size: 11px; letter-spacing: 2px; color: var(--muted); font-family: var(--font-cond); white-space: nowrap; }
        .stat-divider { width: 1px; height: 40px; background: var(--border); }
        .hero-visual { flex: 1; display: flex; align-items: center; justify-content: center; position: relative; height: 400px; will-change: transform; }
        .hero-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(230,57,70,0.2); }
        .ring1 { width: 300px; height: 300px; animation: spin 20s linear infinite; }
        .ring2 { width: 220px; height: 220px; border-color: rgba(255,107,53,0.15); animation: spin 14s linear infinite reverse; }
        .ring3 { width: 140px; height: 140px; border-color: rgba(230,57,70,0.25); animation: spin 8s linear infinite; }
        .hero-icon-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; position: relative; z-index: 2; }
        .floating-icon { font-size: 32px; text-align: center; animation: float 3s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes heroIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(230,57,70,0.5); } 50% { box-shadow: 0 0 0 6px rgba(230,57,70,0); } }
        .reveal { opacity: 0; transform: translateY(34px); transition: opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1.36,0.36,1); transition-delay: var(--reveal-delay, 0s); will-change: opacity, transform; }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .hero-badge { animation: heroIn 0.6s ease both; }
        .hero-line1 { animation: heroIn 0.6s ease both 0.1s; }
        .hero-line2 { animation: heroIn 0.6s ease both 0.2s; }
        .hero-line3 { animation: heroIn 0.6s ease both 0.3s; }
        .hero-accent { animation: heroIn 0.6s ease both 0.4s; }
        .hero-tagline { animation: heroIn 0.6s ease both 0.5s; }
        .hero-actions { animation: heroIn 0.6s ease both 0.6s; }
        .hero-stats { animation: heroIn 0.6s ease both 0.7s; }
        .nav-cta { animation: pulseGlow 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .hero-badge, .hero-line1, .hero-line2, .hero-line3, .hero-accent, .hero-tagline, .hero-actions, .hero-stats, .nav-cta, .floating-icon, .hero-ring, .mobile-link, .mobile-cta { animation: none !important; opacity: 1; transform: none; }
          .ember { display: none; }
        }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header.left { text-align: left; }
        .section-tag { font-family: var(--font-cond); font-size: 11px; letter-spacing: 4px; color: var(--red); display: block; margin-bottom: 12px; }
        .section-tag::after { content: ""; display: inline-block; width: 0; height: 2px; background: var(--red); margin-left: 10px; vertical-align: middle; transform: skewX(-30deg); transition: width 0.5s cubic-bezier(0.22,1,0.36,1) 0.25s; }
        .reveal.visible .section-tag::after, .visible .section-tag::after { width: 46px; }
        .section-title { font-family: var(--font-display); font-size: clamp(48px, 8vw, 90px); line-height: 0.95; color: var(--text); }
        .outline-text { -webkit-text-stroke: 1px var(--red); color: transparent; }
        .section-sub { color: var(--muted); font-size: 15px; margin-top: 16px; }
        .products { padding: 100px 40px; }
        .spin-showcase { display: flex; align-items: center; gap: 56px; max-width: 1000px; margin: 0 auto 72px; flex-wrap: wrap; justify-content: center; }
        .spin-stage { width: min(560px, 92vw); height: 360px; perspective: 1100px; position: relative; touch-action: pan-y; cursor: grab; user-select: none; -webkit-user-select: none; }
        .spin-stage:active { cursor: grabbing; }
        .spin-ring { position: absolute; inset: 0; transform-style: preserve-3d; will-change: transform; }
        .spin-card { position: absolute; top: 50%; left: 50%; width: 150px; height: 150px; margin: -75px 0 0 -75px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.16); background: var(--card-bg); box-shadow: 0 14px 30px rgba(0,0,0,0.55); backface-visibility: hidden; cursor: pointer; padding: 0; }
        .spin-card img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
        .spin-card span { position: absolute; bottom: 0; left: 0; right: 0; font-family: var(--font-cond); font-size: 10px; letter-spacing: 2px; background: rgba(0,0,0,0.7); padding: 4px 6px; text-align: center; color: #fff; }
        .spin-floor { position: absolute; left: 50%; bottom: 0; width: 72%; height: 64px; transform: translateX(-50%); background: radial-gradient(ellipse at center, rgba(230,57,70,0.26), transparent 70%); filter: blur(8px); pointer-events: none; }
        .lc-copy { max-width: 340px; }
        .lc-title { font-family: var(--font-display); font-size: clamp(40px, 6vw, 60px); line-height: 0.95; color: var(--text); margin: 8px 0 14px; }
        .lc-sub { color: var(--muted); font-size: 14px; line-height: 1.7; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1240px; margin: 0 auto; }
        .product-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 0 0 24px; position: relative; overflow: hidden; transition: all 0.3s; cursor: pointer; }
        .product-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .product-card:hover .card-image-overlay { opacity: 1; }
        .product-card:hover .card-glow { opacity: 1; }
        .card-image-wrap { position: relative; width: 100%; height: 200px; overflow: hidden; }
        .card-image { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; transition: transform 0.3s; }
        .product-card:hover .card-image { transform: scale(1.05); }
        .card-image-overlay { position: absolute; inset: 0; background: rgba(230,57,70,0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; font-family: var(--font-cond); font-size: 14px; letter-spacing: 2px; color: #fff; font-weight: 700; }
        .card-glow { position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: var(--accent); filter: blur(40px); opacity: 0; transition: opacity 0.3s; pointer-events: none; border-radius: 50%; }
        .card-number { font-family: var(--font-display); font-size: 48px; color: rgba(255,255,255,0.04); position: absolute; top: 12px; right: 20px; z-index: 1; }
        .card-name { font-family: var(--font-display); font-size: 32px; color: var(--text); margin: 16px 24px 4px; }
        .card-tagline { font-size: 12px; color: var(--accent); font-style: italic; margin: 0 24px 12px; }
        .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin: 0 24px 16px; }
        .card-materials { font-family: var(--font-cond); font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.6); margin: 0 24px 20px; }
        .card-cta { font-family: var(--font-cond); font-size: 12px; letter-spacing: 2px; color: var(--accent); margin: 0 24px; font-weight: 700; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .modal { background: var(--dark); border: 1px solid var(--border); border-radius: 8px; max-width: 700px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; }
        .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--muted); font-size: 20px; cursor: pointer; z-index: 10; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
        .modal-close:hover { color: var(--text); }
        .modal-header { padding: 24px 24px 0; }
        .modal-title { font-family: var(--font-display); font-size: 40px; color: var(--text); }
        .modal-tagline { font-size: 13px; color: var(--red); font-style: italic; margin-top: 4px; }
        .modal-main-image { position: relative; width: 100%; height: 400px; margin-top: 16px; overflow: hidden; }
        .modal-main-image img { width: 100%; height: 100%; object-fit: cover; }
        .modal-nav { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.6); border: none; color: #fff; font-size: 32px; width: 48px; height: 48px; cursor: pointer; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .modal-nav:hover { background: var(--red); }
        .modal-nav.prev { left: 12px; }
        .modal-nav.next { right: 12px; }
        .modal-thumbs { display: flex; gap: 8px; padding: 12px 24px; overflow-x: auto; }
        .thumb { width: 70px; height: 70px; object-fit: cover; border-radius: 4px; cursor: pointer; opacity: 0.5; border: 2px solid transparent; transition: all 0.2s; flex-shrink: 0; }
        .thumb.active { opacity: 1; border-color: var(--red); }
        .modal-footer { padding: 16px 24px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid var(--border); margin-top: 8px; position: sticky; bottom: 0; background: var(--dark); }
        .modal-materials { font-family: var(--font-cond); font-size: 11px; letter-spacing: 2px; color: var(--muted); }
        .about { padding: 100px 40px; position: relative; background: rgba(255,255,255,0.01); }
        .about-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1240px; margin: 0 auto; }
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
        .how-to-order { padding: 100px 40px; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin: 0 auto 60px; max-width: 1240px; }
        .step-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 24px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s; }
        .step-card:hover { border-color: rgba(230,57,70,0.4); }
        .step-num { font-family: var(--font-display); font-size: 40px; color: var(--red); opacity: 0.6; }
        .step-content h3 { font-family: var(--font-cond); font-size: 18px; letter-spacing: 1px; color: var(--text); margin-bottom: 6px; }
        .step-content p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .order-cta-box { text-align: center; border: 1px solid var(--border); border-radius: 4px; padding: 48px; background: rgba(230,57,70,0.04); max-width: 1240px; margin: 0 auto; }
        .order-cta-box p { color: var(--muted); font-size: 16px; margin-bottom: 24px; }
        .contact { padding: 100px 40px; position: relative; background: rgba(255,255,255,0.01); overflow: hidden; }
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
        .contact-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 24px; display: flex; flex-direction: column; gap: 6px; text-decoration: none; transition: all 0.2s; }
        .contact-card:hover { border-color: var(--red); transform: translateY(-2px); }
        .contact-icon { font-size: 24px; }
        .contact-label { font-family: var(--font-cond); font-size: 10px; letter-spacing: 3px; color: var(--red); }
        .contact-value { font-size: 13px; color: var(--text); }
        .footer { padding: 40px; border-top: 1px solid var(--border); text-align: center; display: flex; flex-direction: column; align-items: center; }
        .footer-tagline { font-size: 13px; color: var(--muted); font-style: italic; margin-bottom: 8px; }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,0.55); font-family: var(--font-cond); letter-spacing: 2px; }
        .nav-logo { display: block; }
        .card-cta { display: inline-block; text-decoration: none; }
        .card-cta:hover { text-decoration: underline; }
        .modal-page-link { font-family: var(--font-cond); font-size: 12px; letter-spacing: 2px; color: var(--text); text-decoration: none; border-bottom: 1px solid var(--red); padding-bottom: 2px; }
        .modal-page-link:hover { color: var(--red); }
        a.btn-secondary { text-decoration: none; display: inline-block; }
        .btn-secondary.large { padding: 18px 32px; font-size: 15px; }
        .cta-row { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }
        .order-cta-box .cta-row { justify-content: center; }
        .bulk { padding: 100px 40px; }
        .bulk-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; max-width: 1240px; margin: 0 auto 40px; }
        .bulk-icon { font-size: 30px; }
        .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 22px; max-width: 760px; margin: 18px 0 20px; }
        .footer-links a { color: var(--muted); font-size: 13px; text-decoration: none; }
        .footer-links a:hover { color: var(--red); }
        .cat-page { padding-top: 66px; }
        .cat-hero { position: relative; overflow: hidden; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center; padding: 64px 40px 72px; max-width: 1320px; margin: 0 auto; }
        .bulk-hero { grid-template-columns: 1fr; max-width: 900px; }
        .cat-hero-copy { position: relative; z-index: 2; }
        .crumbs { display: flex; flex-wrap: wrap; gap: 8px; font-family: var(--font-cond); font-size: 12px; letter-spacing: 2px; color: var(--muted); margin-bottom: 22px; text-transform: uppercase; }
        .crumbs a { color: var(--muted); text-decoration: none; }
        .crumbs a:hover { color: var(--red); }
        .crumbs [aria-current] { color: var(--red); }
        .cat-title { font-family: var(--font-display); font-size: clamp(54px, 8vw, 104px); line-height: 0.92; color: var(--text); }
        .cat-tagline { color: var(--accent, var(--red)); font-style: italic; font-size: 16px; margin: 14px 0 22px; }
        .cat-intro { color: #bdbdbd; font-size: 16px; line-height: 1.75; margin-bottom: 14px; max-width: 620px; }
        .cat-materials { font-family: var(--font-cond); font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,0.6); margin: 18px 0 26px; }
        .cat-hero-img { position: relative; z-index: 2; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; aspect-ratio: 4 / 5; background: var(--card-bg); padding: 0; cursor: zoom-in; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
        .cat-hero-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s; }
        .cat-hero-img:hover img { transform: scale(1.04); }
        .cat-section { padding: 56px 40px; max-width: 1240px; margin: 0 auto; }
        .cat-h2 { font-family: var(--font-display); font-size: clamp(34px, 5vw, 52px); line-height: 1; color: var(--text); margin-bottom: 26px; }
        .cat-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
        .cat-thumb { aspect-ratio: 1; border: 1px solid var(--border); border-radius: 4px; overflow: hidden; padding: 0; background: var(--card-bg); cursor: zoom-in; }
        .cat-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s; }
        .cat-thumb:hover img { transform: scale(1.06); }
        .idea-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 18px; }
        .idea-chips .value-chip { font-size: 14px; padding: 8px 16px; }
        .cat-note { color: var(--muted); font-size: 14px; }
        .faq { display: grid; gap: 10px; max-width: 760px; }
        .faq details { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 16px 20px; }
        .faq summary { cursor: pointer; font-family: var(--font-cond); font-size: 18px; letter-spacing: 0.5px; color: var(--text); list-style: none; }
        .faq summary::-webkit-details-marker { display: none; }
        .faq summary::after { content: "+"; float: right; color: var(--red); font-size: 20px; line-height: 1; }
        .faq details[open] summary::after { content: "–"; }
        .faq p { color: #bdbdbd; font-size: 15px; line-height: 1.7; margin-top: 10px; }
        .faq a { color: var(--red); }
        .cat-page .how-to-order { padding: 56px 40px; }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
        .related-card { display: flex; flex-direction: column; background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; overflow: hidden; text-decoration: none; transition: border-color 0.2s, transform 0.2s; }
        .related-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .related-card img { width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; display: block; }
        .related-card span { font-family: var(--font-display); font-size: 22px; color: var(--text); padding: 12px 14px 4px; }
        .related-card small { color: var(--muted); font-size: 12px; padding: 0 14px 14px; line-height: 1.5; }
        .related-card span:last-child { padding-bottom: 14px; }
        @media (max-width: 900px) {
          .navbar { padding: 12px 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .hero { flex-direction: column; padding: 100px 24px 60px; gap: 40px; }
          .hero-visual { width: 100%; }
          .about-content, .contact-content { grid-template-columns: 1fr; gap: 40px; }
          .products, .about, .how-to-order, .contact, .bulk { padding: 60px 24px; }
          .cat-hero { grid-template-columns: 1fr; padding: 36px 24px 48px; gap: 32px; }
          .cat-section, .cat-page .how-to-order { padding: 40px 24px; }
          .modal-main-image { height: 260px; }
          .spin-stage { height: 300px; }
          .spin-card { width: 120px; height: 120px; margin: -60px 0 0 -60px; }
        }
        @media (max-width: 600px) {
          .contact-cards { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .cta-row { flex-direction: column; align-items: stretch; text-align: center; }
          .related-grid { grid-template-columns: 1fr 1fr; }
          .cat-gallery { grid-template-columns: 1fr 1fr; }
          .modal-footer { flex-direction: column; align-items: flex-start; }
          .ember:nth-child(n+7) { display: none; }
        }
      ` }} />
      <Navbar activeSection={isHome ? activeSection : ""} />
      <main id="main">
      {product ? (
        <CategoryPage product={product} page={category} />
      ) : isBulk ? (
        <BulkPage />
      ) : (
        <>
          <Hero />
          <Products />
          <About />
          <HowToOrder />
          <BulkSection />
          <Contact />
        </>
      )}
      </main>
      <Footer />
    </div>
  );
}
