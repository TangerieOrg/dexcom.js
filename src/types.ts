export const GlucoseTrend = {
    None: "None",  //unconfirmed
    DoubleUp: "DoubleUp",
    SingleUp: "SingleUp",
    FortyFiveUp: "FortyFiveUp",
    Flat: "Flat",
    FortyFiveDown: "FortyFiveDown",
    SingleDown: "SingleDown",
    DoubleDown: "DoubleDown",
    NotComputable: "NotComputable",  //unconfirmed
    RateOutOfRange: "RateOutOfRange",  //unconfirmed
} as const;
export type GlucoseTrend = typeof GlucoseTrend[keyof typeof GlucoseTrend];

export const TrendArrow : Record<GlucoseTrend, string> = {
    None: "",
    DoubleUp: "↑↑",
    SingleUp: "↑",
    FortyFiveUp: "↗",
    Flat: "→",
    FortyFiveDown: "↘",
    SingleDown: "↓",
    DoubleDown: "↓↓",
    NotComputable: "?",
    RateOutOfRange: "-"
} as const;
export type TrendArrow = typeof TrendArrow[keyof typeof TrendArrow];

export interface GlucoseReadingJSON {
    Value : number;
    Trend : GlucoseTrend;
    WT: string;
    ST: string;
    DT: string;
}