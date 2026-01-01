import { useEffect, useRef, useState } from 'react';
import '../styles/index.css';
import './App.css';
// import gskLogo from 'figma:asset/05887adf2d1e93c43d8bd76c2d887ff218f11f25.png';
// import heroTruck from 'figma:asset/ca45c6897a1a3b64724054997bc755e3e86de009.png';
// import dryVanTrailer from 'figma:asset/9d5e9797d8f661b52eca808842b4166451abafac.png';
// import reeferTrailer from 'figma:asset/8944eb0a79213c952bda45d8c7429d45cd9b3836.png';
// import intermodalContainers from 'figma:asset/869cf340de0823b07756297596e25e2cb48a2000.png';
// import fleetAerial from 'figma:asset/608c6bf4595b9fcd373a3d42293857a71b1f56e0.png';
// import usaFlag from 'figma:asset/c2a08286a7371a68d2afeb46c72ca7926bde9b7f.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FleetSlider from './components/FleetSlider';

export default function App() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    pickup: '',
    drop: '',
    notes: ''
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const [countersAnimated, setCountersAnimated] = useState(false);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animated counters
  useEffect(() => {
    const counters = [
      { id: 'counter-1', target: 99, suffix: '%' },
      { id: 'counter-2', target: 24, suffix: '/7' },
      { id: 'counter-3', target: 100, suffix: '%' },
      { id: 'counter-4', target: 1619229, prefix: 'MC#' }
    ];

    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          setCountersAnimated(true);
          counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (element) {
              animateCounter(element, counter);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersAnimated]);

  const animateCounter = (element: HTMLElement, config: any) => {
    const duration = 2000;
    const startTime = performance.now();
    const start = 0;
    const end = config.target;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * (end - start) + start);

      if (config.prefix) {
        element.textContent = `${config.prefix}${current.toLocaleString()}`;
      } else {
        element.textContent = `${current}${config.suffix || ''}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // Smooth scroll
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  // Form handling
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="app">
      {/* Navigation */}
      <header className={`nav ${headerScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/images/logo.jpeg" alt="GSK Freight Lines Logo" />
            <span className="logo-subtext">Freight Lines</span>
          </div>
          
          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <button className="nav-link" onClick={() => scrollToSection('services')}>Services</button>
            <button className="nav-link" onClick={() => scrollToSection('fleet')}>Fleet</button>
            <button className="nav-link" onClick={() => scrollToSection('why')}>Why Us</button>
            <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
            <button className="nav-cta" onClick={() => scrollToSection('contact')}>Get Quote</button>
          </nav>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-background">
          <img src="/images/hero.png" alt="American Container Truck" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content-wrapper reveal">
            <div className="hero-text-content">
              <div className="hero-badge-modern">
                <div className="badge-dot"></div>
                <span>MC #1619229 • DOT Certified</span>
              </div>
              
              <h1 className="hero-title-modern">
                Reliable<br/>
                <span className="hero-title-accent">Intermodal</span><br/>
                Transportation
              </h1>
              
              <p className="hero-subtitle-modern">
                Dry van, refrigerated, and intermodal solutions serving Union City, CA locally and all 48 states nationwide.<br/>
                Professional logistics with 99% on-time delivery.
              </p>

              <div className="hero-cta-group">
                <button className="btn-hero primary" onClick={() => scrollToSection('contact')}>
                  Request Quote
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <button className="btn-hero secondary" onClick={() => scrollToSection('services')}>
                  View Services
                </button>
              </div>
            </div>

            <div className="hero-info-cards">
              <div className="info-card reveal">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="info-text">
                  <div className="info-label">24/7</div>
                  <div className="info-value">Available</div>
                </div>
              </div>

              <div className="info-card reveal">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="info-text">
                  <div className="info-label">Expert</div>
                  <div className="info-value">Team</div>
                </div>
              </div>

              <div className="info-card reveal">
                <div className="info-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="info-text">
                  <div className="info-label">99%</div>
                  <div className="info-value">On-Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos Slider */}
      <section className="logos-section">
        <div className="logos-container">
          <p className="logos-label">Fully Operational • Serving All 48 States • 24/7 Dispatch Available</p>
          <Slider
            dots={false}
            infinite={true}
            speed={3000}
            slidesToShow={5}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={0}
            cssEase="linear"
            pauseOnHover={true}
            arrows={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                }
              }
            ]}
          >
            <div className="logo-slide">
              <div className="logo-item">BNSF Railway</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">Union Pacific</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">TraPac</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">Evergreen</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">Maersk</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">COSCO</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">CMA CGM</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">MSC</div>
            </div>
            <div className="logo-slide">
              <div className="logo-item">OICT</div>
            </div>
          </Slider>
        </div>
      </section>

      {/* Services */}
      <section className="section-modern" id="services">
        <div className="section-container">
          <div className="section-header reveal">
            <div className="section-label">What We Offer</div>
            <h2 className="section-heading">
              Complete <span className="gradient-text">Trucking Solutions</span>
            </h2>
            <p className="section-subheading">
              Dry van, refrigerated, and intermodal services — Local Union City and nationwide to all 48 states
            </p>
          </div>

          <div className="services-modern-grid">
            <div className="service-modern-card reveal">
              <div className="service-image">
                <img src="/images/dryvan.png" alt="Dry Van Services" />
                <div className="service-icon-badge">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="10" width="24" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="10" cy="26" r="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="22" cy="26" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4 10L6 6H26L28 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <div className="service-content">
                <h3>Dry Van Services</h3>
                <p>Standard enclosed trailers for general freight. Local Union City delivery and long-haul to all 48 states.</p>
              </div>
            </div>

            <div className="service-modern-card reveal">
              <div className="service-image">
                <img src="/images/reeferTrailer.png" alt="Refrigerated Services" />
                <div className="service-icon-badge">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 12V20M12 16H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="10" cy="26" r="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="22" cy="26" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="service-content">
                <h3>Refrigerated (Reefer)</h3>
                <p>Temperature-controlled trailers for perishable goods. Reliable cold chain management nationwide.</p>
              </div>
            </div>

            <div className="service-modern-card reveal">
              <div className="service-image">
                <img src={"/images/intermodalContainers.png"} alt="Intermodal Services" />
                <div className="service-icon-badge">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                    <path d="M4 20H28M4 20V8H20L24 12V20M4 20H2M28 20H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="23" cy="24" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div className="service-content">
                <h3>Intermodal Drayage</h3>
                <p>Rail container transport and port drayage. Cost-effective long-haul with first/last-mile delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="section-modern dark" id="fleet">
        <div className="section-container">
          <div className="fleet-glance-layout">
            <div className="fleet-glance-content reveal">
              <div className="fleet-badge">OUR FLEET</div>
              <h2 className="fleet-glance-headline">
                Reliable Equipment.<br/>
                <span className="fleet-glance-accent">Ready Nationwide.</span>
              </h2>
              <p className="fleet-glance-subheading">
                A modern fleet built to move dry, refrigerated, and intermodal freight safely and on time.
              </p>

              <div className="fleet-stats-row">
                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div className="fleet-stat-label">24/7 GPS Tracking</div>
                </div>

                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="fleet-stat-label">ELD Compliant</div>
                </div>

                <div className="fleet-stat-card">
                  <div className="fleet-stat-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="9" y1="15" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div className="fleet-stat-label">Late-Model Equipment</div>
                </div>
              </div>
            </div>

            <div className="fleet-glance-visual reveal">
              <div className="usa-flag-container">
                <div className="flag-wave">
                  <img src={"/images/usaFlag.png"} alt="USA Flag" className="usa-flag" />
                </div>
              </div>
              
              <div className="fleet-service-cards">
                <div className="fleet-service-mini-card">
                  <div className="fleet-service-mini-icon">🚚</div>
                  <div className="fleet-service-mini-text">
                    <div className="fleet-service-mini-title">Dry Van</div>
                    <div className="fleet-service-mini-desc">General Freight</div>
                  </div>
                </div>

                <div className="fleet-service-mini-card">
                  <div className="fleet-service-mini-icon">❄️</div>
                  <div className="fleet-service-mini-text">
                    <div className="fleet-service-mini-title">Reefer</div>
                    <div className="fleet-service-mini-desc">Temperature Controlled</div>
                  </div>
                </div>

                <div className="fleet-service-mini-card">
                  <div className="fleet-service-mini-icon">📦</div>
                  <div className="fleet-service-mini-text">
                    <div className="fleet-service-mini-title">Intermodal</div>
                    <div className="fleet-service-mini-desc">Port & Rail Drayage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-modern" id="why">
        <div className="section-container">
          <div className="section-header reveal">
            <div className="section-label">Why GSK Freight</div>
            <h2 className="section-heading">
              Built on <span className="gradient-text">Trust & Performance</span>
            </h2>
          </div>

          <div className="why-modern-grid">
            <div className="why-card reveal">
              <div className="why-icon">⚡</div>
              <h3>On-Time Performance</h3>
              <p>99% on-time delivery rate with proactive communication</p>
            </div>

            <div className="why-card reveal">
              <div className="why-icon">📡</div>
              <h3>Real-Time Tracking</h3>
              <p>Full visibility into your shipment status 24/7</p>
            </div>

            <div className="why-card reveal">
              <div className="why-icon">🛡️</div>
              <h3>Safety First</h3>
              <p>FMCSA compliant with comprehensive insurance</p>
            </div>

            <div className="why-card reveal">
              <div className="why-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Dedicated dispatch team available around the clock</p>
            </div>

            <div className="why-card reveal">
              <div className="why-icon">✅</div>
              <h3>Reliable Service</h3>
              <p>Consistent, dependable freight solutions you can trust</p>
            </div>

            <div className="why-card reveal">
              <div className="why-icon">🎯</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees, clear communication every step</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-modern contact-section" id="contact">
        <div className="section-container">
          <div className="section-header reveal">
            <div className="section-label">Get in Touch</div>
            <h2 className="section-heading">
              Let's Move Your
              <span className="gradient-text">Freight</span>
            </h2>
            <p className="section-subheading">
              Contact us today for a competitive quote and professional service
            </p>
          </div>

          <div className="contact-simple-grid">
            <div className="contact-simple-card reveal">
              <div className="contact-simple-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M27 13C27 21 16 30 16 30C16 30 5 21 5 13C5 7 10 3 16 3C22 3 27 7 27 13Z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="16" cy="13" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Address</h3>
              <p>4516 Mackinaw St<br/>Union City, CA 94587</p>
            </div>

            <div className="contact-simple-card reveal">
              <div className="contact-simple-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M3 5H10L13 13L9 16C11 20 15 24 19 26L22 22L30 25V32C30 32.5523 29.5523 33 29 33C13.5359 33 1 20.4641 1 5C1 4.44772 1.44772 4 2 4H3Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Phone</h3>
              <p><a href="tel:+15109894788">+1 (510) 989-4788</a></p>
            </div>

            <div className="contact-simple-card reveal">
              <div className="contact-simple-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="3" y="7" width="26" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10L16 17L29 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Email</h3>
              <p><a href="mailto:info@gskfreightlines.com">info@gskfreightlines.com</a></p>
            </div>

            <div className="contact-simple-card reveal">
              <div className="contact-simple-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3L5 11V27H11V19H21V27H27V11L16 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>MC Number</h3>
              <p>MC#1619229</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-modern">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo.jpeg" alt="GSK Freight Lines Logo\" />
            </div>
            <p>Professional freight solutions you can trust.</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Services</h4>
              <button onClick={() => scrollToSection('services')}>Dry Van</button>
              <button onClick={() => scrollToSection('services')}>Refrigerated (Reefer)</button>
              <button onClick={() => scrollToSection('services')}>Intermodal Drayage</button>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <button onClick={() => scrollToSection('fleet')}>Our Fleet</button>
              <button onClick={() => scrollToSection('why')}>Why Us</button>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>
              <p>4516 Mackinaw St<br/>Union City, CA 94587</p>
              <p><a href="tel:+15109894788">(510) 989-4788</a></p>
              <p><a href="mailto:info@gskfreightlines.com">info@gskfreightlines.com</a></p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GSK Freight Lines Inc. All rights reserved. | MC#1619229</p>
        </div>
      </footer>
    </div>
  );
}