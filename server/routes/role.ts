const router = require("express").Router();
const { allRoles, findRoleById, addRole, updateRole, deleteRole } = require("../controllers/role");

router.get("/", allRoles); 

router.get("/:id", findRoleById);

router.post("/", addRole);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

module.exports = router;
