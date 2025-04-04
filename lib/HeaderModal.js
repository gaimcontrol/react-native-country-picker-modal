"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderModal = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CloseButton_1 = __importDefault(require("./CloseButton"));
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
const HeaderModal = (props) => {
    const { withFilter, withCloseButton, closeButtonImage, closeButtonStyle, closeButtonImageStyle, onClose, renderFilter, } = props;
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        withCloseButton && (react_1.default.createElement(CloseButton_1.default, { image: closeButtonImage, style: closeButtonStyle, imageStyle: closeButtonImageStyle, onPress: () => onClose() })),
        withFilter && renderFilter(props)));
};
exports.HeaderModal = HeaderModal;
exports.HeaderModal.defaultProps = {
    withCloseButton: true,
};
