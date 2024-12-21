<template>
     <section class="full-section-height">
          <div class="container-fluid px-5">
               <SectionHeader title = "Operasyonlar" text = "Tamamlanan Operasyonlar Gösterilmektedir.." class ="mb-5" />
               <BookList :books = 'paginatedBooks'/>
               <Pagination :currentPage ="currentPage" :totalPages = "totalPages" @page-changed = "updatePage"/>
          </div>
     </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue';
import BookList from '@/components/BookList.vue';
import Pagination from '@/components/Pagination.vue';
import { useBookStore } from '@/stores/bookStore.js';
import { mapState } from 'pinia';
export default {
     name : "BooksView ",
     components : {
          SectionHeader,
          BookList,
          Pagination
          },
     data(){
          return {
               currentPage : 1 ,
               itemsPerPage : 4
               
          }
     },
     computed : {
          ...mapState(useBookStore, ['books']),
          totalPages(){
               return Math.ceil(this.books.length / this.itemsPerPage)
          },
          paginatedBooks(){
               const startIndex = (this.currentPage -1) * this.itemsPerPage;
               const endIndex = startIndex + this.itemsPerPage;
               return this.books.slice().reverse().slice(startIndex, endIndex);
          }
     },
     methods : {
          updatePage(page){
               this.currentPage = page
          },
           },
     }
</script>

<style scoped>
     .auth-box{
          margin-top : -30px;
     }

</style>