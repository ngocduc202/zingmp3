import React , {useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import * as apis from "../apis"
import { useState } from 'react'
import icons from "../utils/icons"
import { useDispatch} from 'react-redux'
import * as actions from "../store/action"
import moment from 'moment/moment'


const {AiFillHeart ,AiOutlineHeart,BsThreeDots,MdSkipNext,MdSkipPrevious,CiRepeat,CiShuffle,BsFillPlayFill,BsPauseFill} = icons
var intervalId
const Player = () => {

  const {curSongId,isPlaying} = useSelector(state => state.music)
  const  [songInfo, setSonginfo] = useState(null)
  const dispath =useDispatch()
  const [curSeconds, setCurSeconds] = useState(0)
  const [audio, setAudio] = useState(new Audio())
  const thumRef = useRef()


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
        audio.pause()
        setAudio( new Audio(res2.data.data['128']))
      }
    }

    fetchDetailSong()
  }, [curSongId])


  useEffect(() =>{
    if(isPlaying)
    {
      intervalId =setInterval(() => {
        let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
        thumRef.current.style.cssText = `right : ${100 - percent}%`
        setCurSeconds(Math.round(audio.currentTime))
      }, 200);
    }
    else
    {
      intervalId && clearInterval(intervalId)
    }

  }, [isPlaying])

// console.log(audio)

  useEffect(() =>{
    audio.load()
    if(isPlaying) audio.play()

  }, [audio])

  const handleTogglePlayMusic = () =>{
    if(isPlaying)
    {
      audio.pause()
      dispath(actions.play(false))
    }
    else{
      audio.play()
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
              <div className='w-full flex justify-center gap-3 items-center text-xs'>
                  <span className=''>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
                <div className='w-3/5 h-[3px] rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)] '>
                    <div ref={thumRef} className='absolute top-0 left-0  h-[3px] bg-[#0e8080] rounded-l-full rounded-r-full'>

                    </div>
                </div>
                <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
              </div>
          </div>
          <div className='w-[30%] flex-auto'>
            Volume
          </div>
      </div>
  )
}

export default Player