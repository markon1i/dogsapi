import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    orderSort,
    orderByWeight,
    filterByTemperament,
    filterCreate
} from "../redux/actions";
import './Filter.css';


export default function Filter({ setOrder }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleSort = (e) => {
        e.preventDefault();
        dispatch(orderSort(e.target.value));
        setOrder(`Order ${e.target.value}`);
    };

    const handlerOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setOrder(`Order ${e.target.value}`);
    };

    const allTemperament = useSelector((state) => state.temperaments);


    function handleFilterByTemperament(e) {
        e.preventDefault();
        setName(e.target.value);
        dispatch(filterByTemperament(e.target.value));
    }

    function handleCreateOrder(e) {
        e.preventDefault();
        dispatch(filterCreate(e.target.value))

    }


    useEffect(() => {
        setOrder("Ordenado");
    }, [handleSort, handlerOrderByWeight]);

    return (
        <div className="filter-container">
            <select className="order-weight"
                defaultValue={"DEFAULT"}
                onChange={(e) => handlerOrderByWeight(e)}
            >
                <option value="DEFAULT">Ordenar Por Peso </option>
                <option value="min">Menor Peso</option>
                <option value="max">Mayor Peso</option>
            </select>
            <select className="order-alf" defaultValue={"DEFAULT"} onChange={(e) => handleSort(e)}>
                <option value="DEFAULT">Ordenar Alfabeticamente</option>
                <option value="Asc">A-Z</option>
                <option value="Desc">Z-A</option>
            </select>
            <select
                className="order-temp"
                id="btn-order"
                value="temperament"
                onChange={(e) => handleFilterByTemperament(e)}
            >
                <option className="order_option" >Temperamentos: {name}</option>
                {allTemperament &&
                    allTemperament.map((el) => (
                        <option className="order_option" value={el.name} key={el.id}>
                            {el.name}
                        </option>
                    ))}
            </select>
            <select className='order-create' defaultValue={'DEFAULT'} onChange={(e) => handleCreateOrder(e)}>
                <option value="DEFAULT">filtrar los creados</option>
                <option className="order_create" value='creados'>Creados</option>
            </select>
            <a href="/home">
                <button  className="buttonAllDogs">Reload</button>
            </a>
        </div>
    );
}