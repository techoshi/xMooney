import { useFrame, useLoader } from "@react-three/fiber";
import React, { useMemo, useCallback, useEffect, useRef } from "react";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useFBX } from "@react-three/drei";
import * as THREE from "three";
import { Physics, usePlane, useConvexPolyhedron } from "@react-three/cannon";
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader';

import { Mesh } from "three";

const Character = (props) => {

  const camera = props.camera;
   const character = useRef();
  const model = useLoader(GLTFLoader, '/robot2/scene.gltf');
  // const geo = useMemo(() => toConvexProps(nodes.Cylinder.geometry), [model.nodes ? model.nodes : []]);
  // const [character] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }));

  const activeAnimation = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
    dance: false,
  };

  const animations = {};

  const currentPosition = new THREE.Vector3();
  const currentLookAt = new THREE.Vector3();
  const decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
  const acceleration = new THREE.Vector3(1, 0.125, 100.0);
  const velocity = new THREE.Vector3(0, 0, 0);

  

  // model.scale.setScalar(0.1);
  // model.traverse((f) => {
  //   f.castShadow = true;
  //   f.receiveShadow = true;
  // });

  /**
 * Returns legacy geometry vertices, faces for ConvP
 * @param {THREE.BufferGeometry} bufferGeometry
 */
  function toConvexProps(bufferGeometry) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry);
    // Merge duplicate vertices resulting from glTF export.
    // Cannon assumes contiguous, closed meshes to work
    geo.mergeVertices();
    return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
  }
  let monkeyMesh = new THREE.Object3D()
  model.scene.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material.side = THREE.FrontSide
      monkeyMesh = child
    }
  })

  const mixer = new THREE.AnimationMixer(model.scene);

  const idle = model.animations[2];

  animations["idle"] = {
    clip: mixer.clipAction(idle),
  };

  const walk = model.animations[3];

  animations["walk"] = {
    clip: mixer.clipAction(walk),
  };

  const run = model.animations[0];

  animations["run"] = {
    clip: mixer.clipAction(run),
  };

  const dance = model.animations[1];

  animations["dance"] = {
    clip: mixer.clipAction(dance),
  };

  // set current Action
  let currAction = animations["idle"].clip;

  let prevAction;

  // Controll Input
  const handleKeyPress = useCallback((event) => {
    switch (event.keyCode) {
      case 38: //ArrowUp
      case 87: //w
        activeAnimation.forward = true;

        break;
      case 37: //ArrowLeft
      case 65: //a
        activeAnimation.left = true;

        break;
      case 40: //ArrowDown
      case 83: //s
        activeAnimation.backward = true;

        break;
      case 39: //ArrowRight
      case 68: // d
        activeAnimation.right = true;

        break;

      case 69: //e dance         
        activeAnimation.dance = true;

        break;
      case 16: // shift
        activeAnimation.run = true;
        break;
    }
  }, []);

  const handleKeyUp = useCallback((event) => {

    switch (event.keyCode) {
      case 38: //ArrowUp
      case 87: //w
        activeAnimation.forward = false;
        break;
      case 37: //ArrowLeft
      case 65: //a
        activeAnimation.left = false;
        break;
      case 40: //ArrowDown
      case 83: //s
        activeAnimation.backward = false;
        break;
      case 39: //ArrowRight
      case 68: // d
        activeAnimation.right = false;
        break;

      case 69: //e dance
        activeAnimation.dance = false;

        break;

      case 16: // shift
        activeAnimation.run = false;

        break;
    }
  }, []);

  const calculateIdealOffset = () => {
    const idealOffset = new THREE.Vector3(0, 10, -30);
    idealOffset.applyQuaternion(character.current.quaternion);
    idealOffset.add(character.current.position);

    // console.log({ q: idealOffset.quaternion, p: idealOffset.position })

    return idealOffset;
  };

  const calculateIdealLookat = () => {
    const idealLookat = new THREE.Vector3(0, 5, 50);
    idealLookat.applyQuaternion(character.current.quaternion);
    
    idealLookat.add(character.current.position);
    // console.log({ q: idealLookat.quaternion, p: idealLookat.position })
    
    return idealLookat;
  };

  function updateCameraTarget(delta) {
    const idealOffset = calculateIdealOffset();
    const idealLookat = calculateIdealLookat();

    const t = 1.0 - Math.pow(0.001, delta);

    currentPosition.lerp(idealOffset, t);
    currentLookAt.lerp(idealLookat, t);

    camera.position.copy(currentPosition);
  }

  // movement
  const characterState = (delta) => {
    const newVelocity = velocity;
    const frameDecceleration = new THREE.Vector3(
      newVelocity.x * decceleration.x,
      newVelocity.y * decceleration.y,
      newVelocity.z * decceleration.z
    );
    frameDecceleration.multiplyScalar(delta);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) *
      Math.min(Math.abs(frameDecceleration.z), Math.abs(newVelocity.z));

    newVelocity.add(frameDecceleration);

    const controlObject = character.current;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion; //? controlObject.quaternion.clone() : null;

    const acc = acceleration.clone();
    if (activeAnimation.run) {
      acc.multiplyScalar(1.0);
    }

    if (currAction === animations["dance"].clip) {
      acc.multiplyScalar(0.0);
    }

    if (activeAnimation.forward) {
      newVelocity.z += acc.z * delta;
    }
    if (activeAnimation.backward) {
      newVelocity.z -= acc.z * delta;
    }
    if (activeAnimation.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * Math.PI * delta * acceleration.y);
      _R.multiply(_Q);
    }
    if (activeAnimation.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * delta * acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(newVelocity.x * delta);
    forward.multiplyScalar(newVelocity.z * delta);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    character.current.position.copy(controlObject.position);
    updateCameraTarget(delta);
  };

  useFrame((state, delta) => {
    prevAction = currAction;

    if (activeAnimation.forward) {
      if (activeAnimation.run) {
        currAction = animations["run"].clip;
      } else {
        currAction = animations["walk"].clip;
      }
    } else if (activeAnimation.left) {
      if (activeAnimation.run) {
        currAction = animations["run"].clip;
      } else {
        currAction = animations["walk"].clip;
      }
    } else if (activeAnimation.right) {
      if (activeAnimation.run) {
        currAction = animations["run"].clip;
      } else {
        currAction = animations["walk"].clip;
      }
    } else if (activeAnimation.backward) {
      if (activeAnimation.run) {
        currAction = animations["run"].clip;
      } else {
        currAction = animations["walk"].clip;
      }
    } else if (activeAnimation.dance) {
      currAction = animations["dance"].clip;
    } else {
      currAction = animations["idle"].clip;
    }

    if (prevAction !== currAction) {
      prevAction.fadeOut(0.2);

      if (prevAction === animations["walk"].clip) {
        const ratio =
          currAction.getClip().duration / prevAction.getClip().duration;
        currAction.time = prevAction.time * ratio;
      }

      currAction.reset().play();
    } else {
      currAction.play();
    }

    characterState(delta);
    const idealLookat = calculateIdealLookat();

    state.camera.lookAt(idealLookat);
    state.camera.updateProjectionMatrix();
    mixer?.update(delta);
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    document.addEventListener("keyup", handleKeyUp);
    currAction.play();
    return () => {
      document.removeEventListener("keydown", handleKeyPress);

      document.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (<primitive 
    object={model.scene} 
    ref={character} 
    // geometry={nodes.Cylinder.geometry}
    {...props} 
  />);
};

export default Character;
