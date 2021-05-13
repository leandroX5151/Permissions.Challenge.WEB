<template>
  <div class="bg-light p-5 rounded">
    <h2>{{title}}</h2>
    <p class="lead">{{description}}</p>    
  </div>
</template>

<script>

export default {
  name: "HeaderSectionComponent",
  props: {
    title: String,
    description: String
  }
}
</script>