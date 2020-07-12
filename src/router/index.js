import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Privacy from "../views/Privacy";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create.vue")
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Privacy
  },
  {
    path: "/delete/:token",
    name: "Delete",
    component: () => import("../views/Delete.vue"),
    props: true
  },
  {
    path: "/create/:id/:token",
    name: "CreateResult",
    component: () => import("../views/Create.vue"),
    props: true
  },
  {
    path: "/:id",
    name: "Poll",
    component: () => import("../views/Poll.vue"),
    props: true
  },
  {
    path: "/:id/results",
    name: "Results",
    component: () => import("../views/Results.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
