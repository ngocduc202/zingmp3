import React from 'react'
import { memo } from 'react'

const LoginNav = ({title , text ,style ,bg, textcolor}) => {
  return (
    <div className={`pt-[15px] pb-[15px] pr-[8px] pl-[8px] rounded-md mt-[10px] mb-[10px] mr-[20px] ml-[20px] text-center text-white ${style ? "bg-gradient-to-t from-[#5a4be7] to-[#c86dd7]" : "bg-[#0e8080]"}`}>
    <div className="text-[12px] mb-[10px] font-bold">{title}</div>
    <button className={`pt-[6px] pb-[6px] pr-[35px] pl-[35px] text-[12px] font-bold ${textcolor ? "text-[#32323d]" : "text-inherit"} border rounded-full  hover:bg-[hsla(0,0%,100%,0.3)] ${bg ? "bg-[#ffdb00] border-[#ffdb00]" : "border-[#fff]"}`}>
        <span>{text}</span>
    </button>
    </div>
  )
}

export default memo(LoginNav)