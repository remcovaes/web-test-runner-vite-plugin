<template>
  <div class="container">
    <h1>This is Vue 🎉</h1>
    <input value="bla"/>
  </div>
</template>

<script setup>
  import './coverage-test';

  if (true){
    console.log('run');
  }
  else {
    console.log('not run');
  }
</script>
