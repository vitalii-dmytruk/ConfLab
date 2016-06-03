define([
    'common/ListController',
    'company/companyViewFactory',
    'company/CompanyCollection'
], function (ListController, companyViewFactory, CompanyCollection) {

    'use strict';

    return ListController.extend({
        collectionClass: CompanyCollection,

        title  : 'Companies',
        rowView: companyViewFactory.itemRowView,
        EditView: companyViewFactory.itemEditView
    });
});