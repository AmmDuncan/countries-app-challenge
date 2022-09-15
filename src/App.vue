<template>
  <NavBar></NavBar>
  <router-view />
</template>
<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;600;800&display=swap');

:root {
  --color-elevated: #fff;
  --color-flat: hsl(0, 0%, 98%);
  --shadow-sm: 0 4px 8px rgba(0, 0, 0, 0.05);
}

body {
  margin: 0;
  padding: 0;
  background: var(--color-flat);
}

body.dark {
  --color-elevated: hsl(209, 23%, 22%);
  --color-flat: hsl(207, 26%, 17%);
  color: white;
}

#app {
  font-family: Nunito, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--color-flat);
  min-height: 100vh;
}

.elevated {
  background: var(--color-elevated);
  box-shadow: var(--shadow-sm);
}

.rounded {
  border-radius: 4px;
}

.container {
  width: calc(100vw - 64px);
  max-width: 1256px;
  margin-inline: auto;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>