import Book from "../models/Book.js";
import mongoose from 'mongoose';
import {isValidObjectId,findDocumentById, checkValidationErrors} from "../utils/index.js"

const getAllBooks = async(req,res) => {
     try {
          const books = await Book.find();
          res.status(200).json({books});
     } catch (error) {
          console.error("Error at  getAllBooks",error)
          return res.status(500).json({error : "Internal Server Error"})
          
     }     
};

const getABook = async(req,res) => {
    const {id} = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//           return res.status(400).json({error : 'Object id is not valid'})
//     }
     if(isValidObjectId(id,res)) return

    try {
     // const book = await Book.findById(id);
     // if(!book) {
     //  return res.status(404).json({error : 'The book is not exist !'})
     // }
     // res.status(200).json(book)
     const book = await findDocumentById(Book,id,res);
     if(!book) return
     res.status(200).json(book)
 
    } catch (error) {
     console.error("Error at  getABook",error)
     return res.status(500).json({error : "Internal Server Error"})
    }
}

const createABook = async(req,res) => {
     try {
          const {title,author,description,methane,propane,isobutane,hydrogen} = req.body;

          // const userUploader = req.user._id;
          const existingBook = await Book.findOne({title,author})
          if(existingBook) {
               return res.status(400).json({error : 'A book with same title and author already exist'});
          }


          const newBook = await Book.create({
               title,
               author,
               description,
               methane,
               propane,
               isobutane,
               hydrogen,
               // userUploader
          });

          return res.status(201).json({message : "Book Created Successfully", book : newBook})
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


const updateABookByTitle = async (req, res) => {
     const { title, author, description, methane, propane, isobutane, hydrogen } = req.body;
 
     try {
         const book = await Book.findOne({ title: title });
 
         if (!book) {
             return res.status(404).json({ error: "Book not found" });
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
 
 

const deleteABook = async(req,res) =>{
     const {id} = req.params;
     if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({error : 'Object Id is not valid'})
     }
     try {
          const book = await findDocumentById(Book,id,res);
          if(!book) return
          await book.deleteOne();
          return res.status(200).json({message: 'Book deleted successfully'})
     } catch (error) {
          console.error("Error at  deleteABook",error)
          return res.status(500).json({error : "Internal Server Error"})
     }

}
const addMeasurement = async (req, res) => {
     try {
       const { title, measurement } = req.body;
   
       const book = await Book.findOne({ title });
       if (!book) {
         return res.status(404).json({ message: "Book not found" });
       }
   
       if (
         !measurement.methane ||
         !measurement.propane ||
         !measurement.isobutane ||
         !measurement.hydrogen
       ) {
         return res.status(400).json({ message: "All measurement fields are required." });
       }
   
       //Adding the measurement to the measurements array
       book.measurements.push({ ...measurement, date: new Date() });
       book.updatedAt = new Date();  

       await book.save();
   
       res.status(200).json({ message: "Measurement added successfully", book });
     } catch (error) {
       res.status(500).json({ message: "Internal server error", error });
     }
   };
   
   
   
   
   
   const getMeasurements = async (req, res) => {
     try {
       const book = await Book.findById(req.params.id).select("measurements");
       if (!book) {
         return res.status(404).json({ message: "Book not found" });
       }
       res.status(200).json(book.measurements);
     } catch (error) {
       res.status(500).json({ message: "Internal server error", error });
     }
   };
   
export {
     getAllBooks,
     createABook,
     getABook,
     deleteABook,
     updateABookByTitle,
     addMeasurement,
     getMeasurements,
     // getBooksByUploader
}