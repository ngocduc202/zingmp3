import React from 'react'
import icons from '../utils/icons'
import {Search ,SettingItem} from './'
import { useNavigate, useParams } from 'react-router-dom'

const {HiArrowNarrowLeft , HiArrowNarrowRight ,FaAffiliatetheme , RiVipFill ,FiSettings ,FaUser} = icons

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
        <div className='flex w-[24%] items-center justify-center mt-0 mr-[-20px]'>
          <SettingItem
          link={<FaAffiliatetheme size={20} />}
          />
          <SettingItem
          link={<RiVipFill size={20} />}
          />
          <SettingItem
          link={<FiSettings size={20}/>}
          />
          <SettingItem
          link={<FaUser size={20} />}
          />
        </div>
    </div>
  )
}

export default Header