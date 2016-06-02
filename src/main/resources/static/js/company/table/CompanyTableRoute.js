define([
    'common/route/ItemTableRoute',
    'company/companyViewFactory',
    'company/CompanyCollection'
], function (ItemTableRoute, companyViewFactory, CompanyCollection) {

    'use strict';

    return ItemTableRoute.extend({
        collectionClass: CompanyCollection,

        title  : 'Companies',
        rowView: companyViewFactory.itemRowView,
        EditView: companyViewFactory.itemEditView
    });
});