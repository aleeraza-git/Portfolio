import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Github, Linkedin, ExternalLink, Calendar, MapPin, Award, Code, Database, Brain, Users, Trophy, GraduationCap, BookOpen, Briefcase, Star, ArrowRight, Download, ChevronDown, Globe, Sparkles, ChevronLeft, ChevronRight, Server, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from "axios";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Smooth scroll effect for all sections
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          section.classList.add('animate-fade-in');
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Projects carousel controls
  const updateCarouselScrollButtons = () => {
    const container = carouselRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scrollCarouselByViewport = (direction: 'left' | 'right') => {
    const container = carouselRef.current;
    if (!container) return;
    const amount = direction === 'left' ? -container.clientWidth : container.clientWidth;
    container.scrollBy({ left: amount, behavior: 'smooth' });
    // Schedule an update after the smooth scroll
    window.setTimeout(updateCarouselScrollButtons, 350);
  };

  useEffect(() => {
    updateCarouselScrollButtons();
    const container = carouselRef.current;
    if (!container) return;
    const handleScroll = () => updateCarouselScrollButtons();
    container.addEventListener('scroll', handleScroll, { passive: true });
    const handleResize = () => updateCarouselScrollButtons();
    window.addEventListener('resize', handleResize);
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement && (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') scrollCarouselByViewport('left');
      if (e.key === 'ArrowRight') scrollCarouselByViewport('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear any previous status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await axios.post('https://email-module.vercel.app/api/send-email', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(response.data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus({
        type: 'error',
        message: axios.isAxiosError(error) && error.response?.data?.error 
          ? error.response.data.error 
          : 'Failed to send message. Please try again or contact me directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: 'TCP/IP', level: 90, category: 'Networking' },
    { name: 'Routing Protocols (IGP & EGP)', level: 85, category: 'Networking' },
    { name: 'Switching', level: 88, category: 'Networking' },
    { name: 'Network Security', level: 86, category: 'Security' },
    { name: 'High Availability', level: 80, category: 'Networking' },
    { name: 'Troubleshooting', level: 90, category: 'Operations' },
    { name: 'Layer 3 VPN (IPSec)', level: 78, category: 'Security' },
    { name: 'Microsoft Azure', level: 75, category: 'Cloud' },
    { name: 'AWS Cloud', level: 70, category: 'Cloud' },
    { name: 'Virtualization', level: 78, category: 'Systems' },
    { name: 'Windows Server & AD', level: 82, category: 'Systems' },
    { name: 'Backup & M365', level: 80, category: 'Systems' },
    { name: 'Linux & Shell', level: 75, category: 'Systems' },
    { name: 'Fortinet/Palo Alto', level: 76, category: 'Firewalls' }
  ];

  // Projects section removed per user request

  const certifications = [
    'Google IT Support (Coursera)',
    'Google Cybersecurity Specialization (Coursera)',
    'Microsoft Certified: Azure Administrator Associate',
    'Fortinet NSE 1, 2, 3'
  ];

  const education: Array<{ degree: string; institution: string; duration: string; cgpa?: string; percentage?: string }> = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Agriculture, Peshawar, KPK',
      duration: 'Nov 2021 - Jun 2025',
      cgpa: '3.05/4.00'
    }
  ];

  const experience = [
    {
      position: 'Network Support Engineer',
      company: 'IMARAT',
      duration: '09/2025 – Current',
      location: 'Islamabad, ICT',
      description: 'Plan, deploy and maintain reliable network infrastructure across multiple office locations; configure Cisco PoE switches, UniFi APs, USG Pro 4 and FortiGate NGFWs; implement security best practices; design high-density UniFi Wi‑Fi; monitor, analyze and troubleshoot performance to reduce downtime; collaborate with IT for scalable deployments; document topologies, policies and procedures.',
      technologies: ['Cisco PoE Switches', 'UniFi APs/USG Pro 4', 'FortiGate NGFW', 'Wi‑Fi Design', 'Monitoring'],
      type: 'Full-time'
    },
    {
      position: 'Information Technology Intern',
      company: 'Graana.com',
      duration: '07/2025 – 09/2025',
      location: 'Lahore, Punjab',
      description: 'Troubleshot hardware, software and network issues for end users; monitored network performance; configured Ubiquiti USG, firewall policies and access controls; handled help desk tickets and technical resolutions; supported biometric device operations; assisted in infrastructure maintenance, optimization and QoS settings.',
      technologies: ['Ubiquiti USG', 'Firewalls & ACLs', 'Helpdesk', 'QoS', 'Windows'],
      type: 'Internship'
    },
    {
      position: 'IT Support & System Admin',
      company: 'Khired Networks',
      duration: '06/2025 – 07/2025',
      location: 'Lahore, Punjab',
      description: 'Managed and resolved ITAM tickets; delivered hands‑on support for laptops/desktops and peripherals; diagnosed hardware, software and network connectivity issues; collaborated with the IT team to maintain uptime and streamline daily operations.',
      technologies: ['ITAM', 'Windows', 'End‑User Support', 'Troubleshooting'],
      type: 'Internship'
    },
    {
      position: 'Network Operations Center (NOC) Intern',
      company: 'Nadra',
      duration: '07/2024 – 08/2024',
      location: 'Peshawar, KPK',
      description: 'Deployed and configured network for a new facility achieving 100% connectivity during setup; tested and troubleshot components, maintaining 99.9% operational uptime; organized racks and cabling for 30% space optimization; configured and troubleshot routers, switches and firewalls for a 15% security/performance gain; provided support to 30+ users with 95% satisfaction.',
      technologies: ['Routers', 'Switches', 'Firewalls', 'Racks & Cabling', 'Monitoring'],
      type: 'Internship'
    }
  ];

  const trainings: Array<{
    title: string;
    provider: string;
    location: string;
    duration: string;
    focusAreas: string[];
  }> = [
    {
      title: 'Cyber Security',
      provider: 'Corvit Systems Peshawar',
      location: 'Peshawar, KPK',
      duration: '03/2024 – 06/2024',
      focusAreas: [
        'Network Security',
        'Ethical Hacking',
        'Threat Detection',
        'Risk Management',
        'Security Protocols'
      ]
    },
    {
      title: 'Cloud Computing',
      provider: 'Corvit Systems Peshawar',
      location: 'Peshawar, KPK',
      duration: '05/2023 – 12/2023',
      focusAreas: [
        'AWS',
        'Azure',
        'Windows Server Administration',
        'VMware vSphere'
      ]
    },
    {
      title: 'Networking',
      provider: 'Corvit Systems Peshawar',
      location: 'Peshawar, KPK',
      duration: '05/2023 – 09/2023',
      focusAreas: [
        'CCNA',
        'CCNP Routing and Switching'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-900 text-white relative overflow-hidden">
      {/* Enhanced Earth and Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Earth Illustration */}
        <div 
          className="absolute w-96 h-96 opacity-20"
          style={{
            top: `${100 - scrollY * 0.3}px`,
            right: `${-100 + mousePosition.x * 0.02}px`,
            transform: `rotate(${scrollY * 0.1}deg) scale(${1 + scrollY * 0.0001})`
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-green-400/20 rounded-full animate-spin-slow">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400')] bg-cover bg-center rounded-full opacity-60 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/10 to-green-400/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Smaller Earth Elements */}
        <div 
          className="absolute w-32 h-32 opacity-15"
          style={{
            bottom: `${200 + scrollY * 0.2}px`,
            left: `${50 + mousePosition.y * 0.01}px`,
            transform: `rotate(${-scrollY * 0.15}deg)`
          }}
        >
          <Globe className="w-full h-full text-blue-400 animate-float-gentle" />
        </div>

        {/* Starfield Effect */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `translateY(${scrollY * (0.1 + Math.random() * 0.1)}px)`
              }}
            />
          ))}
        </div>

        {/* Enhanced Floating Orbs with Earth Theme */}
        <div 
          className="absolute w-32 h-32 bg-gradient-to-br from-blue-400/20 to-green-400/10 rounded-full blur-xl animate-pulse"
          style={{
            top: `${20 - scrollY * 0.1}px`,
            left: `${80 + mousePosition.x * 0.01}px`,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        
        <div 
          className="absolute w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-bounce"
          style={{
            top: `${160 - scrollY * 0.15}px`,
            right: `${128 + mousePosition.y * 0.01}px`,
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute w-20 h-20 bg-purple-400/15 rounded-full blur-md animate-pulse"
          style={{
            bottom: `${160 + scrollY * 0.1}px`,
            left: `${64 + mousePosition.x * 0.015}px`,
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute w-28 h-28 bg-pink-400/10 rounded-full blur-lg animate-bounce"
          style={{
            bottom: `${80 + scrollY * 0.12}px`,
            right: `${80 + mousePosition.y * 0.015}px`,
            animationDelay: '1.5s'
          }}
        ></div>
        <div 
          className="absolute w-16 h-16 bg-cyan-400/20 rounded-full blur-sm animate-pulse"
          style={{
            top: '50%',
            left: `${40 + mousePosition.x * 0.01}px`,
            transform: `translateY(${-50 + scrollY * 0.08}%)`,
            animationDelay: '2s'
          }}
        ></div>
      </div>

      {/* Smooth Scrolling Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
          scrollY > 50 ? 'bg-black/20 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
        style={{
          transform: `translateY(${scrollY > 50 ? '0' : scrollY * 0.5}px)`,
        }}
      >
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-xl font-bold animate-fade-in hover:text-cyan-400 transition-colors duration-300 flex items-center">
            <Server className="w-6 h-6 mr-2 text-cyan-400" />
            Ali Raza
          </div>
          <div className="hidden md:flex space-x-8">
            {['HOME', 'ABOUT','SKILLS', 'EXPERIENCE', 'CONTACT'].map((item, index) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 relative group smooth-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.toLowerCase())?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Enhanced Hero Section with Earth Theme */}
      <section id="home" className="relative z-10 px-6 py-32 scroll-section">
       <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="flex items-center space-x-2 mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <MapPin className="w-5 h-5 text-cyan-400 animate-pulse" />
                <span className="text-gray-300">Islamabad, Pakistan</span>
                <Wifi className="w-4 h-4 text-green-400" />
              </div>
              <h1 className="leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-2xl lg:text-3xl font-semibold mb-2 text-gray-300 hover:text-white transition-colors duration-300">
                  Network & Security Engineer
                </div>
                <div className="text-5xl lg:text-7xl font-bold text-blue-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-105 transform">
                  Ali Raza
                </div>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
                Dedicated network security professional with experience designing, deploying and safeguarding network infrastructures.
                Comfortable across routing/switching, VPNs, firewalls (Fortinet/Palo Alto), Windows Server/AD and Azure administration.
                Keen to contribute both operational excellence and technical expertise to resilient infrastructures. 🌍
              </p>
              <div className="flex space-x-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <a href="#contact">
                  <Button className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 px-8 py-3 hover:scale-105 transition-all duration-300 group">
                    HIRE ME
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </a>
                <a 
                 href="/ali_raza.pdf" 
                 download 
                 className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 hover:scale-105 transition-all duration-300 group flex items-center rounded-md"
                >
                 <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                 Download CV
                </a>
              </div>

            
            {/* Enhanced Earth-themed Floating Animation */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div 
                  className="w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-emerald-400/10 rounded-full blur-sm animate-pulse hover:scale-110 transition-all duration-500"
                  style={{
                    transform: `rotate(${scrollY * 0.1}deg) scale(${1 + mousePosition.x * 0.0001})`
                  }}
                ></div>
                <div 
                  className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 rounded-full animate-spin transition-all duration-500 group-hover:animate-pulse"
                  style={{ 
                    animationDuration: '20s',
                    transform: `scale(${1 + mousePosition.y * 0.0001})`
                  }}
                ></div>
                <div className="absolute top-20 left-20 w-40 h-40 bg-white/20 rounded-full flex items-center justify-center hover:rotate-12 transition-all duration-300">
                  <Server className="w-16 h-16 text-cyan-400 hover:text-emerald-400 transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm text-white/60 mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-white/60" />
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className="relative z-10 px-6 py-20 scroll-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-blue-400 transition-colors duration-300 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 mr-3" />
            Training
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainings.map((t, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 group hover:-translate-y-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors duration-300">{t.title}</h3>
                  <p className="text-blue-400 mb-1">{t.provider}</p>
                  <p className="text-gray-400 text-sm mb-1">{t.location}</p>
                  <p className="text-gray-400 text-sm mb-3">{t.duration}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.focusAreas.map((fa, i) => (
                      <Badge key={i} variant="outline" className="border-white/30 text-white/80 text-xs hover:scale-105 transition-all duration-300">
                        {fa}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section 
        id="about" 
        className="relative z-10 px-6 py-20 scroll-section"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="relative group">
                <div 
                  className="w-96 h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/20 rounded-full flex items-center justify-center hover:scale-105 transition-all duration-500"
                  style={{
                    transform: `rotate(${scrollY * 0.05}deg)`
                  }}
                >
                  <div 
                    className="w-64 h-64 bg-gradient-to-br from-blue-500/40 to-indigo-600/30 rounded-full flex items-center justify-center hover:rotate-6 transition-all duration-300"
                  >
                    <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                      <Brain className="w-24 h-24 text-blue-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <h2 className="text-4xl font-bold mb-6 text-blue-400 hover:text-cyan-400 transition-colors duration-300">About Me</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-300 hover:text-white transition-colors duration-300">
                I'm Ali Raza, a network and security engineer focused on building reliable, secure and high-availability infrastructures.
                I have hands-on experience across routing, switching, VPNs, firewalls, NOC operations, Windows Server/AD and Azure administration.
                I enjoy turning complex operational requirements into stable, well-documented solutions.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-300 hover:text-white transition-colors duration-300">
                Recent experience includes NOC monitoring and incident response, enterprise network deployments and hardening,
                and systems administration for Windows Server and Microsoft 365 environments.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 hover:scale-105 transition-all duration-300 hover:bg-blue-600/30">
                  <Award className="w-4 h-4 mr-2" />
                  Microsoft Learn Student Ambassador (Volunteer)
                </Badge>
              </div>

            </div>
          </div>
        </div>
      </section>

      
      {/* Enhanced Skills Section */}
      <section 
        id="skills" 
        className="relative z-10 px-6 py-20 scroll-section"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-cyan-400 transition-colors duration-300">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </span>
                  <Badge 
                    variant="outline" 
                    className="border-white/30 text-white/80 text-xs group-hover:scale-105 transition-all duration-300"
                  >
                    {skill.category}
                  </Badge>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 hover:from-cyan-400 hover:to-emerald-500"
                    style={{ 
                      width: `${skill.level}%`,
                      transform: `scaleX(${scrollY > 1000 ? 1 : scrollY / 1000})`
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {skill.level}% Proficiency
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience" 
        className="relative z-10 px-6 py-20 scroll-section"
        style={{
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-cyan-400 transition-colors duration-300">Professional Experience</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experience.map((exp, index) => (
              <Card 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-500 group hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transform: `translateY(${scrollY * 0.02}px)`
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-green-600/20 text-green-300 border-green-600/30 group-hover:scale-110 transition-all duration-300">
                      {exp.type}
                    </Badge>
                    <Calendar className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {exp.position}
                  </h3>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span className="text-cyan-400 font-medium">{exp.company}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">{exp.location}</span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{exp.duration}</p>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline" 
                        className="border-white/30 text-white/80 text-xs hover:scale-105 transition-all duration-300 hover:border-green-400/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative z-10 px-6 py-20 scroll-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 mr-3" />
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 group hover:-translate-y-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors duration-300">{edu.degree}</h3>
                  <p className="text-cyan-400 mb-2">{edu.institution}</p>
                  <p className="text-gray-400 text-sm mb-2">{edu.duration}</p>
                  <p className="text-green-400 font-semibold">
                    {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Leadership Section */}
      <section className="relative z-10 px-6 py-20 scroll-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-cyan-400 transition-colors duration-300 flex items-center justify-center">
            <Trophy className="w-8 h-8 mr-3" />
            Achievements & Certifications
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center text-yellow-400">
                <Award className="w-6 h-6 mr-3" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 group hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-3 text-cyan-400 group-hover:text-yellow-400 transition-colors duration-300" />
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{cert}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Leadership & Community */}
            <div>
              <h3 className="text-2xl font-semibold mb-8 flex items-center text-green-400">
                <Users className="w-6 h-6 mr-3" />
                Volunteering
              </h3>
              <div className="space-y-4">
               
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300 group hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-purple-400 group-hover:text-green-400 transition-colors duration-300 mb-2"> MLSA Ambassador - Microsoft</h4>
                    <ul className="list-disc ml-5 text-gray-300 text-sm space-y-2">
                      <li>Mentored over 50 students, leading to a 40% increase in engagement in technical workshops.</li>
                      <li>Organized 10+ workshops and webinars; fostered a collaborative tech community with 80% attendee satisfaction.</li>
                      <li>Promoted Microsoft technologies via interactive learning, attracting 150+ participants.</li>
                      <li>Collaborated with global student ambassadors and industry experts to share knowledge and best practices.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 px-6 py-20 scroll-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Contact Info */}
            <div className="lg:w-1/2">
              <div className="relative mb-8">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Mail className="w-24 h-24 mx-auto mb-4 text-blue-400" />
                    <div className="w-32 h-4 bg-white/10 rounded mx-auto mb-2"></div>
                    <div className="w-20 h-4 bg-white/10 rounded mx-auto"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">Get in touch</h3>
                <p className="text-gray-300 mb-6">
                  I'm always open to discussing new opportunities, collaborations, or just having a chat about technology. 
                  Feel free to reach out through any of the channels below.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span>aleeraza665@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin  className="w-5 h-5 text-cyan-400" />
                    <a href="#" className="hover:text-cyan-400 transition-colors">
                    linkedin.com/in/aleeraza-ar
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>Islamabad, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}

 
            <div className="lg:w-1/2">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-blue-400">Send me a message</h3>
                  
                  {/* Status Message */}
                  {submitStatus.message && (
                    <div className={`mb-4 p-4 rounded-lg border ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-500/20 border-green-500/30 text-green-300' 
                        : 'bg-red-500/20 border-red-500/30 text-red-300'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      disabled={isSubmitting}
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      disabled={isSubmitting}
                    />
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      disabled={isSubmitting}
                    />
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer 
        className="relative z-10 px-6 py-12 border-t border-white/20 scroll-section"
        style={{
          transform: `translateY(${scrollY * 0.02}px)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-8 mb-6 md:mb-0">
              {['Home', 'About', 'Skills', 'Experience', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-cyan-400 transition-all duration-300 hover:scale-110 relative group smooth-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.toLowerCase())?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-cyan-700 rounded-full flex items-center justify-center hover:bg-cyan-800 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center">
              © 2025 Ali Raza. All rights reserved. • Built with React & Tailwind CSS 
              <Globe className="w-4 h-4 ml-2 text-green-400 animate-spin-slow" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
