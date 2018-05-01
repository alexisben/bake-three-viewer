let camera;


class Experience extends ThreeContainer{
  constructor(){
    super()
    const t=this

    t.mainMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff,side:THREE.DoubleSide})

    t.test()

    t.animate()

  }
  test(){
    const t=this

    let loader = new THREE.TextureLoader()

    loader.load(
      'test/bake.jpg',
      function(texture){
        console.log(texture)
        new LoaderManager({
          file:'test/model.obj',
          onCompleteCb:(object)=>{
            object.traverse(( child ) => {
              if ( child instanceof THREE.Mesh ) {
                let mesh = new THREE.Mesh(child.geometry, t.mainMaterial.clone())
                mesh.material.map = texture
                t.scene.add(mesh)
              }
            })
          }
        })
      },
      function(pg){
        console.log(pg)
      },
      function ( err ) {
        console.error( err );
      }
    );

    t.setupCamera({
      position : new THREE.Vector3(10,0,0),
      target :  new THREE.Vector3(0,0,0),
      mouseEffect : false,
      fov: 28
    })

    camera = t.camera
  }
}