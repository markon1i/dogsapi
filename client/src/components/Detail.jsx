import { connect } from "react-redux";
import React, { useEffect } from 'react';
import { getDetail } from '../redux/actions';
import './Detail.css';


function Detail(props) {
    console.log(props.match.params.id)
    useEffect(() => { props.getDetail(props.match.params.id) }, []);
    //console.log('soy detail', props.dogsDetail);
    return (
        <div className="detail">
            <div className="h-detail">
                <h1 className="name">{props.dogsDetail.name}</h1>
                <img alt="imagen de perro" className="img-detail" src={props.dogsDetail.image ? props.dogsDetail.image.url.split('/').includes('undefined.jpg') ? 'https://media.istockphoto.com/photos/its-a-paddle-board-time-picture-id1327654972?k=20&m=1327654972&s=612x612&w=0&h=L0r3VLi62WI75JKi4-Uj4GaZLRgQtjxMRTipr5Zls2E=' : props.dogsDetail.image.url : 'https://media.istockphoto.com/photos/its-a-paddle-board-time-picture-id1327654972?k=20&m=1327654972&s=612x612&w=0&h=L0r3VLi62WI75JKi4-Uj4GaZLRgQtjxMRTipr5Zls2E='}></img>
                <h4 className="h-cardW">Weight: {props.dogsDetail?.weight?.metric ? props.dogsDetail.weight.metric : props.dogsDetail?.weight} Kg.</h4>
                <h4 className="h-cardH">Height: {props.dogsDetail?.height?.metric ? props.dogsDetail.height.metric : props.dogsDetail?.height} Cm.</h4>
                <h4 className="h-card3">Life_span: {props.dogsDetail.life_span}</h4>
                <h4 className="h-cardT">Temperaments:    <ul className="ul-T">{Array.isArray(props.dogsDetail.temperament) ? props.dogsDetail.temperament.map(t => <li key={t} className='li-T'>
                    {t}</li>
                ) : props.dogsDetail.temperament?.split(', ').map(t => <li key={t} className='li-T'>{t.toLowerCase()}</li>)}</ul>
                </h4>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getDetail: (id) => dispatch(getDetail(id))
    }
}

function mapStateToProps(state) {
    return {
        dogsDetail: state.dogsDetail
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);