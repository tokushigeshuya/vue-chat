<template>
    <div>
        <h1>ApiTest</h1>
        <!-- クリック時にtestメッソドを実行 -->
        <button @click="test">ApiTest</button>
        <!-- Vue.jsのテンプレート構文 -->
        <p>{{ message }}</p>
    </div>
</template>

<script>
export default {
    // data 関数は、コンポーネントの状態を表すデータを返します。
    data() {
        return {
            // message プロパティがあり、その初期値は空文字列
            message: ''
        }
    },
    methods: {
        test() {
        // 接続先(HTTPリクエストを送信します) 
            fetch('http://localhost:3000/api/test')
            // レスポンスの内容をJSON形式に変換し、その後、data.message の値を message プロパティに設定
            .then((response) => response.json())
            .then((data) => {
                this.message = data.message
            })
        }
    }
}
</script>