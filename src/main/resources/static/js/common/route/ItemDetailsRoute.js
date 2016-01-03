define([
    'common/route/Route'
], function (Route) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.container = options.container;
        },

        fetch: function (id) {
            this.model            = new this.itemModelClass({id: id});
            this.collection       = new this.attachedItemCollectionClass();
            this.collection.url   = this.model.url() + this.collection.url;
            this.searchCollection = new this.attachedItemCollectionClass();

            return $.when(this.model.fetch(), this.collection.fetch(), this.searchCollection.fetch());
        },

        render: function () {
            this.view = new this.itemDetailsView({model: this.model});
            this.container.show(this.view);

            this.view.getRegion('attachment').show(new this.attachedItemTableView({
                    collection      : this.collection,
                    searchCollection: this.searchCollection
                })
            );
        }
    });
});