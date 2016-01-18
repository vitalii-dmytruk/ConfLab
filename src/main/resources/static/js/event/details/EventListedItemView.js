define([
    'common/navigation/NavigationItemView',
    'common/behavior/DeleteBehavior'
], function EventComponentItemView(NavigationItemView, DeleteBehavior) {
    return NavigationItemView.extend({
        template: _.template('<a href="#"></a>'),

        behaviors: {
            actions: {
                behaviorClass: DeleteBehavior
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