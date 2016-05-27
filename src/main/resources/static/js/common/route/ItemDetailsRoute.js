define([
    'common/route/Route',
    'common/TableController'
], function (Route, TableController) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function (id) {
            this.model          = new this.itemModelClass({id: id});
            this.collection     = new this.collectionClass();
            this.collection.url = this.model.url() + this.collection.url;

            return $.when(this.model.fetch(), this.collection.fetch());
        },

        render: function () {
            this.view = new this.itemDetailsView({model: this.model});
            this.container.show(this.view);

            showAttachment(this);
        }
    });

    function showAttachment(route) {
        var tableController = new TableController({
            title          : route.attachedCollectionTitle,
            container      : route.view.getRegion('attachment'),
            attachedRowView: route.attachedRowView,
            collection     : route.collection
        });

        tableController.enter();
    }
});