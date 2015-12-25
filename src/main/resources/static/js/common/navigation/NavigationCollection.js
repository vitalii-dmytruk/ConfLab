define([
    'common/navigation/NavigationItemModel',
    'backbone'
], function (NavigationItemModel) {

    'use strict';

    return Backbone.Collection.extend({

        model: NavigationItemModel

    });

});