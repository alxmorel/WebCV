import './Header.scss';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    useEffect(() => { }, []);

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
                        <img src={`/webcv/img/profile/alex.jpg`} height={120} width={120} alt='Profile image' />
                        <h1>Alexandre Morel</h1>
                    </div>
                    <div className='container_custom_pages'>
                        <div className='services' onClick={() => routeToPage("services")}>
                            Services
                        </div>
                        <div className='competences' onClick={() => routeToPage("competences")}>
                            Compétences
                        </div>
                        <div className='portfolio' onClick={() => routeToPage("portfolio")}>
                            Portfolio
                        </div>
                        <div className='tarifs' onClick={() => routeToPage("tarifs")}>
                            Tarifs
                        </div>
                        <div className='a_propos' onClick={() => routeToPage("a-propos")}>
                            A Propos
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
