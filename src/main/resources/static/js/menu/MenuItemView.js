define([
    'backbone.marionette',
    'text!menu/MenuItemTemplate.html',
    'backbone.stickit'
], function (Marionette, template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName    : 'li',
        className  : function(){
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
