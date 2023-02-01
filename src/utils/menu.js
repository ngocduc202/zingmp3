import icons from "./icons"

const {MdOutlineLibraryMusic, FiDisc,CgDisc,MdOutlineFeed,FaItunesNote,AiOutlineMenuFold,AiOutlineStar,MdMusicVideo}  = icons

export  const siderbarMenu = [
    {
        path : 'mymusic',
        text  : 'Cá nhân',
        icons : <MdOutlineLibraryMusic size={24} />
    },
    {
      path : ' ',
      text  : 'Khám phá',
      end: true,
      icons : <FiDisc size={24} />
  },
  {
    path : 'zing-chart',
    text  : '#zingchart',
    icons : <CgDisc size={24} />
},
{
  path : 'follow',
  text  : 'Theo dõi',
  icons : <MdOutlineFeed size={24} />
},
{
  path : 'Nhacmoi ',
  text  : 'Nhạc mới',
  icons : <FaItunesNote size={24} />
},
{
  path : 'Theloai',
  text  : 'Thể loại',
  icons : <AiOutlineMenuFold size={24} />
},
{
  path : 'Top100',
  text  : 'Top 100',
  icons : <AiOutlineStar size={24} />
},
{
  path : 'MV',
  text  : 'MV',
  icons : <MdMusicVideo size={24} />
},
]

export  const searchMenu = [
  {
      path : 'tat-ca',
      text  : 'TẤT CẢ',
  },
  {
    path : 'bai-hat',
    text  : 'BÀI HÁT',
},
{
  path : 'playlist',
  text  : 'PLAYLIST/ALBUM',
},
// {
// path : 'follow',
// text  : 'Theo dõi',
// icons : <MdOutlineFeed size={24} />
// },
]