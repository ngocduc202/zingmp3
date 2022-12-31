import React , {useState}from 'react'
import icons from '../utils/icons'
import * as actions from "../store/action"
import { useDispatch } from 'react-redux'
import { useNavigate, createSearchParams } from 'react-router-dom'
import path from "../utils/path"

const {BsSearch} = icons

const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState("")

  const handleSearch= async (e) => {
    if(e.keyCode === 13)
    {
      dispatch(actions.search(keyword))
      navigate({
        pathname : `/${path.SEARCH}/${path.ALL}`,
        search : createSearchParams({
          q: keyword
        }).toString()
      })

    }
  }

  return (
    <div className='w-full flex items-center'>
        <span className='h-10 pl-4 bg-[#DDE4E4] flex items-center justify-center rounded-l-[20px] text-gray-500'>
          <BsSearch size={22} />
          </span>
      <input
        type="text"
        className='outline-none bg-[#DDE4E4] px-4 py-2 w-full rounded-r-[20px] h-10 text-gray-500'
        placeholder='Tìm kiếm bài hát , nghệ sĩ ,lời bài hát .....'
        value={keyword}
        onChange={e =>  setKeyword(e.target.value)}
        onKeyUp={handleSearch}
      />
    </div>
  )
}

export default Search