import axios from 'axios';
export const ALL_DOGS = 'ALL_DOGS';
export const DOGS = 'DOGS';
export const DETAIL = 'DETAIL';
export const POST = 'POST';
export const TEMPERAMENTS = 'TEMPERAMENTS';
export const ORDER_BY_WEIGHT = 'ORDER_BY_WEIGHT';
export const ORDER_SORT = 'ORDER_SORT';
export const FILTER_TEMPERAMENT = 'FILTER_TEMPERAMENT';
export const FILTER_CREATE = 'FILTER_CREATE';

export function getAllDogs() {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/dogs')
        //console.log('soy action', json.data);
        return dispatch({ type: ALL_DOGS, payload: json.data })
    }
}

export function getDogs(name) {
    return async function (dispatch) {
        const dog = (await axios.get(`http://localhost:3001/dogs?name=${name}`)).data
        //console.log('soy action', dog);
        return dispatch({ type: DOGS, payload: dog })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        const detail = (await axios.get(`http://localhost:3001/dogs/${id}`)).data
        console.log('soy action', detail)
        return dispatch({ type: DETAIL, payload: detail })
    }
}

export function createDog(obj) {
    return async function (dispatch) {
        const post = (await axios.post('http://localhost:3001/dogs', obj)).data
        console.log('soy action', post);
        return dispatch({ type: POST, payload: post })
    }
}

export function getTemperament() {
    return async (dispatch) => {
        let json = (await axios.get("http://localhost:3001/temperaments")).data;
        return dispatch({
            type: TEMPERAMENTS,
            payload: json,
        });
    };
}

export function orderSort(payload) {
    return {
        type: ORDER_SORT,
        payload,
    };
}

export function orderByWeight(payload) {
    return {
        type: ORDER_BY_WEIGHT,
        payload,
    };
}

export function filterByTemperament(payload) {
    /* console.log(payload); */
    return {
        type: FILTER_TEMPERAMENT,
        payload,
    };
}

export function filterCreate(payload) {
    return {
        type: FILTER_CREATE,
        payload
    }
}
