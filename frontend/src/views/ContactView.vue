<template>
  <section class="contact-section align-items-center">
    <div class="container">
      <SectionHeader
        title="İletişim"
        text="İletişim Kanallarımız Aşağıda Gösterilmektedir"
      />

      <div class="row m-5 text-center">
        <div class="col-md-4 d-flex flex-column align-items-center mb-4">
          <font-awesome-icon
            icon="fa-solid fa-location-dot"
            size="2xl"
            style="color: var(--secondary-color)"
            class="mb-3"
          />
          <span class="fs-5"
            >Erzene, Ege Üniversitesi, No:172, 3504 Bornova/İzmir</span
          >
        </div>
        <div class="col-md-4 d-flex flex-column align-items-center mb-4">
          <font-awesome-icon
            icon="fa-solid fa-phone"
            size="2xl"
            style="color: var(--secondary-color)"
            class="mb-3"
          />
          <span class="fs-5">+90 555 555 55 55</span>
        </div>
        <div class="col-md-4 d-flex flex-column align-items-center">
          <font-awesome-icon
            icon="fa-regular fa-envelope"
            size="2xl"
            style="color: var(--secondary-color)"
            class="mb-3"
          />
          <span class="fs-5">
            <a class="text-dark" href=""
              >bugrao7turk@gmail.com</a
            >
          </span>
        </div>
      </div>
      <!--Map-->
      <div class="pt-5 mt-5">
        <div class="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.5635274785673!2d27.225870175383182!3d38.4515495728888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b97cd3dfd51207%3A0x70bb104eb92d852d!2zRWdlIMOcbml2ZXJzaXRlc2kgTWFraW5lIE3DvGhlbmRpc2xpxJ9pIELDtmzDvG3DvA!5e0!3m2!1str!2str!4v1719521761077!5m2!1str!2str"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";

export default {
  name: "ContactView",
  components: {
    SectionHeader,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    };
  },
  methods: {
    async sendEmail() {
      const emailData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        message: this.message,
      };

      try {
        const response = await fetch('http://localhost:3000/api/v1/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (response.ok) {
          alert('Email sent successfully!');
          // Formu temizle
          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.message = '';
        } else {
          alert('Failed to send email.');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred while sending email.');
      }
    },
  },

};
</script>

<style scoped>



.contact-section {
  padding: 50px 0;
}
span {
  color: black;
}
.contact-info {
  margin-top: 3rem;
  margin-bottom: 50px;
}

.contact-map {
  margin-bottom: 50px;
  border-radius: 10px; /* Add border radius for rounded corners */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
  overflow: hidden; /* Hide overflow if the map content exceeds the container */
}

.contact-map iframe {
  width: 100%;
  height: 400px;
}
label   {
  font-size: 20px;
  color : var(--primary-color)
}
</style>
