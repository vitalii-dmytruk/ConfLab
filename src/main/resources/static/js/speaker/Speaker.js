define(['backbone'], function () {

    'use strict';

    return Backbone.Model.extend({
        defaults: {
            id  : '',
            name: ''
        },
        parse: function (response) {
            response.id = response["email"];
            delete response["email"];
            return response;
        }
    });
});
