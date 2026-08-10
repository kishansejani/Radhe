import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, Mail, MapPin, Music, Zap, Flame, Star, Sparkles, Wind,
  PartyPopper, CheckCircle2, Users, HelpCircle, ArrowRight,
  Image as ImageIcon, Send, Menu, X, Camera, Play, Pause, ChevronDown, ArrowUp,
  Edit, Plus, Trash2, Save, Lock, Check, Upload, Download, Shield, Settings,
  RotateCcw, Eye, LogOut, Volume2, VolumeX, Radio, Disc, Sliders, Sun, Moon
} from 'lucide-react';
import initialData from './data.json';

// Dynamic Lucide Icon Mapper
const IconMap = {
  Phone, Mail, MapPin, Music, Zap, Flame, Star, Sparkles, Wind,
  PartyPopper, CheckCircle2, Users, HelpCircle, ArrowRight,
  ImageIcon, Send, Menu, X, Camera, Play, Pause, ChevronDown, ArrowUp,
  Shield, Settings, Lock, Volume2, VolumeX, Radio, Disc, Sliders, Sun, Moon
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

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 20 }).map((_, i) => {
    const size = Math.random() * 45 + 15; // Balanced sizes: 15px to 60px
    const left = `${Math.random() * 100}%`;
    // Negative delay pre-populates bubbles all over the screen on load!
    const delay = -(Math.random() * 35); 
    const duration = Math.random() * 20 + 15; // Slow majestic movement: 15s to 35s
    const maxOpacity = Math.random() * 0.25 + 0.1; // 10% to 35% opacity for elegant visibility
    const drift1 = `${Math.random() * 60 - 30}px`;
    const drift2 = `${Math.random() * 90 - 45}px`;

    // Curated high-contrast primary colors matching brand palette
    const colors = [
      'radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.55) 0%, rgba(251, 191, 36, 0.15) 50%, transparent 100%)', // Gold
      'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.55) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 100%)', // Purple
      'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.55) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 100%)',  // Cyan
    ];
    const borderColor = [
      'rgba(251, 191, 36, 0.35)',
      'rgba(139, 92, 246, 0.35)',
      'rgba(6, 182, 212, 0.35)'
    ][i % 3];
    const glowShadow = [
      '0 0 8px rgba(251, 191, 36, 0.25), inset 0 1px 3px rgba(255,255,255,0.2)',
      '0 0 8px rgba(139, 92, 246, 0.25), inset 0 1px 3px rgba(255,255,255,0.2)',
      '0 0 8px rgba(6, 182, 212, 0.25), inset 0 1px 3px rgba(255,255,255,0.2)'
    ][i % 3];
    
    return {
      id: i,
      size,
      left,
      delay: `${delay}s`,
      duration: `${duration}s`,
      maxOpacity,
      drift1,
      drift2,
      background: colors[i % 3],
      borderColor,
      glowShadow
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: '-120px',
            background: b.background,
            border: `1px solid ${b.borderColor}`,
            boxShadow: b.glowShadow,
            filter: 'blur(0.5px)', // Soft bokeh anti-aliasing
            pointerEvents: 'none',
            animation: `floatUp ${b.duration} linear infinite`,
            animationDelay: b.delay,
            '--max-op': b.maxOpacity,
            '--drift-1': b.drift1,
            '--drift-2': b.drift2,
          }}
        />
      ))}
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
        const parsed = JSON.parse(cached);
        return { ...initialData, ...parsed };
      } catch (err) {
        console.error("Error reading radhe_site_data from localStorage", err);
      }
    }
    return initialData;
  });

  // Background sync from remote cloud database (npoint.io)
  useEffect(() => {
    const fetchRemoteData = async () => {
      try {
        const response = await fetch('https://api.npoint.io/18c0988ee7be366e16ee');
        if (response.ok) {
          const freshData = await response.json();
          // Verify it has the expected structure
          if (freshData.hero && freshData.about && freshData.services) {
            const merged = { ...initialData, ...freshData };
            setSiteData(merged);
            setDraftData(merged);
            localStorage.setItem('radhe_site_data', JSON.stringify(merged));
          }
        }
      } catch (err) {
        console.warn("Could not sync with cloud database. Using local/cached storage.", err);
      }
    };
    fetchRemoteData();
  }, []);

  // Dynamic Elfsight script loader for Google Reviews
  useEffect(() => {
    if (siteData.googleReviewWidgetId) {
      const existingScript = document.querySelector('script[src="https://elfsightcdn.com/platform.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }, [siteData.googleReviewWidgetId]);

  const [formData, setFormData] = useState({ name: '', phone: '', event: '', message: '' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Theme state (Dark / Light mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('radhe_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('radhe_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Gallery tabs and Media lightbox state
  const [galleryTab, setGalleryTab] = useState('all');
  const [activeMedia, setActiveMedia] = useState(null);

  // Interactive Sound & Stage FX Showcase state
  const [soundMode, setSoundMode] = useState('bass');

  // DJ Audio Player state
  const audioRef = useRef(null);
  const [djPlaying, setDjPlaying] = useState(false);
  const [djCurrentIdx, setDjCurrentIdx] = useState(0);
  const [djProgress, setDjProgress] = useState(0);
  const [djCurrentTime, setDjCurrentTime] = useState('0:00');
  const [djDuration, setDjDuration] = useState('0:00');
  const [djError, setDjError] = useState(false);

  const formatDjTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const djSongs = siteData.djSongs || [];

  // Attach audio event listeners once on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDjProgress((audio.currentTime / audio.duration) * 100);
        setDjCurrentTime(formatDjTime(audio.currentTime));
      }
    };
    const onLoadedMetadata = () => {
      setDjDuration(formatDjTime(audio.duration));
      setDjError(false);
    };
    const onEnded = () => {
      setDjPlaying(false);
      setDjProgress(0);
      setDjCurrentTime('0:00');
    };
    const onError = () => {
      setDjPlaying(false);
      setDjError(true);
    };
    const onCanPlay = () => {
      setDjError(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, []); // Only once on mount

  // When song index changes, update the src imperatively and reload
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || djSongs.length === 0) return;
    const song = djSongs[djCurrentIdx];
    if (!song?.url) return;

    const wasPlaying = !audio.paused;
    audio.pause();
    audio.src = song.url;
    audio.currentTime = 0;
    setDjProgress(0);
    setDjCurrentTime('0:00');
    setDjDuration('0:00');
    setDjError(false);
    audio.load();

    if (wasPlaying) {
      audio.play().then(() => {
        setDjPlaying(true);
      }).catch(() => {
        setDjPlaying(false);
      });
    } else {
      setDjPlaying(false);
    }
  }, [djCurrentIdx]); // Runs when song index changes

  const handleDjPlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // If no src yet, set the first song
    if (!audio.src || audio.src === window.location.href) {
      if (djSongs.length > 0 && djSongs[djCurrentIdx]?.url) {
        audio.src = djSongs[djCurrentIdx].url;
        audio.load();
      }
    }

    if (djPlaying) {
      audio.pause();
      setDjPlaying(false);
    } else {
      audio.play().then(() => {
        setDjPlaying(true);
      }).catch((err) => {
        console.error('DJ play error:', err);
        setDjError(true);
        setDjPlaying(false);
      });
    }
  };

  const handleDjSongChange = (idx) => {
    setDjCurrentIdx(idx); // The useEffect above handles everything
  };

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
          const parsed = JSON.parse(cached);
          return { ...initialData, ...parsed };
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

  // Handle URL changes for /admin or #admin direct routing
  useEffect(() => {
    const checkAdminRoute = () => {
      const isAdminHash = window.location.hash === '#admin';
      const isAdminPath = window.location.pathname === '/admin' || window.location.pathname === '/admin/';
      
      if (isAdminHash || isAdminPath) {
        const sessionActive = localStorage.getItem('isAdminSessionActive') === 'true';
        if (sessionActive) {
          setIsAdminOpen(true);
          setDraftData(prev => prev ? prev : JSON.parse(JSON.stringify(siteData)));
        } else {
          setIsPasscodePromptOpen(true);
          setEnteredPasscode('');
          setPasscodeError('');
        }
      } else {
        // If they navigate away or manually remove '/admin' or '#admin', close both dashboard and passcode prompts!
        setIsAdminOpen(false);
        setIsPasscodePromptOpen(false);
        setDraftData(null);
      }
    };

    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    // Execute on initial page load immediately
    checkAdminRoute();

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, [siteData]);

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
    setSaveMsg('Saving content to cloud & local storage...');
    
    // 1. Save to LocalState
    setSiteData(draftData);
    
    // 2. Save to Browser Storage
    localStorage.setItem('radhe_site_data', JSON.stringify(draftData));

    let savedToCloud = false;
    let savedToLocalFile = false;

    // 3. Save to Remote Cloud Database (npoint.io)
    try {
      const cloudResponse = await fetch('https://api.npoint.io/18c0988ee7be366e16ee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData),
      });
      if (cloudResponse.ok) {
        savedToCloud = true;
      }
    } catch (err) {
      console.error("Failed to save to remote cloud database:", err);
    }

    // 4. Save to local Vite dev server file directly (for local development files sync)
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftData, null, 2),
      });

      if (response.ok) {
        savedToLocalFile = true;
      }
    } catch (err) {
      // Bypassed on static production server (Vercel)
    }

    if (savedToCloud && savedToLocalFile) {
      setSaveStatus('success');
      setSaveMsg('Changes saved to Cloud Database & local data.json successfully!');
    } else if (savedToCloud) {
      setSaveStatus('success');
      setSaveMsg('Changes saved directly to Cloud Database successfully (Live Everywhere)!');
    } else if (savedToLocalFile) {
      setSaveStatus('success');
      setSaveMsg('Saved locally on disk. Cloud database sync failed.');
    } else {
      setSaveStatus('success');
      setSaveMsg('Saved locally in browser storage (Offline Mode).');
    }

    setTimeout(() => {
      setSaveStatus(null);
    }, 4000);
  };

  const resetToFactoryDefault = async () => {
    if (window.confirm("Are you sure you want to reset ALL data back to default settings? All custom edits will be deleted.")) {
      setDraftData(JSON.parse(JSON.stringify(initialData)));
      setSiteData(initialData);
      localStorage.setItem('radhe_site_data', JSON.stringify(initialData));
      
      // Reset remote cloud database too
      try {
        await fetch('https://api.npoint.io/18c0988ee7be366e16ee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(initialData),
        });
      } catch (err) {
        console.error("Failed to reset remote cloud database:", err);
      }
      
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
            onClick={() => {
              localStorage.removeItem('isAdminSessionActive');
              setIsAdminOpen(false);
              setIsPasscodePromptOpen(true);
              setEnteredPasscode('');
              setPasscodeError('');
              window.history.pushState({}, '', '/admin');
            }} 
            className="admin-interactive" 
            style={{ 
              background: 'none', border: 'none', color: '#f97316', cursor: 'pointer', fontSize: '0.9rem', 
              fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '12px',
              padding: '0 6px', opacity: 0.9, transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.9}
          >
            <Lock size={13} /> Admin Portal
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Mode Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn admin-interactive"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={19} style={{ color: '#fbbf24' }} /> : <Moon size={19} style={{ color: '#ea580c' }} />}
          </button>

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
        </div>
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
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <button 
                onClick={toggleTheme}
                className="admin-interactive"
                style={{ 
                  flex: 1, background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', 
                  color: 'var(--brand-orange)', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px'
                }}
              >
                {theme === 'dark' ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
              </button>
              
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  localStorage.removeItem('isAdminSessionActive');
                  setIsAdminOpen(false);
                  setIsPasscodePromptOpen(true);
                  setEnteredPasscode('');
                  setPasscodeError('');
                  window.history.pushState({}, '', '/admin');
                }}
                className="admin-interactive" 
                style={{ 
                  flex: 1, background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', 
                  color: '#eab308', borderRadius: '10px', fontWeight: 700, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px'
                }}
              >
                <Lock size={14} /> Admin Portal
              </button>
            </div>

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
          <FloatingBubbles />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="badge pulse-glow-badge"
            style={{ background: 'rgba(249, 115, 22, 0.12)', color: 'var(--brand-orange)', borderColor: 'rgba(249, 115, 22, 0.4)' }}
          >
            🪶 {siteData.hero.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 90 }}
            className="playfair hero-title"
          >
            {siteData.hero.title} <span className="radhe-logo-gradient">{siteData.hero.titleGradient}</span>
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

      {/* ─────────────── ABOUT (LAYOUT 1: ASYMMETRIC SPLIT) ─────────────── */}
      <section id="about" className="section-padding relative overflow-hidden" style={{ background: 'var(--deep-bg)' }}>
        <GlowingBlobs />
        <div className="about-grid relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-img-wrap"
          >
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              transition={{ duration: 0.4 }}
              className="about-img-frame shimmer-card"
              style={{ position: 'relative', overflow: 'hidden', border: '2px solid rgba(249, 115, 22, 0.3)', borderRadius: '32px' }}
            >
              <img
                src={siteData.about.image}
                alt="Radhe DJ Setup"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/djevent/1200/800'; }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,11,25,0.7) 0%, transparent 60%)' }} />
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="about-badge-float glass-card pulse-glow-badge"
              style={{ border: '1px solid rgba(234,179,8,0.5)', background: 'var(--card-bg)' }}
            >
              <h4 className="orange-gold-gradient" style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: 1 }}>{siteData.about.experienceYears}</h4>
              <p style={{ fontSize: '0.72rem', color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '3px', marginTop: '6px', fontWeight: 800 }}>{siteData.about.experienceLabel}</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--brand-orange)', borderColor: 'rgba(249, 115, 22, 0.3)' }}>
              🪶 {siteData.about.badge}
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', marginBottom: '1.5rem', lineHeight: 1.15, fontWeight: 900 }}>
              {siteData.about.title} <span className="radhe-logo-gradient">{siteData.about.titleGradient}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2.2rem', lineHeight: 1.9 }}>
              {siteData.about.description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              {siteData.about.keyPoints.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, borderColor: 'rgba(249, 115, 22, 0.4)' }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '14px', 
                    padding: '14px 18px', 
                    background: 'var(--card-bg)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px var(--shadow-color)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--brand-orange)' }} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── STATS (LAYOUT 2: FULL-WIDTH TICKER BAR) ─────────────── */}
      <section className="section-padding relative" style={{ background: 'var(--alt-bg)', padding: '60px 8%' }}>
        <div className="stats-grid">
          {siteData.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="glass-card stat-card shimmer-card"
              style={{
                border: '1px solid var(--border-color)',
                background: 'var(--card-bg)',
                position: 'relative'
              }}
            >
              <div className="stat-icon" style={{ 
                width: '64px', height: '64px', margin: '0 auto 1.5rem', borderRadius: '20px', 
                background: i % 2 === 0 ? 'rgba(249, 115, 22, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                border: i % 2 === 0 ? '1px solid rgba(249, 115, 22, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px var(--shadow-color)'
              }}>
                <DynamicIcon name={stat.iconName} size={30} style={{ color: i % 2 === 0 ? 'var(--brand-orange)' : 'var(--brand-emerald)' }} />
              </div>
              <h3 className="radhe-logo-gradient" style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.4rem', letterSpacing: '-1px' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2.5px' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── SERVICES (LAYOUT 3: DYNAMIC CARDS GRID) ─────────────── */}
      <section id="services" className="section-padding relative" style={{ background: 'var(--section-bg-3)' }}>
        <GlowingBlobs />
        <div className="text-center relative z-10" style={{ marginBottom: '4.5rem' }}>
          <div className="badge" style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--brand-gold)', borderColor: 'rgba(234, 179, 8, 0.3)' }}>
            🪶 Royal Capabilities
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', marginBottom: '1.2rem', fontWeight: 900 }}>
            Our Royal <span className="radhe-logo-gradient">Services &amp; Setup</span>
          </h2>
          <div style={{ width: '90px', height: '4px', background: 'linear-gradient(90deg, #f97316, #eab308, #10b981)', margin: '0 auto', borderRadius: '100px' }} />
        </div>

        <div className="process-grid">
          {siteData.services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="process-card dynamic-card shimmer-card"
              style={{ 
                '--accent-color': s.color || (i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#eab308' : '#10b981'),
                '--accent-rgb': hexToRgb(s.color || (i % 3 === 0 ? '#f97316' : i % 3 === 1 ? '#eab308' : '#10b981')),
                border: '1px solid rgba(var(--accent-rgb), 0.3)',
                background: 'var(--card-bg)',
                boxShadow: '0 15px 35px var(--shadow-color)'
              }}
            >
              <div className="process-number-badge">{i + 1}</div>
              <div className="process-bg-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="process-icon-box" style={{ position: 'relative', zIndex: 2 }}>
                <DynamicIcon name={s.iconName} size={38} />
              </div>
              <h3 className="process-title" style={{ position: 'relative', zIndex: 2, color: 'var(--text-main)' }}>{s.title}</h3>
              <p className="process-desc" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── INTERACTIVE DJ MIXER WITH AUDIO PLAYER ─────────────── */}
      <section id="experience" className="section-padding relative overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--section-bg-3) 0%, var(--deep-bg) 100%)' }}>
        <GlowingBlobs />
        {/* Hidden HTML5 audio element */}
          <audio
            ref={audioRef}
            preload="none"
            style={{ display: 'none' }}
          />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center" style={{ marginBottom: '3.5rem' }}>
            <div className="badge pulse-glow-badge" style={{ background: 'rgba(249, 115, 22, 0.12)', color: 'var(--brand-orange)', borderColor: 'rgba(249, 115, 22, 0.4)' }}>
              ⚡ Interactive DJ Mixer
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', fontWeight: 900, marginBottom: '1rem' }}>
              Feel The <span className="radhe-logo-gradient">Sound Beat &amp; Aura</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              Pick a song, hit play, and feel the live DJ FX visualizer react to the beat!
            </p>
          </div>

          <div
            className="glass-card shimmer-card"
            style={{
              padding: '40px',
              background: 'var(--card-bg)',
              border: '1px solid var(--brand-orange)',
              boxShadow: '0 25px 60px var(--shadow-color), 0 0 30px rgba(249, 115, 22, 0.15)'
            }}
          >
            {/* Mode selection chips */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
              {[
                { id: 'bass', label: '🔊 20,000W Bass Drop', color: '#f97316' },
                { id: 'laser', label: '⚡ 3D Laser Spectacle', color: '#eab308' },
                { id: 'pyro', label: '🎆 Cold Pyro Sparklers', color: '#10b981' },
                { id: 'fog', label: '💨 Heavy Cloud Fog FX', color: '#f97316' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSoundMode(m.id)}
                  className={`sound-mode-chip ${soundMode === m.id ? 'active' : ''}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Stage Aura Visualizer Box */}
            <div style={{
              height: '180px',
              borderRadius: '24px',
              background: soundMode === 'bass' ? 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.25) 0%, rgba(7, 11, 24, 0.95) 70%)'
                : soundMode === 'laser' ? 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.25) 0%, rgba(7, 11, 24, 0.95) 70%)'
                : soundMode === 'pyro' ? 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.25) 0%, rgba(7, 11, 24, 0.95) 70%)'
                : 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.25) 0%, rgba(7, 11, 24, 0.95) 70%)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '20px',
              transition: 'all 0.5s ease'
            }}>
              {/* Status pill */}
              <div style={{ position: 'absolute', top: '16px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--border-color)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800 }}>
                <span className={djPlaying ? 'status-dot-active' : ''} style={!djPlaying ? { width: 8, height: 8, borderRadius: '50%', background: '#64748b', display: 'inline-block' } : {}} />
                <span style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {djPlaying ? `${soundMode.toUpperCase()} STAGE MIX LIVE` : 'PRESS PLAY TO START'}
                </span>
              </div>

              {/* Equalizer Frequency Bars – animate when playing */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px', paddingBottom: '8px' }}>
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="eq-bar"
                    style={{
                      height: `${Math.floor(Math.random() * 70) + 20}%`,
                      animationDuration: djPlaying ? `${0.4 + (i % 5) * 0.18}s` : '0s',
                      animationPlayState: djPlaying ? 'running' : 'paused',
                      width: '3px',
                      background: soundMode === 'bass' ? 'linear-gradient(to top, #f97316, #eab308)'
                        : soundMode === 'laser' ? 'linear-gradient(to top, #eab308, #10b981)'
                        : soundMode === 'pyro' ? 'linear-gradient(to top, #10b981, #f97316)'
                        : 'linear-gradient(to top, #f97316, #eab308)'
                    }}
                  />
                ))}
              </div>

              <p style={{ color: '#e2e8f0', fontSize: '0.82rem', fontWeight: 800, marginTop: '8px', letterSpacing: '1px' }}>
                {soundMode === 'bass' && '🔊 High-Punch JBL Line Array Subwoofers & Master Mix'}
                {soundMode === 'laser' && '⚡ Multi-Color DMX Laser Beams & Intelligent Scanners'}
                {soundMode === 'pyro' && '🎆 Non-Hazardous Cold Flame Pyro Spark Fountain Stage FX'}
                {soundMode === 'fog' && '💨 Dense Low-Lying Dry Ice Cloud Fog Machine'}
              </p>
            </div>

            {/* ── Real Audio Player ── */}
            {djSongs.length > 0 && (
              <div className="dj-audio-player">
                {/* Play/Pause button */}
                <button className="dj-play-btn" onClick={handleDjPlayPause}>
                  {djPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                {/* Track Info */}
                <div className="dj-track-info">
                  <div className="dj-track-name">{djSongs[djCurrentIdx]?.title || 'Select a song'}</div>
                  {djError
                    ? <div className="dj-track-sub" style={{ color: '#f43f5e' }}>⚠️ URL error – please add a valid MP3 link in Admin panel</div>
                    : <div className="dj-track-sub">{djSongs[djCurrentIdx]?.artist || ''}</div>
                  }
                </div>

                {/* Progress */}
                <div className="dj-progress-wrap">
                  <div
                    className="dj-progress-bar"
                    onClick={(e) => {
                      if (!audioRef.current || !audioRef.current.duration) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const ratio = (e.clientX - rect.left) / rect.width;
                      audioRef.current.currentTime = ratio * audioRef.current.duration;
                    }}
                  >
                    <div className="dj-progress-fill" style={{ width: `${djProgress}%` }} />
                  </div>
                  <div className="dj-time-row">
                    <span>{djCurrentTime}</span>
                    <span>{djDuration}</span>
                  </div>
                </div>

                {/* Song selector */}
                <select
                  className="dj-song-select"
                  value={djCurrentIdx}
                  onChange={(e) => handleDjSongChange(Number(e.target.value))}
                >
                  {djSongs.map((song, idx) => (
                    <option key={idx} value={idx}>🎵 {song.title}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ─────────────── HIGH-TECH SPECS MATRIX (LAYOUT 5: TECH SPEC MATRIX) ─────────────── */}
      <section id="why-us" className="section-padding relative" style={{ background: 'var(--alt-bg)' }}>
        <div className="text-center relative z-10" style={{ marginBottom: '4rem' }}>
          <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--brand-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            ⚡ Why Radhe DJ
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, marginBottom: '1.2rem' }}>
            Built For <span className="radhe-logo-gradient">Unmatched Power</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { title: '20,000W RMS Sound', desc: 'JBL & RCF Professional Line Array Subwoofers for maximum bass impact.', icon: Zap, color: 'var(--brand-orange)' },
            { title: 'Cold Pyro Sparklers', desc: 'Safe indoor & outdoor non-hazardous fireworks for grand entrances.', icon: Flame, color: 'var(--brand-gold)' },
            { title: '3D Laser Lighting', desc: 'DMX computer-controlled laser beams & moving head light shows.', icon: Sparkles, color: 'var(--brand-emerald)' },
            { title: 'Power Generator Backup', desc: '100% uninterrupted power supply with silent backup generators.', icon: Shield, color: 'var(--brand-orange)' }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card shimmer-card"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '36px' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(249, 115, 22, 0.12)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.4rem' }}>
                  <IconComponent size={28} style={{ color: item.color }} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '8px', color: 'var(--text-main)' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─────────────── GALLERY (LAYOUT 6: MASONRY MEDIA GRID) ─────────────── */}
      <section id="gallery" className="section-padding relative" style={{ background: 'var(--deep-bg)' }}>
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <div className="badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--brand-orange)', borderColor: 'rgba(249, 115, 22, 0.3)' }}>
            🪶 Real Gujarat Events
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, marginBottom: '0.8rem' }}>
            Event <span className="radhe-logo-gradient">Gallery</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto' }}>
            Explore photos &amp; high-energy video clips from Radhe DJ events across Gujarat!
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
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
                  gap: '10px',
                  padding: '12px 28px',
                  borderRadius: '100px',
                  fontSize: '0.88rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: isActive ? '1px solid var(--brand-orange)' : '1px solid var(--border-color)',
                  background: isActive ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(234, 179, 8, 0.2))' : 'var(--card-bg)',
                  color: isActive ? 'var(--brand-orange)' : 'var(--text-muted)',
                  boxShadow: isActive ? '0 0 25px rgba(249, 115, 22, 0.25)' : 'none'
                }}
              >
                <TabIcon size={16} /> {tab.label}
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
                  transition={{ duration: 0.35 }}
                  className="gallery-card shimmer-card"
                  onClick={() => setActiveMedia(media)}
                  style={{ cursor: 'pointer', borderRadius: '24px', border: '1px solid var(--border-color)' }}
                >
                  <img
                    src={displayUrl}
                    alt={media.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${media.seed || i}/800/600`; }}
                  />
                  
                  {/* Play icon badge for video cards */}
                  {isVideo && (
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.85)', border: '1px solid var(--brand-gold)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                      <Play size={12} style={{ fill: 'var(--brand-gold)', color: 'var(--brand-gold)' }} />
                      <span style={{ fontSize: '0.68rem', fontWeight: 900, color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Video Highlight</span>
                    </div>
                  )}
                  
                  <div className="gallery-overlay">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="play-btn-circle" style={{ 
                        width: isVideo ? '64px' : '52px', 
                        height: isVideo ? '64px' : '52px', 
                        borderRadius: '50%', 
                        background: isVideo ? 'linear-gradient(135deg, #f97316, #eab308)' : 'linear-gradient(135deg, #10b981, #eab308)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        marginBottom: '12px',
                        boxShadow: '0 0 25px var(--shadow-color)',
                        color: '#000',
                        transition: 'all 0.3s'
                      }}>
                        {isVideo ? <Play size={26} style={{ fill: '#000', marginLeft: '3px' }} /> : <ImageIcon size={24} />}
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', textAlign: 'center', padding: '0 15px' }}>{media.title}</h4>
                    </div>
                  </div>
                </motion.div>
              );
            });
          })()}
        </motion.div>
      </section>

      {/* ─────────────── PACKAGES (LAYOUT 7: TIERED PRICING TABLE) ─────────────── */}
      <section id="packages" className="section-padding relative" style={{ background: 'var(--alt-bg)' }}>
        <GlowingBlobs />
        <div className="text-center relative z-10" style={{ marginBottom: '4.5rem' }}>
          <div className="badge" style={{ background: 'rgba(234, 179, 8, 0.1)', color: 'var(--brand-gold)', borderColor: 'rgba(234, 179, 8, 0.3)' }}>
            🪶 Booking Packages
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, marginBottom: '1.2rem' }}>
            Event <span className="radhe-logo-gradient">Setups &amp; Pricing</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto' }}>
            Select your preferred setup package. Custom sound &amp; pyro configurations available on request!
          </p>
        </div>

        <div className="packages-grid relative z-10">
          {siteData.packages.map((pkg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className={`glass-card package-card shimmer-card ${pkg.featured ? 'featured' : ''}`} 
              style={{ 
                display: 'flex', 
                flexDirection: 'column',
                background: 'var(--card-bg)',
                border: pkg.featured ? '2px solid var(--brand-orange)' : '1px solid var(--border-color)',
                boxShadow: pkg.featured ? '0 0 35px rgba(249, 115, 22, 0.2)' : '0 15px 35px var(--shadow-color)'
              }}
            >
              {pkg.featured && (
                <span className="pulse-glow-badge" style={{ background: 'linear-gradient(135deg, #f97316, #eab308)', color: '#000', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '3px', textTransform: 'uppercase', padding: '6px 16px', borderRadius: '100px', display: 'inline-block', marginBottom: '1.2rem', alignSelf: 'flex-start' }}>
                  ⭐ Royal Gold Featured Setup
                </span>
              )}
              <h4 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '4px', color: pkg.featured ? 'var(--brand-orange)' : 'var(--text-main)' }}>{pkg.name}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '1.8rem', textTransform: 'uppercase', letterSpacing: '2.5px', fontWeight: 800 }}>{pkg.level}</p>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '2.2rem' }}>
                {pkg.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--brand-orange)' }} />
                    </div>
                    <span style={{ fontWeight: 600 }}>{f}</span>
                  </div>
                ))}
              </div>
              
              <a
                href={`https://wa.me/${siteData.contact.whatsappRaw || '919428441400'}?text=${encodeURIComponent(`Hello Radhe DJ, I want to inquire about the ${pkg.name} package.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-royal"
                style={{ justifyContent: 'center', fontSize: '0.82rem', padding: '16px 18px', width: '100%' }}
              >
                <Phone size={16} /> Book Package via WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─────────────── TESTIMONIALS (LAYOUT 8: REVIEW CARDS) ─────────────── */}
      <section id="testimonials" className="section-padding relative" style={{ background: 'var(--deep-bg)' }}>
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <div className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--brand-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            🪶 Client Trust
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900 }}>
            What Our <span className="radhe-logo-gradient">Clients Say</span>
          </h2>
        </div>

        {siteData.googleReviewWidgetId ? (
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div className={`elfsight-app-${siteData.googleReviewWidgetId}`} data-elfsight-app-lazy></div>
          </div>
        ) : (
          <div className="testimonials-grid">
            {siteData.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, borderColor: 'rgba(249, 115, 22, 0.4)' }}
                className="glass-card testimonial-card shimmer-card"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '36px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(5)].map((_, idx) => <Star key={idx} size={18} fill="#eab308" color="#eab308" />)}
                  </div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand-emerald)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Verified Gujarat Event
                  </span>
                </div>
                
                <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.85, fontSize: '0.96rem' }}>"{t.text}"</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #eab308)', color: '#000', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem' }}>
                    {t.name ? t.name.charAt(0) : 'C'}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.05rem' }}>{t.name}</h4>
                    <p style={{ color: 'var(--brand-orange)', fontSize: '0.8rem', fontWeight: 700 }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ─────────────── FAQ (LAYOUT 9: ACCORDION LIST) ─────────────── */}
      <section className="section-padding relative" style={{ background: 'var(--alt-bg)' }}>
        <GlowingBlobs />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <div className="badge" style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--brand-orange)', borderColor: 'rgba(249, 115, 22, 0.3)' }}>
              🪶 Instant Answers
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, marginBottom: '1rem' }}>
              Frequently Asked <span className="radhe-logo-gradient">Questions</span>
            </h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {siteData.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`glass-card faq-item ${isOpen ? 'active' : ''}`}
                  style={{ 
                    padding: '0', 
                    cursor: 'pointer', 
                    background: 'var(--card-bg)',
                    border: isOpen ? '1px solid var(--brand-orange)' : '1px solid var(--border-color)',
                    boxShadow: isOpen ? '0 0 25px rgba(249, 115, 22, 0.18)' : 'none'
                  }}
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : i)}
                >
                  <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: isOpen ? 'rgba(249, 115, 22, 0.15)' : 'rgba(120, 120, 120, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <HelpCircle style={{ color: isOpen ? 'var(--brand-orange)' : 'var(--text-muted)', transition: 'color 0.3s' }} size={20} />
                      </div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: isOpen ? 'var(--text-main)' : 'var(--text-muted)' }}>{faq.q}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ color: isOpen ? 'var(--brand-orange)' : 'var(--text-muted)' }}
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
                        <div style={{ padding: '0 32px 32px 74px', borderTop: '1px solid var(--border-color)' }}>
                          <p style={{ color: 'var(--text-muted)', lineHeight: 1.85, fontSize: '0.98rem' }}>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT (LAYOUT 10: SPLIT CONTACT & FORM) ─────────────── */}
      <section id="contact" className="section-padding relative" style={{ background: 'var(--deep-bg)' }}>
        <div className="contact-grid">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 16px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--brand-emerald)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' }}>
              <span className="status-dot-active" /> Booking Open for 2026 Season
            </div>
            
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', marginBottom: '1.5rem', lineHeight: 1.15, fontWeight: 900 }}>
              Let's Plan Your <span className="radhe-logo-gradient">Grand Celebration</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '3rem', lineHeight: 1.9 }}>
              Have an upcoming Wedding, Garba, Sangeet, or Party? Contact Chintan Patel or Mehul Patel directly!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Address */}
              <div className="contact-info-item shimmer-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="contact-icon" style={{ background: 'rgba(249, 115, 22, 0.15)', color: 'var(--brand-orange)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1.05rem', color: 'var(--text-main)' }}>Visit Studio</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>{siteData.contact.address}</p>
                </div>
              </div>

              {/* Chintan */}
              <a href={`tel:${siteData.contact.chintanPhoneRaw}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item shimmer-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <div className="contact-icon" style={{ background: 'rgba(234, 179, 8, 0.15)', color: 'var(--brand-gold)' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1.05rem', color: 'var(--text-main)' }}>Chintan Patel</h4>
                    <p style={{ color: 'var(--brand-orange)', fontSize: '0.92rem', fontWeight: 800 }}>{siteData.contact.chintanPhone} (Click to Call)</p>
                  </div>
                </div>
              </a>

              {/* Mehul */}
              <a href={`tel:${siteData.contact.mehulPhoneRaw}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item shimmer-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <div className="contact-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--brand-emerald)' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1.05rem', color: 'var(--text-main)' }}>Mehul Patel</h4>
                    <p style={{ color: 'var(--brand-emerald)', fontSize: '0.92rem', fontWeight: 800 }}>{siteData.contact.mehulPhone} (Click to Call)</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a href={`mailto:${siteData.contact.email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="contact-info-item shimmer-card" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                  <div className="contact-icon" style={{ background: 'rgba(249, 115, 22, 0.15)', color: 'var(--brand-orange)' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, marginBottom: '4px', fontSize: '1.05rem', color: 'var(--text-main)' }}>Email Direct</h4>
                    <p style={{ color: 'var(--brand-orange)', fontSize: '0.92rem', fontWeight: 800 }}>{siteData.contact.email}</p>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card shimmer-card" 
            style={{ 
              padding: '44px', 
              background: 'var(--card-bg)',
              border: '1px solid var(--brand-orange)',
              boxShadow: '0 25px 60px var(--shadow-color)'
            }}
          >
            <h3 style={{ fontSize: '1.9rem', marginBottom: '0.5rem', fontWeight: 900, color: 'var(--text-main)' }}>Quick Event Inquiry</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>Fill in details below for instant booking response.</p>
            
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <input type="text" name="name" placeholder="Your Full Name" required onChange={handleInputChange} style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)' }} />
              <input type="tel" name="phone" placeholder="Phone Number (WhatsApp Preferred)" required onChange={handleInputChange} style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)' }} />
              <input type="text" name="event" placeholder="Event Type (e.g. Wedding, Sangeet, Garba, Party)" required onChange={handleInputChange} style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)' }} />
              <textarea name="message" placeholder="Event Location, Date, or Sound/Lighting Requests…" rows={4} required onChange={handleInputChange} style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)' }} />
              <button type="submit" className="btn-royal" style={{ justifyContent: 'center', marginTop: '0.5rem', width: '100%', fontSize: '0.85rem' }}>
                Submit Inquiry via Email &nbsp;<Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer style={{ background: 'var(--alt-bg)', borderTop: '1px solid var(--border-color)' }}>
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ width: '150px', height: '60px', marginBottom: '1.4rem' }}>
              <img
                src="/radhelogo.png"
                alt="Radhe DJ"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, fontSize: '0.92rem', maxWidth: '290px' }}>
              Elevating Gujarat celebrations with 20,000W sound, 3D laser lighting &amp; cold pyro special effects. Serving Keshod &amp; all Gujarat since 2010.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '14px', marginTop: '1.6rem' }}>
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
            <h5 className="footer-heading">Our Setup</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {siteData.services.slice(0, 6).map(s => (
                <li key={s.title}><a href="#services" className="footer-link">{s.title}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="footer-heading">Contact Direct</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a href={`tel:${siteData.contact.chintanPhoneRaw}`} className="footer-contact-row">
                <Phone size={16} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                <span>{siteData.contact.chintanPhone}</span>
              </a>
              <a href={`tel:${siteData.contact.mehulPhoneRaw}`} className="footer-contact-row">
                <Phone size={16} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                <span>{siteData.contact.mehulPhone}</span>
              </a>
              <a href={`mailto:${siteData.contact.email}`} className="footer-contact-row">
                <Mail size={16} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                <span>{siteData.contact.email}</span>
              </a>
              <div className="footer-contact-row" style={{ cursor: 'default' }}>
                <MapPin size={16} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
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
            style={{ color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem' }}
          >
            <Lock size={13} /> Admin Portal
          </p>

          <p style={{ color: 'var(--brand-orange)', fontWeight: 700 }}>Royal Sound &amp; Light Production</p>
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
              <ArrowUp size={22} />
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
                    onClick={() => {
                      setIsPasscodePromptOpen(false);
                      if (window.location.hash === '#admin') {
                        window.location.hash = '';
                      }
                      if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
                        window.history.pushState({}, '', '/');
                      }
                    }}
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
            <div className="admin-sidebar" style={{ width: '280px', background: '#070b1d', borderRight: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', flexDirection: 'column', flexShrink: 0, padding: '24px 0' }}>
              <div style={{ padding: '0 24px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '20px' }}>
                <h2 className="playfair" style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>
                  RADHE <span className="purple-gradient">DJ</span>
                </h2>
                <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)', padding: '5px 12px', borderRadius: '100px', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.62rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#fbbf24', marginTop: '10px' }}>
                  <Shield size={10} /> Admin Dashboard
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <div className="admin-sidebar-menu" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', padding: '0 12px' }}>
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
                  { id: 'djSongs', label: 'DJ Song Playlist', icon: 'Music' },
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
              <div className="admin-sidebar-bottom" style={{ padding: '20px 16px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                    if (window.location.hash === '#admin') {
                      window.location.hash = '';
                    }
                    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
                      window.history.pushState({}, '', '/');
                    }
                  }}
                  className="btn-glass admin-interactive"
                  style={{ width: '100%', padding: '10px', fontSize: '0.72rem', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.15)' }}
                >
                  <LogOut size={13} /> Exit Portal
                </button>
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div className="admin-workspace" style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#020617', overflow: 'hidden' }}>
              {/* Workspace Topbar */}
              <div className="admin-workspace-topbar" style={{ height: '80px', borderBottom: '1px solid rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', flexShrink: 0 }}>
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
              <div className="admin-workspace-content" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                
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
                    {/* Google Reviews Widget ID Configuration */}
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800, marginBottom: '16px' }}>Google Reviews Integration</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '20px' }}>
                        Enter your Elfsight Google Reviews Widget ID to display live Google reviews. If left blank, the website will automatically fall back to the dynamic testimonial cards configured below.
                      </p>
                      <div>
                        <label style={{ fontSize: '0.68rem', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Elfsight Widget ID</label>
                        <input
                          type="text"
                          value={draftData.googleReviewWidgetId || ''}
                          placeholder="e.g. bd770a68-968c-4511-aa5b-1210522569b0"
                          onChange={e => setDraftData(prev => ({ ...prev, googleReviewWidgetId: e.target.value }))}
                          style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '0.85rem' }}
                        />
                        <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', marginTop: '8px' }}>
                          Find your widget ID in the Elfsight dashboard. Leave this field empty to use manual testimonials instead.
                        </span>
                      </div>
                    </div>

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

                {/* TAB 9: DJ SONG PLAYLIST */}
                {adminTab === 'djSongs' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
                    <div className="glass-card" style={{ padding: '30px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 800 }}>🎵 DJ Song Playlist Manager</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newSong = { title: 'New Song', artist: 'Artist Name', url: '' };
                            setDraftData(prev => ({ ...prev, djSongs: [...(prev.djSongs || []), newSong] }));
                          }}
                          className="btn-royal admin-interactive"
                          style={{ padding: '8px 16px', fontSize: '0.78rem', gap: '6px' }}
                        >
                          <Plus size={14} /> Add New Song
                        </button>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px', lineHeight: 1.6 }}>
                        Add direct MP3/audio URLs here. These songs will appear in the DJ Mixer player on the website. Admin can add, reorder, or remove tracks anytime.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(draftData.djSongs || []).map((song, idx) => (
                          <div key={idx} style={{ background: 'rgba(13,21,48,0.5)', border: '1px solid rgba(249, 115, 22, 0.15)', borderRadius: '14px', padding: '18px', position: 'relative' }}>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (draftData.djSongs || []).filter((_, i) => i !== idx);
                                setDraftData(prev => ({ ...prev, djSongs: updated }));
                              }}
                              className="admin-interactive"
                              style={{ position: 'absolute', top: '14px', right: '14px', border: 'none', background: 'transparent', color: '#f43f5e', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', flexShrink: 0 }}>
                                <Music size={16} />
                              </div>
                              <span style={{ fontWeight: 800, fontSize: '0.88rem', color: '#e2e8f0' }}>Track #{idx + 1}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                              <div>
                                <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Song Title</label>
                                <input
                                  type="text"
                                  value={song.title}
                                  onChange={e => {
                                    const updated = [...(draftData.djSongs || [])];
                                    updated[idx].title = e.target.value;
                                    setDraftData(prev => ({ ...prev, djSongs: updated }));
                                  }}
                                  placeholder="e.g. Kesariya"
                                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#fff', fontSize: '0.8rem' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Artist / Album</label>
                                <input
                                  type="text"
                                  value={song.artist}
                                  onChange={e => {
                                    const updated = [...(draftData.djSongs || [])];
                                    updated[idx].artist = e.target.value;
                                    setDraftData(prev => ({ ...prev, djSongs: updated }));
                                  }}
                                  placeholder="e.g. Arijit Singh · Brahmastra"
                                  style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#94a3b8', fontSize: '0.8rem' }}
                                />
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>MP3 Audio URL (Direct link ending in .mp3)</label>
                              <input
                                type="url"
                                value={song.url}
                                onChange={e => {
                                  const updated = [...(draftData.djSongs || [])];
                                  updated[idx].url = e.target.value;
                                  setDraftData(prev => ({ ...prev, djSongs: updated }));
                                }}
                                placeholder="https://example.com/audio/song.mp3"
                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px', color: '#60a5fa', fontSize: '0.78rem', fontFamily: 'monospace' }}
                              />
                            </div>
                          </div>
                        ))}
                        {(draftData.djSongs || []).length === 0 && (
                          <p style={{ textAlign: 'center', color: '#475569', padding: '32px', fontSize: '0.9rem' }}>No songs yet. Click "Add New Song" to begin.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 10: SETTINGS (PASSCODE) */}
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
