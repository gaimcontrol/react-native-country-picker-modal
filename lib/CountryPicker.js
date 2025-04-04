"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryPicker = void 0;
const react_1 = __importStar(require("react"));
const CountryModal_1 = require("./CountryModal");
const HeaderModal_1 = require("./HeaderModal");
const types_1 = require("./types");
const CountryFilter_1 = require("./CountryFilter");
const FlagButton_1 = require("./FlagButton");
const CountryContext_1 = require("./CountryContext");
const CountryList_1 = require("./CountryList");
const renderFlagButton = (props) => props.renderFlagButton ? (props.renderFlagButton(props)) : (react_1.default.createElement(FlagButton_1.FlagButton, { ...props }));
const renderFilter = (props) => props.renderCountryFilter ? (props.renderCountryFilter(props)) : (react_1.default.createElement(CountryFilter_1.CountryFilter, { ...props }));
const CountryPicker = (props) => {
    const { allowFontScaling, countryCode, region, subregion, countryCodes, renderFlagButton: renderButton, renderCountryFilter, filterProps, modalProps, flatListProps, onSelect, withEmoji, withFilter, withCloseButton, withCountryNameButton, withCallingCodeButton, withCurrencyButton, containerButtonStyle, withAlphaFilter, withCallingCode, withCurrency, withFlag, withModal, disableNativeModal, withFlagButton, onClose: handleClose, onOpen: handleOpen, closeButtonImage, closeButtonStyle, closeButtonImageStyle, excludeCountries, placeholder, preferredCountries, } = props;
    const [state, setState] = (0, react_1.useState)({
        visible: props.visible || false,
        countries: [],
        filter: '',
        filterFocus: false,
    });
    const { translation, getCountriesAsync } = (0, CountryContext_1.useContext)();
    const { visible, filter, countries, filterFocus } = state;
    (0, react_1.useEffect)(() => {
        if (state.visible !== props.visible) {
            setState({ ...state, visible: props.visible || false });
        }
    }, [props.visible]);
    const onOpen = () => {
        setState({ ...state, visible: true });
        if (handleOpen) {
            handleOpen();
        }
    };
    const onClose = () => {
        setState({ ...state, filter: '', visible: false });
        if (handleClose) {
            handleClose();
        }
    };
    const setFilter = (filter) => setState({ ...state, filter });
    const setCountries = (countries) => setState({ ...state, countries });
    const onSelectClose = (country) => {
        onSelect(country);
        onClose();
    };
    const onFocus = () => setState({ ...state, filterFocus: true });
    const onBlur = () => setState({ ...state, filterFocus: false });
    const flagProp = {
        allowFontScaling,
        countryCode,
        withEmoji,
        withCountryNameButton,
        withCallingCodeButton,
        withCurrencyButton,
        withFlagButton,
        renderFlagButton: renderButton,
        onOpen,
        containerButtonStyle,
        placeholder: placeholder || 'Select Country',
    };
    (0, react_1.useEffect)(() => {
        let cancel = false;
        getCountriesAsync(withEmoji ? types_1.FlagType.EMOJI : types_1.FlagType.FLAT, translation, region, subregion, countryCodes, excludeCountries, preferredCountries, withAlphaFilter)
            .then((countries) => (cancel ? null : setCountries(countries)))
            .catch(console.warn);
        return () => {
            cancel = true;
        };
    }, [translation, withEmoji]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        withModal && renderFlagButton(flagProp),
        react_1.default.createElement(CountryModal_1.CountryModal, { visible, withModal, disableNativeModal, ...modalProps, onRequestClose: onClose, onDismiss: onClose },
            react_1.default.createElement(HeaderModal_1.HeaderModal, { withFilter,
                onClose,
                closeButtonImage,
                closeButtonImageStyle,
                closeButtonStyle,
                withCloseButton, renderFilter: (props) => renderFilter({
                    ...props,
                    allowFontScaling,
                    renderCountryFilter,
                    onChangeText: setFilter,
                    value: filter,
                    onFocus,
                    onBlur,
                    ...filterProps,
                }) }),
            react_1.default.createElement(CountryList_1.CountryList, { onSelect: onSelectClose,
                data: countries,
                letters: [],
                withAlphaFilter: withAlphaFilter && filter === '',
                withCallingCode,
                withCurrency,
                withFlag,
                withEmoji,
                filter,
                filterFocus,
                flatListProps }))));
};
exports.CountryPicker = CountryPicker;
exports.CountryPicker.defaultProps = {
    withModal: true,
    withAlphaFilter: false,
    withCallingCode: false,
    placeholder: 'Select Country',
    allowFontScaling: true,
};
