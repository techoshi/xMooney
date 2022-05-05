import React, { forwardRef, useRef } from 'react'
import { Canvas } from "@react-three/fiber";
import Box from "../components/Box";
//import OrbitControls from "../components/OrbitControls";
import LightBulb from "../components/Light";
import Floor from "../components/Floor";
import { Cloud, Stars, Sky, Image, Cylinder, OrbitControls, Environment, useGLTF, Float, TransformControls, QuadraticBezierLine, Backdrop, ContactShadows } from '@react-three/drei'

import Draggable from "../components/Draggable";
import { Suspense } from "react";
import Warehouse from "../components/Warehouse";

export default function Three() {
    const spaceman = useRef()
    const ship = useRef()
    function TimeofDay() {
        const start = 7 * 60 + 5;
        const end = 22 * 60 + 17;
        const date = new Date();
        const now = date.getHours() * 60 + date.getMinutes();
        console.log(start)
        console.log(end)
        console.log(now)
        if (start <= now && now <= end) {
            return (<Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />)
        }
        else {

            return (<><Cloud scale={3} position={[-20, 10, -20]}></Cloud><Stars></Stars></>)
        }
    }

    function LoadImage(props) {

        return <Image {...props} />
    }


    // Auto-generated by: https://github.com/pmndrs/gltfjsx
    const Spaceman = forwardRef(({ children, ...props }, ref) => {
        const { nodes, materials } = useGLTF('/Astronaut-transformed.glb')
        return (
            <mesh
                castShadow
                receiveShadow
                ref={ref}
                {...props}
                geometry={nodes.Astronaut_mesh.geometry}
                material={materials.Astronaut_mat}
                material-envMapIntensity={0}
                dispose={null}>
                {children}
            </mesh>
        )
    });

    Spaceman.displayName = 'Spaceman';

    // One-click copy/paste from the poimandres market: https://market.pmnd.rs/model/low-poly-spaceship
    const Ship = forwardRef((props, ref) => {
        const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-spaceship/model.gltf')
        return (
            <group ref={ref} {...props} dispose={null}>
                <mesh castShadow receiveShadow geometry={nodes.Cube005.geometry} material={materials.Mat0} />
                <mesh castShadow receiveShadow geometry={nodes.Cube005_1.geometry} material={materials.Mat1} material-color="black" />
                <mesh castShadow receiveShadow geometry={nodes.Cube005_2.geometry} material={materials.Mat2} material-envMapIntensity={0.2} material-color="black" />
                <mesh castShadow receiveShadow geometry={nodes.Cube005_3.geometry} material={materials.Window_Frame} />
                <mesh castShadow receiveShadow geometry={nodes.Cube005_4.geometry} material={materials.Mat4} />
                <mesh castShadow receiveShadow geometry={nodes.Cube005_5.geometry} material={materials.Mat3} />
                <mesh castShadow receiveShadow geometry={nodes.Cube005_6.geometry} material={materials.Window} />
            </group>
        )
    })


    Ship.displayName = 'Ship';
    let texture = "/xMooney_Logo_Token_300px_x_300px.png";
    return (
        <div className="scene">
            <Canvas
                shadows={true}
                className="canvas"
                camera={{
                    position: [-6, 30, 75],
                }}
            >

                <ambientLight color={"white"} intensity={0.3} />

                <LightBulb position={[0, 64, 53.5]} />
                <LightBulb position={[90, 64, 53.5]} />
                <Cylinder position={[-4, 8, 12]} rotateOnAxis={(270, 70, 50)}>
                    <meshBasicMaterial color="#9b8549" />
                    {/* <meshPhysicalMaterial map={texture} color="#9b8549" /> */}
                </Cylinder>

                <Suspense fallback={null}>
                    <Box rotateX={0.8} rotateY={0.2} position={[0, 5, 5]} />
                </Suspense>



                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[0, 5, 0]} size={[5, 5, 5]} rotation={[0, Math.PI/2.8, 0]} color="white" image="/xMooney_Logo_Token_1000px_x_1000px.png" />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[25, 10, 25]} size={[5, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[-25, 10, 25]} size={[5, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[-25, 10, -25]} size={[5, 5, 5]} />
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[25, 10, -25]} size={[5, 5, 5]} />
                </Suspense>
                <Warehouse scale={[20, 20, 20]} position={[0, 50, 100]}></Warehouse>
                <Image url="/xMooney_Logo_Token_1000px_x_1000px.png"
                    transparent
                    position={[-243, 50, -20]}
                    opacity={1}
                    scale={[100, 100, 100]}
                    rotation={[0, Math.PI/2 , 0]}
                />
               
                <TimeofDay></TimeofDay>
                {/* <LoadImage
                    transparent
                    position={[10, 18.5, 4]}
                    url="/xMooney_Logo_Token_1000px_x_1000px.png"
                    opacity={0.5}>
                    rotateY={30}
                </LoadImage> */}

                {/* <Float position={[1, 10, -0.5]} rotation={[-170, 0, 0]} rotationIntensity={4} floatIntensity={6} speed={1.5}> */}
                {/* <Draggable> */}
                <Spaceman scale={5.5} position={[10, 3, -0.5]} >
                    <object3D ref={spaceman} />
                </Spaceman>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotation={[-38, 0, 0]} position={[10, 18.5, 2.45]} size={[1, 1,1]} color="white" image="/xMooney_Logo_Token_300px_x_300pxBW.png"/>
                </Suspense>
                <Suspense fallback={null}>
                    <Box rotateX={3} rotateY={0.2} position={[4, 5, 20]} size={[1, 3, 1]} />
                </Suspense>
                {/* </Draggable> */}
                {/* </Float> */}
                <Spaceman scale={16} position={[-200, -10, -75]} rotation={[0, Math.PI/2.5, 0]} >
                    <object3D ref={spaceman} />
                </Spaceman>
                {/* <Float scale={0.75} position={[-10, 10, -10]} rotation={[0, 0.6, 0]}> */}
                    <Ship scale={30} ref={ship} position={[-230, 25, 35]} rotation={[0, Math.PI/1.5, 0]}/>
                {/* </Float> */}
                <OrbitControls />
                <Floor color="black" />
            </Canvas>
        </div>
    );
}