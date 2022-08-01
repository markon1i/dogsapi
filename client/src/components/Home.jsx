import React, { useEffect, useState } from "react";
import Pagination from './Pag'
import { connect } from 'react-redux';
import { getAllDogs, getTemperament } from '../redux/actions'
import Filter from './Filter'
import './Home.css';


function mapStateToProps(state) {
    return {
        allDogs: state.allDogs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllDogs: () => dispatch(getAllDogs()),
        getTemperament: () => dispatch(getTemperament()),
    }
}

function Home(props) {
    useEffect(() => {
        props.getAllDogs()
        props.getTemperament()
    }, [])
    const [order, setOrder] = useState("");
    const ITEMS_PER_PAGE = 8;
    const length = props.allDogs.length;
    const dogs = [...props.allDogs].splice(0, ITEMS_PER_PAGE)
    const [items, setItems] = useState([...dogs]);
    const [currentPage, setCurrentPage] = useState(0);
    const nextHandler = () => {
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * ITEMS_PER_PAGE;
        const filteres = nextPage * dogs.length;
        console.log('soy filt', filteres);
        console.log('soy length', length);


        if (firstIndex === 176 || filteres === length) return;

        setItems([...props.allDogs].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(nextPage);
    }

    const first = () => {
        setItems([...props.allDogs].splice(0, ITEMS_PER_PAGE))
        setCurrentPage(0)
    }
    const ultimate = () => {
        setItems([...props.allDogs].splice(168, ITEMS_PER_PAGE))
        setCurrentPage(21)
    }
    const prevHandler = () => {
        const prevPage = currentPage - 1;

        if (prevPage < 0) return;
        const firstIndex = prevPage * ITEMS_PER_PAGE;
        setItems([...props.allDogs].splice(firstIndex, ITEMS_PER_PAGE));
        setCurrentPage(prevPage);
    }


    return (
        <div className='home-container'>
            <Filter setOrder={setOrder} />
            <Pagination prevHandler={prevHandler} nextHandler={nextHandler} items={items.length === 0 ? dogs : items} currentPage={currentPage} first={first} ultimate={ultimate} />
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);   