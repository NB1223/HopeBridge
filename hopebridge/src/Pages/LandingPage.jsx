// src/Pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';  // Import the specific CSS for LandingPage

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Hope Bridge</h1>
      <h3>Bridging the gap between Generosity and Need</h3>
      
      {/* Glass box with transparent background */}
      <div className="glass-box">
        <div className="button-container">
          <Link to="/Register_Donor">
            <button className="landing-button">Donor Register</button>
          </Link>
          <Link to="/Register_NGO">
            <button className="landing-button">NGOs Register</button>
          </Link>
          <Link to="/login">
            <button className="landing-button">Donor/NGO Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

// import React from 'react';
// import { Link } from 'react-router-dom';
// // import './LandingPages.css';  // Import the specific CSS for LandingPage
// import { gsap } from "gsap"; // Import GSAP for animations
// import { useEffect } from 'react';



// // Import images
// import background from '../assets/img/background.png';
// import fog7 from '../assets/img/fog_7.png';
// import mountain10 from '../assets/img/mountain_10.png';
// import fog6 from '../assets/img/fog_6.png';
// import mountain9 from '../assets/img/mountain_9.png';
// import mountain8 from '../assets/img/mountain_8.png';
// import fog5 from '../assets/img/fog_5.png';
// import mountain7 from '../assets/img/mountain_7.png';
// import mountain6 from '../assets/img/mountain_6.png';
// import fog4 from '../assets/img/fog_4.png';
// import mountain5 from '../assets/img/mountain_5.png';
// import fog3 from '../assets/img/fog_3.png';
// import mountain4 from '../assets/img/mountain_4.png';
// import mountain3 from '../assets/img/mountain_3.png';
// import fog2 from '../assets/img/fog_2.png';
// import mountain2 from '../assets/img/mountain_2.png';
// import mountain1 from '../assets/img/mountain_1.png';
// import sunRays from '../assets/img/sun_rays.png';
// import blackShadow from '../assets/img/black_shadow.png';
// import fog1 from '../assets/img/fog_1.png';

// import ParallaxEffect from "./ParallaxEffect";

// function LandingPage() {
  

//   return (
//     <div className="landing-page">
//       {/* Full-screen background with parallax effect */}
//       <main>
//         <ParallaxEffect />
//         <div className="vignette hide"></div>
//         <img src={background} data-speedx="0.3" data-speedy="0.38" data-speedz="0" data-rotate="0" data-distance="-200" className="parallax bg-img" alt="Background" />
//         <img src={fog7} data-speedx="0.27" data-speedy="0.32" data-speedz="0" data-rotate="0" data-distance="1000" className="parallax fog-7" alt="Fog 7" />
//         <img src={mountain10} data-speedx="0.195" data-speedy="0.305" data-speedz="0" data-rotate="0" data-distance="1200" className="parallax mountain-10" alt="Mountain 10" />
//         <img src={fog6} data-speedx="0.25" data-speedy="0.28" data-speedz="0" data-distance="1400" className="parallax fog-6" alt="Fog 6" />
//         <img src={mountain9} data-speedx="0.125" data-speedy="0.155" data-speedz="0.15" data-rotate="0.02" data-distance="1700" className="parallax mountain-9" alt="Mountain 9" />
//         <img src={mountain8} data-speedx="0.1" data-speedy="0.11" data-speedz="0" data-rotate="0.02" data-distance="1800" className="parallax mountain-8" alt="Mountain 8" />
//         <img src={fog5} data-speedx="0.16" data-speedy="0.105" data-speedz="0" data-distance="1900" className="parallax fog-5" alt="Fog 5" />
//         <img src={mountain7} data-speedx="0.1" data-speedy="0.1" data-speedz="0" data-rotate="0.09" data-distance="2000" className="parallax mountain-7" alt="Mountain 7" />
//         <img src={mountain6} data-speedx="0.065" data-speedy="0.05" data-speedz="0.15" data-rotate="0.12" data-distance="2300" className="parallax mountain-6" alt="Mountain 6" />
//         <img src={fog4} data-speedx="0.135" data-speedy="0.04" data-speedz="0" data-rotate="0" data-distance="2400" className="parallax fog-4" alt="Fog 4" />
//         <img src={mountain5} data-speedx="0.08" data-speedy="0.03" data-speedz="0.13" data-rotate="0.1" data-distance="2550" className="parallax mountain-5" alt="Mountain 5" />
//         <img src={fog3} data-speedx="0.11" data-speedy="0.018" data-speedz="0" data-rotate="0" data-distance="2800" className="parallax fog-3" alt="Fog 3" />
//         <img src={mountain4} data-speedx="0.059" data-speedy="0.024" data-speedz="0.35" data-rotate="0.12" data-distance="3200" className="parallax mountain-4" alt="Mountain 4" />
//         <img src={mountain3} data-speedx="0.04" data-speedy="0.018" data-speedz="0.32" data-rotate="0.14" data-distance="3400" className="parallax mountain-3" alt="Mountain 3" />
//         <img src={fog2} data-speedx="0.15" data-speedy="0.0115" data-speedz="0" data-rotate="0" data-distance="3600" className="parallax fog-2" alt="Fog 2" />
//         <img src={mountain2} data-speedx="0.0235" data-speedy="0.013" data-rotate="0.15" data-speedz="0.42" data-distance="3800" className="parallax mountain-2" alt="Mountain 2" />
//         <img src={mountain1} data-speedx="0.027" data-speedy="0.018" data-speedz="0.53" data-rotate="0.2" data-distance="4000" className="parallax mountain-1" alt="Mountain 1" />
//         <img src={sunRays} className="sun-rays" alt="Sun Rays" />
//         <img src={blackShadow} className="black-shadow hide" alt="Black Shadow" />
//         <img src={fog1} data-speedx="0.12" data-speedy="0.01" data-distance="4200" className="parallax fog-1" alt="Fog 1" />
//       </main>

//       {/* <h1>Hope Bridge</h1>
//       <h3>Bridging the gap between Generosity and Need</h3>
      
      
//       <div className="glass-box">
//         <div className="button-container">
//           <Link to="/Register_Donor">
//             <button className="landing-button">Donor Register</button>
//           </Link>
//           <Link to="/Register_NGO">
//             <button className="landing-button">NGOs Register</button>
//           </Link>
//           <Link to="/login">
//             <button className="landing-button">Donor/NGO Login</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   ); */}
//   </div>
//   );
// }



// export default LandingPage;
