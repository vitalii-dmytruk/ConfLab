define([
    'backbone'
], function(Backbone){

    'use strict';

    return Backbone.Model.extend({
        url: 'users/current'
    });
});
