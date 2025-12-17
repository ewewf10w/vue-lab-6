<script setup>
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchCategories, deleteCategory } from "../../api/categories";
import { computed, ref } from "vue";
import CategoryCreate from "./CategoryCreate.vue";
import CategoryEdit from "./CategoryEdit.vue";

const queryClient = useQueryClient();

const query = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});
const categories = computed(() => query.data.value ?? []);

const deleteMutation = useMutation({
  mutationFn: deleteCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  },
});

const showCategoryEdit = ref(false);
const categoryToEdit = ref(null);

const editCategory = (category) => {
  categoryToEdit.value = { ...category };
  showCategoryEdit.value = true;
};

const closeCategoryEdit = () => {
  showCategoryEdit.value = false;
  categoryToEdit.value = null;
};

const showCategoryCreate = ref(false);
const openCategoryCreate = () => {
  showCategoryCreate.value = true;
};
const closeCategoryCreate = () => {
  showCategoryCreate.value = false;
};

const removeCategory = (id) => {
  if (confirm("Вы действительно хотите удалить категорию?")) {
    deleteMutation.mutate(id);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Заголовок и кнопка создания -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Список категорий</h1>
      <button
        @click="openCategoryCreate"
        class="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        Создать категорию
      </button>
    </div>

    <!-- Таблица категорий -->
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">
              ID
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">
              Название
            </th>
            <th class="px-6 py-4 text-left text-sm font-medium text-gray-700">
              Действия
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="category in categories"
            :key="category.id"
            class="hover:bg-gray-50 transition"
          >
            <td class="px-6 py-4 text-sm text-gray-900">{{ category.id }}</td>
            <td class="px-6 py-4 text-sm text-gray-900 font-medium">
              {{ category.name }}
            </td>
            <td class="px-6 py-4 text-sm">
              <button
                @click="editCategory(category)"
                class="text-blue-600 hover:text-blue-800 font-medium mr-4"
              >
                Редактировать
              </button>
              <button
                @click="removeCategory(category.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Пустое состояние -->
      <div
        v-if="categories.length === 0"
        class="text-center py-12 text-gray-500"
      >
        Нет категорий. Создайте первую!
      </div>
    </div>

    <!-- Модальные окна (просто поверх контента) -->
    <div
      v-if="showCategoryEdit || showCategoryCreate"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <CategoryEdit
          v-if="showCategoryEdit"
          :categoryData="categoryToEdit"
          @close="closeCategoryEdit"
        />
        <CategoryCreate
          v-else-if="showCategoryCreate"
          @close="closeCategoryCreate"
        />
      </div>
    </div>
  </div>
</template>
