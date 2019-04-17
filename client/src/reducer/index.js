
import { combineReducers } from 'redux';
import getList from './getList';
import chooseStore from './chooseStore';
import allData from './allData';



export default combineReducers({
getList: getList,
chooseStore: chooseStore,
allData: allData,
})

