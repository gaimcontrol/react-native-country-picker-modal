"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHeightPercent = void 0;
const react_native_1 = require("react-native");
const { height } = react_native_1.Dimensions.get('window');
// Remove the status bar height
// since the modal view does not cover this area
const ANDROID_MINUS_HEIGHT = 24;
const DEFAULT_HEIGHT = react_native_1.Platform.OS === 'android' ? height - ANDROID_MINUS_HEIGHT : height;
const getHeightPercent = (percentage) => Math.round(DEFAULT_HEIGHT * (percentage / 100));
exports.getHeightPercent = getHeightPercent;
