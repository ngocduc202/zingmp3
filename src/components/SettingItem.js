import React from 'react'
import { memo } from 'react'

const SettingItem = ({link}) => {
  return (
    <div className='relative mr-[18px] ' >
    <button className='w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[hsla(0,0%,100%,0.3)] hover:bg-[hsla(0,0%,100%,0.1)]'>
      <i>{link}</i>
    </button>
  </div>
  )
}

export default memo(SettingItem)