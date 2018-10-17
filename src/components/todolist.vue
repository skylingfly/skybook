<template>
  <div>
      <div>
        <input type="text" v-model='mytodo' @keyup.enter='handclick'>
        <button @click='handclick'>添加</button>
        <button @click='clear'>重置</button>
      </div>
      <ul>
        <li
          v-for='item in todos'
          :key='item.id'
          @click='toggleStatus(item)'
          :class="{'isFinish': item.isFinish}"
        >
          {{item.id}} - {{item.text}}
        </li>
      </ul>
      <p>Total: {{remain}}/{{todos.length}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'hello vue',
      subtitle: 'react is good',
      showSub: true,
      todos: [
        {id: '1', text: '吃饭', isFinish: false},
        {id: '2', text: '睡觉', isFinish: false},
        {id: '3', text: '敲代码', isFinish: false}
      ],
      mytodo: ''
    }
  },
  computed: {
    remain () {
      return this.todos.filter(v => !v.isFinish).length || 0
    }
  },
  methods: {
    clear () {
      const temp = this.todos.filter(v => !v.isFinish)
      this.todos = temp
    },
    handclick () {
      if (this.mytodo.trim() !== '') {
        let temp = {
          id: this.todos.length + 1,
          text: this.mytodo.trim(),
          isFinish: false
        }
        this.todos.push(temp)
        this.mytodo = ''
        temp = null
      }
    },
    toggleStatus (item) {
      const { id } = item
      this.todos.forEach(v => {
        if (v.id === id) {
          v.isFinish = !v.isFinish
        }
      })
    }
  }
}
</script>

<style scoped>
  li.isFinish {
    text-decoration: line-through;
  }

</style>
