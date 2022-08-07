// Import modules
import * as THREE from "three";
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
            mixers["idle"] = mixer;
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
  }, [])

  useEffect(() => {
    console.log(char);
  }, [char])


  return (
    char ? <primitive object={char} /> : <></>
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
            gl.setPixelRatio(window.devicePixelRatio);}}>
          <primitive object={new THREE.AxesHelper(20)} />
          <ambientLight intensity={0.7}/>
          <pointLight position={[100, 100, 100]} />
          <CameraControls />
          <Suspense fallback={<Loading />}>
            <Plane position-z={0} scale={[100, 100, 1]} />
            <Model />       
          </Suspense>
      </Canvas>
    </div>
  )
}
