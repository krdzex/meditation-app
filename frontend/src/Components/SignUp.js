import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { createUser } from '../ApiService/userApi';
import FacebookLogin from 'react-facebook-login';
import { logIn } from '../Actions';
import authHelper from '../Auth/authHelper';
const SignUp = () => {

    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        userName: "",
        email: "",
        password: "",
        redirect: false
    })
    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    const dispatch = useDispatch()
    const [firstTime, setFirstTime] = useState(true)
    const onSubmit = (e) => {
        e.preventDefault()
        let user = {
            userName: values.userName || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        createUser(user).then(response => {
            if (firstTime) {
                document.getElementById("signUp").className += " afterFirst"
                setFirstTime(false)
            }
            if (response.message) {
                setValues({ ...values, redirect: true })
            } else {
                setErrors(response)
            }
        }).catch(err => console.log(err))
    }

    const responseFacebook = (response) => {
        if (!response.status) {
            dispatch(logIn())
            authHelper.authenticateFacebook(response, () => {
                setErrors({})
            })
        };
    }



    if (values.redirect) return <Navigate to={"/signIn"} />
    return (
        <div className="registrationWrapper">
            <div className="signUpCard">
                <div className="form" id="signUp">
                    <h2>Sign Up</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="inputBox">
                            <input type="text" placeholder="username" className={errors.userName ? "error" : "success"} value={values.userName} onChange={onChange("userName")} />
                            <div className="icon"><Icon icon="bx:bxs-user" /></div>
                            {errors.userName && (<span style={{ color: "red", fontSize: "15px" }}>{errors.userName}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="text" placeholder="email" className={errors.email ? "error" : "success"} value={values.email} onChange={onChange("email")} />
                            <div className="icon"><Icon icon="bx:bxs-user" /></div>
                            {errors.email && (<span style={{ color: "red", fontSize: "15px" }}>{errors.email}</span>)}
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder="password" className={errors.password ? "error" : "success"} value={values.password} onChange={onChange("password")} />
                            <div className="icon password"><Icon icon="ri:lock-password-fill" /></div>
                            {errors.password && (<span style={{ color: "red", fontSize: "15px" }}>{errors.password}</span>)}
                        </div>
                        <div className="inputBox" style={{marginBottom:"0px"}}>
                            <input type="submit" value="Sign Up" />
                        </div>
                        <div className="or">
                            <span>or</span>
                            </div>
                        <FacebookLogin
                            appId="243806724517939"
                            fields="name,email,picture"
                            callback={responseFacebook} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;