define([
    'common/Route',
    'speaker/SpeakerModel',
    'speaker/edit/CreateSpeakerView'
], function (Route, SpeakerModel, CreateSpeakerView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        render: function () {
            this.model = new SpeakerModel();
            this.view  = new CreateSpeakerView({
                collection: this.collection,
                model     : this.model
            });
            this.container.show(this.view);
        }
    });
});