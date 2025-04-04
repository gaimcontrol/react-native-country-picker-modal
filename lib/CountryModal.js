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
exports.CountryModal = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const AnimatedModal_1 = require("./AnimatedModal");
const Modal_1 = require("./Modal");
const CountryTheme_1 = require("./CountryTheme");
const CountryModalProvider_1 = require("./CountryModalProvider");
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
const CountryModal = ({ children, withModal, disableNativeModal, ...props }) => {
    const { backgroundColor } = (0, CountryTheme_1.useTheme)();
    const { teleport } = React.useContext(CountryModalProvider_1.CountryModalContext);
    const content = (React.createElement(react_native_1.SafeAreaView, { style: [styles.container, { backgroundColor }] }, children));
    React.useEffect(() => {
        if (disableNativeModal) {
            teleport(React.createElement(AnimatedModal_1.AnimatedModal, { ...props }, content));
        }
    }, [disableNativeModal]);
    if (withModal) {
        if (react_native_1.Platform.OS === 'web') {
            return React.createElement(Modal_1.Modal, { ...props }, content);
        }
        if (disableNativeModal) {
            return null;
        }
        return React.createElement(Modal_1.Modal, { ...props }, content);
    }
    return content;
};
exports.CountryModal = CountryModal;
exports.CountryModal.defaultProps = {
    animationType: 'slide',
    animated: true,
    withModal: true,
    disableNativeModal: false,
};
