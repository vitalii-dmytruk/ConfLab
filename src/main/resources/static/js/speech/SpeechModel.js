define([
    'common/Model',
    'backbone'
], function (Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/speeches',

        defaults  : function () {
            return {
                id         : null,
                title      : '',
                description: '',
                lang       : null,
                position   : null,
                duration   : null,
                track      : null,
                allTracks  : false
            }
        },
        validation: {
            title: {
                required : true,
                maxLength: 255
            }
        }
    });
});