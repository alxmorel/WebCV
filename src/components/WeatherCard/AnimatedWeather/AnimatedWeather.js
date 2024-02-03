// import './AnimatedWeather.scss';
// import React, { useEffect, useRef } from 'react';
// import gsap, { TweenMax, Power1 } from 'gsap';
// import Snap from 'snapsvg-cjs';

// const AnimatedWeather = () => {

// const containerRef = useRef(null);
// const cardRef = useRef(null);
// const innerRainHolderRef = useRef(null);
// const innerLeafHolderRef = useRef(null);
// const innerSnowHolderRef = useRef(null);
// const innerHailHolderRef = useRef(null);
// const outerLeafHolderRef = useRef(null);
// const outerSnowHolderRef = useRef(null);
// const outerHailHolderRef = useRef(null);
// const outerSplashHolderRef = useRef(null);
// const leafMaskRef = useRef(null);
// const rainMaskRef = useRef(null);
// const sunburstRef = useRef(null);
// const snowMaskRef = useRef(null);
// const hailMaskRef = useRef(null);
// const sunRef = useRef(null);
// const tempRef = useRef(null);
// const outerSVGRef = useRef(null);
// const innerSVGRef = useRef(null);
// const backSVGRef = useRef(null);
// const summaryRef = useRef(null);
// const dateRef = useRef(null);
// const tempFormatRef = useRef(null);
// const weatherContainer1Ref = useRef(null);
// const weatherContainer2Ref = useRef(null);
// const weatherContainer3Ref = useRef(null);
// const thunderBoltsRef = useRef(null);
// const snowflakesRef = useRef(null);

//     const sizes = {
//         card: { width: 800, height: 600 },
//         container: { width: 1000, height: 800 }
//     };

//     const clouds = Array.from({ length: 3 }, () => ({ group: useRef(null), offset: Math.random() * sizes.card.width }));
//     const fog = Array.from({ length: 3 }, () => ({ group: useRef(null) }));

//     const classes = ['night', 'day', 'hot', 'cold'];

//     const weather = [
//         { type: 'snow', class: '', intensity: 1, name: 'Snow' },
//         { type: 'mix', class: '', intensity: 1, name: 'Winter Mix' },
//         // ... (other weather types)
//     ];

//     const weatherMap = {
//         0: { type: 'severe', class: '', intensity: 5, icon: 'wi-tornado', name: 'Tornado' },
//         1: { type: 'severe', class: '', intensity: 2.5, icon: 'wi-thunderstorm', name: 'Tropical Storm' },
//         // ... (remaining weather map entries)
//     };

//     let settings = {
//         windSpeed: 2,
//         rainCount: 0,
//         hailCount: 0,
//         leafCount: 0,
//         snowCount: 0,
//         fogCount: 0,
//         cloudHeight: 100,
//         cloudSpace: 30,
//         cloudArch: 50,
//         renewCheck: 10,
//         splashBounce: 80
//     };
    
//     let tickCount = 0;
//     let thunderBoltCount = 0;

//     let rain = [];
//     let leafs = [];
//     let snow = [];
//     let hail = [];
//     let currentWeather = {};

//     useEffect(() => {
//         init();
//         window.addEventListener('resize', onResize);
//         requestAnimationFrame(tick);

//         return () => {
//             window.removeEventListener('resize', onResize);
//         };
//     }, []);

//     const init = () => {
//         const rainMaskRef = Snap();
//         const snowMaskRef = Snap();
//         const hailMaskRef = Snap();

//         onResize();
//         updateDateText();

//         clouds.forEach((cloud, i) => drawCloud(cloud, i));
//         fog.forEach((fogItem, i) => drawFog(fogItem, i));

//         for (let i = 0; i < 5; i++) {
//             drawRaindrop(i);
//             drawLeaf(i);
//             drawSnowflake(i);
//             drawHailstone(i);
//         }

//         drawRainMask();
//         drawLeafMask();
//         drawSnowMask();
//         drawHailMask();

