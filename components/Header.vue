<template>
  <header id="main-header">
    <div class="container main-header__container mx-auto">
      <NuxtLink id="main-header__logo" to="/">
        <img
          id="image-3-15"
          alt=""
          width="56"
          height="56"
          src="/img/theme/flower_white.svg"
        />
        <div id="text_block-7-15">BMS Oils Academy</div>
      </NuxtLink>

      <div id="-pro-menu-4-15" class="oxy-pro-menu">
        <div class="oxy-pro-menu-mobile-open-icon" @click="toggleMenu">
          <svg fill="#ffffff" width="2rem" height="2rem" viewBox="0 0 20 20">
            <path
              d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
            />
            <path
              d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
            />
            <path
              d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
            />
          </svg>
        </div>

        <div class="oxy-pro-menu-container" :class="{'oxy-pro-menu-container-open': isMenuOpen}">
          <div class="menu-header-container">
            <ul id="menu-header" class="oxy-pro-menu-list">
              <li class="menu-item">
                <NuxtLink to="/" class="menu-item-link">
                  Rezepte
                </NuxtLink>
              </li>
              <li class="menu-item">
                <NuxtLink to="/lexikon" class="menu-item-link">
                  Lexikon
                </NuxtLink>
              </li>
              <li class="menu-item">
                <a
                    href="https://www.bms-oils.com"
                    class="menu-item-link"
                >
                  &laquo; Zurück zur Website
                </a>
              </li>
            </ul>
          </div>

          <div class="oxy-pro-menu-mobile-close-icon" @click="toggleMenu">
            <svg fill="#ffffff" width="2rem" height="2rem" viewBox="0 0 20 20">
              <path
                d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
</script>