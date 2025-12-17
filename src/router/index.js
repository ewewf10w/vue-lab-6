import { createRouter, createWebHistory } from "vue-router";

import test from "../pages/test.vue";
import CategoryList from "../pages/categories/CategoryList.vue";

const routes = [
  { path: "/", redirect: "/posts" },

  { path: "/categories", component: CategoryList },
  { path: "/test", component: test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
