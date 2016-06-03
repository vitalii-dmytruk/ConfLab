define([
    'common/route/Route',
    'common/ListController'
], function (Route, ListController) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.attachedCollectionType = options.attachedCollectionType;
            this.attachmentView         = options.attachmentView;
            this.rowView                = options.rowView;
            this.EditView               = options.EditView;
            this.searchLabelAttribute   = options.searchLabelAttribute;
        },

        fetch: function (container, eventModel, itemModel) {
            this.collection       =
                getCollection(this.attachedCollectionType, eventModel.url() + itemModel.url());
            this.searchCollection = getCollection(this.attachedCollectionType, itemModel.url());
            return $.when(this.collection.fetch(), this.searchCollection.fetch());
        },

        render: function (container) {
            new ListController({
                container           : container,
                collection          : this.collection,
                title               : this.title,
                rowView             : this.rowView,
                searchLabelAttribute: this.searchLabelAttribute,
                searchCollection    : this.searchCollection,
                EditView            : this.EditView
            }).enter();
        }
    });

    function getCollection(Collection, url) {
        var collection = new Collection();
        collection.url = url + collection.url;
        return collection;
    }
});