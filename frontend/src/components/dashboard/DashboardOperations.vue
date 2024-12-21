<template>
  <!-- Button -->
  <div class="row mb-3">
    <div class="col text-end mb-2">
      <button type="button" class="btn btn-primary" @click="modal.show()">
        Migfer-s2 Bağlan
      </button>
    </div>
  </div>
  
  <div>
    
  </div>
  
  <!-- Table -->
  <div class="row">
    <div class="col">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Operasyonlar</th>
              <th>Operatör</th>
              <th>Açıklama</th>
              <th>Düzenle</th>
              <th>Sil</th>
            </tr>
          </thead>
          <TransitionGroup name="list" tag="tbody">
            <tr v-for="book in books" :key="book._id">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>
                <div class="details-wrapper w-100">
                  <p class="description">{{ book.description }}</p>
                </div>
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['far', 'pen-to-square']"
                  class="text-warning"
                  style="cursor: pointer"
                  @click="editBook(book)"
                />
              </td>
              <td class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer"
                  @click="deleteBook(book._id , book.title)"
                />
              </td>
            </tr>
          </TransitionGroup>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade" ref="addEditModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addModalLabel">Migfer-s2 Bağlan</h5>
          <button
            type="button"
            @click="modal.hide()"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body mx-5">
          <div class="col mb-3">
            <label for="title" class="form-label">Operasyon adı <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="title"
              name="title"
              required
              v-model="newBook.title"
            />
          </div>
          <div class="col mb-3">
            <label for="author" class="form-label">Operatör <span class="text-danger">*</span></label>
            <input
              type="text"
              class="form-control"
              id="author"
              name="author"
              required
              v-model="newBook.author"
            />
          </div>
          <div class="col mb-3">
            <label for="description" class="form-label">Açıklama <span class="text-danger">*</span></label>
            <textarea
              name="description"
              id="description"
              class="form-control"
              cols="30"
              rows="10"
              v-model="newBook.description"
            ></textarea>
          </div>
          <div class="text-end">
            <button
              @click="modal.hide()"
              type="button"
              class="btn btn-outline-secondary"
            >
              Kapat
            </button>
            <button @click="addBook" type="button" class="btn btn-primary">
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBookStore } from "@/stores/bookStore.js";
import { mapActions, mapState } from "pinia";
import { Modal } from "bootstrap";
import { useToast } from "vue-toastification";

export default {
  name: "DashboardOperations",
  data() {
    return {
      modal: null,
      newBook: {
        title: "",
        author: "",
        description: "",
      },
    };
  },
  computed: {
    ...mapState(useBookStore, ['books']),
  },
  methods: {
    ...mapActions(useBookStore, ["addNewBook", "deleteTheBook"]),
    async deleteBook(bookId,bookTitle){
      try {
        await this.deleteTheBook(bookId);
        const toast = useToast();
        toast.warning(`${bookTitle} başarıyla silindi.`, {
          position: "top-right",
          timeout: 1500,
          closeButton: "button",
          icon: true,
        });
      } catch (error) {}
    },
    async addBook() {
      try {
        await this.addNewBook(this.newBook);

        this.modal.hide();
        this.newBook = {
          title: "",
          author: "",
          description: "",
        };
        const toast = useToast();
        toast.success("Yeni Operasyon Oluşturuldu..", {
          position: "top-right",
          timeout: 1500,
          closeButton: "button",
          icon: true,
        });
      } catch (error) {}
    },
    editBook(book) {
      // will be completed
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.addEditModal);
  },
};
</script>

<style scoped>
.details-wrapper {
  max-height: 740px;
  display: flex;
  flex-direction: column;
}

.description {
  min-height: 120px;
  max-height: 130px;
  overflow-y: auto;
}
.btn-outline-secondary {
  border-radius: 25px;
  height: 40px;
  margin-right: 20px;
  min-width: 100px;
}
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
