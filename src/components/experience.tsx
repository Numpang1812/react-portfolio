import { useState } from 'react'
import './experience.css'

interface ExperienceCardProps {
    company: string;
    title: string;
    description: string;
}

const ExperienceCard = ({ company, title, description }: ExperienceCardProps) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div className='experience-card'>
            <div className='experience-title'>
                <h3>{company}</h3>
                <small>{title}</small>
            </div>

            {showDescription && (
                <p className="experience-desc">{description}</p>
            )}

            <button
                className="show-description-btn"
                onClick={() => setShowDescription(!showDescription)}
            >
                {showDescription ? "Hide Job Description ▲" : "Show Job Description ▼"}
            </button>
        </div>
    );
};

function Experience() {
    const experiences = [
        {
            company: "SBI Ly Hour Bank Plc.",
            title: "Software Developer Intern",
            description: "Managed two internal web application development projects for the bank. Worked on full-stack development with HTML, CSS, JavaScript, Node.js, MongoDB, and AWS S3."
        },
        {
            company: "NextMake Inc.",
            title: "Full-Stack Developer Trainee",
            description: "Assisted senior developers in building web-based applications with Laravel. Worked on full-stack development with PHP, Blade, MySQL, Git, and Bootstrap."
        }
    ];

    return (
        <div className='experience-container'>
            <h3>Work Experience:</h3>
            <div className='experience-cards-container'>
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} {...exp} />
                ))}
            </div>
        </div>
    )
}

export default Experience