//         drawSun();
//         drawSunburst();
//         drawSnowflakes();
//         drawClouds();
//         drawThunderBolts();

//         innerRainHolderRef.current.add(innerSnowHolderRef.current);
//         innerRainHolderRef.current.add(innerLeafHolderRef.current);
//         innerRainHolderRef.current.add(innerHailHolderRef.current);
//         innerRainHolderRef.current.attr({ mask: rainMaskRef });

//         outerLeafHolderRef.current.add(outerSnowHolderRef.current);
//         outerLeafHolderRef.current.add(outerHailHolderRef.current);
//         outerLeafHolderRef.current.add(outerSplashHolderRef.current);
//         outerLeafHolderRef.current.attr({ mask: leafMaskRef.current });

//         weatherContainer1Ref.current.add(innerHailHolderRef.current);
//         weatherContainer1Ref.current.add(innerRainHolderRef.current);
//         weatherContainer1Ref.current.add(innerLeafHolderRef.current);
//         weatherContainer1Ref.current.add(innerSnowHolderRef.current);

//         weatherContainer2Ref.current.add(outerLeafHolderRef.current);
//         weatherContainer2Ref.current.add(innerHailHolderRef.current);

//         weatherContainer3Ref.current.add(innerRainHolderRef.current);
//         weatherContainer3Ref.current.add(innerSnowHolderRef.current);

//         cardRef.current.attr({ viewBox: '0 0 ' + sizes.card.width + ' ' + sizes.card.height });
//         containerRef.current.attr({ viewBox: '0 0 ' + sizes.container.width + ' ' + sizes.container.height });

//         currentWeather = weather[1];
//         currentWeather.intensity = 0;
//         updateWeather();
//     };

//     const updateWeather = () => {
//         weather.forEach((weatherType) => cardRef.current.removeClass(weatherType.class));
//         cardRef.current.addClass(currentWeather.class);

//         switch (currentWeather.type) {
//             case 'wind':
//                 TweenMax.to(outerLeafHolderRef.current.node, 1, { rotation: 5, transformOrigin: '50% 100%', ease: Power1.easeInOut });
//                 break;
//             default:
//                 TweenMax.to(outerLeafHolderRef.current.node, 1, { rotation: 0, ease: Power1.easeInOut });
//                 break;
//         }

//         rainMaskRef.attr({ opacity: currentWeather.intensity });

//         if (currentWeather.intensity >= 0.2) {
//             if (rain.length < settings.rainCount) {
//                 drawRaindrop(rain.length);
//             }
//         }

//         TweenMax.to(currentWeather, 1, { intensity: 1, onUpdate: applyWeatherIntensity, onComplete: updateWeather });
//     };

//     const applyWeatherIntensity = () => {
//         let ease = Power1.easeInOut;
//         let windOffset = (sizes.card.width * 0.2) / 2;
//         let sunRotation = 0;
//         let sunX = 0;
//         let sunY = 0;
//         let sunOpacity = 1;
//         let snowOpacity = 0;
//         let tempY = 0;
//         let tempOpacity = 1;
//         let snowX = 0;
//         let hailX = 0;
//         let hailOpacity = 0;
//         let splashY = 0;
//         let splashOpacity = 0;

//         switch (currentWeather.type) {
//             case 'cloud':
//                 sunRotation = 0;
//                 sunX = sizes.card.width * 0.15;
//                 sunY = sizes.card.height * 0.15;
//                 sunOpacity = 0.7;
//                 tempY = sizes.card.height * 0.8;
//                 break;
//             case 'sleet':
//                 snowX = sizes.card.width / 2;
//                 hailX = sizes.card.width / 2;
//                 hailOpacity = currentWeather.intensity;
//                 splashY = sizes.card.height * 0.8;
//                 splashOpacity = currentWeather.intensity;
//                 break;
//             case 'wind':
//                 sunRotation = -5;
//                 sunX = sizes.card.width * 0.15;
//                 sunY = sizes.card.height * 0.15;
//                 sunOpacity = 0.7;
//                 tempY = sizes.card.height * 0.8;
//                 break;
//             // ... (handle other weather types)
//         }

