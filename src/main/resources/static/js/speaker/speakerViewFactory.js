define([
    'common/CollectionBinding',
    'event/details/EventItemViewFactory',
    'company/CompanyCollection',
    'text!speaker/table/SpeakerRowTemplate.html',
    'text!speaker/details/SpeakerTemplate.html',
    'text!speaker/details/SpeakerEditTemplate.html',
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
            '#email'   : {
                attributes: [{
                    name: 'href',
                    observe: 'email',
                    onGet: function (val) {
                        return 'mailto:' + val;
                    }
                }],
                observe: 'email'
            },
            '#name'    : 'name',
            '#position': 'position',
            '#company': companyBinder(),
            '#about'   : 'about',
            '#avatar-img'   : imageBinder('image')
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
                    var defaultAvatarPath = '/img/default-avatar.png';

                    var image = options.view.model.attributes.image;
                    if (defaultAvatarPath != image) {
                        $('#remove-button').on('click', function () {
                            console.log('click');
                        })
                    }

                    //return val || '/img/default-avatar.png';
                    if (val) {
                        return val;
                    } else {
                        return '/img/default-avatar.png';
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
                onGet  : function (val) {
                    return val;
                }
            }]
        }
    }
});
