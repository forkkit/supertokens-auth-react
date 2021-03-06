/** @jsx jsx */
import { CSSObject } from "@emotion/core";
import React from "react";
import { RefObject } from "react";
import { APIFormField } from "../../../../types";
import { InputRef } from "../../types";
declare type InputProps = {
    style?: CSSObject;
    errorStyle?: CSSObject;
    type: string;
    name: string;
    autoComplete?: string;
    hasError: boolean;
    placeholder: string;
    ref: RefObject<any>;
    onInputBlur?: (field: APIFormField) => void;
    onInputFocus?: (field: APIFormField) => void;
};
declare const _default: React.ForwardRefExoticComponent<Pick<InputProps, "style" | "name" | "type" | "placeholder" | "autoComplete" | "hasError" | "onInputFocus" | "onInputBlur" | "errorStyle"> & React.RefAttributes<InputRef>>;
export default _default;
