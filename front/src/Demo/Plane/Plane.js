import * as THREE from "three";
import { useLoader } from '@react-three/fiber';

export default function Plane({ color, ...props }) {
    const texture = useLoader(THREE.TextureLoader, './img/javascript.png')
    return (
        <mesh receiveShadow castShadow {...props}>
            <boxBufferGeometry />
            <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
        </mesh>
    )
}