<template>
  <footer id="main-footer">
    <div class="footer-container container mx-auto">
      <div class="footer-brand">
        <div class="footer-brand__logowrapper">
          <img
            alt="BMS Oils"
            class="footer-brand__logoimg"
            src="/img/theme/flower_white.svg"
          />
          <span class="footer-brand__logotext">Corinna &amp; Andreas</span>
        </div>
        <div class="footer-brand__social">
          <a
            class="footer-brand__social-link footer-brand__social-link--instagram"
            href="https://www.instagram.com/corinnaundandreas/"
            rel="noopener"
            target="_blank"
          >
            <img
              alt="Instagram"
              class="footer-brand__social-icon"
              src="/img/icons/instagram_white.svg"
            />
          </a>
          <a
            class="footer-brand__social-link footer-brand__social-link--facebook"
            href="https://www.facebook.com/corinnaundandreas/"
            rel="noopener"
            target="_blank"
          >
            <img
              alt="Facebook"
              class="footer-brand__social-icon"
              src="/img/icons/facebook_white.svg"
            />
          </a>
          <a
            class="footer-brand__social-link footer-brand__social-link--pinterest"
            href="https://www.pinterest.com/corinnaundandreas_coaching/"
            rel="noopener"
            target="_blank"
          >
            <img
              alt="Pinterest"
              class="footer-brand__social-icon"
              src="/img/icons/pinterest_white.svg"
            />
          </a>
          <a
            class="footer-brand__social-link footer-brand__social-link--youtube"
            href="https://www.youtube.com/c/CorinnaAndreasEnergetischesCoaching"
            rel="noopener"
            target="_blank"
          >
            <img
              alt="YouTube"
              class="footer-brand__social-icon"
              src="/img/icons/youtube_white.svg"
            />
          </a>
        </div>
      </div>
      <nav class="footer-navigation">
        <ul class="footer-navigation__list">
          <li class="footer-navigation__item">
            <NuxtLink class="footer-navigation__link" to="/">
              Rezepte
            </NuxtLink>
          </li>
          <li>
            <NuxtLink class="footer-navigation__link" to="/lexikon">
              Lexikon
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              class="footer-navigation__link"
              external
              to="https://www.bms-oils.com/"
            >
              &laquo; Zurück zur Website
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="footer-legal">
        <div id="_rich_text-39-16" class="oxy-rich-text">
          <a href="https://corinnaundandreas.com/kontakt/" style="color: white">
            Kontakt
          </a>
          |
          <a
            href="https://corinnaundandreas.com/impressum/"
            style="color: white"
          >
            Impressum
          </a>
          |
          <a
            href="https://corinnaundandreas.com/datenschutz/"
            style="color: white"
          >
            Datenschutz
          </a>
        </div>
        <div class="footer-legal__copyright">
          Copyright © Lebensfeuer Ltd, 2024
        </div>
      </div>
    </div>
  </footer>
</template>
