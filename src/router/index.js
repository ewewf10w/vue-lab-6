import { createRouter, createWebHistory } from "vue-router";

import test from "../pages/test.vue";
import CategoryList from "../pages/categories/CategoryList.vue";
import PostsList from "../pages/posts/PostsList.vue";
import PostCreate from "../pages/posts/PostCreate.vue";
import PostEdit from "../pages/posts/PostEdit.vue";

const routes = [
  { path: "/", redirect: "/posts" },

  { path: "/categories", component: CategoryList },
  { path: "/test", component: test },
  { path: "/posts", component: PostsList },
  { path: "/posts/create", component: PostCreate },
  { path: "/posts/:slug/edit", component: PostEdit },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
