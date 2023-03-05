import { Router } from "express";
import { findUsers, findUserByID,findUserByEmail, createUser, updateUser, deleteUser,findOlderUsers, countRole, login, changePassword, getJoinYear, getJoinYearAndAfter} from "../controller/user.controller";
import validate from "../middleware/validate";
import { Usertype } from "../schema.zod/user.zod";

const router= Router()

router.get('/', findUsers)
router.get('/:id', findUserByID)
router.get('/email/:email', findUserByEmail)
router.get('/age/:age', findOlderUsers)
router.get('/role/:role', countRole)
// checkUserPassword
router.get('/login', login)
//changePassword
router.put('/changePass/:id', changePassword)
router.get('/joinYear/:joiningYear', getJoinYear)
router.get('/afterJoinYear/:joiningYear', getJoinYearAndAfter)

router.post('/', validate(Usertype) ,createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)


export default router