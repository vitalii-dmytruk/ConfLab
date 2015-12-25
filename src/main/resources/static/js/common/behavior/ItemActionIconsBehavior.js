define([
    'text!common/behavior/ActionIconsTemplate.html',
    'backbone.marionette'
], function ItemActionIconsBehavior(template) {
    return Marionette.Behavior.extend({
        ui: {
            actionIcons: '[data-actions]'
        },

        events: {
            'mouseenter'           : showActionIcons,
            'mouseleave'           : hideActionIcons,
            'click @ui.actionIcons': function (e) {
                return e.type;
            }
        },

        onBeforeRender: function () {
            //var actions = _.template(template);
            //this.$el.append($(actions));
        }
    });

    function hideActionIcons() {
        this.ui.actionIcons.hide(100);
    }

    function showActionIcons() {
        this.ui.actionIcons.show(100);
    }
});