//         TweenMax.to(outerSnowHolderRef.current.node, 1, { x: snowX, ease: ease, opacity: snowOpacity });
//         TweenMax.to(outerHailHolderRef.current.node, 1, { x: hailX, ease: ease, opacity: hailOpacity });
//         TweenMax.to(outerSplashHolderRef.current.node, 1, { y: splashY, ease: ease, opacity: splashOpacity });
//         TweenMax.to(sunRef.current.node, 1, { rotation: sunRotation, x: sunX, y: sunY, ease: ease, opacity: sunOpacity });
//         TweenMax.to(tempRef.current.node, 1, { y: tempY, ease: ease, opacity: tempOpacity });
//     };

//     const drawCloud = (cloud, i) => {
//         // ... (code pour dessiner les nuages)
//         clouds[i].group = outerSVGRef.current.group();
//         clouds[i].bottom = clouds[i].group.path('M459 824c15 0 28-13 28-28s-13-28-28-28c-59 0-107-48-107-107s48-107 107-107 107 48 107 107c0 21 17 38 38 38s38-17 38-38-17-38-38-38c-93 0-170 77-170 170s77 170 170 170z');
//         clouds[i].top = clouds[i].group.path('M635 360c21 0 38-17 38-38s-17-38-38-38c-21 0-38 17-38 38 0 21 17 38 38 38z');
//         clouds[i].group.move(cloud.offset, settings.cloudHeight);
//         clouds[i].group.opacity(0.8);
//     };

//     const drawFog = (fog, i) => {
//         // ... (code pour dessiner la brume)
//         fog[i].group = outerSVGRef.current.group();
//         fog[i].top = fog[i].group.rect(sizes.container.width, sizes.container.height);
//         fog[i].group.move(0, settings.cloudHeight);
//         fog[i].group.opacity(0.5);
//     };

//     const drawRaindrop = (i) => {
//         // ... (code pour dessiner les gouttes de pluie)
//         rain[i] = {
//             group: outerSVGRef.current.group(),
//             bottom: outerSVGRef.current.path('M636 856l17-31c9-17 28-26 46-21 20 5 31 25 26 45l-17 99c-5 20-25 31-45 26-20-5-31-25-26-46z'),
//             top: outerSVGRef.current.path('M653 825c16 0 30-14 30-30s-14-30-30-30c-65 0-117-53-117-117s52-117 117-117 117 52 117 117c0 24 19 43 43 43s43-19 43-43-19-43-43-43c-104 0-188 84-188 188s84 188 188 188z'),
//         };
//         rain[i].group.move((Math.random() * sizes.card.width), (Math.random() * sizes.card.height));
//         rain[i].group.opacity(0.5 + Math.random() * 0.5);
//     };

//     const drawLeaf = (i) => {
//         // ... (code pour dessiner les feuilles)
//         leafs[i] = {
//             group: outerSVGRef.current.group(),
//             leaf: outerSVGRef.current.path('M713 890c6-35 2-68-13-98-22-36-56-65-96-86-39-20-84-31-130-29-44 1-87 14-124 35-10 6-21 10-33 12-14 1-27-3-39-11-7-4-14-11-18-18-8-14-9-32-3-48s-14-29-28-34c-30-11-62 12-73 40-12 30-10 66 5 95 13 29 34 52 63 65 16 7 34 11 52 11 32 0 64-13 91-37 7-6 14-12 21-18 5-5 11-10 16-16 13-14 24-30 31-48 9-21 11-44 5-66s-21-42-42-51c-17-7-37-8-54-1-20 8-37 23-50 41-13 18-22 40-25 63-4 23-1 46 8 67 4 11 9 22 15 33 9 18 22 35 39 49 8 7 18 13 28 17 14 5 28 8 43 8 29 1 58-13 82-33 7-6 15-10 23-14 13-5 27-6 40-1 14 5 27 13 38 24 17 18 29 41 35 65 4 13 10 25 18 35 5 7 11 14 18 20 10 9 21 18 35 24 14 7 30 11 45 10 26-2 51-16 72-37z'),
//         };
//         leafs[i].group.move((Math.random() * sizes.card.width), settings.cloudHeight + (Math.random() * (sizes.card.height - settings.cloudHeight)));
//         leafs[i].group.opacity(0.5 + Math.random() * 0.5);
//     };

