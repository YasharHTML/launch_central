/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TeamCreateFormInputValues = {
    teamName?: string;
    teamDescription?: string;
    teamCreationDate?: string;
};
export declare type TeamCreateFormValidationValues = {
    teamName?: ValidationFunction<string>;
    teamDescription?: ValidationFunction<string>;
    teamCreationDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TeamCreateFormOverridesProps = {
    TeamCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    teamName?: PrimitiveOverrideProps<TextFieldProps>;
    teamDescription?: PrimitiveOverrideProps<TextFieldProps>;
    teamCreationDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TeamCreateFormProps = React.PropsWithChildren<{
    overrides?: TeamCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TeamCreateFormInputValues) => TeamCreateFormInputValues;
    onSuccess?: (fields: TeamCreateFormInputValues) => void;
    onError?: (fields: TeamCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TeamCreateFormInputValues) => TeamCreateFormInputValues;
    onValidate?: TeamCreateFormValidationValues;
} & React.CSSProperties>;
export default function TeamCreateForm(props: TeamCreateFormProps): React.ReactElement;
