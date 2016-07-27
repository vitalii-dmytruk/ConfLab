define([
    'common/route/Route'
], function EditViewSwitcherController(Route) {

    'use strict';

    return Route.extend({
        infoView       : null,
        editView       : null,
        editViewOptions: {},

        constructor: function (options) {
            this.model     = options.model;
            this.container = options.container;
            Route.apply(this, arguments);
        },

        render: function () {
            showInfoView.call(this, !arguments.length);
        }

    });

    function showInfoView(animate) {
        var userView;

        userView = new this.infoView({
            model: this.model
        });

        userView.onEdit = showEditView.bind(this);

        this.container.show(userView, {animate: animate});
    }

    function showEditView() {
        var editView, controller, infoModel, originalModel;

        controller    = this;
        originalModel = this.model;
        infoModel     = _.result(originalModel, 'getInfoModel', originalModel.clone);
        infoModel.url = originalModel.url();

        editView = new this.editView(_.extend({model: infoModel}, this.editViewOptions));

        editView.onCancel = showInfoView.bind(this, false);

        editView.onSubmit = function () {
            infoModel.save(null, {
                wait   : true,
                success: function () {
                    originalModel.set(_.result(infoModel, 'getUpdatableAttributes', infoModel.attributes));
                    showInfoView.call(controller);
                }
            })
        };

        this.container.show(editView);
    }
});