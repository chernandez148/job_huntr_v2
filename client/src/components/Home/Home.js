import React from 'react'
import shield from '../../assets/antivirus.png'
import resume from '../../assets/resume.png'
import bookmark from '../../assets/bookmark.jpg'
import filter from '../../assets/filter.png'
import NearbyJobs from './NearbyJobs/NearbyJobs'
import RemoteOppertunities from './RemoteOppertunities/RemoteOppertunities'
import SavedJobs from './SavedJobs/SavedJobs'
import RecentSearches from './RecentSearches/RecentSearches'
import { BsBookmarkFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { MdOutlineAppsOutage } from 'react-icons/md';
import appLogo from '../../assets/app-logo.png'
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
                    <div className='nearby-jobs'>
                        <h4>Nearby Jobs</h4>
                        <p>Find jobs around your area</p>
                        <NearbyJobs />
                    </div>
                    <div className='remote-oppertunities'>
                        <h4>Remote Oppertunities</h4>
                        <RemoteOppertunities />
                    </div>

                </div>
                <div className='user-feed'>
                    <div className='recent-search'>
                        <div className='recent-search-header-wrapper'>
                            <FaHistory />
                            <h4>Recent</h4>
                        </div>
                        <p>View your recent searches</p>
                        <RecentSearches />
                    </div>
                    <div className='saved-jobs'>
                        <div className='saved-job-header-wrapper'>
                            <BsBookmarkFill />
                            <h4>My Items</h4>
                        </div>
                        <p>View your most recent saved jobs</p>
                        <SavedJobs />
                    </div>
                    <div className='job-huntr-app'>
                        <div className='job-huntr-app-wrapper'>
                            <MdOutlineAppsOutage />
                            <h4>Check out our app!</h4>
                        </div>
                        <p>Commin soon.</p>
                        <div className='app-container'>
                            <p>Search for jobs on the go, don't forget to doownload our app. <br /> Out soon!</p>
                            <div className='app-wrapper'>
                                <div className='app-title'>
                                    <h4>Comming Fall 2023</h4>
                                    <p>on both Android and IOS</p>
                                </div>
                                <img src={appLogo} width="200px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home