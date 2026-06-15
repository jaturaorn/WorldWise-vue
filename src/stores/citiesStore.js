import { defineStore } from "pinia";

export const useCitiesStore = defineStore("cities", {
  state: () => {
    return { cities: [], isLoading: false, currentCity: {}, error: "" };
  },
  getters: {
    countries(state) {
      return state.cities.reduce((acc, city) => {
        if (!acc.includes(city.country)) {
          acc.push(city.country);
        }
        return acc;
      }, []);
    },
  },
  actions: {
    async fetchCities() {
      this.isLoading = true;
      try {
        const response = await fetch(
          "https://worldwise-api.onrender.com/cities",
        );
        const data = await response.json();
        this.cities = data;
      } catch (error) {
        this.error = "Failed to fetch cities";
        console.error("Error fetching cities:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getCity(id) {
      this.isLoading = true;
      try {
        const response = await fetch(
          `https://worldwise-api.onrender.com/cities/${id}`,
        );
        const data = await response.json();
        this.currentCity = data;
      } catch (error) {
        this.error = "Failed to fetch city";
        console.error("Error fetching city:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async createCity(newCity) {
      this.isLoading = true;
      try {
        const response = await fetch(
          "https://worldwise-api.onrender.com/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCity),
          },
        );
        const data = await response.json();
        this.cities.push(data);
      } catch (error) {
        this.error = "Failed to create city";
        console.error("Error creating city:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCity(id) {
      this.isLoading = true;
      try {
        await fetch(`https://worldwise-api.onrender.com/cities/${id}`, {
          method: "DELETE",
        });
        this.cities = this.cities.filter((city) => city.id !== id);
      } catch (error) {
        this.error = "Failed to delete city";
        console.error("Error deleting city:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
