define([
    'common/route/ItemTableRoute',
    'company/companyViewFactory',
    'company/CompanyCollection'
], function (ItemTableRoute, companyViewFactory, CompanyCollection) {

    'use strict';

    return ItemTableRoute.extend({
        collectionClass: CompanyCollection,
        tableView      : companyViewFactory.itemTableView
    });
});