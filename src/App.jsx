import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Music, Zap, Flame, Star, Sparkles, Wind,
  PartyPopper, CheckCircle2, Users, HelpCircle, ArrowRight,
  Image as ImageIcon, Send, Menu, X, Camera, Play, ChevronDown, ArrowUp
} from 'lucide-react';

const BubbleBackground = () => {
  const bubbles = React.useMemo(() => [...Array(40)].map((_, i) => ({
    id: i,
    size: Math.random() * 50 + 15,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
    color: i % 3 === 0 ? 'var(--royal-purple)' : i % 3 === 1 ? 'var(--primary-gold)' : 'var(--vibrant-pink)',
    wobble: Math.random() * 100 - 50,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: '-10%',
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), ${b.color})`,
            boxShadow: `0 0 20px ${b.color}66`,
            border: '1px solid rgba(255,255,255,0.3)',
            backdropFilter: 'blur(2px)',
          }}
          animate={{
            y: [0, -1100], 
            x: [0, b.wobble, 0],
            opacity: [0, b.opacity, 0],
            scale: [0.7, 1.1, 0.7],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear"
          }}
        />
      ))}
      
      {/* Central Pulsing Glow to maintain depth */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ 
          background: [
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  React.useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const handlePointer = () => setIsPointer(true);
    const handleNormal = () => setIsPointer(false);

    window.addEventListener('mousemove', handleMove);
    document.querySelectorAll('a, button, .faq-item').forEach(el => {
      el.addEventListener('mouseenter', handlePointer);
      el.addEventListener('mouseleave', handleNormal);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: position.x - 10,
        y: position.y - 10,
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? 'rgba(251,191,36,0.3)' : 'rgba(139,92,246,0.5)',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    />
  );
};

const App = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', event: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          
          <BubbleBackground />
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

      {/* ─────────────── STATS ─────────────── */}
      <section className="section-padding" style={{ background: 'var(--alt-bg)', paddingTop: 0 }}>
        <div className="stats-grid">
          {[
            { label: 'Successful Events', value: '500+', icon: <PartyPopper size={32} /> },
            { label: 'Years Experience', value: '10+', icon: <Users size={32} /> },
            { label: 'Happy Clients', value: '100%', icon: <Star size={32} /> },
            { label: 'Expert Staff', value: '10+', icon: <CheckCircle2 size={32} /> },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card stat-card"
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3 className="royal-gradient" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{stat.value}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.label}</p>
            </motion.div>
          ))}
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

      {/* ─────────────── TESTIMONIALS ─────────────── */}
      <section className="section-padding">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge">Testimonials</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
            What Our <span className="royal-gradient">Clients Say</span>
          </h2>
        </div>
        
        <div className="testimonials-grid">
          {[
            { name: 'Ramesh Patel', role: 'Wedding Client', text: 'Radhe DJ made our wedding magical! The sound quality was top-notch and the pyro effects were breathtaking.' },
            { name: 'Raj Bhalodiya', role: 'Birthday Party', text: 'Unbelievable energy! They kept the crowd dancing for 6 hours straight. Highly recommended for any event.' },
            { name: 'Harsh Ramani', role: 'Corporate Event', text: 'Professional crew and amazing lighting. They handled everything perfectly from start to finish.' },
          ].map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="glass-card testimonial-card"
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.2rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: '#cbd5e1', marginBottom: '2rem', lineHeight: 1.8 }}>"{t.text}"</p>
              <div>
                <h4 style={{ fontWeight: 800, color: '#fff' }}>{t.name}</h4>
                <p style={{ color: '#8b5cf6', fontSize: '0.8rem', fontWeight: 700 }}>{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── FAQ ─────────────── */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="badge">FAQ</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>
              Common <span className="royal-gradient">Inquiries</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i} 
                  className={`glass-card faq-item ${isOpen ? 'active' : ''}`} 
                  style={{ padding: '0', cursor: 'pointer' }}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                >
                  <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                      <HelpCircle style={{ color: isOpen ? '#fbbf24' : '#64748b', transition: 'color 0.3s' }} size={24} />
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: isOpen ? '#fff' : '#cbd5e1' }}>{faq.q}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: isOpen ? '#fbbf24' : '#64748b' }}
                    >
                      <ChevronDown size={22} />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 32px 32px 74px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '0.95rem' }}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
              <a href="https://www.instagram.com/radhe_dj_official?igsh=MXhndmw4MjAxcG9iNA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://youtu.be/8VJOp63Ac6o?si=vFoGOL-w6rRi65iH" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
              <a href="https://wa.me/919624047940" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
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

      {/* ─────────────── FLOATING ACTIONS ─────────────── */}
      <div className="floating-actions">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 20 }}
              onClick={scrollToTop}
              className="float-btn float-top"
              aria-label="Back to top"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
        
        <a 
          href="https://wa.me/919624047940" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="float-btn float-whatsapp"
          aria-label="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
};

export default App;
