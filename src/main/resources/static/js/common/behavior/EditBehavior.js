define([
    'common/behavior/ItemActionIconsBehavior'
], function EditBehavior(ActionIconsBehavior) {
    return ActionIconsBehavior.extend({
        triggers: {
            'dblclick': 'edit'
        },

        className: 'glyphicon-pencil edit',
        doAction : function destroyItem() {
            this.view.triggerMethod('edit');
        }
    });
});