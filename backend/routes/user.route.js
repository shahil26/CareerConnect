import express from "express"
import { logout, register } from "../controllers/user.controller.js"
import { login } from "../controllers/user.controller.js"
import { updateProfile } from "../controllers/user.controller.js"
import isAuthenticated  from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile)

export default router;