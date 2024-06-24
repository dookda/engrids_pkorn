import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CbLayer = ({ lyrName, onCheckboxChange }: any) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleChecked = (e: any) => {
        setIsChecked(e.target.checked)
        onCheckboxChange(e.target.checked, lyrName);
    }

    return (
        <div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChecked}
                    id="flexCheckDefault" />
                <label className="form-check-label" >
                    {lyrName}
                </label>
            </div>
        </div>
    )
}

CbLayer.propTypes = {
    lyrName: PropTypes.string.isRequired,
    onCheckboxChange: PropTypes.func.isRequired
}

export default CbLayer