//     const drawSnowflake = (i) => {
//         // ... (code pour dessiner les flocons de neige)
//         snow[i] = {
//             group: outerSVGRef.current.group(),
//             flake: outerSVGRef.current.path('M798 884c9 0 18-3 26-9 14-11 22-27 22-44s-8-33-22-44c-5-4-11-7-17-8-7-1-14 0-21 3-6 3-12 9-16 16-4 7-3 15 1 21 7 12 22 20 39 20z'),
//         };
//         snow[i].group.move((Math.random() * sizes.card.width), (Math.random() * sizes.card.height));
//         snow[i].group.opacity(0.5 + Math.random() * 0.5);
//     };

//     const drawHailstone = (i) => {
//         // ... (code pour dessiner la grêle)
//         hail[i] = {
//             group: outerSVGRef.current.group(),
//             stone: outerSVGRef.current.rect(22, 22),
//         };
//         hail[i].group.move((Math.random() * sizes.card.width), (Math.random() * sizes.card.height));
//         hail[i].group.opacity(0.5 + Math.random() * 0.5);
//     };

//     const drawRainMask = () => {
//         // ... (code pour dessiner le masque de pluie)
//         rainMaskRef.current = Snap();
//         rainMaskRef.current.rect(0, 0, sizes.card.width, sizes.card.height).attr({ fill: '#fff' });
//     };

//     const drawLeafMask = () => {
//         // ... (code pour dessiner le masque de feuilles)
//         leafMaskRef.current = Snap();
//         leafMaskRef.current.rect(0, 0, sizes.card.width, sizes.card.height).attr({ fill: '#fff' });
//     };

//     const drawSnowMask = () => {
//         // ... (code pour dessiner le masque de neige)
//         snowMaskRef.current = Snap();
//         snowMaskRef.current.rect(0, 0, sizes.card.width, sizes.card.height).attr({ fill: '#fff' });
//     };

//     const drawHailMask = () => {
//         // ... (code pour dessiner le masque de grêle)
//         hailMaskRef.current = Snap();
//         hailMaskRef.current.rect(0, 0, sizes.card.width, sizes.card.height).attr({ fill: '#fff' });
//     };

//     const drawSun = () => {
//         // ... (code pour dessiner le soleil)
//         sunRef.current = outerSVGRef.current.group();
//         sunRef.current.circle(50, 50, 35).attr({ fill: '#FFD03E' });
//         sunRef.current.line(50, 15, 50, 85).attr({ stroke: '#FFD03E', strokeWidth: 5 });
//         sunRef.current.line(15, 50, 85, 50).attr({ stroke: '#FFD03E', strokeWidth: 5 });
//         sunRef.current.move((sizes.card.width * 0.2), (sizes.card.height * 0.15));
//     };

//     const drawSunburst = () => {
//         // ... (code pour dessiner la rafale de soleil)
//         sunburstRef.current = outerSVGRef.current.group();
//         for (let i = 0; i < 12; i++) {
//             sunburstRef.current.line(50, 50, 75, 50).attr({ stroke: '#FFD03E', strokeWidth: 5 });
//             sunburstRef.current.line(50, 50, 65, 50).attr({ stroke: '#FFD03E', strokeWidth: 5, transform: 'rotate(30 50 50)' });
//             sunburstRef.current.line(50, 50, 75, 50).attr({ stroke: '#FFD03E', strokeWidth: 5, transform: 'rotate(60 50 50)' });
//             sunburstRef.current.rotate(360 / 12, 50, 50);
//         }
//         sunburstRef.current.move((sizes.card.width * 0.2), (sizes.card.height * 0.15));
//     };

