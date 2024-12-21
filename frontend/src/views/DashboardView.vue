<template>
  <section class="full-section-height">
    <div class="container mt-4">
      <ul class="nav nav-tabs" id="dashboardTab" role="tablist">
        <li class="nav-item" role="presentation" @click="activeTab = 'general'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'general' }"
            id="general-tab"
            data-bs-toggle="tab"
            data-bs-target="#general-tab-pane"
            type="button"
            role="tab"
            aria-controls="general-tab-pane"
            aria-selected="true"
          >
            Genel Ayarlar
          </button>
        </li>

        
        <li
          class="nav-item"
          role="presentation"
          @click="activeTab = 'operations'"
        >
          <button
            class="nav-link"
            :class="{ active: activeTab === 'operations' }"
            id="operations-tab"
            data-bs-toggle="tab"
            data-bs-target="#operations-tab-pane"
            type="button"
            role="tab"
            aria-controls="operations-tab-pane"
            aria-selected="false"
          >
            Operasyonlar
          </button>
        </li>
      </ul>
      <div class="tab-content py-4" id="dashboardContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'general' }"
          id="general-tab-pane"
          role="tabpanel"
          aria-labelledby="general-tab"
          tabindex="0"
        >
        <DashboardGeneral/>
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'operations' }"
          id="operations-tab-pane"
          role="tabpanel"
          aria-labelledby="operations-tab"
          tabindex="0"
        >
          <DashboardOperations/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import DashboardGeneral from '@/components/dashboard/DashboardGeneral.vue';
import DashboardOperations from '@/components/dashboard/DashboardOperations.vue';
import { useAuthStore } from "@/stores/authStore.js";
import { mapState} from "pinia";


export default {
  name: "DashboardView ",
  components : {  DashboardGeneral,
                  DashboardOperations,

  },
  data() {
    return {
      activeTab: "operations",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },

  
};
</script>

<style scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
}
.nav-tabs {
  border-color: var(--secondary-color);
}
.nav-link.active {
  color: #fff;
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
