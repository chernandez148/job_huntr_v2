import React from 'react'
import { useSelector } from 'react-redux';
import './styles.css'

function RecentSearches() {
    const user = useSelector(state => state.user.user);

    return (
        <div className='RecentSearches'>
            {user ? <h4>Saved Jobs</h4> : <h4>Must sign in to view recent job searches</h4>}
        </div>
    )
}

export default RecentSearches