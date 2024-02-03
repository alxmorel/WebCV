import './Footer.scss'
import React from 'react';

import Button from '../Button/Button';

const Footer = () => {
    return (
        <footer>
            <div className='up_footer_container'>
                <img className='logo_app' src='/img/logo_app.png' alt='app logo'></img>
                <div className='category_container'>
                    <div className='footer_category'>
                        <h3>Category Heading Lorem 1</h3>
                        <a href='/'>Lin name lorem 1</a>
                        <a href='/'>Lin name lorem 2</a>
                    </div>
                    <div className='footer_category'>
                        <h3>Category Heading Lorem 2</h3>
                        <a href='/'>Lin name lorem 1</a>
                        <a href='/'>Lin name lorem 2</a>
                    </div>
                </div>
                <div className='footer_social_links'>
                    <Button icon="faCoffee" type="solid" />
                    <Button icon="faEnvelope" type="regular" />
                    <Button icon="faCheck" type="solid" />
                </div>
            </div>
            <div className='down_footer_container'>
                <div className='legal_links'>
                    <a href='/'>SiteMap</a>
                    <a href='/'>Legal Notice</a>
                    <a href='/'>Cookie Policy</a>
                </div>
                <div className='copyright'>
                    © 2024 Alexandre Morel Web-cv
                </div>
            </div>
        </footer>
    );
};

export default Footer;