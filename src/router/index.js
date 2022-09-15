import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CountryDetail from "@/views/CountryDetail";

const routes = [
  {
    props: (route) => {
      return route.query;
    },
    path: "/",
    name: "CountryList",
    component: HomeView,
  },
  {
    props: true,
    path: "/:countryName",
    name: "CountryDetail",
    component: CountryDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
