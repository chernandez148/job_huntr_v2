import React from 'react'
import { AiOutlineCopyright } from 'react-icons/ai'
import './styles.css'

function Footer() {
    return (
        <div className='Footer'>
            <div className='footer-navbar'>
                <div className="footer-navbar-left">
                    <a href="#">About</a>
                    <a href="#">Help Center</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Private Privacy</a>
                    <a href="#">Terms of Use</a>
                </div>
                <div className='copyright'>
                    <span><AiOutlineCopyright /> 2023 Job Huntr</span>
                </div>
            </div>
        </div>
    )
}

export default Footer