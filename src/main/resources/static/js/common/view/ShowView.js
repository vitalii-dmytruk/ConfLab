define([
    'common/behavior/EditBehavior',
    'backbone.marionette',
    'backbone.stickit'
], function (EditBehavior) {

    'use strict';

    return Marionette.ItemView.extend({
        attributes: {
            style: 'position:relative;'
        },
        behaviors : {
            actions: {
                behaviorClass: EditBehavior
            }
        },
        onRender  : function () {
            this.stickit();
        }
    });
});