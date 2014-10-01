var ListItem = Backbone.Model.extend({});

var TodoListItemsCollection = Backbone.Collection.extend({
  model: ListItem
});

var TodoListView = Backbone.View.extend({
  tagName: 'ul',
  className: 'todo-list',
  initialize: function() {
    $('.container').append(this.el);

    this.listenTo(this.collection, 'add', function(item){
      this.$el.append('<li>' + item.get('todo') + "  " + "<input type='submit' value='Complete' class='complete'>" + "</li>");
    });
  },

  events: {
    'click .complete': 'strikeThrough'
  },

  strikeThrough: function() {
    $('li').addClass('strike');
  }

});


var CreateTodoListItemView = Backbone.View.extend({

    tagName: 'input',
    className: 'create-todo-item',
    attributes: {
      type: 'text'
    },

    events: { 'keyup': 'addToList'
  },

    addToList: function(event) {

      if (event.keyCode === 13) {
        var listItem = this.collection.add({todo: this.$el.val()});
      }
    },

    render: function() {
      $('.container').prepend(this.el);
    }
});

$(document).ready(function(){
   var todoListItems = new TodoListItemsCollection();
   var createTodoListItemView = new CreateTodoListItemView({collection: todoListItems});
   createTodoListItemView.render();
   var todoListView = new TodoListView({collection: todoListItems});
});
