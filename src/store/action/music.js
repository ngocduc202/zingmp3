import actionTypes from "./actionTypes";
import * as apis from "../../apis"


export const setCurSongId = (sid) =>({
  type : actionTypes.SET_CUR_SONG_ID,
  sid
})

export const play = (flag) =>({
  type : actionTypes.PLAY,
  flag
})

export const playAlbum = (flag) =>({
  type : actionTypes.SET_ALBUM,
  flag
})

export const setPlaylist = (songs) =>({
  type : actionTypes.PLAY_LIST,
  songs
})

export const loading = (flag) =>({
  type : actionTypes.LOADING,
  flag
})

export const setCurSongData = (data) =>({
  type : actionTypes.SET_CUR_SONG_DATA,
  data
})

export const setCurAlbumId = (pid) =>({
  type : actionTypes.SET_CUR_ALBUM_ID,
  pid
})

export const setRecent = (data) =>({
  type : actionTypes.SET_RECENT,
  data
})

export const search = (keyword) => async (dispath) => {
  try {
    const response = await apis.apiSearch(keyword)
    if(response.data.err === 0)
    {
      dispath({type : actionTypes.SEARCH , data : response.data.data})
    }
    else{
      dispath({type : actionTypes.SEARCH,  data : null})
    }

  } catch (error) {
    dispath({
      type :  actionTypes.SEARCH,
      data: null
    })
  }
}


// export const fetchDetailPlayplist = (pid) => async (dispath) =>{
//   try {
//     const response = await apis.apiGetDetaiPlaylist(pid)

//       if(response?.data.err === 0)
//       {
//         dispath({
//           type :actionTypes.PLAY_LIST ,
//           songs : response.data?.data?.song?.items

//         })
//       }


//   } catch (error) {
//       dispath({
//         type : actionTypes.PLAY_LIST ,
//         spngs :null
//       })
//   }
// }