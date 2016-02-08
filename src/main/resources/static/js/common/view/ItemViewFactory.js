define([
    'common/behavior/DeleteBehavior',
    'common/behavior/EditBehavior',
    'common/view/EditView',
    'common/view/ShowView',
    'common/view/DetailsView',
    'common/view/RowView',
    'common/view/TableView',
    'backbone.marionette',
    'backbone.stickit'
], function (DeleteBehavior, EditBehavior, EditView, ShowView, DetailsView, RowView, TableView) {

    'use strict';

    return Marionette.Object.extend({
        props: [
            'itemRowTemplate', 'itemShowTemplate', 'itemEditTemplate', 'showBindings', 'editBindings', 'rowBindings',
            'title', 'tableTitle', 'searchLabelAttribute'
        ],

        initialize: function (options) {
            this.mergeOptions(options, this.props);

            this.itemEditView = this.getEditView().extend({
                template: _.template(this.itemEditTemplate),
                bindings: this.editBindings
            });

            this.itemShowView = this.getShowView().extend({
                template: _.template(this.itemShowTemplate),
                bindings: this.showBindings
            });

            this.itemDetailsView = this.getDetailsView();

            this.itemRowView = this.getRowView().extend({
                template: _.template(this.itemRowTemplate),
                bindings: this.rowBindings
            });

            this.itemTableView = this.getTableView();

            this.attachedItemTableView = this.getAttachedTableView();
        },

        getEditView: function () {
            return EditView;
        },

        getShowView: function () {
            return ShowView;
        },

        getDetailsView: function () {
            return DetailsView.extend({
                EditView: this.itemEditView,
                ShowView: this.itemShowView
            });
        },

        getRowView: function () {
            return RowView;
        },

        getTableView: function () {
            return TableView.extend({
                title               : this.tableTitle,
                RowView             : this.itemRowView,
                EditView            : this.itemEditView,
                searchLabelAttribute: this.searchLabelAttribute
            });
        },

        getAttachedTableView: function () {
            return this.itemTableView.extend({
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