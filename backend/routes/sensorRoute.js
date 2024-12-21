import express from "express";
import * as sensorController from "../controllers/sensorContoller.js";
const router = express.Router();


router
  .route("/")
  .get(sensorController.getAllSensors)
  .post(sensorController.createASensor);


router
  .route("/:id")
  .get(sensorController.getASensor)
  .delete(sensorController.deleteASensor);

  router
  .route("/update-by-title")
  .put(sensorController.updateASensorByTitle);

export default router;
