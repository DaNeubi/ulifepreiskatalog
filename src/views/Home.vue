<template>
    <v-container>
      <v-toolbar dense>
        <v-toolbar-title>Modus:</v-toolbar-title>
        <v-switch v-model="expertModeSwitch" hide-details :label="expertMode ? 'Experten Modus' : 'Normaler Modus'"
                  class="pl-5 pr-5" @click="expertModeFunction()"/>
        <v-btn v-if="expertMode" color="error" @click="resetDialog = true;">
          Zurücksetzen
        </v-btn>
      </v-toolbar>
      <v-dialog v-model="expertModeDialog" width="50%" @click:outside="expertModeSwitch = false">
        <v-card>
          <v-card-title>HINWEIS</v-card-title>
          <v-card-text>
            Dieser Modus erweitert die Funktionalität und ermöglicht dir, dass du alles anpassen kannst.<br/>
            Das UI wird dadurch deutlich erweitert und kann unübersichtlicher wirken.
            <br/>
            <v-checkbox v-model="expertModeDialogAlreadyAccepted" hide-details label="Entscheidung merken"/>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="expertModeSwitch = false; expertModeDialog = false; expertModeDialogAlreadyAccepted = false;">
              Hilfe! Bitte zurück
            </v-btn>
            <v-btn color="primary" @click="expertModeDialog = false; expertMode = true; saveCookie()">
              Auf geht's!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="customVehicleDialog" width="50%" @click:outside="customVehicleDialog = false">
        <v-card>
          <v-card-title>Neues Fahrzeug erstellen</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field v-model="tempVehicle.name" outlined dense hide-details label="Name des neuen Autos"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model.number="tempVehicle.capacity" type="number" outlined dense hide-details label="Kofferraumgröße" min="0"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model.number="tempVehicle.speed" type="number" outlined dense hide-details label="Durchschnitsgeschwindigkeit" min="0"/>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="customVehicleDialog = false; resetTempVehicle()">
              Abbrechen
            </v-btn>
            <v-btn color="primary" @click="addCustomVehicle()">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="vehicleDeleteDialog" width="50%" @click:outside="vehicleDeleteDialog = false">
        <v-card>
          <v-card-title>Achtung</v-card-title>
          <v-card-text>
            Bist du dir sicher, dass du das ausgewählte Fahrzeug löschen willst?
          </v-card-text>
          <v-card-actions>
            <v-btn color="error" @click="vehicleDeleteDialog = false">
              Abbrechen
            </v-btn>
            <v-btn color="primary" @click="deleteVehicle(); vehicleDeleteDialog = false">
              Ja, löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="resetDialog" width="50%" @click:outside="resetDialog = false;">
        <v-card>
          <v-card-title>Achtung</v-card-title>
          <v-card-text>
            Bitte wähle aus, was du zurücksetzen möchtest:
            <v-row no-gutters>
              <v-col>
                <v-checkbox hide-details v-model="resetCars" class="ma-0" label="Fahrzeuge"/>
                <v-checkbox hide-details v-model="resetJobs" class="ma-0" label="Jobs"/>
                <v-checkbox hide-details v-model="resetSettings" class="ma-0" label="Einstellungen"/>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn class="error" @click="resetDialog = false;">
              Abbrechen
            </v-btn>
            <v-btn class="primary" @click="resetFunction()">
              Ok. Lösch das Zeug
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-card class="mb-4 mt-3" elevation="6">
        <v-card-title>Einstellungsmöglichkeiten</v-card-title>
        <v-card-text>
        <v-row no-gutters>
            <v-col>
                <h3>Modifikatoren:</h3>
              <v-col>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs" :color="useVehicleSpeed ? 'green' : 'grey'"
                            @click="useVehicleSpeed ? useVehicleSpeed = false : useVehicleSpeed = true; saveCookie();"
                            size="30">mdi-truck-fast</v-icon>
                  </template>
                  <span><u>Fahrzeuggeschwindigkeit</u> wird {{useVehicleSpeed ? '' : 'nicht'}} mit einberechnet</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs" :color="useRunWays ? 'green' : 'grey'"
                            @click="useRunWays ? useRunWays = false : useRunWays = true; saveCookie();"
                            size="30">mdi-run-fast</v-icon>
                  </template>
                  <span><u>Laufwege</u> werden {{useRunWays ? '' : 'nicht'}} mit einberechnet</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs" :color="useUmpacken ? 'green' : 'grey'"
                            @click="useUmpacken ? useUmpacken = false : useUmpacken = true; saveCookie();"
                            size="30">mdi-package-variant</v-icon>
                  </template>
                  <span>Zeit für's <u>Umpacken</u> wird {{useUmpacken ? '' : 'nicht'}} mit einberechnet</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs" :color="useSchleifenfahrt ? 'green' : 'grey'"
                            @click="useSchleifenfahrt ? useSchleifenfahrt = false : useSchleifenfahrt = true; saveCookie();"
                            size="30">mdi-sync</v-icon>
                  </template>
                  <span><u>Schleifenfahrt</u> wird mit {{useSchleifenfahrt ? '' : 'nicht'}} einberechnet. <u>Schleifenfahrt</u> ist der Weg vom Verkauf zurück zur 1. Station</span>
                </v-tooltip>
              </v-col>
            </v-col>
          <v-col>
            <h3>Visualisierung:</h3>
            <v-col class="pa-0">
              <v-row>
                <v-col class="pr-0">
                  <v-checkbox v-model="showGraph" hide-details class="ma-0" :label="showGraph ? 'Graph wird angezeigt' : 'Graph wird nicht angezeigt'" @click="saveCookie();"/>
                </v-col>
                <v-col class="pl-0">
                  <v-checkbox v-model="updateGraphOnEveryChange" hide-details class="ma-0" :label="updateGraphOnEveryChange ? 'Graph automatisch aktualisieren' : 'Graph nicht automatisch aktualisieren'" @click="saveCookie();"/>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Anzahl der Personen:
            <v-text-field v-model.number="playerAmount" outlined dense type="number" min="1" hide-details @click="updateAvailableCapacity(); saveCookie();" @change="saveCookie(); updateAvailableCapacity();"/>
          </v-col>
          <v-col>
            Hosentasche:
            <v-text-field v-model.number="currentTrousersCapacity" outlined dense type="number" min="0"
                          hide-details class="pa-0 ma-0" @change="saveCookie();"/>
            <v-checkbox hide-details v-model="useTrousers" class="ma-0" :label=" useTrousers ? 'Verwendet' : 'Nicht verwendet'" @change="updateAvailableCapacity(); saveCookie();"/>
          </v-col>
          <v-col>
            Große Tasche:
            <v-text-field v-model.number="currentBigBagCapacity" outlined dense type="number" min="0" hide-details @change="saveCookie();"/>
            <v-checkbox hide-details v-model="useBigBag" class="ma-0" :label=" useBigBag ? 'Verwendet' : 'Nicht verwendet'" @change="updateAvailableCapacity(); saveCookie();"/>
          </v-col>
        </v-row>
        <v-row v-if="expertMode">
          <v-col>
            <h2>Obsthändler-Standort:</h2>
            <v-autocomplete v-model="currentFruitSeller" :items="fruitSellers" item-text="name"
                            hide-details outlined solo clearable return-object item-value="number"
                            @change="saveCookie();">
              <template v-slot:item="{ item }">
                <v-list-item-content>
                  {{item.name}} - {{item.description}}
                </v-list-item-content>
              </template>
              <template v-slot:selection="{ item }">
                <v-list-item-content>
                  {{item.name}}
                </v-list-item-content>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
          <h2>Verfügbare Kapazität: <b>{{getFullCapacity() | fancyUnits}}</b><br/></h2>
        <v-row no-gutters>
            <v-col v-if="expertMode === false">
              <br/>
              <span>Verfügbare Fahrzeuge:</span>
              <v-autocomplete :value="allCars.filter(car => car.selected === true)" outlined :items="allCars" item-text="name"
                              multiple item-value="id" chips deletable-chips return-object
                              @change="vehicleProgress()">
                <template v-slot:item="{ item }" >
                  <v-list-item @click="updateCurrentlySelectedVehicles(item,1)" :disabled="item.amount > 0">
                    <v-list-item-content>
                      {{ item.name }} - {{item.capacity | fancyUnits}}
                    </v-list-item-content>
                  </v-list-item>
                </template>
                <template v-slot:selection="{ item }">
                  <v-chip close
                          @click:close="updateCurrentlySelectedVehicles(item,2)"
                          :close-icon="item.amount > 1 ? 'mdi-minus-circle' : 'mdi-close-circle'"
                  ><v-icon size="18" @click="updateCurrentlySelectedVehicles(item,1)" class="pr-1">mdi-plus-circle</v-icon> {{item.name}} {{item.capacity | fancyUnits}} ({{item.amount}})
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col v-if="expertMode">
              <br/>
              <span>Verfügbare Fahrzeuge:
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-on="on" v-bind="attrs" @click="customVehicleDialog = true">mdi-plus-circle</v-icon>
                  </template>
                  <span>Neues Fahrzeug erstellen</span>
                </v-tooltip>
              </span>
              <v-expansion-panels accordion>
                <v-expansion-panel v-for="car in allCars" :key="car.id">
                  <v-expansion-panel-header>{{car.name}} {{car.capacity | fancyUnits}} -- Kapazität: {{car.capacity * car.amount | fancyUnits()}} -- Anzahl: {{car.amount}}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-row>
                      <v-col>
                        Kapazität:
                        <v-text-field v-model.number="car.capacity" outlined dense type="number" min="0" @change="updateAvailableCapacity()"/>
                        Durchschnitsgeschwindigkeit:
                        <v-text-field v-model.number="car.speed" outlined dense type="number" min="0"/>
                        Anzahl:
                        <v-text-field v-model.number="car.amount" outlined dense type="number" min="0" @change="updateCurrentlySelectedVehicles(car, 3)"/>
                        Aktiv:
                        <v-checkbox v-model="car.active" hide-details class="ma-0" :label="car.active ? 'Wird verwendet' : 'Wird nicht verwendet'"/>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn color="error" @click="tempVehicle = car; vehicleDeleteDialog = true">
                          Löschen
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
        </v-row>
        </v-card-text>
      </v-card>
        <v-row>
            <v-expansion-panels accordion class="pl-3 pr-3">
                <v-expansion-panel v-for="jobCalculation in calculateJobs(allJobs)" :key="jobCalculation.job.id">
                    <v-expansion-panel-header :color="jobCalculation.job.jobColor[0]" v-ripple>
                      {{jobCalculation.job.name}} - {{ (calculateProfitPerPersonPerSecond(jobCalculation)
                        * 60 * 60).toFixed(2)}} - Pro Person $ pro Stunde</v-expansion-panel-header>
                    <v-expansion-panel-content :color="jobCalculation.job.jobColor[1]">
                            <v-row>
                              <v-col class="text-center pb-0">
                                <b>[{{jobCalculation.job.stepsDescription}}] - [{{jobCalculation.job.toolRequired}}]</b>
                              </v-col>
                            </v-row>
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
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
      <v-row class="d-none d-sm-flex" v-if="showGraph">
        <v-col>
          <v-card>
            <v-card-title>Visuelle Darstellung der Jobs</v-card-title>
            <v-card-text><v-chart :options="updateChart()"/></v-card-text>
          </v-card>

        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <br/>
          <b>Verbesserungsvorschläge gerne bei mir melden: 555-480-4612</b><br/>
          <b>Spenden gerne an: LS82172757</b>
        </v-col>
      </v-row>
    </v-container>
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
import ISaveFile from "@/types/ISaveFile";
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import createChartData from "@/methods/createChartData";
import IChart from "@/types/chart/IChart";
import IFruitSeller from "@/types/IFruitSeller";
import fruitSellers from "@/preDefined/fruitSellers";

