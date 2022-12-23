import icons from "./icons"

const {MdOutlineLibraryMusic, FiDisc,CgDisc,MdOutlineFeed}  = icons

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
]