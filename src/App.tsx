import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, Pause, Play, X } from 'lucide-react'
import { site } from './data/site'

const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Aurex Technovation, I would like to discuss a project.')}`

const services = [
  {
    number: '01',
    title: 'Web development',
    description: 'Responsive websites and custom web experiences, engineered to make your next step clear.',
    details: 'BUSINESS SITES · WEB PLATFORMS · UI ENGINEERING',
    image: '/services/web-development.jpg',
  },
  {
    number: '02',
    title: 'App development',
    description: 'Useful mobile and web apps shaped around the way your customers and teams work.',
    details: 'MOBILE APPS · WEB APPS · PRODUCT ENGINEERING',
    image: '/services/app-development.jpg',
  },
  {
    number: '03',
    title: 'Video editing',
    description: 'Polished edits for brand stories, product launches, social media, and campaigns.',
    details: 'BRAND FILMS · SOCIAL VIDEO · POST-PRODUCTION',
    image: '/services/video-editing.jpg',
  },
  {
    number: '04',
    title: 'E-commerce websites',
    description: 'Product-first online stores with clear discovery and a smooth path to checkout.',
    details: 'ONLINE STORES · PRODUCT CATALOGUES · CHECKOUT',
    image: '/services/ecommerce.jpg',
  },
  {
    number: '05',
    title: 'Chatbots & automation',
    description: 'Helpful chat experiences for customer questions, lead capture, and everyday tasks.',
    details: 'CUSTOMER SUPPORT · LEAD FLOWS · AUTOMATION',
    image: '/services/chatbots.jpg',
  },
]

const projects = [
  { name: 'EduBridge', type: 'Education platform', image: '/projects/edubridge.png', alt: 'EduBridge education workspace sign-in and dashboard', description: 'An institution-first workspace bringing attendance, academics, campus updates, and family communication together.', services: 'EDTECH · DASHBOARDS · COMMUNICATION' },
  { name: 'Ahirat Perfumery', type: 'Fragrance brand', image: '/projects/ahirat-perfumery.png', alt: 'Ahirat Perfumery product website hero', description: 'An expressive digital storefront presenting a handcrafted fragrance collection through a distinct luxury identity.', services: 'BRAND EXPERIENCE · PRODUCT STORYTELLING' },
  { name: 'Manas Wellness', type: 'Ayurveda & wellness', image: '/projects/manas-wellness.png', alt: 'Manas Wellness Ayurveda website hero', description: 'A calm wellness experience showcasing Ayurvedic blends with clear product discovery and a nature-led visual system.', services: 'WELLNESS · E-COMMERCE · RESPONSIVE DESIGN' },
  { name: 'Shubh Sanket', type: 'Real estate & civil contractors', image: '/projects/shubh-sanket.png', alt: 'Shubh Sanket real estate and civil contractors website hero', description: 'A confident online presence for property and construction services, with a direct path to request a consultation.', services: 'REAL ESTATE · CONSTRUCTION · LEAD GENERATION' },
]

const trustPoints = [
  { title: 'Responsive by design', detail: 'A considered experience on every screen.' },
  { title: 'Clear delivery', detail: 'Defined scope, milestones, and communication.' },
  { title: 'Built to grow', detail: 'Thoughtful foundations for what comes next.' },
]

const metrics = [
  { value: 100, label: 'New enquiries' },
  { value: 15, label: 'Ongoing projects' },
  { value: 35, label: 'Projects delivered' },
]

