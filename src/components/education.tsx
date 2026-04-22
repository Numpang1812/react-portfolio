import './education.css'

function Education() {
    const education = [
        {
            institution: "Preah Sisowath High School",
            degree: "High School Diploma",
            period: "2020 - 2023",
            description: "Completed high school with focus on STEM subjects such as mathematics, science, and technology"
        },
        {
            institution: "American University of Phnom Penh",
            degree: "Bachelor of Science in Software Development",
            period: "2024 - Present",
            description: "Currently pursuing a degree related with software development and architectural design"
        },
        
    ];

    return (
        <div className='education-container' id="education">
            <h3>Education:</h3>
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
