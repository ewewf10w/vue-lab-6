import { createRouter, createWebHistory } from "vue-router";

import CategoryList from "../pages/categories/CategoryList.vue";
import test from "../pages/test.vue";

const routes = [
  { path: "/", redirect: "/posts" },

  { path: "/categories", component: CategoryList },
  { path: "/test", component: Test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
