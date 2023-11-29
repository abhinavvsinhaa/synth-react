export enum Orientation {
    VERTICAL,
    HORIZONTAL
}

export type ViewPosition = {
    offset?: {
        top?:number,
        bottom?:number,
        left?:number,
        right?:number
    },
    height?:number | string,
    width?:number | string,
    position: "static" | "relative" | "absolute" | "fixed" | "sticky"
}