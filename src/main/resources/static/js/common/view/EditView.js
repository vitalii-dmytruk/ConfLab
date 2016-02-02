define([
    'common/behavior/FormBehavior',
    'backbone.marionette',
    'backbone.stickit',
    'backbone.validation'
], function (FormBehavior) {

    'use strict';

    return Marionette.ItemView.extend({
        behaviors: {
            form: {
                behaviorClass: FormBehavior
            }
        }
    });
});