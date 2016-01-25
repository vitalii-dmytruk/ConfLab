define([
    'backbone.marionette',
    'backbone.stickit',
    'backbone.validation'
], function () {

    'use strict';

    return Marionette.ItemView.extend({
        initialize: function () {
            Backbone.Validation.bind(this);
        },

        ui: {
            submitBtn: '[data-submit-btn]',
            cancelBtn: '[data-cancel-btn]'
        },

        triggers: {
            'click @ui.submitBtn': 'submit',
            'click @ui.cancelBtn': 'cancel'
        },

        onRender    : function () {
            this.stickit();
        },
        onDomRefresh: function () {
            var $uploadCrop;
            var croppie = $('#croppie');
            if (croppie) {
                $uploadCrop = croppie.croppie({
                    viewport: {
                        width : 150,
                        height: 150,
                        type  : 'circle'
                    },
                    boundary: {
                        width : 200,
                        height: 200
                    }
                });

                var readFileFunction = function readFile(input) {
                    if (input.files && input.files[0]) {
                        var reader    = new FileReader();
                        reader.onload = function (e) {
                            $uploadCrop.croppie('bind', {
                                url: e.target.result
                            });
                        };
                        reader.readAsDataURL(input.files[0]);
                    }
                    else {
                        swal("Sorry - you're browser doesn't support the FileReader API");
                    }
                };

                var toggleImgView = function () {
                    $('#avatar-div').toggle();
                    $('#croppie-div').toggle();
                };

                $('#upload-avatar-button').on('change', function () {
                    toggleImgView();
                    readFileFunction(this);
                });

                $('#croppie-submit').on('click', function (e) {
                    e.preventDefault();
                    $uploadCrop.croppie('result', {
                        type: 'canvas',
                        size: 'original'
                    }).then(function (resp) {
                        $('#avatar-img').attr('src', resp);
                        $('#imagebase64').val(resp);
                        toggleImgView();
                    });
                });
            }
        }
    });
});