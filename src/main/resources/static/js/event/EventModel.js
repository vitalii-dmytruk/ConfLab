define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/events',

        defaults: function () {
            return {
                id         : null,
                name       : '',
                description: '',
                startDate  : '',
                endDate    : '',
                speakers   : []
            }
        }
    });
});