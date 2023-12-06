import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './SelectedApplicationPage.module.scss'
import Header from '../../components/header/header';
import VacancyTable from '../../components/VacTable/VacTable';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { useDispatch } from 'react-redux';
import { useLinksMapData, setLinksMapDataAction } from "../../slices/DetailedSlices.ts";

export type ReceivedSubscriptionData = {
    id: number;
    title: string;
    price: number;
    info: string;
    src: string;
    id_category: number;
    category: string;
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

          const newArr = response.data.vacancies.map((raw: ReceivedVacData) => ({
            id: raw.id,
            title: raw.title,
            price: raw.price,
            info: raw.info,
            src: raw.src,
            categoryTitle: raw.category
        }));
        setCurrentVac(newArr)
        } catch(error) {
          throw error;
        }
      }

    React.useEffect(() => {
        const newLinksMap = new Map<string, string>(linksMap); // Копирование старого Map
        newLinksMap.set(id, '/resp/' + id);
        dispatch(setLinksMapDataAction(newLinksMap))
        getCurrentApplication();

    }, [])

    return (
        <div className={styles.application__page}>
            <Header/>
            <div className={styles['application__page-wrapper']}>
                <BreadCrumbs links={linksMap}></BreadCrumbs>
                <h1 className={styles['application__page-title']}>
                    Добавленные абонементы
                </h1>
                <VacnciesTable flag={true} vacancies={currentVac} className={styles['application__page-table']}/>
            </div>
        </div>
    )
}

export default SelectedApplicationPage