// Import modules
import * as THREE from "three";
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, extend, useFrame, useThree } from '@react-three/fiber';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Import components
import Loading from "./Loading/Loading";
import Plane from "./Plane/Plane";
import CameraControls from "./CameraControls/CameraControls";

// Import style
import './Demo.css';


function Model () {
  // const ref1 = useRef();

  const fbx = useLoader(FBXLoader, '/models/character.fbx');
  // const idle = useLoader(FBXLoader, '/models/idle.fbx');
  
  // console.log(idle)

  // const { scene } = useGLTF('/models/character.gltf');
  // const { animations } = useGLTF('/models/character.gltf');

  // const { actions } = useAnimations(animations)
  
  // console.log(actions)

  // const { ref, mixer, names, actions, clips } = useAnimations(idle.animations);
  
  // const fbx = useFBX('/models/character.fbx');
  // const idle = useFBX('/models/idle.fbx');
  // const { actions } = useAnimations(idle.animations);

  // useEffect(() => {
  //   console.log(ref)
  //   console.log(mixer)
  //   console.log(names)
  //   console.log(actions)
  //   console.log(clips)
  // });
  useEffect(() => {
    console.log('ok');
    return () => console.log('done')
  }, [])


  return (
    <group>
      <primitive rotation-x={Math.PI/2} scale={0.5} object={fbx} />   
    </group>
  )
}

export default function Demo () {
  // const fbx = useLoader(FBXLoader, '/models/character.fbx');
  // const idle = useLoader(FBXLoader, '/models/idle.fbx');



  // useEffect(() => {
  //   actions.test_anim.play()
  // });

  // useEffect(() => {
  //   // Reset and fade in animation after an index has been changed
  //   actions[0].reset().fadeIn(0.5).play()
  //   // In the clean-up phase, fade it out
  //   return () => actions[0].fadeOut(0.5)
  // }, [actions, names])

  return (
    <div className="demo">
      <Canvas 
          camera={{ position: [0, -100, 100], fov: 55 }}
          gl={{ antialias: true }}
          onCreated={({ gl, scene }) => {
            console.log("WebGLRenderer", gl);
            console.log("SCENE", scene);
            scene.add(new THREE.AxesHelper(20));   
            
            var models = {};
            var mixers = {};
            var actions = {};
            const loaderCharacter = new FBXLoader();
            loaderCharacter.load('models/character.fbx', (character) => {

                // Load the model
                character.scale.setScalar(0.2);
                character.position.set(0, 0, 0)
                character.rotation.set(Math.PI/2, 0, 0)
                character.traverse(child => {
                    child.castShadow = true;
                    child.receiveShadow = true;
                });

                // Load the idle animation
                const loaderWalk = new FBXLoader();
                loaderWalk.load('models/idle.fbx', (walk) => {
                    const mixer = new THREE.AnimationMixer(character);     
                    const action = mixer.clipAction( walk.animations[0] );
                    mixers["idle"] = mixer
                    actions["idle"] = action;
                    actions["idle"].play();
                });

                // Load the walk animation
                const loaderIdle = new FBXLoader();
                loaderIdle.load('models/walk.fbx', (idle) => {
                    const mixer = new THREE.AnimationMixer(character);     
                    const action = mixer.clipAction( idle.animations[0] );
                    mixers["walk"] = mixer
                    actions["walk"] = action;
                });

                scene.add(character);
                models["character"] = character;
            });

            const clock = new THREE.Clock();
            animate();
            function animate() {
                requestAnimationFrame(animate);
                const delta = clock.getDelta();
                if ( mixers["idle"] ) mixers["idle"].update( delta );
                if ( mixers["walk"] ) mixers["walk"].update( delta );
                // renderer.render(scene, camera);
            }
            gl.setPixelRatio(window.devicePixelRatio);}}>
          <ambientLight intensity={0.7}/>
          <pointLight position={[100, 100, 100]} />
          <CameraControls />
          <Suspense fallback={<Loading />}>
            <Plane position-z={0} scale={[100, 100, 1]} />
            {/* <Model />        */}
          </Suspense>
      </Canvas>
    </div>
  )
}
