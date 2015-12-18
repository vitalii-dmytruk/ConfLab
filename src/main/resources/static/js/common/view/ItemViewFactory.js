define([
    'common/behavior/SearchBehavior',
    'common/view/EditView',
    'common/view/DetailsView',
    'common/view/RowView',
    'common/view/TableView',
    'backbone.marionette',
    'backbone.stickit'
], function (SearchBehavior, EditView, DetailsView, RowView, TableView) {

    'use strict';

    return Marionette.Object.extend({

        initialize: function (options) {
            this.itemRowTemplate  = options.itemRowTemplate;
            this.itemShowTemplate = options.itemShowTemplate;
            this.itemEditTemplate = options.itemEditTemplate;
            this.bindings         = options.bindings;
            this.rowBindings      = options.rowBindings;
            this.title            = options.title;
            this.tableTitle       = options.tableTitle;

            this.itemEditView = EditView.extend({
                template: _.template(this.itemEditTemplate),
                bindings: this.bindings
            });

            this.itemShowView = this.itemEditView.extend({
                template: _.template(this.itemShowTemplate)
            });

            this.itemAttachView = this.itemEditView.extend({
                behaviors: {
                    search: {behaviorClass: SearchBehavior}
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
                EditView: this.itemEditView
            });

            this.attachedItemTableView = this.itemTableView.extend({
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