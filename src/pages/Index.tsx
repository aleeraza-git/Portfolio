import { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, ExternalLink, Calendar, MapPin, Award, Code, Database, Brain, Users, Trophy, GraduationCap, BookOpen, Briefcase, Star, ArrowRight, Download, ChevronDown, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const skills = [
    { name: 'Python', level: 90, category: 'Programming' },
    { name: 'AI/ML', level: 85, category: 'AI' },
    { name: 'Java Spring Boot', level: 80, category: 'Backend' },
    { name: 'C++', level: 85, category: 'Programming' },
    { name: 'MySQL', level: 75, category: 'Database' },
    { name: 'HTML/CSS/JS', level: 80, category: 'Frontend' },
    { name: 'OpenCV', level: 75, category: 'Computer Vision' },
    { name: 'Django', level: 70, category: 'Framework' }
  ];

  const projects = [
    {
      title: 'Infectious Disease Prediction & Hotspot Analysis',
      duration: 'Nov 2024 - Jan 2025',
      description: 'Django-based web app using unsupervised autoencoder model and Apriori algorithm for disease hotspot prediction.',
      technologies: ['Python', 'TensorFlow', 'Django', 'Pandas', 'HTML/CSS'],
      type: 'AI/ML',
      githubLink:'https://github.com/MariaSultanBahoo/Infectious-Disease-Prediction-Hotspot-Analysis'
    },
    {
      title: 'RAG on SQL Database',
      duration: 'June 2025 - In Progress',
      description: 'RAG pipeline using Gemini embeddings and FAISS for intelligent database querying with natural language.',
      technologies: ['Python', 'SQLite', 'FAISS', 'Gemini API', 'Streamlit'],
      type: 'AI/NLP'
    },
    {
      title: 'Real-time Sign Language Recognition',
      duration: 'April 2025 - May 2025',
      description: 'ESP32-CAM system with OpenCV for real-time sign language gesture recognition and text conversion.',
      technologies: ['ESP32-CAM', 'OpenCV', 'Python', 'Tkinter'],
      type: 'IoT/CV',
      githubLink:'https://github.com/MariaSultanBahoo/-Real-Time-Sign-Language-Recognition-using-ESP32-CAM-OpenCV'
    }
  ];

  const certifications = [
    'Python Essentials (CISCO Networking Academy)',
    'Basics of DataScience (Cambridge International)',
    'Python Programming (OpenWeaver)',
    'HTML/CSS Fundamentals (OpenWeaver)'
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'Fatima Jinnah Women University, Rawalpindi',
      duration: 'Nov 2022 - Present',
      cgpa: '3.45'
    },
    {
      degree: 'Intermediate in Computer Science',
      institution: 'Global College System, Rawalpindi',
      duration: 'July 2020 - July 2022',
      percentage: '84%'
    },
    {
      degree: 'Matriculation in Computer Science',
      institution: 'F.G Girls Public High School, Rawalpindi',
      duration: 'Oct 2017 - July 2020',
      percentage: '86%'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
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
          <div className="text-xl font-bold animate-fade-in hover:text-blue-400 transition-colors duration-300 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-blue-400" />
            Maria Sultan
          </div>
          <div className="hidden md:flex space-x-8">
            {['HOME', 'About', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item, index) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="hover:text-blue-400 transition-all duration-300 hover:scale-110 relative group smooth-scroll"
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
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
                <MapPin className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="text-gray-300">Rawalpindi, Pakistan</span>
                <Globe className="w-4 h-4 text-green-400 animate-spin-slow" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <span className="inline-block hover:scale-105 transition-transform duration-300">Software Engineer</span><br />
                <span className="text-blue-400 inline-block hover:scale-105 transition-transform duration-300 hover:text-cyan-400">Maria Sultan</span><br />
                <span className="inline-block hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">AI & Tech Enthusiast</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
                Passionate about AI, Machine Learning, and Software Development. 
                Currently pursuing Software Engineering with hands-on experience in 
                deep learning, LLMs, and embedded systems. 🌍
              </p>
              <div className="flex space-x-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 hover:scale-105 transition-all duration-300 group">
                  HIRE ME
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-3 hover:scale-105 transition-all duration-300 group"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  Download CV
                </Button>
              </div>
            </div>
            
            {/* Enhanced Earth-themed Floating Animation */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div 
                  className="w-80 h-80 bg-gradient-to-br from-blue-400/20 to-green-400/10 rounded-full blur-sm animate-pulse hover:scale-110 transition-all duration-500"
                  style={{
                    transform: `rotate(${scrollY * 0.1}deg) scale(${1 + mousePosition.x * 0.0001})`
                  }}
                ></div>
                <div 
                  className="absolute top-10 left-10 w-60 h-60 bg-gradient-to-br from-green-400/30 to-blue-400/20 rounded-full animate-spin transition-all duration-500 group-hover:animate-pulse"
                  style={{ 
                    animationDuration: '20s',
                    transform: `scale(${1 + mousePosition.y * 0.0001})`
                  }}
                ></div>
                <div className="absolute top-20 left-20 w-40 h-40 bg-white/20 rounded-full flex items-center justify-center hover:rotate-12 transition-all duration-300">
                  <Globe className="w-16 h-16 text-blue-400 hover:text-green-400 transition-colors duration-300" />
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
                I'm Maria Sultan, a Software Engineering student with practical exposure to AI, 
                embedded systems, and software development. I completed an AI internship at NESCOM, 
                where I gained hands-on experience with deep learning, LLMs, and RAG systems.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-300 hover:text-white transition-colors duration-300">
                My projects include RAG-based query systems using Gemini embeddings and FAISS, 
                and an ESP32-CAM Sign Language to Text Converter using OpenCV and Python. 
                I'm passionate about applying AI to solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 hover:scale-105 transition-all duration-300 hover:bg-blue-600/30">
                  <Award className="w-4 h-4 mr-2" />
                  BETA MLSA - Microsoft
                </Badge>
                <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30 hover:scale-105 transition-all duration-300 hover:bg-purple-600/30">
                  <Users className="w-4 h-4 mr-2" />
                  Youth Empowerment Cofounder
                </Badge>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 group">
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section 
        id="projects" 
        className="relative z-10 px-6 py-20 scroll-section"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-blue-400 transition-colors duration-300">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
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
                    <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 group-hover:scale-110 transition-all duration-300">
                      {project.type}
                    </Badge>
                    <Calendar className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{project.duration}</p>
                  <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-white transition-colors duration-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline" 
                        className="border-white/30 text-white/80 text-xs hover:scale-105 transition-all duration-300 hover:border-blue-400/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <a 
                   href={project.githubLink} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                    className="w-full"
                   >
                   <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-white/30 text-white hover:bg-white hover:text-black group-hover:scale-105 transition-all duration-300"
                   >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                   </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
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
          <h2 className="text-4xl font-bold text-center mb-16 hover:text-blue-400 transition-colors duration-300">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold group-hover:text-blue-400 transition-colors duration-300">
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
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 hover:from-cyan-400 hover:to-blue-500"
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

      {/* Education & Experience Section */}
      <section className="relative z-10 px-6 py-20 scroll-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-blue-400 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{edu.degree}</h3>
                      <p className="text-blue-400 mb-2">{edu.institution}</p>
                      <p className="text-gray-400 text-sm mb-2">{edu.duration}</p>
                      <p className="text-green-400 font-semibold">
                        {edu.cgpa ? `CGPA: ${edu.cgpa}` : `Percentage: ${edu.percentage}`}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications & Leadership */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-blue-400 flex items-center">
                <Trophy className="w-8 h-8 mr-3" />
                Achievements
              </h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:scale-105 transition-all duration-300">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-3 text-blue-400" />
                        <span className="text-gray-300">{cert}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-400" />
                  Leadership & Community
                </h3>
                <div className="space-y-3">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-blue-400">AI Intern - NESCOM</h4>
                      <p className="text-sm text-gray-400 mb-2">April 2025 - June 2025</p>
                      <p className="text-gray-300 text-sm">Deep learning, LLMs, and RAG system implementation</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:scale-105 transition-all duration-300">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-purple-400">BETA MLSA - Microsoft</h4>
                      <p className="text-gray-300 text-sm">Student Ambassador facilitating tech community collaboration</p>
                    </CardContent>
                  </Card>
                </div>
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
                <h3 className="text-2xl font-bold mb-6 text-blue-400">Get in touch</h3>
                <p className="text-gray-300 mb-6">
                  I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and AI. 
                  Feel free to reach out through any of the channels below.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>+92 317 5268645</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <span>sultanmaria940@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-blue-400" />
                    <a href="https://github.com/MariaSultanBahoo" className="hover:text-blue-400 transition-colors">
                      github.com/MariaSultanBahoo
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span>Rawalpindi, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-1/2">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-blue-400">Send me a message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <textarea
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Send Message
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
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-blue-400 transition-all duration-300 hover:scale-110 relative group smooth-scroll"
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
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-1">
                <Github className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-1">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-all duration-300 cursor-pointer hover:scale-110 hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-white/10">
            <p className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center">
              © 2025 Maria Sultan. All rights reserved. • Built with React & Tailwind CSS 
              <Globe className="w-4 h-4 ml-2 text-green-400 animate-spin-slow" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
