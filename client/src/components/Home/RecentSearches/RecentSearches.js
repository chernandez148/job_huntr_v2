import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedJobData } from '../../../redux/slices/searchedJobData';
import { setIsLoading } from '../../../redux/slices/isLoading';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

function RecentSearches() {
    const user = useSelector(state => state.user.user);
    const recentSearchesData = useSelector(state => state.recentSearchesData.recentSearchesData);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(recentSearchesData)

    const recentSearch = user && Array.isArray(user.recent_searches) ? [...user.recent_searches, ...recentSearchesData] : [...recentSearchesData];

    const slicedRecentSearches = recentSearch?.slice(-4);

    const handleRecentSearch = async (recentItem) => {
        console.log(recentItem.job_search)
        dispatch(setIsLoading(true))
        if (recentItem) {
            const options = {
                method: "GET",
                url: "https://jsearch.p.rapidapi.com/search",
                params: {
                    query: `${recentItem.job_search} in ${recentItem.location_search}, USA`,
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
        <div className='RecentSearches'>
            {user ? (
                <>
                    {slicedRecentSearches.map((recentItem, index) => (
                        <div onClick={() => handleRecentSearch(recentItem)} className='recent-search-card' key={index}>
                            <span>
                                {recentItem.job_search
                                    .split(" ")
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}
                            </span>
                            <span className='location'>in {recentItem.location_search.charAt(0).toUpperCase() + recentItem.location_search.slice(1)}</span>

                        </div>
                    ))}
                </>
            ) : (
                <h4>Must sign in to view recent job searches</h4>
            )}
        </div>
    );
}

export default RecentSearches;
