import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router);

window.addEventListener('beforeunload', () => {
  store.dispatch('clearTodos');
});

app.mount('#app');
