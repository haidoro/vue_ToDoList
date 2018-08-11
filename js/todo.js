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
