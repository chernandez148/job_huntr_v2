import React from 'react'
import loadingScreen from '../../assets/loading_screen.gif'
import "./styles.css"

function IsLoading() {
    return (
        <div className='IsLoading'>
            <h4>Please wait...</h4>
            <img src={loadingScreen} width="300px" />
        </div>
    )
}

export default IsLoading