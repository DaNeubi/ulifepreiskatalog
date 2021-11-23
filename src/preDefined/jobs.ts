import IJob from "@/types/IJob";

const jobs: IJob[] = [
    {
        id: 0,
        name: "Beton",
        stepsDescription: "Steinbruch -> Steinrüttler -> Betonmischer -> Baustellenhändler",
        toolRequired: "Spitzhacke",
        stepsAmount: 3,
        pricePerResource: 100,
        steps: [
            {
                sourceName: "Bruchstein",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 200,
                cycleTime: 10,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 3.67,
                rundistance: 3,
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
            },
            {
                sourceName: "Steinpulver",
                amountOfIngredientsPerCycle: [5,5],
                sizeOfIngredient: 40,
                cycleTime: 10,
                ingredientRatio: [1,5],
                umpackenAvail: false,
                distanceKm: 6.30,
                rundistance: 3,
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 63,
        steps: [
            {
                sourceName: "Rohöl",
                amountOfIngredientsPerCycle: [3,4],
                sizeOfIngredient: 40,
                cycleTime: 4,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 3.6,
                rundistance: 3,
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
            },
            {
                sourceName: "Raffiniertes Öl",
                amountOfIngredientsPerCycle: [2,2],
                sizeOfIngredient: 80,
                cycleTime: 15,
                ingredientRatio: [4,2],
                umpackenAvail: true,
                distanceKm: 6.31,
                rundistance: 10,
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 280,
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
                umpackenTime: 12,
                fruitSeller: false,
                fruitSellerDistances: []
            },
            {
                sourceName: "Goldnugget",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 1000,
                cycleTime: 30,
                ingredientRatio: [5,1],
                umpackenAvail: true,
                distanceKm: 3.14,
                rundistance: 65,
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 57,
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
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 4,
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
                umpackenTime: 6,
                fruitSeller: true,
                fruitSellerDistances: [
                    {
                        number: 1,
                        distanceKm: 2.55
                    },
                    {
                        number: 2,
                        distanceKm: 3.37
                    },
                    {
                        number: 3,
                        distanceKm: 5.49
                    }
                ]
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
        pricePerResource: 91,
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
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 115,
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
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 12,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 170,
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
                umpackenTime: 6,
                fruitSeller: false,
                fruitSellerDistances: []
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
                umpackenTime: 18,
                fruitSeller: false,
                fruitSellerDistances: []
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
        pricePerResource: 3,
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
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
            }
        ],
        rundistance: 5,
        umpackenTime: 6,
        loopDistanceKm: 4.5,
        jobColor: ["#F9FF0F","#FFFF9D"]
    },
    {
        id: 9,
        name: "Kürbis",
        stepsDescription: "Onkel Joe's Kürbisfarm -> Obsthändler",
        toolRequired: "Gartenschaufel",
        stepsAmount: 1,
        pricePerResource: 11,
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
                umpackenTime: 6,
                fruitSeller: true,
                fruitSellerDistances: [
                    {
                        number: 1,
                        distanceKm: 3.04
                    },
                    {
                        number: 2,
                        distanceKm: 3.58
                    },
                    {
                        number: 3,
                        distanceKm: 5.71
                    }
                ]
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
        toolRequired: "Gartenschaufel",
        stepsAmount: 1,
        pricePerResource: 11,
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
                umpackenTime: 1,
                fruitSeller: true,
                fruitSellerDistances: [
                    {
                        number: 1,
                        distanceKm: 2.10
                    },
                    {
                        number: 2,
                        distanceKm: 2.90
                    },
                    {
                        number: 3,
                        distanceKm: 5.74
                    }
                ]
            }
        ],
        rundistance: 2,
        umpackenTime: 12,
        loopDistanceKm: 2.1,
        jobColor: ["#7A5C2F","#C7AE89"]
    }/*,
    {
        id: 11,
        name: "Joint",
        stepsDescription: "Marihuanaplantage -> ???",
        toolRequired: "Kein Werkzeug",
        stepsAmount: 3,
        pricePerResource: 300,
        steps: [
            {
                sourceName: "Marihuanapflanze",
                amountOfIngredientsPerCycle: [3,4],
                sizeOfIngredient: 160,
                cycleTime: 15,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 0,
                rundistance: 0,
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
            },
            {
                sourceName: "Getrocknetes Marihuana",
                amountOfIngredientsPerCycle: [5,5],
                sizeOfIngredient: 80,
                cycleTime: 30,
                ingredientRatio: [5,5],
                umpackenAvail: false,
                distanceKm: 0,
                rundistance: 0,
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
            },
            {
                sourceName: "Joint",
                amountOfIngredientsPerCycle: [1,1],
                sizeOfIngredient: 100,
                cycleTime: 20,
                ingredientRatio: [1,1],
                umpackenAvail: false,
                distanceKm: 0,
                rundistance: 0,
                umpackenTime: 1,
                fruitSeller: false,
                fruitSellerDistances: []
            }
        ],
        rundistance: 0,
        umpackenTime: 1,
        loopDistanceKm: 0,
        jobColor: ["#00802b","#00cc44"]
    }*/
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
        umpackenTime: 1,
        fruitSeller: false,
        fruitSellerDistances: []
 */
