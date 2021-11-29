import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateUser, userInfo } from '../ApiService/userApi';
import authHelper from '../Auth/authHelper';

const EditProfile = () => {

    const [values, setValues] = useState({
        userName: "",
        email: "",
    })
    const [firstTime, setFirstTime] = useState(true)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        userInfo(authHelper.isAuthentcated().user._id)
            .then(response => setValues({ userName: response.userName, email: response.email }))
            .catch(reason => console.log(reason))
    }, [])

    const [active, setActive] = useState({
        userName: false,
        email: false,
    })

    const onEditClick = (value, oppositeValue) => {
        setActive({ ...active, [value]: !oppositeValue })
    }

    const onChangeValue = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = () => {
        let user = {
            userName: values.userName || "",
            email: values.email || "",
        }
        updateUser(authHelper.isAuthentcated().user._id, user)
            .then(response => {
                if (!response.message) {
                    setErrors(response)
                } else {
                    setErrors({})
                    setActive({
                        userName: false,
                        email: false,
                    })
                }
                if (firstTime) {
                    document.getElementById("editWrapper").className += " afterFirst"
                    setFirstTime(false)
                }
            })
            .catch(reason => console.log(reason))
    }

    const onCancel = () => {
        setActive({
            userName: false,
            email: false,

        })
        userInfo(authHelper.isAuthentcated().user._id)
            .then(response => setValues({ userName: response.userName, email: response.email }))
            .catch(reason => console.log(reason))
        setErrors({})
    }


    return (
        <div className="editWrapper" id="editWrapper">
            <div className={active.userName || active.email ? "editForm active" : "editForm"}>
                <h2 style={{ textAlign: "center" }}>{active.userName || active.email ?
                    <div>Edit profile</div> :
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}> <Link to="/profile" style={{display: "flex"}}><Icon icon="ant-design:arrow-right-outlined" style={{ fontSize: "25px", transform: "rotate(180deg)", cursor: "pointer", marginRight: "15px" }} /></Link> Account Info</div>}</h2>
                <div className="firstFormUserName">
                    <h3>User name:</h3>
                    <div className={active.userName ? "activeEdit" : "edit"} style={errors.userName ? { marginTop: "20px" } : {}}>
                        <p>{values.userName}</p>
                        <input type="text" className={errors.userName ? "error" : "success"} value={values.userName} onChange={onChangeValue("userName")} />
                        {errors.userName && (<span style={{ color: "red", fontSize: "15px" }}>{errors.userName}</span>)}
                    </div>
                    <div className={active.userName ? "hideIcon" : "editIcon"} onClick={() => onEditClick("userName", active.userName)}>
                        <Icon icon="ci:edit" id="edit" />
                    </div>
                </div>
                <div className="firstFormEmail">
                    <h3>Email:</h3>
                    <div className={active.email ? "activeEdit" : "edit"} style={errors.email ? { marginTop: "20px" } : {}}>
                        <p>{values.email}</p>
                        <input type="text" className={errors.email ? "error" : "success"} value={values.email} onChange={onChangeValue("email")} />
                        {errors.email && (<span style={{ color: "red", fontSize: "15px" }}>{errors.email}</span>)}
                    </div>

                    <div className={active.email ? "hideIcon" : "editIcon"} onClick={() => onEditClick("email", active.email)}>
                        <Icon icon="ci:edit" id="edit" />
                    </div>
                </div>
                <div className="buttons">
                    <button id="cancel" onClick={() => onCancel()}>Cancel</button>
                    <button id="change" onClick={() => onSubmit()}>Change</button>
                </div>
            </div>
        </div >
    );
};

export default EditProfile;