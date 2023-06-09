import { createSlice } from '@reduxjs/toolkit';

const singleClassHeaderConfig = [
  {
    name: 'My class',
    button: false,
    path: '/',
    icon: 'fa-solid fa-people-roof',
  },
  {
    name: 'Add || join',
    button: true,
    onclick: '',
  },
  {
    name: 'Meet Up',
    button: false,
    path: '/meetup',
    icon: 'fa-solid fa-video',
  },
];

const headerSlice = createSlice({
  name: 'header',
  initialState: {
    singleClass: singleClassHeaderConfig,
  },
});
