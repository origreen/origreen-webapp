export interface ProfileParameters {
    weight: number;
    parameters?: Record<string, ProfileParameters>;
}

export interface Profile {
    name: string;
    active: boolean;
    parameters: ProfileParameters;
}

export interface Food {
    id: string;
    name: string;
    photo: string;
    isBiological: boolean;
    location: {
        coordinates: {
            lat: number;
            lon: number;
        },
        greenhouse: string;
        city: string;
        region: string;
        country: string;
    };
    growingInformation: {
        isOpenair: boolean;
        waterUsage: number;
        energyUsage: number;
        co2Emissions: number;
        typesOfEnergy: { type: string; percentage: number }[];
        timelapse: { date: string; url: string }[];
        pesticide: { name: string; value: number; biological: boolean }[];
    };
    nutritionalInformation: {
        calories: number;
        protein: number;
        carbohydrates: number;
        fat: number;
        fiber: number;
        salt: number;
        vitaminA: number;
        vitaminC: number;
        vitaminD: number;
        vitaminE: number;
        vitaminK: number;
        vitaminB1: number;
        vitaminB2: number;
        vitaminB3: number;
        vitaminB6: number;
        vitaminB12: number;
        folate: number;
        niacin: number;
        biotin: number;
        pantothenicAcid: number;
        phosphorus: number;
        magnesium: number;
        iron: number;
        zinc: number;
        copper: number;
        manganese: number;
        selenium: number;
        fluoride: number;
        cholesterol: number;
        sodium: number;
        potassium: number;
        chloride: number;
        bromide: number;
        iodine: number;
        caffeine: number;
        alcohol: number;
        water: number;
        fertilizers: {
            name: string;
            value: number;
        }[];
    }
}

export interface Score {
    personalized: number;
    nutritional: {
        overall: number;
        vitamin: number;
        fiber: number;
        caloric: number;
        sodium: number;
    };
    environmental: {
        overall: number;
        water: number;
        energy: number;
        co2: number;
    }
}