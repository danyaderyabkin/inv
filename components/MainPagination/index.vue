<script setup lang="ts">
const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(['update:currentPage']);

const route = useRoute();
const router = useRouter();

// Генерация пагинации
const pagination = computed(() => {
  const { currentPage, totalPages } = props;
  const pagination: (number | string)[] = [];

  pagination.push(1);

  if (currentPage > 3) {
    pagination.push('...');
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(currentPage + 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    if (i !== 1 && i !== totalPages) {
      pagination.push(i);
    }
  }

  if (currentPage < totalPages - 2) {
    pagination.push('...');
  }

  if (totalPages > 1) {
    pagination.push(totalPages);
  }

  return pagination;
});

// Функция для переключения страниц
const setPage = (page: number | string) => {
  if (page !== '...') {
    emit('update:currentPage', Number(page));
    router.push({ query: { page } });
  }
};

// Следим за изменением query-параметра `page`
watch(
    () => route.query.page,
    (newPage) => {
      if (newPage) {
        emit('update:currentPage', Number(newPage));
      }
    }
);
</script>
<template>
  <ul v-if="totalPages > 0" class="flex justify-center font-semibold gap-3 text-lg">
    <li v-for="page in pagination" :key="page" @click="setPage(page)" :class="{ 'text-blue-700': page === currentPage }">
      <button :disabled="page === '...'">
        {{ page }}
      </button>
    </li>
  </ul>
  <div v-else>Ничего не найдено!</div>
</template>