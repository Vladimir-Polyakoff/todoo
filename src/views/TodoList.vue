
<script>
import Api from '@/service/api'

import { mapMutations } from 'vuex'

export default {
  name: 'TodoList',

  data () {
    return {
      todoList: [],
      value: '',
      mode: 'create',
      editingTodo: null,
      visibleMaxCount: 4
    }
  },

  computed: {
    hasCompleted () {
      return Boolean(this.todoList.filter(todo => todo.completed).length)
    }
  },

  created () {
    this.getList()
  },

  methods: {
    ...mapMutations(['setMessage', 'setShowPopup']),

    getList () {
      const { status, data } = Api.get.list()

      status ? this.todoList = data : alert('не удалось загрузить данные')
    },

    create () {
      const newTodo = {
        name: this.value,
        completed: false,
        id: new Date()
      }

      const { status, error } = Api.post.todo(newTodo)

      if (status) {
        this.todoList.push(newTodo)
        this.value = ''
      } else {
        this.setMessage(error)
        this.setShowPopup(true)
      }
    },

    toggleStatus (index, id) {
      this.todoList[index].completed = !this.todoList[index].completed

      const { status } = Api.patch.status(id, !this.todoList[index].completed)

      if (!status) {
        alert('Не удалось обновть статус')

        this.todoList[index].completed = !this.todoList[index].completed

        const checkbox = document.getElementById('Checkbox-' + index)
        checkbox.checked = this.todoList[index].completed // засетить - перерисовать
      }
    },

    edit () {
      if (!this.validate()) {
        return
      }

      const todo = {
        id: this.editingTodo.id,
        name: this.value
      }

      const { status, error } = Api.patch.todo(todo)

      if (status) {
        const edited = this.todoList.find(({ id }) => id === todo.id)
        edited.name = todo.name

        this.editingTodo = null
        this.value = ''
        this.mode = 'create'
      } else {
        this.setMessage(error)
        this.setShowPopup(true)
      }
    },
    validate () {
      if (this.editingTodo.name === this.value) {
        alert('Данные не редактированлись')

        return false
      }

      return true
    },

    editing (name, id) {
      this.value = name
      this.mode = 'edit'
      this.editingTodo = { name, id }
    },

    showDeleteAlert () {
      const selected = this.todoList.filter(({ completed }) => completed).map(({ id }) => id) // ?

      // if (!selected.length) {
      //   alert('Выбирите Todo из списка')

      //   return
      // }

      if (window.confirm(`вы действительно хотите удалить ${selected}`)) {
        this.deleteChackedTodo(selected)
      } else {
        this.uncheckedTodo()
      }
    },

    deleteChackedTodo (removeIdsList) {
      const { status, error } = Api.delete.todos(removeIdsList)

      if (status) {
        this.todoList = this.todoList.filter(({ id }) => !removeIdsList.includes(id))
      } else {
        this.setMessage(error)
        this.setShowPopup(true)
      }
    },

    uncheckedTodo () {
      this.todoList = this.todoList.map(todo => ({ ...todo, completed: false }))
    },

    removeTodo (id, index, name) {
      if (window.confirm('вы действительно хотите удалить - ' + name)) {
        const { status, error } = Api.delete.todos([id])

        if (status) {
          this.todoList.splice(index, 1)
        } else {
          this.setMessage(error)
          this.setShowPopup(true)
        }
      }
    },

    exit () {
      const { status, error } = Api.get.logout()

      if (status) {
        this.$router.push({ name: 'login', params: { type: 'auth' } })
      } else {
        this.setMessage(error)
        this.setShowPopup(true)
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="actions">
      <input
        type="text"
        placeholder="Введите текст"
        v-model.trim="value"
      >
        <button
          @click="mode === 'create' ? create() : edit()"
          :disabled="!value"
          :style="mode === 'edit' && 'background: blue;'"
        >
          {{ mode === 'create' ? 'Добавить' : 'Редактировать'}}
        </button>

        <button
          class="remove"
          :disabled="!hasCompleted"
          @click="showDeleteAlert"
        >
          Удалить
        </button>
    </div>

    <button class="exit" @click="exit">Выход</button>

    <div
      class="todo-item"
      v-for="(item, index) in visibleMaxCount < todoList.length ? visibleMaxCount : todoList.length"
      :key="index"
    >
      <input
        :id="'Checkbox-' + index"
        type="checkbox"
        :checked="todoList[index].completed"
        @change="toggleStatus(index, todoList[index].id)"
      >

      <span
        class="content"
        :class="todoList[index].completed && 'active'"
        @click="editing(todoList[index].name, todoList[index].id)"
      >
        {{ todoList[index].name }}
      </span>
      <span class="close" @click="removeTodo(todoList[index].id, index, todoList[index].name)">x</span>
    </div>
    <div
      v-if="visibleMaxCount < todoList.length"
      class="visible-count"
      @click="visibleMaxCount < todoList.length ? visibleMaxCount += 1 : visibleMaxCount = 2"
    >{{ visibleMaxCount < todoList.length ? 'показать еще' : 'скрыть' }}</div>
  </div>
</template>

<style scoped lang="scss">
    .actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      background: #f3f0f090;
      padding: 20px 40px;
      border-radius: 6px;
      margin-bottom: 20px;
    }
    @media (max-width: 490px) {
      .actions {
        gap: 12px;
        padding: 20px 20px;
      }
    }
    @media (max-width: 430px) {
      .actions {
        // flex-direction: column;
        margin-inline: 20px;
        flex-wrap: wrap;
        align-items: center;
        padding: 10px 20px;
        gap:12px
      }
    }
    input {
      padding: 10px 4px;
      border: 1px solid #fefcfc;
      background: #f3f0f028;
      border-radius: 4px;
      color: white;
    }
    button {
      padding: 8px 12px;
      background: linear-gradient(to top left, rgba(25, 167, 25, 0.689), blue);
      border: none;
      border-radius: 4px;
      color: white;
    }
    @media (max-width: 430px) {
    button {
      padding: 4px 8px;
      font-size: 12px;
    }
    }
    @media (max-width: 430px) {
      button {
        padding: 8px 16px;
      }
    }
    .remove {
      background: linear-gradient(to top left, blue, rgba(255, 0, 0, 0.592));
    }
    .todo-item {
      display: flex;
      justify-content: space-between;
      align-content: center;
      color: #fff;
      background: #f3f0f090;
      padding: 20px 40px;
      border: 1px solid #fff;

    //   :first-child {
    //     border-radius: 6px 6px 0px 0px;
    //     background: red;
    // }
      .close {
        transform: rotateX(45deg);
        cursor: pointer;
        color: #fff;
      }
      .content {
        cursor: pointer;
        word-wrap: break-word;
        overflow: hidden;
        padding-inline: 30px;
      }
    }
    @media (max-width: 430px) {
      .todo-item {
        margin-inline: 20px;
      }
    }
    .exit {
      position: absolute;
      top: 10px;
      right: 40px;
      font-weight: 700;
      letter-spacing: 1px;
      padding-inline: 20px;
      cursor: pointer;
      color: #fff;
      background: linear-gradient(to top left, blue, #fff);
      border: none;
    }
    @media (max-width: 430px) {
      .exit {
        top: 8px;
        right: 30px;
        padding-inline: 14px;
      }
    }
    .exit:hover {
      box-shadow: 6px -1px 30px 3px rgba(96, 65, 232, 0.57);
    }
    .visible-count {
      display: inline-block;
      color: #fff;
      margin-top: 20px;
      float: left;
      cursor: pointer;
      &:hover {
        border-bottom: 1px dashed #fff;
      }
    }
</style>
