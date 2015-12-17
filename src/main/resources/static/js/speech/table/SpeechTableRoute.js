define([
    'common/Route',
    'common/view/TableView',
    'speech/table/SpeechRowView',
    'speech/details/SpeechEditView'
], function (Route, TableView, SpeechRowView, SpeechEditView) {

    'use strict';

    return Route.extend({
        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        fetch: function () {
            if (this.collection.isNew) {
                return this.collection.fetch();
            }
        },

        render: function () {
            this.view = new TableView({
                title     : 'Speeches',
                RowView   : SpeechRowView,
                EditView  : SpeechEditView,
                collection: this.collection
            });
            this.container.show(this.view);
        }

    });
});