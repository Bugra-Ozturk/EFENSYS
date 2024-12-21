<template>
     <div class="card border-0 shadow position-relative">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Fire_inside_an_abandoned_convent_in_Massueville%2C_Quebec%2C_Canada.jpg/1280px-Fire_inside_an_abandoned_convent_in_Massueville%2C_Quebec%2C_Canada.jpg"class="card-img-top" alt="">
          <div class="card-body">
               <div class="auth-box">
                    <span style="background-color:var(--primary-color);" class="py-1 px-3 text-white rounded-pill">
                         {{ book.author }}
                    </span>
               </div>
               <h5 class="card-title mt-4 fw-semibold">{{truncatedBookTitle}}</h5>
               <p class="card-text mb-3">{{ truncatedText }}</p>
               <div class="d-flex justify-content-between align-items-center">
                    <a href="#" class=card-link> Read More </a>
                    <p style="background-color: var(--primary-color);" class="py-1 px-2 text-white badge mb-0">{{book.uploadDate}}</p>

               </div>
          </div>

     </div>
</template>

<script>
export default {
     name: "BookItem",
     props : {
          book : {
               type : Object , 
               default : () => ({})
          }
     },
     computed : {
          ratingBadgeClass(){
               if(this.book.rating > 7 ) {
                    return 'bg-success'
               } else if (this.book.rating > 4 ){
                    return 'bg-warning'
               } else {
                    return 'bg-danger'
               }
          },
          truncatedText(){
               if(this.book.description.length >50){
                    return this.book.description.slice(0,50) + '...';
               }
               return this.book.description;
          },
          truncatedBookTitle(){
               if(this.book.title.length > 18){
                    return this.book.title.slice(0,18) + '...';
               }
               return this.book.title;
          }
     }
}
</script>

<style scoped>
.card-text {
     min-height: 70px;
     
}
.card-title {
     font-size: 18px; }
.auth-box {
     font-size: 16px;
}
</style>