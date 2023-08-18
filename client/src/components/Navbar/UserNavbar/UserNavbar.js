import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../redux/slices/user'
import { setLoginForm } from '../../../redux/slices/loginForm';
import './styles.css'

function UserNavbar() {
    const logoutUrl = "http://127.0.0.1:5000/logout"
    const loginForm = useSelector(state => state.loginForm.loginForm);
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch()

    const handleCloseUserNavbar = () => {
        dispatch(setLoginForm(false))

    }

    const handleLogOut = () => {
        fetch(logoutUrl, {
            method: "DELETE"
        }).then(resp => {
            if (resp.ok) {
                dispatch(setUser(null))
                dispatch(setLoginForm(false))
                window.location.reload();
            }
        })
    }

    return (
        <div className={`UserNavbar ${loginForm ? "UserNavbarShow" : "UserNavbarHide"}`}>
            <button className='close-user-navbar' onClick={handleCloseUserNavbar}>X</button>
            <div className='user-navbar-wrapper'>
                <div className='user-info'>
                    <img src='https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg' width="75px" height="75px" />
                    <div className='user-name'>
                        <h4>{user.fname} {user.lname}</h4>
                        <p>{user.email}</p>
                    </div>

                </div>
                <div className='user-links'>
                    <a href='#'>Profile</a>
                    <a href='#'>Settings</a>
                    <a href='#'>Favorites</a>
                    <a href='#'>About</a>
                </div>
                <button className='logoutBtn' onClick={handleLogOut}>Log Out</button>
            </div>

        </div>
    )
}

export default UserNavbar