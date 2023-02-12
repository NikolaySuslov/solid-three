import { Mesh } from "three";
import { createSignal, useFrame, useThree } from "../src";

export function Box() {
  let mesh: Mesh | undefined;
  const [hovered, setHovered] = createSignal(false);
  const [xrStart, setxrStart] = createSignal(false);


  useThree((state) => {
    if (!xrStart()) {

      //const XR = ;

      if (navigator.xr) {

        const sessionInit = { optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers'] };
        navigator.xr.requestSession('immersive-vr', sessionInit).then((xrSession) => {
          state.gl.xr.setSession(xrSession)
        });
      } else {
        /* WebXR is not available */
      }

      setxrStart(true)
    }
  })

  useFrame((state, delta, frame) => {



    (mesh!.rotation.y += 0.01)
  });

  return (
    <mesh
      ref={mesh}
      onPointerEnter={e => setHovered(true)}
      onPointerLeave={e => setHovered(false)}
    >
      <boxBufferGeometry />
      <meshStandardMaterial color={hovered() ? "blue" : "green"} />
    </mesh>
  );
}
