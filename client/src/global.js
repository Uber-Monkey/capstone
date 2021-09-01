import React from 'react'

const myvars = React.createContext({});
myvars.searchValue = localStorage.getItem('searchValue');
myvars.movieID = localStorage.getItem('movieID');

export const searchValue = myvars.searchValue;
export const movieID = myvars.movieID;

export default myvars;