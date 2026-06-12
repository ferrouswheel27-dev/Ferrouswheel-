import { useState, useEffect, useRef } from "react";
const CLD = "https://res.cloudinary.com/dbzmj5nvh/image/upload/w_800,q_auto,f_auto";
const LOGO = `${CLD}/IMG_3739_rxeqd2.png`;
const WA = (msg) => `https://wa.me/918105677799?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = WA("Hi Ferrous Wheel! I'd like to order a custom metal gift.");
const products = [
  {
    id: 1,
    name: "Bookmarks",
    tagline: "A little spark to every story",
    description: "Playful metal bookmarks with cute hobby-themed shapes. Personalized with your name.",
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
    description: "Fun custom metal keychains in any shape you love — sports, cars, music, you name it.",
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
    description: "Custom nameplates featuring your passion — tennis, sneakers, cars — with your name.",
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
    description: "Custom medal hangers that put your achievements on display — your sport, your style.",
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
    description: "Fun custom metal necklaces that let you wear your personality loud and proud.",
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
    description: "Custom wall clocks where your favorite sport or hobby replaces the numbers.",
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
    description: "Handcrafted metal scale models — bikes, cars, anything with wheels and soul.",
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
    description: "Custom metal pieces inspired by your favourite movies, shows, games and more.",
    materials: "Stainless Steel · Brass · Copper · Mild Steel",
    accent: "#FFD700",
    image: `${CLD}/IMG_4831_gwwcmr.jpg`,
    gallery: [
      `${CLD}/IMG_4831_gwwcmr.jpg`,
    ],
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
function GalleryModal({ product, onClose }) {
  const [current, setCurrent] = useState(0);
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
          <img src={gallery[current]} alt={`Custom metal ${product.name.toLowerCase()} by Ferrous Wheel, Bangalore`} />
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
              <img key={i} src={img} alt="" loading="lazy" className={`thumb ${i === current ? "active" : ""}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
        )}
        <div className="modal-footer">
          <p className="modal-materials">{product.materials}</p>
          <a href={WA(`Hi Ferrous Wheel! I'd love to customize one of your ${product.name.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="btn-primary">
            💬 CUSTOMIZE THIS
          </a>
        </div>
      </div>
    </div>
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
        <img src={LOGO} alt="Ferrous Wheel" style={{ height: "40px", width: "auto" }} />
      </div>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        {["products", "about", "order", "contact"].map((s) => (
          <button key={s} className={`nav-link ${activeSection === s ? "active" : ""}`} onClick={() => scrollTo(s)}>
            {s.toUpperCase()}
          </button>
        ))}
        <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="nav-cta">ORDER NOW</a>
      </div>
      <button className="hamburger" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
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
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="btn-primary">ORDER ON WHATSAPP</a>
          <button className="btn-secondary" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>SEE PRODUCTS ↓</button>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">8+</span><span className="stat-label">Product Types</span></div>
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
function ProductCard({ product, onClick, index }) {
  return (
    <div className="product-card reveal" style={{ "--accent": product.accent, "--reveal-delay": `${index * 0.07}s` }} onClick={onClick}>
      <div className="card-number">0{product.id}</div>
      <div className="card-image-wrap">
        <img src={product.image} alt={`Custom metal ${product.name.toLowerCase()} by Ferrous Wheel, Bangalore`} loading="lazy" className="card-image" />
        <div className="card-image-overlay">
          <span>VIEW GALLERY →</span>
        </div>
      </div>
      <h3 className="card-name">{product.name}</h3>
      <p className="card-tagline">"{product.tagline}"</p>
      <p className="card-desc">{product.description}</p>
      <div className="card-materials">{product.materials}</div>
      <div className="card-cta">CUSTOMIZE THIS →</div>
      <div className="card-glow" />
    </div>
  );
}
function LaserCutShowcase() {
  const procRef = useRef(null);
  const sparkRef = useRef(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const procCanvas = procRef.current;
    const sparkCanvas = sparkRef.current;
    const wrap = wrapRef.current;
    if (!procCanvas || !sparkCanvas || !wrap) return;
    const procCtx = procCanvas.getContext("2d");
    const sparkCtx = sparkCanvas.getContext("2d");
    const W = 600, H = 700;
    const RAD = Math.PI / 180;
    // ---- Build a bookmark outline (rounded top, swallowtail bottom) + hang hole ----
    const outline = [];
    const pushLine = (x0, y0, x1, y1) => {
      const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / 3));
      for (let i = 1; i <= n; i++) outline.push({ x: x0 + (x1 - x0) * (i / n), y: y0 + (y1 - y0) * (i / n) });
    };
    const pushArc = (cx, cy, r, a0, a1) => {
      const n = 12;
      for (let i = 1; i <= n; i++) { const a = a0 + (a1 - a0) * (i / n); outline.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }); }
    };
    const L = 220, R = 380, T = 120, B = 560, CR = 26, NOTCH = 300, NY = 516;
    outline.push({ x: L + CR, y: T });
    pushLine(L + CR, T, R - CR, T);              // top edge
    pushArc(R - CR, T + CR, CR, -90 * RAD, 0);   // top-right corner
    pushLine(R, T + CR, R, B);                    // right edge
    pushLine(R, B, NOTCH, NY);                    // swallowtail right
    pushLine(NOTCH, NY, L, B);                     // swallowtail left
    pushLine(L, B, L, T + CR);                     // left edge
    pushArc(L + CR, T + CR, CR, 180 * RAD, 270 * RAD); // top-left corner
    const HX = 300, HY = 170, HR = 14;
    const hole = [];
    for (let i = 0; i <= 30; i++) { const a = (i / 30) * 2 * Math.PI; hole.push({ x: HX + HR * Math.cos(a), y: HY + HR * Math.sin(a) }); }
    let cuttingPoints = [];
    outline.forEach((p, i) => cuttingPoints.push({ x: p.x, y: p.y, move: i === 0 }));
    hole.forEach((p, i) => cuttingPoints.push({ x: p.x, y: p.y, move: i === 0 }));
    const pathOutline = (ctx) => {
      ctx.beginPath();
      ctx.moveTo(outline[0].x, outline[0].y);
      for (let i = 1; i < outline.length; i++) ctx.lineTo(outline[i].x, outline[i].y);
      ctx.closePath();
    };
    let sparks = [];
    let smoke = [];
    let hotTrail = [];
    let currentIndex = 0;
    let isCutting = false;
    let cutDone = false;
    let visible = false;
    let destroyed = false;
    let rafId = null;
    let restartTimer = null;
    let mode = "auto"; // "auto" demo cut, or "manual" follow-the-cursor
    let leaveTimer = null;
    const pointer = { x: 0, y: 0, prevX: null, prevY: null, active: false };
    function drawMetalPlate() {
      procCtx.clearRect(0, 0, W, H);
      const g = procCtx.createLinearGradient(0, 30, 0, H - 30);
      g.addColorStop(0, "#41464a"); g.addColorStop(0.5, "#2f3437"); g.addColorStop(1, "#23282b");
      procCtx.fillStyle = g;
      procCtx.fillRect(30, 30, W - 60, H - 60);
      procCtx.strokeStyle = "rgba(255,255,255,0.035)"; procCtx.lineWidth = 1;
      for (let y = 34; y < H - 30; y += 3) { procCtx.beginPath(); procCtx.moveTo(30, y); procCtx.lineTo(W - 30, y); procCtx.stroke(); }
      procCtx.strokeStyle = "rgba(0,0,0,0.10)";
      for (let y = 36; y < H - 30; y += 6) { procCtx.beginPath(); procCtx.moveTo(30, y + 0.5); procCtx.lineTo(W - 30, y + 0.5); procCtx.stroke(); }
      procCtx.save();
      procCtx.globalCompositeOperation = "lighter";
      const hg = procCtx.createLinearGradient(30, 30, W - 30, H - 30);
      hg.addColorStop(0, "rgba(255,255,255,0.06)"); hg.addColorStop(0.4, "rgba(255,255,255,0)");
      procCtx.fillStyle = hg; procCtx.fillRect(30, 30, W - 60, H - 60);
      procCtx.restore();
      const vg = procCtx.createRadialGradient(W / 2, H / 2, 150, W / 2, H / 2, 430);
      vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,0.45)");
      procCtx.fillStyle = vg; procCtx.fillRect(30, 30, W - 60, H - 60);
      procCtx.strokeStyle = "rgba(0,0,0,0.5)"; procCtx.lineWidth = 2; procCtx.strokeRect(30, 30, W - 60, H - 60);
    }
    function carveSeg(x0, y0, x1, y1) {
      // scorched rim first (wider), then cut the void (narrower) on top
      procCtx.save();
      procCtx.strokeStyle = "rgba(28,16,10,0.6)"; procCtx.lineWidth = 8; procCtx.lineCap = "round";
      procCtx.beginPath(); procCtx.moveTo(x0, y0); procCtx.lineTo(x1, y1); procCtx.stroke();
      procCtx.restore();
      procCtx.save();
      procCtx.globalCompositeOperation = "destination-out"; procCtx.lineWidth = 4; procCtx.lineCap = "round";
      procCtx.beginPath(); procCtx.moveTo(x0, y0); procCtx.lineTo(x1, y1); procCtx.stroke();
      procCtx.restore();
      hotTrail.push({ x: x1, y: y1, heat: 1 });
    }
    function carveStep(i) {
      const pt = cuttingPoints[i];
      if (pt.move) return; // pen-up travel between subpaths
      const prev = cuttingPoints[i - 1];
      carveSeg(prev.x, prev.y, pt.x, pt.y);
    }
    function Spark(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.x = x; this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 1.5; // slight upward burst, gravity pulls down
      this.alpha = 1;
      const c = Math.random();
      this.color = c > 0.6 ? "#fff7e0" : c > 0.3 ? "#ffd24a" : c > 0.12 ? "#ff8a1e" : "#ff5a00";
      this.size = Math.random() * 1.6 + 0.8;
    }
    function Smoke(x, y) {
      this.x = x + (Math.random() - 0.5) * 10; this.y = y;
      this.vx = (Math.random() - 0.5) * 0.4; this.vy = -(0.4 + Math.random() * 0.6);
      this.r = 5 + Math.random() * 6; this.alpha = 0.16;
    }
    function drawSmoke() {
      for (let i = smoke.length - 1; i >= 0; i--) {
        const s = smoke[i];
        s.x += s.vx; s.y += s.vy; s.r += 0.4; s.alpha -= 0.0035;
        if (s.alpha <= 0) { smoke.splice(i, 1); continue; }
        sparkCtx.save();
        const g = sparkCtx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, `rgba(60,60,60,${s.alpha})`); g.addColorStop(1, "rgba(60,60,60,0)");
        sparkCtx.fillStyle = g; sparkCtx.beginPath(); sparkCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2); sparkCtx.fill();
        sparkCtx.restore();
      }
    }
    function drawHotTrail() {
      sparkCtx.save();
      sparkCtx.globalCompositeOperation = "lighter";
      for (const h of hotTrail) {
        const g = sparkCtx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 9);
        if (h.heat > 0.7) { g.addColorStop(0, `rgba(255,255,235,${h.heat})`); g.addColorStop(0.4, `rgba(255,205,95,${h.heat * 0.8})`); }
        else { g.addColorStop(0, `rgba(255,150,40,${h.heat})`); g.addColorStop(0.4, `rgba(255,90,20,${h.heat * 0.7})`); }
        g.addColorStop(1, "rgba(255,60,0,0)");
        sparkCtx.fillStyle = g; sparkCtx.beginPath(); sparkCtx.arc(h.x, h.y, 9, 0, Math.PI * 2); sparkCtx.fill();
      }
      sparkCtx.restore();
    }
    function drawSparks() {
      sparkCtx.save();
      sparkCtx.globalCompositeOperation = "lighter";
      sparkCtx.lineCap = "round";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.vy += 0.2; s.x += s.vx; s.y += s.vy; s.alpha -= 0.018;
        if (s.alpha <= 0) { sparks.splice(i, 1); continue; }
        sparkCtx.globalAlpha = Math.max(0, s.alpha);
        sparkCtx.strokeStyle = s.color;
        sparkCtx.shadowBlur = 6; sparkCtx.shadowColor = s.color;
        sparkCtx.lineWidth = s.size;
        sparkCtx.beginPath();
        sparkCtx.moveTo(s.x, s.y);
        sparkCtx.lineTo(s.x - s.vx * 1.8, s.y - s.vy * 1.8);
        sparkCtx.stroke();
      }
      sparkCtx.restore();
    }
    function drawLaser(lx, ly) {
      sparkCtx.save();
      sparkCtx.globalCompositeOperation = "lighter";
      // focused beam from above
      const beam = sparkCtx.createLinearGradient(lx, 30, lx, ly);
      beam.addColorStop(0, "rgba(255,180,90,0)");
      beam.addColorStop(0.85, "rgba(255,200,110,0.10)");
      beam.addColorStop(1, "rgba(255,235,170,0.45)");
      sparkCtx.fillStyle = beam;
      sparkCtx.fillRect(lx - 2, 30, 4, ly - 30);
      // molten focal bloom
      const bloom = sparkCtx.createRadialGradient(lx, ly, 0, lx, ly, 24);
      bloom.addColorStop(0, "rgba(255,255,255,0.95)");
      bloom.addColorStop(0.22, "rgba(255,225,130,0.85)");
      bloom.addColorStop(0.55, "rgba(255,110,30,0.4)");
      bloom.addColorStop(1, "rgba(255,60,0,0)");
      sparkCtx.fillStyle = bloom;
      sparkCtx.beginPath(); sparkCtx.arc(lx, ly, 24, 0, Math.PI * 2); sparkCtx.fill();
      sparkCtx.restore();
      // nozzle head tracking horizontally at the top
      sparkCtx.save();
      sparkCtx.fillStyle = "#1c1f22";
      sparkCtx.strokeStyle = "#3a4044";
      sparkCtx.lineWidth = 2;
      sparkCtx.beginPath();
      sparkCtx.moveTo(lx - 16, 16); sparkCtx.lineTo(lx + 16, 16);
      sparkCtx.lineTo(lx + 7, 40); sparkCtx.lineTo(lx - 7, 40);
      sparkCtx.closePath(); sparkCtx.fill(); sparkCtx.stroke();
      sparkCtx.fillStyle = "rgba(255,210,120,0.9)";
      sparkCtx.beginPath(); sparkCtx.arc(lx, 42, 2.6, 0, Math.PI * 2); sparkCtx.fill();
      sparkCtx.restore();
    }
    function drawFinishedBookmark() {
      procCtx.clearRect(0, 0, W, H);
      procCtx.save();
      procCtx.shadowColor = "rgba(0,0,0,0.5)"; procCtx.shadowBlur = 24; procCtx.shadowOffsetY = 14;
      pathOutline(procCtx);
      const g = procCtx.createLinearGradient(L, T, R, B);
      g.addColorStop(0, "#c2c7c9"); g.addColorStop(0.45, "#eef2f3"); g.addColorStop(0.52, "#dbe1e2"); g.addColorStop(1, "#969d9f");
      procCtx.fillStyle = g;
      procCtx.fill();
      procCtx.restore();
      // inner bevel + specular streak (clipped to the shape)
      procCtx.save();
      pathOutline(procCtx); procCtx.clip();
      procCtx.strokeStyle = "rgba(255,255,255,0.5)"; procCtx.lineWidth = 3; pathOutline(procCtx); procCtx.stroke();
      procCtx.globalAlpha = 0.16; procCtx.fillStyle = "#ffffff"; procCtx.fillRect(L + 28, T, 16, B - T + 40);
      procCtx.restore();
      // punch the hang hole
      procCtx.save();
      procCtx.globalCompositeOperation = "destination-out";
      procCtx.beginPath(); procCtx.arc(HX, HY, HR, 0, Math.PI * 2); procCtx.fill();
      procCtx.restore();
    }
    function stopFrame() { if (rafId) { cancelAnimationFrame(rafId); rafId = null; } }
    function frame() {
      rafId = requestAnimationFrame(frame);
      let tipX = HX, tipY = 350, cutting = false;
      if (mode === "auto") {
        if (isCutting) {
          for (let step = 0; step < 2; step++) {
            if (currentIndex >= cuttingPoints.length) { isCutting = false; cutDone = true; break; }
            carveStep(currentIndex);
            currentIndex++;
          }
        }
        const idx = Math.min(currentIndex, cuttingPoints.length - 1);
        const pt = cuttingPoints[idx] || { x: HX, y: 350 };
        tipX = pt.x; tipY = pt.y;
        cutting = isCutting && !pt.move;
      } else {
        // manual: laser follows the cursor and cuts where it moves
        if (pointer.active) {
          tipX = pointer.x; tipY = pointer.y; cutting = true;
          if (pointer.prevX != null) {
            const d = Math.hypot(tipX - pointer.prevX, tipY - pointer.prevY);
            if (d > 0.5 && d < 140) carveSeg(pointer.prevX, pointer.prevY, tipX, tipY);
          }
          pointer.prevX = tipX; pointer.prevY = tipY;
        }
      }
      // cool the molten trail
      for (const h of hotTrail) h.heat *= 0.9;
      hotTrail = hotTrail.filter((h) => h.heat > 0.06);
      if (cutting) {
        for (let i = 0; i < 7; i++) sparks.push(new Spark(tipX, tipY));
        if (Math.random() < 0.4) smoke.push(new Smoke(tipX, tipY));
      }
      sparkCtx.clearRect(0, 0, W, H);
      drawSmoke();
      drawHotTrail();
      drawSparks();
      if (cutting) drawLaser(tipX, tipY);
      if (mode === "auto" && cutDone && sparks.length === 0 && hotTrail.length === 0 && smoke.length === 0) {
        stopFrame();
        drawFinishedBookmark();
        sparkCtx.clearRect(0, 0, W, H);
        restartTimer = setTimeout(() => { if (!destroyed && visible) startCut(); }, 2400);
      }
    }
    function startCut() {
      stopFrame();
      if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
      mode = "auto";
      currentIndex = 0;
      cutDone = false;
      sparks = []; smoke = []; hotTrail = [];
      pointer.prevX = null; pointer.prevY = null;
      sparkCtx.clearRect(0, 0, W, H);
      drawMetalPlate();
      isCutting = true;
      frame();
    }
    function toCanvas(clientX, clientY) {
      const r = sparkCanvas.getBoundingClientRect();
      return { x: ((clientX - r.left) / r.width) * W, y: ((clientY - r.top) / r.height) * H };
    }
    function onPointerMove(e) {
      if (e.pointerType && e.pointerType !== "mouse") return; // touch scrolls the page; manual cut is mouse-only
      const p = toCanvas(e.clientX, e.clientY);
      if (mode !== "manual") {
        mode = "manual";
        isCutting = false;
        if (cutDone) { drawMetalPlate(); cutDone = false; } // fresh sheet to draw on
        if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
        pointer.prevX = null; pointer.prevY = null;
      }
      if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null; }
      pointer.x = p.x; pointer.y = p.y; pointer.active = true;
      if (!rafId) frame();
    }
    function onPointerLeave() {
      pointer.active = false; pointer.prevX = null; pointer.prevY = null;
      if (leaveTimer) clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => { if (!destroyed && visible) startCut(); }, 1600);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawFinishedBookmark();
      return () => {};
    }
    drawMetalPlate();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible) {
          startCut();
        } else {
          isCutting = false;
          cutDone = false;
          stopFrame();
          if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
        }
      });
    }, { threshold: 0.25 });
    io.observe(wrap);
    sparkCanvas.addEventListener("pointermove", onPointerMove);
    sparkCanvas.addEventListener("pointerdown", onPointerMove);
    sparkCanvas.addEventListener("pointerleave", onPointerLeave);
    return () => {
      destroyed = true;
      io.disconnect();
      stopFrame();
      if (restartTimer) clearTimeout(restartTimer);
      if (leaveTimer) clearTimeout(leaveTimer);
      sparkCanvas.removeEventListener("pointermove", onPointerMove);
      sparkCanvas.removeEventListener("pointerdown", onPointerMove);
      sparkCanvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);
  return (
    <div className="laser-showcase reveal" ref={wrapRef}>
      <div className="lc-copy">
        <span className="section-tag">PRECISION CRAFT</span>
        <h3 className="lc-title">CUT FROM<br /><span className="outline-text">SOLID METAL</span></h3>
        <p className="lc-sub">Watch the laser cut a bookmark from solid steel — or <strong>move your cursor over the sheet</strong> to grab the laser and cut it yourself.</p>
      </div>
      <div className="lc-canvas-wrap">
        <canvas ref={procRef} width="600" height="700" className="lc-canvas" />
        <canvas ref={sparkRef} width="600" height="700" className="lc-canvas lc-canvas-top" />
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
      <LaserCutShowcase />
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
          <p className="about-para">Ferrous Wheel was born in Bommasandra, Bangalore — a workshop where sparks fly and ideas take shape in metal. Run by Yousuf and his sister, every piece is designed with love, cut with precision, and shipped with pride.</p>
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
              <h4>{step.title}</h4>
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
function Footer() {
  return (
    <footer className="footer">
      <img src={LOGO} alt="Ferrous Wheel" style={{ height: "50px", width: "auto", marginBottom: "12px" }} />
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
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);
  return (
    <div className="fw-app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --red: #E63946; --orange: #FF6B35; --black: #0A0A0A; --dark: #111111;
          --card-bg: #161616; --border: rgba(255,255,255,0.07); --text: #F0F0F0; --muted: #888;
          --font-display: 'Bebas Neue', sans-serif; --font-body: 'Barlow', sans-serif; --font-cond: 'Barlow Condensed', sans-serif;
        }
        .fw-app { background: var(--black); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
        .navbar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 12px 40px; background: rgba(10,10,10,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); }
        .nav-logo { cursor: pointer; }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { background: none; border: none; color: var(--muted); font-family: var(--font-cond); font-size: 13px; letter-spacing: 2px; cursor: pointer; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: var(--red); }
        .nav-cta { background: var(--red); color: #fff; padding: 8px 20px; font-family: var(--font-cond); font-size: 13px; font-weight: 700; letter-spacing: 2px; text-decoration: none; border-radius: 2px; transition: background 0.2s; }
        .nav-cta:hover { background: #c0303b; }
        .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; }
        .hamburger span { width: 24px; height: 2px; background: var(--text); display: block; }
        .hero { min-height: 100vh; display: flex; align-items: center; padding: 100px 40px 60px; position: relative; overflow: hidden; background: radial-gradient(ellipse at 20% 50%, rgba(230,57,70,0.08) 0%, transparent 60%); }
        .metal-pattern { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.5; }
        .hero-content { flex: 1; max-width: 700px; position: relative; z-index: 2; }
        .hero-badge { font-family: var(--font-cond); font-size: 12px; letter-spacing: 4px; color: var(--red); margin-bottom: 24px; }
        .hero-title { font-family: var(--font-display); line-height: 0.9; margin-bottom: 24px; }
        .hero-line1, .hero-line2, .hero-line3 { display: block; font-size: clamp(72px, 12vw, 140px); color: var(--text); }
        .hero-accent { display: block; font-size: clamp(72px, 12vw, 140px); color: var(--red); }
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
        @keyframes heroIn { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(230,57,70,0.5); } 50% { box-shadow: 0 0 0 6px rgba(230,57,70,0); } }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1); transition-delay: var(--reveal-delay, 0s); will-change: opacity, transform; }
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
          .hero-badge, .hero-line1, .hero-line2, .hero-line3, .hero-accent, .hero-tagline, .hero-actions, .hero-stats, .nav-cta, .floating-icon, .hero-ring { animation: none !important; }
        }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header.left { text-align: left; }
        .section-tag { font-family: var(--font-cond); font-size: 11px; letter-spacing: 4px; color: var(--red); display: block; margin-bottom: 12px; }
        .section-title { font-family: var(--font-display); font-size: clamp(48px, 8vw, 90px); line-height: 0.95; color: var(--text); }
        .outline-text { -webkit-text-stroke: 1px var(--red); color: transparent; }
        .section-sub { color: var(--muted); font-size: 15px; margin-top: 16px; }
        .products { padding: 100px 40px; }
        .laser-showcase { display: flex; align-items: center; gap: 56px; max-width: 900px; margin: 0 auto 72px; flex-wrap: wrap; justify-content: center; }
        .lc-canvas-wrap { position: relative; width: 320px; height: 373px; flex-shrink: 0; background: radial-gradient(circle at 50% 45%, #1a1c1e 0%, #0c0d0e 100%); border: 1px solid var(--border); border-radius: 8px; box-shadow: inset 0 0 50px rgba(0,0,0,0.7), 0 16px 40px rgba(0,0,0,0.5); overflow: hidden; }
        .lc-canvas { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .lc-canvas-top { cursor: crosshair; touch-action: pan-y; }
        .lc-copy { max-width: 340px; }
        .lc-title { font-family: var(--font-display); font-size: clamp(40px, 6vw, 60px); line-height: 0.95; color: var(--text); margin: 8px 0 14px; }
        .lc-sub { color: var(--muted); font-size: 14px; line-height: 1.7; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .product-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 0 0 24px; position: relative; overflow: hidden; transition: all 0.3s; cursor: pointer; }
        .product-card:hover { border-color: var(--accent); transform: translateY(-4px); }
        .product-card:hover .card-image-overlay { opacity: 1; }
        .product-card:hover .card-glow { opacity: 1; }
        .card-image-wrap { position: relative; width: 100%; height: 200px; overflow: hidden; }
        .card-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        .product-card:hover .card-image { transform: scale(1.05); }
        .card-image-overlay { position: absolute; inset: 0; background: rgba(230,57,70,0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; font-family: var(--font-cond); font-size: 14px; letter-spacing: 2px; color: #fff; font-weight: 700; }
        .card-glow { position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: var(--accent); filter: blur(40px); opacity: 0; transition: opacity 0.3s; pointer-events: none; border-radius: 50%; }
        .card-number { font-family: var(--font-display); font-size: 48px; color: rgba(255,255,255,0.04); position: absolute; top: 12px; right: 20px; z-index: 1; }
        .card-name { font-family: var(--font-display); font-size: 32px; color: var(--text); margin: 16px 24px 4px; }
        .card-tagline { font-size: 12px; color: var(--accent); font-style: italic; margin: 0 24px 12px; }
        .card-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin: 0 24px 16px; }
        .card-materials { font-family: var(--font-cond); font-size: 10px; letter-spacing: 2px; color: rgba(255,255,255,0.3); margin: 0 24px 20px; }
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
        .modal-footer { padding: 16px 24px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border-top: 1px solid var(--border); margin-top: 8px; }
        .modal-materials { font-family: var(--font-cond); font-size: 11px; letter-spacing: 2px; color: var(--muted); }
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
        .how-to-order { padding: 100px 40px; }
        .steps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin-bottom: 60px; }
        .step-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 24px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.2s; }
        .step-card:hover { border-color: rgba(230,57,70,0.4); }
        .step-num { font-family: var(--font-display); font-size: 40px; color: var(--red); opacity: 0.6; }
        .step-content h4 { font-family: var(--font-cond); font-size: 18px; letter-spacing: 1px; color: var(--text); margin-bottom: 6px; }
        .step-content p { font-size: 13px; color: var(--muted); line-height: 1.6; }
        .order-cta-box { text-align: center; border: 1px solid var(--border); border-radius: 4px; padding: 48px; background: rgba(230,57,70,0.04); }
        .order-cta-box p { color: var(--muted); font-size: 16px; margin-bottom: 24px; }
        .contact { padding: 100px 40px; position: relative; background: rgba(255,255,255,0.01); }
        .contact-content { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .contact-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 4px; padding: 24px; display: flex; flex-direction: column; gap: 6px; text-decoration: none; transition: all 0.2s; }
        .contact-card:hover { border-color: var(--red); transform: translateY(-2px); }
        .contact-icon { font-size: 24px; }
        .contact-label { font-family: var(--font-cond); font-size: 10px; letter-spacing: 3px; color: var(--red); }
        .contact-value { font-size: 13px; color: var(--text); }
        .footer { padding: 40px; border-top: 1px solid var(--border); text-align: center; display: flex; flex-direction: column; align-items: center; }
        .footer-tagline { font-size: 13px; color: var(--muted); font-style: italic; margin-bottom: 8px; }
        .footer-copy { font-size: 11px; color: rgba(255,255,255,0.2); font-family: var(--font-cond); letter-spacing: 2px; }
        @media (max-width: 900px) {
          .navbar { padding: 12px 24px; }
          .nav-links { display: none; flex-direction: column; position: fixed; inset: 0; background: var(--black); align-items: center; justify-content: center; gap: 32px; }
          .nav-links.open { display: flex; }
          .hamburger { display: flex; z-index: 101; }
          .hero { flex-direction: column; padding: 100px 24px 60px; gap: 40px; }
          .hero-visual { width: 100%; }
          .about-content, .contact-content { grid-template-columns: 1fr; gap: 40px; }
          .products, .about, .how-to-order, .contact { padding: 60px 24px; }
          .modal-main-image { height: 260px; }
        }
        @media (max-width: 600px) {
          .contact-cards { grid-template-columns: 1fr; }
          .hero-actions { flex-direction: column; }
          .modal-footer { flex-direction: column; align-items: flex-start; }
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
