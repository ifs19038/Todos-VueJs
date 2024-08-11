<template>
  <div class="todo-container">
    <h1>Daftar Tugas</h1>
    <router-link to="/create" class="add-todo">Tambah Tugas Baru</router-link>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <span class="todo-title">{{ todo.title }}</span>
        <div class="actions">
          <button @click="editTodo(todo)" class="edit-btn">Edit</button>
          <button @click="deleteTodo(todo.id)" class="delete-btn">Hapus</button>
        </div>
      </li>
    </ul>

    <div v-if="selectedTodo" class="edit-form">
      <h2>Edit Tugas</h2>
      <form @submit.prevent="submitEdit">
        <div class="form-group">
          <label for="title">Judul:</label>
          <input type="text" v-model="selectedTodo.title" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Perbarui</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      selectedTodo: null,
    };
  },
  computed: {
    ...mapState(['todos']),
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions(['fetchTodos', 'deleteTodo', 'updateTodo']),
    editTodo(todo) {
      this.selectedTodo = { ...todo };
    },
    submitEdit() {
  this.updateTodo(this.selectedTodo).then(() => {
    this.selectedTodo = null; // Kosongkan form setelah diperbarui
  });
}
,
  },
};
</script>


<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.add-todo {
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #ff8c00;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
}

.add-todo:hover {
  background-color: #e57c00;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.todo-title {
  flex-grow: 1;
  color: #555;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #00bfff;
  color: #fff;
}

.delete-btn {
  background-color: #ff4c4c;
  color: #fff;
}

.edit-btn:hover {
  background-color: #009fdd;
}

.delete-btn:hover {
  background-color: #e54444;
}

.edit-form {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.input-field {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.submit-btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
