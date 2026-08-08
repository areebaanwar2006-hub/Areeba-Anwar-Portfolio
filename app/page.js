'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

const categories = ['Brand Identity', 'Amazon A+', 'Illustration', 'Social Media', 'UI / UX'];

const designTools = ['photoshop', 'illustrator', 'figma', 'canva', 'capcut'];

const designServices = [
  {
    no: '01', title: 'Brand Identity', tone: 'purple',
    copy: 'Cohesive visual systems built to make brands recognizable, consistent, and memorable.',
    tags: ['Logo Design', 'Visual Systems', 'Typography', 'Brand Guidelines']
  },
  {
    no: '02', title: 'Amazon A+ Content', tone: 'blue',
    copy: 'Conversion-focused product stories that turn complex features into clear shopping decisions.',
    tags: ['Listing Images', 'A+ Modules', 'Infographics', 'Product Storytelling']
  },
  {
    no: '03', title: 'Social Media Design', tone: 'orange',
    copy: 'Scroll-stopping campaign visuals designed to strengthen consistency and engagement.',
    tags: ['Campaign Design', 'Post Systems', 'Art Direction', 'Ad Creative']
  },
  {
    no: '04', title: 'Illustration', tone: 'violet',
    copy: 'Expressive custom artwork shaped through texture, character, and visual storytelling.',
    tags: ['Digital Illustration', 'Custom Brushes', 'Character Art', 'Editorial Art']
  },
  {
    no: '05', title: 'UI/UX Design', tone: 'cyan',
    copy: 'Clear, thoughtful digital interfaces that balance visual polish with ease of use.',
    tags: ['Wireframes', 'Prototypes', 'Interface Design', 'Design Systems']
  }
];

const latestProjects = [
  {
    no: '01', title: 'Badshahi Mosque', kind: 'Digital Illustration',
    copy: 'Expressive digital artwork crafted entirely with custom brush strokes, blending texture, depth, and artistic detail to create captivating visual compositions',
    image: '/work/areeba-badshahi.jpg', layout: 'project-tall'
  },
  {
    no: '02', title: 'Social Media Design', kind: 'Poster Design',
    copy: 'Scroll-stopping social media designs crafted to increase engagement, build brand consistency, and create lasting impressions',
    image: '/work/loccx-social-media.png', layout: 'project-standard'
  },
  {
    no: '03', title: 'Brand Identity', kind: 'Brand Identity',
    copy: 'Transforming ideas into timeless visual identities through strategic thinking',
    image: '/work/yuni-brand-identity.png', layout: 'project-standard'
  },
  {
    no: '04', title: 'Amazon A+ Content', kind: 'Amazon A+',
    copy: 'High-converting Amazon A+ content designed to enhance product storytelling, strengthen brand identity, and improve the customer shopping experience',
    image: '/work/pondering-pine-amazon.png', layout: 'project-wide'
  }
];

const tickerItems = [
  ['Graphic Designer', 'blue'], ['Brand Identity', 'purple'], ['Amazon A+', 'orange'],
  ['Social Media', 'cyan'], ['Illustration', 'violet'], ['UI/UX', 'warm']
];

const testimonials = [
  { quote: 'Outstanding work! The layouts are clean, premium, and highly conversion-focused.', name: 'Mansoor Hayat', tone: 'purple' },
  { quote: 'Crisp, grounded, and exceptionally well executed.', name: 'Helen Bykova', tone: 'blue' },
  { quote: 'Exceptional work! For the first time, I looked at a design and was genuinely impressed.', name: 'Mehar Ali Shah', tone: 'orange' }
];

function Arrow({ down = false }) {
  return <span className={down ? 'arrow down' : 'arrow'} aria-hidden="true">↗</span>;
}

