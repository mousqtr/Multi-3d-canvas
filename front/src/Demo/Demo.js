// Import modules
import * as THREE from "three";
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useLoader, extend, useFrame, useThree } from '@react-three/fiber';
import { useFBX, useGLTF, useAnimations } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Import components
import Loading from "./Loading/Loading";
import Plane from "./Plane/Plane";
import CameraControls from "./CameraControls/CameraControls";

// Import style
import './Demo.css';


function Model (props) {
  
  const [char, setChar] = useState(undefined);
  const [actions, setActions] = useState({});
  const [mixers, setMixers] = useState({});

  useEffect(() => {
    let actions = {};
    let mixers = {};
    const loaderCharacter = new FBXLoader();
    loaderCharacter.load('models/character.fbx', (character) => {
  
        // Load the model
        character.scale.setScalar(0.3);
        character.position.set(0, 0, -30)
        character.rotation.set(Math.PI/2, 0, 0)
        character.traverse(child => {
            child.castShadow = true;
            child.receiveShadow = true;
        });
  
        // Load the idle animation
        const loaderWalk = new FBXLoader();
        loaderWalk.load('models/walk.fbx', (walk) => {
            const mixer = new THREE.AnimationMixer(character);     
            const action = mixer.clipAction( walk.animations[0] );
            mixers["walk"] = mixer;
            actions["walk"] = action;
            // action.play();
        });
  
        // Load the walk animation
        const loaderIdle = new FBXLoader();
        loaderIdle.load('models/idle.fbx', (idle) => {
            const mixer = new THREE.AnimationMixer(character);     
            const action = mixer.clipAction( idle.animations[0] );
            mixers["idle"] = mixer;
            actions["idle"] = action;
            action.play();
        });
  
        // scene.add(character);
        setChar(character);
    });
  
    const clock = new THREE.Clock();
    animate();
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if ( mixers["idle"] ) mixers["idle"].update( delta );
      if ( mixers["walk"] ) mixers["walk"].update( delta );
    }

    setActions(actions);
    setMixers(mixers);
  }, [])

  useEffect(() => {
    console.log('Model is loaded');
  }, [char])

  useEffect(() => {
    if (actions["walk"] && props.anim === 'walk') {
      console.log(props.anim);
      actions["walk"].play();
    }
  }, [actions, props.anim])

  return (
    char ? <primitive object={char} /> : <></>
  )
}

export default function Demo () {

  const [currentAnim, setCurrentAnim] = useState('idle');

  return (
    <div className="demo">
      <button onClick={() => setCurrentAnim('walk')}>Animation</button>
      <Canvas 
          camera={{ position: [0, -100, 100], fov: 55 }}
          gl={{ antialias: true }}
          onCreated={({ gl, scene }) => {       
            gl.setPixelRatio(window.devicePixelRatio);}}>
          <primitive object={new THREE.AxesHelper(20)} />
          <ambientLight intensity={0.7}/>
          <pointLight position={[100, 100, 100]} />
          <CameraControls />
          <Suspense fallback={<Loading />}>
            <Plane position-z={0} scale={[100, 100, 1]} />
            <Model anim={currentAnim}/>       
          </Suspense>
      </Canvas>
    </div>
  )
}
