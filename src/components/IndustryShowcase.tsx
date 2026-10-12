import { useEffect, useRef } from 'react'

const industries = [
  {
    number: '01',
    category: 'REAL ESTATE & CONSTRUCTION',
    title: 'Real Estate & Construction',
    description: 'Corporate websites, property showcases, and digital solutions for modern construction businesses.',
    projectName: 'Shubh Sanket',
    projectDescription: 'A real estate and civil contracting website highlighting property services and making it easy to enquire about a project.',
    image: '/industries/industry-real-estate.png',
    alt: 'Modern home shown during construction beside its completed exterior',
  },
  {
    number: '02',
    category: 'E-COMMERCE',
    title: 'E-commerce',
    description: 'Product-first online stores with clear catalogues, polished brand experiences, and smooth checkout flows.',
    projectName: 'Ahirat Perfumery',
    projectDescription: 'A refined online storefront presenting Ahirat Perfumery’s fragrance collection through a distinctive product experience.',
    image: '/industries/industry-retail.png',
    alt: 'Online shopping interface surrounded by fashion and lifestyle products',
  },
  {
    number: '03',
    category: 'EDUCATION & EDTECH',
    title: 'Education & EdTech',
    description: 'Student-focused applications, learning platforms, and engaging educational experiences.',
    projectName: 'EduBridge',
    projectDescription: 'A school workspace connecting attendance, academics, communication, and campus updates for students, parents, and teachers.',
    image: '/industries/industry-education.png',
    alt: 'Teacher leading a classroom of students',
  },
  {
    number: '04',
    category: 'HEALTHCARE & WELLNESS',
    title: 'Healthcare & Wellness',
    description: 'Thoughtful digital experiences for wellness brands, practitioners, and service-focused businesses.',
    projectName: 'Manas Wellness',
    projectDescription: 'An Ayurvedic wellness storefront showcasing herbal care products with clear product discovery and wellbeing guidance.',
    image: '/industries/industry-wellness.png',
    alt: 'Wellness and yoga scene with a person practicing in a bright studio',
  },
  {
    number: '05',
    category: 'EVENTS & ENTERTAINMENT',
    title: 'Events & Entertainment',
    description: 'Event platforms, promotional websites, and digital experiences built for memorable occasions.',
    image: '/industries/industry-events.png',
    alt: 'DJ performing before a concert crowd with dramatic flame effects',
  },
  {
    number: '06',
    category: 'TECHNOLOGY & DIGITAL PLATFORMS',
    title: 'Technology & Digital Platforms',
    description: 'Custom web applications, real-time platforms, and scalable digital solutions.',
    image: '/industries/industry-technology.webp',
    alt: 'Laptop displaying source code on a modern developer workstation',
  },
]

