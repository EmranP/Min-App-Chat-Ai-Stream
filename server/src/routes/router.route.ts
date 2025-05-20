import { Router } from 'express'
import { chatController } from '../controller/chat.controller'

const routerApp = Router({ mergeParams: true })

routerApp.post('/chat/stream', chatController)

export default routerApp
