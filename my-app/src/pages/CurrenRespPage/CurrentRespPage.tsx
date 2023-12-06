import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import styles from './CurrentRespPage.module.scss'
import Header from '../../components/header'
import Button from 'react-bootstrap/Button'
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import {useCurrentRespId } from  "../../slices/RespSlices.ts";
import { useDispatch } from 'react-redux'
import {useCurrentRespDate, useVacancyFromResp,setCurrentRespDateAction, setVacancyFromRespAction } from  "../../slices/RespSlices.ts";
import { useLinksMapData, setLinksMapDataAction } from "../../slices/DetailedSlices.ts";
import VacancyTable from '../../components/VacTable/VacTable.tsx'

export type ReceivedVacancyData = {
    id: number,
    title: string,
    salary: number,
    company: string,
    exp: string | undefined | null,
}

const CurrentRespPage = () => {
  const dispatch = useDispatch();
  const currentRespId = useCurrentRespId();
  const linksMap = useLinksMapData();

  console.log("Черновик", currentRespId)


  React.useEffect(() => {
    dispatch(setLinksMapDataAction(new Map<string, string>([
      ['Текущий отклик', '/resp']
  ])))
  if (currentRespId) {getResp(currentRespId)}
  }, [])

  const vacancies = useVacancyFromResp();
  const getResp = async (id: number) => {
    try {
        const response = await axios(`http://localhost:8000/resp/${id}/`, {
            method: 'GET',
            withCredentials: true 
        });
        console.log("BASKET", response)
        const jsonData = response.data.response;

        dispatch(setCurrentRespDateAction(jsonData.creation_date));
    }
    catch (error) {
          toast.error("Ошибка импорта заявки");
        }
    }



  const sendResp = async () => {
    try {
      const response = await axios(`http://localhost:8000/resp/made/`, {
        method: 'PUT',
        withCredentials: true
      })

      dispatch(setVacancyFromRespAction([]));
      dispatch(setCurrentRespDateAction(''));
      toast.success("Отправлено на проверку модератору");
    } catch(error) {
      throw error;
    }
  }

  const deleteResp = async () => {
    try {
      const response = await axios(`http://localhost:8000/resp/delete`, {
      method: 'DELETE',
      withCredentials: true
    })

    dispatch(setVacancyFromRespAction([]));
    dispatch(setCurrentRespDateAction(''));
    toast.success("Отклик удален");
    }
    catch(error) {
      throw error;
    }
    
  }

  const handleSendButtonClick = () => {
    sendResp();
  }

  const handleDeleteButtonClick = () => {
    deleteResp();
  }

  return (
    <div className={styles.application__page}>
      <Header/>
      <div className={styles['application__page-wrapper']}>
        <BreadCrumbs links={linksMap}></BreadCrumbs>
        <h1 className={styles['application__page-title']}>
          Текущий отклик
        </h1>

        {currentRespId ? <div>
          <h5 className={styles['application__page-subtitle']}>
            У вас есть возможность удалять вакансии из заявки, удалить всю заявку или отправить заявку на проверку
          </h5>

          <div className={styles['application__page-info']}>
            <h3 className={styles['application__page-info-title']}>Ваши вакансии:</h3>
            <VacancyTable vacancies={vacancies} className={styles['application__page-info-table']}/>

            <div className={styles['application__page-info-btns']}>
              <Button onClick={() => handleSendButtonClick()} className={styles['application__page-info-btn']}>Отправить</Button>
              <Button onClick={() => handleDeleteButtonClick()} className={styles['application__page-info-btn']}>Удалить</Button>
            </div>
          </div>
        </div>
        : <h5 className={styles['application__page-subtitle']}>
            В отклике нет вакансий
          </h5>
      }
      </div>
    </div>
  )
}

export default CurrentRespPage