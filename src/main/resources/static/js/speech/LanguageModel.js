define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot : '/languages',
        defaults: {
            id  : null,
            name: ''
        }
    });
});