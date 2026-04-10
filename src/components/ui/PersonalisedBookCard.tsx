import React from 'react'
import personalisedBook from '../../assets/images/personalized-books.webp'

type PersonalisedBookCardProps = {
  title: string;
  description: string;
};
const PersonalisedBookCard: React.FC<PersonalisedBookCardProps> = ({ title, description }) => {
  return (
    // <div className="bg-purple-300/50 rounded-lg p-2 md:px-9 flex flex-row justify-between items-center gap-6 relative">
    <div className="relative bg-purple-300/50 rounded-md overflow-hidden ">

      <div className="  hidden sm:block bg-purple-300/50 px-6 pb-8 pt-4 sm:pl-10 sm:py-12 rounded-md overflow-hidden relative">
        <div className="flex flex-col space-y-2 w-full sm:w-2/3 md:w-1/2">
          <h2 className="text-2xl sm:text-3xl text-purple-900/80 font-marcellus">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {/* <div className=" block sm:hidden relative z-10 px-4 pt-6 pb-3 sm:px-10 sm:py-12 sm:pb-12 font-figTree"> */}
      <div className=" block sm:hidden relative bg-purple-300/50 px-6 pb-8 pt-4 sm:pl-10 sm:py-12 rounded-md overflow-hidden font-figTree">
        <div className="flex flex-col space-y-2 w-full sm:w-2/3 md:w-1/2">
          <h2 className="text-2xl sm:text-3xl text-purple-900/80 font-marcellus">
            Hyper-personalised <br /> Books
          </h2>
          <p className="text-xs sm:text-sm text-black/80 leading-relaxed font-figTree">
            A Story for Everyone, <br />Tailored Just Right
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="absolute bottom-0  [@media(min-width:320px)_and_(max-width:374px)]:-right-6 right-0 md:-right-36  lg:right-0 flex justify-center items-center w-full sm:w-[30rem] md:w-[70rem]">
        {/* Mobile Image */}
        <img
          src={personalisedBook}
          alt="Personalized Books"
          // className="block sm:hidden w-96   sm:w-96 md:w-[32rem] lg:w-[40rem]  h-auto object-contain object-bottom"
          className=" [@media(min-width:320px)_and_(max-width:374px)]:w-[15rem]   [@media(min-width:375px)_and_(max-width:424px)]:w-[15rem]    w-[20rem] inset-0 sm:hidden h-auto object-cover"
        />

        {/* Desktop Image */}
        <img
          src={personalisedBook}
          alt="Personalized Books"
          className="hidden sm:block w-96 sm:w-[32rem] md:w-[81%] lg:w-full  h-auto object-contain object-right-bottom"
        />
      </div>
    </div>
  );
};
export default PersonalisedBookCard;
