define([
    'common/view/EditView',
    'text!speaker/details/SpeakerEditTemplate.html',
    'backbone.marionette'
], function (EditView, template) {

    'use strict';

    return EditView.extend({
        template: _.template(template),

        bindings: {
            '#email'   : 'email',
            '#name'    : 'name',
            '#position': 'position',
            '#about'   : 'about'
        }
    });
});