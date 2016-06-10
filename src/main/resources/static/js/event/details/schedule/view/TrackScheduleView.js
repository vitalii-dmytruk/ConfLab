define([
    'text!event/details/schedule/template/TrackScheduleTemplate.html',
    'backbone.marionette'
], function TrackScheduleView(template) {

    'use strict';

    return Marionette.ItemView.extend({

        template: _.template(template),

        className: 'grid-stack-item',

        attributes: function () {
            //TODO streams should be ordered by 'order' field instead.
            var index = this.model.collection.indexOf(this.model);
            return {
                'data-gs-width': 1,
                'data-gs-x'    : index
            };
        },

        bindings: {
            '.text-center': 'name'
        },

        onRender: function () {
            this.stickit();
        }
    });
});