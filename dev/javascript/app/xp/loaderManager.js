class LoaderManager{
    constructor(settings){
        const t=this

        t.onProgressCb = defval(settings.onProgressCb, null)

        t.onCompleteCb = defval(settings.onCompleteCb, null)

        t.setupLoader()

        t.loader.load(settings.file, (object)=>{
            t.onCompleteCb(object)
        })

    }
    setupLoader(){
        const t=this

        t.setupManager()

        t.loader = new THREE.OBJLoader(t.manager)

    }
    setupManager(){
        const t=this

        t.manager = new THREE.LoadingManager()

        t.manager.onStart = t.onStart

        t.manager.onLoad = t.onLoad

        t.manager.onProgress = t.onProgress

        t.manager.onError = t.onError

    }
    onStart(url, itemsLoaded, itemsTotal){

        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
    }
    onLoad(){

        console.log('loaded')

    }
    onProgress(url, itemsLoaded, itemsTotal){

        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' )
    }
    onError(xhr){
        console.log(xhr)
    }
}


