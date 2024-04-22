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
import { inject } from 'vue';

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
    setup(){
        const cable = inject('cable');
        return { cable };
    },
    created() {
        this.fetchMessages();
        this.createSubscription();
    },
    methods:{
        // 特定のチャンネル（チャットルーム）に対してサブスクリプションを作成
        createSubscription(){
            // 指定したチャンネルに対して新しいサブスクリプションを作成
            this.subscription = this.cable.subscriptions.create(
                // 作成するチャンネル名と受信時の動作定義
                { channel: 'RoomChannel', room_id: this.roomId },
                {
                    // メッセージ受信時の動作
                    received: message => {
                        console.log(message);
                        this.messages.push(message);
                    },
                }
            );
        },
        fetchMessages(){
            // 特定のチャットルームのメッセージを取得
            axios
            .get(`${import.meta.env.VITE_API_URL}/rooms/${this.roomId}/messages`)
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
            .post(`${import.meta.env.VITE_API_URL}/rooms/${this.roomId}/messages`, {
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