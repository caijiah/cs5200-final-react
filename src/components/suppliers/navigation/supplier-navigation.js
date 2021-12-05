import React from "react"
import {Link} from "react-router-dom"

const SupplierNavigation = () => {
    return (
        <div className='mb-3 row'>
            <h5 className='col-2'>Inventory</h5>
            <div className="d-grid col-10">
                <Link
                    to={`/inventory`}
                    className="btn btn-success btn-block"
                >
                    Manage Products </Link>
            </div>
        </div>
    )
}

export default SupplierNavigation