import React from 'react'
import icons from '../utils/icons'
import {Search} from './'
import { useNavigate, useParams } from 'react-router-dom'

const {HiArrowNarrowLeft , HiArrowNarrowRight} = icons

const Header = () => {
  const {singer} = useParams()
  const navigate = useNavigate()
  return (
    <div className=' flex  justify-between w-full items-center '>
        <div className='flex gap-6 w-full items-center'>
              <div className={`flex gap-6 cursor-pointer ${singer ? "text-gray-200" : " text-gray-400"}`}>
                <span onClick={() => navigate(-1)}><HiArrowNarrowLeft size={24} /></span>
                <span onClick={() => navigate(1)}><HiArrowNarrowRight size={24} /></span>
              </div>
              <div className='w-1/2'>
                  <Search />
              </div>
        </div>
        <div>
          Login
        </div>
    </div>
  )
}

export default Header