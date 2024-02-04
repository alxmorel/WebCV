import './SkillWordCloud.scss';

import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const SkillWordCloud = ({ skills }) => {
    const words = skills.technical.map((techSkill) => ({
        text: techSkill.skill,
        value: techSkill.level,
    }));

    const size = [800, 400];
    const options = {
        colors: ["#81ffcb", "#23dd90", "#7667ff", "#ff716a", "#5C4D6E", "#ffbd4a"],
        fontFamily: "Montserrat-Bold, Arial",
    }

    return (
        <div className="wordcloud-container">
            <ReactWordcloud words={words} size={size} options={options} />
        </div>
    );
};

export default SkillWordCloud;
