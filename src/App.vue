<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Chip from 'primevue/chip'
import IconLogo from './components/icons/IconLogo.vue'
import { useUiStore } from './stores/uiStore'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { showSidebar } = storeToRefs(uiStore)
</script>

<template>
  <div class="flex">
    <header class="items-start">
      <div class="pl-11 py-11 bg-gray-primary h-screen w-[370px] transition-all overflow-hidden"
        :class="{ '!w-0': !showSidebar }">
        <IconLogo class="mb-9" />
        <nav class="flex flex-col gap-9 text-xl font-bold">
          <div class="flex justify-between">
            <RouterLink to="/">Home
            </RouterLink>
            <Chip label="3" class="bg-secondary-red w-7 flex items-center justify-center text-white rounded-xl mr-5" />

          </div>
          <RouterLink to="/">People</RouterLink>
          <RouterLink to="/">Products</RouterLink>
          <RouterLink to="/">Categories</RouterLink>
        </nav>
      </div>
    </header>
    <div class="px-12 pt-14 w-full">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
header {
  @apply max-h-screen leading-6
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
