import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import "@/assets/styles.css";

import { createApp } from "vue";

import App from "@/App.vue";
import router from "@/router/index.js";
import { createPinia } from "pinia";
import { useBookStore } from "@/stores/bookStore.js";
import { useSensorStore } from "@/stores/sensorStore.js";
import { useAuthStore } from "@/stores/authStore.js";
import axios from 'axios';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons*/
import { faCircleLeft } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faMicrochip } from '@fortawesome/free-solid-svg-icons';
import {faRocket} from "@fortawesome/free-solid-svg-icons"
import {faUserGroup} from "@fortawesome/free-solid-svg-icons"
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {faPenToSquare} from "@fortawesome/free-regular-svg-icons"
import {faTrash} from "@fortawesome/free-solid-svg-icons"
library.add(faCircleLeft, faHeart, faEnvelope, faPhone, faLocationDot,faArrowRightFromBracket,faMicrochip,faRocket,faUserGroup,faFacebook, faTwitter, faLinkedin,faPenToSquare,faTrash);

const pinia = createPinia();

const storedUser = localStorage.getItem('user');
if(storedUser) {
  const userData = JSON.parse(storedUser);
  useAuthStore(pinia).user = userData;

   const token = userData.token;
   if(token) {
     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   }
}

const bookStore = useBookStore(pinia);
const sensorStore = useSensorStore(pinia);


const init = async() => {
  try {
    await Promise.all([bookStore.fetchBooks(),sensorStore.fetchSensors()]);
    const app = createApp(App);
    app
      .use(pinia)
      .use(router)
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(Toast)
      .mount("#app");
  } catch (error) {
    console.error(error);
  }
}
init();
// bookStore.fetchBooks().then(sensorStore.fetchSensors()).then(() => {
//   const app = createApp(App);
//   app
//     .use(pinia)
//     .use(router)
//     .component("font-awesome-icon", FontAwesomeIcon)
//     .use(Toast)
//     .mount("#app");
// });

