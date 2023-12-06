import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './RespTable.module.scss'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalWindow from '../ModalWindow/ModalWindow.tsx';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useCurrentRespDate, useVacancyFromResp,
  setCurrentRespDateAction, setVacancyFromRespAction, setCurrentRespIdAction } from "../../slices/RespSlices.ts"
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface RespData {
  id: number;
  status: string;
  creation_date: string;
  editing_date: string;
  approving_date: string;
}

interface VacancyData {
    id: number,
    title: string,
    salary: number,
    company: string,
    exp: string | undefined | null,
}

export type ReceivedVacancyData = {
    id: number,
    title: string,
    salary: number,
    company: string,
    exp: string | undefined | null,
}

export type VacancyTableProps = {
  resp: RespData[];
  className?: string;
};

const RespTable: React.FC<VacancyTableProps> = ({resp, className}) => {
  const dispatch = useDispatch();
  const [isModalWindowOpened, setIsModalWindowOpened] = useState(false);
  const [currentVacancies, setCurrentVacancies] = useState<VacancyData[]>([])

  const getCurrentResp = async (id: number) => {
    try {
      const response = await axios(`http://localhost:8000/resp/${id}`, {
        method: 'GET',
        withCredentials: true,
      })
      const newArr = response.data.response.map((raw: ReceivedVacancyData) => ({
        id: raw.id,
        title: raw.title,
        salary: raw.salary,
        company: raw.company,
        exp: raw.exp,
    }));
    setCurrentVacancies(newArr)
    console.log('newArr is', newArr)
    } catch(error) {
      throw error;
    }
  }

  const handleDetailedButtonClick = (id: number) => {
    getCurrentResp(id);
    setIsModalWindowOpened(true)
  };

  return (
    <>
    <div className={styles.table__container}>
    <Table responsive borderless className={!className ? styles.table : cn(styles.table, className)}>
        <thead>
          <tr className={styles.tableHead}>
            <th>№</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Дата изменения</th>
            <th>Дата завершения</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resp.map((res: RespData, index: number) => (
            <tr key={res.id}>
              <td>{++index}</td>
              <td>{res.status}</td>
              <td>{new Date(res.creation_date).toLocaleString()}</td>
              <td>{res.editing_date ? new Date(res.editing_date).toLocaleString(): '-'}</td>
              <td>{res.approving_date ? new Date(res.approving_date).toLocaleString()  : '-'}</td>
              <td className={styles.table__action}>
                <Link to={`/resp/${res.id}`}>
                <Button>Подробнее</Button>
                </Link>
                {/* <Button onClick={() => handleDetailedButtonClick(application.id)}>Подробнее</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

      <ModalWindow handleBackdropClick={() => setIsModalWindowOpened(false)} className={styles.modal} active={isModalWindowOpened}>
      <h3 className={styles.modal__title}>Добавленные вакансии</h3>
      <div className={styles.modal__list}>
        {currentVacancies.map((vacancy: VacancyData, index: number) => (
          <div className={styles['modal__list-item']}>
            <div className={styles['modal__list-item-title']}>
              {vacancy.title} "{vacancy.title}"
            </div>
            <b>{vacancy.company}</b>
          </div>
        ))}
      </div>
      </ModalWindow>
    </>
  );
}

export default RespTable