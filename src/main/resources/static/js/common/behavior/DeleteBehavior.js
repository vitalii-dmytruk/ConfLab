define([
    'common/behavior/ItemActionIconsBehavior'
], function DeleteBehavior(ActionIconsBehavior) {
    return ActionIconsBehavior.extend({
        className: 'glyphicon-remove remove',
        doAction : function destroyItem(e) {
            var model = this.view.model;

            model.urlRoot = model.collection.url;
            model.destroy();
            e.preventDefault();
        }
    });
});