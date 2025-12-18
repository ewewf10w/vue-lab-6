import { useQuery } from "@tanstack/vue-query";
import { fetchCategories } from "../api/categories";
import { computed } from "vue";

export function useCategoriesMap() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categoryMap = computed(() => {
    const map = {};
    (categoriesQuery.data.value ?? []).forEach((c) => {
      map[c.id] = c.name;
    });
    return map;
  });

  const getCategoryName = (id) => {
    return categoryMap.value[id] || "—";
  };

  return {
    categoryMap,
    getCategoryName,
  };
}
