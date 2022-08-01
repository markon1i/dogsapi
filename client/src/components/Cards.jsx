import React from "react";
import Card from "./Card";
import Loading from "./Loading";
import './Cards.css';

export default function Cards(props) {
    console.log('soy cards', props.allDogs)

    return (
        <div className="card-container">
            {
                props.allDogs.length > 0 ? (
                    props.allDogs?.map((dog) => (
                        <div key={dog?.id}>
                            <Card name={dog?.name} height={dog?.height} weight={dog?.weight} image={dog.image?dog.image:null}
                                temperament={dog?.temperament || dog?.temps} id={dog?.id} />
                        </div>
                    ))
                ) : (
                    <Loading />
                )}
        </div>
    );
}