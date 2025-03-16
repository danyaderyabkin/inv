<script setup lang="ts">
import type { NewsItem } from '~/types/newsItem';
defineProps<{
  items: NewsItem[],
  listStyle: boolean
}>()
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
</script>

<template>
  <ul :class="{'md:grid-cols-1': listStyle, 'md:grid-cols-2': !listStyle}" class="grid grid-cols-1 transition-all duration-1000 gap-5">
    <li v-for="(item, i) in items" :key="i" class="p-5 shadow flex flex-col md:flex-row gap-5 md:gap-0 transition-all duration-1000">
      <img v-show="listStyle" class="w-full md:w-48 h-auto md:h-24 flex-shrink-0 mr-5 object-cover" :src="item.image" :alt="item.title">
      <div class="flex flex-col w-full">
        <a :href="item.link" target="_blank"><h3 class="text-lg font-semibold mb-3 text-blue-700">{{ item.title }}</h3></a>
        <p class="mb-3 text-sm mt-auto">{{ item.description }}</p>
        <UButton :to="item.link" target="_blank" v-if="!listStyle" class="p-0 text-sm text-blue-800 font-medium underline mb-4" variant="link">Подробнее</UButton>
        <div class="flex justify-between">
          <a class="text-gray-300 text-sm underline" :href="`https://www.${item.categoryName}/`" target="_blank">www.{{ item.categoryName }}</a>
          <span class="text-gray-300 text-sm">{{ formatDate(item.pubDate) }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>

</style>