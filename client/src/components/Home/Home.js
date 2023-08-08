import React from 'react'
import shield from '../../assets/antivirus.png'
import resume from '../../assets/resume.png'
import './styles.css'

function Home() {
    return (
        <div className='Home'>
            <div className='saftey-tips'>
                <h5>Stay safe when searching</h5>
                <div className='saftey-tips-wrapper'>
                    <div className='saftey-tip-card'>
                        <div className='saftey-tip-card-wrapper'>
                            <div className='saftey-text'>
                                <p>Stay safe from fraudalent activity when applying</p>
                                <span>Read more</span>
                            </div>
                            <img src={shield} width="40px" height="40px" />
                        </div>
                    </div>
                    <div className='saftey-tip-card'>
                        <div className='saftey-tip-card-wrapper'>
                            <div className='saftey-text'>
                                <p>Need help improving your resume?</p>
                                <span>Read more</span>
                            </div>
                            <img src={resume} width="40px" height="40px" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='job-info'>
                <div className='job-feed'>
                    <h3>Job Feed</h3>
                </div>
                <div className='job-desc'>
                    <h3>Job Description</h3>
                </div>
            </div>
        </div>
    )
}

export default Home