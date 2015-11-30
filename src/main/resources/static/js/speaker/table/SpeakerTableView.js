define([
    'speaker/table/SpeakerRowView',
    'text!speaker/table/SpeakerTableTemplate.html',
    'backbone.marionette'
], function (SpeakerRowView, template) {

    'use strict';

    return Marionette.CompositeView.extend({

        template: _.template(template),

        childView         : SpeakerRowView,
        childViewContainer: '[data-speaker-table]'

    });


});