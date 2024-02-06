import './MenuMobile.scss'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuMobile = ({ isMobileMenuOpen, toggleMobileMenu }) => {

    const navigate = useNavigate();

    const routeToLandingPage = () => {
        toggleMobileMenu()
        navigate('/');
    };

    const routeToPage = (page) => {
        toggleMobileMenu()
        navigate(`/${page}`);
    };

    return (
        <div className={`mobile_menu ${isMobileMenuOpen ? 'open' : 'close'}`} >
            <div className='container_logo_menu_mobile' onClick={routeToLandingPage}>
                <img src={`/webcv/img/profile/alex.jpg`} height={120} width={120} alt='Profile image' />
                <h1>Alexandre Morel</h1>
            </div>
            <div className='container_custom_pages_menu'>
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
    );
};

export default MenuMobile;