import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../redux/slices/user';
import { setLoginForm } from '../../../redux/slices/loginForm';
import { setSignInToggle } from '../../../redux/slices/signInToggle';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './styles.css'

function LoginForm() {
    const signInToggle = useSelector(state => state.signInToggle.signInToggle);
    const signInUrl =
        'http://127.0.0.1:5000/login';
    const signUpUrl =
        'http://127.0.0.1:5000/signup';
    const dispatch = useDispatch()

    const handleFormToggle = () => {
        dispatch(setSignInToggle(!signInToggle))
    }

    const handleCloseFrom = () => {
        dispatch(setLoginForm(false))
        dispatch(setSignInToggle(true))
    }

    const schema = yup.object().shape({
        fname: yup.string(),
        lname: yup.string(),
        email: yup.string().email('Invalid email').required('Email is required'),
        phone_number: yup
            .string()
            .transform((value) => (value ? value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : ''))
            .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Invalid phone number'),
        street_address: yup.string(),
        city: yup.string(),
        state: yup.string(),
        postal_code: yup.number(),
        password: yup
            .string()
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: 'hernandezchristian94@gmail.com',
            phone_number: '',
            street_address: '',
            city: '',
            state: '',
            postal_code: '',
            password: 'Extra004!',
        },
        validationSchema: schema,
        onSubmit: (values) => {
            fetch(signInToggle ? signInUrl : signUpUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...values, password: values.password })
            })
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then((user) => {
                            console.log('Login successful:', user);
                            dispatch(setUser(user));
                            dispatch(setLoginForm(false))
                        });
                    } else {
                        resp.json().then((error) => {
                            console.log('Login error:', error);
                        });
                    }
                })
                .catch((error) => {
                    console.log('Error occurred:', error);
                });
        }
    });

    return (
        <div className='LoginForm'>
            <button className='close-form-btn' onClick={handleCloseFrom}>X</button>
            <h4>{signInToggle ? "SIGN IN" : "CREATE ACCOUNT"}</h4>
            <form onSubmit={formik.handleSubmit}>
                {!signInToggle &&
                    <>
                        <input
                            type='text'
                            name='fname'
                            placeholder='First Name'
                            onChange={formik.handleChange}
                            value={formik.values.fname}
                        />
                        <input
                            type='text'
                            name='lname'
                            placeholder='Last Name'
                            onChange={formik.handleChange}
                            value={formik.values.lname}
                        />
                    </>
                }
                <input
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {!signInToggle &&
                    <>
                        <input
                            type='text'
                            name='phone_number'
                            placeholder='(909) 999-9999'
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                        />
                        <input
                            type='test'
                            name='street_address'
                            placeholder='Street Address'
                            onChange={formik.handleChange}
                            value={formik.values.street_address}
                        />
                        <input
                            type='text'
                            name='city'
                            placeholder='City'
                            onChange={formik.handleChange}
                            value={formik.values.city}
                        />
                        <input
                            type='text'
                            name='state'
                            placeholder='State'
                            onChange={formik.handleChange}
                            value={formik.values.state}
                        />
                        <input
                            type='text'
                            name='postal_code'
                            placeholder='Zip Code'
                            onChange={formik.handleChange}
                            value={formik.values.postal_code}
                        />
                    </>
                }
                <input type='password' placeholder='Password' />
                <button>{signInToggle ? "SIGN IN" : "SIGN UP"}</button>
                <h5 onClick={handleFormToggle}>{signInToggle ? "or Sign Up" : "or Sign In"}</h5>
            </form>
        </div>
    )
}

export default LoginForm