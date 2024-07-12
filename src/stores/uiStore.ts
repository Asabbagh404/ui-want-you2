import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("uiStore", () => {
  const showSidebar = ref(true);
  function toggleSidebar() {
    showSidebar.value = !showSidebar.value;
  }

  return {
    showSidebar,
    toggleSidebar
  };
});
