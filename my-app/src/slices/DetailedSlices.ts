import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


interface VacancyData {
  id: number,
  title: string,
  adress?: string |null,
  time: string,
  salary: number,
  company: string,
  city?: string | null,
  exp: string,
  image?: string | null,
  info?: string,
  status: string
}

interface DataState {
  vacancy: VacancyData,
  LinksMapData: Map<string, string>
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    vacancy: {},
    LinksMapData: new Map<string, string>([['Вакансии', '/vacancies']])
  } as DataState,
  reducers: {
    setVacancy(state, action: PayloadAction<VacancyData>) {
        state.vacancy = action.payload
    },
    setLinksMapData(state, action: PayloadAction<Map<string, string>>) {
      console.log(action.payload)
      state.LinksMapData = action.payload
  },
  },
});

export const useVacancy = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.vacancy);

export const useLinksMapData = () =>
  useSelector((state: { detailedData: DataState }) => state.detailedData.LinksMapData);

export const {
    setVacancy: setVacancyAction,
    setLinksMapData: setLinksMapDataAction
} = dataSlice.actions;

export default dataSlice.reducer;