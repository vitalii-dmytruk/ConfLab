define([
    'partner/PartnerModel',
    'common/Collection'
], function PartnerCollection(PartnerModel, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/companies',
        model: PartnerModel
    });

});