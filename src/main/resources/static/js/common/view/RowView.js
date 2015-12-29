define([
    'backbone.marionette'
], function () {

    'use strict';

    return Marionette.ItemView.extend({
        tagName  : 'a',
        className: 'list-group-item',

        attributes: function () {
            return {
                href: '#' + this.model.url()
            };
        },

        onRender: function () {
            this.stickit();
        }
    });
});
