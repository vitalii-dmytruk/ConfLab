define([
    'common/navigation/NavigationItemView',
    'common/behavior/DeleteBehavior'
], function SpeechPillView(NavigationItemView, DeleteBehavior) {

    'use strict';

    return NavigationItemView.extend({
        template: _.template('<a role="button"><%- title%></a>'),

        triggers: {
            'click a': 'clicked'
        },

        behaviors: {
            actions: {
                behaviorClass: DeleteBehavior
            }
        }
    });
});