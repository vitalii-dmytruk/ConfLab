define([
    'common/route/ItemTableRoute',
    'partner/partnerViewFactory',
    'partner/PartnerCollection'
], function (ItemTableRoute, partnerViewFactory, PartnerCollection) {

    'use strict';

    return ItemTableRoute.extend({
        collectionClass: PartnerCollection,
        tableView      : partnerViewFactory.itemTableView
    });
});