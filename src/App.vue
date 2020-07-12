<template>
  <div id="app">

    <Navbar></Navbar>
    <div>
      <transition name="fade" mode="out-in">
        <router-view :key="$route.fullPath"/>
      </transition>
    </div>

  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import Feather from "feather-icons";
  export default {
    name: 'App',
    components: {
      Navbar
    },
    mounted() {
      Feather.replace();
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active{
    transition: opacity 0.1s, transform 0.15s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
    transform: scale(0.9);
  }
</style>
