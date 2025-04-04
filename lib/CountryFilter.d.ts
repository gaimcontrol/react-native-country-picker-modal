import React from 'react';
import { TextInputProps } from 'react-native';
export type CountryFilterProps = TextInputProps;
export declare const CountryFilter: {
    (props: CountryFilterProps): React.JSX.Element;
    defaultProps: {
        autoFocus: boolean;
        placeholder: string;
    };
};
