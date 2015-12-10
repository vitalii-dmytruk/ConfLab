define([
    'common/Route',
    'conference/event/edit/EditEventView'
], function (Route, EditEventView) {

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
        route.view = new EditEventView({
            collection: route.collection,
            model     : route.model
        });

        route.view.on('save', function () {
            route.navigate('events/' + route.model.get('id'), {trigger: true});
        });

        route.view.on('cancel', function () {
            var id   = route.model.get('id'),
                path = 'events';

            path += id ? '/' + id : '';
            route.navigate(path, {trigger: true});
        });
    }
});
