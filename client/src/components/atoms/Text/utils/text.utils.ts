import type { TextSize } from "../interface/text.interface";
import stylesScss from "../text.module.scss";

export const fontSizes = (size: TextSize) => {
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