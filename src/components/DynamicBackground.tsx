// "use client";
// import { useEffect, useState } from 'react';

// // Insurance-related background images focused on theft, accidents, and fire
// const INSURANCE_BACKGROUNDS = [
//   {
//     url: "https://images.unsplash.com/photo-1610915528960-0c7e4c1d3c2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "حماية من حوادث السيارات",
//     description: "تأمين شامل ضد الحوادث والاصطدامات"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1602524201888-8a1f3b1c1e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "تأمين ضد السرقة",
//     description: "حماية سيارتك من السرقة والتخريب"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "حماية من الحرائق",
//     description: "تغطية شاملة ضد أضرار الحرائق"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "حماية شاملة للسيارات",
//     description: "تأمين متكامل لجميع أنواع السيارات"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "أمان الطريق",
//     description: "قيادة آمنة مع تأميننا الشامل"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1581093588401-4c4c1c1c1c1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "تأمين المسؤولية المدنية",
//     description: "حماية قانونية وتأمين الطرف الثالث"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "رحلات آمنة",
//     description: "استمتع برحلاتك مع تأميننا الشامل"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
//     title: "حماية من الكوارث الطبيعية",
//     description: "تغطية شاملة ضد الفيضانات والعواصف"
//   }
// ];

// // Pre-defined particle positions to avoid hydration mismatch
// const PARTICLE_POSITIONS = [
//   { left: 15.5, top: 25.3, delay: 0.5, duration: 4.2 },
//   { left: 78.2, top: 12.1, delay: 1.8, duration: 3.7 },
//   { left: 42.7, top: 67.9, delay: 0.3, duration: 4.8 },
//   { left: 89.1, top: 34.5, delay: 2.1, duration: 3.9 },
//   { left: 23.8, top: 81.2, delay: 1.2, duration: 4.5 },
//   { left: 65.4, top: 19.7, delay: 0.7, duration: 3.8 },
//   { left: 8.9, top: 58.3, delay: 2.4, duration: 4.1 },
//   { left: 71.6, top: 42.8, delay: 0.9, duration: 4.3 },
//   { left: 36.2, top: 73.5, delay: 1.6, duration: 3.6 },
//   { left: 55.8, top: 28.1, delay: 2.0, duration: 4.4 },
//   { left: 91.3, top: 65.7, delay: 0.4, duration: 3.9 },
//   { left: 29.7, top: 91.2, delay: 1.4, duration: 4.0 }
// ];

// export default function DynamicBackground() {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     // Change background every 15 seconds
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         (prevIndex + 1) % INSURANCE_BACKGROUNDS.length
//       );
//     }, 15000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     // Preload first image
//     const img = new Image();
//     img.onload = () => setIsLoaded(true);
//     img.src = INSURANCE_BACKGROUNDS[0].url;
//   }, []);

//   const currentBackground = INSURANCE_BACKGROUNDS[currentImageIndex];

//   return (
//     <>
//       {/* Main Background */}
//       <div 
//         className="fixed inset-0 transition-all duration-[3000ms] ease-in-out transform"
//         style={{
//           backgroundImage: `url('${currentBackground.url}')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           opacity: isLoaded ? 1 : 0,
//         }}
//       />
      
//       {/* Overlay for better readability */}
//       <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60" />
      
//       {/* Additional pattern overlay for texture */}
//       <div 
//         className="fixed inset-0 opacity-10"
//         style={{
//           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
//           backgroundSize: '20px 20px',
//         }}
//       />

//       {/* Animated particles for premium feel - Fixed positions to prevent hydration errors */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         {PARTICLE_POSITIONS.map((particle, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
//             style={{
//               left: `${particle.left}%`,
//               top: `${particle.top}%`,
//               animationDelay: `${particle.delay}s`,
//               animationDuration: `${particle.duration}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Bottom gradient for footer area */}
//       <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      
//       {/* Background Info Indicator */}
//       <div className="fixed bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-slate-50 px-4 py-2 rounded-lg text-sm font-normal leading-relaxed max-w-xs">
//         <div className="font-semibold">{currentBackground.title}</div>
//         <div className="text-xs font-medium tracking-wide opacity-80">{currentBackground.description}</div>
//         <div className="flex gap-1 mt-2">
//           {INSURANCE_BACKGROUNDS.map((_, index) => (
//             <div
//               key={index}
//               className={`w-2 h-1 rounded-full transition-all ${
//                 index === currentImageIndex ? 'bg-white' : 'bg-white/30'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
"use client";
import { useEffect, useState } from 'react';

