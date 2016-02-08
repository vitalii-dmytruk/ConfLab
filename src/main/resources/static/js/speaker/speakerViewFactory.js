define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'speaker/details/SpeakerEditView',
    'company/CompanyCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
], function (CollectionBinding, ViewFactory, SpeakerEditView, CompanyCollection, SpeakerRowTemplate,
    SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    var viewFactory = ViewFactory.extend({
        getEditView   : function () {
            return SpeakerEditView;
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
        title     : 'Speaker',
        tableTitle: 'Speakers',
        rowItemClass : 'speaker-row-item',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute: 'name',

        editBindings: viewBindings(companySelectBinder),
        showBindings: _.extend(viewBindings(companyNameBinder), {
            '#avatar-img': avatarBinder()
        }),

        rowBindings: {
            '[data-name]'    : 'name',
            '[data-avatar]'  : avatarBinder(),
            '[data-company]' : companyNameBinder(),
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }
    });

    function viewBindings(companyBinder) {
        return {
            '#email'   : {
                attributes: [{
                    name   : 'href',
                    observe: 'email',
                    onGet  : function (val) {
                        return 'mailto:' + val;
                    }
                }],
                observe   : 'email'
            },
            '#name'    : 'name',
            '#position': 'position',
            '#company' : companyBinder(),
            '#about'   : 'about'

        };
    }

    function companySelectBinder() {
        return new CollectionBinding(CompanyCollection, 'company', true);
    }

    function companyNameBinder() {
        return {
            observe: 'company',
            onGet  : function (value) {
                return value && value.name;
            }
        }
    }

    function avatarBinder() {
        return {
            initialize   : function ($el) {
                $el.one('error', function () {
                    this.src = '/img/invalid-image.png';
                });
            },
            attributes: [{
                name   : 'src',
                observe: 'image',
                onGet : function (value) {
                    return value || '/img/default-avatar.png';
                }
            }]
        }
    }
});
