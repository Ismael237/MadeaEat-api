const router = require("express").Router();
const { 
    allUsers, 
    addUser, 
    deleteUser, 
    findUserById,
    login, 
    setUserProfilePictures, 
    updateUser, 
} = require("../controllers/user");
const authMiddleware = require("../middlewares/auth");


router.post("/login", login);

router.post("/", addUser);

// router.post("/upload", authMiddleware, setUserProfilePictures);

router.get("/", authMiddleware, findUserById);

router.put("/", authMiddleware, updateUser);

router.delete("/", authMiddleware, deleteUser);

module.exports = router;
