import { Router } from "express";
import { addCustomer } from "../controllers/create.controller.js";
import { getDataFromDB } from "../controllers/data.controller.js";

const router = Router();

router.route("/entry").post(addCustomer);
router.route("/getdata").get(getDataFromDB);

export default router