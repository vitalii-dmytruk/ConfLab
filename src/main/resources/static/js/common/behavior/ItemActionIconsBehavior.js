define([
    'text!common/behavior/ActionIconsTemplate.html',
    'backbone.marionette'
], function ItemActionIconsBehavior(template) {

    //noinspection JSUnusedGlobalSymbols
    return Marionette.Behavior.extend({
        ui: {
            actionIcons: '[data-actions]'
        },

        events: {
            'mouseenter'           : showActionIcons,
            'mouseleave'           : hideActionIcons,
            'click @ui.actionIcons': destroyItem
        },

        onBeforeRender: function () {
            var originalTemplateFunc   = this.view.getTemplate();
            this.view.options.template = _.compose(function (origin) {
                return origin + template;
            }, originalTemplateFunc);
        },

        onActivated: showActionIcons,
        onDeactivated: hideActionIcons
    });

    function hideActionIcons() {
        isActive(this.view) || this.ui.actionIcons.hide(100);
    }

    function showActionIcons() {
        this.ui.actionIcons.show(100);
    }

    function isActive(view) {
        return view.$el.hasClass('active');
    }

    function destroyItem(e) {
        var model = this.view.model;

        model.urlRoot = model.collection.url;
        model.destroy();
        e.preventDefault();
    }
});