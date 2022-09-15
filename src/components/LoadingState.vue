<template>
  <div class="wrapper">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingState"
}
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: grid;
  height: 100%;
  min-height: 60vh;
  place-content: center;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #50cec3;
  border-color: #50cec3 transparent #50cec3 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>