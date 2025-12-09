import React, { useEffect, useState } from 'react';
import setup from '../../assets/images/setup-arrow.svg'
import face1 from "../../assets/images/face_1.png"
import book1 from "../../assets/images/book1.png"
import face2 from "../../assets/images/face_2.png"
import book2 from "../../assets/images/book2.png"
import book3 from "../../assets/images/book3.png"
import face3 from "../../assets/images/face_3.png"


const images = [
  {
    face: face1,
    book: book1,
  },
  {
    face: face2,
    book: book3,
  },
  {
    face: face3,
    book: book2,
  },
];

const PersonalizedImageSlider: React.FC = ({preview}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center ">
      {/* //! keyur */}
    <p className={`uppercase text-xs text-[#C569FF] mb-1 ${preview ? "pt-[96px]":"pt-36"}  font-figTree font-medium`}>How others personalised their stories</p>
    <h3 className="text-2xl sm:text-3xl md:text-[30px] font-marcellus text-black my-4">
      Adored by <br /> millions worldwide
    </h3>
    
    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
      <img
        src={images[index].face}
        alt="Face"
        className="w-24 h-24 sm:w-28 sm:h-28 md:w-[144px] md:h-[144px] rounded-full object-cover z-10 mt-[90px]"
      />
      <img src={setup} alt='test' className='absolute top-16 left-9' />
      <img
        src={images[index].book}
        alt="Book"
        className="w-40 sm:w-48 md:w-64 lg:w-[300px] transform [@media(min-width:1024px)_and_(max-width:1056px)]:w-[280px] rounded-lg  rotate-6 relative top-3"
      />
    </div>
  </div>
  );
};

export default PersonalizedImageSlider;
