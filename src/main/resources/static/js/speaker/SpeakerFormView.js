define([
           'text!speaker/SpeakerFormTemplate.html',
           'backbone.marionette'
       ], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),
        bindings: {
            '#email'   : 'id',
            '#name'    : 'name',
            '#position': 'position',
            '#about'   : 'about'
        },

        onRender: function () {
            this.stickit();
        }
    });
});