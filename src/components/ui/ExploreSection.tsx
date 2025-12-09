import { useNavigate } from 'react-router-dom';
import frontPicture from '../../assets/images/reading_book.png'
const ExploreSection = () => {
  const navigate = useNavigate()
  return (
    <section className="w-full flex flex-col md:flex-row h-[384px]">
      <div className="w-full lg:w-1/2">
        <img
          src={frontPicture}
          alt="Child reading storybook"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="lg:w-1/2 relative bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 text-white flex items-center 
      justify-start lg:py-[80px] 2xl:pl-[96px] xl:pl-[96px] lg:pl-[96px] md:pl-[48px] lg:pr-[32px] py-[80px] px-[40px] text-left lg:text-left
      ">
        <div className="max-w-md z-10">
          <h2 className="text-[28px] sm:text-card-header  mb-4 font-marcellus leading-[35px]">
            Bring your child&apos;s <br /> imagination to life!
          </h2>
          <p className="mb-[40px] text-[18px] sm:text-xl font-normal font-figTree">
            Make them the hero of their own <br />magical adventure with a personalised storybook!
          </p>
          <button className="bg-white text-purple-700 px-6 py-2 rounded-[4px] text-base font-semibold hover:bg-gray-100 transition font-figTree h-[48px]" onClick={()=>{
            navigate('/template-selection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
         View All Books
          </button>
        </div>
      </div>
    </section>
  );
}

export default ExploreSection;
