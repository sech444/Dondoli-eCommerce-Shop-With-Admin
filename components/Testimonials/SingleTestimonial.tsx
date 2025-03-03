// components/Testimonials/SingleTestimonial.tsx
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { star, name, image, content, designation } = testimonial;
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 md:p-10 border border-green-100 transition-all duration-300 ease-in-out">
      <div className="flex mb-6">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < star ? "text-yellow-400" : "text-gray-300"}
            size={24}
          />
        ))}
      </div>
      
      <p className="text-gray-700 mb-8 italic text-lg leading-relaxed md:text-xl">"{content}"</p>
      
      <div className="flex items-center">
        <div className="h-16 w-16 rounded-full overflow-hidden mr-5 border-2 border-green-100">
          <Image src={image} alt={name} width={64} height={64} className="object-cover" />
        </div>
        <div>
          <h3 className="font-bold text-green-800 text-lg md:text-xl">{name}</h3>
          <p className="text-gray-600 md:text-base">{designation}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;