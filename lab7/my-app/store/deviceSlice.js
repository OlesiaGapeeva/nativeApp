import { createSlice } from "@reduxjs/toolkit";
import { useSelector, shallowEqual } from "react-redux";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    titleValue: "",
    vacancies: [],
    vacancy: {},
  },
  reducers: {
    setTitleValue(state, action) {
      state.titleValue = action.payload;
    },
    setVacancies(state, action) {
      state.vacancies = action.payload;
      console.log(state.vacancies)
    },
  },
});

export const useTitleValue = () =>
  useSelector((state) => state.data.titleValue, shallowEqual);

export const useVacancies = () =>
  useSelector((state) => state.vacancies, shallowEqual);

export const { setTitleValue: setTitleValueAction, setVacancies: setVacanciesAction } =
  dataSlice.actions;

export default dataSlice.reducer;
