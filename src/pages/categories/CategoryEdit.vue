<script setup>
import { updateCategory } from "../../api/categories";
import CategoryForm from "./CategoryForm.vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const props = defineProps({
  categoryData: Object,
});

const emit = defineEmits(["close"]);

const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: ({ id, data }) => updateCategory(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    emit("close");
  },
});

const saveCategory = (formData) => {
  mutation.mutate({ id: props.categoryData.id, data: formData });
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">
      Редактировать категорию
    </h2>

    <CategoryForm
      :model-value="props.categoryData"
      :loading="mutation.isPending"
      @submit="saveCategory"
      @close="emit('close')"
    />
  </div>
</template>
