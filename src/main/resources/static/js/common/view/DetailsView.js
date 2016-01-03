define([
    'text!common/view/DetailsTemplate.html',
    'backbone.marionette'
], function (template) {

    'use strict';

    return Marionette.LayoutView.extend({

        template: _.template(template),

        ui: {
            title  : '#page-title',
            editBtn: '#edit-button'
        },

        events: {
            'click @ui.editBtn': showEditView
        },

        regions: {
            editRegion: '[data-edit-region]'
        },

        onRender: function () {
            setPageTitle(this);
            appendChildViews(this);
        },

        onBeforeShow: showShowView

    });

    function appendChildViews(view) {
        _.each(view.options.childViews, function (childView) {
            view.$el.append(childView.render().el);
        })
    }

    function showEditView() {
        var view, editView;

        view = this;

        editView = new this.EditView({
            model: this.model.clone()
        });

        editView.onSubmit = save.bind(view);
        editView.onCancel = showShowView.bind(view);

        this.editRegion.show(editView);
    }

    function save(args) {
        var view = this;
        args.model.save().done(function () {
            view.model.set(args.model.attributes);
            showShowView.call(view);
        });
    }


    function showShowView() {
        this.editRegion.show(new this.ShowView({
            model: this.model
        }));
    }

    function setPageTitle(view) {
        view.ui.title.text(view.title);
    }
});