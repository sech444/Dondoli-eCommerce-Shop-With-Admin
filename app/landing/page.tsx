// import React from "react";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";

// const WHATSAPP_NUMBER = "2348033367384"; // Change to your WhatsApp number

// export const metadata = {
//   title: "DONDOOIL - Natural Wellness Supplement | Immune Booster | Buy Now",
//   description:
//     "Buy DONDOOIL, the best natural wellness supplement and immune booster. NAFDAC-approved, organic, holistic, herbal remedy for immune system support. Order now via WhatsApp.",
//   openGraph: {
//     title: "DONDOOIL - Natural Wellness Supplement | Immune Booster",
//     description:
//       "DONDOOIL is a premium, NAFDAC-approved natural supplement for holistic wellness and immune system support. Buy now and boost your health naturally.",
//     images: ["/images/dondooil.jpeg"],
//     url: "https://dondooil.com/landing",
//     type: "product",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "DONDOOIL - Natural Wellness Supplement",
//     description:
//       "Boost your immunity with DONDOOIL, the leading herbal supplement for natural health.",
//     images: ["/images/dondooil.jpeg"],
//   },
// };

// const productSchema = {
//   "@context": "https://schema.org/",
//   "@type": "Product",
//   name: "DONDOOIL Natural Wellness Supplement",
//   image: [
//     "https://dondooil.com/images/dondooil.jpeg",
//   ],
//   description:
//     "DONDOOIL is a holistic, NAFDAC-approved, organic stem cell dietary supplement and immune booster. Supports immune system, respiratory health, and overall wellness.",
//   brand: {
//     "@type": "Brand",
//     name: "DONDOOIL",
//   },
//   offers: {
//     "@type": "Offer",
//     url: "https://dondooil.com/landing",
//     priceCurrency: "NGN",
//     price: "25000",
//     availability: "https://schema.org/InStock",
//   },
// };

// export default function LandingPage() {
//   return (
//     <>
//       <Head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//         <meta property="og:title" content={metadata.openGraph.title} />
//         <meta property="og:description" content={metadata.openGraph.description} />
//         <meta property="og:image" content={metadata.openGraph.images[0]} />
//         <meta property="og:type" content="product" />
//         <meta property="og:url" content={metadata.openGraph.url} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={metadata.twitter.title} />
//         <meta name="twitter:description" content={metadata.twitter.description} />
//         <meta name="twitter:image" content={metadata.twitter.images[0]} />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
//         />
//       </Head>
//       <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center py-16 px-4">
//         <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
//           <Image
//             src="/images/dondooil.jpeg"
//             alt="DONDOOIL Natural Wellness Supplement"
//             width={320}
//             height={320}
//             className="rounded-lg shadow-lg mb-6"
//             priority
//           />
//           <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">
//             DONDOOIL Natural Wellness Supplement
//           </h1>
//           <p className="text-lg text-gray-700 mb-4 text-center">
//             <strong>Boost your immune system</strong> and support your overall health with <strong>DONDOOIL</strong> – the leading <strong>natural supplement</strong> and <strong>immune booster</strong> in Nigeria. Our <strong>NAFDAC-approved</strong> formula combines <strong>organic stem cell nutrition</strong> and <strong>herbal remedies</strong> for holistic wellness.
//           </p>
//           <ul className="text-green-700 mb-6 list-disc list-inside text-base">
//             <li>NAFDAC Approved: NO. A7-102209L</li>
//             <li>100% Organic & Herbal</li>
//             <li>Supports Immune, Respiratory, and Digestive Health</li>
//             <li>Scientifically Validated & Quality-Tested</li>
//             <li>Trusted by Health Professionals</li>
//           </ul>
//           <div className="flex flex-col items-center gap-4 w-full">
//             <a
//               href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20buy%20DONDOOIL%20Natural%20Wellness%20Supplement`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-full md:w-auto bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-xl shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width={28}
//                 height={28}
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//                 className="mr-2"
//               >
//                 <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.463 3.484 1.341 4.997l-1.406 5.146a1 1 0 0 0 1.228 1.228l5.146-1.406a9.963 9.963 0 0 0 4.997 1.341c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.997-9.997-9.997zm0 18.001a7.963 7.963 0 0 1-4.09-1.162l-.29-.172-3.057.836.836-3.057-.172-.29a7.963 7.963 0 0 1-1.162-4.09c0-4.411 3.588-7.999 7.999-7.999s7.999 3.588 7.999 7.999-3.588 7.999-7.999 7.999zm4.425-6.572c-.242-.121-1.434-.707-1.655-.788-.222-.081-.384-.121-.546.121-.161.242-.626.788-.768.95-.141.161-.283.181-.525.06-.242-.121-1.022-.377-1.946-1.202-.719-.641-1.205-1.432-1.347-1.674-.141-.242-.015-.373.106-.494.109-.108.242-.283.363-.424.121-.141.161-.242.242-.404.081-.161.04-.303-.02-.424-.06-.121-.546-1.318-.748-1.803-.197-.473-.398-.409-.546-.416l-.465-.008c-.161 0-.424.06-.646.303s-.848.828-.848 2.018c0 1.19.867 2.341.987 2.502.121.161 1.707 2.607 4.141 3.553.579.199 1.029.317 1.379.406.579.147 1.106.126 1.523.077.465-.056 1.434-.586 1.637-1.152.202-.566.202-1.051.142-1.152-.06-.101-.22-.161-.462-.282z" />
//               </svg>
//               Buy Now on WhatsApp
//             </a>
//             <span className="text-gray-600 text-sm">Fast, direct order via WhatsApp</span>
//           </div>
//           <div className="mt-8 text-center text-gray-500 text-xs">
//             <p>
//               Keywords: DONDOOIL, natural supplement, immune booster, NAFDAC approved, organic, herbal remedy, stem cell nutrition, holistic wellness, buy supplement Nigeria, immune system support, health product, wellness supplement, buy DONDOOIL online, Abuja, Nigeria
//             </p>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }


