import { createWebHistory, createRouter } from "vue-router";

import HomepageView from "../views/Homepage.vue";
import LoginView from "../views/Login.vue";
import PageNotFoundView from "../views/PageNotFound.vue";
import PricingView from "../views/Pricing.vue";
import ProductView from "../views/Product.vue";
import CityList from "../components/CityList.vue";
import CountryList from "../components/CountryList.vue";
import City from "../components/City.vue";
import Form from "../components/Form.vue";
import AppLayoutView from "../views/AppLayout.vue";

const routes = [
  { path: "/", component: HomepageView },
  { path: "/login", component: LoginView },
  { path: "/pagenotfound", component: PageNotFoundView },
  { path: "/pricing", component: PricingView },
  { path: "/product", component: ProductView },
  {
    path: "/applayout",
    component: AppLayoutView,
    children: [
      { path: "cities", component: CityList },
      { path: "countries", component: CountryList },
      { path: "cities/:id", component: City },
      { path: "form", component: Form },
      { path: "", redirect: "/applayout/cities" },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
