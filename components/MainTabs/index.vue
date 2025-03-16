<script setup lang="ts">
import type { Tab } from '~/types/tabs';
defineProps<{tabs: Tab[];activeTab: number;}>();
const emit = defineEmits(['update:activeTab']);
const setActiveTab = (index: number) => emit('update:activeTab', index)
</script>
<template>
  <ul class="flex">
    <li v-for="(tab, i) in tabs" :key="i">
      <UButton
          @click.prevent="setActiveTab(i)"
          :class="activeTab === i ? 'text-black' : 'text-blue-700'"
          variant="link"
          class="font-semibold hover:text-black"
      >
        {{ tab.name }}
      </UButton>
    </li>
  </ul>
</template>