function ToolLogo({ tool }) {
  if (tool === 'photoshop') return <span className="adobe-logo photoshop-logo">Ps</span>;
  if (tool === 'illustrator') return <span className="adobe-logo illustrator-logo">Ai</span>;
  if (tool === 'figma') return (
    <svg className="figma-logo" viewBox="0 0 38 56" aria-hidden="true">
      <path fill="#F24E1E" d="M1 9.5A9.5 9.5 0 0 1 10.5 0H19v19h-8.5A9.5 9.5 0 0 1 1 9.5Z"/>
      <path fill="#FF7262" d="M19 0h8.5a9.5 9.5 0 0 1 0 19H19V0Z"/>
      <path fill="#A259FF" d="M1 28.5A9.5 9.5 0 0 1 10.5 19H19v19h-8.5A9.5 9.5 0 0 1 1 28.5Z"/>
      <circle cx="27.5" cy="28.5" r="9.5" fill="#1ABCFE"/>
      <path fill="#0ACF83" d="M1 47.5A9.5 9.5 0 0 1 10.5 38H19v8.5a9.5 9.5 0 1 1-18 1Z"/>
    </svg>
  );
  if (tool === 'canva') return <span className="canva-logo">C</span>;
  return (
    <svg className="capcut-logo" viewBox="0 0 64 50" aria-hidden="true">
      <path d="M9 10h46L38 25l17 15H9l17-15L9 10Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
    </svg>
  );
}

function ContactIcon({ type }) {
  if (type === 'behance') return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 6.5h6.2c2.3 0 3.8 1.1 3.8 3 0 1.2-.6 2.1-1.6 2.6 1.4.4 2.2 1.5 2.2 3 0 2.3-1.8 3.7-4.5 3.7H3.5V6.5Zm3 2.5v2.2h2.7c.9 0 1.4-.4 1.4-1.1S10.1 9 9.2 9H6.5Zm0 4.6v2.7h3c1 0 1.6-.5 1.6-1.3 0-.9-.6-1.4-1.7-1.4H6.5ZM16 7h5v1.6h-5V7Zm5.5 7.4h-5.1c.1 1.5.8 2.3 2 2.3.8 0 1.4-.3 1.8-1h1.2c-.4 2.1-1.5 3.3-3.2 3.3-2.7 0-4.5-2.1-4.5-5s1.8-5 4.2-5c2.6 0 4 2.1 3.6 5.4Zm-5.1-1.8h2.8c-.1-1.1-.6-1.7-1.4-1.7-.7 0-1.2.6-1.4 1.7Z" fill="currentColor"/>
    </svg>
  );
  if (type === 'linkedin') return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.2 8.2A1.9 1.9 0 1 0 5.2 4.4a1.9 1.9 0 0 0 0 3.8ZM3.6 20h3.2V9.8H3.6V20Zm5.2 0H12v-5.1c0-1.35.25-2.65 1.93-2.65 1.66 0 1.68 1.55 1.68 2.74V20h3.2v-5.65c0-2.77-.6-4.9-3.84-4.9-1.56 0-2.6.85-3.03 1.66h-.04V9.8H8.8V20Z" fill="currentColor"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 6.5h17v11h-17v-11Z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <path d="m4.2 7.3 7.8 6.1 7.8-6.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="loader-mark">AREEBA<span>✦</span></div>
      <div className="loader-line"><i /></div>
      <p>Composing ideas into form</p>
    </div>
  );
}

function Cursor() {
  const dot = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return;
    const move = e => gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: .28, ease: 'power3.out' });
    const enter = () => dot.current?.classList.add('is-active');
    const leave = () => dot.current?.classList.remove('is-active');
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,.project-frame,.testimonial-surface').forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor" ref={dot}><span>VIEW</span></div>;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-sticky">
        <div className="hero-glow" />
        <h1 className="hero-title">
          <span className="sr-only">Your Creative Designer, Storyteller and Partner</span>
          <span className="phrase-static" aria-hidden="true"><span>Your</span><span>Creative</span></span>
          <span className="word-window" aria-hidden="true">
            <span>Designer</span><span>Storyteller</span><span>Partner</span>
          </span>
        </h1>
        <div className="hero-collage" aria-label="A collage of selected design work">
          <figure className="float-card float-a"><Image src="/work/areeba-badshahi.jpg" alt="Badshahi Mosque digital illustration by Areeba Anwar" fill sizes="30vw" quality={95} priority /><figcaption>Digital illustration</figcaption></figure>
          <figure className="float-card float-b"><Image src="/work/areeba-butterfly.jpg" alt="Butterfly portrait illustration by Areeba Anwar" fill sizes="30vw" quality={95} priority /><figcaption>Character artwork</figcaption></figure>
          <figure className="float-card float-c"><Image src="/work/areeba-caramel-coffee.png" alt="Caramel coffee social media design by Areeba Anwar" fill sizes="30vw" quality={95} priority /><figcaption>Social media design</figcaption></figure>
          <figure className="float-card float-d"><Image src="/work/areeba-larix.png" alt="Larix Amazon A Plus graphic by Areeba Anwar" fill sizes="24vw" quality={95} priority /><figcaption>Amazon A+</figcaption></figure>
        </div>

        <div className="roles">{categories.map((item, i) => <span key={item}><b>0{i + 1}</b>{item}</span>)}</div>
      </div>
    </section>
  );
}

