import { createRouter, createWebHistory } from 'vue-router';
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/TodoForm.vue';

const routes = [
    {
      path: '/',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path: '/create',
      name: 'CreateTodo',
      component: TodoForm,
    },
  ];
  

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
