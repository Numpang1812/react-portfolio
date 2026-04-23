import React from 'react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './home.css'
import selfPortrait from './assets/self-portrait-Photoroom.png'
import Experience from './components/experience'
import Education from './components/education'
import {
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
    SiLaravel, SiPython, SiCplusplus, SiNodedotjs,
    SiGithub, SiAmazonwebservices, SiMysql, SiMongodb, SiPhp,
    SiDart, SiFlutter, SiSvelte, SiSqlite, SiTurso,
    SiGooglecloud, SiSupabase, SiVercel, SiC, SiCloudinary, SiGit, SiSonarqube
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
        { name: "SonarQube", icon: <SiSonarqube /> },
    ],
    cloudServices: [
        { name: "Google Cloud", icon: <SiGooglecloud /> },
        { name: "AWS", icon: <SiAmazonwebservices /> },
        { name: "Cloudinary", icon: <SiCloudinary /> },
        { name: "Supabase", icon: <SiSupabase /> },
    ],
};

function Home() {
    const { t, i18n } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    // Close menu when a link is clicked
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <div className='home-container'>
            <div className='main-header'>
                <HomeHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <NavigationBar />
            </div>
            
            <MobileNavDrawer isOpen={isMenuOpen} onClose={closeMenu} />

            <div className='main-body'>
                <section className='introduction' id="home">
                    <div className='introduction-left'>
                        <h1>{t('home.greeting')}</h1>
                        <p>{t('home.intro1')}</p>
                        <p>{t('home.intro2')}</p>
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
            <p className='copyright-text'>{t('copyright')}</p>
        </div>
    )
}

function HomeHeader({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (v: boolean) => void }) {
    const { i18n } = useTranslation();
    const [isLangOpen, setIsLangOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'EN', flag: '/english-flag.jpg' },
        { code: 'ja', label: 'JP', flag: '/japan-flag.jpg' },
        { code: 'km', label: 'KH', flag: '/cambodia-flag.jpg' },
    ];

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

    const handleLanguageChange = (code: string) => {
        i18n.changeLanguage(code);
        setIsLangOpen(false);
    };

    return (
        <div className='header-titles'>
            <h3>Piseth Tyvirakpoung</h3>
            <div className='language-selector'>
                <button
                    className='language-button'
                    onClick={() => setIsLangOpen(!isLangOpen)}
                >
                    <img src={currentLanguage.flag} alt={currentLanguage.label} className='language-flag' />
                    {currentLanguage.label}
                    <span className='language-arrow'>{isLangOpen ? '▲' : '▼'}</span>
                </button>
                {isLangOpen && (
                    <div className='language-dropdown'>
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                className={`language-option ${lang.code === i18n.language ? 'active' : ''}`}
                                onClick={() => handleLanguageChange(lang.code)}
                            >
                                <img src={lang.flag} alt={lang.label} className='language-flag' />
                                {lang.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            
            <button 
                className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
            </button>
        </div>
    )
}

function NavigationBar() {
    const { t } = useTranslation();

    const navItems = [
        { label: t('nav.home'), href: "#home" },
        { label: t('nav.experience'), href: "#experience" },
        { label: t('nav.education'), href: "#education" },
        { label: t('nav.skills'), href: "#toolkit" },
        { label: t('nav.projects'), href: "#projects" },
        { label: t('nav.contact'), href: "#contact" },
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

function MobileNavDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { t } = useTranslation();

    const navItems = [
        { label: t('nav.home'), href: "#home" },
        { label: t('nav.experience'), href: "#experience" },
        { label: t('nav.education'), href: "#education" },
        { label: t('nav.skills'), href: "#toolkit" },
        { label: t('nav.projects'), href: "#projects" },
        { label: t('nav.contact'), href: "#contact" },
    ];

    return (
        <div className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
                <a 
                    key={item.label} 
                    href={item.href} 
                    className="mobile-nav-item"
                    onClick={onClose}
                >
                    {item.label}
                </a>
            ))}
        </div>
    );
}

function ToolKit() {
    const { t } = useTranslation();

    const formatCategoryName = (name: string) => {
        // Special case for devOps
        if (name === 'devOps') return 'DevOps';
        // Convert camelCase to space-separated words
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    };

    const getCategoryTranslation = (name: string) => {
        const key = name.toLowerCase();
        // Try lowercase key first (for simple keys like 'languages', 'frameworks')
        if (t(`toolkit.${key}`) !== `toolkit.${key}`) {
            return t(`toolkit.${key}`);
        }
        // Try camelCase key (for keys like 'cloudServices', 'authenticationServices')
        if (t(`toolkit.${name}`) !== `toolkit.${name}`) {
            return t(`toolkit.${name}`);
        }
        return formatCategoryName(name);
    };

    return (
        <div className='toolkit-container' id="toolkit">
            <h3>{t('toolkit.title')}</h3>
            <hr className='divider-line' />
            <div className='toolkit-cards-container'>
                {Object.entries(toolkit).map(([category, skills]) => (
                    <div key={category} className='toolkit-category'>
                        <h4 className='toolkit-category-title'>{getCategoryTranslation(category)}</h4>
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
    const { t } = useTranslation();

    const projects = t('projects.items', { returnObjects: true }) as Array<{
        title: string;
        description: string;
    }>;

    return (
        <div className='projects-container' id="projects">
            <h2>{t('projects.title')}</h2>
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
    const { t } = useTranslation();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
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
                body: JSON.stringify({ name, contact, message, website_confirm: honeypot }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok || !data?.ok) {
                setSendError(data?.error ?? 'Failed to send message');
                return;
            }

            setSendSuccess(true);
            setName('');
            setContact('');
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
            <h2>{t('footer.title')}</h2>
            <p>Email: pang.jpsoen@gmail.com | Phone: +855 78 685 747</p>

            <div className='button-container'>
                <button
                    className='contact-toggle'
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? t('footer.closeForm') : t('footer.contact')}
                </button>

                <button onClick={() => viewCV()} className='contact-toggle'>{t('footer.viewCV')}</button>
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
                            <div className='form-row'>
                                <div className='form-field'>
                                    <label>{t('footer.nameLabel')}</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('footer.namePlaceholder')}
                                        required
                                    />
                                </div>
                                <div className='form-field'>
                                    <label>{t('footer.contactLabel')}</label>
                                    <input
                                        type="text"
                                        value={contact}
                                        onChange={(e) => setContact(e.target.value)}
                                        placeholder={t('footer.contactPlaceholder')}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='form-field'>
                                <label>{t('footer.messageLabel')}</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={t('footer.placeholder')}
                                    required
                                />
                            </div>
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
                                {isSending ? t('footer.sending') : t('footer.send')}
                            </button>
                            {sendError && <p className='contact-form-error'>{t('footer.error')}</p>}
                            {sendSuccess && <p className='contact-form-success'>{t('footer.sent')}</p>}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Home
