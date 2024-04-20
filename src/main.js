import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ActionCable from 'actioncable';
// Rails側のActionCableサーバとの接続
const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

const app = createApp(App);
app.use(router);
// アプリケーション全体から利用できるよう設定
app.provide('cable',cable);
app.mount('#app')
