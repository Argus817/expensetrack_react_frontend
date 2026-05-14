import React from 'react'
import '../assets/loadingspinner.css'

const LoadingSpinner = () => {
    return (
        <div className='loading-overlay bg-secondary bg-opacity-50'>
            <div id="loadingSpinner" className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner
