// components/Testimonials/SingleTestimonial.tsx
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 transition-transform duration-300 hover:transform hover:scale-105 min-h-[320px] flex flex-col justify-between">
      <div>
        <div className="flex mb-5">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={index < star ? "text-yellow-400" : "text-gray-300"}
              size={24}
            />
          ))}
        </div>
        
        <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{content}"</p>
      </div>
      
      <div className="flex items-center mt-auto">
        <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-green-100">
          <Image src={image} alt={name} width={64} height={64} className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-green-800 text-lg">{name}</h3>
          <p className="text-gray-600">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;