import React, {useRef, useState} from 'react';
import {Canvas, useFrame} from 'react-three-fiber';

function CoinCore(props) {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [speed, setSpeed] = useState(false);

  useFrame(() => {
    if (active) {
      if (speed < 0.2) {
        setSpeed(speed + 0.005);
      }
      mesh.current.rotation.x += speed;
    } else {
      mesh.current.rotation.x = Math.PI / 2;
      setSpeed(0);
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
        <cylinderBufferGeometry attach="geometry" args={[3, 3, 0.25, 100, 1]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Coin(props) {
  return (
    <Canvas pixelRatio={window.devicePixelRatio}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CoinCore position={[0, 0, 0]} />
    </Canvas>
  );
}

export default Coin;
