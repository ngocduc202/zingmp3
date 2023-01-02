import React , {useEffect} from "react";
import { Slider ,Section,NewRelease,ChartSection ,Artist } from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Sliders from "react-slick";

const Home = () =>{
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7
  };

  const {friday , newEveryday ,top100 , xone , newMusic ,weekChart ,favorriteArtist ,singer} = useSelector(state => state.app)


  return (
    <div className="overflow-y-auto w-full ">
        <Slider />
        <Section data={friday} />
        <Section data={newEveryday} />
        <NewRelease/>
        <Section data={top100} />
        <ChartSection />
          {singer && <div className="px-[43px] w-full mt-12">
          <Sliders {...settings}>
          {singer?.map(item => (
            <div key={item.id} className="px-4">
              <Artist
            image={item.thumbnail}
            follower={item.totalFollow}
            link={item.link}
            title={item.name}
            />
            </div>
          ))}
          </Sliders>
          </div>}
        <div className="flex items-center px-[43px] w-full mt-12">
          {weekChart?.map(item =>(
            <Link to={item?.link?.split('.')[0]} key={item.link} className="flex-1 px-4">
              <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
            </Link>
          ))}
        </div>
        <Section data={xone} />
        <Section data={newMusic} />

        {/* <div className="px-[59px] flex gap-4">
            <div className='flex items-center justify-between'>
                <h3 className='text-[20px] font-bold'>{favorriteArtist?.title}</h3>
                <span className='text-xs'>TẤT CẢ</span>
              </div>
        </div> */}
        <div className="w-full h-[500px]"></div>
    </div>
  )
}

export default Home