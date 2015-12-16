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
            this.title    = options.title;
            this.EditView = options.EditView;
            this.RowView  = options.RowView
        },

        onRender: function () {
            setPageTitle(this);
        },

        onBeforeShow: function () {
            this.listRegion.show(new Marionette.CollectionView({
                childView : this.RowView,
                collection: this.collection
            }));
        }

    });

    function showAddItemView() {
        var view, editView;

        view = this;

        editView = new this.EditView({
            model: new this.collection.model()
        });

        editView.onSubmit = function (args) {
            this.model.save().done(function () {
                view.collection.add(args.model);
            });
            editView.destroy();
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