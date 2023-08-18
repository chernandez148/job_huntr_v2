import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setNewFavoriteJobData } from '../../../redux/slices/newFavoriteJobData';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import './styles.css';

function NearbyJobs() {
    const jobData = useSelector(state => state.jobData.jobData);
    const newFavoriteJobData = useSelector(state => state.newFavoriteJobData.newFavoriteJobData);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const slicedJobData = jobData?.data?.slice(0, 4); // Slice the first 4 indexes

    const handleFavorites = async (jobInfo) => {
        console.log("Sending POST request to favorites API...");
        const favoritesUrl = "http://127.0.0.1:5000/favorites";

        if (!user) {
            alert("Must be signed in to bookmark a job.");
            return;
        }

        try {
            const user_id = user.id;
            const response = await fetch(favoritesUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    job_id: jobInfo.job_id,  // Use the job_id from jobInfo
                    user_id,
                    job_title: jobInfo.job_title,
                    employer_name: jobInfo.employer_name,
                    job_city: jobInfo.job_city,
                    job_state: jobInfo.job_state,
                    job_min_salary: jobInfo.job_min_salary,
                    job_max_salary: jobInfo.job_max_salary,
                    job_employment_type: jobInfo.job_employment_type,
                    job_apply_link: jobInfo.job_apply_link,
                    job_description: jobInfo.job_description
                }),
            });

            if (response.ok) {
                // Successfully added to favorites
                const newFavorite = await response.json();
                // Update the newFavoriteJobData state with the newFavorite before checking
                dispatch(setNewFavoriteJobData([...newFavoriteJobData, newFavorite]));
                console.log("Job added to favorites.");
            } else {
                // Handle the case where the server responded with an error
                console.error("Failed to add job to favorites.");
            }
        } catch (error) {
            // Handle network errors
            console.error("An error occurred while adding to favorites:", error);
        }
    };

    const getCardId = (id) => {
        console.log(id)
    }

    const isJobFavorited = (jobId) => {
        return user &&
            (user.favorited_jobs?.some(userItem => userItem.job_id === jobId) ||
                newFavoriteJobData?.some(newItem => newItem.job_id === jobId));
    };

    return (
        <div className='NearbyJobs'>
            {slicedJobData && slicedJobData.map((jobInfo, id) => (
                <div onClick={() => getCardId(id)} className='nearby-job-list' key={id}>
                    <div className='nearby-job-card'>
                        <h4 className='job-title'>{jobInfo.job_title}</h4>
                        <h4 className='employer-name'>{jobInfo.employer_name}</h4>
                        {jobInfo.job_city && jobInfo.job_state ? <h5 className='job-city'>{jobInfo.job_city}, {jobInfo.job_state}</h5> : <h5 className='job-city'>Undisclosed</h5>}
                        {jobInfo.job_min_salary && jobInfo.job_max_salary ? <h5 className='job-salary'>${jobInfo.job_min_salary} - ${jobInfo.job_max_salary}</h5> : <h5 className="job-salary">$N/A</h5>}
                    </div>
                    <button onClick={() => handleFavorites(jobInfo)} className='bookmark-btn'>
                        {isJobFavorited(jobInfo.job_id) ? <BsBookmarkFill /> : <BsBookmark />}
                    </button>
                </div>
            ))}
            <a href="#">Show all</a>
        </div>
    );
}

export default NearbyJobs;
