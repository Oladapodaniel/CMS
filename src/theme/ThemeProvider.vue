<!-- ThemeProvider.vue -->
<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { ref, provide, inject, watchEffect } from "vue";
import { lightTheme, darkTheme } from "./theme";

const THEME_CONTEXT = Symbol();

export default {
  setup() {
    const theme = ref(JSON.parse(localStorage.getItem("theme")) || lightTheme); // Initialize theme from localStorage
    const toggleTheme = () => {
      theme.value =
        JSON.stringify(theme.value) === JSON.stringify(lightTheme)
          ? darkTheme
          : lightTheme;
      localStorage.setItem("theme", JSON.stringify(theme.value)); // Save theme to localStorage
    };

    watchEffect(() => {
      if (theme.value.type === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

    provide(THEME_CONTEXT, { theme, toggleTheme });

    return {
      theme,
      toggleTheme,
    };
  },
};

export const useTheme = () => {
  return inject(THEME_CONTEXT);
};
</script>
