/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: ArnoldE (https://sketchfab.com/arnoldescorcia906)
license: SKETCHFAB Standard (https://sketchfab.com/licenses)
source: https://sketchfab.com/3d-models/spider-robot-dirty-pbr-9c019933613d433abd421ebe47ea04d8
title: Spider Robot dirty PBR
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Robot({ ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/robot2/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0}>
          <group name="afa67de8a11a4e3190822d51eec7cb9bfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="M_Robot_Low" position={[0, 325.08, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                <group name="RigRobot" position={[0, 140.38, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <group name="Object_8" position={[0, 325.08, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
                    <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.M_Robot} skeleton={nodes.Object_9.skeleton} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/robot2/scene.gltf')
