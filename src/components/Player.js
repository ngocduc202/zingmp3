import React , {useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import * as apis from "../apis"
import { useState } from 'react'
import icons from "../utils/icons"
import { useDispatch} from 'react-redux'
import * as actions from "../store/action"


const {AiFillHeart ,AiOutlineHeart,BsThreeDots,MdSkipNext,MdSkipPrevious,CiRepeat,CiShuffle,BsFillPlayFill,BsPauseFill} = icons

const Player = () => {
  const audioEl = useRef(new Audio())
  const {curSongId,isPlaying} = useSelector(state => state.music)
  const [source , setSource] = useState(null)
  const  [songInfo, setSonginfo] = useState(null)
  const dispath =useDispatch()



  // console.log(audioEl);

  useEffect(() =>{
    const fetchDetailSong = async () =>{
      const [res1 , res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      if(res1.data.err === 0)
      {
        setSonginfo(res1.data.data)
      }
      if(res2.data.err === 0)
      {
        setSource(res2.data.data['128'])
      }
    }

    fetchDetailSong()
  }, [curSongId])

console.log(source)

  useEffect(() =>{
    audioEl.current.pause()
    audioEl.current.src = source
    audioEl.current.load()
    if(isPlaying) audioEl.current.play()

  }, [curSongId ,source])

  const handleTogglePlayMusic = () =>{
    if(isPlaying)
    {
      audioEl.current.pause()
      dispath(actions.play(false))
    }
    else{
      audioEl.current.play()
      dispath(actions.play(true))
    }
  }


  return (
    <div className='bg-main-400 px-5 h-full flex '>
          <div className='w-[30%] flex-auto flex gap-4 items-center'>
            <img src={songInfo?.thumbnail} alt="thumbnail"  className='w-16 h-16 object-cover rounded-md'/>
            <div className='flex flex-col '>
                  <span className='font-semibold text-gray-700 text-sm'>{songInfo?.title}</span>
                  <span className='text-xs text-gray-500'>{songInfo?.artistsNames}</span>
            </div>
            <div className='flex gap-4 pl-2'>
              <span>
                  <AiOutlineHeart size={16} />
              </span>

              <span>
                <BsThreeDots  size={16}/>
              </span>
            </div>
          </div>
          <div className='w-[40%] flex-auto flex flex-col items-center justify-center gap-2 py-2'>
              <div className='flex gap-8 justify-center items-center'>
                  <span className='cursor-pointer' title='Bật phát ngẫu nhiên'> <CiShuffle size={24} /> </span>
                  <span className='cursor-pointer'> <MdSkipPrevious size={24} /> </span>
                  <span
                    className='p-1 border border-gray-700 rounded-full hover:text-emerald-800 cursor-pointer'
                    onClick={handleTogglePlayMusic}
                    >
                    {isPlaying ?  <BsPauseFill size={30} /> :  <BsFillPlayFill size={30} />  }
                    </span>
                  <span className='cursor-pointer'> <MdSkipNext size={24} /></span>
                  <span className='cursor-pointer' title='Bật phát lại tất cả'> <CiRepeat size={24} /></span>
              </div>
              <div className=''>
                progress
              </div>
          </div>
          <div className='w-[30%] flex-auto'>
            Volume
          </div>
      </div>
  )
}

export default Player