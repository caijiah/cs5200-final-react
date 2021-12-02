import React from "react";

const PetIcon = ({animal}) => {
    return (
        <>
            {
                animal === 'DOG' &&
                <div className='fa fa-dog me-1'/>
            }
            {
                animal === 'CAT' &&
                <div className='fa fa-cat me-1'/>
            }
            {
                animal === 'FISH' &&
                <div className='fa fa-fish me-1'/>
            }
            {
                animal === 'BIRD' &&
                <div className='fa fa-kiwi-bird me-1'/>
            }
        </>
    )
}

export default PetIcon