<script setup>
import { ref, computed } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchPosts, deletePost } from "../../api/posts";
import { useCategoriesMap } from "../../composables/useCategoriesMap";

const queryClient = useQueryClient();

const search = ref("");

const postsQuery = useQuery({
  queryKey: ["posts", search],
  queryFn: () => fetchPosts(search.value),
});

const posts = computed(() => postsQuery.data.value ?? []);

const deleteMutation = useMutation({
  mutationFn: deletePost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});

const removePost = (slug) => {
  if (confirm("Удалить пост?")) {
    deleteMutation.mutate(slug);
  }
};

const { getCategoryName } = useCategoriesMap();
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-3xl font-bold text-gray-800">Список постов</h1>
      <RouterLink
        to="/posts/create"
        class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        Создать пост
      </RouterLink>
    </div>

    <div class="mb-8">
      <input
        v-model="search"
        placeholder="Поиск по названию"
        class="w-full px-5 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-sm"
      />
    </div>

    <div class="gap-8">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-xl shadow-md overflow-hidden mb-8"
      >
        <div class="p-6">
          <div class="relative">
            <div class=""></div>
            <div class="absolute right-0 flex gap-1">
              <RouterLink :to="`/posts/${post.slug}/edit`"
                ><img class="w-5" src="../../assets/edit.png" alt=""
              /></RouterLink>
              <button class="cursor-pointer" @click="removePost(post.slug)">
                <img class="w-5" src="../../assets/recycle-bin.png" alt="" />
              </button>
            </div>

            <div v-if="post.image_url" class="flex justify-center mb-5">
              <img :src="post.image_url" alt="" />
            </div>

            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              {{ post.name }}
            </h3>

            <p class="text-md text-gray-800 mb-5">
              {{ post.content }}
            </p>

            <div class="text-right text-sm">
              Категория: {{ getCategoryName(post.category_id) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="posts && posts.length === 0"
      class="text-center py-16 text-gray-500 text-xl"
    >
      Постов не найдено
    </div>
  </div>
</template>
