define([
    'common/Route',
    'common/view/ListView',
    'speaker/table/SpeakerRowView'
], function (Route, ListView, SpeakerRowView) {

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
            this.view = new ListView({
                collection: this.collection,
                childView : SpeakerRowView,
                title: 'Speakers'
            });
            this.container.show(this.view);
        }

    });
});