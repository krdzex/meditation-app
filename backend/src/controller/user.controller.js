import User from "../models/user.model"
import errorHandler from "../helpers/dbErrorHandler"
import validateSignUp from "../validations/registar"
import validateEdit from "../validations/edit"
import validateNewPassword from "../validations/newPassword"
import _ from "lodash"


const createUser = (req, res) => {

    const { errors, isValid } = validateSignUp(req.body);

    const user = new User(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }
    user.save((err, result) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getUniqueErrorMessage(err)
            )
        }
        res.status(200).json({
            message: "Successfully created user!"
        })
    })
}

const listUsers = (req, res) => {
    User.find((err, users) => {
        res.status(200).json(users)
    })
}

const editUser = (req, res) => {
    let id = req.params.id;
    User.findById(id).exec((err, result) => {
        let user = result;
        user = _.extend(user, req.body)
        const { errors, isValid } = validateEdit(user);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json(errorHandler.getUniqueErrorMessage(err))
            } else {
                res.json({ message: "Successfuly edited user" })
            }
        })
    })
}

const userInfo = (req, res) => {
    let id = req.params.id
    User.findById(id).select("-hashed_password -created -salt").then(user => {
        res.status(200).json(user)
    })
}

const updatePassword = async (req, res) => {
    let id = req.params.id;
    const { errors } = validateNewPassword(req.body);
    let user = await User.findById(id)
    if (!user.authenticate(req.body.oldPassword)) {
        _.assign(errors, { oldPassword: "Wrong old password" })
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors)
    }

    user = _.extend(user, { password: req.body.newPassword })
    user.updated = Date.now();
    user.save((err) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getErrorMessage(err)
            )
        }
        res.status(200).json({ message: "Password edited" })
    })
}


const updateTime = async (req, res) => {
    let id = req.params.id
    let user = await User.findById(id)
    user = _.extend(user, { allSessionsTime: req.body.time })
    user.save((err) => {
        if (err) {
            return res.status(400).json(
                errorHandler.getErrorMessage(err)
            )
        }
        res.status(200).json({ message: "Time edited" })
    })
}



export default { listUsers, createUser, editUser, userInfo, updatePassword, updateTime }