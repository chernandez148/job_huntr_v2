import { useDispatch, useSelector } from 'react-redux';
import { setJobData } from '../../redux/slices/jobData';
import { setRemoteJobData } from '../../redux/slices/remoteJobData';
import { setLocationData } from '../../redux/slices/locationData';
import { useEffect } from 'react';
import axios from 'axios';

function Data() {
    const locationData = useSelector(state => state.locationData.locationData);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchGeoLocationData = async () => {
            const geoOptions = {
                method: 'GET',
                url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
                params: { format: 'json' },
                headers: {
                    'X-RapidAPI-Key': '87a13bb857msh6d480686553cc77p1415cajsn5fd5ebf1bbd6',
                    'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(geoOptions);
                dispatch(setLocationData(response.data.city.name));
            } catch (error) {
                console.error(error);
            }
        };

        // Fetch location data only if it's not available
        if (locationData) {
            fetchGeoLocationData();
        }
    }, [dispatch, locationData]);

    useEffect(() => {
        // Fetch job data only if locationData is available
        if (locationData) {
            const fetchJobData = async () => {
                const jobOptions = {
                    method: 'GET',
                    url: 'https://jsearch.p.rapidapi.com/search',
                    params: {
                        query: `Jobs in ${locationData}, USA`,
                        page: '3',
                        num_pages: '20',
                        date_posted: 'all',
                        remote_jobs_only: 'false',
                        employment_types: '',
                        job_requirements: '',
                        radius: '25'
                    },
                    headers: {
                        'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
                        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(jobOptions);
                    dispatch(setJobData(response.data));
                } catch (error) {
                    console.error(error);
                }
            };

            fetchJobData();
        }
    }, [dispatch, locationData]);

    useEffect(() => {
        // Fetch job data only if locationData is available
        if (locationData) {
            const fetchRemoteJobData = async () => {
                const jobOptions = {
                    method: 'GET',
                    url: 'https://jsearch.p.rapidapi.com/search',
                    params: {
                        query: `Jobs in ${locationData}, USA`,
                        page: '3',
                        num_pages: '20',
                        date_posted: 'all',
                        remote_jobs_only: 'true',
                        employment_types: '',
                        job_requirements: '',
                        radius: '25'
                    },
                    headers: {
                        'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
                        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(jobOptions);
                    dispatch(setRemoteJobData(response.data));
                } catch (error) {
                    console.error(error);
                }
            };

            fetchRemoteJobData();
        }
    }, [dispatch, locationData]);

    return null;
}

export default Data;
