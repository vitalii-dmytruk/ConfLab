define([
    'text!speaker/table/SpeakerRowTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        bindings: {
            '[data-email]'   : 'id',
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-about]'   : 'about'
        },

        onRender: function () {
            this.stickit();
        }
    });
});
