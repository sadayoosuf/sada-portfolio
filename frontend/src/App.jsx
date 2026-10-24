import React, { useEffect, useState } from 'react';

const API = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');

const fallbackData = {
  profile: {
    name: 'Sada Yoosuf',
    headline: 'Python Developer · Automation Engineer',
    intro: 'I build practical web applications and reliable test automation, bringing together Python, Django, APIs and a curiosity for thoughtful product design.',
    location: 'Bengaluru, India',
    github: 'https://github.com/sadayoosuf',
    linkedin: 'https://www.linkedin.com/in/sada-yoosuf/',
    email: 'yoosufsada@gmail.com',
    resume_url: '/resume.pdf'
  },
  skills: [
    { category: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'REST APIs'] },
    { category: 'Frontend', items: ['JavaScript', 'React.js', 'Bootstrap', 'HTML', 'CSS'] },
    { category: 'Testing & Automation', items: ['Python Automation', 'Selenium', 'Playwright', 'BDD', 'API Testing', 'Allure'] },
    { category: 'Data & Tools', items: ['SQL', 'PostgreSQL', 'MS SQL Server', 'Git', 'Azure DevOps', 'Jenkins'] }
  ],
  experience: [
    {
      company: 'Wipro Technologies',
      role: 'Project Engineer — Python Automation Testing',
      period: 'March 2025 – Present',
      description: 'Working on web and API automation using Python and a BDD-based framework, with a focus on validating enterprise workflows and improving test reliability.',
      bullets: [
        'Develop and maintain Python automation scripts for web and API testing.',
        'Execute functional, regression, smoke and API testing cycles.',
        'Validate REST API responses, JSON payloads and test data.',
        'Work with Azure services, Allure reporting and Azure DevOps in collaboration with development and QA teams.'
      ]
    },
    {
      company: 'Luminar Technolab',
      role: 'Python Django Full Stack Developer — Internship',
      period: '2024',
      description: 'Completed practical training and project work in Python and Django full-stack development.',
      bullets: ['Built and practised web application development using Python and Django.']
    },
    {
      company: 'iRetail Software Solutions LLP',
      role: 'Python Development Intern',
      period: '2023',
      description: 'Python development internship.',
      bullets: ['Worked on Python development tasks during the internship.']
    }
  ],
  projects: [
    {
      name: 'Covet — E-commerce Website',
      category: 'Django · E-commerce',
      description: 'A Django e-commerce project with shopping, search, cart, Razorpay integration and an AI product-customisation experience.',
      tags: ['Python', 'Django', 'SQLite', 'Razorpay', 'AI integration'],
      // repo_url: 'YOUR_COVET_REPO_URL',
      repo_url: 'https://github.com/sadayoosuf/djangoecommercecovet',
      // live_url: 'https://covet.pythonanywhere.com',
      featured: true,
      mark: 'C.'
    },
    {
      name: 'Healio — Hospital Management',
      category: 'Django · Healthcare workflow',
      description: 'A hospital-management capstone covering appointments, pharmacy, billing and payment workflow.',
      tags: ['Python', 'Django', 'SQLite', 'Razorpay'],
      // repo_url: 'YOUR_HEALIO_REPO_URL',
      repo_url: 'https://github.com/sadayoosuf/Healio',
      live_url: '',
      featured: true,
      mark: 'H.'
    },
    {
      name: 'Agro Adviser / Harvestify',
      category: 'Flask · Machine learning',
      description: 'A crop-advisory project using soil inputs for crop recommendations and image-based plant-disease classification.',
      tags: ['Python', 'Flask', 'Random Forest', 'ResNet9'],
      repo_url: 'YOUR_AGRO_REPO_URL',
      live_url: '',
      featured: true,
      mark: 'A.'
    },
    {
      name: 'Web Automation Framework',
      category: 'Automation · QA',
      description: 'A Selenium-based automation capstone using Java, Maven, Cucumber, Page Object Model and TestNG, with Jenkins execution and HTML reporting.',
      tags: ['Selenium', 'Java', 'Maven', 'Cucumber', 'TestNG', 'Jenkins'],
      // repo_url: 'YOUR_AUTOMATION_REPO_URL',
      repo_url: 'https://github.com/sadayoosuf/Capstone_UrbanLadder',
      live_url: '',
      featured: false,
      mark: 'QA'
    }
  ]
};

