import './education.css'
import { useTranslation } from 'react-i18next'

function Education() {
    const { t } = useTranslation();

    const education = t('education.items', { returnObjects: true }) as Array<{
        institution: string;
        degree: string;
        period: string;
        description: string;
    }>;

    return (
        <div className='education-container' id="education">
            <h3>{t('education.title')}</h3>
            <div className='education-cards-container'>
                {education.map((edu, index) => (
                    <div key={index} className='education-card'>
                        <div className='education-title'>
                            <h3>{edu.institution}</h3>
                            <small>{edu.degree}</small>
                            <span className='education-period'>{edu.period}</span>
                        </div>
                        <p className="education-desc">{edu.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Education
