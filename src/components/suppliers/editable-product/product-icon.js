import React from "react";

const ProductIcon = ({category}) => {
    return (
        <>
            {
                category === 'FOOD' &&
                <div className='fa fa-utensils me-1'/>
            }
            {
                category === 'TOY' &&
                <div className='fa fa-baseball-ball me-1'/>
            }
            {
                category === 'TREAT' &&
                <div className='fa fa-bone me-1'/>
            }
            {
                category === 'MEDICINE' &&
                <div className='fa fa-pills me-1'/>
            }
        </>
    )
}

export default ProductIcon