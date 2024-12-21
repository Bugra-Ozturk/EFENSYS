<template>
  <section>
    <div class="container full-section-height" v-if="!loading">
      <SectionHeader class="mt-5" :title="book.title" :text="book.author" />
      <font-awesome-icon
        :icon="['far', 'circle-left']"
        size="2xl"
        class="mb-3"
        style="color: var(--primary-color); cursor: pointer"
        @click="goToBackBooks"
      />
      <div class="row mb-5">
        <!-- Graphics and Alerts -->
        <div class="col-lg-6 p-3">
          <canvas id="gasChart"></canvas>
        </div>

        <div class="col-lg-6 details-wrapper">
          <div class="row">
            <div
              v-if="explosionWarnings.length > 0"
              class="alert alert-danger mt-3 col-lg-6"
            >
              <strong>Patlama Riski Uyarıları:</strong>
              <ul>
                <li v-for="warning in explosionWarnings" :key="warning">
                  {{ warning }}
                </li>
              </ul>
            </div>

            <div
              v-if="exposureWarnings.length > 0"
              class="alert alert-warning mt-3 col-lg-6"
            >
              <strong>Uzun Süreli Maruz Kalma Uyarıları:</strong>
              <ul>
                <li v-for="warning in exposureWarnings" :key="warning">
                  {{ warning }}
                </li>
              </ul>
            </div>
          </div>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Operator</th>
                <th>Metan</th>
                <th>Propan</th>
                <th>İzobütan</th>
                <th>Hidrojen</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ book.author }}</td>
                <td
                  :class="{
                    'text-danger':
                      latestMeasurement?.methane > thresholds.methane,
                  }"
                >
                  {{ latestMeasurement?.methane || "Veri Yok" }}
                </td>
                <td
                  :class="{
                    'text-danger':
                      latestMeasurement?.propane > thresholds.propane,
                  }"
                >
                  {{ latestMeasurement?.propane || "Veri Yok" }}
                </td>
                <td
                  :class="{
                    'text-danger':
                      latestMeasurement?.isobutane > thresholds.isobutane,
                  }"
                >
                  {{ latestMeasurement?.isobutane || "Veri Yok" }}
                </td>
                <td
                  :class="{
                    'text-danger':
                      latestMeasurement?.hydrogen > thresholds.hydrogen,
                  }"
                >
                  {{ latestMeasurement?.hydrogen || "Veri Yok" }}
                </td>
              </tr>
            </tbody>
          </table>

          <p class="lead description">{{ book.description }}</p>
          <div class="mt-3">
            <strong>Güncellenme Tarihi:</strong>
            {{ formatDate(book.updatedAt) }}
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="d-flex justify-content-center full-section-height">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from "@/components/SectionHeader.vue";
import { useBookStore } from "@/stores/bookStore.js";
import { Chart, registerables } from "chart.js";
import { nextTick } from "vue";

Chart.register(...registerables);

