import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import { FONT_FAMILY} from './constants';
import { z } from 'remotion';

export const myCompSchema2 = z.object({
	textSubTitle: z.string(),
	textSubTitleColor: z.string(),
});

const subtitle: React.CSSProperties = {
	fontFamily: FONT_FAMILY,
	fontSize: 40,
	textAlign: 'center',
	position: 'absolute',
	bottom: 140,
	width: '100%',
};

export const Subtitle: React.FC<z.infer<typeof myCompSchema2>> = ({textSubTitle: propThree, textSubTitleColor: propFour}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 30], [0, 1]);
	return (
		<div style={{...subtitle, opacity, color: propFour}}>
			{propThree}
		</div>
	);
};
