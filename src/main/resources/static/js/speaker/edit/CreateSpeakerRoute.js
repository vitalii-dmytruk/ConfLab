define([
    'common/Route',
    'speaker/edit/EditSpeakerView'
], function (Route, EditSpeakerView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container  = options.container;
            this.collection = options.collection;
        },

        render: function () {
            var route = this;

            this.initModel();
            initView(route);
            this.container.show(this.view);
        },

        initModel: function () {
            this.model = new this.collection.model();
        }

    });

    function initView(route) {
        route.view = new EditSpeakerView({
            collection: route.collection,
            model     : route.model
        });
        route.view.on('save cancel', function () {
            route.navigate('speakers/' + route.model.get('id'), {trigger: true});
        });
    }
});