import './Header.scss';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    useEffect(() => {}, []);

    const routeToLandingPage = () => {
        navigate('/');
    };

    const routeToPage = (page) => {
        navigate(`/${page}`);
    };

    return (
        <header>
            <div className='border_header'></div>
            <div className='header_container'>
                <div className='search_bar'>
                    <FontAwesomeIcon className='icon' icon={solidIcons['faSearch']} width={40} height={40} />
                </div>
                <div className='container_logo_pages'>
                    <div className='container_logo_website' onClick={routeToLandingPage}>
                        <img src={`../img/profile/alexPP-reformat_800ko.jpg`} alt='Website logo' height={120} />
                        <h1>Alexandre Morel</h1>
                    </div>
                    <div className='container_custom_pages'>
                        <a className='services' onClick={() => routeToPage("services")}>
                            Services
                        </a>
                        <a className='competences' onClick={() => routeToPage("competences")}>
                            Compétences
                        </a>
                        <a className='portfolio' onClick={() => routeToPage("portfolio")}>
                            Portfolio
                        </a>
                        <a className='tarifs' onClick={() => routeToPage("tarifs")}>
                            Tarifs
                        </a>
                        <a className='a_propos' onClick={() => routeToPage("a-propos")}>
                            A Propos
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
