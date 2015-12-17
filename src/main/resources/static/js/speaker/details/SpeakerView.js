define([
    'text!speaker/details/SpeakerTemplate.html',
    'common/view/EditView'
], function (template, EditView) {

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