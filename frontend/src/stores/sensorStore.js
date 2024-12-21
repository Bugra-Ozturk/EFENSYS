import { defineStore } from "pinia";
import axios from "axios";

export const useSensorStore = defineStore('sensorStore', {
  state: () => ({
     sensors: [],
  }),

  getters: {
    selectedSensor: (state) => {
      return (id) => state.sensors.find((sensor) => sensor._id === id);
    }
  },

  actions: {
    async fetchSensors() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/sensors');
        const data = response.data;

        if (data.sensors && Array.isArray(data.sensors)) {
          this.sensors = data.sensors;
        } else {
          console.error('API response is not in the expected format:', data);
          this.sensors = [];
        }
      } catch (error) {
        console.error('Data retrieval error:', error);
        this.sensors = [];
      }
    },
    async fetchSensorById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/sensors/${id}`);
        const sensor = response.data;

      } catch (error) {
        console.error('Book update error:', error);
      }
    }
  }
});
