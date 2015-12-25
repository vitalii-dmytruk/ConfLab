define([
    'text!common/navigation/NavigationItemTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName    : 'li',
        className  : function () {
            return this.model.get('active') ? 'active' : '';
        },
        template   : _.template(template),
        modelEvents: {
            'change:active': updateItemState

        }

    });

    function updateItemState() {
        this.$el.toggleClass('active', this.model.get('active'));
    }
});
