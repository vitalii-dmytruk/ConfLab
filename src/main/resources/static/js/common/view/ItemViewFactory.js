define([
    'common/behavior/SearchBehavior',
    'common/behavior/DeleteBehavior',
    'common/behavior/EditBehavior',
    'common/view/EditView',
    'common/view/DetailsView',
    'common/view/RowView',
    'common/view/TableView',
    'backbone.marionette',
    'backbone.stickit'
], function (SearchBehavior, DeleteBehavior, EditBehavior, EditView, DetailsView, RowView, TableView) {

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
                template: _.template(this.itemEditTemplate),
                bindings: this.bindings
            });

            this.itemShowView = this.itemEditView.extend({
                template: _.template(this.itemShowTemplate)
            });

            this.itemAttachView = this.itemEditView.extend({
                behaviors: {
                    search: {
                        behaviorClass : SearchBehavior,
                        labelAttribute: this.searchLabelAttribute
                    }
                }
            });

            this.itemDetailsView = DetailsView.extend({
                title   : this.title,
                EditView: this.itemEditView,
                ShowView: this.itemShowView,
                behaviors : {
                    actions: {
                        behaviorClass: EditBehavior
                    }
                }
            });

            this.itemRowView = RowView.extend({
                template: _.template(this.itemRowTemplate),
                bindings: this.rowBindings
            });

            this.itemTableView = TableView.extend({
                title   : this.tableTitle,
                RowView : this.itemRowView,
                EditView: this.itemEditView
            });

            this.attachedItemTableView = this.itemTableView.extend({
                RowView : this.itemRowView.extend({
                    behaviors: {
                        actions: {
                            behaviorClass: DeleteBehavior
                        }
                    }
                }),
                EditView: this.itemAttachView,
                editView: function () {
                    var model = new this.collection.model();

                    model.urlRoot = this.collection.url;

                    return new this.EditView({
                        model     : model,
                        collection: this.options.searchCollection
                    });
                }
            });
        }
    });
});