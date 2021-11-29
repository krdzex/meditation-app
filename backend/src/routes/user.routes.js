import express from "express";
import userController from "../controller/user.controller";
const router = express.Router()


router.route("/api/users").post(userController.createUser).get(userController.listUsers)
router.route("/api/users/:id").get(userController.userInfo).put(userController.editUser)
router.route("/api/users/password/:id").put(userController.updatePassword)
router.route("/api/users/time/:id").put(userController.updateTime)

export default router;