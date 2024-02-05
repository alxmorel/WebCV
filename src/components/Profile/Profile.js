import './Profile.scss';

import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import WeatherCard from '../WeatherCard/WeatherCard';
import SkillWordCloud from '../SkillWordCloud/SkillWordCloud';
import { useRef } from 'react';
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

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isFilterSticked, setIsFilterSticked] = useState(false);
    const filterContainerRef = useRef(null);

    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [selectedImageData, setSelectedImageData] = useState(null);

    const handleImageClick = (high) => {
        const { project, illustration, responsibility } = high;
        setSelectedImageData({
            project,
            illustration,
            responsibility,
        });
        setIsSliderOpen(true);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };
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

    const checkSticked = () => {
        const filterContainer = filterContainerRef.current;

        if (filterContainer) {
            const isSticked = filterContainer.getBoundingClientRect().top <= 0;
            setIsFilterSticked(isSticked);
        }
    };

    // Écouter l'événement de défilement
    useEffect(() => {
        window.addEventListener('scroll', checkSticked);

        // Nettoyer l'événement lors du démontage du composant
        return () => {
            window.removeEventListener('scroll', checkSticked);
        };
    }, []);


    return (
        <div className={`global_content_container`}>
            {profileData ? (
                <>
                    {isSliderOpen && selectedImageData && (
                        <div className="custom-slider-overlay" onClick={() => setIsSliderOpen(false)}>
                            <div className="slider-container">
                                {selectedImageData.illustration && (
                                    <img
                                        src={`/webcv/img/project/${selectedImageData.illustration.src}`}
                                        alt={`Image agrandie de ${selectedImageData.responsibility}`}
                                        className={`slider-image ${selectedImageData.illustration.height > selectedImageData.illustration.width ? 'portrait' : 'landscape'}`}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <WeatherCard location={profileData.personalInfo.location} />
                    <div className={`filter_container ${isFilterOpen ? '' : 'closed'} ${isFilterSticked ? 'filter-sticked' : ''}`} ref={filterContainerRef}>
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

                        {
                            isFilterSticked &&
                            <div className={`toggle_icon ${isFilterOpen ? 'rotate' : ''}`} onClick={toggleFilter} >
                                <svg height={22} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        }

                    </div>

                    <div className="content_container">

                        {/* Section Résumé */}
                        <h2 className='LandingPage_first_title'>Résumé</h2>
                        <p className='intro_text'></p>

                        {/* Section Expérience */}
                        <h2 className='LandingPage_first_title'>Expérience</h2>
                        {filteredExperienceList && filteredExperienceList.map((exp, index) => (
                            <div key={index} className='sub_item experiences'>
                                <div className='container_title_experience'>
                                    <div>
                                        <h3 className='LandingPage_second_title'>{exp.company}</h3>
                                        <p>{exp.duration}</p>
                                    </div>
                                    <p>{exp.title}</p>

                                </div>

                                {exp.responsibilities && (
                                    <div className='responsibilities'>
                                        {/* <h4>Responsabilités :</h4> */}
                                        <ul>
                                            {exp.responsibilities.map((resp, index) => (
                                                <div key={index} className='responsibility'>
                                                    <h4 className='LandingPage_third_title'>{resp.role}</h4>
                                                    <p >{resp.responsibility}</p>
                                                    {resp.highlights.map((high, index) => (
                                                        <div key={index} className='highlights'>
                                                            <div>
                                                                <h3 >{high.project}</h3>
                                                                <p >{high.responsibility}</p>
                                                            </div>
                                                            <img src={`/webcv/img/project/${high.illustration.src}`} alt={`Illustration projet ${high.illustration.src}`} onClick={() => handleImageClick(high)} />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Section Éducation */}
                        <h2 className='LandingPage_first_title'>Éducation</h2>
                        {filteredEducationList && filteredEducationList.map((edu, index) => (
                            <div key={index} className='sub_item experiences'>
                                <div className='container_title_experience'>
                                    <div>
                                        <h3 className='LandingPage_second_title'>{edu.institution}</h3>
                                        <p>{edu.duration}</p>
                                    </div>
                                    <p>{edu.degree}</p>
                                </div>
                                {edu.highlights && (
                                    <div className='highlights'>
                                        {edu.highlights.map((highlight, i) => (
                                            <div className='responsibilities' key={i}>
                                                <h4 className='LandingPage_third_title'></h4>

                                                {highlight}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Section Compétences */}
                        <h2 className='LandingPage_first_title'>Compétences</h2>
                        {/* Afficher les compétences techniques, agiles, de gestion, langues, etc. ici */}
                        {/* Compétences techniques */}
                        <div className='sub_item'>
                            <div className='container_title_experience'>
                                <div>
                                    <h3>Compétences Techniques</h3>
                                </div>
                                <p></p>
                            </div>
                            <ul className='skills'>
                                {profileData.skills.technical.map((techSkill, index) => (
                                    <li key={index}>
                                        {techSkill.skill}: {techSkill.level}%
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compétences agiles */}
                        <div className='sub_item'>
                            <div className='container_title_experience'>
                                <div>
                                    <h3>Compétences Agiles</h3>
                                </div>
                                <p></p>
                            </div>
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
                            <div className='container_title_experience'>
                                <div>
                                    <h3>Compétences en Gestion</h3>
                                </div>
                                <p></p>
                            </div>
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
                            <div className='container_title_experience'>
                                <div>
                                    <h3>Compétences Linguistiques</h3>
                                </div>
                                <p></p>
                            </div>
                            <ul>
                                {profileData.skills.languages.map((languageSkill, index) => (
                                    <li key={index}>
                                        {languageSkill.skill}: {languageSkill.level}%
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <SkillWordCloud skills={profileData.skills} />

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
