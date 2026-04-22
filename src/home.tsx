import React from 'react'
import { useEffect, useState } from 'react'
import './home.css'
import selfPortrait from './assets/self-portrait-Photoroom.png'
import Experience from './components/experience'
import Education from './components/education'
import {
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
    SiLaravel, SiPython, SiCplusplus, SiNodedotjs,
    SiGithub, SiAmazonwebservices, SiMysql, SiMongodb, SiPhp,
    SiDart, SiFlutter, SiSvelte, SiSqlite, SiTurso,
    SiGooglecloud, SiSupabase, SiVercel, SiC, SiCloudinary, SiGit
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import CV from './assets/CV 2026.pdf'

const toolkit = {
    languages: [
        { name: "HTML5", icon: <SiHtml5 /> },
        { name: "CSS", icon: <SiCss3 /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Python", icon: <SiPython /> },
        { name: "Java", icon: <FaJava /> },
        { name: "C", icon: <SiC /> },
        { name: "C++", icon: <SiCplusplus /> },
        { name: "PHP", icon: <SiPhp /> },
        { name: "Dart", icon: <SiDart /> },
    ],
    frameworks: [
        { name: "React", icon: <SiReact /> },
        { name: "Laravel", icon: <SiLaravel /> },
        { name: "Flutter", icon: <SiFlutter /> },
        { name: "Svelte", icon: <SiSvelte /> },
        { name: "Node.js", icon: <SiNodedotjs /> },
    ],
    databases: [
        { name: "MySQL", icon: <SiMysql /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "SQLite", icon: <SiSqlite /> },
        { name: "Turso", icon: <SiTurso /> },
    ],
    devOps: [
        { name: "GitHub", icon: <SiGithub /> },
        { name: "Git", icon: <SiGit/> },
        { name: "Vercel", icon: <SiVercel /> },
    ],
    cloudServices: [
        { name: "Google Cloud", icon: <SiGooglecloud /> },
        { name: "AWS", icon: <SiAmazonwebservices /> },
        { name: "Cloudinary", icon: <SiCloudinary /> },
        { name: "Supabase", icon: <SiSupabase /> },
    ],
};

function Home() {
    return (
        <div className='home-container'>
            <div className='main-header'>
                <HomeHeader />
                <NavigationBar />
            </div>
            <div className='main-body'>
                <section className='introduction' id="home">
                    <div className='introduction-left'>
                        <h1>Hi, I'm Piseth Tyvirakpoung</h1>
                        <p>I'm a software developer and a Junior at the American University of Phnom Penh.</p>
                        <p>I love building web applications, small web-based games, and other software programs.</p>
                    </div>
                    <div className='introduction-right'>
                        <img src={selfPortrait} alt="Piseth Tyvirakpoung" width={320} height={460} />
                    </div>
                </section>
            </div>
            <Education />
            <Experience />
            <ToolKit />
            <Projects />
            <div className='main-footer'>
                <Footer />
            </div>
            <p className='copyright-text'>&copy; Tyvirakpoung Piseth 2026</p>
        </div>
    )
}

function HomeHeader() {
    return (
        <div className='header-titles'>
            <h3>Piseth Tyvirakpoung</h3>
        </div>
    )
}

function NavigationBar() {
    const navItems = [
        { label: "Home", href: "#home" },
        { label: "Experience", href: "#experience" },
        { label: "Education", href: "#education" },
        { label: "Skills", href: "#toolkit" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <nav className='nav-bar'>
            <ul className='nav-list'>
                {navItems.map((item) => (
                    <li key={item.label} className='nav-item'>
                        <a href={item.href}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

function ToolKit() {
    const formatCategoryName = (name: string) => {
        // Special case for devOps
        if (name === 'devOps') return 'DevOps';
        // Convert camelCase to space-separated words
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    return (
        <div className='toolkit-container' id="toolkit">
            <h3>Tool Kit:</h3>
            <hr className='divider-line' />
            <div className='toolkit-cards-container'>
                {Object.entries(toolkit).map(([category, skills]) => (
                    <div key={category} className='toolkit-category'>
                        <h4 className='toolkit-category-title'>{formatCategoryName(category)}</h4>
                        <div className='toolkit-skills'>
                            {skills.map((skill, index) => (
                                <span key={index} className='skill-tag' title={skill.name}>
                                    {skill.icon}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Projects() {
    const projects = [
        {
            title: "Property Listing Website (Node.js)",
            description: "Property listing website (on Node.js) is a containerized resource for your favorites, allowing you to browse and detail your home website.",
        },
        {
            title: "Service Management System (Laravel)",
            description: "Service management system (Laravel) provides service management system, and services and rating automotive customer.",
        },
        {
            title: "E-Commerce Website (HTML5 + Tailwind)",
            description: "E-Commerce website (HTML5 + Tailwind) to bolster your customers on in-store, site website and commerce.",
        },
        {
            title: "Game Portfolio (Three.js)",
            description: "Game Portfolio (Three.js) is convert building, drawn pines or creation/code development, immersive, with bridges.",
        },
        {
            title: "Terminal Chat Application (Java)",
            description: "Terminal chat application (Java) is also gamist sow previous terminal management tool and chat application.",
        },
        {
            title: "Sudoku Solver Application (Java)",
            description: "Sudoku solver application (Java) is a real format and sudoku game integration in with your networks.",
        }
    ]
    return (
        <div className='projects-container' id="projects">
            <h2>Featured Projects:</h2>
            <hr className='divider-line' />
            <div className='projects-cards-grid'>
                {projects.map((project, index) => (
                    <div key={index} className='project-card'>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Footer() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState<string | null>(null);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [honeypot, setHoneypot] = useState('');

    useEffect(() => {
        if (!isFormVisible) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsFormVisible(false);
            }
        };

        document.addEventListener('keydown', onKeyDown);

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [isFormVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setSendError(null);
        setSendSuccess(false);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, website_confirm: honeypot }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok || !data?.ok) {
                setSendError(data?.error ?? 'Failed to send message');
                return;
            }

            setSendSuccess(true);
            setMessage('');

            setTimeout(() => {
                setIsFormVisible(false);
                setSendSuccess(false);
            }, 2000);
        } catch (err) {
            setSendError(String(err));
        } finally {
            setIsSending(false);
        }
    };

    function viewCV() {
        window.open(CV)
    }

    return (
        <div className='footer-content' id="contact">
            <h2>Connect with me</h2>
            <p>Email: pang.jpsoen@gmail.com | Phone: +855 78 685 747</p>

            <div className='button-container'>
                <button
                    className='contact-toggle'
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? 'Close Form' : 'Send me a Message'}
                </button>

                <button onClick={() => viewCV()} className='contact-toggle'>View my Curriculum Vitae</button>
            </div>

            {isFormVisible && (
                <div
                    className='contact-modal-backdrop'
                    role='presentation'
                    onClick={() => setIsFormVisible(false)}
                >
                    <div
                        className='contact-modal'
                        role='dialog'
                        aria-modal='true'
                        aria-label='Contact form'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span
                            className='contact-modal-close'
                            onClick={() => setIsFormVisible(false)}
                            role='button'
                            tabIndex={0}
                            aria-label='Close'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') setIsFormVisible(false);
                            }}
                        >
                            ✕
                        </span>

                        <form className='contact-form' onSubmit={handleSubmit}>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write something..."
                                required
                            />
                            {/* Honeypot field */}
                            <input
                                type="text"
                                name="website_confirm"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                            <button type="submit" disabled={isSending}>
                                {isSending ? 'Sending...' : 'Send'}
                            </button>
                            {sendError && <p className='contact-form-error'>{sendError}</p>}
                            {sendSuccess && <p className='contact-form-success'>Sent!</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Home
