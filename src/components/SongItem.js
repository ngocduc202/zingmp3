import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from "../store/action"

const SongItem = ({thumbnail , title , artists , releaseDate,sid , order ,percent ,style,sm}) => {

  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(sid))
        dispatch(actions.play(true))
      }}
      className={`w-full flex-auto flex justify-between items-center p-[10px] gap-[10px]  rounded-md cursor-pointer ${style || "text-black hover:bg-main-200"}`}>
        <div className='flex gap-4 '>
        {order && <span className={`${order === 1 ? "text-shadow-no1" : order === 2 ? 'text-shadow-no2' : "text-shadow-no3"} text-[rgba(77,34,104,0.9)] text-[32px] m-auto`}>{order}</span>}
        <img src={thumbnail} alt="thumbnail" className={` ${sm ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"} object-cover rounded-md`} />
        <div className='flex flex-col '>
          <span className='text-sm font-semibold'>{title?.length > 25 ? `${title.slice(0,25)}...` : title}</span>
          <span className='text-xs opacity-70'>{artists?.length > 25 ? `${artists.slice(0,25)}...` : artists}</span>
          {releaseDate &&  <span className={`text-xs opacity-70`}>{moment(releaseDate * 1000).fromNow()}</span>}
        </div>
        </div>
        {percent &&  <span className='font-bold'>{`${percent}%`}</span>}
      </div>
  )
}

export default memo(SongItem)