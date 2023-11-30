import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const colors = {
	bg: '#ffffff',
	black: '#272C3F',
	lightBlack: '#1C1C1E',
	white: '#FFFFFF',
	purple: '#31087B',
	darkPurple: '#241939',
	lightPink: '#F4EFFF',
	darkPink: '#F86F6F',
	lightPurpule: '#EFF4FF',
	red: '#F22222',
	blue: '#545EAF',
	// new
	green: '#7E9500',
	grey: '#EBEBEB',
	primary: '#7DBFDD',
	primaryRed: '#820000',
	primaryLight: '#FCE2B2',
	lightestGrey: '#C3C3C3',
	darkGrey: '#6A6A6A',
	lightGrey: '#908FA1',
	globalSearch: '#B8C1CC',
	accountGrey: '#4F4F4F',
	chatGrey: '#E4E9F2',
	profileGrey: '#888888',
	addressGrey: '#96979C',
	cardGrey: '#96979C',
	backgroundOrange: '#FAEFDC',
	primaryDark: '#518DA8'
};

const fonts = {
	BOLD: 'ProductSans-Bold',
	ITALIC: 'ProductSans-Italic',
	BOLD_ITALIC: 'ProductSans-Bold-Italic',
	REGULAR: 'ProductSans-Regular'
};

export { screenWidth, screenHeight, colors, fonts };
