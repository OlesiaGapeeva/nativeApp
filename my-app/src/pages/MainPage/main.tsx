import React from 'react';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Dropdown from 'react-bootstrap/Dropdown';
import Header from '../../components/header';
import axios from 'axios';
import OneCard from '../../components/card';
import styles from './main.module.scss';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import {useDispatch} from "react-redux";
import {useTitleValue, useVacancies,
    setTitleValueAction, setVacanciesAction} from "../../slices/MainSlice.ts";

import { setLinksMapDataAction} from "../../slices/DetailedSlices.ts";

import { useVacancyFromResp, setVacancyFromRespAction } from  "../../slices/RespSlices.ts";
//import Cookies from "universal-cookie";

//const cookies = new Cookies();
export type Vacancies = {
    id: number,
    title: string,
    adress?: string |null,
    time?: string,
    salary: number,
    company: string,
    city?: string | null,
    exp: string,
    image?: string | null,
    info?: string,
    status: string
}

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

const mockVacancies = [
    {'title': 'Копирайтер', 'adress': 'Алексеевская', 'time':'Полный день', 'salary': 50000, 'company': 'Копи-копи', 'city': 'Москва', 'exp': 'Без опыта', 'image': "https://w7.pngwing.com/pngs/299/589/png-transparent-social-media-computer-icons-technical-computer-network-text-computer.png", 'id': 1, 'status': 'enabled', 'info': 'Компания "Копи-копи" стремится к совершенству и инновациям. Ее команда талантливых копирайтеров постоянно ищет новые способы выразить идеи и повысить эффективность коммуникации. С каждым текстом, созданным "Копи-копи", они продолжают укреплять свою репутацию как надежного партнера, который доставляет не только качественные тексты, но и вдохновение, которое воплощается в каждом слове.','requirements' :['Отличное владение русским языком', 'Умение писать грамотные тексты', 'Креативность и внимательность к деталям'], 'conditions': ['Гибкий график работы', 'Возможность удаленной работы', 'Оплачиваемый отпуск', 'Профессиональное развитие и обучение', 'Дружеская и поддерживающая рабочая атмосфера']},
    {
    'title': 'Менеджер блогера',
    'adress': 'Алтуфьевское шоссе, 12',
    'time': 'Сменный график',
    'salary': 10000,
    'company': 'Co_blog',
    'city': 'Москва',
    'exp': 'От года',
    'image': null,
    'id': 2,
    'status': 'enabled',
    'info': 'Компания Co_blog - это легендарный блогинговый ресурс, который начал свою деятельность двадцать лет назад в гараже основателя. С течением времени они стали одной из самых влиятельных и популярных платформ для блогеров. Co_blog известен своим инновационным подходом к созданию контента и использованию социальных сетей для его продвижения. Сотрудники компании являются настоящими экспертами в области блогинга и имеют огромную базу фанатов и подписчиков, которые следят за их публикациями. Co_blog стал не только платформой для создания и обмена контентом, но и местом, где талантливые блогеры могут раскрыть свой потенциал и достичь большого успеха.',
    },
    {
    'title': 'Куратор',
    'salary': 7000,
    'time': 'Удаленная работа',
    'company': 'Вебскул',
    'image': 'https://cdn1.dizkon.ru/images/contests/2017/08/15/5992c98e5cd2e.700x534.80.jpg',
    'exp': 'Без опыта',
    'id': 3,
    'status': 'enabled',
    'info': 'Вебскул - компания, которая изменила пейзаж онлайн-образования. Они были основаны группой страстных преподавателей и разработчиков, которые верили в доступность и качество образования для всех. Вебскул разработал инновационную веб-платформу, которая объединяет учителей и учеников со всего мира. С помощью передовых технологий и интерактивных методик обучения, Вебскул предлагает образовательные курсы в различных областях знаний. Компания стремится изменить способ, которым люди учатся и развиваются, и дает возможность каждому раскрыть свой потенциал независимо от места проживания или времени.',
    },
    {
    'title': 'Редактор',
    'salary': 20000,
    'time': 'Удаленная работа',
    'company': 'Новая газета',
    'city': 'Москва',
    'exp': 'Без опыта',
    'id': 4,
    'status': 'enabled',
    'info': 'Новая газета - это историческое издание, которое существует уже более ста лет. Они являются одним из самых авторитетных и влиятельных печатных изданий в стране. Новая газета всегда была символом независимой журналистики и свободы слова. Их журналисты и редакторы известны своей профессиональностью, точностью и честностью в отношении информации, которую они предоставляют своим читателям. Новая газета активно освещает важные события и проблемы общества, их репортажи и статьи часто становятся объектом обсуждения и влияют на общественное мнение.',
    }
]

export type ReceivedUserData = {
    id: number,
    email: string,
    full_name: string,
    phone_number: string,
    password: string,
    is_superuser: boolean,
}

// const MainPage: React.FC = () => {
//     const [vacancies, setVacancies] = useState<Vacancies[]>([]);
//     const [titleValue, setTitleValue] = useState<string>('')

//     const fetchVacancies = async () => {
//         let response = null;
//         let url = 'http://localhost:8000/vacancies';
    
//         if (titleValue) {
//             url += `?keyword=${titleValue}`;
//         }
//         console.log(url);
    
