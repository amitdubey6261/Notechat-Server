const express = require("express");
const {
    createUser,
    getAllUser,
    deleteUser,
    updateUser,
    userDetails,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
} = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../middleware/isAuth");

const router = express.Router();

router.route("/user/create").post(createUser);
router.route("/user/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/user/logout").get(isAuthenticatedUser, logoutUser);
router.route("/user/all").get( isAuthenticatedUser , getAllUser);
router.route("/user").get( isAuthenticatedUser , userDetails);
router.route("/user/update/:id").put(updateUser);
router.route("/user/delete/:id").delete(deleteUser);

module.exports = router;
