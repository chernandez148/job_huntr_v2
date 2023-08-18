import React from 'react';
import { useSelector } from 'react-redux';
import { BsBookmarkFill } from 'react-icons/bs';
import './styles.css';

function SavedJobs() {
    const newFavoriteJobData = useSelector(state => state.newFavoriteJobData.newFavoriteJobData);
    const user = useSelector(state => state.user.user);

    const favoritedJobs = user && Array.isArray(user.favorited_jobs)
        ? [...user.favorited_jobs, ...newFavoriteJobData]
        : [...newFavoriteJobData];

    const slicedFavoritedJobs = favoritedJobs?.slice(-4);
    return (
        <div className='SavedJobs'>
            {user ? (
                <>
                    <>
                        {slicedFavoritedJobs ?
                            <>
                                {slicedFavoritedJobs.map(favoritedItem => (
                                    <div className='nearby-job-list'>
                                        <div className='nearby-job-card'>
                                            <h4 className='job-title'>{favoritedItem.job_title}</h4>
                                            <h4 className='employer-name'>{favoritedItem.employer_name}</h4>
                                            {favoritedItem.job_city && favoritedItem.job_state ? <h5 className='job-city'>{favoritedItem.job_city}, {favoritedItem.job_state}</h5> : <h5 className='job-city'>Undisclosed</h5>}
                                            {favoritedItem.job_min_salary && favoritedItem.job_max_salary ? <h5 className='job-salary'>${favoritedItem.job_min_salary} - ${favoritedItem.job_max_salary}</h5> : <h5 className="job-salary">$N/A</h5>}
                                        </div>
                                        <button className='bookmark-icon'><BsBookmarkFill /></button>
                                    </div>
                                ))}
                            </>
                            :
                            <h4>You have no saved jobs.</h4>
                        }
                    </>
                    <h4></h4>
                </>



            ) : (
                <h4>Must sign in to view saved jobs</h4>
            )}
        </div>
    );
}

export default SavedJobs;
