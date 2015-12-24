define([
    'common/view/SearchView',
    'backbone.marionette'

], function (SearchView) {

    'use strict';

    return Marionette.Behavior.extend({
        defaults : {
            labelAttribute : 'name'
        },

        onRender: function () {
            var searchView, searchResult;

            searchResult = new Backbone.Model();
            this.view.listenTo(searchResult, 'change', function (searchResult) {
                var result = searchResult.get('result');
                if (result) {
                    this.model.set(result);
                } else {
                    this.model.clear();
                }
            });
            searchView = new SearchView({
                collection    : this.view.collection,
                model         : searchResult,
                labelAttribute: this.options.labelAttribute
            });

            this.$el.prepend(searchView.render().el);
        }
    });

});
