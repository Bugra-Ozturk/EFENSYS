import express from "express";
import * as bookController from "../controllers/bookController.js";
// import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createABook);
router.route("/")


router
  .route("/:id")
  .get(bookController.getABook)
  .post(bookController.addMeasurement)
  .delete(bookController.deleteABook);

  router
  .route("/add-by-title")
  .post(bookController.addMeasurement);

  
  
export default router;
