<script setup>
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchPostBySlug, updatePost, deletePost } from "../../api/posts";
import PostForm from "./PostForm.vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();

const slug = computed(() => route.params.slug);

const { data: post } = useQuery({
  queryKey: ["post", slug],
  queryFn: () => fetchPostBySlug(slug.value),
});

const formData = ref({
  name: "",
  content: "",
  image_url: "",
  category_id: null,
});

const deleteMutation = useMutation({
  mutationFn: (slug) => deletePost(slug),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    router.push("/posts");
  },
});

const removePost = () => {
  if (confirm("Удалить пост?")) {
    deleteMutation.mutate(slug.value);
  }
};

watch(
  post,
  (newPost) => {
    if (newPost) {
      formData.value = {
        name: newPost.name || "",
        content: newPost.content || "",
        image_url: newPost.image_url || "",
        category_id: newPost.category_id || null,
      };
    }
  },
  { immediate: true }
);

const updateMutation = useMutation({
  mutationFn: (formData) => updatePost(slug.value, formData),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    queryClient.invalidateQueries({ queryKey: ["post", slug] });
    router.push("/posts");
  },
});

const submit = (formData) => {
  updateMutation.mutate(formData);
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">Редактировать пост</h1>
    <PostForm
      :model-value="formData"
      @submit="submit"
      @close="router.push('/posts')"
    />

    <div class="flex justify-end mt-5">
      <button
        @click="removePost"
        class="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
      >
        Удалить
      </button>
    </div>
  </div>
</template>
