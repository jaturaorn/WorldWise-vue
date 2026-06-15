import { createWebHistory, createRouter } from "vue-router";

import HomepageView from "../views/Homepage.vue";
import LoginView from "../views/Login.vue";
import PageNotFoundView from "../views/PageNotFound.vue";
import PricingView from "../views/Pricing.vue";
import ProductView from "../views/Product.vue";

const routes = [
  { path: "/", Component: HomepageView },
  { path: "/login", component: LoginView },
  { path: "/pagenotfound", component: PageNotFoundView },
  { path: "/pricing", component: PricingView },
  { path: "/product", component: ProductView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
