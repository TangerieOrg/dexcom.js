import { GlucoseTrend, GlucoseTrendMeaning } from "./types";

export const DEXCOM_APPLICATION_ID = "d89443d2-327c-4a6f-89e5-496bbb0317db";
export const DEXCOM_BASE_URL = "https://shareous1.dexcom.com/ShareWebServices/Services";

export const REQUEST_TIMEOUT = 10;
export const DEFAULT_UUID = "00000000-0000-0000-0000-000000000000";
export const MMOL_L_CONVERSION_FACTOR = 0.0555;

export const GlucoseTrendPrediction : Record<GlucoseTrend, GlucoseTrendMeaning> = {
    None: {
        min: 0,
        max: 0
    },
    DoubleUp: {
        min: 5,
        max: 10
    },
    SingleUp: {
        min: 3.3,
        max: 5
    },
    FortyFiveUp: {
        min: 1.7,
        max: 3.3
    },
    Flat: {
        min: -1.5,
        max: 1.5
    },
    FortyFiveDown: {
        min: -1.7,
        max: -3.3
    },
    SingleDown: {
        min: -3.3,
        max: -5
    },
    DoubleDown: {
        min: -5,
        max: -10
    },
    NotComputable: {
        min: 0,
        max: 0
    },
    RateOutOfRange: {
        min: 0,
        max: 0
    }
}