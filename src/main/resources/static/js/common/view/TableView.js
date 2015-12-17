define([
    'text!common/view/TableTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title : '#table-title',
            addBtn: '#add-button'
        },

        events: {
            'click @ui.addBtn': showAddItemView
        },

        regions: {
            editRegion: '#edit-region',
            listRegion: '#list-region'
        },

        initialize: function (options) {

        },

        onRender: function () {
            setPageTitle(this);
        },

        onBeforeShow: function () {
            this.listRegion.show(new Marionette.CollectionView({
                childView : this.options.RowView,
                collection: this.collection
            }));
        },

        editView: function(){
            return new this.options.EditView({
                model: new this.collection.model()
            });
        }

    });

    function showAddItemView() {
        var view, editView;

        view = this;

        editView = this.editView();

        editView.onSubmit = function (args) {
            view.collection.create(args.model, {
                wait   : true,
                success: function () {
                    editView.destroy();
                }
            });
        };

        editView.onCancel = function () {
            editView.destroy();
        };

        this.editRegion.show(editView);
    }

    function setPageTitle(view) {
        view.ui.title.text(view.options.title);
    }
});