import express from 'express'
import { createUser, deleteUser, getUserByUsername, getUsers, loginUser, updateUser } from '../Controller/userController'
const router=express.Router()

router.post('/create', createUser)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/:email', getUserByUsername)
router.put('/:id', updateUser)
// router.patch('/:id', resetPassword)
router.delete('/:id', deleteUser)

export default router