import {
  bloodGeneMap,
  eyeGeneMap,
  hairGeneMap,
  specialGeneMap,
  creatorDefaults
} from "../data/genetics";


import {
  CreatorState,
  Genotype,
  HeredityResult,
  MutationState,
  OrganismProfile
} from "../types/genetics";



const randomCode = () =>
  `BIO-${Math.floor(
    100 + Math.random()*900
  )}`;



export const buildOrganismProfile =
(
 state:CreatorState
):OrganismProfile => {


 return {


  ...state,


  code:randomCode(),


  genotypes:{


    eyes:
      eyeGeneMap[state.eyeColor],


    hair:
      hairGeneMap[state.hairType],


    blood:
      bloodGeneMap[state.bloodType],


    special:
      specialGeneMap[state.specialTrait]

  },


  explanation:[

    `Olhos ${state.eyeColor} associados ao gene ${eyeGeneMap[state.eyeColor]}.`,

    `Cabelo ${state.hairType} associado ao gene ${hairGeneMap[state.hairType]}.`,

    `Grupo sanguíneo ${state.bloodType}.`,

    `Característica especial ${state.specialTrait}.`

  ]


 };

};




const getGametes =
(genotype:Genotype)=>
genotype.split("");



export const simulateHeredity =

(
 parentA:Genotype,
 parentB:Genotype
):HeredityResult=>{


 const a=getGametes(parentA);

 const b=getGametes(parentB);



 const children =
 a.flatMap(x=>
  b.map(y=>x+y)
 );


 const brown =
 children.filter(
 c=>c.includes("B")
 ).length;



 const blue =
 children.length-brown;



 return {

 children,

 probabilities:{

  brown:
   Math.round(
    brown/children.length*100
   ),


  blue:
   Math.round(
    blue/children.length*100
   )

 }

 };

};




export const mutateSequence =
(
state:MutationState
):MutationState=>{


 const chars =
 state.current.split("");


 chars[state.selectedIndex] =
 state.replacement;



 return {

  ...state,

  current:
   chars.join("")

 };

};




export const mutationAnalysis =
(
state:MutationState
)=>{


if(
state.original===
state.current
)

return "Nenhuma mutação aplicada.";



return `A base ${state.original[state.selectedIndex]} foi alterada para ${state.current[state.selectedIndex]}. Pequenas alterações podem modificar proteínas.`;

};




// CORREÇÃO PRINCIPAL
export const defaultMutationState:MutationState = {


 original:
 "ATGCCGTA",


 current:
 "ATGCCGTA",


 selectedIndex:
 3,


 replacement:
 "T"


};



export const defaultProfile =
buildOrganismProfile(
 creatorDefaults
);