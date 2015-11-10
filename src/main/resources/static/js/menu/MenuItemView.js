define([
    'backbone.marionette',
    'text!menu/MenuItemTemplate.html',
    'backbone.stickit'
], function (Marionette, template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName    : 'li',
        template   : _.template(template),
        modelEvents: {
            'change:active': updateItemState

        }

    });

    function updateItemState() {
        if (this.model.get('active')) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    }

});
