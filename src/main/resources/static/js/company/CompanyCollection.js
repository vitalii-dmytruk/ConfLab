define([
    'company/CompanyModel',
    'common/Collection'
], function CompanyCollection(CompanyMode, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/companies',
        model: CompanyMode
    });

});