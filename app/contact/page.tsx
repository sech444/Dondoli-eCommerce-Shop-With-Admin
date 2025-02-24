import Breadcrumb from "@/components/Breadcrumb";
import Contact from "@/components/Contact";
import SEOHeader from "@/components/SEOHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | DONDOOIL",
  description: "Get in touch with DONDOOIL for natural health and wellness solutions. Visit our location or send us a message.",
};

const ContactPage = () => {
  return (
    <>
      
      {/* <Breadcrumb pageName="Contact Page" /> */}
      <Contact />
      
    </>
  );
};

export default ContactPage;