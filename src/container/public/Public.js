import React ,{useState}from "react";
import { Outlet, useParams } from "react-router-dom";
import { SidebarLeft , SidebarRight,Player ,Header ,Loading,NewRelease} from "../../components";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from "react-redux";

const Public = () =>{

  const [isShowRightSidebar, setIsShowRightSidebar] = useState(true)
  const {isLoading} = useSelector(state => state.app)
  const {singer} = useParams()

  return (
    <div className="w-full relative h-screen flex  flex-col bg-main-300">
        <div className="w-full h-full flex flex-auto  ">
            <div className="w-[230px] h-full flex-none ">
              <SidebarLeft />
            </div>
            <div className="flex-auto relative flex flex-col ">
                  {isLoading &&    <div className='absolute top-0 bottom-0 left-0 right-0 z-20 bg-main-200 flex items-center justify-center'>
              <Loading />
            </div>}
              <div className={`h-[70px] ${singer ? "bg-transparent" : " bg-main-300"} fixed top-0 left-[230px] right-[300px] px-[59px] z-50 flex items-center`}>
            <Header />
              </div>
              <div className="flex-auto w-full">
              <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
                  <Outlet />
              </Scrollbars>
              </div>
            </div>
          {isShowRightSidebar &&  <div className="w-[300px]  hidden 1600:flex flex-none h-screen  animate-slide-left absolute top-0 right-0 bottom-0 z-50 bg-main-300">
          <SidebarRight />
          </div>}
        </div>

        <div className="fixed z-50 bottom-0 right-0 left-0 h-[90px]">
          <Player  setIsShowRightSidebar={setIsShowRightSidebar}/>
        </div>

    </div>
  )
}

export default Public