import React, { memo } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { useDispatch } from 'react-redux'
import * as actions from "../store/action"

const SongItem = ({thumbnail , title , artists , releaseDate,sid , order ,percent}) => {

  const dispatch = useDispatch()

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(sid))
        dispatch(actions.play(true))
      }}
      className={`w-full flex-auto flex justify-between items-center p-[10px] gap-[10px]  rounded-md cursor-pointer ${order ? "text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7]" : "text-black hover:bg-main-200"}`}>
        <div className='flex gap-4 '>
        {order && <span className={`${order === 1 ? "" : ""} text-white drop-shadow-md  text-[32px] m-auto`}>{order}</span>}
        <img src={thumbnail} alt="thumbnail" className='w-[60px] h-[60px] object-cover rounded-md' />
        <div className='flex flex-col '>
          <span className='text-sm font-semibold'>{title}</span>
          <span className='text-xs opacity-70'>{artists}</span>
          {releaseDate &&  <span className={`text-xs opacity-70`}>{moment(releaseDate * 1000).fromNow()}</span>}
        </div>
        </div>
        {percent &&  <span>{`${percent}%`}</span>}
      </div>
  )
}

export default memo(SongItem)