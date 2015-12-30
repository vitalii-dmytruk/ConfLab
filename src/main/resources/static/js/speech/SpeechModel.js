define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/speeches',

        defaults: function () {
            return {
                id         : null,
                title      : '',
                description: '',
                lang       : ''
            }
        }
    });
});