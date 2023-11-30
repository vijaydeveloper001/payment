import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors, screenHeight, screenWidth } from './styles';

const Loader = (loading) => {
	return (
		<>
			{loading ? (
				<View
					style={{
						height: screenHeight,
						width: screenWidth,
						position: 'absolute',
						zIndex: 1000,
						alignItems: 'center',
						justifyContent: 'center',
						
					}}
				>
					<View
						style={{
							backgroundColor: colors.chatGrey,
							padding: 10,
							borderRadius: 10
						}}
					>
						<ActivityIndicator color={colors.primary} size={'large'} />
					</View>
				</View>
			) :null}
		</>
	);
};

export default Loader;
