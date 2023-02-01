import React from "react";
import logo from '../assets/logo.svg'
import { siderbarMenu } from "../utils/menu";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import path from "../utils/path";
import {LoginNav} from "./"


const notActiveStyle ="py-2 px-[25px] text-[#32323D] text-[13px] font-bold flex gap-[12px] items-center "
const ActiveStyle = "py-2 px-[25px] text-[#0F7070] text-[13px] font-bold flex gap-[12px] items-center "


const SidebarLeft  = ()=>{

  const navigate  =useNavigate()

  return(
    <div className="flex h-full flex-col bg-main-200">
        <div  onClick={() => navigate(path.HOME)} className="w-full h-[70px] min-[1024px]:py-[15px] min-[1024px]:px-[25px] flex justify-start items-center cursor-pointer">
              <img src={logo} alt="logo"  className="w-[120px]  h-10 min-[1024px]:block hidden " />
              <img
              src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.22/static/media/icon_zing_mp3_60.f6b51045.svg"
              className="w-[95px] h-[45px] min-[1024px]:hidden "
              alt=""logo
              />
        </div>

          <div className="flex flex-col">

              {siderbarMenu.map(item =>(
                <NavLink
                to={item.path}
                key={item.path}
                end={item.end}
                className={({isActive}) => isActive ? ActiveStyle : notActiveStyle}>
                    {item.icons}
                    <span className="min-[1024px]:inline hidden">{item.text}</span>
                </NavLink>
              ))}
          </div>

                <LoginNav
                title={"Đăng nhập để khám phá playlist dành riêng cho bạn"}
                text={"ĐĂNG NHẬP"}
                />
                <LoginNav
                title={"Nghe nhạc không quảng cáo cùng kho nhạc VIP"}
                text={"Nâng cấp VIP"}
                style
                bg
                textcolor
                />

    </div>
  )
}

export default SidebarLeft