@Component({

})
export default class Configurator extends Vue{
    /* Variables */
    expertMode = false;
    expertModeSwitch = false;
    expertModeDialog = false;
    expertModeDialogAlreadyAccepted = false;
    vehicleDeleteDialog = false;

    /*Chart things*/
    updateGraphOnEveryChange = false;
    showGraph = false;

    /* Inventory*/
    currentTrousersCapacity = 1000;
    useTrousers = true;
    currentBigBagCapacity = 5000;
    useBigBag = true;

    /*Cars things*/
    useVehicleSpeed = true;
    allCars: IVehicle[] = cars;
    customVehicleDialog = false;
    tempVehicle: IVehicle = {
      id: 99,
      name: "",
      speed: 0,
      capacity: 0,
      amount: 0,
      active: true,
      selected: false
    };

    /*Reset Stuff*/
    resetDialog = false;
    resetSettings = false;
    resetCars = false;
    resetJobs = false;

    /*Jobs*/
    allJobs: IJob[] = jobs;
    fruitSellers: IFruitSeller[] = fruitSellers;
    currentFruitSeller: IFruitSeller = {
      name: '',
      description: '',
      number: 0
    };

    /*Player informations*/
    playerAmount = 1;
    currentCapacity = 0;
    useRunWays = true;
    useUmpacken = true;
    useSchleifenfahrt = true;


