define([
    'common/route/Route',
    'common/ListController',
    'common/view/DetailsLayout'
], function (Route, TableController, DetailsLayout) {

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
            var layout           = new DetailsLayout(),
                detailsRegion    = layout.getRegion('content'),
                attachmentRegion = layout.getRegion('attachment');

            this.container.show(layout);

            showDetailsView(detailsRegion, this.itemDetailsView, this.model);
            showAttachment(attachmentRegion, this.attachedCollectionTitle, this.attachedRowView,
                           this.collection);
        }
    });

    function showDetailsView(container, ViewClass, model) {
        container.show(new ViewClass({model: model}));
    }

    function showAttachment(container, attachedCollectionTitle, attachedRowView, collection) {
        new TableController({
            title          : attachedCollectionTitle,
            container      : container,
            attachedRowView: attachedRowView,
            collection     : collection
        }).enter();
    }
});