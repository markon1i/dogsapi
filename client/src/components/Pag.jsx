import React from "react";
import Cards from "./Cards";
import './Pag.css';

export default function Pagination(props) {
    console.log(props.items)
    return (
        <div className="pagination">
            <nav className="btns">
            <button className="first" onClick={props.first}>First Page</button>
            <button className="prev" onClick={props.prevHandler}>Prev</button>
            <h1 className="current">Page {props.currentPage}</h1>
            <button className="next" onClick={props.nextHandler}>Next</button>
            <button className="last" onClick={props.ultimate}>Last Page</button>
            </nav>
            <Cards allDogs={props.items} />

        </div>
    )
}