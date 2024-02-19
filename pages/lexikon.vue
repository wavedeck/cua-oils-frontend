<script lang="ts" setup>
import {OilsService} from "~/core/oils/oils.service";
import {OilsRepository} from "~/core/oils/oils.repository";

const oilsSearch = ref('');
const selectedLetter = ref('');

const clearFilters = () => {
  oilsSearch.value = '';
  selectedLetter.value = '';
};

const fetchAllOils = () => {
  const service = new OilsService(new OilsRepository());
  return service.getManyOils({allPages: true});
}

const oils = await fetchAllOils();

const filteredOils = computed(() => {
  let items = oils;

  if (oilsSearch.value) {
    items = items.filter(oil =>
        oil.title.rendered.toLowerCase().includes(oilsSearch.value.toLowerCase())
    );
  }

  if (selectedLetter.value) {
    items = items.filter(oil =>
        oil.title.rendered.charAt(0).toUpperCase() === selectedLetter.value
    );
  }

  return items;
});

const oilLetters = computed(() => {
  const availableLetters = filteredOils.value.map(oil => oil.title.rendered.charAt(0).toUpperCase());
  return Array.from(new Set(availableLetters)).sort();
});

const getOilsForLetter = (letter: string) => {
  return filteredOils.value.filter(oil => oil.title.rendered.charAt(0).toUpperCase() === letter);
};

</script>

<template>
  <Head>
    <title>Lexikon - BMS Oils Academy</title>
  </Head>
  <PageHero background-image="/img/lexikon-header.webp" subtitle="Lexikon" title="BMS Oils Academy"/>
  <section>
    <div class="container mx-auto py-8">
      <form action="">
        <label class="sr-only" for="filter-search">Suche</label>
        <input id="filter-search" v-model="oilsSearch" name="s" placeholder="Suche nach Ölen..." type="text"/>
      </form>
      <div class="lexikon-filter">
        <a class="lexikon-filter__item lexikon-filter__reset" href="?filter" @click.prevent="clearFilters">Alle</a>
        <a v-for="letter in oilLetters" :href="`?filter=${letter}`" class="lexikon-filter__item"
           @click.prevent="() => selectedLetter = letter">{{ letter }}</a>
      </div>
      <div class="lexikon-oils-list">
        <div
            v-for="letter in oilLetters"
            :key="letter"
            :class="`lexikon-oils-list__itemgroup --letter-${letter.toLowerCase()}`"
        >
          <h3 class="itemgroup__title">{{ letter }}</h3>
          <ul class="itemgroup__listing">
            <li v-for="(oil, idx) in getOilsForLetter(letter)" :key="idx" class="itemgroup__item">
              <a :href="`/oils/${oil.slug}`" class="itemgroup__link">
                {{ oil.title.rendered }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lexikon-filter {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.lexikon-filter__item {
  display: inline-grid;
  place-content: center;
  padding: 0.5rem;
  border: 1px solid #304B79;
  background: #304B79;
  color: #fff;
  text-transform: uppercase;
  font-family: "Map Roman", serif;
  font-size: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  text-decoration: none;
}

.lexikon-filter__item:hover {
  text-decoration: underline;
}

/* Width: Item * 2 + gap */
.lexikon-filter__reset {
  width: 5.25rem;
}

.lexikon-oils-list .itemgroup__title {
  font-size: 2rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  font-family: "Map Roman", serif;
  color: #DBB03D;
  border-bottom: 2px solid #304B79;
}

.lexikon-oils-list .itemgroup__listing {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.lexikon-oils-list .itemgroup__item {
  list-style-image: url('/img/theme/flower_listicon.svg');
}

.lexikon-oils-list .itemgroup__link {
  font-size: 1.125rem;
  text-decoration: none;
  color: #304B79;
}

@media (min-width: 992px) {
  .lexikon-oils-list .itemgroup__link {
    font-size: 1.5rem;
  }

  .lexikon-oils-list .itemgroup__listing {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

</style>