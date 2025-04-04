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
exports.CountryList = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const CountryTheme_1 = require("./CountryTheme");
const Flag_1 = require("./Flag");
const CountryContext_1 = require("./CountryContext");
const CountryText_1 = require("./CountryText");
const borderBottomWidth = 2 / react_native_1.PixelRatio.get();
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    letters: {
        flex: 1,
        marginRight: 10,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    letter: {
        height: 23,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
    },
    itemCountry: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    itemCountryName: {
        width: '90%',
    },
    list: {
        flex: 1,
    },
    sep: {
        borderBottomWidth,
        width: '100%',
    },
});
const Letter = ({ letter, scrollTo }) => {
    const { fontSize, activeOpacity } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { testID: `letter-${letter}`, key: letter, onPress: () => scrollTo(letter), activeOpacity },
        react_1.default.createElement(react_native_1.View, { style: styles.letter },
            react_1.default.createElement(CountryText_1.CountryText, { style: [styles.letterText, { fontSize: fontSize * 0.8 }] }, letter))));
};
const CountryItem = (props) => {
    const { activeOpacity, itemHeight, flagSize } = (0, CountryTheme_1.useTheme)();
    const { country, onSelect, withFlag, withEmoji, withCallingCode, withCurrency, } = props;
    const extraContent = [];
    if (withCallingCode &&
        country.callingCode &&
        country.callingCode.length > 0) {
        extraContent.push(`+${country.callingCode.join('|')}`);
    }
    if (withCurrency && country.currency && country.currency.length > 0) {
        extraContent.push(country.currency.join('|'));
    }
    const countryName = typeof country.name === 'string' ? country.name : country.name.common;
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: country.cca2, testID: `country-selector-${country.cca2}`, onPress: () => onSelect(country), activeOpacity },
        react_1.default.createElement(react_native_1.View, { style: [styles.itemCountry, { height: itemHeight }] },
            withFlag && (react_1.default.createElement(Flag_1.Flag, { withEmoji, countryCode: country.cca2, flagSize: flagSize })),
            react_1.default.createElement(react_native_1.View, { style: styles.itemCountryName },
                react_1.default.createElement(CountryText_1.CountryText, { numberOfLines: 2, ellipsizeMode: 'tail' },
                    countryName,
                    extraContent.length > 0 && ` (${extraContent.join(', ')})`)))));
};
CountryItem.defaultProps = {
    withFlag: true,
    withCallingCode: false,
};
const MemoCountryItem = (0, react_1.memo)(CountryItem);
const renderItem = (props) => ({ item: country }) => (react_1.default.createElement(MemoCountryItem, { country, ...props }));
const ItemSeparatorComponent = () => {
    const { primaryColorVariant } = (0, CountryTheme_1.useTheme)();
    return (react_1.default.createElement(react_native_1.View, { style: [styles.sep, { borderBottomColor: primaryColorVariant }] }));
};
const { height } = react_native_1.Dimensions.get('window');
const CountryList = (props) => {
    const { data, withAlphaFilter, withEmoji, withFlag, withCallingCode, withCurrency, onSelect, filter, flatListProps, filterFocus, } = props;
    const flatListRef = (0, react_1.useRef)(null);
    const [letter, setLetter] = (0, react_1.useState)('');
    const { itemHeight, backgroundColor } = (0, CountryTheme_1.useTheme)();
    const indexLetter = data
        .map((country) => country.name.substr(0, 1))
        .join('');
    const scrollTo = (letter, animated = true) => {
        const index = indexLetter.indexOf(letter);
        setLetter(letter);
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ animated, index });
        }
    };
    const onScrollToIndexFailed = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd();
            scrollTo(letter);
        }
    };
    const { search, getLetters } = (0, CountryContext_1.useContext)();
    const letters = getLetters(data);
    (0, react_1.useEffect)(() => {
        if (data && data.length > 0 && filterFocus && !filter) {
            scrollTo(letters[0], false);
        }
    }, [filterFocus]);
    const initialNumToRender = Math.round(height / (itemHeight || 1));
    return (react_1.default.createElement(react_native_1.View, { style: [styles.container, { backgroundColor }] },
        react_1.default.createElement(react_native_1.FlatList, { ref: flatListRef, testID: 'list-countries', keyboardShouldPersistTaps: 'handled', automaticallyAdjustContentInsets: false, scrollEventThrottle: 1, getItemLayout: (_data, index) => ({
                length: itemHeight + borderBottomWidth,
                offset: (itemHeight + borderBottomWidth) * index,
                index,
            }), renderItem: renderItem({
                withEmoji,
                withFlag,
                withCallingCode,
                withCurrency,
                onSelect,
            }), data: search(filter, data),
            keyExtractor: (item) => item === null || item === void 0 ? void 0 : item.cca2,
            onScrollToIndexFailed,
            ItemSeparatorComponent,
            initialNumToRender, ...flatListProps }),
        withAlphaFilter && (react_1.default.createElement(react_native_1.ScrollView, { scrollEnabled: false, contentContainerStyle: styles.letters, keyboardShouldPersistTaps: 'always' }, letters.map((letter) => (react_1.default.createElement(Letter, { key: letter, letter, scrollTo })))))));
};
exports.CountryList = CountryList;
exports.CountryList.defaultProps = {
    filterFocus: undefined,
};
