define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'company/CompanyCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html'
    'jquery.file.upload',
    'croppie'
], function (CollectionBinding, ViewFactory, CompanyCollection, SpeakerRowTemplate,
             SpeakerShowTemplate, SpeakerEditTemplate) {

    'use strict';

    return new ViewFactory({
        title     : 'Speaker',
        tableTitle: 'Speakers',

        itemRowTemplate : SpeakerRowTemplate,
        itemShowTemplate: SpeakerShowTemplate,
        itemEditTemplate: SpeakerEditTemplate,

        searchLabelAttribute: 'name',

        editBindings: viewBindings(directImage,companySelectBinder),
        showBindings: viewBindings(showImage,companyNameBinder),

        rowBindings: {
            '[data-name]': 'name',
            '[data-company]': companyNameBinder(),
            '[data-position]': 'position',
            '[data-email]'   : 'email'
        }
    });

    function viewBindings(imageBinder, companyBinder) {
        return {
            '#email': {
                attributes: [{
                    name: 'href',
                    observe: 'email',
                    onGet: function (val) {
                        return 'mailto:' + val;
                    }
                }],
                observe: 'email'
            },
            '#name': 'name',
            '#position': 'position',
            '#company': companyBinder(),
            '#about': 'about',
            '#image'   : imageBinder()
        };
    }

    function companySelectBinder() {
        return new CollectionBinding(CompanyCollection, 'company', true);
    }

    function companyNameBinder() {
        return {
            observe: 'company',
            onGet: function (value) {
                return value && value.name;
            }
        }
    }

    function directImage(attribute) {
        return {
            attributes: [{
                name   : 'src',
                observe: attribute,
                onGet  : function (val, options) {
                    if (val != null) {
                        var id      = options.view.model.id;
                        var path    = '/img/avatars/' + id + '/' + val;
                        var urlPath = "url('" + path + "')";
                        $('div[data-drop-zone]').css('background', urlPath);
                        return "background: " + urlPath + ' no-repeat center;  background-size: 160px 160px';
                        //return 'img/avatars/' + id + '/' + val;
                    } else {
                        return 'img/default-avatar.png';
                    }
                }
            }]
        }
    }

    function showImage(attribute) {
        return {
            attributes: [{
                name   : 'src',
                observe: attribute,
                onGet  : function (val, options) {
                    if (val != null) {
                        var id = options.view.model.id;
                        return 'img/avatars/' + id + '/' + val;
                    } else {
                        return 'img/default-avatar.png';
                    }
                }
            }]
        }
    }
});
