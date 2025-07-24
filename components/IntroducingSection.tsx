// import React from "react";
// import Image from "next/image";

// const WHATSAPP_NUMBER = "2348033367384";

// export default function LandingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-1 sm:px-2">
//       <div className="bg-white rounded-2xl shadow-xl p-2 xs:p-4 sm:p-8 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl flex flex-col items-center relative overflow-y-auto max-h-[90dvh] sm:max-h-[95vh]">
//         {/* Close button: top right on desktop, bottom center on mobile */}
//         <button
//           onClick={onClose}
//           className="block sm:hidden mt-4 mb-2 mx-auto text-gray-400 hover:text-green-700 text-2xl font-bold z-10"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <button
//           onClick={onClose}
//           className="hidden sm:block absolute top-4 right-4 text-gray-400 hover:text-green-700 text-2xl font-bold z-10"
//           aria-label="Close"
//         >
//           &times;
//         </button>
//         <Image
//           src="/dondooil-logo.jpeg"
//           alt="DONDOOIL Natural Wellness Supplement"
//           width={80}
//           height={80}
//           className="rounded-lg shadow-lg mb-3 sm:mb-6 w-40 h-40 sm:w-64 sm:h-64 object-cover"
//           priority
//         />
//         {/* <h1 className="text-base xs:text-lg sm:text-2xl md:text-4xl font-bold text-green-800 mb-1 sm:mb-4 text-center">
//           DONDOOIL Natural Wellness Supplement
//         </h1> */} 
//         <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 mb-2 sm:mb-4 text-center">
//           <strong>A holistic healing organic stem cell dietary supplement</strong><br/> that boosts the <strong>immune system </strong>to treat diseases <br /> like ulcer, infection, arthritis, cholesterol and so on<br /> <strong>NAFDAC-approved</strong> formula combines{" "}
//          <br /> <strong>organic stem cell nutrition</strong> and <strong>herbal remedies</strong> <br /><strong>for holistic wellness.</strong>
//         </p>
//         <ul className="text-green-700 mb-3 sm:mb-6 list-disc list-inside text-xs xs:text-sm sm:text-base">
//           <li>NAFDAC Approved: NO. A7-102209L</li>
//           <li>100% Organic & Herbal</li>
//           <li>Supports Immune, Respiratory, and Digestive Health</li>
//           <li>Scientifically Validated & Quality-Tested</li>
//           <li>Trusted by Health Professionals</li>
//         </ul>
//         <div className="flex flex-col items-center gap-2 sm:gap-4 w-full">
//           <a
//             href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20buy%20Dondooil%20stem%20cell%20dietary%20supplements/immune%20booster`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-full sm:w-auto bg-green-600 text-white font-bold px-3 sm:px-8 py-2 sm:py-4 rounded-lg text-sm sm:text-xl shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={20}
//               height={20}
//               fill="currentColor"
//               viewBox="0 0 24 24"
//               className="mr-2"
//             >
//               <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.463 3.484 1.341 4.997l-1.406 5.146a1 1 0 0 0 1.228 1.228l5.146-1.406a9.963 9.963 0 0 0 4.997 1.341c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.997-9.997-9.997zm0 18.001a7.963 7.963 0 0 1-4.09-1.162l-.29-.172-3.057.836.836-3.057-.172-.29a7.963 7.963 0 0 1-1.162-4.09c0-4.411 3.588-7.999 7.999-7.999s7.999 3.588 7.999 7.999-3.588 7.999-7.999 7.999zm4.425-6.572c-.242-.121-1.434-.707-1.655-.788-.222-.081-.384-.121-.546.121-.161.242-.626.788-.768.95-.141.161-.283.181-.525.06-.242-.121-1.022-.377-1.946-1.202-.719-.641-1.205-1.432-1.347-1.674-.141-.242-.015-.373.106-.494.109-.108.242-.283.363-.424.121-.141.161-.242.242-.404.081-.161.04-.303-.02-.424-.06-.121-.546-1.318-.748-1.803-.197-.473-.398-.409-.546-.416l-.465-.008c-.161 0-.424.06-.646.303s-.848.828-.848 2.018c0 1.19.867 2.341.987 2.502.121.161 1.707 2.607 4.141 3.553.579.199 1.029.317 1.379.406.579.147 1.106.126 1.523.077.465-.056 1.434-.586 1.637-1.152.202-.566.202-1.051.142-1.152-.06-.101-.22-.161-.462-.282z" />
//             </svg>
//             Order Now on WhatsApp
//           </a>
//           <span className="text-gray-600 text-xs sm:text-sm">Fast, direct order via WhatsApp</span>
//         </div>
//         <div className="mt-4 sm:mt-8 text-center text-gray-500 text-[10px] xs:text-xs sm:text-xs">
//           <p>
//             DONDOOIL, natural supplement, immune booster, NAFDAC approved, organic, herbal remedy, stem cell nutrition, holistic wellness, buy supplement Nigeria, immune system support, health product, wellness supplement, buy DONDOOIL online, Abuja, Nigeria
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "2348033367384";

