define([
    'event/details/schedule/view/RowAxisView',
    'backbone.marionette'
], function RowAxisCollectionView(childView) {

    'use strict';

    return Marionette.CollectionView.extend({

        childView: childView,

        childViewOptions: function (model, index) {
            return {
                index     : index,
                cellHeight: this.options.cellHeight,
                cellMargin: this.options.cellMargin
            }
        }
    });
});