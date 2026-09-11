import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

import { basePairs } from "../../data/genetics";


const baseColors: Record<string,string> = {

A:"#00E5FF",

T:"#8B5CF6",

C:"#38BDF8",

G:"#F59E0B"

};





function ResponsiveCamera(){

const {camera,size}=useThree();


useMemo(()=>{


const aspect=size.width/size.height;


camera.position.z =
aspect < 1
?
8
:
6.5;



},[size,camera]);



return null;

}





function PairRod({

start,

end

}:{

start:[number,number,number],

end:[number,number,number]

}){


const startVector =
new THREE.Vector3(...start);


const endVector =
new THREE.Vector3(...end);



const direction =
endVector.clone()
.sub(startVector);



const length =
direction.length();



const center =
startVector.clone()
.add(endVector)
.multiplyScalar(.5);



const quaternion =
new THREE.Quaternion()
.setFromUnitVectors(

new THREE.Vector3(0,1,0),

direction.normalize()

);



return (

<mesh

position={center}

quaternion={quaternion}

>


<cylinderGeometry

args={[
0.035,
0.035,
length,
12
]}

/>


<meshStandardMaterial

color="#ffffff"

emissive="#00E5FF"

emissiveIntensity={0.25}

/>


</mesh>

);


}







function DNAHelix(){


const group =
useRef<THREE.Group>(null);



useFrame((_,delta)=>{


if(group.current){


group.current.rotation.y
+=delta*0.25;


}



});





const pairs =
useMemo(()=>{


return basePairs.map(
(pair,index)=>{


const angle =
index*0.62;


const y =
index*.5-3;


const radius =
1.2;



const left:[number,number,number]=[


Math.cos(angle)*radius,

y,

Math.sin(angle)*radius


];



const right:[number,number,number]=[


Math.cos(angle+Math.PI)*radius,

y,

Math.sin(angle+Math.PI)*radius


];



return {

pair,

left,

right

};


});


},[]);




return (

<group ref={group}>


{pairs.map(
(
{
pair,
left,
right
},
index
)=>(


<group key={index}>


<mesh position={left}>


<sphereGeometry

args={[
0.14,
24,
24
]}

/>


<meshStandardMaterial

color={baseColors[pair[0]]}

emissive={baseColors[pair[0]]}

emissiveIntensity={.8}

/>


</mesh>





<mesh position={right}>


<sphereGeometry

args={[
0.14,
24,
24
]}

/>


<meshStandardMaterial

color={baseColors[pair[1]]}

emissive={baseColors[pair[1]]}

emissiveIntensity={.8}

/>


</mesh>





<PairRod

start={left}

end={right}

/>



</group>


)

)}



</group>

);


}









export function DNAViewer(){


return (

<div

className="

h-[280px]

sm:h-[350px]

md:h-[420px]

lg:h-[520px]

w-full

overflow-hidden

rounded-3xl

border

border-white/10

bg-black/30

"


>


<Canvas


camera={{

position:[0,0,7],

fov:45

}}


dpr={[1,2]}


>


<color

attach="background"

args={[
"#050816"
]}

/>



<ResponsiveCamera/>




<ambientLight

intensity={1.5}

/>



<pointLight

position={[3,3,3]}

intensity={40}

color="#00E5FF"

/>



<pointLight

position={[-3,-2,-3]}

intensity={30}

color="#8B5CF6"

/>




<Float

speed={1}

rotationIntensity={0.3}

floatIntensity={0.4}

>


<DNAHelix/>


</Float>





<OrbitControls


enablePan={false}


minDistance={4}


maxDistance={12}


enableDamping


/>





</Canvas>


</div>


);


}