function AnimatedMetric({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0)
  const metricRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = metricRef.current
    if (!element) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      setCount(value)
      return
    }

    let animationFrame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const startedAt = performance.now()
      const duration = 1400
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.round(value * eased))
        if (progress < 1) animationFrame = window.requestAnimationFrame(animate)
      }
      animationFrame = window.requestAnimationFrame(animate)
    }, { threshold: 0.35 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(animationFrame)
    }
  }, [value])

  return (
    <div className="metric" ref={metricRef} role="group" aria-label={`${value}+ ${label}`}>
      <div className="metric-value" aria-hidden="true">{count}<span>+</span></div>
      <p>{label}</p>
    </div>
  )
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Aurex Technovation home">
      <span className="brand-symbol" aria-hidden="true"><img src="/aurex-logo-source.png" alt="" /></span>
      <span className="brand-name"><strong>AUREX</strong><small>TECHNOVATION</small></span>
    </a>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState(0)
  const [isServiceSlideshowPlaying, setIsServiceSlideshowPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const workTrackRef = useRef<HTMLDivElement>(null)
  const closeMenu = () => setMenuOpen(false)
  const service = services[activeService]

  useEffect(() => {
    const track = workTrackRef.current
    const firstSet = track?.querySelector<HTMLElement>('.work-group')
    if (!track || !firstSet) return

    const measureTrack = () => {
      const distance = firstSet.getBoundingClientRect().width
      if (distance <= 0) return
      track.style.setProperty('--work-loop-offset', `-${distance}px`)
      track.style.setProperty('--work-loop-duration', `${Math.max(18, distance / 46)}s`)
    }

    const observer = new ResizeObserver(measureTrack)
    observer.observe(firstSet)
    measureTrack()
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isServiceSlideshowPlaying) return
    const timer = window.setInterval(() => setActiveService(current => (current + 1) % services.length), 3000)
    return () => window.clearInterval(timer)
  }, [isServiceSlideshowPlaying])

  const showService = (offset: number) => setActiveService(current => (current + offset + services.length) % services.length)

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={`main-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
            <a href="#work" onClick={closeMenu}>Our work</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#approach" onClick={closeMenu}>Our approach</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            Start a project <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="page-width hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> WEB · APP · SOFTWARE DEVELOPMENT</p>
              <h1>Technology built<br /><span>for your business.</span></h1>
              <p className="hero-description">We build websites, apps, e-commerce platforms, and AI-powered tools to solve real business needs.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Discuss your project <ArrowUpRight size={16} aria-hidden="true" /></a>
                <a className="text-link" href="#services">Explore services <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
              <div className="hero-meta"><span>STRATEGY</span><i /> <span>DESIGN</span><i /> <span>ENGINEERING</span></div>
            </div>

            <div className="hero-visual" aria-label="Aurex Technovation brand mark">
              <div className="visual-topline"><span>TECHNOLOGY &amp; SOFTWARE DEVELOPMENT COMPANY</span><span>AT / 01</span></div>
              <div className="hero-lockup">
                <div className="hero-symbol-crop" aria-hidden="true"><img src="/aurex-logo-source.png" alt="" /></div>
                <div className="hero-wordmark"><strong>AUREX</strong><span>TECHNOVATION</span></div>
                <div className="hero-lockup-rule"><i /></div>
                <p>DESIGN · DEVELOP · DEPLOY</p>
              </div>
              <div className="visual-caption"><span>Thoughtful design.<br />Solid engineering.</span><span className="caption-rule" /></div>
            </div>
          </div>
          <div className="hero-footer page-width"><span>Digital products for ambitious teams.</span><a href="#services" aria-label="Scroll to services">SCROLL TO EXPLORE <span>↓</span></a></div>
        </section>

        <section className="experience-band" aria-label="Project metrics">
          <div className="page-width experience-metrics">
            {metrics.map(metric => <AnimatedMetric key={metric.label} value={metric.value} label={metric.label} />)}
          </div>
        </section>

        <section className="work-section section-space" id="work" aria-labelledby="work-title">
          <div className="page-width work-heading">
            <div><p className="section-label">SELECTED WORK</p><h2 id="work-title">A few things<br /><span>we’ve built.</span></h2></div>
            <p>Digital experiences shaped around the people and businesses they serve.</p>
          </div>
          <div className="work-track" role="region" aria-roledescription="carousel" aria-label="Selected project work">
            <div className="work-track-inner" ref={workTrackRef}>
              {[0, 1].map(group => (
                <div className="work-group" key={group} aria-hidden={group === 1}>
                  {projects.map((project, index) => (
                    <article className="work-card" key={project.name} tabIndex={group === 0 ? 0 : -1}>
                      <div className="work-image">
                        <img src={project.image} alt={group === 0 ? project.alt : ''} loading={group === 0 ? 'lazy' : 'eager'} />
                        <div className="work-card-detail"><span className="work-card-index">PROJECT / 0{index + 1}</span><h3>{project.name}</h3><p>{project.description}</p><small>{project.services}</small></div>
                      </div>
                      <div className="work-card-meta"><div><h3>{project.name}</h3><p>{project.type}</p></div><span>0{index + 1}</span></div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="page-width work-footer">
            <span>PROJECT SPOTLIGHTS <span aria-hidden="true">✳</span></span>
            <div className="work-trust" aria-label="How we work">
              {trustPoints.map(point => <div key={point.title}><b>{point.title}</b><span>{point.detail}</span></div>)}
            </div>
          </div>
        </section>

        <section className="services-section section-space page-width" id="services">
          <div className="section-heading services-heading">
            <div><p className="section-label">WHAT WE DO</p><h2>Services<br /><span>we provide.</span></h2></div>
          </div>
          <div className="service-showcase" role="region" aria-roledescription="carousel" aria-label="Services we provide">
            <div className="service-showcase-visual" aria-hidden="true">
              {services.map((item, index) => (
                <div className={`service-slide-image${index === activeService ? ' is-active' : ''}`} key={item.number}>
                  <img src={item.image} alt="" loading="eager" />
                </div>
              ))}
              <div className="service-image-label"><span>CAPABILITIES / {service.number}</span><span>{service.number} — 05</span></div>
            </div>
            <div className="service-showcase-copy">
              <div className="service-active-copy" key={service.number}>
                <p className="service-index">SERVICE / {service.number}</p>
                <h3>{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <small>{service.details}</small>
                <a className="button button-primary service-contact" href="#contact">Discuss this service <ArrowUpRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="service-showcase-controls" aria-label="Slideshow controls">
                <div className="service-pagination">
                  {services.map((item, index) => <button key={item.number} type="button" className={index === activeService ? 'is-active' : ''} aria-label={`Show ${item.title}`} aria-pressed={index === activeService} onClick={() => setActiveService(index)}><span>{item.number}</span></button>)}
                </div>
                <div className="service-direction-controls">
                  <button type="button" aria-label="Previous service" onClick={() => showService(-1)}><ArrowLeft size={17} aria-hidden="true" /></button>
                  <button type="button" aria-label={isServiceSlideshowPlaying ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setIsServiceSlideshowPlaying(!isServiceSlideshowPlaying)}>{isServiceSlideshowPlaying ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}</button>
                  <button type="button" aria-label="Next service" onClick={() => showService(1)}><ArrowRight size={17} aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="approach-section" id="approach">
          <div className="page-width approach-layout">
            <div className="approach-heading"><p className="section-label">OUR APPROACH</p><h2>Clear from<br />the <span>start.</span></h2></div>
            <div className="approach-content">
              <p className="approach-lead">Good technology should make business simpler.</p>
              <p className="approach-description">We listen first, set a clear scope, and build in close collaboration—so the finished product works as well as it looks.</p>
              <div className="approach-steps">
                <div><span>01</span><b>Understand</b></div>
                <div><span>02</span><b>Design</b></div>
                <div><span>03</span><b>Deliver</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-space page-width" id="contact">
          <div className="contact-heading"><p className="section-label">HAVE A PROJECT IN MIND?</p><h2>Let's build<br /><span>what's next.</span></h2></div>
          <div className="contact-content">
            <p>Tell us what you're working on. We’ll help you find a clear way forward.</p>
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">Talk to our team <ArrowUpRight size={16} aria-hidden="true" /></a>
            <div className="contact-details">
              <a href={`tel:${site.phone}`}>PHONE <span>{site.phoneDisplay}</span></a>
              <p>EMAIL <span>COMING SOON</span></p>
              <a href={site.socials.instagram} target="_blank" rel="noreferrer">INSTAGRAM <span>VIEW PROFILE ↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-inner">
          <div className="footer-top"><Brand /><p>We don't just build websites.<br /><span>We build the future of your brand.</span></p></div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} AUREX TECHNOVATION</span><a href="#top">BACK TO TOP ↑</a></div>
        </div>
      </footer>
    </div>
  )
}
