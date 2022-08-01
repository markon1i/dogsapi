import './Form.css';
import React, { useState, useEffect } from 'react';
import { createDog, getTemperament } from '../redux/actions';
import { connect } from 'react-redux';


function Create(props) {
    const [name, setName] = useState('');
    const [error, setError] = useState({});
    const [weightMin, setWeightMin] = useState('');
    const [weightMax, setWeightMax] = useState('');
    const [heightMin, setHeightMin] = useState('');
    const [heightMax, setHeightMax] = useState('');
    const [life_spanMin, setLifeSpanMin] = useState('');
    const [life_spanMax, setLifeSpanMax] = useState('');
    const [temps, setTemps] = useState([]);

    useEffect(() => {
        props.getTemperament()
    }, [])


    function validateValue(
        { name,
            weightMin,
            weightMax,
            heightMin,
            heightMax,
            life_spanMin,
            life_spanMax }
    ) {
        let errors = {};
        if (!name) {
            errors.name = "Name is required";
        } else if (!/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(name)) {
            errors.name = "Name is invalid";
        }
        if (!weightMin) {
            errors.weightMin = "weight is required";
        }
        else if (weightMin < 1) {
            errors.weightMin = "weight is invalid";
        }
        if (!heightMin) {
            errors.heightMin = "height is required";
        }
        else if (heightMin < 1) {
            errors.heightMin = "height is invalid";
        }
        if (!life_spanMin) {
            errors.life_spanMin = "life_span is required";
        }
        else if (life_spanMin < 1) {
            errors.life_spanMin = "life_span is invalid";
        }
        if (!weightMax) {
            errors.weightMax = "weight is required";
        }
        else if (weightMax < 1) {
            errors.weightMax = "weight is invalid";
        }
        if (!heightMax) {
            errors.heightMax = "height is required";
        }
        else if (heightMax < 1) {
            errors.heightMax = "height is invalid";
        }
        if (!life_spanMax) {
            errors.life_spanMax = "life_span is required";
        }
        else if (life_spanMax < 1) {
            errors.life_spanMax = "life_span is invalid";
        }
        if (parseInt(weightMin) > parseInt(weightMax)) {
            errors.weightMin = 'no puede haber un minimo mayor que el maximo'
        }
        if (parseInt(heightMin) > parseInt(heightMax)) {
            errors.heightMin = 'no puede haber un minimo mayor que el maximo'
        }
        if (parseInt(life_spanMin) > parseInt(life_spanMax)) {
            errors.life_spanMin = 'no puede haber un minimo mayor que el maximo'
        }
        return errors;
    }


    function handleSubmit(e) {
        e.preventDefault();

        let obj = {
            name,
            height: `${heightMin} - ${heightMax}`,
            weight: `${weightMin} - ${weightMax}`,
            life_span: `${life_spanMin} - ${life_spanMax}`,
            temperament: temps
        }


        if (Object.keys(error).length > 0) {
            return alert("No se pudo crear el perro");
        } else {
            setName('')
            setWeightMin('')
            setWeightMax('')
            setHeightMin('')
            setHeightMax('')
            setLifeSpanMin('')
            setLifeSpanMax('')
            setTemps([])
            props.createDog(obj);
            return alert("Perro Creado");
        }

    }

    function handleSelect(value) {
        value.preventDefault();
        const set = new Set([...temps ? new Set(temps) : null, value.target.value])
        setTemps([...set]);
    }

    function deleteTemp(t) {
        setTemps(temps.filter((c) => c !== t.target.name));
        //console.log(temps);
    };



    return (
        <div className='create'>
            <form className='form' onSubmit={handleSubmit} onChange={() => setError(
                validateValue({ name, weightMin, weightMax, heightMin, heightMax, life_spanMin, life_spanMax })
            )}>
                <h1 className='newDog'>Create new dog</h1>
                Name:
                <label a="name" >
                    <input id='name' className={error && 'danger'} name='name' type="text" placeholder='name' value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' required />
                    {error.name && <p>{error.name}</p>}
                </label>
                Weight:
                <label a='weight-min' >
                    <input id='weight-min' name='weight-min' type="number" placeholder='weight-min' value={weightMin} onChange={(e) => setWeightMin(e.target.value)} required />
                    {error.weightMin && <p>{error.weightMin}</p>}
                </label>
                <label a='weight-max' >
                    <input id='weight-max' name='weight-max' type="number" placeholder='weight-max' value={weightMax} onChange={(e) => setWeightMax(e.target.value)} required />
                    {error.weightMax && <p>{error.weightMax}</p>}
                </label>
                Height:
                <label a='height-min'>
                    <input id='height-min' name='height-min' type='number' placeholder='height-min' value={heightMin} onChange={(e) => setHeightMin(e.target.value)} required />
                    {error.heightMin && <p>{error.heightMin}</p>}
                </label>
                <label a='height-max'>
                    <input id='height-max' name='height-max' type='number' placeholder='height-max' value={heightMax} onChange={(e) => setHeightMax(e.target.value)} required />
                    {error.heightMax && <p>{error.heightMax}</p>}
                </label>
                Life_span:
                <label a='life_span-min'>
                    <input id='life_span-min' name='life_span-min' type='number' placeholder='life_span-min' value={life_spanMin} onChange={(e) => setLifeSpanMin(e.target.value)} required />
                    {error.life_spanMin && <p>{error.life_spanMin}</p>}
                </label>
                <label a='life_span-max'>
                    <input id='life_span-max' name='life_span-max' type='number' placeholder='life_span-max' value={life_spanMax} onChange={(e) => setLifeSpanMax(e.target.value)} required />
                    {error.life_spanMax && <p>{error.life_spanMax}</p>}
                </label>
                Temperaments:
                <label a='temperament'>
                    <select className="temperament" name='temperament' multiple onChange={(value) => handleSelect(value)}>
                        {props.temperaments.map((temp) => (<option key={temp.id} value={temp.name} >{temp.name}</option>))}
                    </select>
                </label>
                <input className='createActivity' type='submit' value='Create Dog' />
                <div className="temperament">
                    <ul>
                        {temps.map((el) => {
                            return (
                                <div className="CountriesList" key={el}>
                                    <span className="lista">
                                        {el}
                                        <button
                                            key={el}
                                            name={el}
                                            className="closeButton"
                                            onClick={(e) => {
                                                deleteTemp(e);
                                            }}
                                        >
                                            ❌
                                        </button>
                                    </span>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </form>
        </div >
    )

}

function mapDispatchToProps(dispatch) {
    return {
        createDog: (obj) => dispatch(createDog(obj)),
        getTemperament: () => dispatch(getTemperament())
    }
}

function mapStateToProps(state) {
    return {
        temperaments: state.temperaments
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Create);