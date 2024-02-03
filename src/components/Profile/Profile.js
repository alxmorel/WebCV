import './Profile.scss';

import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import WeatherCard from '../WeatherCard/WeatherCard';

const Profile = () => {

    const backToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const [profileData, setProfileData] = useState(null); // État local pour stocker les données
    const [filteredExperience, setFilteredExperience] = useState(null);
    const [filteredExperienceList, setFilteredExperiencelist] = useState([]);

    const [filteredEducation, setFilteredEducation] = useState(null);
    const [filteredEducationList, setFilteredEducationList] = useState([]);

    const [companyFilter, setCompanyFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    // const { filterType } = useParams();
    // const validFilterType = filterType || "global";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/webcv/data/users/profile.json');
                const data = await response.json();
                console.log("data du profile : ", data)
                setProfileData(data);
                handleFilterChange(data);
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


    const handleCompanyFilterChange = (value) => {
        setCompanyFilter(value);
        handleFilterChange(profileData);
    };

    const handleEducationFilterChange = (value) => {
        setFilteredEducation(value);
        handleFilterChange(profileData);
    };

    const handleStartDateFilterChange = (value) => {
        setStartDateFilter(value);
        handleFilterChange(profileData);
    };

    const handleEndDateFilterChange = (value) => {
        setEndDateFilter(value);
        handleFilterChange(profileData);
    };

    const handleFilterChange = (data) => {
        // Filtrer les expériences en fonction du champ "company" ou du champ "title"
        const filteredExpList = data.experience.filter(exp => {
            const companyMatch = exp.company.toLowerCase().includes(companyFilter?.toLowerCase() || '');
            const titleMatch = exp.title.toLowerCase().includes(companyFilter?.toLowerCase() || '');
            return companyMatch || titleMatch;
        });

        const filteredEducList = data.education.filter(educ => {
            const institutionMatch = educ.institution.toLowerCase().includes(filteredEducation?.toLowerCase() || '');
            const degreeMatch = educ.degree.toLowerCase().includes(filteredEducation?.toLowerCase() || '');
            return institutionMatch || degreeMatch;
        });

        // Mettre à jour l'état local avec les expériences filtrées
        setFilteredExperiencelist(filteredExpList);

        // Mettre à jour l'état local avec les données éducatives filtrées
        setFilteredEducationList(filteredEducList);
    };

    useEffect(() => {
        if (profileData) {
            // Fonction pour gérer l'effet de frappe
            const typeWriter = (text, element, speed) => {
                let i = 0;
                const typeEffect = () => {
                    if (i < text.length) {
                        element.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(typeEffect, speed);
                    }
                };
                typeEffect();
            };

            // Appel de la fonction pour votre texte d'introduction
            const introTextElement = document.querySelector('.intro_text');
            const introText = profileData.summary;
            typeWriter(introText, introTextElement, 30); // Ajustez la vitesse selon vos besoins
        }

    }, [profileData]);

    return (
        <div className="global_content_container">
            {profileData ? (
                <>
                    <WeatherCard location={profileData.personalInfo.location} />
                    <div className='filter_container'>
                        <div>
                            <label>Entreprise:</label>
                            <input type="text" value={companyFilter} onChange={(e) => handleCompanyFilterChange(e.target.value)} />
                        </div>
                        <div>
                            <label>Education:</label>
                            <input type="text" value={filteredEducation} onChange={(e) => handleEducationFilterChange(e.target.value)} />
                        </div>
                        <div>
                            <label>Date de début:</label>
                            <input type="date" value={startDateFilter} onChange={(e) => handleStartDateFilterChange(e.target.value)} />
                        </div>
                        <div>
                            <label>Date de fin:</label>
                            <input type="date" value={endDateFilter} onChange={(e) => handleEndDateFilterChange(e.target.value)} />
                        </div>
                    </div>

                    <div className="content_container">

                        {/* Section Résumé */}
                        <h2 className='LandingPage_first_title'>Résumé</h2>
                        <p className='intro_text'></p>

                        {/* Section Expérience */}
                        <h2>Expérience</h2>
                        {filteredExperienceList && filteredExperienceList.map((exp, index) => (
                            <div key={index} className='sub_item'>
                                <h3>{exp.company}</h3>
                                <p>{exp.title}</p>
                                <p>{exp.duration}</p>
                                {/* Afficher les responsabilités et faits saillants ici */}
                            </div>
                        ))}

                        {/* Section Éducation */}
                        <h2 className='LandingPage_first_title'>Éducation</h2>
                        {filteredEducationList && filteredEducationList.map((edu, index) => (
                            <div key={index} className='sub_item'>
                                <h3>{edu.institution}</h3>
                                <p>{edu.degree}</p>
                                <p>{edu.duration}</p>
                                {/* Afficher les faits saillants de l'éducation ici */}
                            </div>
                        ))}

                        {/* Section Compétences */}
                        <h2 className='LandingPage_first_title'>Compétences</h2>
                        {/* Afficher les compétences techniques, agiles, de gestion, langues, etc. ici */}
                        {/* Compétences techniques */}
                        <div className='sub_item'>
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
                        <div className='sub_item'>
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
                        <div className='sub_item'>
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
                        <div className='sub_item'>
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
