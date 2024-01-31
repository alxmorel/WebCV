import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';

import './Button.scss';

const Button = ({ icon, type }) => {
    const iconType = type === 'solid' ? solidIcons : regularIcons;
    const selectedIcon = iconType[icon];

    return (
        <div className="button">
            <FontAwesomeIcon className="icon" icon={selectedIcon} width={40} height={40}/>
        </div>
    );
};

export default Button;