export default function IndustryShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLSpanElement>(null)
  const currentNumberRef = useRef<HTMLSpanElement>(null)
  const progressButtonsRef = useRef<HTMLDivElement>(null)
  const autoplayButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!section || !viewport || !track) return

    const mobileQuery = window.matchMedia('(max-width: 760px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const slides = Array.from(track.querySelectorAll<HTMLElement>('.industry-panel'))
    const progressButtons = Array.from(progressButtonsRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])
    const buttonHandlers: Array<() => void> = []
    let frame = 0
    let activeIndex = 0
    let paused = false
    let selectedProjectIndex: number | null = null
    let autoplayTimer = 0
    let isMobileLayout: boolean | null = null

    const setProgress = (progress: number, activeIndex: number) => {
      if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${progress})`
      if (currentNumberRef.current) currentNumberRef.current.textContent = industries[activeIndex].number
      progressButtons.forEach((button, index) => {
        if (index === activeIndex) button.setAttribute('aria-current', 'step')
        else button.removeAttribute('aria-current')
      })
      slides.forEach((slide, index) => {
        slide.querySelector<HTMLButtonElement>('.industry-card-select')?.setAttribute('aria-pressed', String(index === activeIndex))
      })
    }

    const updateProjectDetails = () => {
      slides.forEach((slide, index) => {
        const showingDetails = selectedProjectIndex === index && Boolean(industries[index].projectName)
        const summary = slide.querySelector<HTMLElement>('.industry-summary')
        const details = slide.querySelector<HTMLElement>('.industry-project-detail')
        const button = slide.querySelector<HTMLButtonElement>('.industry-card-select')
        if (summary) summary.hidden = showingDetails
        if (details) details.hidden = !showingDetails
        if (button) button.setAttribute('aria-expanded', String(showingDetails))
      })
    }

    const updateDesktop = () => {
      frame = 0
      const firstLeft = slides[0]?.offsetLeft ?? 0
      const activeSlide = slides[activeIndex]
      if (activeSlide) track.style.transform = `translate3d(${-((activeSlide.offsetLeft - firstLeft))}px, 0, 0)`
      slides.forEach((slide, index) => {
        const copy = slide.querySelector<HTMLElement>('.industry-copy')
        if (copy) {
          copy.style.opacity = index === activeIndex ? '1' : '0.2'
          copy.style.transform = `translate3d(${index < activeIndex ? -12 : 12}px, 0, 0)`
        }
      })
      setProgress(slides.length > 1 ? activeIndex / (slides.length - 1) : 0, activeIndex)
    }

    const scheduleDesktopUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateDesktop)
    }

    const updateMobile = () => {
      frame = 0
      const viewportCenter = reducedMotionQuery.matches
        ? window.innerHeight / 2
        : viewport.getBoundingClientRect().left + viewport.clientWidth / 2
      let nextIndex = 0
      let closestDistance = Infinity
      slides.forEach((slide, index) => {
        const center = reducedMotionQuery.matches
          ? slide.getBoundingClientRect().top + slide.offsetHeight / 2
          : slide.getBoundingClientRect().left + slide.offsetWidth / 2
        const distance = Math.abs(center - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          nextIndex = index
        }
      })
      if (activeIndex !== nextIndex) {
        activeIndex = nextIndex
        selectedProjectIndex = null
        updateProjectDetails()
      }
      const progress = slides.length > 1 ? activeIndex / (slides.length - 1) : 0
      setProgress(progress, activeIndex)
    }

    const scheduleMobileUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMobile)
    }

    const measure = () => {
      const mobileLayout = mobileQuery.matches || reducedMotionQuery.matches
      if (mobileLayout !== isMobileLayout) {
        viewport.scrollLeft = 0
        isMobileLayout = mobileLayout
      }
      section.style.height = ''
      if (mobileLayout) {
        track.style.transform = ''
        slides.forEach(slide => {
          const copy = slide.querySelector<HTMLElement>('.industry-copy')
          const image = slide.querySelector<HTMLElement>('.industry-photo')
          if (copy) { copy.style.opacity = ''; copy.style.transform = '' }
          if (image) image.style.transform = ''
        })
        scheduleMobileUpdate()
        return
      }

      scheduleDesktopUpdate()
    }

    const onScroll = () => {
      if (mobileQuery.matches || reducedMotionQuery.matches) scheduleMobileUpdate()
    }
    const setActiveSlide = (index: number, smooth = true, showProjectDetails = false) => {
      if (!slides.length) return
      activeIndex = (index + slides.length) % slides.length
      selectedProjectIndex = showProjectDetails && industries[activeIndex].projectName ? activeIndex : null
      updateProjectDetails()
      setProgress(slides.length > 1 ? activeIndex / (slides.length - 1) : 0, activeIndex)
      if (reducedMotionQuery.matches) return
      const slide = slides[activeIndex]
      if (!slide) return
      if (mobileQuery.matches) {
        const targetLeft = viewport.scrollLeft + slide.getBoundingClientRect().left - viewport.getBoundingClientRect().left - 20
        viewport.scrollTo({ left: targetLeft, behavior: smooth ? 'smooth' : 'auto' })
      } else {
        scheduleDesktopUpdate()
      }
    }

    const goToSlide = (index: number) => {
      const slide = slides[index]
      if (!slide) return
      if (reducedMotionQuery.matches) {
        slide.scrollIntoView({ behavior: 'auto', block: 'center' })
        return
      }
      setActiveSlide(index)
    }

    const syncAutoplay = () => {
      window.clearInterval(autoplayTimer)
      autoplayTimer = 0
      const button = autoplayButtonRef.current
      if (button) {
        button.textContent = paused ? 'Play' : 'Pause'
        button.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} automatic slideshow`)
        button.setAttribute('aria-pressed', String(paused))
      }
      if (paused || reducedMotionQuery.matches) return
      autoplayTimer = window.setInterval(() => {
        if (document.visibilityState === 'visible') setActiveSlide(activeIndex + 1)
      }, 3000)
    }

    const cardButtons = Array.from(track.querySelectorAll<HTMLButtonElement>('.industry-card-select'))
    const cardHandlers = cardButtons.map((button, index) => {
      const handler = () => {
        paused = true
        syncAutoplay()
        setActiveSlide(index, false, true)
      }
      button.addEventListener('click', handler)
      return handler
    })

    progressButtons.forEach((button, index) => {
      const handler = () => goToSlide(index)
      buttonHandlers[index] = handler
      button.addEventListener('click', handler)
    })
    const toggleAutoplay = () => {
      paused = !paused
      syncAutoplay()
    }
    autoplayButtonRef.current?.addEventListener('click', toggleAutoplay)
    viewport.addEventListener('scroll', scheduleMobileUpdate, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)
    document.addEventListener('visibilitychange', syncAutoplay)
    mobileQuery.addEventListener('change', measure)
    const onMotionPreferenceChange = () => { measure(); syncAutoplay() }
    reducedMotionQuery.addEventListener('change', onMotionPreferenceChange)
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    measure()
    syncAutoplay()

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearInterval(autoplayTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      document.removeEventListener('visibilitychange', syncAutoplay)
      viewport.removeEventListener('scroll', scheduleMobileUpdate)
      mobileQuery.removeEventListener('change', measure)
      reducedMotionQuery.removeEventListener('change', onMotionPreferenceChange)
      resizeObserver.disconnect()
      progressButtons.forEach((button, index) => button.removeEventListener('click', buttonHandlers[index]))
      cardButtons.forEach((button, index) => button.removeEventListener('click', cardHandlers[index]))
      autoplayButtonRef.current?.removeEventListener('click', toggleAutoplay)
      section.style.height = ''
      track.style.transform = ''
    }
  }, [])

  return (
    <section className="industry-journey" id="industries" aria-labelledby="industries-title" ref={sectionRef}>
      <div className="industry-stage">
        <div className="industry-heading page-width">
          <div><p className="section-label">INDUSTRY EXPERIENCE</p><h2 id="industries-title">Industries We’ve Worked In<span>.</span></h2></div>
          <p>Digital solutions shaped around the realities of your industry.</p>
        </div>
        <div className="industry-viewport" ref={viewportRef}>
          <div className="industry-track" ref={trackRef}>
            {industries.map((industry, index) => (
              <article className="industry-panel" key={industry.number} id={`industry-${industry.number}`}>
                <div className="industry-photo-backdrop" style={{ backgroundImage: `url("${industry.image}")` }} aria-hidden="true" />
                <img className="industry-photo" src={industry.image} alt={industry.alt} loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
                <div className="industry-shade" aria-hidden="true" />
                <div className="industry-copy" id={`industry-copy-${industry.number}`}>
                  <div className="industry-summary">
                    <span className="industry-panel-number">/ {industry.number} · {industry.category}</span>
                    <h3>{industry.title}</h3>
                    <p>{industry.description}</p>
                  </div>
                  {industry.projectName && <div className="industry-project-detail" hidden>
                    <span className="industry-panel-number">PROJECT / {industry.number}</span>
                    <h3>{industry.projectName}</h3>
                    <p>{industry.projectDescription}</p>
                  </div>}
                </div>
                <button className="industry-card-select" type="button" aria-label={`Show project details for ${industry.title}`} aria-controls={`industry-copy-${industry.number}`} aria-expanded="false" aria-pressed={index === 0} />
              </article>
            ))}
          </div>
        </div>
        <div className="industry-progress page-width" aria-label="Industry showcase progress">
          <span className="industry-current" ref={currentNumberRef}>01</span>
          <div className="industry-progress-track" aria-hidden="true"><span ref={progressBarRef} /></div>
          <span className="industry-total">06</span>
          <button className="industry-autoplay" type="button" aria-label="Pause automatic slideshow" aria-pressed="false" ref={autoplayButtonRef}>Pause</button>
          <div className="industry-progress-buttons" aria-label="Jump to an industry" ref={progressButtonsRef}>
            {industries.map(industry => <button type="button" key={industry.number} aria-label={`Go to ${industry.number}: ${industry.title}`} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
