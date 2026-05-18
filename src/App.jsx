import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Music, Zap, Flame, Star, Sparkles, Wind,
  PartyPopper, CheckCircle2, Users, HelpCircle, ArrowRight,
  Image as ImageIcon, Send, Menu, X, Camera, Play, ChevronDown, ArrowUp,
  Edit, Plus, Trash2, Save, Lock, Check, Upload, Download, Shield, Settings,
  RotateCcw, Eye, LogOut
} from 'lucide-react';
import initialData from './data.json';

// Dynamic Lucide Icon Mapper
const IconMap = {
  Phone, Mail, MapPin, Music, Zap, Flame, Star, Sparkles, Wind,
  PartyPopper, CheckCircle2, Users, HelpCircle, ArrowRight,
  ImageIcon, Send, Menu, X, Camera, Play, ChevronDown, ArrowUp,
  Shield, Settings, Lock
};

const DynamicIcon = ({ name, size = 24, ...props }) => {
  const IconComponent = IconMap[name] || HelpCircle;
  return <IconComponent size={size} {...props} />;
};

const GlowingBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="absolute"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)',
          bottom: '10%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const hexToRgb = (hex) => {
  if (!hex) return "6, 182, 212";
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const compressAndResizeImage = (file, maxWidth = 1200, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to high-performance JPEG Base64 string
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const getVideoEmbedUrl = (url) => {
  if (!url) return '';
  // Check for YouTube
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = url.match(ytRegex);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  // Check for Vimeo
  const vimeoRegex = /(?:vimeo\.com\/)\d+/i;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    const id = vimeoMatch[0].replace('vimeo.com/', '');
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }
  return null;
};

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMove = (e) => {
      const newStar = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
      };
      setTrail(prev => [...prev.slice(-15), newStar]);
    };
    
    const handlePointer = () => setIsPointer(true);
    const handleNormal = () => setIsPointer(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchstart', (e) => handleMove(e.touches[0]));
    window.addEventListener('touchmove', (e) => handleMove(e.touches[0]));
    
    const updatePointers = () => {
      document.querySelectorAll('a, button, .faq-item, .glass-card, .process-card, .admin-interactive').forEach(el => {
        el.addEventListener('mouseenter', handlePointer);
        el.addEventListener('mouseleave', handleNormal);
      });
    };

    updatePointers();
    const observer = new MutationObserver(updatePointers);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {trail.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0, y: star.y + (Math.random() * 40 - 20) }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="cursor-star"
          style={{
            position: 'fixed',
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            pointerEvents: 'none',
            zIndex: 10000000,
            color: 'var(--primary-gold)',
          }}
        >
          <Star size={star.size} fill="currentColor" style={{ transform: `rotate(${star.rotation}deg)` }} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

const App = () => {
  // State for site data loaded dynamically
  const [siteData, setSiteData] = useState(() => {
    const cached = localStorage.getItem('radhe_site_data');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (err) {
        console.error("Error reading radhe_site_data from localStorage", err);
      }
    }
    return initialData;
  });

  const [formData, setFormData] = useState({ name: '', phone: '', event: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Gallery tabs and Media lightbox state
  const [galleryTab, setGalleryTab] = useState('all');
  const [activeMedia, setActiveMedia] = useState(null);

  // Admin Portal states
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    return localStorage.getItem('isAdminSessionActive') === 'true';
  });
  const [isPasscodePromptOpen, setIsPasscodePromptOpen] = useState(false);
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [adminTab, setAdminTab] = useState('hero');
  const [draftData, setDraftData] = useState(() => {
    const isActive = localStorage.getItem('isAdminSessionActive') === 'true';
    if (isActive) {
      const cached = localStorage.getItem('radhe_site_data');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (err) {}
      }
      return JSON.parse(JSON.stringify(initialData));
    }
    return null;
  });
  const [saveStatus, setSaveStatus] = useState(null); // 'saving' | 'success' | 'error'
  const [saveMsg, setSaveMsg] = useState('');

  // Auto-scroll logic
  useEffect(() => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Event Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nEvent: ${formData.event}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
  };

  // Admin portal methods
  const openPasscodePrompt = () => {
    setIsPasscodePromptOpen(true);
    setEnteredPasscode('');
    setPasscodeError('');
  };

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    const correctPass = siteData.adminSettings?.passcode || 'radhe123';
    if (enteredPasscode === correctPass) {
      setIsPasscodePromptOpen(false);
      setIsAdminOpen(true);
      localStorage.setItem('isAdminSessionActive', 'true');
      setDraftData(JSON.parse(JSON.stringify(siteData))); // deep clone for safe drafting
      setPasscodeError('');
    } else {
      setPasscodeError('Incorrect passcode! Please try again.');
    }
  };

  const saveAdminChanges = async () => {
    setSaveStatus('saving');
    setSaveMsg('Saving content...');
    
    // 1. Save to LocalState
    setSiteData(draftData);
    
    // 2. Save to Browser Storage
    localStorage.setItem('radhe_site_data', JSON.stringify(draftData));

    // 3. Save to local Vite dev server file directly
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData, null, 2),
      });

      if (response.ok) {
        setSaveStatus('success');
        setSaveMsg('Changes saved directly to data.json & local storage successfully!');
      } else {
        setSaveStatus('success');
        setSaveMsg('Saved locally in browser storage (Development Server bypassed).');
      }
    } catch (err) {
      console.warn("Could not save to local dev server. Running static host mode. Saved in browser storage.", err);
      setSaveStatus('success');
      setSaveMsg('Saved in local browser storage. Use Download button to get your updated data.json!');
    }

    setTimeout(() => {
      setSaveStatus(null);
    }, 4000);
  };

  const resetToFactoryDefault = () => {
    if (window.confirm("Are you sure you want to reset ALL data back to default settings? All custom edits will be deleted.")) {
      setDraftData(JSON.parse(JSON.stringify(initialData)));
      setSiteData(initialData);
      localStorage.setItem('radhe_site_data', JSON.stringify(initialData));
      alert("Successfully restored factory defaults!");
    }
  };

  const downloadDataJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(draftData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleJsonUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.hero && parsed.about && parsed.services) {
          setDraftData(parsed);
          alert("Backup data loaded into draft! Review the changes and click 'Save Changes' to apply.");
        } else {
          alert("Invalid data.json backup format!");
        }
      } catch (err) {
        alert("Failed to parse JSON file! Make sure it is valid.");
      }
    };
    reader.readAsText(file);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen">
      <CustomCursor />

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
          <button 
            onClick={isAdminOpen ? () => setIsAdminOpen(true) : openPasscodePrompt} 
            className="admin-interactive" 
            style={{ 
              background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontSize: '0.9rem', 
              fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px',
              padding: '0 6px', opacity: 0.85, transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.85}
          >
            <Lock size={12} /> Admin Portal
          </button>
        </div>

        {/* Desktop CTA */}
        <a href={`tel:${siteData.contact.chintanPhoneRaw}`} className="btn-royal nav-cta">
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
            <button 
              onClick={() => {
                setMenuOpen(false);
                if (isAdminOpen) {
                  setIsAdminOpen(true);
                } else {
                  openPasscodePrompt();
                }
              }}
              className="admin-interactive" 
              style={{ 
                background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.3)', 
                color: '#fbbf24', cursor: 'pointer', fontSize: '0.95rem', borderRadius: '8px',
                fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                padding: '12px 20px', width: '100%', marginTop: '0.8rem'
              }}
            >
              <Lock size={14} /> Admin Portal
            </button>
            <a href={`tel:${siteData.contact.chintanPhoneRaw}`} className="btn-royal" style={{ justifyContent: 'center', marginTop: '0.8rem' }}>
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
            src={siteData.hero.bgImage}
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
            {siteData.hero.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
            className="playfair hero-title"
          >
            {siteData.hero.title} <span className="purple-gradient">{siteData.hero.titleGradient}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="hero-sub"
            dangerouslySetInnerHTML={{ __html: siteData.hero.subtitle }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="hero-btns"
          >
            <a href={siteData.hero.btnExploreLink} className="btn-royal">
              {siteData.hero.btnExploreText} <ArrowRight size={18} />
            </a>
            <a href={siteData.hero.btnQuoteLink} className="btn-glass">
              {siteData.hero.btnQuoteText}
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
                src={siteData.about.image}
                alt="Radhe DJ Truck"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/djevent/1200/800'; }}
              />
            </div>
            <div className="about-badge-float glass-card">
              <h4 className="royal-gradient" style={{ fontSize: '2.6rem', fontWeight: '900', lineHeight: 1 }}>{siteData.about.experienceYears}</h4>
              <p style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '8px' }}>{siteData.about.experienceLabel}</p>
            </div>
          </div>

          <div>
            <div className="badge">{siteData.about.badge}</div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              {siteData.about.title} <span className="royal-gradient">{siteData.about.titleGradient}</span>
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 2 }}>
              {siteData.about.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {siteData.about.keyPoints.map((item, i) => (
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
          {siteData.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card stat-card"
            >
              <div className="stat-icon">
                <DynamicIcon name={stat.iconName} size={32} />
              </div>
              <h3 className="royal-gradient" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>{stat.value}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── SERVICES ─────────────── */}
      <section id="services" className="section-padding relative" style={{ background: '#070b1d' }}>
        <GlowingBlobs />
        <div className="text-center relative z-10" style={{ marginBottom: '4rem' }}>
          <div className="badge">Specialties</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', marginBottom: '1.2rem' }}>
            Our Signature <span className="royal-gradient">Services</span>
          </h2>
          <div style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg,#8b5cf6,#fbbf24)', margin: '0 auto', borderRadius: '100px' }} />
        </div>

        <div className="process-grid">
          {siteData.services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="process-card dynamic-card"
              style={{ 
                '--accent-color': s.color,
                '--accent-rgb': hexToRgb(s.color)
              }}
            >
              <div className="process-number-badge">{i + 1}</div>
              <div className="process-bg-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="process-icon-box" style={{ position: 'relative', zIndex: 2 }}>
                <DynamicIcon name={s.iconName} size={36} />
              </div>
              <h3 className="process-title" style={{ position: 'relative', zIndex: 2 }}>{s.title}</h3>
              <p className="process-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── GALLERY ─────────────── */}
      <section id="gallery" className="section-padding">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <div className="badge">Moments</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}>
            Event <span className="royal-gradient">Gallery</span>
          </h2>
        </div>

        {/* Gallery Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Moments', icon: Sparkles },
            { id: 'photos', label: 'Photos', icon: ImageIcon },
            { id: 'videos', label: 'Videos', icon: Play }
          ].map(tab => {
            const isActive = galleryTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setGalleryTab(tab.id)}
                className="btn-glass admin-interactive"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 24px',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: isActive ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                  background: isActive ? 'rgba(251, 191, 36, 0.08)' : 'rgba(255,255,255,0.02)',
                  color: isActive ? '#fbbf24' : '#94a3b8',
                  boxShadow: isActive ? '0 0 15px rgba(251, 191, 36, 0.15)' : 'none'
                }}
              >
                <TabIcon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="gallery-grid">
          {(() => {
            const photos = (siteData.gallery || []).map(item => ({ ...item, type: 'photo' }));
            const videos = (siteData.galleryVideos || []).map(item => ({ ...item, type: 'video' }));
            
            let filteredMedia = [];
            if (galleryTab === 'photos') filteredMedia = photos;
            else if (galleryTab === 'videos') filteredMedia = videos;
            else filteredMedia = [...photos, ...videos];
            
            return filteredMedia.map((media, i) => {
              const isVideo = media.type === 'video';
              const displayUrl = isVideo ? media.cover : media.url;
              
              return (
                <motion.div 
                  key={media.type + '-' + i} 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="gallery-card"
                  onClick={() => setActiveMedia(media)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={displayUrl}
                    alt={media.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${media.seed || i}/800/600`; }}
                  />
                  
                  {/* Play icon badge for video cards */}
                  {isVideo && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(2, 6, 23, 0.75)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', zIndex: 10 }}>
                      <Play size={10} style={{ fill: '#fbbf24', color: '#fbbf24' }} />
                      <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '1px' }}>Video</span>
                    </div>
                  )}
                  
                  <div className="gallery-overlay">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="play-btn-circle" style={{ 
                        width: isVideo ? '60px' : '50px', 
                        height: isVideo ? '60px' : '50px', 
                        borderRadius: '50%', 
                        background: isVideo ? 'rgba(251, 191, 36, 0.95)' : 'rgba(139, 92, 246, 0.9)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginBottom: '12px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                        color: isVideo ? '#000' : '#fff',
                        transition: 'all 0.3s'
                      }}>
                        {isVideo ? <Play size={24} style={{ fill: '#000', marginLeft: '3px' }} /> : <ImageIcon size={22} />}
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', textAlign: 'center', padding: '0 15px' }}>{media.title}</h4>
                    </div>
                  </div>
                </motion.div>
              );
            });
          })()}
        </motion.div>
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
          {siteData.packages.map((pkg, i) => (
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
              <a
                href={`tel:${siteData.contact.chintanPhoneRaw}`}
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
          {siteData.testimonials.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card testimonial-card"
            >
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1.2rem' }}>
                {[...Array(5)].map((_, idx) => <Star key={idx} size={16} fill="#fbbf24" color="#fbbf24" />)}
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
            {siteData.faqs.map((faq, i) => {
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
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{siteData.contact.address}</p>
                </div>
              </div>

              {/* Chintan */}
              <a href={`tel:${siteData.contact.chintanPhoneRaw}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Chintan Patel</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{siteData.contact.chintanPhone}</p>
                  </div>
                </div>
              </a>

              {/* Mehul */}
              <a href={`tel:${siteData.contact.mehulPhoneRaw}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Mehul Patel</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{siteData.contact.mehulPhone}</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${siteData.contact.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item">
                  <div className="contact-icon" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1rem' }}>Email Us</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{siteData.contact.email}</p>
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
              <a href={siteData.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href={siteData.contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
              <a href={siteData.contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
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
              {siteData.services.slice(0, 6).map(s => (
                <li key={s.title}><a href="#services" className="footer-link">{s.title}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="footer-heading">Contact</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a href={`tel:${siteData.contact.chintanPhoneRaw}`} className="footer-contact-row">
                <Phone size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{siteData.contact.chintanPhone}</span>
              </a>
              <a href={`tel:${siteData.contact.mehulPhoneRaw}`} className="footer-contact-row">
                <Phone size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{siteData.contact.mehulPhone}</span>
              </a>
              <a href={`mailto:${siteData.contact.email}`} className="footer-contact-row">
                <Mail size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{siteData.contact.email}</span>
              </a>
              <div className="footer-contact-row" style={{ cursor: 'default' }}>
                <MapPin size={16} style={{ color: '#fbbf24', flexShrink: 0 }} />
                <span>{siteData.contact.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
          <p>© 2026 Radhe DJ &amp; Event. All Rights Reserved.</p>
          
          {/* Admin Login portal entry */}
          <p 
            onClick={openPasscodePrompt} 
            className="admin-interactive"
            style={{ color: 'rgba(255,255,255,0.15)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, fontSize: '0.85rem' }}
          >
            <Lock size={12} /> Admin Portal
          </p>

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
          href={siteData.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="float-btn float-whatsapp"
          aria-label="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </div>

      {/* ─────────────── MULTIMEDIA LIGHTBOX PLAYER ─────────────── */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ 
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh',
              background: 'rgba(2, 6, 23, 0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setActiveMedia(null)}
          >
            <div 
              style={{ position: 'relative', width: '100%', maxWidth: activeMedia.type === 'video' ? '960px' : '850px', height: 'auto', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveMedia(null)}
                className="admin-interactive"
                style={{ 
                  position: 'absolute', top: '-50px', right: '0', background: 'none', border: 'none', 
                  color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '0.85rem', fontWeight: 700, padding: '10px'
                }}
              >
                <X size={20} /> Close
              </button>

              {/* Media Container */}
              <div style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#000', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
                {activeMedia.type === 'photo' ? (
                  <img 
                    src={activeMedia.url} 
                    alt={activeMedia.title} 
                    style={{ width: '100%', height: 'auto', maxHeight: '75vh', objectFit: 'contain', display: 'block' }} 
                  />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '16/9', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {getVideoEmbedUrl(activeMedia.url) ? (
                      <iframe
                        src={getVideoEmbedUrl(activeMedia.url)}
                        title={activeMedia.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: '100%', height: '100%', display: 'block' }}
                      ></iframe>
                    ) : (
                      <video 
                        src={activeMedia.url} 
                        controls 
                        autoPlay 
                        style={{ width: '100%', height: '100%', display: 'block' }} 
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Title / Description Panel */}
              <div style={{ marginTop: '1.2rem', textAlign: 'center', width: '100%', padding: '0 20px' }}>
                <h3 className="playfair royal-gradient" style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '4px' }}>{activeMedia.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  {activeMedia.type === 'video' ? '🎥 Video Highlight' : '📸 Gallery Photo'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────── PASSCODE PROMPT MODAL ─────────────── */}
      <AnimatePresence>
        {isPasscodePromptOpen && (
          <motion.div 
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', zIndex: 999999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-card admin-interactive"
              style={{ width: '420px', padding: '40px', background: 'rgba(13, 21, 48, 0.95)', border: '1px solid rgba(251, 191, 36, 0.3)', boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(251, 191, 36, 0.1)' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  <Shield size={28} />
                </div>
                <h3 className="playfair royal-gradient" style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px' }}>Admin Login</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Radhe DJ Event Portal</p>
              </div>

              <form onSubmit={handlePasscodeSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <input 
                  type="password" 
                  placeholder="Enter Admin Passcode" 
                  value={enteredPasscode}
                  onChange={(e) => setEnteredPasscode(e.target.value)}
                  style={{ width: '100%', background: 'rgba(2, 6, 23, 0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px 20px', color: '#fff', fontSize: '1rem', textAlign: 'center', marginBottom: '1.2rem', outline: 'none' }}
                  required
                  autoFocus
                />
                
                {passcodeError && (
                  <p style={{ color: '#f43f5e', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', marginBottom: '1.2rem' }}>{passcodeError}</p>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button 
                    type="button" 
                    className="btn-glass" 
                    style={{ flex: 1, padding: '12px', fontSize: '0.8rem' }}
                    onClick={() => setIsPasscodePromptOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-royal" 
                    style={{ flex: 1.5, padding: '12px', fontSize: '0.8rem' }}
                  >
                    Access Portal
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────── DYNAMIC ADMIN PANEL DASHBOARD ─────────────── */}
      <AnimatePresence>
        {isAdminOpen && draftData && (
          <motion.div 
            className="admin-dashboard-root"
            style={{
              position: 'fixed', inset: 0, zIndex: 99999, background: '#020617', color: '#f8fafc',
              fontFamily: "'Outfit', sans-serif", display: 'flex', overflow: 'hidden'
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            {/* Sidebar Navigation */}
            <div style={{ width: '280px', background: '#070b1d', borderRight: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '24px 0' }}>
              <div style={{ padding: '0 24px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '20px' }}>
                <h2 className="playfair" style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>
                  RADHE <span className="purple-gradient">DJ</span>
                </h2>
                <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', padding: '5px 12px', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#fbbf24', marginTop: '10px' }}>
                  <Shield size={10} /> Admin Dashboard
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 12px' }}>
                {[
                  { id: 'hero', label: 'Hero Section', icon: 'Zap' },
                  { id: 'about', label: 'About & Stats', icon: 'Users' },
                  { id: 'services', label: 'Specialties', icon: 'Flame' },
                  { id: 'gallery', label: 'Gallery Photos', icon: 'ImageIcon' },
                  { id: 'galleryVideos', label: 'Gallery Videos', icon: 'Play' },
                  { id: 'packages', label: 'Pricing Packages', icon: 'Star' },
                  { id: 'testimonials', label: 'Testimonials', icon: 'Sparkles' },
                  { id: 'faqs', label: 'FAQs List', icon: 'HelpCircle' },
                  { id: 'contact', label: 'Contact Details', icon: 'Phone' },
                  { id: 'settings', label: 'System & Security', icon: 'Settings' }
                ].map(item => {
                  const isActive = adminTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setAdminTab(item.id)}
                      className="admin-interactive"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '14px', width: '100%',
                        padding: '12px 18px', border: 'none', borderRadius: '12px', fontSize: '0.88rem', fontWeight: 600,
                        textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s',
                        background: isActive ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.1))' : 'transparent',
                        color: isActive ? '#fff' : '#94a3b8',
                        borderLeft: isActive ? '3px solid #fbbf24' : '3px solid transparent',
                        boxShadow: isActive ? '0 4px 15px rgba(139, 92, 246, 0.05)' : 'none'
                      }}
                    >
                      <DynamicIcon name={item.icon} size={18} style={{ color: isActive ? '#fbbf24' : '#64748b' }} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Sidebar bottom */}
              <div style={{ padding: '20px 16px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={resetToFactoryDefault}
                  className="btn-glass admin-interactive"
                  style={{ width: '100%', padding: '10px', fontSize: '0.72rem', background: 'rgba(244, 63, 94, 0.05)', borderColor: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', justifyContent: 'center' }}
                >
                  <RotateCcw size={13} /> Factory Reset Data
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('isAdminSessionActive');
                    setIsAdminOpen(false);
                    setDraftData(null);
                  }}
                  className="btn-glass admin-interactive"
                  style={{ width: '100%', padding: '10px', fontSize: '0.72rem', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <LogOut size={13} /> Exit Portal
                </button>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#020617', overflow: 'hidden' }}>
              {/* Workspace Topbar */}
              <div style={{ height: '80px', borderBottom: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', flexShrink: 0 }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    Editing: <span style={{ color: '#fbbf24' }}>{adminTab.toUpperCase()}</span>
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.76rem' }}>Live Preview will sync once you click Save Changes</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {/* <button
                    onClick={downloadDataJson}
                    className="btn-glass admin-interactive"
                    style={{ padding: '10px 16px', fontSize: '0.76rem', gap: '8px' }}
                    title="Download raw data.json file for manually deploying changes"
                  >
                    <Download size={14} /> Export Backup
                  </button>
                  <label
                    className="btn-glass admin-interactive"
                    style={{ padding: '10px 16px', fontSize: '0.76rem', gap: '8px', cursor: 'pointer' }}
                  >
                    <Upload size={14} /> Import Backup
                    <input type="file" accept=".json" onChange={handleJsonUpload} style={{ display: 'none' }} />
                  </label> */}
                  <button
                    onClick={saveAdminChanges}
                    className="btn-royal admin-interactive"
                    style={{ padding: '10px 24px', fontSize: '0.76rem', gap: '8px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2)' }}
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </div>

              {/* Workspace Scroll Area Form Fields */}
              <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                
                {/* Save Toast Notification Inside Admin Panel */}
                <AnimatePresence>
                  {saveStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      style={{
                        padding: '16px 24px', borderRadius: '12px', marginBottom: '24px',
                        background: saveStatus === 'saving' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        border: saveStatus === 'saving' ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                        color: saveStatus === 'saving' ? '#60a5fa' : '#34d399',
                        display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '0.9rem'
                      }}
                    >
                      {saveStatus === 'saving' ? <Settings className="animate-spin" size={18} /> : <Check size={18} />}
                      {saveMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* TAB 1: HERO */}
                {adminTab === 'hero' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800, marginBottom: '20px' }}>Hero Details</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Hero Badge Text</label>
                          <input type="text" value={draftData.hero.badge} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, badge: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Main Title Base</label>
                          <input type="text" value={draftData.hero.title} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Title Gradient highlight</label>
                          <input type="text" value={draftData.hero.titleGradient} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, titleGradient: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Subtitle</label>
                          <input type="text" value={draftData.hero.subtitle} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Hero Background Image URL</label>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                          <input type="text" value={draftData.hero.bgImage} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, bgImage: e.target.value } }))} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                          <label className="btn-glass admin-interactive" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '0 20px', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.4)', background: 'rgba(251, 191, 36, 0.08)', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                            <Upload size={14} /> Choose Image
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  try {
                                    const base64 = await compressAndResizeImage(file);
                                    setDraftData(prev => ({ ...prev, hero: { ...prev.hero, bgImage: base64 } }));
                                  } catch (err) {
                                    alert('Error loading image. Please try another file.');
                                  }
                                }
                              }} 
                              style={{ display: 'none' }} 
                            />
                          </label>
                        </div>
                        <div style={{ width: '100%', height: '140px', overflow: 'hidden', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <img src={draftData.hero.bgImage} alt="Background Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb1?w=800'; }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Explore Button Text</label>
                          <input type="text" value={draftData.hero.btnExploreText} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, btnExploreText: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Quote Button Text</label>
                          <input type="text" value={draftData.hero.btnQuoteText} onChange={e => setDraftData(prev => ({ ...prev, hero: { ...prev.hero, btnQuoteText: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: ABOUT & STATS */}
                {adminTab === 'about' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '800px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800, marginBottom: '20px' }}>About Section Information</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>About Badge</label>
                          <input type="text" value={draftData.about.badge} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, badge: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Base Title</label>
                          <input type="text" value={draftData.about.title} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, title: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Title Gradient Accent</label>
                          <input type="text" value={draftData.about.titleGradient} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, titleGradient: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>About Image path/URL</label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input type="text" value={draftData.about.image} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, image: e.target.value } }))} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff', minWidth: 0 }} />
                            <label className="btn-glass admin-interactive" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '0 12px', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.4)', background: 'rgba(251, 191, 36, 0.08)', color: '#fbbf24', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                              <Upload size={12} /> Choose
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={async (e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    try {
                                      const base64 = await compressAndResizeImage(file);
                                      setDraftData(prev => ({ ...prev, about: { ...prev.about, image: base64 } }));
                                    } catch (err) {
                                      alert('Error loading image. Please try another file.');
                                    }
                                  }
                                }} 
                                style={{ display: 'none' }} 
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Experience Float Value (e.g. 10+)</label>
                          <input type="text" value={draftData.about.experienceYears} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, experienceYears: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Experience Float Label</label>
                          <input type="text" value={draftData.about.experienceLabel} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, experienceLabel: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Description text</label>
                        <textarea rows={4} value={draftData.about.description} onChange={e => setDraftData(prev => ({ ...prev, about: { ...prev.about, description: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff', resize: 'vertical' }} />
                      </div>

                      {/* Key Points list builder */}
                      <div>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>Key Selling Points</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {draftData.about.keyPoints.map((point, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                              <input
                                type="text"
                                value={point}
                                onChange={(e) => {
                                  const updated = [...draftData.about.keyPoints];
                                  updated[idx] = e.target.value;
                                  setDraftData(prev => ({ ...prev, about: { ...prev.about, keyPoints: updated } }));
                                }}
                                style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px', color: '#fff' }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = draftData.about.keyPoints.filter((_, i) => i !== idx);
                                  setDraftData(prev => ({ ...prev, about: { ...prev.about, keyPoints: updated } }));
                                }}
                                className="btn-glass admin-interactive"
                                style={{ padding: '10px', border: '1px solid rgba(244,63,94,0.3)', color: '#f43f5e', background: 'rgba(244,63,94,0.05)' }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setDraftData(prev => ({
                                ...prev,
                                about: { ...prev.about, keyPoints: [...prev.about.keyPoints, 'New Outstanding Quality Feature'] }
                              }));
                            }}
                            className="btn-glass admin-interactive"
                            style={{ alignSelf: 'flex-start', padding: '8px 16px', fontSize: '0.72rem', gap: '6px', border: '1px solid rgba(139,92,246,0.3)' }}
                          >
                            <Plus size={14} /> Add Feature
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stats editing */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800, marginBottom: '20px' }}>Statistics Cards</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {draftData.stats.map((stat, idx) => (
                          <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
                              <div style={{ color: '#fbbf24' }}>
                                <DynamicIcon name={stat.iconName} size={20} />
                              </div>
                              <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#94a3b8' }}>Stat Card #{idx+1}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <input
                                type="text"
                                value={stat.label}
                                placeholder="Label (e.g. Successful Events)"
                                onChange={e => {
                                  const updated = [...draftData.stats];
                                  updated[idx].label = e.target.value;
                                  setDraftData(prev => ({ ...prev, stats: updated }));
                                }}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.85rem' }}
                              />
                              <input
                                type="text"
                                value={stat.value}
                                placeholder="Value (e.g. 500+)"
                                onChange={e => {
                                  const updated = [...draftData.stats];
                                  updated[idx].value = e.target.value;
                                  setDraftData(prev => ({ ...prev, stats: updated }));
                                }}
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700 }}
                              />
                              <select
                                value={stat.iconName}
                                onChange={e => {
                                  const updated = [...draftData.stats];
                                  updated[idx].iconName = e.target.value;
                                  setDraftData(prev => ({ ...prev, stats: updated }));
                                }}
                                style={{ width: '100%', background: 'rgba(7, 11, 29, 0.95)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.85rem' }}
                              >
                                {Object.keys(IconMap).map(icon => (
                                  <option key={icon} value={icon}>{icon}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: SERVICES */}
                {adminTab === 'services' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>Manage specialties &amp; Services</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newService = {
                              title: 'New Service Item',
                              iconName: 'Flame',
                              desc: 'Enter an amazing service description here for your events.',
                              color: '#fbbf24'
                            };
                            setDraftData(prev => ({ ...prev, services: [...prev.services, newService] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add New Service
                        </button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {draftData.services.map((s, idx) => (
                          <div key={idx} style={{ background: 'rgba(13,21,48,0.5)', border: `1px solid rgba(${hexToRgb(s.color)}, 0.15)`, borderRadius: '16px', padding: '20px', position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = draftData.services.filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, services: updated }));
                              }}
                              className="admin-interactive"
                              style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#f43f5e', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                              <div style={{ color: s.color, background: `rgba(${hexToRgb(s.color)}, 0.08)`, border: `1px solid rgba(${hexToRgb(s.color)}, 0.2)`, width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifycontent: 'center', flexShrink: 0 }}>
                                <DynamicIcon name={s.iconName} size={20} />
                              </div>
                              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#fff' }}>Service Card #{idx+1}</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              <div>
                                <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Service Title</label>
                                <input type="text" value={s.title} onChange={e => {
                                  const updated = [...draftData.services];
                                  updated[idx].title = e.target.value;
                                  setDraftData(prev => ({ ...prev, services: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.8rem' }} />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Description text</label>
                                <textarea rows={2} value={s.desc} onChange={e => {
                                  const updated = [...draftData.services];
                                  updated[idx].desc = e.target.value;
                                  setDraftData(prev => ({ ...prev, services: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#94a3b8', fontSize: '0.8rem', resize: 'vertical' }} />
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <div>
                                  <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Accent Color Hex</label>
                                  <input type="text" value={s.color} onChange={e => {
                                    const updated = [...draftData.services];
                                    updated[idx].color = e.target.value;
                                    setDraftData(prev => ({ ...prev, services: updated }));
                                  }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.8rem' }} />
                                </div>
                                <div>
                                  <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Select Icon</label>
                                  <select value={s.iconName} onChange={e => {
                                    const updated = [...draftData.services];
                                    updated[idx].iconName = e.target.value;
                                    setDraftData(prev => ({ ...prev, services: updated }));
                                  }} style={{ width: '100%', background: 'rgba(7,11,29,0.95)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.8rem' }}>
                                    {Object.keys(IconMap).map(icon => (
                                      <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: GALLERY */}
                {adminTab === 'gallery' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>Manage Event Gallery Grid</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newImage = {
                              url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
                              seed: 'djtruck',
                              title: 'New Event Photo'
                            };
                            setDraftData(prev => ({ ...prev, gallery: [...prev.gallery, newImage] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add Image card
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {draftData.gallery.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '20px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                              <img src={img.url} alt="Thumbnail Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://picsum.photos/seed/error/200/200'; }} />
                            </div>
                            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '10px' }}>
                              <div>
                                <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Image URL</label>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <input type="text" value={img.url} onChange={e => {
                                    const updated = [...draftData.gallery];
                                    updated[idx].url = e.target.value;
                                    setDraftData(prev => ({ ...prev, gallery: updated }));
                                  }} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem', minWidth: 0 }} />
                                  <label className="btn-glass admin-interactive" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0 10px', borderRadius: '6px', border: '1px solid rgba(251, 191, 36, 0.4)', background: 'rgba(251, 191, 36, 0.08)', color: '#fbbf24', fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                                    <Upload size={10} /> Choose
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                          try {
                                            const base64 = await compressAndResizeImage(file, 800, 0.7); // Smaller resolution & compression for gallery cards
                                            const updated = [...draftData.gallery];
                                            updated[idx].url = base64;
                                            setDraftData(prev => ({ ...prev, gallery: updated }));
                                          } catch (err) {
                                            alert('Error loading image. Please try another file.');
                                          }
                                        }
                                      }} 
                                      style={{ display: 'none' }} 
                                    />
                                  </label>
                                </div>
                              </div>
                              <div>
                                <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Image Caption/Title</label>
                                <input type="text" value={img.title} onChange={e => {
                                  const updated = [...draftData.gallery];
                                  updated[idx].title = e.target.value;
                                  setDraftData(prev => ({ ...prev, gallery: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem' }} />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Fallback Seed Name</label>
                                <input type="text" value={img.seed} onChange={e => {
                                  const updated = [...draftData.gallery];
                                  updated[idx].seed = e.target.value;
                                  setDraftData(prev => ({ ...prev, gallery: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem' }} />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = draftData.gallery.filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, gallery: updated }));
                              }}
                              className="btn-glass admin-interactive"
                              style={{ padding: '10px', border: '1px solid rgba(244,63,94,0.3)', color: '#f43f5e', background: 'rgba(244,63,94,0.05)' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4B: GALLERY VIDEOS */}
                {adminTab === 'galleryVideos' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>Manage Event Gallery Videos</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newVideo = {
                              title: 'New Highlight Video',
                              url: 'https://www.youtube.com/watch?v=8VJOp63Ac6o',
                              cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800'
                            };
                            const currentVideos = draftData.galleryVideos || [];
                            setDraftData(prev => ({ ...prev, galleryVideos: [...currentVideos, newVideo] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add Video Card
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {(draftData.galleryVideos || []).map((vid, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '20px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px', alignItems: 'center' }}>
                            {/* Video Cover Thumbnail Preview */}
                            <div style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                              <img src={vid.cover} alt="Video Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://picsum.photos/seed/error/200/200'; }} />
                            </div>
                            
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {/* Row 1: Full-width Video Title */}
                              <div>
                                <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Video Title</label>
                                <input 
                                  type="text" 
                                  value={vid.title} 
                                  onChange={e => {
                                    const updated = [...draftData.galleryVideos];
                                    updated[idx].title = e.target.value;
                                    setDraftData(prev => ({ ...prev, galleryVideos: updated }));
                                  }} 
                                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem' }} 
                                />
                              </div>

                              {/* Row 2: Two equal columns for Video URL and Cover Image */}
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {/* Video URL */}
                                <div>
                                  <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Video URL (YouTube or MP4)</label>
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <input 
                                      type="text" 
                                      value={vid.url} 
                                      onChange={e => {
                                        const updated = [...draftData.galleryVideos];
                                        updated[idx].url = e.target.value;
                                        setDraftData(prev => ({ ...prev, galleryVideos: updated }));
                                      }} 
                                      style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem', minWidth: 0 }} 
                                    />
                                    <label className="btn-glass admin-interactive" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0 10px', borderRadius: '6px', border: '1px solid rgba(251, 191, 36, 0.4)', background: 'rgba(251, 191, 36, 0.08)', color: '#fbbf24', fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                                      <Upload size={10} /> Choose
                                      <input 
                                        type="file" 
                                        accept="video/*" 
                                        onChange={async (e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            // Limit size to 3.5MB to stay safely under LocalStorage 5MB quota and prevent JSON bloating
                                            if (file.size > 3.5 * 1024 * 1024) {
                                              alert("Video size is too large! Since storing videos inside the code database makes the site slow, please select a small video clip (under 3.5MB), or upload it to YouTube and paste the link here for high quality!");
                                              return;
                                            }
                                            
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onload = (event) => {
                                              const base64 = event.target.result;
                                              const updated = [...draftData.galleryVideos];
                                              updated[idx].url = base64;
                                              setDraftData(prev => ({ ...prev, galleryVideos: updated }));
                                            };
                                            reader.onerror = () => {
                                              alert("Error loading video file. Please try another file.");
                                            };
                                          }
                                        }} 
                                        style={{ display: 'none' }} 
                                      />
                                    </label>
                                  </div>
                                </div>

                                {/* Video Cover Image */}
                                <div>
                                  <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Cover Image</label>
                                  <div style={{ display: 'flex', gap: '6px' }}>
                                    <input 
                                      type="text" 
                                      value={vid.cover} 
                                      onChange={e => {
                                        const updated = [...draftData.galleryVideos];
                                        updated[idx].cover = e.target.value;
                                        setDraftData(prev => ({ ...prev, galleryVideos: updated }));
                                      }} 
                                      style={{ flex: 1, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem', minWidth: 0 }} 
                                    />
                                    <label className="btn-glass admin-interactive" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0 10px', borderRadius: '6px', border: '1px solid rgba(251, 191, 36, 0.4)', background: 'rgba(251, 191, 36, 0.08)', color: '#fbbf24', fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                                      <Upload size={10} /> Choose
                                      <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={async (e) => {
                                          const file = e.target.files[0];
                                          if (file) {
                                            try {
                                              const base64 = await compressAndResizeImage(file, 800, 0.7);
                                              const updated = [...draftData.galleryVideos];
                                              updated[idx].cover = base64;
                                              setDraftData(prev => ({ ...prev, galleryVideos: updated }));
                                            } catch (err) {
                                              alert('Error loading image. Please try another file.');
                                            }
                                          }
                                        }} 
                                        style={{ display: 'none' }} 
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Trash Delete button */}
                            <button
                              type="button"
                              onClick={() => {
                                const updated = draftData.galleryVideos.filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, galleryVideos: updated }));
                              }}
                              className="btn-glass admin-interactive"
                              style={{ padding: '10px', border: '1px solid rgba(244,63,94,0.3)', color: '#f43f5e', background: 'rgba(244,63,94,0.05)' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: PACKAGES */}
                {adminTab === 'packages' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>Manage Booking Packages</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newPkg = {
                              name: 'Super Package',
                              level: 'Celebration Premium',
                              features: ['Quality Sound', 'Basic Pyro'],
                              featured: false
                            };
                            setDraftData(prev => ({ ...prev, packages: [...prev.packages, newPkg] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add New Package
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {draftData.packages.map((pkg, idx) => (
                          <div key={idx} style={{ background: pkg.featured ? 'rgba(139, 92, 246, 0.08)' : 'rgba(0,0,0,0.2)', border: pkg.featured ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', padding: '24px', position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = draftData.packages.filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, packages: updated }));
                              }}
                              className="admin-interactive"
                              style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#f43f5e', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>

                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                              <div>
                                <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Package Title Name</label>
                                <input type="text" value={pkg.name} onChange={e => {
                                  const updated = [...draftData.packages];
                                  updated[idx].name = e.target.value;
                                  setDraftData(prev => ({ ...prev, packages: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.8rem', fontWeight: 800 }} />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Target Level (e.g. Essential)</label>
                                <input type="text" value={pkg.level} onChange={e => {
                                  const updated = [...draftData.packages];
                                  updated[idx].level = e.target.value;
                                  setDraftData(prev => ({ ...prev, packages: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#94a3b8', fontSize: '0.8rem' }} />
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingTop: '15px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: '#fff' }}>
                                  <input
                                    type="checkbox"
                                    checked={pkg.featured}
                                    onChange={e => {
                                      const updated = [...draftData.packages];
                                      updated[idx].featured = e.target.checked;
                                      setDraftData(prev => ({ ...prev, packages: updated }));
                                    }}
                                    style={{ width: '16px', height: '16px', accentColor: '#fbbf24' }}
                                  />
                                  ⭐ Featured / Most Popular
                                </label>
                              </div>
                            </div>

                            {/* Features list inside package */}
                            <div>
                              <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Package Highlights List</label>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                                {pkg.features.map((feature, fIdx) => (
                                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(2, 6, 23, 0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '4px 8px' }}>
                                    <input
                                      type="text"
                                      value={feature}
                                      onChange={e => {
                                        const updatedPkgs = [...draftData.packages];
                                        updatedPkgs[idx].features[fIdx] = e.target.value;
                                        setDraftData(prev => ({ ...prev, packages: updatedPkgs }));
                                      }}
                                      style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.74rem', width: '130px', outline: 'none' }}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updatedPkgs = [...draftData.packages];
                                        updatedPkgs[idx].features = updatedPkgs[idx].features.filter((_, i) => i !== fIdx);
                                        setDraftData(prev => ({ ...prev, packages: updatedPkgs }));
                                      }}
                                      style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedPkgs = [...draftData.packages];
                                    updatedPkgs[idx].features.push('New Custom Feature');
                                    setDraftData(prev => ({ ...prev, packages: updatedPkgs }));
                                  }}
                                  className="btn-glass admin-interactive"
                                  style={{ padding: '4px 10px', fontSize: '0.62rem', gap: '4px', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
                                >
                                  <Plus size={10} /> Add Item
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: TESTIMONIALS */}
                {adminTab === 'testimonials' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>Manage Client Reviews</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newTestimonial = {
                              name: 'Customer Name',
                              role: 'Happy Client',
                              text: 'Great work! The lighting, sound quality, and professionalism were absolutely first class.'
                            };
                            setDraftData(prev => ({ ...prev, testimonials: [...prev.testimonials, newTestimonial] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add Review Card
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {draftData.testimonials.map((t, idx) => (
                          <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '20px', position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = draftData.testimonials.filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, testimonials: updated }));
                              }}
                              className="admin-interactive"
                              style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#f43f5e', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '12px' }}>
                              <div>
                                <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Client Name</label>
                                <input type="text" value={t.name} onChange={e => {
                                  const updated = [...draftData.testimonials];
                                  updated[idx].name = e.target.value;
                                  setDraftData(prev => ({ ...prev, testimonials: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem' }} />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Client Tag/Event Role (e.g. Birthday Party)</label>
                                <input type="text" value={t.role} onChange={e => {
                                  const updated = [...draftData.testimonials];
                                  updated[idx].role = e.target.value;
                                  setDraftData(prev => ({ ...prev, testimonials: updated }));
                                }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#a78bfa', fontSize: '0.78rem' }} />
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Review Text Body</label>
                              <textarea rows={3} value={t.text} onChange={e => {
                                const updated = [...draftData.testimonials];
                                updated[idx].text = e.target.value;
                                setDraftData(prev => ({ ...prev, testimonials: updated }));
                              }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#cbd5e1', fontSize: '0.78rem', resize: 'vertical' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 7: FAQS */}
                {adminTab === 'faqs' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>Manage Frequently Asked Questions</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newFaq = {
                              q: 'Do you provide backup sound systems?',
                              a: 'Yes, we always carry spare sound consoles and amplifiers to ensure zero interruptions.'
                            };
                            setDraftData(prev => ({ ...prev, faqs: [...prev.faqs, newFaq] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add New FAQ Card
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {draftData.faqs.map((faq, idx) => (
                          <div key={idx} style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '20px', position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = draftData.faqs.filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, faqs: updated }));
                              }}
                              className="admin-interactive"
                              style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'transparent', color: '#f43f5e', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>

                            <div style={{ marginBottom: '12px' }}>
                              <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Question</label>
                              <input type="text" value={faq.q} onChange={e => {
                                const updated = [...draftData.faqs];
                                updated[idx].q = e.target.value;
                                setDraftData(prev => ({ ...prev, faqs: updated }));
                              }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.78rem', fontWeight: 700 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.62rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Answer</label>
                              <textarea rows={3} value={faq.a} onChange={e => {
                                const updated = [...draftData.faqs];
                                updated[idx].a = e.target.value;
                                setDraftData(prev => ({ ...prev, faqs: updated }));
                              }} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#cbd5e1', fontSize: '0.78rem', resize: 'vertical' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 8: CONTACT DETAILS */}
                {adminTab === 'contact' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800, marginBottom: '20px' }}>Address &amp; Direct Phone contacts</h4>
                      
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Store Address Location</label>
                        <input type="text" value={draftData.contact.address} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, address: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Chintan Patel Phone (Display)</label>
                          <input type="text" value={draftData.contact.chintanPhone} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, chintanPhone: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Chintan Patel Raw (e.g. 9624047940)</label>
                          <input type="text" value={draftData.contact.chintanPhoneRaw} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, chintanPhoneRaw: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Mehul Patel Phone (Display)</label>
                          <input type="text" value={draftData.contact.mehulPhone} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, mehulPhone: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Mehul Patel Raw (e.g. 9909505194)</label>
                          <input type="text" value={draftData.contact.mehulPhoneRaw} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, mehulPhoneRaw: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Email Address</label>
                        <input type="email" value={draftData.contact.email} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, email: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <h5 style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 800 }}>Social Media Links</h5>
                        <div>
                          <label style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Instagram URL</label>
                          <input type="text" value={draftData.contact.instagram} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, instagram: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px', color: '#cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>YouTube channel/Video Link</label>
                          <input type="text" value={draftData.contact.youtube} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, youtube: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px', color: '#cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.68rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>WhatsApp chat/Link</label>
                          <input type="text" value={draftData.contact.whatsapp} onChange={e => setDraftData(prev => ({ ...prev, contact: { ...prev.contact, whatsapp: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '10px', color: '#cbd5e1', fontSize: '0.82rem' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 9: SETTINGS (PASSCODE) */}
                {adminTab === 'settings' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800, marginBottom: '20px' }}>Security Settings</h4>
                      
                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Admin Dashboard Passcode</label>
                        <input
                          type="text"
                          value={draftData.adminSettings.passcode}
                          onChange={e => setDraftData(prev => ({ ...prev, adminSettings: { passcode: e.target.value } }))}
                          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fbbf24', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '2px' }}
                        />
                        <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>Remember this password! It limits who can log into this Admin Panel and make dynamic edits.</span>
                      </div>

                    
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
