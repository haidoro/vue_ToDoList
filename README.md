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