//         try {
//             response = await fetch(url);
//             const jsonData = await response.json();
//             const newVacanciesArr = jsonData.map((raw: ReceivedVacancyData) => ({
//                 id: raw.id,
//                 title: raw.title,
//                 salary: raw.salary,
//                 city: raw.city,
//                 company: raw.company,
//                 image: raw.image,
//                 exp: raw.exp
//             }));
//             setVacancies(newVacanciesArr);

//         }catch (error) {
//             console.log(error)
//                 console.error("Error during fetch:", error);
//                 // Остальной код обработки ошибки
//             }
//         // } catch {
//         //     if (titleValue) {
//         //         const filteredArray = mockVacancies.filter((mockVacancy) =>
//         //             mockVacancy.title.includes(titleValue)
//         //         );
//         //         setVacancies(filteredArray);
//         //     } else {
//         //         setVacancies(mockVacancies);
//         //     }
//         // }
        
//     };

    // useEffect(() => {
    //     fetchVacancies();
    // }, []);

    // const handleSearchButtonClick = () => {
    //     fetchVacancies();
    // }

    // const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    //     setTitleValue(event.target.value);
    // };

    
    // const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    // };

    const MainPage = () => {
        const dispatch = useDispatch()
        const titleValue = useTitleValue();
        const vacancies = useVacancies();
        const vacancyFromResp = useVacancyFromResp();

        
        

        
        //const linksMap = useLinksMapData();

        // React.useEffect(() => {
        //     dispatch(setLinksMapDataAction(new Map<string, string>([
        //         ['Вакансии', '/vacancies']
        //     ])))
        // }, [])
        //   dispatch(setLinksMapDataAction({ 'Вакансии': '/vacancies' }));
        //  }, [])
    
        const getVacancies = async () => {
            let url = 'http://localhost:8000/vacancies'
            if (titleValue) {
                url += `?keyword=${titleValue}`
            }
            try {
                const response = await axios(url, {
                    method: 'GET',
                    withCredentials: true 
                });
                console.log("here")
                const jsonData = response.data.vacancies;
                const newArr = jsonData.map((raw: ReceivedVacancyData) => ({
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
                console.log('запрос не прошел !')
                if (titleValue) {
                    const filteredArray = mockVacancies.filter(mockVacancies => mockVacancies.title.includes(titleValue));
                    dispatch(setVacanciesAction(filteredArray));
                }
                else {
                    dispatch(setVacanciesAction(mockVacancies));
                }
            }
        };

        const postVacancyToResp = async (id: number) => {
            try {
                const response = await axios(`http://localhost:8000/vacancies/${id}/post/`, {
                    method: 'POST',
                    withCredentials: true,
                })
                const addedVacancy= {
                    id: response.data.id,
                    title: response.data.title,
                    image: response.data.image,
                    company: response.data.company,
                    salary: response.data.salary,
                    city: response.data.city,
                    exp: response.data.exp,
                    status: response.data.status
                }
                dispatch(setVacancyFromRespAction([...vacancyFromResp, addedVacancy]))
                toast.success("Вакансия успешно добавлена в отклик!");
            } catch {
                toast.error("Эта вакансия уже есть в отклике");
            }
        }
    
        const handleSearchButtonClick = () => {
            getVacancies();
        };

        const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setTitleValueAction(event.target.value));
        };
    
    
        // const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        //     event.preventDefault();
        // };
    
    return (
        <div className={styles.main_page}>
            <Header/>
            <nav aria-label="breadcrumb" style={{zIndex: '2'}}>
            <ol className="breadcrumb" style={{ marginTop: '100px' , width: '95.53vw', height: '45px',  backgroundColor: 'white'}}>
            <BreadCrumbs links={ new Map<string, string>([
        ['Вакансии', '/vacancies']
    ])}></BreadCrumbs>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "-30px"}}>
            <Form.Group controlId="name">
                <Form.Control
                type="text"
                placeholder="Введите название вакансии"
                style={{
                    backgroundColor: 'rgb(231, 230, 230)',
                    height: '30px',
                    width: '60vw',
                    fontSize: '18px',
                    border: 'none',
                    outline: 'none',
                    marginRight: '5px',
                    textAlign: 'center',
                }}
                onChange={handleTitleValueChange}
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                style={{
                color: 'white',
                backgroundColor: 'rgb(0, 102, 255)',
                border: 'none',
                height: '30px',
                fontSize: '15px',
                borderRadius: '10px',
                width: '200px',
                marginLeft: '20px',
                fontFamily: 'sans-serif',
                justifyContent: 'center', // Center the text horizontally
                alignItems: 'center', // Center the text vertically
                }}
                onClick={() => handleSearchButtonClick()}
            >
                Поиск
            </Button>
            </div>
            </ol>
            </nav>
            
            <div className={styles["hat"]}>

                    <div className={styles["cards"]}>
                        {
                        vacancies.map((vacancy: Vacancies) => (
                            <div className='card'>
                            <OneCard id={vacancy.id} image={vacancy.image} salary={Number(vacancy.salary)} title={vacancy.title} city={vacancy.city} company={vacancy.company} exp={vacancy.exp} onButtonClick={() => postVacancyToResp(vacancy.id)}></OneCard>
                            </div>
                        ))}
                    </div>
                {vacancies.length === 0 && <p className="dish-text" style={{ textAlign: "left", marginLeft: "-40vw", marginRight: "auto" }}> Такой вакансии не существует</p>}
            </div>
        </div>
     )
};
  
export default MainPage;