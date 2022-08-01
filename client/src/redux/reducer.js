import { ALL_DOGS, DOGS, DETAIL, POST, TEMPERAMENTS, ORDER_BY_WEIGHT, ORDER_SORT, FILTER_TEMPERAMENT, FILTER_CREATE } from './actions';
const incialState = {
    allDogs: [],
    dogsDetail: {},
    dogsCreated: [],
    temperaments: [],
    filtered: [],
}

export default function reducer(state = incialState, action) {
    console.log('soy reducer', state.dogsCreated);
    switch (action.type) {
        case ALL_DOGS: return {
            ...state,
            allDogs: action.payload,
            filtered: action.payload,

        }
        case DOGS: return {
            ...state,
            allDogs: action.payload
        }
        case DETAIL: return {
            ...state,
            dogsDetail: action.payload
        }
        case POST: return {
            ...state,
            dogsCreated: [...state.dogsCreated, action.payload],
        }
        case TEMPERAMENTS: return {
            ...state,
            temperaments: action.payload,
        };
        case ORDER_BY_WEIGHT:
            let order =
                action.payload === "min"
                    ? state.allDogs.sort((a, b) => {
                        console.log('min', parseInt(b !== null ? b.weight?.split("-")[0] : '60'));
                        if (
                            parseInt(a.weight[0] === "N" ? "10 - 60" : a.weight.split("-")[0]) <
                            parseInt(b.weight[0] === "N" ? "10 - 60" : b.weight.split("-")[0])
                        ) {
                            return -1; // los cambia
                        } else if (
                            parseInt(b.weight[0] === "N" ? "10 - 60" : b.weight.split("-")[0]) <
                            parseInt(a.weight[0] === "N" ? "10 - 60" : a.weight.split("-")[0])
                        ) {
                            return 1; //los cambia
                        } else {
                            return 0; //los deja igual
                        }
                    })
                    : state.allDogs.sort((a, b) => {
                        console.log('min', parseInt(b !== null ? b.weight?.split("-")[0] : '60'))
                        if (
                            parseInt(a.weight[0] === "N" ? "10 - 60" : a.weight.split("-")[0]) >
                            parseInt(b.weight[0] === "N" ? "10 - 60" : b.weight.split("-")[0])
                        ) {
                            return -1; // los cambia
                        } else if (
                            parseInt(b.weight[0] === "N" ? "10 - 60" : b.weight.split("-")[0]) >
                            parseInt(a.weight[0] === "N" ? "10 - 60" : a.weight.split("-")[0])
                        ) {
                            return 1; //los cambia
                        } else {
                            return 0; //los deja igual
                        }
                    });
            return {
                ...state,
                filtered: order,
            };
        case ORDER_SORT:
            let arr =
                action.payload === "Desc"
                    ? state.allDogs.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1; // los cambia
                        } else if (b.name.toLowerCase() > a.name.toLowerCase()) {
                            return 1; //los cambia
                        } else {
                            return 0; //los deja igual
                        }
                    })
                    : state.allDogs.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1; // los cambia
                        } else if (b.name.toLowerCase() < a.name.toLowerCase()) {
                            return 1; //los cambia
                        } else {
                            return 0; //los deja igual
                        }
                    });
            return {
                ...state,
                allDogs: arr,
            };
        case FILTER_TEMPERAMENT:
            const filter =
                action.payload === "temperament"
                    ? state.filtered
                    : state.filtered?.filter(
                        (data) => { return data.temperament ? data.temperament.find(e => e.name === action.payload) : data.temps ? data.temps.find(e => e.name === action.payload) : null });
            return {
                ...state,
                allDogs: filter,
            };
        case FILTER_CREATE:
            if (action.payload === "creados") {
                const creados = state.allDogs.length
                console.log(creados)
                if (creados > 172) {
                    return {
                        ...state,
                        allDogs: [...state.allDogs.slice(172, creados)]
                    }
                }
            }
            return {
                ...state
            }
         default: return{ 
            ...state
        }
    }
}