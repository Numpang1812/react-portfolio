import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './experience.css'

interface ExperienceCardProps {
    company: string;
    title: string;
    description: string;
    period: string;
}

const ExperienceCard = ({ company, title, description, period, isExpanded, onToggle, cardIndex }: ExperienceCardProps & { isExpanded: boolean; onToggle: () => void; cardIndex: number }) => {
    const { t } = useTranslation();

    return (
        <div className={`experience-card experience-card-${cardIndex}`}>
            <div className='experience-title'>
                <h3>{company}</h3>
                <small>{title}</small>
                <span className='experience-period'>{period}</span>
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
                {isExpanded ? t('experience.hideDescription') : t('experience.showDescription')}
            </button>
        </div>
    );
};

function Experience() {
    const { t } = useTranslation();
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const experiences = t('experience.items', { returnObjects: true }) as Array<{
        company: string;
        title: string;
        description: string;
        period: string;
    }>;

    const handleToggle = (company: string) => {
        console.log('Toggling:', company, 'Current expanded:', expandedCard);
        setExpandedCard(expandedCard === company ? null : company);
    };

    return (
        <div className='experience-container'>
            <h3>{t('experience.title')}</h3>
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
