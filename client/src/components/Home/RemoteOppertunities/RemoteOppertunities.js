import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading } from '../../../redux/slices/isLoading';
import { setSearchedJobData } from '../../../redux/slices/searchedJobData';
import { useNavigate } from 'react-router-dom';
import { BsBookmark } from 'react-icons/bs';
import axios from 'axios';
import './styles.css';

function RemoteOpportunities() {
    const remoteJobData = useSelector(state => state.remoteJobData.remoteJobData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(remoteJobData)

    const slicedJobData = remoteJobData?.data?.slice(0, 4); // Slice the first 4 indexes

    const getCardId = (id) => {
        console.log(id)
    }

    const handleRemoteSearch = async (jobInfo) => {
        dispatch(setIsLoading(true))
        if (jobInfo) {
            const options = {
                method: "GET",
                url: "https://jsearch.p.rapidapi.com/search",
                params: {
                    query: `remote jobs in USA`,
                },
                headers: {
                    'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
                    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
                },
            }
            try {
                const response = await axios.request(options);
                dispatch(setSearchedJobData(response.data))
                dispatch(setIsLoading(false))
                console.log(false)
                navigate('/search_results')
            } catch (error) {
                console.error(error)
            }
        } else {
            console.log('Please enter both job search and location.');
        }
    }

    return (
        <div className='RemoteOpportunities'>
            {slicedJobData && slicedJobData.map((jobInfo, id) => (
                <div onClick={() => getCardId(id)} className='remote-opportunity-job-list'>
                    <div className='remote-opportunity-job-card'>
                        <h4 className='job-title'>{jobInfo.job_title}</h4>
                        <h4 className='employer-name'>{jobInfo.employer_name}</h4>
                        {jobInfo.job_city && jobInfo.job_state ? <h5 className='job-city'>{jobInfo.job_city}, {jobInfo.job_state}</h5> : <h5 className='job-city'>{jobInfo.job_is_remote ? "Remote" : "Undisclosed"}</h5>}
                        {jobInfo.job_min_salary && jobInfo.job_max_salary ? <h5 className='job-salary'>${jobInfo.job_min_salary} - ${jobInfo.job_max_salary}</h5> : <h5 className="job-salary">$N/A</h5>}
                    </div>
                    <button className='bookmark-icon'><BsBookmark /></button>
                </div>

            ))}
            <button className='showAllBtn' onClick={handleRemoteSearch}>Show all</button>
        </div>
    );
}

export default RemoteOpportunities;
