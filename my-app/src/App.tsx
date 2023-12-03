// import {Routes, Route } from 'react-router-dom'
// import MainPage from './pages/MainPage/main';
// import DetaliedPage from './pages/DetailedPage/detailed';

// function App() {
//   return (
//     <div className='app'>
//         <Routes>
//           <Route path="/" element={<h1>Это наша стартовая страница</h1>} />
//           <Route path="/vacancies" element={<MainPage />} />

//           <Route path="/vacancies/:id" element={<DetaliedPage />} />
//         </Routes>
//     </div>
//   );
// }
  
// export default App;

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react';
import MainPage from './pages/MainPage/main';
import DetaliedPage from './pages/DetailedPage/detailed';
//import RegistrationPage from 'pages/RegistrationPage';
//import LoginPage from 'pages/LoginPage';
//import CurrentApplicationPage from 'pages/CurrentApplicationPage';
//import ApplicationsListPage from 'pages/ApplicationsListPage';
//import SelectedApplicationPage from 'pages/SelectedApplicationPage';
import axios, {AxiosResponse} from 'axios';
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {setUserAction, setIsAuthAction, useIsAuth} from "./slices/AuthSlices";
import {setVacanciesAction} from "./slices/MainSlice";
import { setCurrentRespIdAction } from "./slices/RespSlices"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { mockVacancies} from "./consts";
import { setCurrentRespDateAction, setVacancyFromRespAction } from "./slices/RespSlices"
//import { useCurrentRespId } from "./slices/RespSlices"

const cookies = new Cookies();

export type ReceivedVacancyData = {
  id: number,
  title: string,
  salary: number,
  city: string,
  company: string,
  exp: string | undefined | null,
  image: string | undefined | null;
  status:string;
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();

  const getInitialUserInfo = async () => {
    console.log(cookies.get("session_id"))
    try {
      const response: AxiosResponse = await axios('http://localhost:8000/user_info',
      { 
        method: 'GET',
        withCredentials: true, 
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })

      console.log(response.data)
      dispatch(setIsAuthAction(true))
      dispatch(setUserAction({
        email: response.data.email,
        fullname: response.data.full_name,
        phoneNumber: response.data.phone_number,
        isSuperuser: response.data.is_superuser
      }))
      
    } 
    catch {
      console.log('Пользоатель не авторизован!!!')
    }
  }

  const getVacancies = async () => {
    try {
        const response = await axios('http://localhost:8000/vacancies', {
            method: 'GET',
            withCredentials: true 
        });
        const vacancies = response.data.vacancies;
        if (response.data.resp_id) {
          getCurrentResp(response.data.resp_id);
          dispatch(setCurrentRespIdAction(response.data.resp_id))
        }
        const newArr = vacancies.map((raw: ReceivedVacancyData) => ({
          id: raw.id,
          title: raw.title,
          salary: raw.salary,
          city: raw.city,
          company: raw.company,
          image: raw.image,
          exp: raw.exp,
          status: raw.status
        }));
        dispatch(setVacanciesAction(newArr));
    }
    catch {
      dispatch(setVacanciesAction(mockVacancies));
    }
};

const getCurrentResp = async (id: number) => {
  try {
    const response = await axios(`http://localhost:8000/resp/${id}/`, {
      method: 'GET',
      withCredentials: true,
    })
    dispatch(setCurrentRespDateAction(response.data.application.creation_date))
    const newArr = response.data.vacancies.map((raw: ReceivedVacancyData) => ({
      id: raw.id,
      title: raw.title,
      salary: raw.salary,
      city: raw.city,
      company: raw.company,
      image: raw.image,
      exp: raw.exp,
      status: raw.status
  }));

  dispatch(setVacancyFromRespAction(newArr))
  } catch(error) {
    throw error;
  }
}

  React.useEffect(() => {
    if (cookies.get("session_id")) {
      getInitialUserInfo();
    }
    getVacancies();
  }, [])

  return (
    <div className='app'>
      <HashRouter>
          <Routes>
              <Route path='/'  element={<h1>Это наша стартовая страница</h1>}/>
              <Route path="/vacancies" element={<MainPage/>} />
              <Route path="/vacancies">
                <Route path=":id" element={<DetaliedPage />} />
              </Route>
             {!isAuth && <Route path='/registration' element={<h1>Страница ргистрации</h1>}></Route>}
              {!isAuth && <Route path='/login' element={<h1>Это наша страница входа</h1>}></Route>}
              {isAuth && <Route path='/resp' element={<h1>Это страница текущей заявки</h1>}/>}
              {isAuth && <Route path='/resp' element={<h1>Это страница списка заявок</h1>}></Route>}
              {isAuth && <Route path="/resp">
                <Route path=":id" element={<h1>Это страница выбранной заявки</h1>} />
              </Route>}
              <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </HashRouter>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </div>
    );
  }
  
export default App;