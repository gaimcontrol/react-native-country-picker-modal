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
exports.AnimatedModal = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const { height } = react_native_1.Dimensions.get('window');
const duration = 300;
const useNativeDriver = true;
const AnimatedModal = ({ children, visible }) => {
    const translateY = new react_native_1.Animated.Value(height);
    const showModal = react_native_1.Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver,
    }).start;
    const hideModal = react_native_1.Animated.timing(translateY, {
        toValue: height,
        duration,
        useNativeDriver,
    }).start;
    React.useEffect(() => {
        if (visible) {
            showModal();
        }
        else {
            hideModal();
        }
    }, [visible]);
    return (React.createElement(react_native_1.Animated.View, { style: {
            ...react_native_1.StyleSheet.absoluteFillObject,
            transform: [{ translateY }],
            zIndex: 99,
        } }, children));
};
exports.AnimatedModal = AnimatedModal;
exports.AnimatedModal.defaultProps = {
    visible: false,
};
