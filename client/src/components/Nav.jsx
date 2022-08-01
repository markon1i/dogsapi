import './Nav.css';
import React from 'react';
import { connect } from 'react-redux';
import { getDogs } from '../redux/actions';
import { Link } from 'react-router-dom';


function Nav(props) {


    function onChange(event) {
        event.preventDefault();
        const name = document.querySelector('input[name="search"]').value
        props.getDogs(name);

    }





    return (
        <nav className='Nav'>
            <Link to='/'>
                <img className='Lg' src='https://cdn-icons-png.flaticon.com/512/1076/1076826.png' alt='not icons' />
            </Link>
            <div className='Btn' >
                <a href='/home' className='Btn'>Home
                </a>
            </div>
            <div className='Search'>
                <input type='search' name='search' className='Search' placeholder='search dogs' autoComplete='off' onChange={onChange}></input>
            </div>
            <div className='Create'>
                <Link to='/home/create' className='link'>Create Dogs
                </Link>
            </div>
        </nav>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getDogs: (name) => dispatch(getDogs(name)),

    }
}

function mapStateToProps(state) {
    return {
        allDogs: state.allDogs,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)