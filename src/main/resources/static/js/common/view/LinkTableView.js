define([
    'common/view/TableView',
    'backbone.marionette'
], function (TableView) {

    'use strict';

    return TableView.extend({

        editView: function () {
            var model = new this.collection.model();
            model.urlRoot = this.collection.url;
            return new this.EditView({
                model     : model,
                collection: this.options.searchCollection
            });
        }

    });

});