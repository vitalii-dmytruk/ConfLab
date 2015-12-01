define([
    'text!speaker/show/ShowSpeakerTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),
    });

});