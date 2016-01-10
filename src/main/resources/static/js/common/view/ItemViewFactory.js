define([
    'common/behavior/DeleteBehavior',
    'common/behavior/EditBehavior',
    'common/view/EditView',
    'common/view/DetailsView',
    'common/view/RowView',
    'common/view/TableView',
    'backbone.marionette',
    'backbone.stickit'
], function (DeleteBehavior, EditBehavior, EditView, DetailsView, RowView, TableView) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.itemRowTemplate      = options.itemRowTemplate;
            this.itemShowTemplate     = options.itemShowTemplate;
            this.itemEditTemplate     = options.itemEditTemplate;
            this.bindings             = options.bindings;
            this.rowBindings          = options.rowBindings;
            this.title                = options.title;
            this.tableTitle           = options.tableTitle;
            this.searchLabelAttribute = options.searchLabelAttribute;

            this.itemEditView = EditView.extend({
                template  : _.template(this.itemEditTemplate),
                attributes: {
                    style: 'position:relative;'
                },
                bindings  : this.bindings
            });

            this.itemShowView = this.itemEditView.extend({
                template : _.template(this.itemShowTemplate),
                behaviors: {
                    actions: {
                        behaviorClass: EditBehavior
                    }
                }
            });

            this.itemDetailsView = DetailsView.extend({
                title   : this.title,
                EditView: this.itemEditView,
                ShowView: this.itemShowView
            });

            this.itemRowView = RowView.extend({
                template: _.template(this.itemRowTemplate),
                bindings: this.rowBindings
            });

            this.itemTableView = TableView.extend({
                title   : this.tableTitle,
                RowView : this.itemRowView,
                EditView: this.itemEditView,
                searchLabelAttribute: this.searchLabelAttribute
            });

            this.attachedItemTableView = this.itemTableView.extend({
                RowView: this.itemRowView.extend({
                    behaviors: {
                        actions: {
                            behaviorClass: DeleteBehavior
                        }
                    }
                })
            });
        }
    });
});