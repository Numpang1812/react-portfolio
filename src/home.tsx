import React from 'react'
import { useEffect, useState } from 'react'
import './home.css'
import selfPortrait from './assets/self-portrait-Photoroom.png'
import Experience from './components/experience'
import {
    SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
    SiLaravel, SiPython, SiCplusplus, SiNodedotjs,
    SiGithub, SiAmazonwebservices, SiMysql, SiMongodb, SiPhp,
    SiDart, SiFlutter, SiSvelte
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa6'
import Divider from './components/divider'
import CV from './assets/CV 2026.pdf'

const toolkit = [
    { name: "HTML5", icon: <SiHtml5 /> },
    { name: "CSS", icon: <SiCss3 /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "React", icon: <SiReact /> },
    { name: "Laravel", icon: <SiLaravel /> },
    { name: "Python", icon: <SiPython /> },
    { name: "Java", icon: <FaJava /> },
    { name: "C/C++", icon: <SiCplusplus /> },
    { name: "Node.js", icon: <SiNodedotjs /> },
    { name: "Git/GitHub", icon: <SiGithub /> },
    { name: "AWS", icon: <SiAmazonwebservices /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "PHP", icon: <SiPhp /> },
    { name: "Dart", icon: <SiDart /> },
    { name: "Flutter", icon: <SiFlutter /> },
    { name: "Svelte", icon: <SiSvelte /> },
];

function Home() {

    return (
        <div className='home-container'>
            <div className='main-header'>
                <HomeHeader />
                <NavigationBar />
            </div>
            <div className='main-body'>
                <div className='introduction'>
                    <div className='introduction-left'>
                        <h2>Hi, I'm Piseth Tyvirakpoung</h2>
                        <p>I'm a software developer and a Junior at the American University of Phnom Penh.</p>
                        <p>I love building web applications, small web-based games, and other software programs.</p>

                        {/* <div className='skills-section'>
                            <h2>What I Use:</h2>
                            <div className='skills-grid'>
                                {skills.map((skill, index) => (
                                    <span key={index} className='skill-tag'>
                                        {skill.icon} {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div> */}
                        <Experience></Experience>
                    </div>
                    <div className='introduction-right'>
                        <img src={selfPortrait} alt="Self Portrait" width={450} height={650} />
                    </div>
                </div>
            </div>
            <ToolKit></ToolKit>
            <Projects></Projects>
            <div className='main-footer'>
                <Footer />
            </div>
            <Divider/>
            <p>&copy; Tyvirakpoung Piseth 2026</p>
            
        </div>
    )
}

function HomeHeader() {
    return (
        <div className='header-titles'>
            <h3>Piseth Tyvirakpoung</h3>
            <span className='subtitle'>Software Developer</span>
        </div>
    )
}

function NavigationBar() {
    const navItems = ["Home", "Skills", "Skills", "Resume", "Contact"];

    return (
        <nav className='nav-bar'>
            <ul className='nav-list'>
                {navItems.map((item) => (
                    <li key={item} className='nav-item'>{item}</li>
                ))}
            </ul>
        </nav>
    )
}

function ToolKit() {
    return (
        <div className='toolkit-container'>
            <h3>Tool Kit:</h3>
            <Divider />
            <div className='toolkit-cards-container'>
                {toolkit.map((skill, index) => (
                    <span key={index} className='skill-tag'>
                        {skill.icon} {skill.name}
                    </span>
                ))}
            </div>
        </div>
    )
}

function Projects() {
    const Projects = [
        {
            title: "Property Listing Website (Node.js)",
            description: "A internal web-based application for listing and searching properties.",
        },
        {
            title: "Service Management System (Laravel)",
            description: "A internal web-based application for managing funeral services.",
        },
        {
            title: "E-Commerce Website (HTML5 + Tailwind)",
            description: "An e-commerce website for selling jewelry and accessories.",
        },
        {
            title: "Game Portfolio (Three.js)",
            description: "My personal portfolio made into an RPG game with a storyline.",
        },
        {
            title: "Terminal Chat Application (Java)",
            description: "A chatting application used in terminal.",
        },
        {
            title: "Sudoku Solver Application (Java)",
            description: "A software that solves sudoku up to 25x25 grids in seconds.",
        }
    ]
    return (
        <div className='projects-container'>
            <h2>Featured Projects:</h2>
            <Divider />
            <div className='projects-cards-grid'>
                {Projects.map((project, index) => (
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
                body: JSON.stringify({ message }),
            });

            const data = await res.json().catch(() => null);
            if (!res.ok || !data?.ok) {
                setSendError(data?.error ?? 'Failed to send message');
                return;
            }

            setSendSuccess(true);
            setMessage('');
            setIsFormVisible(false);
        } catch (err) {
            setSendError(String(err));
        } finally {
            setIsSending(false);
        }
    };

    function viewCV(){
        window.open(CV)
    }

    return (
        <div className='footer-content'>
            <h2>Connect with me</h2>
            <p>Email: pang.jpsoen@gmail.com | Phone: +855-78-685-747</p>


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
                        <div className='contact-modal-header'>
                            <h3>Send me a message</h3>
                            <button
                                type='button'
                                className='contact-modal-close'
                                onClick={() => setIsFormVisible(false)}
                                aria-label='Close'
                            >
                                ✕
                            </button>
                        </div>

                        <form className='contact-form' onSubmit={handleSubmit}>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write something..."
                                required
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

