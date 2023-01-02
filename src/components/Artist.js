import React, { memo ,useState } from 'react'
import { handleNumber } from '../utils/fn'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'

const {AiOutlineUserAdd} =icons

const Artist = ({image , title ,follower,link}) => {

  const [ishover, setIshover] = useState(false)

  return (
    <div className='w-1/5 flex flex-col gap-[15px]'>
      <Link
      className='relative overflow-hidden rounded-full cursor-pointer'
      onMouseEnter={() =>setIshover(true)}
      onMouseLeave={() =>setIshover(false)}
      to={link}
      >
      <img src={image} alt="singer"  className={`w-full  object-contain rounded-full ${ishover ? "animate-scale-up-image" : "animate-scale-down-image"}`}/>
      {ishover &&  <div className='absolute top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,0.2)] rounded-full'></div>}
      </Link>
      <div className='flex gap-1 flex-col items-center'>
      <Link to={link} className='text-sm font-medium hover:underline hover:text-main-500'>{title}</Link>
      <span className='text-xs opacity-70'>{`${handleNumber(follower)} quan tâm`}</span>
      <button
      type='button'
      className='bg-main-500 px-4 py-1 text-white text-sm rounded-l-full rounded-r-full flex items-center justify-center gap-1'
      >
        <span><AiOutlineUserAdd /></span>
          <span className='text-xs opacity-70'>QUAN TÂM</span>
      </button>
      </div>
    </div>
  )
}

export default memo(Artist)