define([
    'backbone.marionette',
    'text!header/HeaderTemplate.html'
], function (Marionette, template) {

    'use strict';

    return Marionette.ItemView.extend({
        className: 'container-fluid',
        template : _.template(template)

    });


});
