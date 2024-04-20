<template>
    <div>
        <h1>チャットルーム {{ this.roomId }}</h1>

        <ul>
            <li v-for="message in messages" :key="message.id">
                <strong>{{ message.sender_name }}:</strong> {{ message.content }}
            </li>
        </ul>
        <!-- form -->
        <!-- フォームが送信されたときに sendMessage メソッドを実行 -->
        <form @submit.prevent="sendMessage">
            <div>
                <h3>名前</h3>
                <input type="text" v-model="senderName" placeholder="名前を入力" required />
            </div>
            <div>
                <h3>メッセージ</h3>
                <input type="text" v-model="newMessageContent" placeholder="メッセージを入力" required />
            </div>
            <div>
                <button type="submit">送信</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    props: ['roomId'],
    data(){
        return{
            roomName: '',
            messages: [],
            // メッセージの送信者名
            senderName: '',
            // 送信するメッセージの内容
            newMessageContent: '',
        };
    },
    created() {
        this.fetchMessages();
    },
    methods:{
        fetchMessages(){
            // 特定のチャットルームのメッセージを取得
            axios
            .get(`http://localhost:3000/rooms/${this.roomId}/messages`)
            .then((response) => {
                this.messages = response.data;
            })
            .catch((error) => {
                console.error(error);
            });
        },
        // メッセージ送信
        sendMessage(){
            axios
            // 送信先のURLは、チャットルームのIDとメッセージを組み合わせたもの
            .post(`http://localhost:3000/rooms/${this.roomId}/messages`, {
                // 内容
                content: this.newMessageContent,
                // 送信者名
                sender_name: this.senderName
            })
            .then(() => {
                // newMessageContent を空にしてフォームをリセット（次回入力の際にメッセージを残さない）
                this.newMessageContent = ''
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }
}
</script>