import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Music, Zap, Flame, Star, Sparkles, Wind,
  PartyPopper, CheckCircle2, Users, HelpCircle, ArrowRight,
  Image as ImageIcon, Send, Menu, X, Camera, Play
} from 'lucide-react';

const App = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', event: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Contact form → sends email to ckkardani1@gmail.com
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Event Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEvent: ${formData.event}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:ckkardani1@gmail.com?subject=${subject}&body=${body}`;
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    { title: 'Exclusive DJ', icon: <Music size={36} />, desc: 'High-end sound systems and professional mixing for all events.' },
    { title: 'Cold Pyro Fire', icon: <Flame size={36} />, desc: 'Breathtaking cold spark fountains for grand entrances.' },
    { title: 'Hand Cold Pyro', icon: <Flame size={36} />, desc: 'Safe and spectacular hand-held pyro effects.' },
    { title: 'Paper Blast', icon: <PartyPopper size={36} />, desc: 'Colorful confetti blasts to celebrate your special moments.' },
    { title: 'Ribbon Blast', icon: <Star size={36} />, desc: 'Elegant ribbon displays for a festive atmosphere.' },
    { title: 'Balloon Blast Entry', icon: <Sparkles size={36} />, desc: 'Grand balloon explosions for dramatic entries.' },
    { title: 'Matka Smoke', icon: <Wind size={36} />, desc: 'Low-lying fog effects for a dreamy stage presence.' },
    { title: 'Pro Lighting', icon: <Zap size={36} />, desc: 'Intelligent stage lighting and ambient decor lights.' },
    { title: 'Experience Crew', icon: <Users size={36} />, desc: 'Dedicated team to manage every detail of your event.' },
  ];

  const packages = [
    {
      name: 'Silver Package', level: 'Essential',
      features: ['Professional DJ', 'Standard Sound System', 'Basic Lighting', '2 Cold Pyro Fountains', '4 Hours Service'],
    },
    {
      name: 'Gold Package', level: 'Most Popular',
      features: ['Professional DJ & MC', 'Premium Sound System', 'Moving Head Lights', '4 Cold Pyro Fountains', 'Paper Blast', '6 Hours Service'],
      featured: true,
    },
    {
      name: 'Diamond Package', level: 'Grand Celebration',
      features: ['Master DJ Team', 'Line Array Sound System', 'Full Stage Lighting', 'Hand Pyro & Matka Smoke', 'Ribbon Blast', 'Unlimited Service'],
    },
  ];

  const faqs = [
    { q: 'How early should we book?', a: 'We recommend booking at least 2–3 months before your event to guarantee availability.' },
    { q: 'Do you travel for events?', a: 'Yes! Radhe DJ & Event provides services across all major cities in Gujarat.' },
    { q: 'Can we customize the lighting?', a: 'Absolutely — we can match lighting colors and effects to your exact wedding theme.' },
  ];

  return (
    <div className="min-h-screen">

      {/* ─────────────── NAVIGATION ─────────────── */}
      <nav>
        {/* Logo */}
        <div style={{ width: '160px', height: '64px', flexShrink: 0 }}>
          <img
            src="/radhelogo.png"
            alt="Radhe DJ Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        {/* Desktop links */}
        <div className="nav-links">
          {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>

        {/* Desktop CTA */}
        <a href="tel:9624047940" className="btn-royal nav-cta">
          <Phone size={16} /> Book Now
        </a>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="tel:9624047940" className="btn-royal" style={{ justifyContent: 'center', marginTop: '1rem' }}>
              <Phone size={16} /> Call Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────── HERO ─────────────── */}
      <section id="home" className="hero-section">
        <div className="hero-glow" />

        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.15, filter: 'blur(12px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?auto=format&fit=crop&q=80&w=2000"
            alt="DJ Event"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.28 }}
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="badge"
          >
            ✦ The Ultimate Party Experience ✦
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
            className="playfair hero-title"
          >
            RADHE <span className="purple-gradient">DJ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="hero-sub"
          >
            ✦ &nbsp; Professional Event Management &nbsp; ✦
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="hero-btns"
          >
            <a href="#services" className="btn-royal">
              Explore Our World <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-glass">
              Request Quote
            </a>
          </motion.div>
        </div>

        <div className="scroll-line" />
      </section>

      {/* ─────────────── ABOUT ─────────────── */}
      <section id="about" className="section-padding">
        <div className="about-grid">
          <div className="about-img-wrap">
            <div className="about-img-frame">
              <img
                src="/truck.png"
                alt="Radhe DJ Truck"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/djevent/1200/800'; }}
              />
            </div>
            <div className="about-badge-float glass-card">
              <h4 className="royal-gradient" style={{ fontSize: '2.6rem', fontWeight: '900', lineHeight: 1 }}>10+</h4>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '8px' }}>Years Experience</p>
            </div>
          </div>

          <div>
            <div className="badge">About Us</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Experience the Best <span className="royal-gradient">Sound &amp; Lights</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 2 }}>
              Radhe DJ &amp; Event is the most trusted name in Keshod for professional event entertainment.
              Our team creates unforgettable atmospheres using international-grade sound systems and safe,
              high-impact special effects.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['High-Quality Audio Engineering', 'Safe Indoor/Outdoor Pyro Shows', 'Professional Stage Management'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.12)', borderRadius: '12px' }}>
                  <CheckCircle2 size={18} style={{ color: '#fbbf24', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── SERVICES ─────────────── */}
      <section id="services" className="section-padding" style={{ background: '#070b1d' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge">Specialties</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', marginBottom: '1.2rem' }}>
            Our Signature <span className="royal-gradient">Services</span>
          </h2>
          <div style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg,#8b5cf6,#fbbf24)', margin: '0 auto', borderRadius: '100px' }} />
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -8 }} className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ color: '#fbbf24', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.9rem', fontWeight: 700 }}>{s.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.8 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── GALLERY ─────────────── */}
      <section id="gallery" className="section-padding">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge">Moments</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
            Event <span className="royal-gradient">Gallery</span>
          </h2>
        </div>
        <div className="gallery-grid">
          {[
            { url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', seed: 'djtruck', },
            { url: 'https://5.imimg.com/data5/SELLER/Default/2023/3/294551927/PD/MX/NC/24504299/iron-front-truss.jpg', seed: 'pyrofire', },
            { url: 'https://5.imimg.com/data5/PR/OS/IK/SELLER-82523699/aluminium-lighting-truss.jpg', seed: 'partyvibe', },
            { url: 'https://static.wixstatic.com/media/b1f310_498859c2e0904a238c896d55ed467632~mv2.jpeg/v1/fill/w_600,h_600,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/b1f310_498859c2e0904a238c896d55ed467632~mv2.jpeg', seed: 'djbooth', },
            { url: 'https://5.imimg.com/data5/ANDROID/Default/2024/1/378120873/RF/TM/KT/163873875/product-jpeg-500x500.jpg', seed: 'stagelights', },
            { url: 'https://floriwish.in/wp-content/uploads/2025/05/rose-petal-blast-service.jpg', seed: 'celebrate', },
          ].map((img, i) => (
            <div key={i} className="gallery-card">
              <img
                src={img.url}
                alt={img.title}
                onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${img.seed}/800/600`; }}
              />
              <div className="gallery-overlay">
                <div>
                  <ImageIcon style={{ color: '#fbbf24', marginBottom: '8px' }} size={26} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{img.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── PACKAGES ─────────────── */}
      <section className="section-padding" style={{ background: '#070b1d' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge">Booking Options</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', marginBottom: '1.2rem' }}>
            Popular <span className="royal-gradient">Packages</span>
          </h2>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, i) => (
            <div key={i} className={`glass-card package-card ${pkg.featured ? 'featured' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
              {pkg.featured && (
                <span style={{ background: 'linear-gradient(135deg,#fbbf24,#d97706)', color: '#000', fontSize: '0.62rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', display: 'inline-block', marginBottom: '1.2rem', alignSelf: 'flex-start' }}>
                  ⭐ Most Popular
                </span>
              )}
              <h4 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px', color: pkg.featured ? '#fbbf24' : '#fff' }}>{pkg.name}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: '1.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{pkg.level}</p>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '2rem' }}>
                {pkg.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={15} style={{ color: '#fbbf24', flexShrink: 0 }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              {/* Direct call to Chintan Patel */}
              <a
                href="tel:9624047940"
                className="btn-royal"
                style={{ justifyContent: 'center', fontSize: '0.78rem', padding: '14px 16px' }}
              >
                <Phone size={15} /> Book This Package
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>
              Common <span className="royal-gradient">Inquiries</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="glass-card" style={{ padding: '28px 32px' }}>
                <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                  <HelpCircle style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} size={24} />
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.6rem', fontWeight: 700 }}>{faq.q}</h4>
                    <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section id="contact" className="section-padding" style={{ background: '#070b1d' }}>
        <div className="contact-grid">
          {/* Left info */}
          <div>
            <div className="badge">Get In Touch</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Let's Plan Your <span className="royal-gradient">Big Day</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              Ready to book or have questions? Contact us directly or fill the form — our team replies quickly!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Address */}
              <div className="contact-info-item">
                <div className="contact-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Visit Us</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>60 feet, D.P. road, Veraval road – Keshod</p>
                </div>
              </div>

              {/* Chintan */}
              <a href="tel:9624047940" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Chintan Patel</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>+91 96240 47940 &nbsp;<span style={{ color: '#fbbf24', fontSize: '0.78rem' }}></span></p>
                  </div>
                </div>
              </a>

              {/* Mehul */}
              <a href="tel:9909505194" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Mehul Patel</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>+91 99095 05194</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:ckkardani1@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Email Us</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>ckkardani1@gmail.com</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right form */}
          <div className="glass-card" style={{ padding: '44px', background: 'rgba(13,21,48,0.9)' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontWeight: 800 }}>Send Inquiry</h3>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <input type="text" name="name" placeholder="Your Name" required onChange={handleInputChange} />
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleInputChange} />
              <input type="text" name="event" placeholder="Event Type (Wedding, Party…)" required onChange={handleInputChange} />
              <textarea name="message" placeholder="Special Requests or Message" rows={5} required onChange={handleInputChange} />
              <button type="submit" className="btn-royal" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                Send via Email &nbsp;<Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer>
        <div className="footer-inner">

          {/* Brand */}
          <div className="footer-brand">
            <div style={{ width: '140px', height: '55px', marginBottom: '1.2rem' }}>
              <img
                src="/radhelogo.png"
                alt="Radhe DJ"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p style={{ color: '#64748b', lineHeight: 1.9, fontSize: '0.9rem', maxWidth: '280px' }}>
              Elevating celebrations with premium sound, mesmerizing lights &amp; spectacular special effects.
              Serving Keshod &amp; all of Gujarat since 2010.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '1.5rem' }}>
              <a href="#" aria-label="Instagram" className="social-icon"><Camera size={18} /></a>
              <a href="#" aria-label="YouTube" className="social-icon"><Play size={18} /></a>
              <a href="tel:9624047940" aria-label="Phone" className="social-icon"><Phone size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="footer-heading">Quick Links</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="footer-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="footer-heading">Services</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Exclusive DJ', 'Cold Pyro Fire', 'Paper Blast', 'Ribbon Blast', 'Pro Lighting', 'Matka Smoke'].map(s => (
                <li key={s}><a href="#services" className="footer-link">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="footer-heading">Contact</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a href="tel:9624047940" className="footer-contact-row">
                <Phone size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>+91 96240 47940</span>
              </a>
              <a href="tel:9909505194" className="footer-contact-row">
                <Phone size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>+91 99095 05194</span>
              </a>
              <a href="mailto:ckkardani1@gmail.com" className="footer-contact-row">
                <Mail size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>ckkardani1@gmail.com</span>
              </a>
              <div className="footer-contact-row" style={{ cursor: 'default' }}>
                <MapPin size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>Keshod, Gujarat</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© 2026 Radhe DJ &amp; Event. All Rights Reserved.</p>
          <p style={{ color: '#a78bfa', fontWeight: 600 }}>Premium Service for Premium People</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
