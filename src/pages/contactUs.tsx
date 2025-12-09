import ExploreSection from "@/components/ui/ExploreSection";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../store/slices/loginSlice.js";
import GeoHelmet from "@/components/ui/GeoHelmet.js";
export const ContactUs = () => {
  const dispatch = useDispatch();
  const [view , setView] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please fill email")
        .matches(
          /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
          "Invalid email (must include .com/.net/etc)"
        ),
      name: Yup.string()
        .required("Please fill name")
        .min(3, "The name field must be at least 3 characters."),
      description: Yup.string()
        .required("Please fill message")
        .min(10, "The message must be at least 10 characters"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        description: values.description,
      };
      dispatch(
        contactUs({
          ...payload,

          onSuccess: () => {
            formik.resetForm();
            setView(true)
          },
        })
      );
    },
  });
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    formik.setTouched({
      email: true,
      name: true,

      description: true,
    });

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value) {
      formik.setFieldError(name, undefined);
    }
    formik.handleChange(e);
  };

  useEffect(() => {
    if (view) {
      const timer = setTimeout(() => {
        setView(false);
      }, 3000);
  
      return () => clearTimeout(timer); 
    }
  }, [view]);
 const isNavbarOpen = useSelector((state) => state?.bookTemplate?.isNavbarOpen);

  // Schema markup for Contact Us page
  const createContactSchema = () => {
    const baseUrl = "https://www.starmebooks.com";
    
    return {
      "@context": "https://schema.org",
      "@graph": [
        // ContactPage Schema - Main page type
        {
          "@type": "ContactPage",
          "@id": `${baseUrl}/contact-us#webpage`,
          url: `${baseUrl}/contact-us`,
          name: "Contact Us - StarMe Personalized Books",
          description: "Get in touch with StarMe. We'd love to hear from you! Fill out our contact form and we'll get back to you as soon as possible.",
          
          isPartOf: {
            "@id": `${baseUrl}/#website`,
          },
          breadcrumb: {
            "@id": `${baseUrl}/contact-us#breadcrumb`,
          },
          mainEntity: {
            "@id": `${baseUrl}/#organization`,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: "https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/support_image.png",
            width: 800,
            height: 600,
            caption: "StarMe Customer Support",
          },
        },

        // Organization Schema with Contact Information
        {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "StarMe",
          alternateName: "StarMe Personalized Books",
          url: baseUrl,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.svg`,
            width: 250,
            height: 60,
            caption: "StarMe Logo",
          },
          description: "Create personalized children's storybooks where kids become the heroes of their own adventures",
          
          // Contact Points
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              email: "support@starmebooks.com",
              availableLanguage: ["English"],
              areaServed: "Worldwide",
              contactOption: "TollFree",
            },
            {
              "@type": "ContactPoint",
              contactType: "Customer Support",
              email: "support@starmebooks.com",
              availableLanguage: ["English"],
              areaServed: "Worldwide",
            },
            {
              "@type": "ContactPoint",
              contactType: "Sales",
              email: "sales@starmebooks.com",
              availableLanguage: ["English"],
              areaServed: "Worldwide",
            },
          ],
          
    
        
        },

        // WebPage Schema for Contact Form
        {
          "@type": "WebPage",
          "@id": `${baseUrl}/contact-us#form`,
          name: "Get in Touch - Contact Form",
          description: "Send us a message through our contact form. We respond to all inquiries within 24-48 hours.",
          potentialAction: {
            "@type": "CommunicateAction",
            name: "Contact StarMe",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/contact-us`,
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
              ],
            },
            description: "Fill out the contact form to get in touch with our team",
          },
        },

        // BreadcrumbList Schema
        {
          "@type": "BreadcrumbList",
          "@id": `${baseUrl}/contact-us#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: baseUrl,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Contact Us",
              item: `${baseUrl}/contact-us`,
            },
          ],
        },

        // WebSite Schema
        {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
          name: "StarMe Personalized Books",
          description: "Create custom kids' storybooks where your child becomes the hero",
          publisher: {
            "@id": `${baseUrl}/#organization`,
          },
          
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },

       
     
      ],
    };
  };

  return (
    <div>

     <GeoHelmet
        title="Contact Us - StarMe Personalized Books"
        description="Get in touch with StarMe. We'd love to hear from you! Fill out our contact form and we'll get back to you as soon as possible. Customer support for personalized children's storybooks."
        keywords="contact us, customer support, get in touch, email us, contact starme, personalized books support"
        type="website"
        schema={createContactSchema()}
      />
      <div className=" relative  max-w-custom mx-auto px-0 sm:px-6  ">
          <div className="sticky top-0  z-40">
      <Navbar />
      </div>
        <div className={` ${isNavbarOpen ? "blur-sm": ''}  `}>      
        <div className="absolute inset-0 left-0 right-0 -top-28 w-full">
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/fillers.png"
            className="hidden md:block w-full opacity-50"
          />
          <img
            src="	https://resources.wonderwraps.com/a10db3cd-8d51-4c1e-9442-3b46e70493a5/img/responsive_stars.png"
            className="block md:hidden w-full h-auto opacity-50 object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto mt-10 sm:mt-4 p-4 sm:p-8">
          <h1 className=" text-center mb-12 text-3xl font-marcellus text-black ">
            Contact Us
          </h1>

          <div className=" flex flex-col-reverse gap-8 md:flex-row-reverse rounded-lg p-4 z-50 bg-white">
            <div className="flex flex-col-reverse gap-8 md:flex-row-reverse w-full pt-5 z-10 justify-end items-end rounded-md border border-gray-200 bg-white">
              {/* Image Section */}
              <div className="w-full md:w-1/2 z-50 bg-white mt-6 order-1 md:order-2">
                <img
                  src="	https://resources.wonderwraps.com/f6726c80-77e8-49bb-80f6-3d17fe0a8124/img/support_image.png"
                  alt="Support Graphic"
                  className="rounded-lg object-contain w-full max-h-[235px] md:min-h-[377px]"
                />
              </div>

              {/* Form Section */}
              <div className="w-full md:w-1/2 px-4 sm:px-6 flex flex-col justify-center bg-white z-10 order-2 md:order-1">
                <h2 className="text-3xl font-marcellus text-black mb-2 sm:mb-4 text-left md:text-left">
                  Get in Touch
                </h2>
                <p className=" text-neutral-600 text-lg mb-4 sm:mb-6 text-left md:text-left ">
                  We'd love to hear from you! Fill out the form below, and we'll
                  get back to you as soon as possible.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      className={` border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 placeholder:text-sm  shadow-sm block w-full p-3 border  rounded-lg focus:ring-purple-500 focus:border-purple-500  font-figTree ${
                        formik.touched.name && formik.errors.name
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-purple-400"
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-sm mt-1  font-figTree">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
               
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      className={` border-gray-300 text-xs font-poppins pl-3 placeholder:text-stone-400 placeholder:text-sm  focus:border-purple-600 focus:ring-purple-200 rounded-md shadow-sm block w-full p-3 border  font-figTree ${
                        formik.touched.email && formik.errors.email
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-purple-400"
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1  font-figTree">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <textarea
                      name="description"
                      placeholder="Enter your message"
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      rows={4}
                      className={`block w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400    font-figTree ${
                        formik.touched.description && formik.errors.description
                          ? "border-red-500 focus:ring-red-400"
                          : "border-gray-300 focus:ring-purple-400"
                      }`}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <p className="text-red-500 text-sm mt-1  font-figTree">
                          {formik.errors.description}
                        </p>
                      )}
                  </div>
                  <div className={`${view&&"flex gap-4"  } `}>
                 { view &&  <div className="bg-purple-100  text-purple-800 p-4 rounded-md">
                    We have received your message , and our team will contact
                    you shorty via email
                  </div>}
                  <div className="text-center md:text-end mt-4  mb-8 sm:mt-11 sm:mb-8 ">
                    <button
                      type="submit"
                      className=" bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600  text-sm text-white py-2 rounded  w-28 font-figTree transition-all"
                    >
                      Submit
                    </button>
                  </div>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>

      <ExploreSection />
      <div className="lg:pt-0 pt-48 md:pt-0 [@media(min-width:650px)_and_(max-width:767px)]:pt-[330px] [@media(min-width:550px)_and_(max-width:649px)]:pt-[280px]">
        <Footer />
      </div>
    </div>
  );
};