    async created(){
        //load the cookie or create if not available
        if(!localStorage.settings){
          this.saveCookie();
        }
        else{
          this.loadCookie();
        }

        //Update the initial capacity
        this.updateAvailableCapacity();

        //Check for expert Mode
        if(this.expertMode){
          this.expertModeSwitch = true;
        }
    }

    /***
     * Updates the charts values and the chart itself
     */
    updateChart(){
      //get the values
      const currentChart: IChart = createChartData(this.calculateJobs(this.allJobs), 'h');
      return {
        title: {
          text: currentChart.title
        },
        legend: {
          data: currentChart.legend
        },
        grid: {
          containLabel: true,
          left: 0
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: currentChart.xAxisData,
        yAxis: currentChart.yAxisData,
        series: currentChart.chartSeries,
        animationDuration: currentChart.animationDuration
      }
    }

    /***
     * Behaviour for the expert Mode Dialog
     */
    expertModeFunction(){
      if(this.expertModeSwitch){
        //check if the user doesnt want to see the dialog again
        if(this.expertModeDialogAlreadyAccepted){
          this.expertMode = true;
          this.saveCookie();
        }
        else{
          this.expertModeDialog = true;
        }
      }
      else{
        this.expertModeDialog = false;
        this.expertMode = false;
        this.saveCookie();
      }
    }

    /***
     * Things that happen if a vehicle gets selected or de-selected
     */
    vehicleProgress(){
        this.updateAvailableCapacity();
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
      return jobs.map(job => this.calculateJob(job)).sort((a,b) => this.calculateProfitPerPersonPerSecond(b) - this.calculateProfitPerPersonPerSecond(a));
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
          if(this.allCars.filter(car => car.selected).length > 0){
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
        //Obsthändler mit einberechnen
        let vehicleTime = 0
        if(this.currentFruitSeller){
          if(jobStep.fruitSeller && this.currentFruitSeller.number > 0){
            //Get the current fruitSellerDistance
            const currentFruitsellerToDistance = jobStep.fruitSellerDistances.filter(fruitSeller => fruitSeller.number === this.currentFruitSeller.number);
            vehicleTime = (kmToMiles(currentFruitsellerToDistance[0].distanceKm) / this.getAverageSpeed() * 60 * 60);
          }
        }
        else{
          vehicleTime = (kmToMiles(jobStep.distanceKm) / this.getAverageSpeed() * 60 * 60);
        }
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
      let fullCapacity = (this.useTrousers ? this.currentTrousersCapacity * this.playerAmount : 0)
          + (this.useBigBag ? this.currentBigBagCapacity * this.playerAmount : 0);
      this.allCars.forEach((vehicle) => {
        if(vehicle.selected){
          fullCapacity = fullCapacity + (vehicle.capacity * vehicle.amount);
        }
      });
      return fullCapacity;
    }

    /***
     * Get the maximum available Capacity for the current selection
     */
    updateAvailableCapacity(){
        let fullCapacity = (this.useTrousers ? this.currentTrousersCapacity * this.playerAmount : 0)
            + (this.useBigBag ? this.currentBigBagCapacity * this.playerAmount : 0);
        this.allCars.forEach((car) => {
          if(car.selected && car.active){
            fullCapacity = fullCapacity + (car.capacity * car.amount);
          }
        })
        this.currentCapacity = fullCapacity;
        if(this.showGraph && this.updateGraphOnEveryChange){
          this.updateChart();
        }
    }

    /***
     * Returns the average Speed over all Vehicles selected
     */
    getAverageSpeed(){
      //Full Speed
      let fullSpeed = 0;
      this.allCars.forEach((car) => {
        if(car.selected){
          fullSpeed = fullSpeed + car.speed
        }
      });
      let activeCarAmount = 0;
      this.allCars.forEach((car) => {
        if(car.selected){
          activeCarAmount++;
        }
      });
      return fullSpeed / activeCarAmount;
    }

  /***
   * Updates the array of currently selected cars
   * @param currentVehicle the vehicle
   * @param mathType 1: add; 2: substract; 3: just take the vehicle amount
   */
    updateCurrentlySelectedVehicles(currentVehicle: IVehicle, mathType: number){
      switch (mathType){
        case 1:
          currentVehicle.amount++;
          currentVehicle.selected = true;
          this.updateAvailableCapacity();
          this.saveCookie();
          break;
        case 2:
          //check if vehicle needs to be deleted from the array
          if((currentVehicle.amount - 1) > 0){
            currentVehicle.amount--;
            currentVehicle.selected = true;
          }
          else{
            currentVehicle.amount--;
            currentVehicle.selected = false;
          }
          this.updateAvailableCapacity();
          this.saveCookie();
          break;
        case 3:
          currentVehicle.selected = true;
          this.updateAvailableCapacity();
          this.saveCookie();
          break;
        default:
          break;
      }
    }

    //
    // Custom Vehicle Creation
    //

    /***
     * Resets the values of the tempVehicle
     */
    resetTempVehicle(){
      this.tempVehicle = {
        id: 99,
        name: '',
        speed: 0,
        capacity: 0,
        amount: 0,
        active: true,
        selected: false
      };
    }

    /***
     * Adds the custom created vehicle to the vehicle array
     */
    addCustomVehicle(){
      //give the new vehicle an unique id
      if(this.tempVehicle.name === ''){
        return;
      }
      const startID = 100;
      this.tempVehicle.id = startID + this.allCars.length + this.tempVehicle.name.length;
      this.allCars.push(this.tempVehicle);
      this.customVehicleDialog = false;
      this.resetTempVehicle();
      this.saveCookie();
    }

    /***
     * Deletes a vehicle from the array
     */
    deleteVehicle(){
      const vehicleToDelete = this.allCars.find(vehicle => vehicle.id === this.tempVehicle.id);
      if(vehicleToDelete !== undefined){
        //Delete the vehicle from the allcars array
        Vue.delete(this.allCars, this.allCars.findIndex(vehicle => vehicle.id === this.tempVehicle.id));
      }
      this.resetTempVehicle();
      this.updateAvailableCapacity();
      this.saveCookie();
    }

    //
    //Cookie Area
    //

    /***
     * Updates the cookie value with the current states
     * In fact, you just got pranked! It's local storage not a cookie
     */
    saveCookie(){
      //Just override or create
      localStorage.settings = JSON.stringify(this.generateNewSaveFile());
    }

    /***
     * Loads the settings from the cookie
     * In fact, you just got pranked! It's local storage not a cookie
     */
    loadCookie(){
      const cookie = JSON.parse(localStorage.settings);
      //load the settings
      this.allCars = cookie.vehicles;
      this.allJobs = cookie.jobs;
      this.expertMode = cookie.settings.expertMode;
      this.expertModeDialogAlreadyAccepted = cookie.settings.expertModeDialogAlreadyAccepted;
      this.currentTrousersCapacity = cookie.settings.currentTrousersCapacity;
      this.useTrousers = cookie.settings.useTrousers;
      this.currentBigBagCapacity = cookie.settings.currentBigBagCapacity;
      this.useBigBag = cookie.settings.useBigBag;
      this.useVehicleSpeed = cookie.settings.useVehicleSpeed;
      this.playerAmount = cookie.settings.playerAmount;
      this.currentCapacity = cookie.settings.currentCapacity;
      this.useRunWays = cookie.settings.useRunWays;
      this.useUmpacken = cookie.settings.useUmpacken;
      this.useSchleifenfahrt = cookie.settings.useSchleifenfahrt;
      this.showGraph = cookie.settings.showGraph;
      this.updateGraphOnEveryChange = cookie.settings.updateGraphOnEveryChange;
      this.currentFruitSeller = cookie.currentFruitSeller;
    }

    /***
     * Returns the full save-file
     */
    generateNewSaveFile(): ISaveFile{
      return {
        vehicles: this.allCars,
        jobs: this.allJobs,
        settings: {
          expertMode: this.expertMode,
          expertModeDialogAlreadyAccepted: this.expertModeDialogAlreadyAccepted,
          currentTrousersCapacity: this.currentTrousersCapacity,
          useTrousers: this.useTrousers,
          currentBigBagCapacity: this.currentBigBagCapacity,
          useBigBag: this.useBigBag,
          useVehicleSpeed: this.useVehicleSpeed,
          playerAmount: this.playerAmount,
          currentCapacity: this.currentCapacity,
          useRunWays: this.useRunWays,
          useUmpacken: this.useUmpacken,
          useSchleifenfahrt: this.useSchleifenfahrt,
          showGraph: this.showGraph,
          updateGraphOnEveryChange: this.updateGraphOnEveryChange
        },
        currentFruitSeller: this.currentFruitSeller,
        version: 3
      };
    }

  //
  // Reset Stuff
  //

  /***
   * Resets all selected things
   */
  resetFunction(){
    //check if vehicles have to be reset
    if(this.resetCars){
      this.allCars = cars;
    }
    //check if jobs have to be reset
    if(this.resetJobs){
      this.allJobs = jobs;
    }
    //check if settings have to be reset
    if(this.resetSettings){
      this.expertMode = false;
      this.expertModeSwitch = false;
      this.expertModeDialogAlreadyAccepted = false;
    }
    //update some stuff
    this.updateAvailableCapacity();
    this.saveCookie();
    this.resetDialog = false;
  }

}
</script>

<style scoped>

</style>
