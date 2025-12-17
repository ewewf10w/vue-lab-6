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
  <div>
    <label>Название категории:</label>
    <input v-model="form.name" placeholder="Введите название" />
    <button @click="submit">Принять</button>
  </div>
</template>
