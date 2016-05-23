define([
    'text!common/image/ImageShowTemplate.html',
    'backbone.radio',
    'backbone.marionette'
], function ImageShowView(template, Radio) {

    'use strict';

    var SUPPORTED_IMAGE_SIZE = 10; //in Megabytes

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
        var $img    = view.ui.imageEl;
        $img.on('error', function () {
            this.src = options.defaultImage;
        });
        $img.attr('src', options.url || view.model.get(options.imageUrlAttr) || "");
        $img.addClass(options.imageClass)
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

        if (isValid(file)) {
            var reader    = new FileReader();
            reader.onload = function (e) {
                view.triggerMethod('image:uploaded', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    function isValid(file) {
        if (!file) {
            notify("Sorry - you're browser doesn't support the FileReader API");
        } else if (file.size > SUPPORTED_IMAGE_SIZE * 1024 * 1024) {
            notify('Maximum file size is ' + SUPPORTED_IMAGE_SIZE + ' megabytes');
        } else {
            return true;
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
        Radio.channel('notify').request('error', message);
    }
});