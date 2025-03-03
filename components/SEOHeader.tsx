import React from 'react';
import { Leaf } from 'lucide-react';

// Product Schema type
interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  brand: {
    '@type': string;
    name: string;
  };
  offers: {
    '@type': string;
    availability: string;
  };
  url: string;
  image: string[];
}

const SEOHeader: React.FC = () => {
  // Product schema data - using environment variable for base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const productSchema: ProductSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': 'DONDOIL Natural Wellness Supplement',
    'description': 'Premium natural dietary supplement for holistic wellness and immune system support. NAFDAC-approved herbal formula combining traditional wisdom with modern health support.',
    'brand': {
      '@type': 'Brand',
      'name': 'DONDOIL'
    },
    'offers': {
      '@type': 'Offer',
      'availability': 'https://schema.org/InStock'
    },
    'url': `${baseUrl}/products/dondoil-natural-supplement`,
    'image': [
      `${baseUrl}/product-image.jpg`,
      `${baseUrl}/product-image-2.jpg`
    ]
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Primary SEO Heading */}
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          DONDOOIL: Natural Wellness & Immune Support Supplement
        </h1>
        
        {/* Rich Content Section */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-green-700 mb-3">
                Enhancing Immunity to Fight Diseases Naturally
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Experience DONDOOIL, a premium natural dietary supplement that combines traditional herbal wisdom with modern wellness support. Our NAFDAC-approved formula (NO. A7-102209L) provides comprehensive support for your body's natural immune function and overall wellbeing.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Natural Immune System Support
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Holistic Wellness Formula
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Traditional Herbal Blend
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    NAFDAC Approved
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Scientific Validation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Quality-Tested Formula
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SEOHeader;