function isPlaceholder(value) {
  return !value || value.includes('YOUR_');
}

function SafeLink({ href, children, className = '', ...props }) {
  if (isPlaceholder(href)) return <span className={`${className} link-disabled`} title="Add your verified URL in App.jsx">{children}</span>;
  return <a href={href} className={className} target="_blank" rel="noreferrer" {...props}>{children}</a>;
}

function CodeArtwork() {
  return (
    <div className="artwork" aria-label="Abstract code-inspired illustration">
      <div className="art-orbit orbit-one" />
      <div className="art-orbit orbit-two" />
      <div className="art-sun" />
      <div className="art-card">
        <div className="art-card-top"><span /><span /><span /><small>portfolio.py</small></div>
        <div className="code-lines">
          <p><i>01</i><span className="code-purple">class</span> <b>Developer</b>:</p>
          <p><i>02</i>&nbsp;&nbsp;<span className="code-purple">def</span> <b>build</b>(self):</p>
          <p><i>03</i>&nbsp;&nbsp;&nbsp;&nbsp;skills = [</p>
          <p><i>04</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>'python'</em>,</p>
          <p><i>05</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>'django'</em>,</p>
          <p><i>06</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<em>'curiosity'</em></p>
          <p><i>07</i>&nbsp;&nbsp;&nbsp;&nbsp;]</p>
          <p><i>08</i>&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-purple">return</span> <strong>ideas → impact</strong></p>
        </div>
      </div>
      <div className="art-sticker sticker-one"><i className="bi bi-braces" /> Python</div>
      <div className="art-sticker sticker-two"><i className="bi bi-stars" /> Keep learning</div>
      <div className="art-dot dot-one" /><div className="art-dot dot-two" /><div className="art-dot dot-three" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return <div className="section-heading">
    <div className="eyebrow">{eyebrow}</div>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </div>;
}

export default function App() {
  const [data, setData] = useState(fallbackData);
  const [apiStatus, setApiStatus] = useState('fallback');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${API}/portfolio/`)
      .then((res) => { if (!res.ok) throw new Error('API unavailable'); return res.json(); })
      .then((payload) => {
        if (payload && payload.profile) {
          setData({
            profile: { ...fallbackData.profile, ...payload.profile },
            skills: payload.skills?.length ? payload.skills : fallbackData.skills,
            experience: payload.experience?.length ? payload.experience : fallbackData.experience,
            projects: payload.projects?.length ? payload.projects : fallbackData.projects
          });
          setApiStatus('live');
        }
      })
      .catch(() => setApiStatus('fallback'));
  }, []);

  const updateField = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submitContact(e) {
    e.preventDefault();
    setSending(true);
    setFormStatus({ type: '', message: '' });
    try {
      const response = await fetch(`${API}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.detail || 'Could not send your message. Please try again.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setFormStatus({ type: 'success', message: 'Thanks — your message has been submitted.' });
    } catch {
      setFormStatus({ type: 'error', message: 'The contact service is not available right now. Please email me directly after adding your real email address to the site.' });
    } finally {
      setSending(false);
    }
  }

  const p = data.profile;

  return (
    <>
      <nav className="navbar navbar-expand-lg site-nav sticky-top">
        <div className="container">
          <a className="navbar-brand brand-mark" href="#home" onClick={() => setMenuOpen(false)}>sada<span>.</span></a>
          <button className="navbar-toggler" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} />
          </button>
          <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) =>
                <li className="nav-item" key={item}><a className="nav-link" href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a></li>
              )}
              <li className="nav-item ms-lg-3"><a className="btn btn-plum btn-sm nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let's talk <i className="bi bi-arrow-up-right ms-1" /></a></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 hero-copy">
                <div className="availability"><span className="availability-dot" /> PYTHON · DJANGO · TEST AUTOMATION</div>
                <p className="hero-kicker">Hello, I'm {p.name}</p>
                <h1>Turning thoughtful<br /><span>ideas into</span> useful<br />digital experiences<span className="period">.</span></h1>
                <p className="hero-description">{p.intro}</p>
                <div className="hero-actions">
                  <a href="#projects" className="btn btn-plum">Explore my work <i className="bi bi-arrow-down-right ms-2" /></a>
                  {!isPlaceholder(p.resume_url) && <SafeLink href={p.resume_url} className="btn btn-outline-plum">View résumé <i className="bi bi-download ms-2" /></SafeLink>}
                  {isPlaceholder(p.resume_url) && <a href="#contact" className="btn btn-outline-plum">Get in touch <i className="bi bi-arrow-up-right ms-2" /></a>}
                </div>
                <div className="hero-socials">
                  <span>Find me on</span>
                  <SafeLink href={p.github}>GitHub <i className="bi bi-arrow-up-right" /></SafeLink>
                  <SafeLink href={p.linkedin}>LinkedIn <i className="bi bi-arrow-up-right" /></SafeLink>
                </div>
              </div>
              <div className="col-lg-6"><CodeArtwork /></div>
            </div>
            <div className="hero-bottomline"><span>BASED IN {p.location.toUpperCase()}</span><span>BUILD · TEST · LEARN</span><a href="#about">SCROLL TO EXPLORE <i className="bi bi-arrow-down" /></a></div>
          </div>
        </section>

        <section id="about" className="section-pad about-section">
          <div className="container">
            <div className="row g-5 align-items-start">
              <div className="col-lg-4"><SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Curious by nature.<br /><em>Builder by choice.</em></>} /></div>
              <div className="col-lg-7 offset-lg-1 about-content">
                <p className="lead-copy">I'm a software professional with experience across Python-based automation testing and hands-on web application development.</p>
                <p>I enjoy understanding how applications work end to end — from backend logic and API responses to user-facing details and the tests that help keep systems dependable. My interests span Django development, frontend technologies, API testing and practical AI-assisted workflows.</p>
                <div className="about-facts">
                  <div><span className="fact-number">01</span><strong>Backend-minded</strong><small>Python · Django · REST APIs</small></div>
                  <div><span className="fact-number">02</span><strong>Quality-focused</strong><small>Automation · API validation</small></div>
                  <div><span className="fact-number">03</span><strong>Always learning</strong><small>React · cloud · AI tooling</small></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-pad skills-section">
          <div className="container">
            <SectionHeading eyebrow="MY TOOLKIT" title={<>Skills I bring<br /><em>to the table.</em></>} description="A practical mix of development, testing and delivery tools." />
            <div className="row g-3 mt-3">
              {data.skills.map((group, index) => (
                <div className="col-md-6 col-xl-3" key={group.category}>
                  <div className="skill-card h-100">
                    <div className="skill-card-top"><span>0{index + 1}</span><i className={['bi bi-terminal', 'bi bi-window', 'bi bi-check2-circle', 'bi bi-database'][index % 4]} /></div>
                    <h3>{group.category}</h3>
                    <div className="skill-pills">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-pad experience-section">
          <div className="container">
            <SectionHeading eyebrow="WHERE I'VE WORKED" title={<>Experience &<br /><em>growth.</em></>} description="A snapshot of the roles and learning experiences that have shaped my work." />
            <div className="timeline">
              {data.experience.map((job, i) => (
                <article className="timeline-item" key={`${job.company}-${job.role}`}>
                  <div className="timeline-marker">{String(i + 1).padStart(2, '0')}</div>
                  <div className="timeline-main">
                    <div className="timeline-meta"><span>{job.period}</span><span className="timeline-type">EXPERIENCE</span></div>
                    <h3>{job.role}</h3><h4>{job.company}</h4><p>{job.description}</p>
                    {job.bullets?.length > 0 && <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section-pad projects-section">
          <div className="container">
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 projects-heading">
              <SectionHeading eyebrow="SELECTED WORK" title={<>A few things I've<br /><em>worked on.</em></>} description="A selection of web development, machine-learning and automation projects." />
              <SafeLink href={p.github} className="text-link">More on GitHub <i className="bi bi-arrow-up-right" /></SafeLink>
            </div>
            <div className="row g-4 mt-2">
              {data.projects.map((project, index) => (
                <div className="col-md-6" key={project.name}>
                  <article className={`project-card ${index % 2 ? 'project-card-alt' : ''}`}>
                    <div className="project-visual">
                      <div className="project-visual-no">PROJECT / 0{index + 1}</div>
                      <div className="project-visual-mark">{project.mark || 'P.'}</div>
                      <div className="project-visual-label">{project.category}</div>
                      <div className="project-visual-lines"><span /><span /><span /></div>
                    </div>
                    <div className="project-body">
                      <div className="project-title-row"><h3>{project.name}</h3><span className="project-arrow"><i className="bi bi-arrow-up-right" /></span></div>
                      <p>{project.description}</p>
                      <div className="project-tags">{project.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      <div className="project-links">
                        {!isPlaceholder(project.repo_url) && <SafeLink href={project.repo_url}><i className="bi bi-github" /> Source code</SafeLink>}
                        {!isPlaceholder(project.live_url) && project.live_url && <SafeLink href={project.live_url}><i className="bi bi-box-arrow-up-right" /> Live project</SafeLink>}
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad contact-section">
          <div className="container">
            <div className="contact-panel">
              <div className="row g-5">
                <div className="col-lg-5 contact-copy">
                  <div className="eyebrow eyebrow-light">HAVE A PROJECT IN MIND?</div>
                  <h2>Let's make<br /><em>something</em><br />meaningful.</h2>
                  <p>Interested in a role, a collaboration or simply exchanging ideas? Send me a message.</p>
                  <div className="contact-links">
                    <SafeLink href={`mailto:${p.email}`}><i className="bi bi-envelope" /> {p.email}</SafeLink>
                    <SafeLink href={p.linkedin}><i className="bi bi-linkedin" /> LinkedIn profile</SafeLink>
                    <SafeLink href={p.github}><i className="bi bi-github" /> GitHub profile</SafeLink>
                  </div>
                </div>
                <div className="col-lg-6 offset-lg-1">
                  <form className="contact-form" onSubmit={submitContact}>
                    <div className="row g-3">
                      <div className="col-sm-6"><label htmlFor="name" className="form-label">Your name</label><input id="name" className="form-control" name="name" value={form.name} onChange={updateField} required maxLength="120" placeholder="Jane Smith" /></div>
                      <div className="col-sm-6"><label htmlFor="email" className="form-label">Email address</label><input id="email" type="email" className="form-control" name="email" value={form.email} onChange={updateField} required maxLength="254" placeholder="jane@company.com" /></div>
                      <div className="col-12"><label htmlFor="subject" className="form-label">Subject <span>(optional)</span></label><input id="subject" className="form-control" name="subject" value={form.subject} onChange={updateField} maxLength="180" placeholder="Let's connect" /></div>
                      <div className="col-12"><label htmlFor="message" className="form-label">Message</label><textarea id="message" className="form-control" rows="4" name="message" value={form.message} onChange={updateField} required maxLength="5000" placeholder="Tell me a little about what you have in mind..." /></div>
                      <div className="col-12 d-flex flex-wrap align-items-center gap-3"><button type="submit" className="btn btn-cream" disabled={sending}>{sending ? 'Sending…' : 'Send message'} <i className="bi bi-arrow-up-right ms-2" /></button><span className="form-note">Your message is saved securely by the portfolio API.</span></div>
                      {formStatus.message && <div className="col-12"><div className={`form-alert ${formStatus.type}`} role="status">{formStatus.message}</div></div>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <a className="brand-mark footer-brand" href="#home">sada<span>.</span></a>
          <p>Designed with curiosity, built with care.</p>
          <div className="footer-socials"><SafeLink href={p.github}>GitHub</SafeLink><SafeLink href={p.linkedin}>LinkedIn</SafeLink><a href="#home">Back to top ↑</a></div>
        </div>
      </footer>
      <div className="api-indicator" title={apiStatus === 'live' ? 'Portfolio content loaded from Django API' : 'Using local fallback content'}><span className={apiStatus === 'live' ? 'api-dot live' : 'api-dot'} /> {apiStatus === 'live' ? 'API connected' : 'Preview mode'}</div>
    </>
  );
}
