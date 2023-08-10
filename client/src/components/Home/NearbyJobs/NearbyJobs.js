import React from 'react';
import { useSelector } from 'react-redux';
import { BsBookmark } from 'react-icons/bs';
import './styles.css';

function NearbyJobs() {
    const jobData = useSelector(state => state.jobData.jobData);
    console.log(jobData)

    const slicedJobData = jobData?.data?.slice(0, 4); // Slice the first 4 indexes

    const getCardId = (id) => {
        console.log(id)
    }

    return (
        <div className='NearbyJobs'>
            {slicedJobData && slicedJobData.map((jobInfo, id) => (
                <div onClick={() => getCardId(id)} className='nearby-job-list'>
                    <div className='nearby-job-card'>
                        <h4 className='job-title'>{jobInfo.job_title}</h4>
                        <h4 className='employer-name'>{jobInfo.employer_name}</h4>
                        {jobInfo.job_city && jobInfo.job_state ? <h5 className='job-city'>{jobInfo.job_city}, {jobInfo.job_state}</h5> : <h5 className='job-city'>Undisclosed</h5>}
                        {jobInfo.job_min_salary && jobInfo.job_max_salary ? <h5 className='job-salary'>${jobInfo.job_min_salary} - ${jobInfo.job_max_salary}</h5> : <h5 className="job-salary">$N/A</h5>}
                    </div>
                    <button className='bookmark-icon'><BsBookmark /></button>
                </div>

            ))}
            <a href="#">Show all</a>
        </div>
    );
}

export default NearbyJobs;
