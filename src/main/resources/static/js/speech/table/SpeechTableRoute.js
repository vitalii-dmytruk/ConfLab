define([
    'common/Route',
    'common/view/ListView',
    'speech/table/SpeechRowView'
], function (Route, ListView, SpeechRowView) {

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
                childView : SpeechRowView,
                title: 'Speeches'
            });
            this.container.show(this.view);
        }

    });
});