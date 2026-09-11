import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Dna } from "lucide-react";

import { ParticleField } from "./components/lab/ParticleField";
import { StepBadge } from "./components/ui/StepBadge";

import { DnaExplorerModule } from "./modules/DnaExplorerModule";
import { EvolutionModule } from "./modules/EvolutionModule";
import { GeneticCreatorModule } from "./modules/GeneticCreatorModule";
import { HeredityModule } from "./modules/HeredityModule";
import { LandingModule } from "./modules/LandingModule";
import { MutationModule } from "./modules/MutationModule";
import { ReportModule } from "./modules/ReportModule";

import { creatorDefaults, evolutionByEnvironment } from "./data/genetics";

import {
  buildOrganismProfile,
  defaultMutationState,
  mutateSequence,
  mutationAnalysis,
  simulateHeredity
} from "./utils/genetics";

import {
  EnvironmentType,
  Genotype,
  MutationState
} from "./types/genetics";


const stepLabels = [
  "Entrada",
  "DNA",
  "Criador",
  "Hereditariedade",
  "Mutação",
  "Evolução",
  "Relatório"
];


export default function App() {

  const [step, setStep] = useState(0);


  const [creatorState, setCreatorState] =
    useState(creatorDefaults);


  const [parentA, setParentA] =
    useState<Genotype>("Bb");


  const [parentB, setParentB] =
    useState<Genotype>("bb");


  // CORREÇÃO AQUI
  const [mutationState, setMutationState] =
    useState<MutationState>(defaultMutationState);


  const [environment, setEnvironment] =
    useState<EnvironmentType>(
      "Temperatura elevada"
    );


  const profile = useMemo(
    () => buildOrganismProfile(creatorState),
    [creatorState]
  );


  const heredity = useMemo(
    () => simulateHeredity(parentA, parentB),
    [parentA, parentB]
  );


  const evolution = useMemo(
    () => evolutionByEnvironment(environment),
    [environment]
  );


  const mutationText = useMemo(
    () => mutationAnalysis(mutationState),
    [mutationState]
  );


  const reportSummary = useMemo(
    () => ({
      organism: profile,
      heredity,
      mutation: mutationState,
      environment,
      evolution
    }),
    [
      profile,
      heredity,
      mutationState,
      environment,
      evolution
    ]
  );


  const next = () =>
    setStep((current) =>
      Math.min(
        current + 1,
        stepLabels.length - 1
      )
    );


  const previous = () =>
    setStep((current) =>
      Math.max(current - 1, 0)
    );


  const restart = () => {

    setStep(0);

    setCreatorState(
      creatorDefaults
    );

    setParentA("Bb");

    setParentB("bb");

    setMutationState(
      defaultMutationState
    );

    setEnvironment(
      "Temperatura elevada"
    );
  };


  return (

    <div className="relative min-h-screen overflow-hidden text-lab-white">


      <ParticleField />


      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 md:px-6 lg:px-8">


        <header className="mb-6 rounded-3xl border border-white/10 bg-black/20 px-4 py-4 backdrop-blur md:px-6">


          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">


            <div className="flex items-center gap-3">


              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10">

                <Dna className="h-6 w-6 text-cyan-200"/>

              </div>


              <div>

                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">

                  Feira de Ciências

                </p>


                <h1 className="text-xl font-bold text-white md:text-2xl">

                  Laboratório Genético Interativo

                </h1>

              </div>


            </div>



            <div className="flex flex-wrap gap-2">


              {stepLabels.map(
                (label,index)=>(

                <StepBadge

                  key={label}

                  index={index+1}

                  label={label}

                  active={index===step}

                  completed={index<step}

                />

              ))}


            </div>


          </div>


        </header>



        <main className="flex-1 space-y-6">


          {step===0 &&
            <LandingModule
              onStart={()=>setStep(1)}
            />
          }



          {step===1 &&
            <DnaExplorerModule/>
          }



          {step===2 &&
            <GeneticCreatorModule

              state={creatorState}

              profile={profile}

              onChange={setCreatorState}

            />
          }



          {step===3 &&

            <HeredityModule

              parentA={parentA}

              parentB={parentB}

              result={heredity}

              onChangeParentA={setParentA}

              onChangeParentB={setParentB}

            />

          }



          {step===4 &&

            <MutationModule

              state={mutationState}

              analysis={mutationText}


              onSelectIndex={
                (selectedIndex)=>

                setMutationState(
                  current=>({
                    ...current,
                    selectedIndex
                  })
                )
              }


              onReplacement={
                replacement=>

                setMutationState(
                  current=>({
                    ...current,
                    replacement
                  })
                )
              }


              onApply={()=>

                setMutationState(
                  current=>
                  mutateSequence(current)
                )

              }


              onReset={()=>

                setMutationState(
                  defaultMutationState
                )

              }

            />

          }



          {step===5 &&

            <EvolutionModule

              environment={environment}

              data={evolution}

              onChange={setEnvironment}

            />

          }



          {step===6 &&

            <ReportModule

              summary={reportSummary}

              onRestart={restart}

            />

          }




          <div className="glass-panel p-4">


            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">


              <p className="text-sm text-white/70">

                Navegação da experiência científica.

              </p>



              <div className="flex gap-3">


                <button

                  className="secondary-button"

                  onClick={previous}

                  disabled={step===0}

                >

                  <ChevronLeft className="mr-2 h-4 w-4"/>

                  Voltar

                </button>



                <button

                  className="lab-button"

                  onClick={next}

                  disabled={
                    step===stepLabels.length-1
                  }

                >

                  Próxima

                  <ChevronRight className="ml-2 h-4 w-4"/>

                </button>


              </div>


            </div>


          </div>


        </main>


      </div>


    </div>

  );
}