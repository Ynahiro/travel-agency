import express from 'express'
import * as postController from '../controllers/postController.js'

const router = express.Router()

router.get('/', postController.selectALLPost)
router.get('/:column', postController.selectPostByColumn)
router.post('/', postController.insertPost)
router.put('/:id', postController.updatePost)
router.delete('/:title', postController.deletePost)

export default router