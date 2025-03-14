<template>
<!--  <div>-->
<!--    <h1>Лента новостей</h1>-->
<!--    <ul>-->
<!--      <li v-for="item in feed.items" :key="item.guid">-->
<!--        <a :href="item.link" target="_blank">{{ item.title }}</a>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
  <header class="header py-5">
    <UContainer>
      <div class="border-b py-2">
        <h1 class="text-4xl font-semibold">Список новостей</h1>
        <UButton variant="ghost" color="blue" size="xl" icon="famicons:sync" />
        <form>
          <UInput trailing icon="material-symbols:back-hand"/>
        </form>
      </div>
    </UContainer>
  </header>
  <main>
    <section>
      <UContainer >
        <div class="flex justify-between items-start">
          <ul>
            <li>
              Все
            </li>
            <li>
              Lenta
            </li>
            <li>
              Mos
            </li>
          </ul>
          <div >
            <UButton icon="tdesign:grid-view-filled"/>
            <UButton icon="material-symbols-light:view-list-sharp"/>
          </div>
        </div>
      </UContainer>
    </section>
    <section>
      <UContainer >
        <ul class="grid grid-cols-2 gap-5">
          <li class="p-5 shadow">
            <h3>awdawd</h3>
            <p>awdawdaasdadasd</p>
            <RouterLink to="">Подробнее</RouterLink>
            <div class="flex justify-between">
              <span>lenta</span>
              <span>12.12.2025</span>
            </div>
          </li>
          <li class="p-5 shadow">
            <h3>awdawd</h3>
            <p>awdawdaasdadasd</p>
            <RouterLink to="">Подробнее</RouterLink>
            <div class="flex justify-between">
              <span>lenta</span>
              <span>12.12.2025</span>
            </div>
          </li>
          <li class="p-5 shadow">
            <h3>awdawd</h3>
            <p>awdawdaasdadasd</p>
            <RouterLink to="">Подробнее</RouterLink>
            <div class="flex justify-between">
              <span>lenta</span>
              <span>12.12.2025</span>
            </div>
          </li>
          <li class="p-5 shadow">
            <h3>awdawd</h3>
            <p>awdawdaasdadasd</p>
            <RouterLink to="">Подробнее</RouterLink>
            <div class="flex justify-between">
              <span>lenta</span>
              <span>12.12.2025</span>
            </div>
          </li>
        </ul>
      </UContainer>
    </section>
    <section>
      <UContainer >
        <ul class="flex">
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </UContainer>
    </section>
  </main>
</template>

<script setup>
const { data: feed } = await useFetch('/api/parse-rss');
</script>