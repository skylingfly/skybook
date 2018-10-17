<template>
  <div>
    <h1>这是一个todo list</h1> 
    <Todolist></Todolist> 
  </div>
</template>
<script>
  import Todolist from '../../components/todolist'
  export default {
    components: {
      Todolist
    }
  }
</script>
<style>
  h1 {
    color: blue;
  }
</style>