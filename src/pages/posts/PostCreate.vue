<script setup>
import PostForm from "./PostForm.vue";
import { createPost } from "../../api/posts";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { ref } from "vue";
const queryClient = useQueryClient();
const router = useRouter();

const formData = ref({
  name: "",
  content: "",
  image_url: "",
  category_id: null,
});

const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
    router.push(`/posts`);
  },
});

const submit = (data) => {
  mutation.mutate(data);
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-8">Создание поста</h1>

    <PostForm
      :model-value="formData"
      @submit="submit"
      @close="router.push('/posts')"
    />
  </div>
</template>
