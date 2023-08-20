import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSliceIndex } from '../../redux/slices/sliceIndex';
import { setSelectedIndex } from '../../redux/slices/selectedIndex';
import { setNewFavoriteJobData } from '../../redux/slices/newFavoriteJobData'
import { setToggleDisplayCard } from '../../redux/slices/toggleDisplayCard';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { PiSuitcaseSimpleLight } from 'react-icons/pi';
import './styles.css';

function SearchResults() {
    const searchedJobData = useSelector(state => state.searchedJobData.searchedJobData);
    const newFavoriteJobData = useSelector(state => state.newFavoriteJobData.newFavoriteJobData);
    const sliceIndex = useSelector(state => state.sliceIndex.sliceIndex);
    const selectedIndex = useSelector(state => state.selectedIndex.selectedIndex);
    const toggleDisplayCard = useSelector(state => state.toggleDisplayCard.toggleDisplayCard);
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(toggleDisplayCard)

    const slicedSearchedJobData = searchedJobData?.data?.slice(0, sliceIndex);

    useEffect(() => {
        if (Object.keys(searchedJobData).length === 0 && searchedJobData.constructor === Object) {
            navigate('/');
        }
    }, [searchedJobData, navigate]);

    const handleLoadMore = () => {
        dispatch(setSliceIndex(sliceIndex + 10));
    }

    const handleSelectedIndex = (index) => {
        dispatch(setSelectedIndex(index));
        dispatch(setToggleDisplayCard(false))
    }

    const handleCloseInfo = () => {
        dispatch(setToggleDisplayCard(true))

    }

    const selectedJobTitle = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_title
        : "No job selected";
    const selectedEmployer = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].employer_name
        : "No job selected";
    const selectedJobCity = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_city
        : "No job selected";
    const selectedJobState = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_state
        : "No job selected";
    const selectedJobMinSalary = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_min_salary
        : "No job selected";
    const selectedJobMaxSalary = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_max_salary
        : "No job selected";
    const selectedJobEmploymentType = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_employment_type
        : "No job selected";
    const selectedJobApplyLink = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_apply_link
        : "No job selected";
    const selectedJobDescription = selectedIndex !== null && slicedSearchedJobData && slicedSearchedJobData[selectedIndex]
        ? slicedSearchedJobData[selectedIndex].job_description
        : "No job selected";

    console.log(searchedJobData)

    const handleApplyClick = (link) => {
        if (user) {
            // If user is not null, open the link
            window.open(link, '_blank');
        } else {
            // If user is null, display an alert
            alert("You must be signed in to apply.");
        }
    };

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

    const toggleDisplay = toggleDisplayCard ? "d-flex" : 'd-none'

    const toggleReverseDisplay = toggleDisplayCard ? "d-none" : "d-flex"

    return (
        <div className='SearchResults'>
            <div className={`search-results ${toggleDisplay}`}>
                {/* Mapping through each job and rendering job cards */}
                {slicedSearchedJobData?.map((jobInfo, index) => {
                    const isJobFavorited =
                        user &&
                        (user.favorited_jobs?.some(userItem => userItem.job_id === jobInfo.job_id) ||
                            newFavoriteJobData?.some(newItem => newItem.job_id === jobInfo.job_id));

                    return (
                        <div
                            onClick={() => handleSelectedIndex(index)}
                            key={`${jobInfo.job_id}-${jobInfo.job_title}`}
                            className='search-job-card'
                        >
                            <div className='search-job-card-wrapper'>
                                <h4>{jobInfo.job_title}</h4>
                                <p className='employer-name'>{jobInfo.employer_name}</p>
                                {jobInfo.job_city && jobInfo.job_state ? <p className='job-city'>{jobInfo.job_city}, {jobInfo.job_state}</p> : <p className='job-city'>{jobInfo.job_is_remote ? "Remote" : "Undisclosed"}</p>}
                                {jobInfo.job_min_salary && jobInfo.job_max_salary ? (
                                    <p className='job_salary'>${jobInfo.job_min_salary} - ${jobInfo.job_max_salary}</p>
                                ) : (
                                    <p className='job_salary'>$N/A</p>
                                )}
                            </div>
                            <button onClick={() => handleFavorites(jobInfo)} className='bookmark-btn'>
                                {isJobFavorited ? <BsBookmarkFill /> : <BsBookmark />}
                            </button>
                        </div>
                    );
                })}
                <button onClick={handleLoadMore} className='load-more-btn'>
                    Load More
                </button>
            </div>
            <div className={`searched-job-details ${toggleReverseDisplay}`}>
                <div className='searched-job-details-wrapper'>
                    <div className='searched-info'>
                        <button className='closeBtn' onClick={handleCloseInfo}>X</button>
                        <div className='wrapper-info'>
                            <h3>{selectedJobTitle}</h3>
                            <button onClick={handleFavorites} className='bookmark-btn'>
                                <BsBookmark />
                            </button>
                        </div>
                        <h5 className='selected-employer'>{selectedEmployer}</h5>
                        <h5>
                            {selectedJobCity && selectedJobState ? `${selectedJobCity}, ${selectedJobState}` : "Remote"}
                        </h5>
                        {selectedJobMinSalary && selectedJobMaxSalary ? (
                            <h5>${selectedJobMinSalary} - ${selectedJobMaxSalary}</h5>
                        ) : (
                            <h5>$N/A</h5>
                        )}
                        <h5 className='employment-type'>
                            <PiSuitcaseSimpleLight className='job-icon' /> {selectedJobEmploymentType}
                        </h5>
                        <button className='apply-link' onClick={() => handleApplyClick(selectedJobApplyLink)}>
                            Apply Now
                        </button>
                        <hr />
                        <div className='searched-desc'>
                            <h3>About</h3>
                            <p>{selectedJobDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;





