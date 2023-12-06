import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './SelectedApplicationPage.module.scss'
import Header from '../../components/header/header';
import VacancyTable from '../../components/VacTable/VacTable';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { useDispatch } from 'react-redux';
import { useLinksMapData, setLinksMapDataAction } from "../../slices/DetailedSlices.ts";

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


const SelectedRespPage = () => {
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const [currentVac, setCurrentVac] = React.useState([])
    const dispatch = useDispatch();
    const linksMap = useLinksMapData();

    const getCurrentResp = async () => {
        try {
          const response = await axios(`http://localhost:8000/resp/${id}/`, {
            method: 'GET',
            withCredentials: true,
          })

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
        setCurrentVac(newArr)
        } catch(error) {
          throw error;
        }
      }

    React.useEffect(() => {
        const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
        newLinksMap.set("Детали отклика", '/resp/' + id);
        dispatch(setLinksMapDataAction(newLinksMap))
        getCurrentResp();

    }, [])

    return (
        <div className={styles.application__page}>
            <Header/>
            <div className={styles['application__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>
                <h1 className={styles['application__page-title']}>
                    Добавленные вакансии
                </h1>
                <VacancyTable flag={true} vacancies={currentVac} className={styles['application__page-table']}/>
            </div>
        </div>
    )
}

export default SelectedRespPage