//     const drawSnowflakes = () => {
//         // ... (code pour dessiner les flocons de neige)
//         for (let i = 0; i < 3; i++) {
//             let flake = outerSVGRef.current.group();
//             flake.circle(50, 50, 10).attr({ fill: '#fff' });
//             flake.line(50, 40, 50, 60).attr({ stroke: '#fff', strokeWidth: 3 });
//             flake.line(40, 50, 60, 50).attr({ stroke: '#fff', strokeWidth: 3 });
//             flake.move((sizes.card.width * 0.3) + (i * 40), settings.cloudHeight + 50 + (i * 30));
//             snowflakesRef.current.add(flake);
//         }
//     };

//     const drawClouds = () => {
//         // ... (code pour dessiner les nuages)
//         for (let i = 0; i < clouds.length; i++) {
//             clouds[i].offset = Math.random() * sizes.card.width;
//             drawCloud(clouds[i], i);
//         }
//     };

//     const drawThunderBolts = () => {
//         // ... (code pour dessiner les éclairs)
//         for (let i = 0; i < 2; i++) {
//             let bolt = outerSVGRef.current.group();
//             bolt.line(30, 10, 70, 50).attr({ stroke: '#fff', strokeWidth: 5 });
//             bolt.line(70, 10, 30, 50).attr({ stroke: '#fff', strokeWidth: 5 });
//             bolt.move((sizes.card.width * 0.4) + (i * 40), settings.cloudHeight + 20 + (i * 50));
//             thunderBoltsRef.current.add(bolt);
//         }
//     };

//     const updateDateText = () => {
//         // ... (code pour mettre à jour le texte de la date)
//         dateRef.current.text(new Date().getDate());
//     };

//     const onResize = () => {
//         // ... (code pour gérer le redimensionnement de la fenêtre)
//         sizes.card.width = window.innerWidth;
//         sizes.card.height = window.innerHeight;
//         sizes.container.width = window.innerWidth * 1.25;
//         sizes.container.height = window.innerHeight * 1.25;

//         for (let i = 0; i < clouds.length; i++) {
//             clouds[i].offset = Math.random() * sizes.card.width;
//             drawCloud(clouds[i], i);
//         }

//         for (let i = 0; i < fog.length; i++) {
//             drawFog(fog[i], i);
//         }

//         rainMaskRef.current.attr({ width: sizes.card.width, height: sizes.card.height });
//         leafMaskRef.current.attr({ width: sizes.card.width, height: sizes.card.height });
//         snowMaskRef.current.attr({ width: sizes.card.width, height: sizes.card.height });
//         hailMaskRef.current.attr({ width: sizes.card.width, height: sizes.card.height });

//         cardRef.current.attr({ viewBox: '0 0 ' + sizes.card.width + ' ' + sizes.card.height });
//         containerRef.current.attr({ viewBox: '0 0 ' + sizes.container.width + ' ' + sizes.container.height });
//     };

//     const tick = () => {
//         // ... (code pour gérer le cycle de rafraîchissement)
//         tickCount++;
//         if (tickCount >= settings.renewCheck) {
//             for (let i = 0; i < 5; i++) {
//                 drawRaindrop(i);
//                 drawLeaf(i);
//                 drawSnowflake(i);
//                 drawHailstone(i);
//             }
//             tickCount = 0;
//         }

//         for (let i = 0; i < settings.rainCount; i++) {
//             rain[i].offset -= settings.windSpeed;
//             rain[i].group.move(rain[i].group.x() - settings.windSpeed, rain[i].group.y());
//             if (rain[i].offset < -settings.cloudSpace) {
//                 rain[i].offset = sizes.card.width + settings.cloudSpace;
//                 rain[i].group.move(sizes.card.width + settings.cloudSpace, rain[i].group.y());
//             }
//         }

//         for (let i = 0; i < settings.hailCount; i++) {
//             hail[i].offset -= settings.windSpeed;
//             hail[i].group.move(hail[i].group.x() - settings.windSpeed, hail[i].group.y());
//             if (hail[i].offset < -settings.cloudSpace) {
//                 hail[i].offset = sizes.card.width + settings.cloudSpace;
//                 hail[i].group.move(sizes.card.width + settings.cloudSpace, hail[i].group.y());
//             }
//         }

