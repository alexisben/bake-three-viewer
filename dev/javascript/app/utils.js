//TODO Réecrire ces scripts en ES6 et en beau
const Events = {
    DOWN : isTouch ? "touchstart" : "mousedown",
    UP : isTouch ? "touchend" : "mouseup",
    CLICK : "click",
    MOVE : isTouch ? "touchmove" : "mousemove",
    ENTER : "mouseenter",
    LEAVE : "mouseleave",
    OVER : "mouseover",
    OUT : "mouseout",
    WHEEL : "mousewheel DOMMouseScroll MozMousePixelScroll",
    SCROLL : "scroll"
}


function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function slugify (text) {
    const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
    const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(p, c =>
            b.charAt(a.indexOf(c)))     // Replace special chars
        .replace(/&/g, '-and-')         // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '')             // Trim - from end of text
}


function vlLoadImages ($tabImg, completeCB, progressCB)
{
    var isJQuery = typeof $tabImg['jquery'] !== 'undefined';
    var total = $tabImg.length;
    var loaded = 0;
    var startTime = new Date();

    if (total == 0)
    {
        if (progressCB)
            progressCB (1);
        if (completeCB)
            complete ();
        return;
    }

    $tabImg.each (function () {
        var img = new Image();
        var url = isJQuery ? $(this).attr('src') : this;
        if (!url)
        {
            imgLoaded();
            return;
        }

        img.src = url;
        if (img.complete || img.naturalWidth)
        {
            imgLoaded.apply(img);
        }
        else
        {
            img = new Image();
            img.onload = imgLoaded;
            img.onerror = imgLoaded;
            img.onabort = imgLoaded;
            img.src = url;
        }
    });

    function imgLoaded ()
    {
        loaded++;
        if (progressCB)
        {
            progressCB (loaded / total);
        }
        if (loaded == total && completeCB)
        {
            complete ();
        }
    }

    function complete ()
    {
        var now = new Date ();
        var time = now - startTime;
        if ( time >0 && time < 1000)
        {
            setTimeout (completeCB, 1000 - time);
        }
        else
            completeCB ();
    }
}







function cropImage ($img, complete)
{

    if (typeof complete == 'undefined')
        complete = function(){};

    vlLoadImages($img, function() {
        var w, h, ow, oh, mw, mh;
        $img.css({width: 'auto',height: 'auto'});
        mw = $img.parent().width();
        mh = $img.parent().height();
        ow = $img.width();
        oh = $img.height();

        w = mw;
        h = oh / ow * mw;

        if (h < mh)
        {
            h = mh;
            w = ow / oh * mh;
        }

        $img.css({
            position: 'relative',
            width: w,
            height: h,
            left: (mw - w) / 2,
            top: (mh - h) / 2
        });


        if(complete) complete ();

    });
}

function simpleCrop ($img, complete, ow, oh)
{
    var w, h, ow, oh, mw, mh;
    $img.css({width: 'auto',height: 'auto'});
    mw = $img.parent().width();
    mh = $img.parent().height();
    ow = ow ? ow : $img.width();
    oh = oh ? oh : $img.height();

    w = mw;
    h = oh / ow * mw;

    if (h < mh)
    {
        h = mh;
        w = ow / oh * mh;
    }

    $img.css({
        position: 'relative',
        width: w,
        height: h,
        left: (mw - w) / 2,
        top: (mh - h) / 2
    });

    if(complete) complete ();
}



function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}



function cropSprite (spr, mw, mh) {

    setCropSize(spr, mw, mh)

    spr.x =  (mw - spr.width) / 2
    spr.y = (mh - spr.height) / 2

}

function setCropSize(spr, mw, mh){
    let w, h,
        ow = spr.width,
        oh = spr.height

    if(spr.video){
        ow = spr.video.videoWidth || spr.width
        oh = spr.video.videoHeight || spr.height
    }

    w = mw;
    h = oh / ow * mw;

    if (h < mh) {
        h = mh;
        w = ow / oh * mh;
    }

    spr.width = w
    spr.height = h
}


function cropSpriteCenter (spr, mw, mh)
{

    setCropSize(spr, mw, mh)

    spr.anchor.set(.5)
    spr.x = mw/2
    spr.y = mh/2

}


function defval(_val, _default){
    return typeof _val !== 'undefined' ? _val : _default;
}

const CSS_TRANSFORM = (function(){
    let prefixes = 'transform webkitTransform mozTransform oTransform msTransform'.split(' ')
        , el = document.createElement('div')
        , cssTransform
        , i = 0
    while( cssTransform === undefined ){
        cssTransform = document.createElement('div').style[prefixes[i]] != undefined ? prefixes[i] : undefined
        i++
    }
    return cssTransform
})()


function slugify(text) {

    let a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    let b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
    let p = new RegExp(a.split('').join('|'), 'g');

    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '')
        .replace(p, function (c) {
            return b.charAt(a.indexOf(c));
        })
        .replace(/&/g, '')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '')
        .replace(/\-/g, '')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000/60) }

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};



// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};