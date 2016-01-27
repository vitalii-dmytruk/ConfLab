define([
    'common/view/EditView',
    'croppie'
], function (EditView) {

    'use strict';


    return EditView.extend({
        ui: {
            croppie        : '#croppie',
            avatarImg:'#avatar-img',
            avatarDiv      : '#avatar-div',
            croppieDiv     : '#croppie-div',
            uploadAvatarBtn: '#upload-avatar-button',
            submitAvatarBtn: '#croppie-submit'
        },

        events: {
            'change @ui.uploadAvatarBtn': showImageEditView,
            'click @ui.submitAvatarBtn' : addImageToModel
        }
    });

    function addImageToModel() {
        var view = this;

        this.$croppie.croppie('result', {
            type: 'canvas',
            size: 'original'
        }).then(function (resp) {
            view.ui.avatarImg.attr('src', resp);
            view.model.image = resp;
            toggleImgView(view);
        });
    }

    function showImageEditView(e) {
        initCroppie(this);
        readFile(e.target.files, this.$croppie);
        toggleImgView(this);
    }

    function initCroppie(view) {
        view.$croppie = view.ui.croppie.croppie({
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
    }

    function readFile(files, $croppie) {
        var file = files && files[0];

        if (file) {
            var reader    = new FileReader();
            reader.onload = function (e) {
                $croppie.croppie('bind', {
                    url: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
        else {
            swal("Sorry - you're browser doesn't support the FileReader API");
        }
    }

    function toggleImgView(view) {
        view.ui.avatarDiv.toggle();
        view.ui.croppieDiv.toggle();
    }
});