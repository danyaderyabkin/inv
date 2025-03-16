<template>
  <header class="header pt-8 pb-3">
    <UContainer>
      <div class="border-b pb-6 md:pb-8 flex flex-col md:flex-row gap-5 md:gap-0 justify-between md:items-center">
        <div class="flex justify-between items-center gap-5">
          <h1 class="text-2xl md:text-4xl font-semibold">Список новостей</h1>
          <UButton :ui="{variant:{ghost: 'shadow-sm text-blue-700 rounded-full font-bold'}}" variant="ghost" color="blue" size="xl" icon="octicon:sync" />
        </div>
        <form>
          <UInput variant="none" :ui="{variant: {none: 'shadow-sm focus:shadow-md '}}" trailing icon="iconamoon:search-thin"/>
        </form>
      </div>
    </UContainer>
  </header>
  <main>
    <section>
      <UContainer >
        <div class="flex justify-between items-start">
          <ul class="flex">
            <li v-for="(tab, i) in tabs" :key="i">
              <UButton variant="link" class="font-semibold text-blue-700">
                {{tab.name}}
              </UButton>
            </li>
          </ul>
          <div >
            <UButton @click.prevent="listStyleNews = true" :class="{'text-blue-700': listStyleNews, 'text-gray-300': !listStyleNews}" variant="ghost" class="p-0.5" size="xl" icon="f7:rectangle-grid-1x2-fill"/>
            <UButton @click.prevent="listStyleNews = false" :class="{'text-blue-700': !listStyleNews, 'text-gray-300': listStyleNews}" variant="ghost" class="p-0.5" size="xl" icon="f7:square-grid-2x2-fill"/>
          </div>
        </div>
      </UContainer>
    </section>
    <section class="py-3">
      <UContainer >
        <ul :class="{'md:grid-cols-1': listStyleNews, 'md:grid-cols-2': !listStyleNews}" class="grid grid-cols-1 gap-5">
          <li v-for="item in feed.items" :key="item.guid" class="p-5 shadow flex flex-col md:flex-row gap-5 md:gap-0">
            <img v-show="listStyleNews" class="w-full md:w-48 h-auto md:h-24 flex-shrink-0 mr-5 object-cover" :src="item.enclosure.url" :alt="item.title">
            <div class="flex flex-col w-full">
              <h3 class="text-lg font-semibold mb-3 text-blue-700">{{item.title}}</h3>
              <p class="mb-3 text-sm mt-auto">{{item.contentSnippet}}</p>
              <UButton v-if="!listStyleNews" class="p-0 text-sm text-blue-800 font-medium underline mb-4" variant="link">Подробнее</UButton>
              <div class="flex justify-between">
                <a class="text-gray-300 text-sm underline" href="https://www.mos.ru/" target="_blank">www.mos.ru</a>
                <span class="text-gray-300 text-sm">{{item.pubDate}}</span>
              </div>
            </div>
          </li>
        </ul>
      </UContainer>
    </section>
    <section class="py-8">
      <UContainer >
        <ul class="flex justify-center font-semibold gap-3 text-lg">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>...</li>
          <li>200</li>
        </ul>
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import type {Tab} from '~/types/tabs'
const { data: feed } = await useFetch('/api/parse-rss');
const listStyleNews = ref(false)

const tabs = ref<Tab[]>([
  {name: 'Все', link: 'all'},
  {name: 'Lenta.ru', link: 'lenta'},
  {name: 'Mos.ru', link: 'mos'},
])
</script>