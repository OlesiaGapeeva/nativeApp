import { configureStore } from '@reduxjs/toolkit';
import datareducer from './deviceSlice';

export const store = configureStore({ reducer: { vacancy: datareducer } });