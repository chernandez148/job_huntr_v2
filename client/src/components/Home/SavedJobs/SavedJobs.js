import React from 'react'
import { useSelector } from 'react-redux';
import './styles.css'

function SavedJobs() {
    const user = useSelector(state => state.user.user);

    return (
        <div className='SavedJobs'>
            {user ? <h4>Saved Jobs</h4> : <h4>Must sign in to view saved jobs</h4>}
        </div>
    )
}

export default SavedJobs