define([
    'conference/event/table/EventRowView',
    'text!conference/event/table/EventTableTemplate.html',
    'backbone.marionette'
], function (EventRowView, template) {

    'use strict';

    return Marionette.CompositeView.extend({

        template: _.template(template),

        childView         : EventRowView,
        childViewContainer: '[data-events-table]'

    });


});