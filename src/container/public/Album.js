import React , {useEffect,useState}from 'react'
import { useParams ,useLocation } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment/moment'
import {Lists ,AudioLoading} from "../../components"
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch ,useSelector } from 'react-redux'
import * as actions from "../../store/action"
import icons from '../../utils/icons'

const {BsFillPlayFill} =icons

const Album = () => {

  const location = useLocation()

  const {  pid} =useParams()
  const [playListData, setplayListData] = useState({})
  const {isPlaying } = useSelector(state => state.music)
  const dispath = useDispatch()


  useEffect(() =>{
    dispath(actions.setCurAlbumId(pid))
    const fetchDetailPlayplist = async () =>{
      dispath(actions.loading(true))
      const response =await apis.apiGetDetaiPlaylist(pid)
      dispath(actions.loading(false))
      if(response?.data.err ===0)
      {
          setplayListData(response.data?.data)
          dispath(actions.setPlaylist(response?.data?.data?.song?.items))
          // console.log(response)
      }

    }

    fetchDetailPlayplist()
  }, [pid])

  useEffect(() => {
    if(location.state?.playAlbum)
    {
      const randomSong = Math.round(Math.random() * playListData?.song?.items?.length) - 1
      dispath(actions.setCurSongId(playListData?.song?.items[randomSong]?.encodeId))
      dispath(actions.play(true))
    }
  } , [pid , playListData])

  return (
    <>
        <div className='w-full h-[90px]'></div>
    <div className='flex relative gap-8 w-full h-full px-[59px] animate-scale-up-center'>
          <div className='flex-none w-1/4 flex flex-col items-center gap-2'>
              <div className='w-full relative overflow-hidden'>
              <img
                src={playListData?.thumbnailM}
                alt="thumbnail"
                className={`w-full object-contain ${isPlaying ? "rounded-full animate-rotate-center" : "rounded-md animate-rotate-center-pause"} shadow-md`}
                />
                <div className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-[rgba(0,0,0,0.3)]  text-white flex items-center justify-center ${isPlaying && "rounded-full"}`}>
                    <span className='p-3 border border-white rounded-full'>
                      {isPlaying ? <AudioLoading /> :     <BsFillPlayFill size={30} />}
                      </span>
                </div>
              </div>
            <div className='flex flex-col items-center gap-1'>
            <h3 className='text-[20px] font-bold text-gray-800'>{playListData?.title}</h3>
              <span className='flex gap-2 items-center text-gray-500 text-xs'>
                    <span>C???p nh???t :</span>
                    <span>
                      {moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}
                    </span>
              </span>
              <span className='flex gap-2 items-center text-gray-500 text-xs' >
                      {playListData?.artistsNames}
                    </span>
              <span className='flex gap-2 items-center text-gray-500 text-xs'>
                      {`${Math.round(playListData?.like / 1000)}K ng?????i y??u th??ch`}
                    </span>
            </div>
          </div>
        <Scrollbars style={{ width: "100%", height: "90%" }}>
          <div className='flex-auto mb-40'>
              <span className='text-sm'>
                    <span className='text-gray-600 '>L???i t???a </span>
                    <span>{playListData?.sortDescription}</span>
              </span>
                <Lists  totalDuration ={playListData?.song?.totalDuration}/>
          </div>
    </Scrollbars>
    </div>
    </>
  )
}

export default Album