export default function LandingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-1 sm:px-2">
      {/* Reduced max-w for md: to make it smaller on desktop.
          Changed p-2 xs:p-4 sm:p-8 to p-4 sm:p-6 (slightly less padding). */}
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-xl flex flex-col items-center relative overflow-y-auto max-h-[90dvh]">
        {/* Close button: top right on desktop, bottom center on mobile */}
        <button
          onClick={onClose}
          className="block sm:hidden mt-2 mb-1 mx-auto text-gray-400 hover:text-green-700 text-xl font-bold z-10" // Smaller font and margin
          aria-label="Close"
        >
          &times;
        </button>
        <button
          onClick={onClose}
          className="hidden sm:block absolute top-3 right-3 text-gray-400 hover:text-green-700 text-xl font-bold z-10" // Smaller font and position
          aria-label="Close"
        >
          &times;
        </button>

       <Image
          src="/dondooil-logo.jpeg"
          alt="DONDOOIL Natural Wellness Supplement"
          width={65}
          height={65}
          className="rounded-lg shadow-lg mb-3 sm:mb-6 w-40 h-40 sm:w-64 sm:h-64 object-cover"
          priority
        />
        {/* <h1 className="text-base xs:text-lg sm:text-2xl md:text-4xl font-bold text-green-800 mb-1 sm:mb-4 text-center">
          DONDOOIL Natural Wellness Supplement
        </h1> */}
        <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 text-center leading-relaxed"> {/* Smaller text, reduced margin, adjusted leading */}
          <strong>A holistic healing organic stem cell dietary supplement</strong><br/> that boosts the <strong>immune system </strong>to treat diseases <br /> like ulcer, infection, arthritis, cholesterol and so on<br /> <strong>NAFDAC-approved</strong> formula combines{" "}
         <br /> <strong>organic stem cell nutrition</strong> and <strong>herbal remedies</strong> <br /><strong>for holistic wellness.</strong>
        </p>
        <ul className="text-green-700 mb-3 sm:mb-4 list-disc list-inside text-xs sm:text-sm"> {/* Smaller text, reduced margin */}
          <li>NAFDAC Approved: NO. A7-102209L</li>
          <li>100% Organic & Herbal</li>
          <li>Supports Immune, Respiratory, and Digestive Health</li>
          <li>Scientifically Validated & Quality-Tested</li>
          <li>Trusted by Health Professionals</li>
        </ul>
        <div className="flex flex-col items-center gap-2 sm:gap-3 w-full"> {/* Reduced gap */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20buy%20Dondooil%20stem%20cell%20dietary%20supplements/immune%20booster`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-green-600 text-white font-bold px-3 sm:px-8 py-2 sm:py-4 rounded-lg text-sm sm:text-xl shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              fill="currentColor"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.463 3.484 1.341 4.997l-1.406 5.146a1 1 0 0 0 1.228 1.228l5.146-1.406a9.963 9.963 0 0 0 4.997 1.341c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.997-9.997-9.997zm0 18.001a7.963 7.963 0 0 1-4.09-1.162l-.29-.172-3.057.836.836-3.057-.172-.29a7.963 7.963 0 0 1-1.162-4.09c0-4.411 3.588-7.999 7.999-7.999s7.999 3.588 7.999 7.999-3.588 7.999-7.999 7.999zm4.425-6.572c-.242-.121-1.434-.707-1.655-.788-.222-.081-.384-.121-.546.121-.161.242-.626.788-.768.95-.141.161-.283.181-.525.06-.242-.121-1.022-.377-1.946-1.202-.719-.641-1.205-1.432-1.347-1.674-.141-.242-.015-.373.106-.494.109-.108.242-.283.363-.424.121-.141.161-.242.242-.404.081-.161.04-.303-.02-.424-.06-.121-.546-1.318-.748-1.803-.197-.473-.398-.409-.546-.416l-.465-.008c-.161 0-.424.06-.646.303s-.848.828-.848 2.018c0 1.19.867 2.341.987 2.502.121.161 1.707 2.607 4.141 3.553.579.199 1.029.317 1.379.406.579.147 1.106.126 1.523.077.465-.056 1.434-.586 1.637-1.152.202-.566.202-1.051.142-1.152-.06-.101-.22-.161-.462-.282z" />
            </svg>
            Order Now on WhatsApp
          </a>
          <span className="text-gray-600 text-xs sm:text-xs">Fast, direct order via WhatsApp</span> {/* Smaller text */}
        </div>
        
      </div>
    </div>
  );
}