function AboutIntro() {
  return (
    <section className="about-intro" id="about">
      <div className="about-ambient" />
      <div className="about-copy">
        <p className="about-label">About Me</p>
        <h2 className="about-title">Designing with <span>Purpose,</span><br/>Creating with <em>Passion.</em></h2>
        <div className="about-text">
          <p><strong>Graphic Designer with 3+ years of experience</strong> creating thoughtful visual experiences across branding, e-commerce, and digital design.</p>
          <p>I specialize in <strong>Brand Identity, Amazon A+ Content, Social Media Design, Illustration,</strong> and <strong>UI/UX.</strong></p>
          <p>I transform ideas into meaningful visuals that help brands communicate clearly and leave a lasting impression.</p>
        </div>
        <div className="about-stats">
          <article><strong>3+</strong><span>Years<br/>Experience</span></article>
          <article><strong>100+</strong><span>Projects<br/>Completed</span></article>
          <article><strong>Worldwide</strong><span>Remote<br/>Collaboration</span></article>
          <article><strong>5+</strong><span>Design<br/>Specialties</span></article>
        </div>
      </div>
      <div className="about-visual">
        <div className="about-portrait-glow" />
        <div className="about-portrait">
          <Image src="/work/areeba-portrait.png" alt="Illustrated portrait of Areeba Anwar" fill quality={95} sizes="(max-width: 800px) 90vw, 48vw" />
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="capabilities-scene" id="expertise">
      <div className="capabilities">
        <div className="capabilities-glow" />
        <div className="capabilities-inner">
          <div className="capabilities-copy">
            <h2>What I use<br/>to <em>shape ideas.</em></h2>
            <div className="tool-list">
              {designTools.map(tool => (
                <div className="tool-chip" key={tool} title={tool} aria-label={tool}>
                  <ToolLogo tool={tool} />
                </div>
              ))}
            </div>
          </div>
          <div className="capabilities-stage">
            <div className="capabilities-trail" />
            <div className="capabilities-deck">
              {designServices.map(service => (
                <article className={`capability-card tone-${service.tone}`} key={service.title}>
                  <div className="capability-top"><span>{service.no}</span><i>✦</i></div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <div className="capability-tags">
                    {service.tags.map(tag => <span key={tag}>{tag}</span>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TransitionTicker() {
  return (
    <div className="transition-ticker" aria-label="Areeba Anwar's design disciplines">
      <div className="ticker-track">
        {[0, 1].map(group => (
          <div className="ticker-group" aria-hidden={group === 1} key={group}>
            {tickerItems.map(([label, color]) => <span key={`${group}-${label}`}><i className={`dot-${color}`} />{label}</span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function LatestProjects() {
  return (
    <section className="latest-projects" id="work">
      <div className="latest-light latest-light-one" />
      <div className="latest-light latest-light-two" />
      <div className="latest-heading">
        <h2>Latest <span>Projects</span></h2>
      </div>
      <div className="latest-grid">
        {latestProjects.map(project => (
          <article className="latest-card" key={project.title} tabIndex={0}>
            <div className="latest-image">
              <Image src={project.image} alt={`${project.title} — ${project.kind}`} fill quality={95} sizes="(max-width: 800px) 92vw, 46vw" />
              <div className="latest-overlay">
                <div className="project-reveal">
                  <div className="reveal-meta"><span>{project.no}</span><span>{project.kind}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <span className="view-project">View Project →</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-light testimonials-light-left" />
      <div className="testimonials-light testimonials-light-right" />
      <h2 className="testimonials-heading">What <span>People</span> Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <article className={`testimonial-card testimonial-${testimonial.tone}`} key={testimonial.name}>
            <div className="testimonial-float" style={{ '--float-delay': `${index * -.9}s` }}>
              <div className="testimonial-surface">
                <span className="testimonial-quote" aria-hidden="true">“</span>
                <blockquote>{testimonial.quote}</blockquote>
                <footer className="testimonial-author">
                  <p><i aria-hidden="true" />{testimonial.name}</p>
                </footer>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const contactItems = [
    { label: 'Behance', value: 'behance.net/areebaanwar7', href: 'https://www.behance.net/areebaanwar7', icon: 'behance' },
    { label: 'LinkedIn', value: 'linkedin.com/in/areebaanwar', href: 'https://www.linkedin.com/in/areebaanwar/', icon: 'linkedin' },
    { label: 'Email', value: 'areebaanwar2006@gmail.com', href: 'mailto:areebaanwar2006@gmail.com', icon: 'email' }
  ];
  return (
    <footer className="contact-finale" id="contact">
      <div className="contact-ambient contact-ambient-blue" />
      <div className="contact-ambient contact-ambient-purple" />
      <div className="contact-ambient contact-ambient-orange" />
      <div className="contact-shell">
        <h2 className="contact-title"><span>Let&apos;s create</span><span>Something</span><span>Remarkable.</span></h2>
        <p className="contact-intro">Whether you&apos;re building a brand, launching a product, or simply have an idea you&apos;d like to bring to life, I&apos;d love to hear from you.</p>
        <div className="contact-list" aria-label="Contact links">
          {contactItems.map(item => (
            <a className="contact-card" href={item.href} key={item.label} target={item.icon === 'email' ? undefined : '_blank'} rel={item.icon === 'email' ? undefined : 'noreferrer'}>
              <span className="contact-icon"><ContactIcon type={item.icon} /></span>
              <span className="contact-card-copy"><small>{item.label}</small><strong>{item.value}</strong></span>
              <span className="contact-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <a className="contact-cta" href="mailto:areebaanwar2006@gmail.com"><span>Let&apos;s Work Together</span><i aria-hidden="true">→</i></a>
      </div>
      <div className="contact-footer">
        <span>© 2026 Areeba Anwar</span>
        <span>Designed &amp; Developed with passion.</span>
      </div>
    </footer>
  );
}

export default function Home() {
  const root = useRef(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia('(max-width: 800px)').matches;
    let lenis;
    let rafId;
    let isDisposed = false;
    if (!isMobile) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      const raf = time => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    } else {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }
    let wordLoop;
    const ctx = gsap.context(() => {
      gsap.from('.phrase-static > span', { yPercent: 105, opacity: 0, filter: 'blur(8px)', duration: 1, stagger: .1, delay: 1.45, ease: 'power4.out' });
      const rotatingWords = gsap.utils.toArray('.word-window > span');
      gsap.set(rotatingWords, { yPercent: 110, opacity: 0, filter: 'blur(9px)' });
      wordLoop = gsap.timeline({ repeat: -1, delay: 1.95, repeatDelay: .05 });
      rotatingWords.forEach(word => {
        wordLoop
          .to(word, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: .65, ease: 'power3.out' })
          .to(word, { yPercent: -108, opacity: 0, filter: 'blur(7px)', duration: .6, ease: 'power3.in' }, '+=1.15');
      });
      gsap.from('.reveal', { opacity: 0, y: 20, duration: .8, stagger: .15, delay: 1.9 });
      if (isMobile) {
        gsap.to('.hero-title', { y: '-21svh', scale: .88, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '62% top', scrub: 1 } });
        gsap.to('.roles', { opacity: 1, y: 0, scrollTrigger: { trigger: '.hero', start: '42% top', end: '68% top', scrub: .65 } });
        gsap.to('.float-a', { x: '-4vw', y: '24svh', rotate: -7, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: .8 } });
        gsap.to('.float-b', { x: '4vw', y: '27svh', rotate: 7, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: .8 } });
        gsap.to('.float-c', { x: '5vw', y: '13svh', rotate: 4, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: .85 } });
        gsap.to('.float-d', { x: '-5vw', y: '15svh', rotate: -4, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: .85 } });
        gsap.from('.about-label, .about-title, .about-text p', { y: 34, opacity: 0, duration: .8, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: '.about-intro', start: 'top 78%' } });
        gsap.from('.about-portrait', { y: 46, opacity: 0, duration: .95, ease: 'power3.out', scrollTrigger: { trigger: '.about-visual', start: 'top 84%' } });
      } else {
        gsap.to('.hero-title', { y: '-34vh', scale: .8, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '64% top', scrub: 1.8 } });
        gsap.to('.roles', { opacity: 1, y: 0, scrollTrigger: { trigger: '.hero', start: '45% top', end: '72% top', scrub: 1 } });
        gsap.to('.float-a', { x: '-55vw', y: '38vh', rotate: -9, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.4 } });
        gsap.to('.float-b', { x: '-18vw', y: '44vh', rotate: 7, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.1 } });
        gsap.to('.float-c', { x: '12vw', y: '34vh', rotate: -4, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.5 } });
        gsap.to('.float-d', { x: '-38vw', y: '32vh', rotate: 6, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 1.25 } });
        gsap.from('.about-label, .about-title, .about-text p', { x: -65, opacity: 0, duration: 1.05, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.about-intro', start: 'top 72%' } });
        gsap.from('.about-portrait', { x: 75, opacity: 0, duration: 1.25, ease: 'power3.out', scrollTrigger: { trigger: '.about-intro', start: 'top 70%' } });
        gsap.to('.about-portrait', { y: '-9vh', ease: 'none', scrollTrigger: { trigger: '.about-intro', start: 'top bottom', end: 'bottom top', scrub: 1.8 } });
      }
      gsap.from('.about-stats article', { y: 34, opacity: 0, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: '.about-stats', start: 'top 88%' } });
      gsap.from('.latest-heading > *', { y: 48, opacity: 0, duration: 1.05, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.latest-heading', start: 'top 82%' } });
      gsap.from('.latest-card', { y: isMobile ? 42 : 72, opacity: 0, duration: isMobile ? .82 : 1.15, stagger: isMobile ? .08 : 0, ease: 'power3.out', scrollTrigger: { trigger: '.latest-grid', start: 'top 84%' } });
      gsap.from('.capabilities-copy > *', { x: -55, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.capabilities-scene', start: 'top 68%' } });
      if (isMobile) {
        gsap.from('.capability-card', {
          y: 48,
          opacity: 0,
          duration: .8,
          stagger: .1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.capabilities-deck', start: 'top 82%' }
        });
      } else {
        const capabilityCards = gsap.utils.toArray('.capability-card');
        const stackSpacing = 14;
        gsap.set(capabilityCards, {
          x: 0,
          y: index => index * stackSpacing,
          opacity: 1,
          scale: index => 1 - index * .012,
          rotation: index => index === 0 ? 0 : (index % 2 ? .32 : -.32),
          zIndex: index => capabilityCards.length - index,
          transformOrigin: '50% 90%',
          force3D: true,
          boxShadow: index => `0 ${28 - index * 2}px ${70 - index * 5}px rgba(0,0,0,${.46 - index * .045})`
        });
        const totalScrollMultiplier = 4.5;
        const capabilityTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.capabilities-scene',
            start: 'top 25%',
            end: () => `+=${window.innerHeight * totalScrollMultiplier}`,
            scrub: 1.9,
            invalidateOnRefresh: true,
            refreshPriority: 0
          }
        });
        const transitionLead = .38;
        capabilityTimeline.fromTo('.capabilities-inner', {
          y: '3vh'
        }, {
          y: 0,
          duration: transitionLead,
          ease: 'sine.out',
          force3D: true
        }, 0);

        capabilityCards.slice(0, -1).forEach((card, index) => {
          const moment = index * 1.34;
          const cardsStillStacked = capabilityCards.slice(index + 1);

          capabilityTimeline
            .to(card, {
              x: index % 2 ? '1.5%' : '-1.5%',
              y: '46vh',
              scale: .985,
              rotation: index % 2 ? 1.35 : -1.35,
              boxShadow: '0 46px 110px rgba(0,0,0,.58)',
              duration: 1.2,
              ease: 'power2.inOut',
              force3D: true
            }, moment)
            .to(card, {
              opacity: 0,
              duration: .68,
              ease: 'sine.inOut'
            }, moment + .38)
            .to(cardsStillStacked, {
              y: stackIndex => stackIndex * stackSpacing,
              scale: stackIndex => 1 - stackIndex * .012,
              rotation: stackIndex => stackIndex === 0 ? 0 : (stackIndex % 2 ? .32 : -.32),
              boxShadow: stackIndex => `0 ${28 - stackIndex * 2}px ${70 - stackIndex * 5}px rgba(0,0,0,${.46 - stackIndex * .045})`,
              duration: 1.08,
              ease: 'power2.inOut',
              force3D: true
            }, moment);
        });
        const transitionOut = (capabilityCards.length - 2) * 1.34 + 1.2;
        capabilityTimeline.to('.capabilities-inner', {
          y: '-3vh',
          duration: .42,
          ease: 'sine.inOut',
          force3D: true
        }, transitionOut);
        capabilityTimeline.to({}, { duration: .2 });
      }
      gsap.utils.toArray('.statement h2, .category-row, .project h2, .project-frame').forEach(el => {
        gsap.from(el, { y: 90, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
      });
      gsap.utils.toArray('.project-frame img').forEach(img => {
        gsap.fromTo(img, { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
      gsap.from('.testimonial-card', { y: isMobile ? 38 : 68, opacity: 0, duration: isMobile ? .78 : 1.15, stagger: isMobile ? .1 : .16, ease: 'power3.out', scrollTrigger: { trigger: '.testimonials-grid', start: 'top 84%' } });
      const contactTimeline = gsap.timeline({ scrollTrigger: { trigger: '.contact-finale', start: 'top 72%', toggleActions: 'play none none reverse' } });
      contactTimeline
        .from('.contact-title > span', { y: isMobile ? 48 : 90, opacity: 0, filter: isMobile ? 'none' : 'blur(8px)', duration: isMobile ? .78 : 1.05, stagger: .1, ease: 'power4.out' })
        .from('.contact-intro', { y: 28, opacity: 0, duration: .75, ease: 'power3.out' }, '-=.55')
        .from('.contact-card', { y: 36, opacity: 0, duration: .72, stagger: .12, ease: 'power3.out' }, '-=.38')
        .from('.contact-cta', { y: 24, opacity: 0, duration: .7, ease: 'power3.out' }, '-=.3')
        .from('.contact-footer', { opacity: 0, duration: .6, ease: 'sine.out' }, '-=.25');
    }, root);
    const refreshScrollLayout = () => {
      if (!isDisposed) ScrollTrigger.refresh();
    };
    const refreshId = requestAnimationFrame(refreshScrollLayout);
    window.addEventListener('load', refreshScrollLayout);
    document.fonts?.ready.then(refreshScrollLayout);

    return () => {
      isDisposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      cancelAnimationFrame(refreshId);
      window.removeEventListener('load', refreshScrollLayout);
      wordLoop?.kill();
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <Loader />
      <Cursor />
      <header>
        <p className="header-identity">Graphic Designer<br/><span>Pakistan · Available worldwide</span></p>
        <nav aria-label="Main navigation"><a href="#about">About</a><a href="#work">Work</a><a href="#contact">Let’s talk <i /></a></nav>
      </header>
      <Hero />
      <TransitionTicker />
      <AboutIntro />
      <LatestProjects />
      <Capabilities />
      <Testimonials />
      <Contact />
    </main>
  );
}
