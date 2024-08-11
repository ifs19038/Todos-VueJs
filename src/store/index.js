import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    todos: JSON.parse(localStorage.getItem('todos')) || [],  // Ambil dari local storage saat pertama kali halaman dimuat
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos;
      localStorage.setItem('todos', JSON.stringify(state.todos)); // Simpan ke local storage
    },
    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    UPDATE_TODO(state, updatedTodo) {
      const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    DELETE_TODO(state, todoId) {
      state.todos = state.todos.filter(todo => todo.id !== todoId);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    CLEAR_TODOS(state) {
      state.todos = [];
      localStorage.removeItem('todos');
    },
  },
  actions: {
    async fetchTodos({ commit, state }) {
      if (state.todos.length === 0) {
        // Jika local storage kosong, ambil data dari API
        try {
          const response = await api.getTodos(10); // Batasi 10 item
          commit('SET_TODOS', response.data);
        } catch (error) {
          console.error('Gagal mengambil todos:', error);
        }
      }
    },
    async createTodo({ commit }, todo) {
      try {
        const response = await api.addTodo(todo);
        commit('ADD_TODO', response.data);
      } catch (error) {
        console.error('Gagal membuat todo:', error);
      }
    },
    async updateTodo({ commit }, todo) {
      try {
        const response = await api.updateTodo(todo.id, todo);
        commit('UPDATE_TODO', response.data);
      } catch (error) {
        console.error('Gagal memperbarui todo:', error);
      }
    },
    async deleteTodo({ commit }, todoId) {
      try {
        await api.deleteTodo(todoId);
        commit('DELETE_TODO', todoId);
      } catch (error) {
        console.error('Gagal menghapus todo:', error);
      }
    },
  },
  getters: {
    todos: (state) => state.todos,
  },
});
