<template>
  <nav class="nav-bar elevated">
    <div class="container">
      <div class="nav">
        <router-link to="/" class="home-link">Where in the world?</router-link>
        <div class="controls">
          <button class="theme-switch" @click="isDark = !isDark">
            <v-icon name="bi-moon-fill" animation="pulse" scale="1"></v-icon>
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: "NavBar",
  data: () => ({isDark: false}),
  watch: {
    isDark(newValue) {
      localStorage.setItem('country-app-dark', newValue);
      console.log(this.documentBody)
      if (newValue) {
        this.documentBody.classList.add('dark')
      } else {
        this.documentBody.classList.remove('dark')
      }
    }
  },
  created() {
    this.isDark = JSON.parse(localStorage.getItem('country-app-dark'))
  },
}
</script>

<style scoped>
.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.home-link {
  font-weight: 800;
}

.theme-switch {
  padding: 8px 16px;
  borer-radius: 8px;
  border: none;
  cursor: pointer;
  background: transparent;
  color: inherit;
  display: grid;
  grid: 1fr / repeat(2, max-content);
  gap: 8px;
  align-items: center;
  font-size: 16px;
}

.theme-switch:hover {
  background: rgba(200, 200, 200, 0.1);
}

.theme-switch:active {
  background: rgba(150, 150, 150, 0.1);
}

@media (min-width: 768px) {
  .home-link {
    font-size: 1.5rem;
  }
}
</style>