//         for (let i = 0; i < settings.leafCount; i++) {
//             leafs[i].offset -= settings.windSpeed;
//             leafs[i].group.move(leafs[i].group.x() - settings.windSpeed, leafs[i].group.y());
//             if (leafs[i].offset < -settings.cloudSpace) {
//                 leafs[i].offset = sizes.card.width + settings.cloudSpace;
//                 leafs[i].group.move(sizes.card.width + settings.cloudSpace, leafs[i].group.y());
//             }
//         }

//         for (let i = 0; i < settings.snowCount; i++) {
//             snow[i].offset -= settings.windSpeed;
//             snow[i].group.move(snow[i].group.x() - settings.windSpeed, snow[i].group.y());
//             if (snow[i].offset < -settings.cloudSpace) {
//                 snow[i].offset = sizes.card.width + settings.cloudSpace;
//                 snow[i].group.move(sizes.card.width + settings.cloudSpace, snow[i].group.y());
//             }
//         }

//         thunderBoltCount++;
//         if (thunderBoltCount >= settings.thunderCheck) {
//             thunderBoltCount = 0;
//             thunderBoltsRef.current.clear();
//             drawThunderBolts();
//         }
//     };

//     const startAnimation = () => {
//         // ... (code pour démarrer l'animation)
//         updateDateText();
//         drawRainMask();
//         drawLeafMask();
//         drawSnowMask();
//         drawHailMask();
//         drawClouds();
//         drawFog();
//         drawSun();
//         drawSunburst();
//         drawSnowflakes();
//         drawThunderBolts();
//         setInterval(tick, settings.tickRate);
//         setInterval(updateDateText, settings.dateUpdateRate);
//     };

//     return (
//         <div>
//             <svg ref={containerRef} className="climacon_containerComponent" id="climacon" viewBox="15 15 70 70">
//                 <g className="climacon_iconWrap climacon_iconWrap-cloud">
//                     <g ref={cardRef} className="climacon_componentWrap climacon_componentWrap-cloud">
//                         <g ref={innerSVGRef} className="climacon_componentWrap climacon_componentWrap_cloud">
//                             <g ref={outerSVGRef} className="climacon_componentWrap climacon_componentWrap_cloud">
//                                 <g ref={backSVGRef} className="climacon_componentWrap climacon_componentWrap_cloud">
//                                     <g ref={summaryRef} className="climacon_componentWrap climacon_componentWrap_cloud">
//                                         <text ref={dateRef} className="climacon_date" x="50%" y="50%" dy=".5em">
//                                             31
//                                         </text>
//                                         <text ref={tempRef} className="climacon_temp" x="50%" y="50%" dy="2.75em">
//                                             -12
//                                         </text>
//                                         <text ref={tempFormatRef} className="climacon_temp" x="50%" y="50%" dy="5.5em">
//                                             F
//                                         </text>
//                                     </g>
//                                     <g ref={weatherContainer1Ref} className="climacon_componentWrap climacon_componentWrap_cloud">
//                                         <g ref={innerRainHolderRef} className="climacon_componentWrap climacon_componentWrap_cloud"></g>
//                                     </g>
//                                     <g ref={weatherContainer2Ref} className="climacon_componentWrap climacon_componentWrap_cloud">
//                                         <g ref={outerLeafHolderRef} className="climacon_componentWrap climacon_componentWrap_cloud"></g>
//                                     </g>
//                                     <g ref={weatherContainer3Ref} className="climacon_componentWrap climacon_componentWrap_cloud">
//                                         <g ref={innerHailHolderRef} className="climacon_componentWrap climacon_componentWrap_cloud"></g>
//                                     </g>
//                                 </g>
//                             </g>
//                         </g>
//                     </g>
//                 </g>
//             </svg>
//         </div>
//     );
// };

// export default AnimatedWeather;


