import { createRouter, createWebHistory } from "vue-router";

import test from "../pages/test.vue";
import CategoryList from "../pages/categories/CategoryList.vue";
import PostsList from "../pages/posts/PostsList.vue";

const routes = [
  { path: "/", redirect: "/posts" },

  { path: "/categories", component: CategoryList },
  { path: "/test", component: test },
  { path: "/posts", component: PostsList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
