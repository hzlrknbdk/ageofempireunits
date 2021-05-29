import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/units",
    name: "Units",
    component: () => import("@/views/UnitsPage.vue")
  },
  {
    path: "/unitsDetail/:id?",
    name: "UnitsDetail",
    component: () => import("@/views/UnitsDetailPage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
