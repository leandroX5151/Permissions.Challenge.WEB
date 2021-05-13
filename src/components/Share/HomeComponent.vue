<template>
  <main class="container">  
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: "HomeComponent",
    props: {
      msg: String
    }
  }
</script>
