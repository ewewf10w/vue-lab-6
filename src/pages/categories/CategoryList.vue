<script setup>
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchCategories, deleteCategory } from "../../api/categories";
import CategoryEdit from "./CategoryEdit.vue";
import CategoryCreate from "./CategoryCreate.vue";
import { ref } from "vue";

const queryClient = useQueryClient();

const { data: categories = [] } = useQuery(["categories"], fetchCategories);

const deleteMutation = useMutation(deleteCategory, {
  onSuccess: () => {
    queryClient.invalidateQueries(["categories"]);
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
  <div>
    <div class="flex">
      <h1>Список категорий</h1>
      <p>Если видишь этот текст — компонент работает</p>
      <button @click="openCategoryCreate">Создать категорию</button>
    </div>

    <table class="table-auto w-full border">
      <thead>
        <tr>
          <th>ID</th>
          <th>Название</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <button @click="editCategory(category)">Редактировать</button>
            <button @click="removeCategory(category.id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <CategoryEdit
      v-if="showCategoryEdit"
      :categoryData="categoryToEdit"
      @close="closeCategoryEdit"
    />

    <CategoryCreate v-if="showCategoryCreate" @close="closeCategoryCreate" />
  </div>
</template>
