import moment from 'moment'
import React, { memo } from 'react'
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from "../store/action"


const {BsMusicNoteBeamed} =icons

const List = ({songData , isHideAlbum , isHideNode}) => {

  const dispath = useDispatch()

  // console.log(songData)
  return (
    <div
    className='flex justify-between items-center p-[10px] border-t border-[rgb(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
    onClick={() => {
      dispath(actions.setCurSongId(songData?.encodeId))
      dispath(actions.play(true))
      dispath(actions.playAlbum(true))
      dispath(actions.setRecent({thumbnail : songData?.thumbnail , title:songData?.title ,sid:songData?.encodeId , artists:songData?.artistsNames}))
    } }
    >
        <div className='flex items-center gap-3 flex-1'>
                  {!isHideNode && <span> <BsMusicNoteBeamed/></span>}
                  <img src={songData?.thumbnail} alt="thumbnail" className='w-10 h-10 object-cover rounded-md' />
                  <span className='flex flex-col w-full'>
                      <span className='text-sm font-semibold '>{ songData?.title?.length >30 ? `${  songData?.title?.slice(0 ,25)}...` : songData?.title}</span>
                      <span className='text-xs opacity-70'>{songData?.artistsNames}</span>
                  </span>
        </div>
        {!isHideAlbum && <div className='flex-1 flex items-center justify-center'>
          { songData?.album?.title?.length >30 ? `${  songData?.album?.title?.slice(0 ,30)}...` : songData?.album?.title}
        </div>}
        <div className='flex-1 flex justify-end text-xs opacity-70'>
          {moment.utc(songData?.duration * 1000).format("mm:ss") }
        </div>
    </div>
  )
}
//songData?.artistsNames?.length >30 ? `${  songData?.artistsNames?.slice(0 ,25)}...` :
export default memo(List)