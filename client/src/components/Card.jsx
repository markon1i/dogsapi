import React from "react";
import { Link } from "react-router-dom";
import './Card.css';


export default function Card(props) {


    return (
        <Link to={`/home/detail/${props.id}`} className='text-decoration' >
            <div className="Card">
                <img alt="imagen de perro" className="img-card" src={props.image ? props.image.split('/').includes('undefined.jpg') ? 'https://media.istockphoto.com/photos/its-a-paddle-board-time-picture-id1327654972?k=20&m=1327654972&s=612x612&w=0&h=L0r3VLi62WI75JKi4-Uj4GaZLRgQtjxMRTipr5Zls2E=' : props.image : 'https://media.istockphoto.com/photos/its-a-paddle-board-time-picture-id1327654972?k=20&m=1327654972&s=612x612&w=0&h=L0r3VLi62WI75JKi4-Uj4GaZLRgQtjxMRTipr5Zls2E='}></img>
                <div className="h-card">
                    <h2>{props.name}</h2>
                    <h3>Weight: {props.weight} Kg.</h3>
                    <h4 className="h-card h4">temperaments:
                        <ul className="ul-temperament">{Array.isArray(props.temperament) ? props.temperament.map(t => <li key={t.id} className='li'>
                            {t.name}</li>
                        ) : props?.temperament?.split(', ').map(t => <li key={t} className='li'>{t.toLowerCase()}</li>)}</ul>
                    </h4>
                </div>
            </div>
        </Link>
    )
}
