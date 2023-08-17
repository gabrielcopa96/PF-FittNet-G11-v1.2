import type { TitleSize, TitleWeight } from "../interface/title.interface";
import stylesScss from "../title.module.scss";

export const fontSizes = (size: TitleSize) => {
    switch (size) {
        case "sm":
            return stylesScss.sm;
        case "md":
            return stylesScss.md;
        case "lg":
            return stylesScss.lg;
        case "xl":
            return stylesScss.xl;
        default:
            return stylesScss.md;
    }
}

export const fontWeights = (weight: TitleWeight) => {
    switch (weight) {
        case "light":
            return stylesScss.light;
        case "normal":
            return stylesScss.normal;
        case "bold":
            return stylesScss.bold;
        default:
            return stylesScss.normal;
    }
}