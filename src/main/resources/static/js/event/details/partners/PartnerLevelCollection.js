define([
    'event/details/partners/PartnerLevelModel',
    'common/Collection'
], function (PartnerLevelModel, Collection) {

    'use strict';

    return Collection.extend({
        url  : '/partnerLevels',
        model: PartnerLevelModel
    });

});