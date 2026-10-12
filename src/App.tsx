import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { site } from './data/site'
import GalaxyBackdrop from './components/GalaxyBackdrop'
import StackBlocks from './components/StackBlocks'
import CursorTrail from './components/CursorTrail'

const HeroScene = lazy(() => import('./components/HeroScene'))
const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hi Aurex Technovation, I would like to discuss a project.')}`

const shortServices = [
  { number: '01', title: 'Websites & digital products', text: 'Fast, considered experiences built around what your business needs to do.', tags: 'WEB DESIGN · DEVELOPMENT · APPLICATIONS' },
  { number: '02', title: 'Brand & visual identity', text: 'A clear visual language that makes your business easier to recognize and trust.', tags: 'IDENTITY · CREATIVE DIRECTION · CONTENT' },
  { number: '03', title: 'Motion & content', text: 'Purposeful video and motion that gives products and campaigns more presence.', tags: 'VIDEO · MOTION · CAMPAIGNS' },
  { number: '04', title: 'Integrations & ongoing care', text: 'Connected tools, practical automation, and support after launch.', tags: 'API · AUTOMATION · MAINTENANCE' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <>
    <div className="ambient-backdrop" aria-hidden="true"><GalaxyBackdrop /><div className="galaxy-vignette" /></div>
    <CursorTrail />
    <div className="grain" aria-hidden="true" />
    <div className="scroll-track" aria-hidden="true"><span style={{ transform: `scaleY(${scroll})` }} /></div>

    <header className="site-header compact-header">
      <a className="brand-lockup" href="#top" onClick={closeMenu} aria-label={`${site.name} home`}>
        <span className="brand-mark">A</span><span>AUREX <b>TECHNOVATION</b></span>
      </a>
      <nav className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        <a href="#services" onClick={closeMenu}>What we do<span /></a>
        <a href="#about" onClick={closeMenu}>About<span /></a>
        <a href="#contact" onClick={closeMenu}>Contact<span /></a>
      </nav>
      <a className="header-cta" href={whatsappUrl} target="_blank" rel="noreferrer">LET'S TALK <ArrowUpRight size={13} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main id="top">
      <section className="hero compact-hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="status-dot" /> DIGITAL STUDIO <span className="eyebrow-line" /> BUILT FOR WHAT'S NEXT</div>
          <h1><span className="hero-line"><i>Make your</i></span><span className="hero-line"><i>next move</i></span><span className="hero-line"><i><em>matter.</em></i></span></h1>
          <p className="hero-sub">We bring strategy, design and technology together to build digital experiences that move businesses forward.</p>
          <div className="hero-actions"><a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">START A PROJECT <ArrowUpRight size={14} /></a><a className="button button-quiet" href="#services">EXPLORE WHAT WE DO <ArrowDownRight size={14} /></a></div>
          <div className="hero-index"><span>INDEPENDENT DIGITAL STUDIO</span><span>DESIGN · BUILD · GROW</span></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="scene-orbit orbit-one" /><div className="scene-orbit orbit-two" /><Suspense fallback={<div className="scene-fallback"><div className="fallback-a">A</div><span /></div>}><HeroScene /></Suspense><div className="art-label"><span className="art-cross">✳</span> IDEAS INTO IMPACT<small>DESIGNING WHAT'S NEXT</small></div></div>
        <div className="hero-side-note">SCROLL TO EXPLORE <span>↓</span></div>
        <div className="hero-bottom-rule"><span>STRATEGY / DESIGN / TECHNOLOGY</span><span>EST. FOR THE NEXT</span></div>
      </section>

      <section className="manifesto section-pad compact-manifesto">
        <div className="manifesto-label"><span className="section-kicker">AUREX APPROACH</span><span className="line-fill" /></div>
        <div className="manifesto-body"><p>Good technology should feel <span>effortless.</span></p><p className="manifesto-small">We turn ambitious ideas into clear, useful digital experiences—designed with intent and built to last.</p></div>
      </section>

      <section className="services-section section-pad compact-services" id="services">
        <div className="section-heading"><div><span className="section-kicker">CAPABILITIES / 01—04</span><h2 className="section-title">Built to <span>move.</span></h2></div><div className="heading-aside"><p>Everything you need to take a good idea further.</p><span className="mono"><span className="status-dot" /> ONE PARTNER, END TO END</span></div></div>
        <div className="capability-list">{shortServices.map(item => <article className="capability" key={item.number}><span className="capability-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p><small>{item.tags}</small></div><ArrowUpRight className="capability-arrow" size={19} /></article>)}</div>
        <p className="service-footnote">From first idea to what comes next. <a href="#contact">Tell us what you have in mind <ArrowRight size={13} /></a></p>
      </section>

      <section className="proof-band section-pad" aria-label="Experience">
        <div className="proof-number">50<span>+</span></div><div className="proof-copy"><span className="section-kicker">BUILT, SHIPPED, OUT IN THE WORLD</span><h2>Projects delivered.</h2></div><p>Every project starts with a clear goal. We bring the care and craft to get it over the line.</p>
      </section>

      <section className="about-section full-morph-section" id="about" aria-label="Technology stack animation"><StackBlocks /></section>

      <section className="contact-section section-pad compact-contact" id="contact">
        <div className="contact-intro"><span className="section-kicker">HAVE A GOOD ONE?</span><h2>Let's make it <span>happen.</span></h2><p>Share the idea. We’ll help you find the next step.</p><div className="contact-emblem">A<span>✳</span></div></div>
        <a className="contact-cta" href={whatsappUrl} target="_blank" rel="noreferrer"><span><small>WHATSAPP · {site.whatsappDisplay}</small><b>Start a conversation</b></span><span className="contact-cta-icon"><ArrowUpRight /></span></a>
        <div className="contact-coming-soon"><a className="contact-instagram" href={`tel:${site.phone}`} aria-label={`Call Aurex Technovation at ${site.phoneDisplay}`}><span>PHONE <b>{site.phoneDisplay}</b></span></a><span>EMAIL <b>COMING SOON</b></span><a className="contact-instagram" href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Visit Aurex Technovation on Instagram"><span>INSTAGRAM <b>VIEW PROFILE ↗</b></span></a></div>
      </section>
    </main>

    <footer className="site-footer compact-footer"><div className="footer-top"><a className="brand-lockup" href="#top"><span>AUREX <b>TECHNOVATION</b></span></a><p>Make your next move<br />matter.</p></div><p className="footer-quote">“We don't just build websites.<br /><span>We build the future of your brand.”</span></p><div className="footer-bottom"><span>© {new Date().getFullYear()} AUREX TECHNOVATION</span><span>MADE FOR WHAT'S NEXT</span><a href="#top">BACK TO TOP ↑</a></div></footer>
  </>
}
