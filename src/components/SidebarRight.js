import React ,{useState,useEffect}from 'react'
import icons from '../utils/icons'
import { useSelector } from 'react-redux'
import {SongItem} from "./"
import { apiGetDetaiPlaylist } from '../apis'
import { Scrollbars } from 'react-custom-scrollbars-2';

const {ImBin} = icons

const SidebarRight = () => {

  const [isRecent, setIsRecent] = useState(false)
  const [playlist, setPlaylist] = useState()
  const {curSongData , curAlbumId ,isPlaying} = useSelector(state => state.music)
  // console.log(curSongData)

  useEffect(() => {
    const fetchDetailPlayplist =async () => {
        const response = await apiGetDetaiPlaylist(curAlbumId)
        if(response.data?.err === 0)
        {
          setPlaylist(response.data.data?.song?.items)
        }
    }
    if(curAlbumId && isPlaying) fetchDetailPlayplist()


  }, [curAlbumId ,isPlaying])

  return (
    <div className='flex flex-col text-xs w-full h-full'>
        <div className='h-[70px] w-full flex-none py-[14px] gap-8 px-2 flex justify-between items-center'>
            <div className='flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] p-[6px] cursor-pointer '>
              <span
                className={`py-[5px] ${!isRecent && "bg-main-100"} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                    onClick={() => setIsRecent(prev => !prev)}
                >
                  Danh sách phát
                </span>
              <span
                className={`py-[5px] ${isRecent && "bg-main-100"} flex-1 flex justify-center rounded-l-full rounded-r-full items-center`}
                onClick={() => setIsRecent(prev => !prev)}
                >
                  Nghe gần đây
                </span>
            </div>
            <span className='p-2 rounded-full cursor-pointer hover:bg-main-100'><ImBin size={14}/></span>
        </div>
        <div className='w-full  flex-col flex-auto flex px-2'>
        <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <SongItem
                thumbnail={curSongData?.thumbnail}
                title={curSongData?.title}
                artists={curSongData?.artistsNames}
                sid={curSongData?.encodeId}
                sm
                style="bg-main-500 text-white"
              />
              <div className='flex flex-col text-black pt-[15px] px-2 pb-[5px]'>
                  <span className=' text-sm font-bold'>Tiếp theo</span>
                  <span className='opacity-70 text-xs flex gap-1'>
                      <span>Từ playlist</span>
                      <span className='font-semibold text-main-500'>
                      {curSongData?.album?.title?.length > 25 ? `${curSongData?.album?.title?.slice(0,25)}...` : curSongData?.album?.title }
                      </span>
                  </span>
              </div>
              {playlist && <div className='flex flex-col'>

                {playlist?.map(item =>(
                  <SongItem
                    key={item.encodeId}
                    thumbnail={item?.thumbnail}
                    title={item?.title}
                    artists={item?.artistsNames}
                    sid={item?.encodeId}
                    sm
                  />
                ))}

              </div>}
          </Scrollbars>


        </div>
    </div>
  )
}

export default SidebarRight