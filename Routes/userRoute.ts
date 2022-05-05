import express from 'express'
import { createUser, deleteUser, getUserByUsername, getUsers, loginUser, homepage, resetPassword, updateUser } from '../Controller/userController'
import { verifyToken } from '../Middleware/verify'
const router=express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/home', verifyToken, homepage)
router.get('/:email', getUserByUsername)
router.put('/:id', updateUser)
router.patch('/:id', resetPassword)
router.delete('/:id', verifyToken, deleteUser)

// router.get('/dashBoard', dashBoard )

export default router