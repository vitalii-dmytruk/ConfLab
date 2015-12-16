define([
    'common/Route',
    'common/view/TableView',
    'speaker/table/SpeakerRowView',
    'speaker/edit/EditSpeakerView'
], function (Route, TableView, SpeakerRowView, EditSpeakerView) {

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
                title     : 'Speakers',
                RowView   : SpeakerRowView,
                EditView  : EditSpeakerView,
                collection: this.collection
            });
            this.container.show(this.view);
        }

    });
});