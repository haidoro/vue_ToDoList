# TODO List作成
TODO Listの仕組みは、入力BOXに入力された値を配列に保管してその配列を順番に表示する仕組みを作ることになります。
また、削除ボタンをクリックすると該当の値を配列から削除します。
Vue.jsのディレクティブをうまく使いながらこれらを組み立てて行きます。
尚、基本となる動作は配列の追加と配列の削除をJavaScriptで実現することです。これはVue.jsではなくJavaScriptの基本的な学習となります。

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

今の段階では、functionの中身は簡易的にalert()を入れています。

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
ここからmethodsの中のfanctionの命令を作成していきます。

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

## 未入力ならAddボタンをクリックしても追加しない

これはif文で次のように記述します。
```
if(this.newItem == '') return;
```

## リスト表示
v-forを活用してリスト表示の仕組みを作ります。
実は簡単でHTML側に次のコードを記述するだけです。
```
<ul>
  <li v-for="todo in todos">{{todo.item}}</li>
</ul>
```
仮に置いていたpreタグは必要ないので決しておきます。

```
<div id="app">
    <h2>TODO List</h2>
    <form v-on:submit.prevent>
      <input type="text" v-model="newItem">
      <button v-on:click="addItem">Add</button>
    </form>
    <ul>
      <li v-for="todo in todos">{{todo.item}}</li>
    </ul>
  </div>
```

## タスクの完了と未完了を管理
タスク終了したものには取り消し線をつけたい。

HTML側にはinput type="checkbox"要素を追加します。
「v-model="todo.isDone"」とすることでチェックが入るとtrueになるような仕掛けを作ります。

また表示部分の{{}}にはspanタグを追加してv-bindを活用します。チェックBOXにチェックが入ると「todo.isDone」は「true」に変わりますのでdoneというクラス名が表示されて活用されます。CSSには「.done{text-decoration: line-through;}」として取消線を表示させます。

```
<ul>
  <li v-for="todo in todos">
    <input type="checkbox" v-model="todo.isDone">
      <span v-bind:class="{done:todo.isDone}">{{todo.item}}</span>
  </li>
</ul>
```

JavaScript側には 「isDone:false」を追加します。チェックBOXが初期状態はチェックなしの状態ですからここの初期状態も「false」にしておきます。チェックされると内部的には「true」に変化するわけです。

```
const app = new Vue({
  el: '#app',
  data:{
    newItem:'',
    todos:[]
  },
  methods:{
    addItem: function(e){
      if(this.newItem == '') return;
      var todo = {
        item:this.newItem,
        isDone:false
      };
      this.todos.push(todo);
      this.newItem = "";
    }
  }
})
```

## 削除
deleteボタンの作成

JavaScript関数で削除を行います。引数にとるindexがポイントです。これは配列のindxになります。

```
deleteItem:function(index){
  this.todos.splice(index,1)
}
```

HTML側で削除ボタンを作ります。

```
<button v-on:click="deleteItem(index)">Delete</button>
```
さらにv-forの値を「v-for="(todo,index) in todos"」のように変更します。

```
  <li v-for="(todo,index) in todos">
        <input type="checkbox" v-model="todo.isDone">
        <span v-bind:class="{done:todo.isDone}">{{todo.item}}</span>
        <button v-on:click="deleteItem(index)">Delete</button>
      </li>
```





