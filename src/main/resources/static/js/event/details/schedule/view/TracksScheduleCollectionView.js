define([
    'event/details/schedule/view/TrackScheduleView',
    'backbone.marionette'
], function TracksScheduleCollectionView(childView) {

    'use strict';

    return Marionette.CollectionView.extend({

        childView: childView,

        className: function () {
            var length = this.collection.length;
            return 'grid-stack grid-stack-' + length;
        }
    });
});