class ThreeContainer{
    constructor(){
        const t=this

        console.log('experience in construction...')

        t.createScene()

        t.createCamera()

        t.createRenderer()

        t.time = 0

        // t.animate()

        // t.createTest()

        t.addHelpers()

        t.createSceneCube()

        t.addOrbitControls()

    }
    createSceneCube(){
        const t=this

        t.sceneCube = new THREE.Mesh(
            new THREE.BoxGeometry(300,300,300),
            new THREE.MeshBasicMaterial({side:THREE.DoubleSide, color: 0xdddddd})
        )

        t.scene.add(t.sceneCube)


    }
    createScene(){
        const t=this

        t.scene = new THREE.Scene()
    }
    createCamera(){
        const t=this

        // t.camera = new THREE.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 1, 1000 )
        t.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 )

        // t.camera.position.x = 10
        // t.camera.position.y = 0
        // t.camera.position.z = 5

        // t.camera.lookAt(new THREE.Vector3(0,0,0))
    }

    setupCamera(settings){
        const t=this

        // if(!target)
        //     target =  new THREE.Vector3(1,2,0)

        let position = defval(settings.position, new THREE.Vector3(-4, 3, -10))
        let rotation = defval(settings.rotation, null)
        let target = defval(settings.target, false)
        let mouseEffect = defval(settings.mouseEffect, false)
        let fov = defval(settings.fov, 50)

        t.camera.fov = fov

        if(target)
            t.cameraTargetPos = target

        t.camPos = position

        t.camera.position.set(t.camPos.x, t.camPos.y, t.camPos.z)

        if(rotation)
            t.camera.rotation.set(rotation.x,rotation.y,rotation.z)


        t.camera.updateProjectionMatrix()

        if(!mouseEffect) return;

        t.mouse = {}
        document.addEventListener('mousemove', function(event){
            t.mouse.x	= (event.clientX / window.innerWidth ) - 0.5;
            t.mouse.y	= (event.clientY / window.innerHeight) - 0.5;

            t.camera.position.z += (t.mouse.x  - t.camera.position.z) * (1.1) + t.camPos.z;
            t.camera.position.y += (t.mouse.y  - t.camera.position.y) * (1.1) + t.camPos.y;

            if(target) t.camera.lookAt(t.cameraTargetPos.x, t.cameraTargetPos.y, t.cameraTargetPos.z)
        }, false);

    }

    createRenderer(){
        const t=this

        t.renderer = new THREE.WebGLRenderer( { antialias: true} )
        t.renderer.setPixelRatio( 1 )
        t.renderer.setSize( window.innerWidth, window.innerHeight )
        t.renderer.gammaInput = true
        t.renderer.gammaOutput = true
        t.renderer.shadowMap.enabled = true

        $body.append(t.renderer.domElement)

        console.log('experience rendering...')
    }

    createTest(){
        const t=this

        t.sphereTest = new THREE.Mesh(
            new THREE.SphereGeometry(1, 16, 16),
            new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: true} )
        )

        t.scene.add(t.sphereTest)

    }

    addHelpers(){
        const t=this

        t.axesHelper = new THREE.AxesHelper( 5 )
        t.scene.add( t.axesHelper )
    }

    addOrbitControls(){
        const t=this

        t.controls = new THREE.OrbitControls( t.camera, t.renderer.domElement )

    }
    animate(){
        const t=this

        t.time = Date.now()*0.0001

        t.renderer.render( t.scene, t.camera )

        requestAnimationFrame( t.animate.bind(t) )

        if(t.controls)
            t.controls.update()

    }


}