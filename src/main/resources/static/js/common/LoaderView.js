define([
    'backbone.marionette',
    'text!common/LoaderTemplate.html'
], function (Marionette, template) {

    'use strict';

    return Marionette.ItemView.extend({
        tagName  : 'div',
        className: 'container-fluid',
        template : _.template(template)
    });

});
