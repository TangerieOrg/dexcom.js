import { Dexcom, GlucoseReadingJSON, GlucoseTrend, TrendArrow, getGlucoseDate, mgToMmol, roundTo } from "../src";
import dotenv from "dotenv";

dotenv.config();
Dexcom.Create(process.env.DEXCOM_USERNAME as string, process.env.DEXCOM_PASSWORD as string).then(async (dex) => {
    const readings = (await dex.getGlucoseReadings());


    let prev = readings.at(-1)!;
    for(const r of [...readings].reverse()) {
        const diff = r.value - prev.value;
        const minutesDiff = (r.date.getTime() - prev.date.getTime()) / (1000 * 60);
        const slope = Math.round(diff/minutesDiff * 1000);

        console.log(
            r.toString(), 
            slope.toString().padStart(5, " ") + " mmol/L/min (x10^-3)"
        );

        prev = r;
    }
});