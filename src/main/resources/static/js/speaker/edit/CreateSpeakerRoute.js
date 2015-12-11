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
            this.initModel();
            this.container.show(initView(this));
        },

        initModel: function () {
            this.model = new this.collection.model();
        }

    });

    function initView(route) {
        var view = new EditSpeakerView({
            model: route.model
        });

        route.listenTo(view, 'save', function () {
            route.collection.add(route.model, {merge: true});
            route.navigate('speakers/' + route.model.get('id'), {trigger: true});
        });

        route.listenTo(view, 'cancel', function () {
            var id   = route.model.get('id'),
                path = 'speakers';

            path += id ? '/' + id : '';
            route.navigate(path, {trigger: true});
        });

        return view;
    }
});