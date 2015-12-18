define([
    'common/view/ItemViewFactory',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (ItemViewFactory, SpeakerRowTemplate, SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    return new ItemViewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        bindings: {
            '#email'   : 'email',
            '#name'    : 'name',
            '#position': 'position',
            '#about'   : 'about'
        },

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }

    });
});
