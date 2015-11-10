define([
    'backbone',
    'menu/MenuItem'
], function (Backbone, MenuItem) {

    'use strict';

    return Backbone.Collection.extend({

        model: MenuItem

    });

});