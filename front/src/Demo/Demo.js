// Import modules
import * as THREE from "three";
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader, extend, useFrame, useThree } from '@react-three/fiber';
import { useFBX, useAnimations } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Import components
import Loading from "./Loading/Loading";
import Plane from "./Plane/Plane";
import CameraControls from "./CameraControls/CameraControls";

// Import style
import './Demo.css';



export default function Demo () {
  const group = useRef();
  // const fbx = useLoader(FBXLoader, '/models/character.fbx');
  // const idle = useLoader(FBXLoader, '/models/idle.fbx');

  const fbx = useFBX("./models/character.fbx");
  const { animations } = useFBX("./models/idle.fbx");

  console.log(animations);
  const { actions, names  } = useAnimations(animations, fbx);

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
            gl.setPixelRatio(window.devicePixelRatio);}}>
          <ambientLight intensity={0.7}/>
          <pointLight position={[100, 100, 100]} />
          <CameraControls />
          <Suspense fallback={<Loading />}>
            <Plane position-z={0} scale={[100, 100, 1]} />
            <primitive rotation-x={Math.PI/2} scale={0.5} object={fbx} />             
          </Suspense>
      </Canvas>
    </div>
  )
}
