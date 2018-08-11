# TODO List作成
## ファイルの準備
index.htmlとjsフォルダにtodo.jsファイルを作成

## Vue.js基本要素記述
### HTML側
CDNとJavaScriptの読み込みをbody終了タグ直前に記述

```
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script src="js/todo.js"></script>
```
Vueインスタンスと紐付ける要素と必要な要素の作成

```
<div id="app">
  <h2>TODO List</h2>
  <form>
    <input type="text">
    <button>Add</button>
  </form>
</div>
```

### todo.js側
Vueのインスタンス化とelオプションの追加でHTML側と紐付け

```
const app = new Vue({
  el: '#app'
})
```
## イベントの設定
Addボタンをクリックした時の挙動を作成

index.html
```
<button v-on:click="addItem">Add</button>
```

todo.js
```
const app = new Vue({
  el: '#app',
  methods:{
    addItem: function(e){
      alert(e);
    }
  }
})
```

v-on:submit.preventを記述することでページ遷移を防止することができます。
```
<form v-on:submit.prevent>
```

## 双方向データバインディング

`<pre>{{$data}}</pre>`は確認用です。
```
<div id="app">
    <h2>TODO List</h2>
    <form v-on:submit.prevent>
      <input type="text" v-model="newItem">
      <button v-on:click="addItem">Add</button>
    </form>
    <pre>{{$data}}</pre>
  </div>
```

todo.js
```
const app = new Vue({
  el: '#app',
  data:{
    newItem:''
  },
  methods:{
    addItem: function(e){
      alert(e);
    }
  }
})
```

## タスクの追加

push()で追加

todo.js
```
const app = new Vue({
  el: '#app',
  data:{
    newItem:'',
    todos:[]
  },
  methods:{
    addItem: function(e){
      var todo = {
        item:this.newItem
      };
      this.todos.push(todo);
    }
  }
})
```
尚、タスクを追加できるようになりましたが、入力BOXには追加した値がそのまま残ります。これは不自然で使いにくいので`this.newItem = "";`のコードを追加します。

```
const app = new Vue({
  el: '#app',
  data:{
    newItem:'',
    todos:[]
  },
  methods:{
    addItem: function(e){
      var todo = {
        item:this.newItem
      };
      this.todos.push(todo);
      this.newItem = "";
    }
  }
})

```
