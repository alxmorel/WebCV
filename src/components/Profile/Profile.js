import './Profile.scss';

import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import WeatherCard from '../WeatherCard/WeatherCard';

const Profile = () => {

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [profileData, setProfileData] = useState(null); // État local pour stocker les données

    // const { filterType } = useParams();
    // const validFilterType = filterType || "global";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('webcv/data/users/profile.json');
                const data = await response.json();
                console.log("data du profile : ", data)
                setProfileData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
        // Clean up en cas de démontage du composant
        return () => {
            setProfileData(null);
        };
    }, []);

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
            {profileData ? (
                <>
                    <WeatherCard location={profileData.personalInfo.location} />
                    <div className="content_container">

                        {/* Section Résumé */}
                        <h2>Résumé</h2>
                        <p>{profileData.summary}</p>

                        {/* Section Expérience */}
                        <h2>Expérience</h2>
                        {profileData.experience.map((exp, index) => (
                            <div key={index}>
                                <h3>{exp.company}</h3>
                                <p>{exp.title}</p>
                                <p>{exp.duration}</p>
                                {/* Afficher les responsabilités et faits saillants ici */}
                            </div>
                        ))}

                        {/* Section Éducation */}
                        <h2>Éducation</h2>
                        {profileData.education.map((edu, index) => (
                            <div key={index}>
                                <h3>{edu.institution}</h3>
                                <p>{edu.degree}</p>
                                <p>{edu.duration}</p>
                                {/* Afficher les faits saillants de l'éducation ici */}
                            </div>
                        ))}

                        {/* Section Compétences */}
                        <h2>Compétences</h2>
                        {/* Afficher les compétences techniques, agiles, de gestion, langues, etc. ici */}
                        {/* Compétences techniques */}
                        <div>
                            <h3>Compétences Techniques</h3>
                            <ul>
                                {profileData.skills.technical.map((techSkill, index) => (
                                    <li key={index}>
                                        {techSkill.skill}: {techSkill.level}%
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compétences agiles */}
                        <div>
                            <h3>Compétences Agiles</h3>
                            <ul>
                                {profileData.skills.agile.map((agileSkill, index) => (
                                    <li key={index}>
                                        {agileSkill.skill}: {agileSkill.level}%
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compétences en gestion */}
                        <div>
                            <h3>Compétences en Gestion</h3>
                            <ul>
                                {profileData.skills.management.map((managementSkill, index) => (
                                    <li key={index}>
                                        {managementSkill.skill}: {managementSkill.level}%
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compétences linguistiques */}
                        <div>
                            <h3>Compétences Linguistiques</h3>
                            <ul>
                                {profileData.skills.languages.map((languageSkill, index) => (
                                    <li key={index}>
                                        {languageSkill.skill}: {languageSkill.level}%
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </>

            ) : (
                <p>Chargement des données...</p>
            )}
            <div className="container_btn_back_to_top">
                <div onClick={() => backToTop()}>HAUT DE PAGE ^</div>
            </div>
        </div>
    );

};

export default Profile;
