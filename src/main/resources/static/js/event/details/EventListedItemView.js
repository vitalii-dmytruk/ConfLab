define([
    'common/navigation/NavigationItemView',
    'common/behavior/ItemActionIconsBehavior'
], function EventComponentItemView(NavigationItemView, ItemActionIcons) {
    return NavigationItemView.extend({
        template: _.template('<a href="#"></a>'),

        behaviors: {
            actions: {
                behaviorClass: ItemActionIcons
            }
        },

        triggers: {
            'click a': 'item:clicked'
        },

        onRender: function () {
            this.addBinding(null, 'a', this.options.labelAttribute);
        }
    });
});