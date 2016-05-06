define([
    'event/details/EventItemViewFactory',
    'company/details/CompanyEditView',
    'text!company/table/CompanyRowTemplate.html',
    'text!company/details/CompanyTemplate.html',
    'text!company/details/CompanyEditTemplate.html'
], function (ViewFactory, CompanyEditView, CompanyRowTemplate, CompanyShowTemplate, CompanyEditTemplate) {

    'use strict';

    var viewFactory = ViewFactory.extend({
        getEditView   : function () {
            return CompanyEditView;
        },
        getDetailsView: function () {
            var ParentDetailsView = ViewFactory.prototype.getDetailsView.apply(this, arguments);

            return ParentDetailsView.extend({
                saveModel: function (model) {
                    var view = this;
                    return ParentDetailsView.prototype.saveModel.apply(this, arguments)
                        .then(function () {
                            return model.saveImage().then(function () {
                                view.model.set('image', model.get('image'));
                            });
                        });
                }
            });
        }
    });

    return new viewFactory({
        tableTitle: 'Companies',

        itemRowTemplate : CompanyRowTemplate,
        itemShowTemplate: CompanyShowTemplate,
        itemEditTemplate: CompanyEditTemplate,

        searchLabelAttribute: 'name',

        showBindings: {
            '#name': 'name',
            '#url' : {
                observe   : 'url',
                attributes: [{
                    name   : 'href',
                    observe: 'url'
                }]
            },
            '#logo': logoBindings()
        },

        editBindings: {
            '#name': 'name',
            '#url' : 'url'
        },

        rowBindings: {
            '[data-company-name]': 'name',
            '[data-logo]': logoBindings()
        }
    });

    function logoBindings(){
        return {
            initialize   : function ($el) {
                $el.one('error', function () {
                    this.src = '/img/invalid-image.png';
                });
            },
            attributes: [{
                name   : 'src',
                observe: 'image',
                onGet  : function (value) {
                    return value || '/img/default-logo.jpg';
                }
            }]
        }
    }
});