import React from "react";
import Image from "next/image";

const WHATSAPP_NUMBER = "2348033367384";

export default function LandingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full flex flex-col items-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-green-700 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <Image
          src="/images/dondooil.jpeg"
          alt="DONDOOIL Natural Wellness Supplement"
          width={320}
          height={320}
          className="rounded-lg shadow-lg mb-6"
          priority
        />
        <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">
          DONDOOIL Natural Wellness Supplement
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          <strong>Boost your immune system</strong> and support your overall health with <strong>DONDOOIL</strong> – the leading <strong>natural supplement</strong> and <strong>immune booster</strong> in Nigeria. Our <strong>NAFDAC-approved</strong> formula combines <strong>organic stem cell nutrition</strong> and <strong>herbal remedies</strong> for holistic wellness.
        </p>
        <ul className="text-green-700 mb-6 list-disc list-inside text-base">
          <li>NAFDAC Approved: NO. A7-102209L</li>
          <li>100% Organic & Herbal</li>
          <li>Supports Immune, Respiratory, and Digestive Health</li>
          <li>Scientifically Validated & Quality-Tested</li>
          <li>Trusted by Health Professionals</li>
        </ul>
        <div className="flex flex-col items-center gap-4 w-full">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20buy%20DONDOOIL%20Natural%20Wellness%20Supplement`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-green-600 text-white font-bold px-8 py-4 rounded-lg text-xl shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              fill="currentColor"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path d="M12.004 2.003c-5.522 0-9.997 4.475-9.997 9.997 0 1.762.463 3.484 1.341 4.997l-1.406 5.146a1 1 0 0 0 1.228 1.228l5.146-1.406a9.963 9.963 0 0 0 4.997 1.341c5.522 0 9.997-4.475 9.997-9.997s-4.475-9.997-9.997-9.997zm0 18.001a7.963 7.963 0 0 1-4.09-1.162l-.29-.172-3.057.836.836-3.057-.172-.29a7.963 7.963 0 0 1-1.162-4.09c0-4.411 3.588-7.999 7.999-7.999s7.999 3.588 7.999 7.999-3.588 7.999-7.999 7.999zm4.425-6.572c-.242-.121-1.434-.707-1.655-.788-.222-.081-.384-.121-.546.121-.161.242-.626.788-.768.95-.141.161-.283.181-.525.06-.242-.121-1.022-.377-1.946-1.202-.719-.641-1.205-1.432-1.347-1.674-.141-.242-.015-.373.106-.494.109-.108.242-.283.363-.424.121-.141.161-.242.242-.404.081-.161.04-.303-.02-.424-.06-.121-.546-1.318-.748-1.803-.197-.473-.398-.409-.546-.416l-.465-.008c-.161 0-.424.06-.646.303s-.848.828-.848 2.018c0 1.19.867 2.341.987 2.502.121.161 1.707 2.607 4.141 3.553.579.199 1.029.317 1.379.406.579.147 1.106.126 1.523.077.465-.056 1.434-.586 1.637-1.152.202-.566.202-1.051.142-1.152-.06-.101-.22-.161-.462-.282z" />
            </svg>
            Buy Now on WhatsApp
          </a>
          <span className="text-gray-600 text-sm">Fast, direct order via WhatsApp</span>
        </div>
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>
            Keywords: DONDOOIL, natural supplement, immune booster, NAFDAC approved, organic, herbal remedy, stem cell nutrition, holistic wellness, buy supplement Nigeria, immune system support, health product, wellness supplement, buy DONDOOIL online, Abuja, Nigeria
          </p>
        </div>
      </div>
    </div>
  );
}