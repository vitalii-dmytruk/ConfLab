define([
    'common/view/SearchView',
    'backbone.marionette'

], function (SearchView) {

    'use strict';

    return Marionette.Behavior.extend({
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
            searchView   = new SearchView({
                collection: this.view.collection,
                model     : searchResult
            });

            this.$el.prepend(searchView.render().el);
        }
    });

});
