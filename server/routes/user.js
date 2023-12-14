const router = require("express").Router();
const upload = require("../middlewares/upload");
const { 
    allUsers, 
    addUser, 
    deleteUser, 
    findUserById, 
    setUserProfilePictures, 
    updateUser 
} = require("../controllers/user");

router.post("/login", login);

router.post("/upload", upload.single("file"), setUserProfilePictures);

router.get("/", allUsers); 

router.get("/:id", findUserById);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
