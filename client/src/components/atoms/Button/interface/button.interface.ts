import type { PropsWithChildren } from "react";

export type ButtonSize = "sm" | "md" | "lg" | "xl";
export type ButtonWeight = "light" | "regular" | "bold";
export type ButtonType = "primary" | "secondary" | "terciary" | "danger" | "warning" | "success";
export type ButtonVariant = "solid" | "ghost";
export type ButtonShape = "rounded" | "square";
export type ButtonEffect = "shadow" | "slide" | "none";
export type ButtonWidth = "w-sm" | "w-md" | "w-lg" | "w-xl";

export interface ButtonProps extends PropsWithChildren {
    onClick?: () => void;
    size?: ButtonSize;
    type?: ButtonType;
    variant?: ButtonVariant;
    shape?: ButtonShape;
    effect?: ButtonEffect;
    weight?: ButtonWeight;
    width?: ButtonWidth;
}