import IJob from "@/types/IJob";

const jobs: IJob[] = [
    {
        id: 0,
        name: "Beton",
        stepsDescription: "Steinbruch -> Steinrüttler -> Betonmischer -> Baustellenhändler",
        toolRequired: "Spitzhacke",
        stepsAmount: 3,
        pricePerResource: 88,
        steps: [
            {
                sourceName: "Bruchstein",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 200,
                cycleTime: 10,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 3.68,
                rundistance: 3,
                umpackenTime: 1
            },
            {
                sourceName: "Steinpulver",
                amountOfIngredientsPerCycle: [5,5],
                sizeOfIngredient: 40,
                cycleTime: 10,
                ingredientRatio: [1,5],
                umpackenAvail: false,
                distanceKm: 6.33,
                rundistance: 3,
                umpackenTime: 1
            },
            {
                sourceName: "Beton",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 200,
                cycleTime: 15,
                ingredientRatio: [5,1],
                umpackenAvail: true,
                distanceKm: 1.55,
                rundistance: 7,
                umpackenTime: 18
            }
        ],
        rundistance: 5,
        umpackenTime: 6,
        loopDistanceKm: 6,
        jobColor: ["#BDBDBD", "#EFEFEF"]
    },
    {
        id: 1,
        name: "Benzin",
        stepsDescription: "Ölpumpen -> Öl Aufbereitung -> Raffinerie -> Öl-Ankauf",
        toolRequired: "Spitzhacke",
        stepsAmount: 3,
        pricePerResource: 35,
        steps: [
            {
                sourceName: "Rohöl",
                amountOfIngredientsPerCycle: [3,4],
                sizeOfIngredient: 40,
                cycleTime: 4,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 3.68,
                rundistance: 3,
                umpackenTime: 1
            },
            {
                sourceName: "Raffiniertes Öl",
                amountOfIngredientsPerCycle: [2,2],
                sizeOfIngredient: 80,
                cycleTime: 15,
                ingredientRatio: [4,2],
                umpackenAvail: true,
                distanceKm: 6.3,
                rundistance: 10,
                umpackenTime: 18
            },
            {
                sourceName: "Benzin",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 80,
                cycleTime: 5,
                ingredientRatio: [1,1],
                umpackenAvail: true,
                distanceKm: 2.5,
                rundistance: 10,
                umpackenTime: 18
            }
        ],
        rundistance: 5,
        umpackenTime: 6,
        loopDistanceKm: 6.25,
        jobColor: ["#78909C", "#c4cfd4"]
    },
    {
        id: 2,
        name: "Gold",
        stepsDescription: "Goldfluss -> Gold Verarbeiter -> Juwelier",
        toolRequired: "Spitzhacke",
        stepsAmount: 2,
        pricePerResource: 269,
        steps: [
            {
                sourceName: "Goldklumpen",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 200,
                cycleTime: 10,
                ingredientRatio: [1,1],
                umpackenAvail: true,
                distanceKm: 6.25,
                rundistance: 10,
                umpackenTime: 12
            },
            {
                sourceName: "Goldnugget",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 1000,
                cycleTime: 30,
                ingredientRatio: [5,1],
                umpackenAvail: true,
                distanceKm: 3.12,
                rundistance: 65,
                umpackenTime: 18
            }
        ],
        rundistance: 25,
        umpackenTime: 6,
        loopDistanceKm: 3.5,
        jobColor: ["#F7CB4D", "#fdf2d3"]
    },
    {
        id: 3,
        name: "Mehl",
        stepsDescription: "Getreidefeld -> Getreidemühle -> Bäckerei",
        toolRequired: "Sichel",
        stepsAmount: 2,
        pricePerResource: 115,
        steps: [
            {
                sourceName: "Getreide",
                amountOfIngredientsPerCycle: [1,4],
                sizeOfIngredient: 80,
                cycleTime: 6,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 0.4,
                rundistance: 3,
                umpackenTime: 1
            },
            {
                sourceName: "Mehl",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 400,
                cycleTime: 30,
                ingredientRatio: [5,1],
                umpackenAvail: true,
                distanceKm: 6.88,
                rundistance: 5,
                umpackenTime: 18
            }
        ],
        rundistance: 12,
        umpackenTime: 12,
        loopDistanceKm: 6.77,
        jobColor: ["#8BC34A", "#DDEDCA"]
    },
    {
        id: 4,
        name: "Erdbeeren",
        stepsDescription: "Erdbeerfeld -> Obsthändler",
        toolRequired: "Gartenschaufel",
        stepsAmount: 1,
        pricePerResource: 6,
        steps: [
            {
                sourceName: "Erdbeeren",
                amountOfIngredientsPerCycle: [2,2],
                sizeOfIngredient: 36,
                cycleTime: 6,
                ingredientRatio: [1,1],
                umpackenAvail: true,
                distanceKm: 3,
                rundistance: 3,
                umpackenTime: 6
            }
        ],
        rundistance: 2,
        umpackenTime: 6,
        loopDistanceKm: 3,
        jobColor: ["#E91D63", "#F9C3D5"]
    },
    {
        id: 5,
        name: "Wein",
        stepsDescription: "Weintrauben -> Gärtanks -> Abfüllanlage -> Am edlen Tropfen",
        toolRequired: "Sichel",
        stepsAmount: 3,
        pricePerResource: 183,
        steps: [
            {
                sourceName: "Weintrauben",
                amountOfIngredientsPerCycle: [20,29],
                sizeOfIngredient: 4,
                cycleTime: 4,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 5.44,
                rundistance: 4,
                umpackenTime: 1
            },
            {
                sourceName: "Gegorenes Fruchtiges",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 80,
                cycleTime: 8,
                ingredientRatio: [20,1],
                umpackenAvail: true,
                distanceKm: 3.73,
                rundistance: 15,
                umpackenTime: 18
            },
            {
                sourceName: "Wein",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 400,
                cycleTime: 20,
                ingredientRatio: [5,1],
                umpackenAvail: true,
                distanceKm: 3.44,
                rundistance: 10,
                umpackenTime: 18
            }
        ],
        rundistance: 10,
        umpackenTime: 6,
        loopDistanceKm: 4,
        jobColor: ["#A64D79", "#e1bfd0"]
    },
    {
        id: 6,
        name: "Holz",
        stepsDescription: "Wald -> Sägewerk -> Schreinerei",
        toolRequired: "Kettensäge",
        stepsAmount: 2,
        pricePerResource: 93,
        steps: [
            {
                sourceName: "Holz",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 1000,
                cycleTime: 30,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 6.8,
                rundistance: 4,
                umpackenTime: 1
            },
            {
                sourceName: "Brett",
                amountOfIngredientsPerCycle: [2,2],
                sizeOfIngredient: 100,
                cycleTime: 30,
                ingredientRatio: [1,2],
                umpackenAvail: true,
                distanceKm: 10.5,
                rundistance: 6,
                umpackenTime: 12
            }
        ],
        rundistance: 2,
        umpackenTime: 6,
        loopDistanceKm: 9.4,
        jobColor: ["#CCA677", "#e9d9c4"]
    },
    {
        id: 7,
        name: "Eisen",
        stepsDescription: "Eisenmine -> Schmelze -> Metallhändler",
        toolRequired: "Spitzhacke",
        stepsAmount: 2,
        pricePerResource: 155,
        steps: [
            {
                sourceName: "Eisenerz",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 500,
                cycleTime: 10,
                ingredientRatio: [1,1],
                umpackenAvail: true,
                distanceKm: 5.3,
                rundistance: 60,
                umpackenTime: 6
            },
            {
                sourceName: "Eisenbarren",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 1000,
                cycleTime: 30,
                ingredientRatio: [2,1],
                umpackenAvail: true,
                distanceKm: 2.26,
                rundistance: 60,
                umpackenTime: 18
            }
        ],
        rundistance: 5,
        umpackenTime: 12,
        loopDistanceKm: 6.6,
        jobColor: ["#8989EB","#e8e8fb"]
    },
    {
        id: 8,
        name: "Mais",
        stepsDescription: "Maisfeld -> Maiskäufer",
        toolRequired: "Sichel",
        stepsAmount: 1,
        pricePerResource: 5,
        steps: [
            {
                sourceName: "Mais",
                amountOfIngredientsPerCycle: [2,3],
                sizeOfIngredient: 40,
                cycleTime: 6,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 4.5,
                rundistance: 3,
                umpackenTime: 1
            }
        ],
        rundistance: 5,
        umpackenTime: 6,
        loopDistanceKm: 4.5,
        jobColor: ["#26A69A","#BCF0EB"]
    },
    {
        id: 9,
        name: "Kürbis",
        stepsDescription: "Onkel Joe's Kürbisfarm -> Obsthändler",
        toolRequired: "Gartenschaufel",
        stepsAmount: 1,
        pricePerResource: 12,
        steps: [
            {
                sourceName: "Kürbis",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 80,
                cycleTime: 6,
                ingredientRatio: [1,1],
                umpackenAvail: true,
                distanceKm: 3.05,
                rundistance: 3,
                umpackenTime: 6
            }
        ],
        rundistance: 2,
        umpackenTime: 6,
        loopDistanceKm: 3.05,
        jobColor: ["#F46524","#fddfd2"]
    },
    {
        id: 10,
        name: "Nüsse",
        stepsDescription: "Nussplantage -> Obsthändler",
        toolRequired: "Gartenschaufel?",
        stepsAmount: 1,
        pricePerResource: 5,
        steps: [
            {
                sourceName: "Nüsse",
                amountOfIngredientsPerCycle: [2,2],
                sizeOfIngredient: 36,
                cycleTime: 6,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 2.1,
                rundistance: 3,
                umpackenTime: 1
            }
        ],
        rundistance: 2,
        umpackenTime: 12,
        loopDistanceKm: 2.1,
        jobColor: ["#63D297","#dcf5e7"]
    }
]

export default jobs;

/* Vorlage Job:
        id: 0,
        name: "",
        stepsDescription: "",
        toolRequired: "",
        stepsAmount: 0,
        pricePerResource: 0,
        steps: [

        ],
        rundistance: 0,
        umpackenTime: 1,
        loopDistanceKm: 0,
        jobColor: []
 */
/* Vorlage Step:
        sourceName: "",
        amountOfIngredientsPerCycle: [0,0],
        sizeOfIngredient: 0,
        cycleTime: 0,
        ingredientRatio: [0,0],
        umpackenAvail: false,
        distanceKm: 0,
        rundistance: 0,
        umpackenTime: 1
 */
