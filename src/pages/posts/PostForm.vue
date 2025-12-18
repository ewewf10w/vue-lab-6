<script setup>
import { ref, watch } from "vue";
import { useCategoriesMap } from "../../composables/useCategoriesMap";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "submit"]);

const { categoryMap } = useCategoriesMap();

const form = ref({
  name: props.modelValue?.name || "",
  content: props.modelValue?.content || "",
  image_url: props.modelValue?.image_url || "",
  category_id: props.modelValue?.category_id || null,
});

watch(
  () => props.modelValue,
  (newVal) => {
    form.value = {
      name: newVal.name || "",
      content: newVal.content || "",
      image_url: newVal.image_url || "",
      category_id: newVal.category_id || null,
    };
  },
  { deep: true, immediate: true }
);

const submit = () => {
  emit("submit", { ...form.value });
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-6">
    <div>
      <label class="block font-bold mb-1">Название</label>
      <input
        v-model="form.name"
        type="text"
        required
        placeholder="Введите название поста"
        class="border p-2 w-full rounded"
      />
    </div>

    <div>
      <label class="block font-bold mb-1">Контент</label>
      <textarea
        v-model="form.content"
        required
        rows="8"
        placeholder="Текст поста"
        class="border p-2 w-full rounded"
      ></textarea>
    </div>

    <div>
      <label class="block font-bold mb-1">URL картинки (опционально)</label>
      <input
        v-model="form.image_url"
        type="url"
        placeholder="https://example.com/image.jpg"
        class="border p-2 w-full rounded"
      />
    </div>

    <div>
      <label class="block font-bold mb-1">Категория</label>
      <select
        v-model.number="form.category_id"
        required
        class="border p-2 w-full rounded"
      >
        <option :value="null" disabled>Выберите категорию</option>
        <option v-for="(name, id) in categoryMap" :key="id" :value="id">
          {{ name }}
        </option>
      </select>
    </div>

    <div class="flex justify-end gap-4">
      <button
        type="button"
        @click="$emit('close')"
        class="px-5 py-2 bg-gray-300 rounded"
      >
        Отмена
      </button>
      <button type="submit" class="px-5 py-2 bg-blue-600 text-white rounded">
        Сохранить
      </button>
    </div>
  </form>
</template>
