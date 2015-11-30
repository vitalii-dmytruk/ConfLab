define([
    'text!speaker/table/SpeakerRowTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        tagName: 'a',
        className: 'list-group-item',
        attributes: function () {
            return {
                href: '#speakers/' + this.model.get('id')
            };
        },

        bindings: {
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        },

        onRender: function () {
            this.stickit();
        }
    });
});