// Insurance-related background images focused on theft, accidents, and fire
// const INSURANCE_BACKGROUNDS = [
//   {
//     url: "https://images.unsplash.com/photo-1542037104857-9166099e5769?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // More dynamic car in motion, implying protection needed
//     title: "حماية من حوادث السيارات",
//     description: "تأمين شامل ضد الحوادث والاصطدامات"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Image suggesting security or surveillance for theft
//     title: "تأمين ضد السرقة",
//     description: "حماية سيارتك من السرقة والتخريب"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1604871009071-651c10b0a9c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Abstract representation of fire or embers, could be related to vehicle or property
//     title: "حماية من الحرائق",
//     description: "تغطية شاملة ضد أضرار الحرائق"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Clean shot of a modern car, implying comprehensive care
//     title: "حماية شاملة للسيارات",
//     description: "تأمين متكامل لجميع أنواع السيارات"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1490642103832-2714050d00f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Road view, symbolizing safety on the road
//     title: "أمان الطريق",
//     description: "قيادة آمنة مع تأميننا الشامل"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1542044011828-e075a5b0d719?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Abstract representation of protection or a shield, suitable for liability
//     title: "تأمين المسؤولية المدنية",
//     description: "حماية قانونية وتأمين الطرف الثالث"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1517673130531-90c82000701c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Scenic travel photo, connecting to safe journeys
//     title: "رحلات آمنة",
//     description: "استمتع برحلاتك مع تأميننا الشامل"
//   },
//   {
//     url: "https://images.unsplash.com/photo-1567637757891-b79de6930a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Image depicting stormy weather or a flood, relevant to natural disasters
//     title: "حماية من الكوارث الطبيعية",
//     description: "تغطية شاملة ضد الفيضانات والعواصف"
//   }
// ];
// Insurance-related background images from Pexels and Unsplash - more specific and relevant
const INSURANCE_BACKGROUNDS = [
  {
    url: "https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "حماية من حوادث السيارات",
    description: "تأمين شامل ضد الحوادث والاصطدامات"
  },
  {
    url: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "تأمين ضد السرقة",
    description: "حماية سيارتك من السرقة والتخريب"
  },
  {
    url: "https://images.pexels.com/photos/266487/pexels-photo-266487.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "حماية من الحرائق",
    description: "تغطية شاملة ضد أضرار الحرائق"
  },
  {
    url: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "حماية شاملة للسيارات",
    description: "تأمين متكامل لجميع أنواع السيارات"
  },
  {
    url: "https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "أمان الطريق",
    description: "قيادة آمنة مع تأميننا الشامل"
  },
  {
    url: "https://images.pexels.com/photos/3684/man-person-hands-relaxed.jpg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "تأمين المسؤولية المدنية",
    description: "حماية قانونية وتأمين الطرف الثالث"
  },
  {
    url: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "رحلات آمنة",
    description: "استمتع برحلاتك مع تأميننا الشامل"
  },
  {
    url: "https://images.pexels.com/photos/1409999/pexels-photo-1409999.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    title: "حماية من الكوارث الطبيعية",
    description: "تغطية شاملة ضد الفيضانات والعواصف"
  }
];

// Pre-defined particle positions to avoid hydration mismatch
const PARTICLE_POSITIONS = [
  { left: 15.5, top: 25.3, delay: 0.5, duration: 4.2 },
  { left: 78.2, top: 12.1, delay: 1.8, duration: 3.7 },
  { left: 42.7, top: 67.9, delay: 0.3, duration: 4.8 },
  { left: 89.1, top: 34.5, delay: 2.1, duration: 3.9 },
  { left: 23.8, top: 81.2, delay: 1.2, duration: 4.5 },
  { left: 65.4, top: 19.7, delay: 0.7, duration: 3.8 },
  { left: 8.9, top: 58.3, delay: 2.4, duration: 4.1 },
  { left: 71.6, top: 42.8, delay: 0.9, duration: 4.3 },
  { left: 36.2, top: 73.5, delay: 1.6, duration: 3.6 },
  { left: 55.8, top: 28.1, delay: 2.0, duration: 4.4 },
  { left: 91.3, top: 65.7, delay: 0.4, duration: 3.9 },
  { left: 29.7, top: 91.2, delay: 1.4, duration: 4.0 }
];

export default function DynamicBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Change background every 15 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % INSURANCE_BACKGROUNDS.length
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Preload first image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    if (INSURANCE_BACKGROUNDS.length > 0) {
      img.src = INSURANCE_BACKGROUNDS[0].url;
    }
  }, []);

  const currentBackground = INSURANCE_BACKGROUNDS[currentImageIndex];

  // Handle case where INSURANCE_BACKGROUNDS might be empty or currentBackground is undefined
  if (!currentBackground) {
    return null; // Or some fallback UI
  }

  return (
    <>
      {/* Main Background */}
      <div
        className="fixed inset-0 transition-all duration-[3000ms] ease-in-out transform"
        style={{
          backgroundImage: `url('${currentBackground.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isLoaded ? 1 : 0,
        }}
      />

      {/* Overlay for better readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/60" />

      {/* Additional pattern overlay for texture */}
      <div
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Animated particles for premium feel - Fixed positions to prevent hydration errors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {PARTICLE_POSITIONS.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom gradient for footer area */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Background Info Indicator */}
      <div className="fixed bottom-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-slate-50 px-4 py-2 rounded-lg text-sm font-normal leading-relaxed max-w-xs">
        <div className="font-semibold">{currentBackground.title}</div>
        <div className="text-xs font-medium tracking-wide opacity-80">{currentBackground.description}</div>
        <div className="flex gap-1 mt-2">
          {INSURANCE_BACKGROUNDS.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-1 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}