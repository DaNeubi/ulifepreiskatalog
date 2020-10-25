<template>
    <div>
        <v-row no-gutters class="mt-2">
            <v-col cols="12" xs="12" sm="12" md="3" lg="2">
                Verfügbare Kapazität: <b>{{currentCapacity | fancyUnits}}</b><br/>
                <v-divider/>
                Modifikatoren:
              <v-col xs="12" sm="12" md="12" lg="12" cols="12">
                <v-tooltip bottom v-if="useVehicleSpeed">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs">mdi-truck-fast</v-icon>
                  </template>
                  <span><u>Fahrzeuggeschwindigkeit</u> wird mit einberechnet</span>
                </v-tooltip>
                <v-tooltip bottom v-if="useRunWays">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs">mdi-run-fast</v-icon>
                  </template>
                  <span><u>Laufwege</u> werden mit einberechnet</span>
                </v-tooltip>
                <v-tooltip bottom v-if="useUmpacken">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs">mdi-package-variant</v-icon>
                  </template>
                  <span>Zeit für's <u>Umpacken</u> wird mit einberechnet</span>
                </v-tooltip>
                <v-tooltip bottom v-if="useSchleifenfahrt">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs">mdi-sync</v-icon>
                  </template>
                  <span><u>Schleifenfahrt</u> wird mit einberechnet. <u>Schleifenfahrt</u> ist der Weg vom Verkauf zurück zur 1. Station</span>
                </v-tooltip>
              </v-col>
            </v-col>
            <v-col cols="12" sm="12" xs="12" md="3" lg="3">
                <v-switch class="ma-0" v-model="useVehicleSpeed"
                          :label="'Fahrzeuggeschwindigkeit einberechnen: ' + (useVehicleSpeed ? 'Ja' : 'Nein')"/>
              <v-switch class="ma-0" v-model="useRunWays"
                        :label="'Laufwege einberechnen: ' + (useRunWays ? 'Ja' : 'Nein')"/>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                <v-switch class="ma-0" v-model="useUmpacken"
                          :label="'Umpacken einberechnen: ' + (useUmpacken? 'Ja' : 'Nein')"/>
                <v-switch class="ma-0" v-model="useSchleifenfahrt"
                          :label="'Schleifenfahrt verwenden: ' + (useSchleifenfahrt? 'Ja' : 'Nein')"/>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="3" lg="3">
                Anzahl der Spieler:
                <v-text-field v-model.number="playerAmount" outlined dense type="number" min="1" hide-details/>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="12" xs="12" sm="12" md="2" lg="2">
                Hosentasche:
                <v-text-field v-model.number="currentTrousersCapacity" outlined dense type="number" min="0"
                              hide-details class="pa-0 ma-0"/>
                <v-switch v-model="useTrousers" class="ma-0" @change="updateAvailableCapacity()"/>
            </v-col>
            <v-divider vertical class="ml-2 mr-2"/>
            <v-col cols="12" xs="12" sm="12" md="2" lg="2">
                Große Tasche:
                <v-text-field v-model.number="currentBigBagCapacity" outlined dense type="number" min="0" hide-details/>
                <v-switch v-model="useBigBag" class="ma-0" @change="updateAvailableCapacity()"/>
            </v-col>
            <v-divider vertical class="ml-2 mr-2"/>
            <v-col cols="12" xs="12" sm="12" md="2" lg="2">
                Verfügbare Fahrzeuge:
                <v-autocomplete v-model="currentlySelectedCars" outlined :items="allCars" item-text="name"
                                multiple item-value="id" chips deletable-chips return-object
                                @change="vehicleProgress()"/>
            </v-col>
            <v-divider vertical class="ml-2"></v-divider>
            <v-col cols="12" xs="12" sm="12" md="5" lg="5">
                <v-slide-group mandatory multiple show-arrows class="pa-3">
                    <v-slide-item v-for="car in currentlySelectedCars" :key="car.name">
                        <v-card elevation="5" class="ma-1">
                            <v-card-text><b>{{car.name}}</b></v-card-text>
                            <v-card-text>
                                Kapazität:<br/>
                                {{car.capacity | fancyUnits}}
                                <v-switch v-model="car.active" @change="updateAvailableCapacity()"/>
                                <v-text-field v-model.number="car.amount" outlined dense type="number" min="0"
                                              hide-details @change="updateAvailableCapacity()"
                                              @click="updateAvailableCapacity()"/>
                            </v-card-text>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-col>
        </v-row>
        <v-row>
            <v-expansion-panels accordion>
                <v-expansion-panel v-for="jobCalculation in calculateJobs(allJobs)" :key="jobCalculation.job.id">
                    <v-expansion-panel-header :color="jobCalculation.job.jobColor[0]" v-ripple>
                      {{jobCalculation.job.name}} - {{ (calculateProfitPerPersonPerSecond(jobCalculation)
                        * 60 * 60).toFixed(2)}} - Pro Person $ pro Stunde</v-expansion-panel-header>
                    <v-expansion-panel-content :color="jobCalculation.job.jobColor[1]">
                        <v-container>
                            <v-row>
                                <v-col v-for="(jobStepCalculation, jobStepIndex) in jobCalculation.steps"
                                       :key="jobStepCalculation.jobStep.sourceName" cols="6" xs="12" sm="4" md="3" lg="3" >
                                    <v-row>
                                        <v-col class="text-center">
                                            <h3><span class="d-sm-none">{{jobStepIndex + 1}}. </span>
                                              {{ jobStepCalculation.jobStep.sourceName }} -
                                              {{ jobStepIndex === 0 ?
                                                  jobStepCalculation.jobStep.amountOfIngredientsPerCycle[0] === jobStepCalculation.jobStep.amountOfIngredientsPerCycle[1] ?
                                                      jobStepCalculation.jobStep.amountOfIngredientsPerCycle[0] : jobStepCalculation.jobStep.amountOfIngredientsPerCycle[0]
                                                      + '-' + jobStepCalculation.jobStep.amountOfIngredientsPerCycle[1] : jobStepCalculation.jobStep.ingredientRatio[0]
                                                  + ':' + jobStepCalculation.jobStep.ingredientRatio[1] }}</h3>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Größe:
                                        </v-col>
                                        <v-col>
                                          {{ jobStepCalculation.jobStep.sizeOfIngredient }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Anzahl:
                                        </v-col>
                                        <v-col>
                                          {{ jobStepCalculation.amount }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Dauer Pro [s]
                                        </v-col>
                                        <v-col>
                                          {{ jobStepCalculation.jobStep.cycleTime }}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Dauer Gesamt [Min]
                                        </v-col>
                                        <v-col>
                                          {{ (jobStepCalculation.totalTime / 60).toFixed(2) }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6" xs="12" sm="4" md="4" lg="2">
                                    <v-row>
                                        <v-col class="text-center">
                                            <h3>Summe</h3>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Preis Pro [$]
                                        </v-col>
                                        <v-col>
                                            {{jobCalculation.job.pricePerResource}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Gewinn [$]
                                        </v-col>
                                        <v-col>
                                          <!-- Hier ist noch ein Kalkulationsfehler -->
                                          {{jobCalculation.profit}}
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            Dauer [Min]
                                        </v-col>
                                        <v-col>
                                          {{ (jobCalculation.totalJobTime / 60).toFixed(2)}}
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component,Vue } from 'vue-property-decorator';
import cars from '@/preDefined/cars';
import IVehicle from '../types/IVehicles'
import jobs from "@/preDefined/jobs";
import IJob from "@/types/IJob";
import roundUp from "@/utils/roundUp";
import kmToMiles from "@/utils/kmToMiles";
import roundMultiple from "@/utils/roundMultiple";
import IJobStepCalculation from "@/types/IJobStepCalculation";
import IJobCalculation from "@/types/IJobCalculation";

@Component
export default class Configurator extends Vue{
    /* Variables */

    /* Inventory*/
    currentTrousersCapacity = 1000;
    useTrousers = true;
    currentBigBagCapacity = 5000;
    useBigBag = true;

    /*Available Cars*/
    useVehicleSpeed = true;
    currentlySelectedCars: IVehicle[] = [];
    allCars: IVehicle[] = cars;

    /*Jobs*/
    allJobs: IJob[] = jobs;

    /*Player informations*/
    playerAmount = 1;
    currentCapacity = 0;
    useRunWays = true;
    useUmpacken = true;
    useSchleifenfahrt = true;

    async created(){
        //Update the initial capacity
        this.updateAvailableCapacity();
    }

    /***
     * Things that happen if a vehicle gets selected or de-selected
     */
    vehicleProgress(){
        this.updateAvailableCapacity();
        this.checkForCustomVehicleCreation();
    }

    /***
     * Method for creating the custom Vehicles.
     */
    checkForCustomVehicleCreation(){
        //TODO: Implement custom Vehicle Creating
    }

    /***
     * Calculates how much a player will earn every second
     */
    calculateProfitPerPersonPerSecond(jobCalculation: IJobCalculation){
      return jobCalculation.profit / jobCalculation.totalJobTime / this.playerAmount;
    }

    /***
     * Calculates multiple Jobs
     */
    calculateJobs(jobs: IJob[]){
      return jobs.map(job => this.calculateJob(job));
    }

    /***
     * Calculates a single Job
     */
    calculateJob(job: IJob): IJobCalculation{
      const steps = this.calculateJobSteps(job);
      const lastStep = steps[steps.length - 1];
      let totalJobTime = this.calculateFullJobTime(job, steps);
      //Schleifenfahrt
      if(this.useSchleifenfahrt){
        //Fahrzeiten einberechnen
        if(this.useVehicleSpeed){
          //check if there is any car available
          if(this.currentlySelectedCars.length > 0){
            totalJobTime = totalJobTime + (kmToMiles(job.loopDistanceKm) / this.getAverageSpeed() * 60 * 60);
          }
        }
      }
      return {
        job: job,
        steps: steps,
        profit: lastStep.amount * job.pricePerResource,
        totalJobTime: totalJobTime
      }
    }

    /***
     * Calculate the amounts for the jobsteps
     */
    calculateJobSteps(job: IJob): IJobStepCalculation[]{
      let previousCalculation: IJobStepCalculation | null = null;
      const calculations: IJobStepCalculation[] = [];
      for(let i = 0; i < job.steps.length; i++){
        const jobStepCalculation = this.calculateJobStep(job, i, previousCalculation);
        calculations.push(jobStepCalculation);
        previousCalculation = jobStepCalculation;
      }
      return calculations;
    }

    /***
     * Calculate the full duration for all JobSteps of a Job
     */
    calculateFullJobTime(job: IJob, jobStepCalculations: IJobStepCalculation[]){
      let fullDuration = 0;
      //get the duration for every single step
      for (let i = 0; i < job.stepsAmount; i++){
        const jobStepCalculation: IJobStepCalculation = jobStepCalculations[i];
        fullDuration = fullDuration + jobStepCalculation.totalTime;
      }
      //RunWays
      if(this.useRunWays){
        fullDuration = fullDuration + (job.rundistance *
            roundUp(this.currentCapacity/(this.currentTrousersCapacity+5000), 0) / this.playerAmount);
      }
      //Umpacken
      if(this.useUmpacken){
        fullDuration = fullDuration +
            (roundUp(this.currentCapacity/(this.currentTrousersCapacity+5000), 0)- this.playerAmount)
            * job.umpackenTime;
      }
      return fullDuration;
    }

    /***
     * Get the available amount for the jobsteps, how many items will fit the given capacity
     */
    calculateJobStep(job: IJob, jobStepIndex: number, previousJobStep: IJobStepCalculation | null): IJobStepCalculation {
        //Calculate the amount
        const jobStep = job.steps[jobStepIndex];
        const nextJobStep = job.steps[jobStepIndex + 1];
        const nextJobStepRatio = nextJobStep ? nextJobStep.ingredientRatio[0] : 1;
        let amount: number;
        if (previousJobStep !== null) {
          const amountFactor = jobStep.ingredientRatio[1] / jobStep.ingredientRatio[0];
          amount = previousJobStep.amount * amountFactor;
        }
        else {
          const fullCapacity = this.getFullCapacity();
          amount = fullCapacity / jobStep.sizeOfIngredient;
        }
        amount = roundMultiple(amount,nextJobStepRatio);
        const outPutCapacity = amount * jobStep.sizeOfIngredient;
        //Calculate the time
        const averageCycleAmount = (jobStep.amountOfIngredientsPerCycle[0] + jobStep.amountOfIngredientsPerCycle[1]) / 2;
        const cycleTime = amount * jobStep.cycleTime / averageCycleAmount / this.playerAmount;
        const vehicleTime = (kmToMiles(jobStep.distanceKm) / this.getAverageSpeed() * 60 * 60);
        const runWayTime = ((jobStep.rundistance) * roundUp(this.currentCapacity /
            (this.currentTrousersCapacity+5000) / this.playerAmount,0));
        const umpackenTime = roundUp((this.currentCapacity / (this.currentTrousersCapacity+5000)
            / this.playerAmount) - this.playerAmount,0) * jobStep.umpackenTime;
        let totalTime = cycleTime;
        //vehicle speed
        if (this.useVehicleSpeed) {
          if(vehicleTime){
            totalTime = totalTime + vehicleTime;
          }
        }
        //RunWays
        if(this.useRunWays){
          totalTime = totalTime + runWayTime;
        }
        //Umpacken
        if(this.useUmpacken && jobStep.umpackenAvail){
          totalTime = totalTime + umpackenTime;
        }
        return {
          jobStep: jobStep,
          amount: amount,
          capacity: outPutCapacity,
          totalTime: totalTime
        };
    }

    /**
     * Get the full available capacity
     */
    getFullCapacity(): number {
      //Sum up the complete Capacity
      let fullCapacity = (this.useTrousers ? this.currentTrousersCapacity : 0)
          + (this.useBigBag ? this.currentBigBagCapacity : 0);
      this.currentlySelectedCars.forEach((vehicle) => {
        fullCapacity = fullCapacity + vehicle.capacity;
      });
      return fullCapacity;
    }

    /***
     * Get the maximum available Capacity for the current selection
     */
    updateAvailableCapacity(){
        let fullCapacity = (this.useTrousers ? this.currentTrousersCapacity : 0)
            + (this.useBigBag ? this.currentBigBagCapacity : 0);
        this.currentlySelectedCars.forEach((item) => {
            if(item.active){
                fullCapacity = fullCapacity + (item.capacity * item.amount);
            }
        });
        this.currentCapacity = fullCapacity;
    }

    /***
     * Returns the average Speed over all Vehicles selected
     */
    getAverageSpeed(){
        //Full Speed
        let fullSpeed = 0;
        this.currentlySelectedCars.forEach((car) => {
            fullSpeed = fullSpeed + car.speed;
        });
        return fullSpeed / this.currentlySelectedCars.length;
    }

}
</script>

<style scoped>

</style>
