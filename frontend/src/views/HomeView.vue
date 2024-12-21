
<template>
     <div class = "full-section-height">
          <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="2000" >
          <img src="../assets/images/carousel1.png" class="d-block w-100" alt="First Slide">
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="../assets/images/carousel2.png" class="d-block w-100 img-fluid" alt="Second Slide">
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="../assets/images/carousel3.png" class="d-block w-100" alt="Third Slide">
        </div>
        <div class="carousel-item" data-bs-interval="2000">
          <img src="../assets/images/carousel4.png" class="d-block w-100" alt="Third Slide">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous
        </span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>



    <div id = "aboutUs" class="container mt-5">
        <h1 class = "text-center display-5">Hakkımızda</h1>
        <p class="my-3 text-center">EFENSYS projesi, itfaiyecilerin ve afet kurtarma ekiplerinin karşılaştığı zorluklara teknolojik çözümler üretmek amacıyla kurulmuştur. Yangın güvenliği ve afet kurtarma operasyonlarında inovasyonun gücüne inanarak, akıllı teknolojiler geliştirmeyi misyonumuz haline getirdik. EFENSYS olarak hedefimiz, ileri teknolojiyi kullanarak itfaiyecilerin operasyonel verimliliğini artırmak ve can güvenliğini en üst düzeye çıkarmaktır.
        </p>        
        
        <div class = "row text-center my-5">
          <div class = "col-md-4">
            <font-awesome-icon icon="fa-solid fa-microchip" size="2xl" class="mb-3 mt-4" style="color: var(--secondary-color);" />
            <h3 class = "mb-3">Ürünümüz</h3>
            <p>Akıllı itfaiyeci kaskı, ortamdaki toksik gaz seviyelerini ve sıcaklığı ölçen sensörler, Wi-Fi bağlantısı ve artırılmış gerçeklik (AR) tabanlı bir ekranla donatılmıştır. Raspberry Pi kullanarak veri toplar ve gerçek zamanlı olarak veritabanına iletir. Kask, operasyon verilerini web sitesi üzerinden görüntülenebilir hale getirir.
            </p>
          </div>
          <div class = "col-md-4 ">
            <font-awesome-icon icon="fa-solid fa-rocket" size="2xl" class="mb-3 mt-4" style="color: var(--secondary-color);"/>
            <h3 class = "mb-3">EFENSYS</h3>
            <p>Ürünlerimiz yangın güvenliği ve kurtarma operasyonlarında yenilikçi çözümler getirmektedir. Ekibimiz, itfaiyeciler için akıllı kasklar gibi ileri teknolojileri kullanarak can güvenliğini artırmaya ve operasyonel verimliliği sağlamaya odaklanmaktadır.</p>
          </div>
          <div class = "col-md-4">
            <font-awesome-icon icon="fa-solid fa-user-group"size="2xl" class="mb-3 mt-4" style="color: var(--secondary-color);" />
            <h3 class = "mb-3">Ekibimiz</h3>
            <p>EFENSYS ekibi farklı alanlarda çalışan öğrencilerden oluşmaktadır. Takım kaptanımız Efe Toprakçı projelerimizi yönetmektedir ve Elektromekanik ve Optik alanında katkı sağlamaktadır. Buğra Öztürk yazılım geliştirme sürecini yürütmektedir. Enes Emre Karakaş raporlama ve satın alma süreçlerinden sorumludur. Başar Aktay elektronik ve optik alanında çalışmaktadır.</p>

          </div>
        </div>
      </div>
     </div>
</template>

<script>
     export default {
          name : "HomeView ",
          data(){
               return {
                   
               }
          }   
     }
</script>

<style  scoped>
.carousel-item img {
     height: 400px;
     object-fit: fill;
}

</style>
