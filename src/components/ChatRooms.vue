<template>
    <div>
        <h1>VueChat - チャットルーム一覧 </h1>
        <ul>
            <li v-for="room in chatRooms" :key="room.id">
            <!-- aタグみたいなもの -->
            <router-link :to="`/rooms/${room.id}`">{{ room.name }}</router-link>
            </li>
        </ul>
        <h3>チャットルーム作成</h3>
        <input type="text" v-model="newRoomName" />
        <div>
            <button @click="createRoom">作成</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return {
            chatRooms:[],
            // 新しく作成するチャットルームの名前を保持するためのデータ
            newRoomName:'',
        };
    },
    created() {
        // コンポーネントが作成されたときに、チャットルーム一覧を取得する
        this.fetchChatRooms();
    },
    methods:{
        fetchChatRooms(){
            axios
            .get(`${import.meta.env.VITE_API_URL}/rooms`)
            .then(response => {
                this.chatRooms = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        },
        // newRoomNameを使用して新しいチャットルームを作成する
        createRoom(){
            // 作成フォームの入力内容をサーバーに送信
            axios.post(`${import.meta.env.VITE_API_URL}/rooms`, {
                name: this.newRoomName,
            })
            .then(response => {
                this.chatRooms.push(response.data);
                this.newRoomName = '';
            })
            .catch(error => {
                console.error(error);
            });
        },
    },
};
</script>