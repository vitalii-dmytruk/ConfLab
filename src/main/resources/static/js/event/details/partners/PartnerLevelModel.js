define([
    'common/Model',
    'backbone'
], function CompanyModel(Model) {

    'use strict';

    return Model.extend({
        urlRoot: '/partnerLevels',

        defaults  : function () {
            return {
                id  : null,
                name: null
            }
        }
    });
});