import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const router = Router();

router.get('/', ordersController.getOrders);
router.get('/:oid', ordersController.getOrderById);
router.post('/', ordersController.addOrder);
router.put('/:oid', ordersController.updateOrder);
router.delete('/:oid', ordersController.deleteOrder);


export default router;