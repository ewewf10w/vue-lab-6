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
  <div>
    <div>
      <h2>Создать категорию</h2>

      <CategoryForm :model-value="{ name: '' }" @submit="categoryCreate" />
    </div>
  </div>
</template>
