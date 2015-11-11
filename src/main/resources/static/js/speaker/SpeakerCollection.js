define(['speaker/Speaker', 'backbone'], function (Speaker) {
       return Backbone.Collection.extend({
           url: "/speakers",
           model: Speaker
       });
   }
);
