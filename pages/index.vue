<template>
  <header class="header pt-8 pb-3">
    <UContainer>
      <div class="border-b pb-6 md:pb-8 flex flex-col md:flex-row gap-5 md:gap-0 justify-between md:items-center">
        <div class="flex justify-between items-center gap-5">
          <h1 class="text-2xl md:text-4xl font-semibold">Список новостей</h1>
          <UButton @click.prevent="refreshAllfiters" :ui="{variant:{ghost: 'shadow-sm text-blue-700 rounded-full font-bold'}}" :class="{'animate-spin': reloadAllfilters}" variant="ghost" color="blue" size="xl" icon="octicon:sync" />
        </div>
        <form>
          <UInput v-model="searchText" variant="none" :ui="{variant: {none: 'shadow-sm focus:shadow-md '}}" trailing icon="iconamoon:search-thin"/>
        </form>
      </div>
    </UContainer>
  </header>
  <main>
    <section>
      <UContainer>
        <div class="flex justify-between items-start">
          <MainTabs :tabs="tabs" :active-tab="activeTab" @update:active-tab="setActiveTab" />
          <div>
            <UButton @click.prevent="listStyleNews = true" :class="{'text-blue-700': listStyleNews, 'text-gray-300': !listStyleNews}" variant="ghost" class="p-0.5" size="xl" icon="f7:rectangle-grid-1x2-fill"/>
            <UButton @click.prevent="listStyleNews = false" :class="{'text-blue-700': !listStyleNews, 'text-gray-300': listStyleNews}" variant="ghost" class="p-0.5" size="xl" icon="f7:square-grid-2x2-fill"/>
          </div>
        </div>
      </UContainer>
    </section>
    <section class="py-3">
      <UContainer>
        <ProductList :items="currentNews" :list-style="listStyleNews"/>
      </UContainer>
    </section>
    <section class="py-8">
      <UContainer>
        <MainPagination :current-page="currentPage" :total-pages="paginatedNews.length" @update:current-page="setPage" />
      </UContainer>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { Tab } from '~/types/tabs';
import { useNews } from '~/stores/newsStore';
import type { NewsItem } from '~/types/newsItem';

const store = useNews();
const route = useRoute();
const router = useRouter();

const listStyleNews = ref<boolean>(false);
const searchText = ref<string>('');
const reloadAllfilters = ref<boolean>(false);
const itemsPerPage = 4;
const currentPage = ref<number>(Number(route.query.page) || 1);
const activeTab = ref<number>(0);
const newsList = ref<NewsItem[] | null>(null);

const tabs = ref<Tab[]>([
  { name: 'Все', link: 'all' },
  { name: 'Lenta.ru', link: 'lenta' },
  { name: 'Mos.ru', link: 'mos' },
]);

const { data, refresh } = await useFetch<{ mosRuNews: NewsItem[]; lentRuNews: NewsItem[] }>('/api/parse-rss');

if (data.value) {
  store.initMosNewsList(data.value.mosRuNews);
  store.initLentNewsList(data.value.lentRuNews);
  store.initMainArrayNews();
  newsList.value = store.newsList;
}

const filteredNews = computed(() => {
  if (!newsList.value) return [];

  let filtered = newsList.value;

  switch (tabs.value[activeTab.value].link) {
    case 'lenta':
      filtered = filtered.filter((item) => item.categoryName === 'lenta.ru');
      break;
    case 'mos':
      filtered = filtered.filter((item) => item.categoryName === 'mos.ru');
      break;
    default:
      break;
  }

  if (searchText.value) {
    const lowerCaseSearchText = searchText.value.toLowerCase();
    filtered = filtered.filter((item) => item.title.toLowerCase().includes(lowerCaseSearchText) || item.description.toLowerCase().includes(lowerCaseSearchText));
  }
  return filtered;
});

const paginatedNews = computed(() => {
  return Array.from({ length: Math.ceil(filteredNews.value.length / itemsPerPage) }, (_, i) =>
      filteredNews.value.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
  );
});

const currentNews = computed(() => paginatedNews.value[currentPage.value - 1]);

const setPage = (page: number | string) => {
  if (page !== '...') {
    currentPage.value = Number(page);
    router.push({ query: { page } });
  }
};

const setActiveTab = (index: number) => {
  activeTab.value = index;
  currentPage.value = 1;
  router.push({ query: { page: 1 } });
};

const refreshAllfiters = async () => {
  reloadAllfilters.value = true;
  await refresh();
  setTimeout(() => {
    reloadAllfilters.value = false;
    activeTab.value = 0;
    currentPage.value = 1;
    searchText.value = '';
    router.push({ query: { page: 1 } });
  }, 500);
};

watch(() => route.query.page,(newPage) => newPage ? currentPage.value = Number(newPage) : '');
</script>