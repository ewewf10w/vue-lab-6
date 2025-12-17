<script setup>
import { createCategory } from "../../api/categories";
import CategoryForm from "./CategoryForm.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const emit = defineEmits(["close"]);
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: createCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    emit("close");
  },
});

const categoryCreate = (formData) => {
  mutation.mutate(formData);
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Создать категорию</h2>

    <CategoryForm
      :model-value="{ name: '' }"
      :loading="mutation.isPending"
      @submit="categoryCreate"
      @close="emit('close')"
    />
  </div>
</template>
