import { defineStore } from "pinia";
import axios from "axios";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    books: [], 
  }),

  getters: {
    selectedBook: (state) => {
      return (id) => state.books.find((book) => book._id === id);
    },
    bookMeasurements: (state) => {
      return (id) => {
        const book = state.books.find((book) => book._id === id);
        return book ? book.measurements : []; 
      };
    },
  },

  actions: {
    async fetchBooks() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/books");
        const data = response.data;

        if (data.books && Array.isArray(data.books)) {
          this.books = data.books; //Save the books coming from the API to the state
        } else {
          console.error("API response is not in the expected format:", data);
          this.books = [];
        }
      } catch (error) {
        console.error("Data retrieval error:", error);
        this.books = [];
      }
    },

    async addNewBook(newBook) {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/books", newBook);
        this.books.push(response.data.book); //Adding the new book to the state
      } catch (error) {
        console.error("Error Adding New Book", error);
      }
    },

    
    async deleteTheBook(bookId) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
        this.books = this.books.filter((book) => book._id !== bookId);
      } catch (error) {
        console.error("Book Deletion Error :", error);
      }
    },

    async addMeasurement(bookId, measurement) {
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/books/${bookId}`,
          measurement
        );

        const updatedBook = response.data.book;
        const bookIndex = this.books.findIndex((book) => book._id === bookId);

        if (bookIndex !== -1) {
          this.books[bookIndex] = updatedBook; //Projecting the updated book to the state
        }
      } catch (error) {
        console.error("Error adding measurement:", error);
      }
    },
  },
});
