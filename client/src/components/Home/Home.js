import React from 'react'
import shield from '../../assets/antivirus.png'
import resume from '../../assets/resume.png'
import bookmark from '../../assets/bookmark.jpg'
import filter from '../../assets/filter.png'
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
                                <p>Stay safe from fraudalent posts when applying</p>
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
                    <div className='saftey-tip-card'>
                        <div className='saftey-tip-card-wrapper'>
                            <div className='saftey-text'>
                                <p>Never lose a job posting, use the bookmark</p>
                                <span>Read more</span>
                            </div>
                            <img src={bookmark} width="60px" height="60px" />
                        </div>
                    </div>
                    <div className='saftey-tip-card'>
                        <div className='saftey-tip-card-wrapper'>
                            <div className='saftey-text'>
                                <p>Use the filter option for specific searches</p>
                                <span>Read more</span>
                            </div>
                            <img src={filter} width="40px" height="40px" />
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