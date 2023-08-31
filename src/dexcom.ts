import axios from 'axios';
import { DEXCOM_APPLICATION_ID, DEXCOM_BASE_URL, REQUEST_TIMEOUT, DEFAULT_UUID } from './constants';
import { GlucoseReadingJSON, TrendArrow } from './types';
import { getGlucoseDate, mgToMmol } from './util';

export class GlucoseReading {
    static UseMg : boolean = false;
    json : GlucoseReadingJSON;

    constructor(json : GlucoseReadingJSON) {
        this.json = json;
    }

    get value() { return GlucoseReading.UseMg ? this.json.Value : mgToMmol(this.json.Value) }

    get trend() { return this.json.Trend; }
    get trendArrow() { return TrendArrow[this.json.Trend]; }
    get date() { return getGlucoseDate(this.json.WT); }

    toString() {
        const d = this.date;
        return `[${(d.getHours() % 12).toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} ${d.getHours() >= 12 ? "PM" : "AM"} ${d.toLocaleDateString()}] ${this.trendArrow.padEnd(2, " ")} ${this.value.toFixed(2).padEnd(5, " ")} ${GlucoseReading.UseMg ? "mg/dL" : "mmol/L"}`;
    }

    toObject() {
        return {
            value: this.value,
            trend: this.trend,
            trendArrow: this.trendArrow,
            date: this.date
        }
    }
}

export class Dexcom {
    private username : string;
    private password : string;
    private account_id? : string;
    private session_id?: string;

    private instance = axios.create({
        baseURL: DEXCOM_BASE_URL,
        timeout: REQUEST_TIMEOUT * 1000,
        headers: {
            "Accept-Encoding": "application/json"
        }
    })

    static async Create(username : string, password : string) {
        const dex = new Dexcom(username, password);
        await dex.login();
        return dex;
    }

    constructor(username : string, password : string) {
        this.username = username;
        this.password = password;
    }

    async getAccountID() {
        const res = await this.instance.post("General/AuthenticatePublisherAccount", {
            accountName: this.username,
            password: this.password,
            applicationId: DEXCOM_APPLICATION_ID
        });

        this.account_id = res.data as string;
        return this.account_id as string;
    }

    async getSessionID() {
        const res = await this.instance.post("General/LoginPublisherAccountById", {
            accountId: this.account_id!,
            password: this.password,
            applicationId: DEXCOM_APPLICATION_ID
        });
        if(res.data === DEFAULT_UUID) return undefined;
        
        this.session_id = res.data;
        return this.session_id!;
    }

    async login() {
        await this.getAccountID();
        await this.getSessionID();
    }

    private async _getGlucoseReadings(minutes : number = 1440, maxCount : number = 288) {
        const res = await this.instance.post("Publisher/ReadPublisherLatestGlucoseValues", {
            sessionId: this.session_id,
            minutes,
            maxCount
        });

        return res.data as GlucoseReadingJSON[];
    }

    async getGlucoseReadings(minutes : number = 1440, maxCount : number = 288) {
        return (await this._getGlucoseReadings(minutes, maxCount)).map(g => new GlucoseReading(g))
    }
}