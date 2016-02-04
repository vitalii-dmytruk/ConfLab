define([
    'text!common/image/ImageShowTemplate.html',
    'backbone.radio',
    'backbone.marionette'
], function ImageShowView(template, Radio) {

    'use strict';

    return Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            imageEl       : '#image',
            imageFile     : '#image-file',
            imageDeleteBtn: '#image-delete-btn'
        },

        events: {
            'change @ui.imageFile'    : readFile,
            'click @ui.imageDeleteBtn': deleteImage
        },

        onRender: function () {
            initImage(this);
            updateDeleteBtnState(this);
        }
    });

    function initImage(view) {
        var options = view.options;
        view.ui.imageEl.on('error', function () {
            this.src = options.defaultImage;
        });
        view.ui.imageEl.attr('src', options.url || view.model.get(options.imageUrlAttr) || "");
    }

    function updateDeleteBtnState(view) {
        var imageUrlAttr   = view.options.imageUrlAttr,
            model          = view.model,
            isImageChanged = model.get(imageUrlAttr) || model.image;
        view.ui.imageDeleteBtn.toggleClass('hidden', !isImageChanged);
    }

    function readFile(e) {
        var view  = this,
            files = e.target.files,
            file  = files && files[0];

        if (file) {
            var reader    = new FileReader();
            reader.onload = function (e) {
                view.triggerMethod('image:uploaded', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            notify("Sorry - you're browser doesn't support the FileReader API");
        }
    }

    function deleteImage() {
        var model       = this.model;

        model.isDeleted = true;
        model.image     = null;
        this.ui.imageEl.attr('src', "");
        this.ui.imageDeleteBtn.addClass('hidden');
    }

    function notify(message) {
        Radio.channel('notify').warn(message);
    }
});