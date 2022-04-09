<template>
  <div id="app">
    <div class="wrapper">
      <Countdown />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Countdown from "./components/Countdown.vue";

@Component({
  components: {
    Countdown,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  margin: 15px;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
