let $window,
    $document,
    $header,
    $body,
    $loader,
    $footer,
    $wrapper

$(window).on('load',()=>{

    $window = $(window)

    document = $(document)

    $header = $('header')

    $body = $('body')

    $loader = $('#main-loader')

    $footer = $('footer')

    $wrapper = $('#wrapper')

    if(isIE){
        $body.addClass('ie')
    }
    if(isSafari){
        $body.addClass('safari')
    }
    if(isFirefox){
        $body.addClass('firefox')
    }

    console.log($window)

    window.website = new Richelieu()
})
