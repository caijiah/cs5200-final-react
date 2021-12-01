import React from 'react'

const AddressProfile = ({profileInfo, updateAddress}) => {
    return (
        <>
            <br/>
            <div className='mb-3 row'>
                <h4>Delivery Address</h4>
            </div>

            <div className="mb-3 row">
                <label htmlFor="UserAddressLineOne" className="col-sm-2 col-form-label">Address Line
                    1</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="UserAddressLineOne"
                           value={profileInfo.deliveryAddress.addressLineOne}
                           onChange={(e) =>
                               updateAddress({addressLineOne: e.target.value})}
                           placeholder="Example: xxx st"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="UserAddressLineTwo" className="col-sm-2 col-form-label">Address Line
                    2</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="UserAddressLineTwo"
                           value={profileInfo.deliveryAddress.addressLineTwo}
                           onChange={(e) =>
                               updateAddress({addressLineTwo: e.target.value})}
                           placeholder="Example: xxx st"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="UserCity" className="col-sm-2 col-form-label">City
                </label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="UserCity"
                           value={profileInfo.deliveryAddress.city}
                           onChange={(e) =>
                               updateAddress({city: e.target.value})}
                           placeholder="Example: Boston"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="UserState" className="col-sm-2 col-form-label">State
                </label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="UserState"
                           value={profileInfo.deliveryAddress.state}
                           onChange={(e) =>
                               updateAddress({state: e.target.value})}
                           placeholder="Example: MA"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="UserPostalCode" className="col-sm-2 col-form-label">Postal Code
                </label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="UserPostalCode"
                           value={profileInfo.deliveryAddress.postalCode}
                           onChange={(e) =>
                               updateAddress({postalCode: e.target.value})}
                           placeholder="Example: 02115"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="UserCountry" className="col-sm-2 col-form-label">Country
                </label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="UserCountry"
                           value={profileInfo.deliveryAddress.country}
                           onChange={(e) =>
                               updateAddress({country: e.target.value})}
                           placeholder="Example: USA"/>
                </div>
            </div>
        </>
    )
}

export default AddressProfile