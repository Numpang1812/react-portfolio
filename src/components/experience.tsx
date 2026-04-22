import { useState } from 'react'
import './experience.css'

interface ExperienceCardProps {
    company: string;
    title: string;
    description: string;
}

const ExperienceCard = ({ company, title, description, isExpanded, onToggle, cardIndex }: ExperienceCardProps & { isExpanded: boolean; onToggle: () => void; cardIndex: number }) => {
    return (
        <div className={`experience-card experience-card-${cardIndex}`}>
            <div className='experience-title'>
                <h3>{company}</h3>
                <small>{title}</small>
            </div>

            {isExpanded && (
                <p className="experience-desc">{description}</p>
            )}

            <button
                className="show-description-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
            >
                {isExpanded ? "Hide Job Description ▲" : "Show Job Description ▼"}
            </button>
        </div>
    );
};

function Experience() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

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

    const handleToggle = (company: string) => {
        console.log('Toggling:', company, 'Current expanded:', expandedCard);
        setExpandedCard(expandedCard === company ? null : company);
    };

    return (
        <div className='experience-container'>
            <h3>Work Experience:</h3>
            <div className='experience-cards-container'>
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={exp.company}
                        {...exp}
                        isExpanded={expandedCard === exp.company}
                        onToggle={() => handleToggle(exp.company)}
                        cardIndex={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default Experience
