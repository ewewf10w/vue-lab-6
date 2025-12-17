<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["submit"]);

const form = ref({ name: "" });

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    }
  },
  { immediate: true }
);

const submit = () => {
  emit("submit", form.value);
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Название категории
      </label>
      <input
        v-model="form.name"
        type="text"
        required
        placeholder="Введите название"
        class="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
      />
    </div>

    <div class="flex justify-end gap-4">
      <button
        type="button"
        @click="$emit('close')"
        class="px-6 py-3 text-gray-700 bg-gray-200 font-medium rounded-lg hover:bg-gray-300 transition"
      >
        Отмена
      </button>
      <button
        type="submit"
        class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>
