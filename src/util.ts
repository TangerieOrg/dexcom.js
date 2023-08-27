import { MMOL_L_CONVERSION_FACTOR } from "./constants";

export const roundTo = (value : number, points : number) => Math.round(value * Math.pow(10, points)) / Math.pow(10, points); 
export const mgToMmol = (value : number) => roundTo(value * MMOL_L_CONVERSION_FACTOR, 2);
export const getGlucoseDate = (dateStr : string) => new Date(parseInt(dateStr.slice(5, -1)));