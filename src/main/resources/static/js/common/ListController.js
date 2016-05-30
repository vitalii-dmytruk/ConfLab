define([
    'common/route/Route',
    'common/view/ListComponentView'
], function ListController(Route, TableComponentView) {

    'use strict';

    return Route.extend({

        initialize: function (options) {
            this.options = options;
        },

        enter: function () {
            var tableComponentView = new TableComponentView();

            this.options.container.show(tableComponentView);

            tableComponentView.showTitle(this.options.title);
            tableComponentView.showChildView('listRegion', createAttachedView(this.options.collection,
                                                                              this.options.attachedRowView));
        }
    });

    function createAttachedView(collection, attachedRowView) {
        return new Marionette.CollectionView({
            childView : attachedRowView,
            collection: collection
        });
    }
});