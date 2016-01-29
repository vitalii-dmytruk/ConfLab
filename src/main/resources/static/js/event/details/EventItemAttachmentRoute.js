define([
    'common/route/Route'
], function (Route) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.attachedCollectionType = options.attachedCollectionType;
            this.attachmentView         = options.attachmentView;
        },

        fetch: function (container, eventModel, itemModel) {
            this.collection       = getCollection(this.attachedCollectionType, eventModel.url() + itemModel.url());
            this.searchCollection = getCollection(this.attachedCollectionType, itemModel.url());
            return $.when(this.collection.fetch(), this.searchCollection.fetch());
        },

        render: function (container) {
            container.show(new this.attachmentView({
                collection      : this.collection,
                searchCollection: this.searchCollection
            }));
        }
    });

    function getCollection(Collection, url) {
        var collection = new Collection();
        collection.url = url + collection.url;
        return collection;
    }

});