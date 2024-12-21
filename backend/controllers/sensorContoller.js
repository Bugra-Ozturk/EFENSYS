import Sensor from "../models/Sensor.js";
import mongoose from 'mongoose';
import {isValidObjectId,findDocumentById, checkValidationErrors} from "../utils/index.js"

const getAllSensors = async(req,res) => {
     try {
          const sensors = await Sensor.find();
          res.status(200).json({sensors});
     } catch (error) {
          console.error("Error at  getAllSensors",error)
          return res.status(500).json({error : "Internal Server Error"})
          
     }     
};

const getASensor = async(req,res) => {
    const {id} = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//           return res.status(400).json({error : 'Object id is not valid'})
//     }
     if(isValidObjectId(id,res)) return

    try {
     const sensor = await findDocumentById(Sensor,id,res);
     if(!sensor) return
     res.status(200).json(sensor)
 
    } catch (error) {
     console.error("Error at  getABook",error)
     return res.status(500).json({error : "Internal Server Error"})
    }
}

const createASensor = async(req,res) => {
     try {
          const {title,author,description,methane,propane,isobutane,hydrogen} = req.body;

          // const userUploader = req.user._id;
          const existingSensor = await Sensor.findOne({title,author})
          if(existingSensor) {
               return res.status(400).json({error : 'A sensor with same title and author already exist'});
          }


          const newSensor = await Sensor.create({
               title,
               author,
               description,
               methane,
               propane,
               isobutane,
               hydrogen,
               // userUploader
          });

          return res.status(201).json({message : "Sensor Created Successfully", sensor : newSensor})
     } catch (error) {
          //Handle mongoose validation error
          if(error.name === 'ValidationError'){
               if (checkValidationErrors(error, res)) return;
          } else {
               console.error("Error at CreateBook",error)
               return res.status(500).json({error : "Internal Server Error"})
          }
     }
};


const updateASensorByTitle = async (req, res) => {
     const { title, author, description, methane, propane, isobutane, hydrogen } = req.body;
 
     try {
         const sensor = await Sensor.findOne({ title: title });
 
         if (!sensor) {
             return res.status(404).json({ error: "Sensor not found" });
         }
          book.author = author || book.author;
          book.description = description || book.description;
          book.methane = methane || book.methane;
          book.propane = propane || book.propane;
          book.isobutane = isobutane || book.isobutane;
          book.hydrogen = hydrogen || book.hydrogen;
 
         await book.save();
 
         res.status(200).json({ message: 'The book updated successfully' });
     } catch (error) {
         console.error("Error at updateABookByTitle", error.message || error);
         return res.status(500).json({ error: "Internal Server Error", details: error.message || error });
     }
 };
 
 

const deleteASensor = async(req,res) =>{
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({error : 'Object Id is not valid'})
     }
     try {
          const sensor = await findDocumentById(Sensor,id,res);
          if(!sensor) return
          await sensor.deleteOne();
          return res.status(200).json({message: 'Sensor deleted successfully'})
     } catch (error) {
          console.error("Error at  deleteASensor",error)
          return res.status(500).json({error : "Internal Server Error"})
     }

}

export {
     getAllSensors,
     createASensor,
     getASensor,
     deleteASensor,
     updateASensorByTitle
}