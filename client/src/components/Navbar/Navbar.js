import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { CgMenuRight } from 'react-icons/cg';
import { GrFormSearch } from 'react-icons/gr';
import { MdLocationPin } from 'react-icons/md';
import { PiUserCircle } from 'react-icons/pi';
import { BiSearchAlt2 } from 'react-icons/bi';
import { IoIosOptions } from 'react-icons/io';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styles.css';

function Navbar() {
    const [mobileOptions, setMobileOptions] = useState(false)

    const handleMobileOptions = (e) => {
        e.preventDefault()
        setMobileOptions(mobileOptions => (!mobileOptions))
    }

    const schema = yup.object().shape({
        jobSearch: yup.string(),
        locationSearch: yup.string(),
        datePosted: yup.string(),
        remote: yup.string(),
        employmentType: yup.string(),
        experience: yup.string(),
        radius: yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            jobSearch: "",
            locationSearch: "",
            datePosted: "",
            remote: "",
            employmentType: "",
            experience: "",
            radius: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    const toggleOptions = mobileOptions ? "mobile-filter-form-show" : "mobile-filter-form-hide"

    return (
        <nav className='Navbar'>
            <ul className='nav-list'>
                <div className='nav-left'>
                    <li>
                        <img src={logo} width="125px" />
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
                                name='employmentType'
                                onChange={formik.handleChange}
                                value={formik.values.employmentType}
                            >
                                <option value="" disabled>Employment Type</option>
                                <option value="full-time">Full-Time</option>
                                <option value="part-time">Part-Time</option>
                                <option value="contractor">Contractor</option>
                                <option value="intern">Intern</option>
                                <option value="per-diem">Per-Diem</option>
                            </select>
                            <select
                                name='experience'
                                onChange={formik.handleChange}
                                value={formik.values.experience}
                            >
                                <option value="" disabled>Experience</option>
                                <option value="no-experience">No Experience</option>
                                <option value="entry-level">Entry Level</option>
                                <option value="mid-level">Mid Level</option>
                                <option value="serior-level">Senior Level</option>
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
                    <li className='nav-link'><button><PiUserCircle className='user-icon' />Sign In</button></li>
                    <li className='hamburger'><CgMenuRight /></li>
                </div>
            </ul>
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
                        <button className='submit-btn'><BiSearchAlt2 /></button>
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
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contractor">Contractor</option>
                        <option value="intern">Intern</option>
                        <option value="per-diem">Per-Diem</option>
                    </select>
                    <select
                        name='experience'
                        onChange={formik.handleChange}
                        value={formik.values.experience}
                    >
                        <option value="" disabled>Experience</option>
                        <option value="no-experience">No Experience</option>
                        <option value="entry-level">Entry Level</option>
                        <option value="mid-level">Mid Level</option>
                        <option value="serior-level">Senior Level</option>
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