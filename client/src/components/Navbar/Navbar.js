import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setLoginForm } from '../../redux/slices/loginForm';
import { setSearchedJobData } from '../../redux/slices/searchedJobData';
import { setIsLoading } from '../../redux/slices/isLoading';
import { setRecentSearchesData } from '../../redux/slices/recentSearchesData';
import { CgMenuRight } from 'react-icons/cg';
import { MdLocationPin } from 'react-icons/md';
import { GrFormSearch } from 'react-icons/gr';
import { PiUserCircle } from 'react-icons/pi';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosOptions } from 'react-icons/io';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import LoginForm from './LoginForm/LoginForm';
import UserNavbar from './UserNavbar/UserNavbar';
import logo from '../../assets/logo.png';
import './styles.css';

function Navbar() {
    const [mobileOptions, setMobileOptions] = useState(false)
    const recentSearchesData = useSelector(state => state.recentSearchesData.recentSearchesData);
    const loginForm = useSelector(state => state.loginForm.loginForm);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleMobileOptions = (e) => {
        e.preventDefault()
        setMobileOptions(mobileOptions => (!mobileOptions))
    }

    const handleRecentSearch = async (values) => {
        const recentSavesUrl = "http://127.0.0.1:5000/recent_searches";

        try {
            const response = await fetch(recentSavesUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    job_search: values.jobSearch,
                    location_search: values.locationSearch,
                    date_posted: values.datePosted,
                    remote: values.remote,
                    experience: values.experience,
                    radius: values.radius,
                    user_id: user.id,
                }),
            });

            if (response.ok) {
                const recentSearch = await response.json();
                dispatch(setRecentSearchesData([...recentSearchesData, recentSearch]))
            } else {
                console.error("Failed to add job to favorites.");
            }
        } catch (error) {
            console.error("An error occurred while adding to recent searches:", error);
        }
    };

    const schema = yup.object().shape({
        jobSearch: yup.string(),
        locationSearch: yup.string(),
        datePosted: yup.string(),
        remote: yup.string(),
        experience: yup.string(),
        radius: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            jobSearch: "",
            locationSearch: "",
            datePosted: "",
            remote: "",
            experience: "",
            radius: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            dispatch(setIsLoading(true))

            if (user) {
                await handleRecentSearch(values);
            }

            console.log(true)
            if (values) {
                const options = {
                    method: "GET",
                    url: "https://jsearch.p.rapidapi.com/search",
                    params: {
                        query: `${values.jobSearch} in ${values.locationSearch}, USA`,
                        page: "3",
                        num_pages: "20",
                        date_posted: values.datePosted ? `${values.datePosted}` : null,
                        remote_jobs_only: values.remote ? `${values.remote}` : null,
                        job_requirements: values.experience ? `${values.experience}` : null,
                        radius: values.radius ? `${values.radius}` : null,
                    },
                    headers: {
                        'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
                        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
                    },
                };

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
    });

    const handleLoginForm = () => {
        dispatch(setLoginForm(!loginForm))
    }

    const toggleOptions = mobileOptions ? "mobile-filter-form-show" : "mobile-filter-form-hide"

    return (
        <nav className='Navbar'>
            <ul className='nav-list'>
                <div className='nav-left'>
                    <li>
                        <Link to='/'><img src={logo} width="125px" /></Link>
                    </li>
                </div>
                <div className='nav-center'>
                    <form className='desktop-form' onSubmit={formik.handleSubmit}>
                        <div className='search-form'>
                            <div className='search-job'>
                                <label><GrFormSearch /></label>
                                <input
                                    type='text'
                                    placeholder='Job title, keywords, or company'
                                    name='jobSearch'
                                    onChange={formik.handleChange}
                                    value={formik.values.jobSearch}
                                />
                            </div>
                            <div className='search-location'>
                                <label><MdLocationPin /></label>
                                <input
                                    type='text'
                                    placeholder='City, state, zip code, or "remote"'
                                    name='locationSearch'
                                    onChange={formik.handleChange}
                                    value={formik.values.locationSearch}
                                />
                                <button className='submit-btn'><BiSearchAlt2 /></button>
                            </div>
                        </div>
                        <div className='filter-form'>
                            <select
                                name='datePosted'
                                onChange={formik.handleChange}
                                value={formik.values.datePosted}
                            >
                                <option value="" disabled>Date Posted</option>
                                <option value="all">All</option>
                                <option value="today">Today</option>
                                <option value="3days">3 Days</option>
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                            </select>
                            <select
                                name='remote'
                                onChange={formik.handleChange}
                                value={formik.values.remote}
                            >
                                <option value="" disabled>Remote</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <select
                                name='experience'
                                onChange={formik.handleChange}
                                value={formik.values.experience}
                            >
                                <option value="" disabled>Experience</option>
                                <option value="no_experience">No Experience</option>
                                <option value="under_3_years_experience">Entry Level</option>
                                <option value="more_than_3_years_experience">Mid Level</option>
                                <option value="more_than_3_years_experience">Senior Level</option>
                            </select>
                            <select
                                name='radius'
                                onChange={formik.handleChange}
                                value={formik.values.radius}
                            >
                                <option value="" disabled>Radius</option>
                                <option value="5">5 Miles</option>
                                <option value="10">10 Miles</option>
                                <option value="15">15 Miles</option>
                                <option value="20">20 Miles</option>
                                <option value="25">25 Miles</option>
                                <option value="50">50 Miles</option>
                                <option value="100">100 Miles</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div className='nav-right'>
                    <li className='nav-link'><button onClick={handleLoginForm}><PiUserCircle className='user-icon' />{user ? " User" : "Sign In"}</button></li>
                    <li className='hamburger'><CgMenuRight /></li>
                </div>
            </ul>
            <div className={`login-form ${loginForm ? "login-form-show" : "login-form-hide"}`}>{user ? <UserNavbar /> : <LoginForm />}</div>
            <form className='mobile-form' onSubmit={formik.handleSubmit}>
                <div className='mobile-input-wrapper'>
                    <div className='mobile-search-job'>
                        <input
                            type='text'
                            placeholder='Job title, keywords, or company'
                            name='jobSearch'
                            onChange={formik.handleChange}
                            value={formik.values.jobSearch}
                        />
                        <button type='click' onClick={handleMobileOptions}><IoIosOptions /></button>
                    </div>
                    <div className='mobile-search-location'>
                        <input
                            type='text'
                            placeholder='City, state, zip code, or "remote"'
                            name='locationSearch'
                            onChange={formik.handleChange}
                            value={formik.values.locationSearch}
                        />
                        <button type='click' className='submit-btn'><BiSearchAlt2 /></button>
                    </div>
                </div>

                <div className={toggleOptions}>
                    <select
                        name='datePosted'
                        onChange={formik.handleChange}
                        value={formik.values.datePosted}
                    >
                        <option value="" disabled>Date Posted</option>
                        <option value="all">All</option>
                        <option value="today">Today</option>
                        <option value="3days">3 Days</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                    </select>
                    <select
                        name='remote'
                        onChange={formik.handleChange}
                        value={formik.values.remote}
                    >
                        <option value="" disabled>Remote</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    <select
                        name='employmentType'
                        onChange={formik.handleChange}
                        value={formik.values.employmentType}
                    >
                        <option value="" disabled>Employment Type</option>
                        <option value="FULLTIME">Full-Time</option>
                        <option value="PARTTIME">Part-Time</option>
                        <option value="CONTRACTOR">Contractor</option>
                        <option value="INTERN">Intern</option>
                    </select>
                    <select
                        name='experience'
                        onChange={formik.handleChange}
                        value={formik.values.experience}
                    >
                        <option value="" disabled>Experience</option>
                        <option value="no_experience">No Experience</option>
                        <option value="under_3_years_experience">Entry Level</option>
                        <option value="more_than_3_years_experience">Mid Level</option>
                        <option value="more_than_3_years_experience">Senior Level</option>
                    </select>
                    <select
                        name='radius'
                        onChange={formik.handleChange}
                        value={formik.values.radius}
                    >
                        <option value="" disabled>Radius</option>
                        <option value="5">5 Miles</option>
                        <option value="10">10 Miles</option>
                        <option value="15">15 Miles</option>
                        <option value="20">20 Miles</option>
                        <option value="25">25 Miles</option>
                        <option value="50">50 Miles</option>
                        <option value="100">100 Miles</option>
                    </select>
                </div>
            </form>
        </nav>
    )
}

export default Navbar