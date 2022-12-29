import React , {useEffect} from "react";
import { Slider ,Section,NewRelease,ChartSection } from "../../components";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";


const Home = () =>{
  const {friday , newEveryday ,top100 , xone , newMusic ,weekChart ,favorriteArtist} = useSelector(state => state.app)


  return (
    <div className="overflow-y-auto w-full ">
        <Slider />
        <Section data={friday} />
        <Section data={newEveryday} />
        <NewRelease/>
        <Section data={top100} />
        <ChartSection />
        <Section data={xone} />
        <Section data={newMusic} />
        <div className="flex items-center px-[43px] w-full mt-12">
          {weekChart?.map(item =>(
            <Link to={item?.link?.split('.')[0]} key={item.link} className="flex-1 px-4">
              <img src={item.cover} alt="cover" className="w-full object-cover rounded-md" />
            </Link>
          ))}
        </div>
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