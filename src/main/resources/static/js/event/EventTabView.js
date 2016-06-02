define([
    'common/navigation/NavigationItemView'
], function EventTabView(NavigationItemView) {

    'use strict';

    return NavigationItemView.extend({
        template: _.template('<a id = "<%-id%>-tab" role="button"><%- label%></a>'),

        triggers: {
            'click a': 'clicked'
        }
    });
});