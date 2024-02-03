<script lang="ts" setup>

// Define a type for oil objects
interface Oil {
  id: number;
  date: string;
  date_gmt: string;
  guid: {
    rendered: string;
  };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  template: string;
  acf: {
    "ol-bild"?: number;
    beschreibung: string;
    rezepte?: number[];
    video?: string;
  };
}


// Define a type for the grouped oils object
type GroupedOils = {
  [key: string]: Oil[];
};

const alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

// api params
const apiPerPage = 100; // max per_page value

// fetch total pages count from wordpress rest api
const fetchTotalPages = async () => {
  const response = await fetch('https://bms-oils-web.invadox.dev/wp-json/wp/v2/bms_oils?per_page=' + apiPerPage, {
    method: 'HEAD'
  });
  return response.headers.get('X-WP-TotalPages');
};

// fetch all oils from wordpress rest api
const fetchAllOils = async (): Promise<Oil[]> => {
  // setup request params
  const totalPages = await fetchTotalPages();
  if(!totalPages) throw new Error('No total pages found');
  const urlParams = new URLSearchParams({
    per_page: apiPerPage.toString(),
    order_by: 'title',
    order: 'asc'
  }).toString();

  const requests = Array.from({ length: +totalPages }, (_, i) => {
    return $fetch<Oil[]>(`https://bms-oils-web.invadox.dev/wp-json/wp/v2/bms_oils?${urlParams}&page=${i+1}`);
  });
  const responses = await Promise.all(requests);
  return responses.flat();
};

// fetch all oils from wordpress rest api
const oils = await fetchAllOils();

const availableLetters = oils.map((oil: Oil) => oil.title.rendered.charAt(0).toUpperCase());
const oilLetters = Array.from(new Set(availableLetters)).sort();

const getOilsForLetter = (letter: string): Oil[] => {
  const filteredOils = oils.filter(oil => oil.title.rendered.charAt(0).toUpperCase() === letter);
  // return oils.sort(); // not necessary with api since it's already sorted
  return filteredOils; // not necessary with api since it's already sorted
};

</script>

<template>
  <PageHero background-image="/img/lexikon-header.webp" subtitle="Lexikon" title="BMS Oils Academy"/>
  <section>
    <div class="container mx-auto py-8">
      <form action="">
        <label class="sr-only" for="filter-search">Suche</label>
        <input id="filter-search" name="s" placeholder="Suche nach Ölen..." type="text"/>
      </form>
      <div class="lexikon-filter">
        <a href="?filter" class="lexikon-filter__item lexikon-filter__reset">Alle</a>
        <a v-for="letter in oilLetters" :href="`?filter=${letter}`" class="lexikon-filter__item">{{ letter }}</a>
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
              <a :href="oil.link" class="itemgroup__link">
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
  display: flex;
  flex-wrap: wrap;
  column-gap: 6rem;
  row-gap: 1rem;
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
}

</style>