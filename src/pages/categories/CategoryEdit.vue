<script setup>
import { updateCategory } from "../../api/categories";
import CategoryForm from "./CategoryForm.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const props = defineProps({
  categoryData: Object,
});

const emit = defineEmits(["close"]);

const queryClient = useQueryClient();

const mutation = useMutation(({ id, data }) => updateCategory(id, data), {
  onSuccess: () => {
    queryClient.invalidateQuieries(["categories"]);
    emit("close");
  },
});

const saveCategory = (formData) => {
  mutation.mutate({ id: props.categoryData.id, data: formData });
};
</script>

<template>
  <div>
    <div>
      <h2>Редактировать категорию</h2>

      <CategoryForm :model-value="categoryData" @submit="saveCategory" />

      <button @click="$emit('close')">Отмена</button>
    </div>
  </div>
</template>
