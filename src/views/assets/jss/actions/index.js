import { GET_PART, GET_PART_PN, SHOW_PART } from './types'
import axios from 'axios'

export function fetchPart(brand, modle, part_name) {
  return function (dispatch) {
    axios
      .get(
        `https://anjinz-api.vercel.app/api/parts?brand=${brand}&modle=${modle}&part_name=${part_name}`,
      )
      .then(response => {
        //console.log('Data @ GET_PART :: ', response.data)
        dispatch({
          type: GET_PART,
          payload: response.data,
        })
      })
      .catch(err => {
        console.log('Error in GET_PART :: ', err)
      })
  }
}

export function fetchPart_PN(part_number) {
  return function (dispatch) {
    axios
      .get(`https://anjinz-api.vercel.app/api/parts?part_number=${part_number}`)
      .then(response => {
        //console.log('Data @ GET_PART :: ', response.data.map(part => part._id))
        dispatch({
          type: GET_PART_PN,
          payload: response.data,
        })
      })
      .catch(err => {
        console.log('Error in GET_PART_PN :: ', err)
      })
  }
}

export function showPart() {
  return function (dispatch) {
    dispatch({ type: SHOW_PART })
  }
}
