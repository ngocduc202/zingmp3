import { useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import {Home ,Login ,Public,Personal,Album} from './container/public/';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Routes , Route } from "react-router-dom";
import path from "./utils/path";
import { useEffect } from "react";
import * as actions from "./store/action"



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.getHome())
  } ,[])

  return (
    <>
    <div>
      <Routes>
            <Route path={path.PUBLIC} element={<Public/>}>
                  <Route path={path.HOME} element = {<Home/>} />
                  <Route path={path.LOGIN} element = {<Login/>} />
                  <Route path={path.MYMUSIC} element = {<Personal/>} />
                  <Route path={path.ALBUM__TITLE__PID} element = {<Album/>} />
                  <Route path={path.PLAYLIST__TITLE__PID} element = {<Album/>} />


                  <Route path={path.STAR} element = {<Home/>} />
            </Route>

      </Routes>

    </div>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
/>
<ToastContainer />
    </>
  );
}

export default App;