export default {
  name: "BookDetailView",
  components: {
    SectionHeader,
  },
  data() {
    return {
      book: null,
      loading: true,
      chart: null,
      latestMeasurement: null,
      explosionWarnings: [],
      exposureWarnings: [],
      thresholds: {
        explosion: {
          methane: 5000,
          propane: 2100,
          isobutane: 1800,
          hydrogen: 4000,
        },
        exposure: {
          methane: 1000,
          propane: 800,
          isobutane: 600,
          hydrogen: 1000,
        },
      },
    };
  },
  async created() {
    const bookStore = useBookStore();
    await bookStore.fetchBooks();
    this.selectBook();
    await nextTick(); // Wait for the DOM to load completely
    this.extractLatestMeasurement();
    this.checkThresholds();
    this.createChart();
    this.startAutoRefresh();
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    goToBackBooks() {
      this.$router.push({ name: "books" });
    },
    selectBook() {
      const bookId = this.$route.params.id;
      const bookStore = useBookStore();
      this.book = bookStore.selectedBook(bookId);
      this.loading = false;
    },
    extractLatestMeasurement() {
      if (
        this.book &&
        this.book.measurements &&
        this.book.measurements.length > 0
      ) {
        this.latestMeasurement =
          this.book.measurements[this.book.measurements.length - 1];
      } else {
        this.latestMeasurement = null;
      }
    },
    checkThresholds() {
      this.explosionWarnings = [];
      this.exposureWarnings = [];
      if (!this.latestMeasurement) return;

      // risk of explosion
      Object.keys(this.thresholds.explosion).forEach((gas) => {
        if (this.latestMeasurement[gas] > this.thresholds.explosion[gas]) {
          this.explosionWarnings.push(
            `${gas.toUpperCase()}: ${this.latestMeasurement[gas]} PPM`
          );
        }
      });

      // long term exposure
      Object.keys(this.thresholds.exposure).forEach((gas) => {
        if (this.latestMeasurement[gas] > this.thresholds.exposure[gas]) {
          this.exposureWarnings.push(
            `${gas.toUpperCase()}: ${this.latestMeasurement[gas]} PPM `
          );
        }
      });
    },
    createChart() {
      if (
        !this.book ||
        !this.book.measurements ||
        this.book.measurements.length === 0
      ) {
        console.warn("Grafik oluşturulacak ölçüm verisi yok.");
        return;
      }

      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      const ctx = document.getElementById("gasChart")?.getContext("2d");

      if (!ctx) {
        console.error("Canvas öğesi bulunamadı.");
        return;
      }

      const recentMeasurements = this.book.measurements.slice(-10);

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: recentMeasurements.map((m) =>
            new Date(m.date).toLocaleString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          ),
          datasets: [
            {
              label: "Metan",
              data: recentMeasurements.map((m) => m.methane),
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              pointBackgroundColor: recentMeasurements.map((m) =>
                m.methane > this.thresholds.methane
                  ? "red"
                  : "rgba(255, 99, 132, 1)"
              ),
            },
            {
              label: "Propan",
              data: recentMeasurements.map((m) => m.propane),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              pointBackgroundColor: recentMeasurements.map((m) =>
                m.propane > this.thresholds.propane
                  ? "red"
                  : "rgba(54, 162, 235, 1)"
              ),
            },
            {
              label: "İzobütan",
              data: recentMeasurements.map((m) => m.isobutane),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              pointBackgroundColor: recentMeasurements.map((m) =>
                m.isobutane > this.thresholds.isobutane
                  ? "red"
                  : "rgba(75, 192, 192, 1)"
              ),
            },
            {
              label: "Hidrojen",
              data: recentMeasurements.map((m) => m.hydrogen),
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.2)",
              pointBackgroundColor: recentMeasurements.map((m) =>
                m.hydrogen > this.thresholds.hydrogen
                  ? "red"
                  : "rgba(255, 206, 86, 1)"
              ),
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              title: { display: true, text: "Zaman" },
            },
            y: {
              title: { display: true, text: "PPM" },
            },
          },
        },
      });
    },
    startAutoRefresh() {
      this.intervalId = setInterval(async () => {
        const bookStore = useBookStore();
        await bookStore.fetchBooks();
        this.selectBook();
        this.extractLatestMeasurement();
        this.checkThresholds();

        if (this.chart) {
          this.chart.destroy();
        }
        this.createChart();
      }, 10000);
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleString("tr-TR", options);
    },
  },
};
</script>

<style scoped>
.details-wrapper {
  max-height: 740px;
  display: flex;
  flex-direction: column;
}

/* Operation description field */
.description {
  min-height: 120px;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 5px;
}

/* Graphics area */
canvas {
  max-width: 100%;
  max-height: 500px;
  min-height: 500px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

/* Tablo Layout */
.table {
  border-collapse: separate; /* Ayrı hücre stilleri */
  border-spacing: 3px 10px; /* Satırların arasına boşluk */
}

.table thead {
  background-color: #343a40;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}

.table tbody tr {
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
}

.table td,
.table th {
  text-align: center;
  vertical-align: middle;
  padding: 8px;
}

.table .text-danger {
  color: #dc3545;
  font-weight: bold;
}

.table .text-success {
  color: #28a745;
  font-weight: bold;
}

.alert {
  padding: 5px;
  border-radius: 5px;
  margin-top: 20px;
  font-size: 1rem;
}

.alert-danger {
  background-color: #0000;
  color: #b6323f;
  border: #ffff;
}

.alert-warning {
  background-color: #ffff;
  color: #c99702;
  border: 1px solid #ffff;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.font-awesome-icon {
  cursor: pointer;
  color: var(--primary-color);
  transition: transform 0.2s;
}

.highlight-danger {
  color: #dc3545;
  font-weight: bold;
}

.highlight-warning {
  color: #ffc107;
  font-weight: bold;
}

.highlight-info {
  color: #17a2b8;
  font-weight: bold;
}

@media (max-width: 768px) {
  .details-wrapper {
    margin-top: 20px;
  }

  canvas {
    max-height: 400px;
  }
}
</style>
