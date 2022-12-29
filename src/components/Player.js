import React , {useEffect,useRef} from 'react'
import { useSelector } from 'react-redux'
import * as apis from "../apis"
import { useState } from 'react'
import icons from "../utils/icons"
import { useDispatch} from 'react-redux'
import * as actions from "../store/action"
import moment from 'moment/moment'
import { toast } from 'react-toastify'
import {LoadingSong} from "./"


const {AiFillHeart ,AiOutlineHeart,BsThreeDots,MdSkipNext,MdSkipPrevious,CiRepeat,CiShuffle,BsFillPlayFill,BsPauseFill, TbRepeatOnce,BsMusicNoteList,SlVolume1 ,SlVolume2 ,SlVolumeOff} = icons
var intervalId
const Player = ({setIsShowRightSidebar}) => {

  const {curSongId,isPlaying ,songs} = useSelector(state => state.music)
  const  [songInfo, setSonginfo] = useState(null)
  const dispath =useDispatch()
  const [curSeconds, setCurSeconds] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLoadedSource, setIsLoadedSource] = useState(true)
  const [volume, setVolume] = useState(100)
  const [audio, setAudio] = useState(new Audio())
  const thumRef = useRef()
  const trackRef = useRef()


  // console.log(audioEl);

  useEffect(() =>{
    const fetchDetailSong = async () =>{
      setIsLoadedSource(false)
      const [res1 , res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      setIsLoadedSource(true)
      if(res1.data.err === 0)
      {
        setSonginfo(res1.data.data)
        dispath(actions.setCurSongData(res1.data.data))
      }
      if(res2.data.err === 0)
      {
        audio.pause()
        setAudio( new Audio(res2.data.data['128']))
      }
      else{
        audio.pause()
        setAudio(new Audio())
        dispath(actions.play(false))
        toast.warn(res2.data.msg)
        setCurSeconds(0)
        thumRef.current.style.cssText = `right : 100%`
      }
    }

    fetchDetailSong()
  }, [curSongId])

  useEffect(() =>{
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if(isPlaying && thumRef.current){
      audio.play()
      intervalId =setInterval(() => {
        let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
        thumRef.current.style.cssText = `right : ${100 - percent}%`
        setCurSeconds(Math.round(audio.currentTime))
      }, 200);
    }

  }, [audio])

  useEffect(()  =>{
    const handleEnded = () =>{

      if(isShuffle)
      {
        handleShuffle()
      }
      else if(repeatMode)
      {
          repeatMode === 1 ? handleRepeatOne() :  handleNextSong()
      }
      else
      {
        audio.pause()
        dispath(actions.play(false))
      }

    }
    audio.addEventListener("ended" , handleEnded)

    return () =>{
      audio.removeEventListener ("ended" ,handleEnded)
    }

  }, [audio , isShuffle , repeatMode])

  useEffect(() => {
    audio.volume = volume / 100
  }, [volume])

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

  const handleClickProgressBar = (e) =>{
    const trackRect =  trackRef.current.getBoundingClientRect()
    const persent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
    thumRef.current.style.cssText = `right : ${100 - persent}%`
    audio.currentTime = persent * songInfo.duration / 100
    setCurSeconds(Math.round(persent * songInfo.duration / 100))
  }

  const handleNextSong = () =>{
    if(songs)
    {
      let currentSongIndex
      songs?.forEach((item ,index) =>{
        if(item.encodeId === curSongId)
        {
          currentSongIndex = index
        }
      })
            dispath(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
            dispath(actions.play(true))
    }
  }

  const handleRepeatOne = () =>{
    audio.play()
  }

  const handlePrevSong = () =>{
    if(songs)
    {
      let currentSongIndex
      songs?.forEach((item ,index) =>{
        if(item.encodeId === curSongId)
        {
          currentSongIndex = index
        }
      })
            dispath(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
            dispath(actions.play(true))
    }
  }

  const  handleShuffle = () =>{
    const randomIndex = Math.round(Math.random() * songs?.length ) - 1
    dispath(actions.setCurSongId(songs[randomIndex].encodeId))
    dispath(actions.play(true))

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
                  <span
                      className={`cursor-pointer ${isShuffle ? "text-purple-600"  : "text-black"}`}
                      title='Bật phát ngẫu nhiên'
                      onClick={() => setIsShuffle(prev => !prev)}
                      >
                    <CiShuffle size={24} />
                    </span>
                  <span
                  onClick={handlePrevSong}
                  className={`${!songs ? "text-gray-500 " : "cursor-pointer"}`}>
                  <MdSkipPrevious size={24} />
                  </span>
                  <span
                    className='p-1 border border-gray-700 rounded-full hover:text-emerald-800 cursor-pointer'
                    onClick={handleTogglePlayMusic}
                    >
                      {!isLoadedSource ? <LoadingSong />  : isPlaying ?  <BsPauseFill size={30} /> :  <BsFillPlayFill size={30} /> }

                    </span>
                  <span
                    onClick={handleNextSong}
                    className={`${!songs ? "text-gray-500 " : "cursor-pointer"}`}>
                    <MdSkipNext size={24} />
                    </span>
                  <span
                    className={`cursor-pointer ${repeatMode && "text-purple-600" }`}
                    title='Bật phát lại tất cả'
                    onClick={() => setRepeatMode(prev =>  prev === 2 ? 0 : prev + 1)}
                    >
                      {repeatMode === 1 ? <TbRepeatOnce size={24} /> : <CiRepeat size={24} /> }
                      </span>
              </div>
              <div className='w-full flex justify-center gap-3 items-center text-xs'>
                  <span className=''>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
                <div
                  className='w-3/5 h-[3px] hover:h-[6px] cursor-pointer rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]'
                  onClick={handleClickProgressBar}
                  ref={trackRef}
                  >
                    <div ref={thumRef} className='absolute top-0 left-0  bottom-0 bg-[#0e8080] rounded-l-full rounded-r-full'>

                    </div>
                </div>
                <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
              </div>
          </div>
          <div className='w-[30%] flex-auto flex items-center justify-end gap-4'>

            <div className='flex gap-2 items-center'>
              <span onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}>{+volume >= 50  ? <SlVolume2/> : +volume === 0 ? <SlVolumeOff/> : <SlVolume1/>}</span>
            <input
                type="range"
                step={1}
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                />
            </div>
              <span
                className='p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100'
                onClick={() => setIsShowRightSidebar(prev => !prev)}
                >
                  <BsMusicNoteList size={20} />
                  </span>
          </div>
      </div>
  )
}

export default Player