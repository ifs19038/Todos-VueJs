<template>
    <div class="todo-form-container">
      <h2>Tambah Tugas</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Judul:</label>
          <input type="text" id="title" v-model="todo.title" required class="input-field" />
        </div>
        <button type="submit" class="submit-btn">Buat</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        todo: {
          title: '',
        },
      };
    },
    methods: {
      ...mapActions(['createTodo']),
      submitForm() {
        this.createTodo({
          title: this.todo.title,
        }).then(() => {
          this.$router.push('/');
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .todo-form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #333;
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
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  .submit-btn {
    padding: 10px 15px;
    background-color: #ff8c00;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #e57c00;
  }
  </style>
  