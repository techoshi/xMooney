import React, { useRef } from 'react'
import { useFrame, } from "@react-three/fiber";
import { PerspectiveCamera, Stars, useGLTF, useAnimations, Html, useProgress, useFBX, Sky, OrbitControls, Cloud } from '@react-three/drei'
import LightBulb from './Lightbulb';

export default function TimeOfDay(props) {

    const start = 8 * 60 + 5;
    const end = 12 * 60 + 17;
    const date = new Date();
    const now = date.getHours() * 60 + date.getMinutes();
    console.log(start)
    console.log(end)
    console.log(now)
    if (start <= now && now <= end) {
        return (<>
            <ambientLight color={"white"} />
            <LightBulb color={"black"} position={[-.09, 65, 52.8]} />
            <LightBulb color={"black"} position={[90, 72, 51.5]} />
            <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
            <LightBulb
                intensity={1}
                runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: 150, z: 120, radius: 20 }}
                position={props.environmentSun ? props.environmentSun : [-100,20,0]}
                size={[5, 30, 10]} />
        </>)
    }
    else {

        return (<>
            <LightBulb
                intensity={1}
                runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: 150, z: 120, radius: 20 }}
                position={props.environmentSun ? props.environmentSun : [-100,20,0]}
                size={[5, 30, 10]} />
            <LightBulb
                intensity={0.30}
                runCircularAnimation={{ enabled: true, speed: 0.01, interval: 0, x: 150, y: -100, radius: 20 }}
                position={props.environmentMoon ? props.environmentMoon : [0,20,0]}
                size={[3, 30, 150]}
                color={"#F4FDFF"}
            />
            
            {/* <Cloud scale={100}  position={props.environmentMoon ? props.environmentMoon : [0,20,0]}></Cloud> */}
            <Stars></Stars>
        </>)
    }
}

