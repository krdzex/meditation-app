import Validator from "validator";
import isEmpty from "is-empty";

module.exports = function validateRegistar(data) {
    let errors = {}

    data.userName = !isEmpty(data.userName) ? data.userName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""

    if (Validator.isEmpty(data.userName)) {
        errors.userName = "Username is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (!Validator.isLength(data.password, { min: 8 })) {
        errors.password = "Min 8 characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }

}