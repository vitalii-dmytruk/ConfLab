define([
    'text!common/navigation/NavigationItemTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName : 'li',
        template: _.template(template),

        activate: function () {
            this.$el.addClass('active');
            this.triggerMethod('activated');
        },

        deactivate: function () {
            this.$el.removeClass('active');
            this.triggerMethod('deactivated');
        }

    });
});
