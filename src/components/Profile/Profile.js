import React, { useEffect, useState } from 'react';
import './Profile.scss';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

const Profile = () => {

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigate = useNavigate();

    const routeToProfile = (id) => {
        navigate(`/profiles/${id}`);
    };

    const { filterType } = useParams();
    const [articles, setArticles] = useState([]);


    useEffect(() => {
        //scroll to top
        window.scrollTo(0, 0);

        // Show or hide the "Back to Top" button based on the scroll position
        const handleScroll = () => {
            const button = document.querySelector('.container_btn_back_to_top');
            if (button) {
                button.style.opacity = window.scrollY > 100 ? 1 : 0;
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="global_content_container">
            <div className="content_container">
            
            </div>
            <div className="container_btn_back_to_top">
                <a onClick={() => backToTop()}>HAUT DE PAGE ^</a>
            </div>
        </div>
    );
};

export default Profile;
