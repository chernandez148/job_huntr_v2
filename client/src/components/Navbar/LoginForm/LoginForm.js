import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSignInToggle } from '../../../redux/slices/signInToggle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styles.css'

function LoginForm() {
    const signInToggle = useSelector(state => state.signInToggle.signInToggle);
    const dispatch = useDispatch()

    const handleLoginBtn = () => {
        dispatch(setSignInToggle(true))
    }

    const handleSignUpBtn = () => {
        dispatch(setSignInToggle(false))
    }

    const schema = yup.object().shape({

    })

    return (
        <div className='LoginForm'>
            <div className='form-buttons'>
                <button className='sign-in-btn' onClick={handleLoginBtn}>Sign In</button>
                <button className='sign-up-btn' onClick={handleSignUpBtn}>Sign Up</button>
            </div>
            <form>
                {!signInToggle &&
                    <>
                        <input type='text' placeholder='First Name' />
                        <input type='text' placeholder='Last Name' />
                    </>
                }
                <input type='email' placeholder='Email Address' />
                {!signInToggle &&
                    <>
                        <input type='text' placeholder='(909) 999-9999' />
                        <input type='test' placeholder='Street Address' />
                        <input type='text' placeholder='City' />
                        <input type='text' placeholder='State' />
                        <input type='text' placeholder='Zip Code' />
                    </>
                }
                <input type='password' placeholder='Password' />
            </form>
        </div>
    )
}

export default LoginForm