define([
    'common/Model',
    'backbone'
], function PartnerModel(Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/companies',

        defaults  : function () {
            return {
                id  : null,
                name: '',
                url: ''
            }
        }
    });
});