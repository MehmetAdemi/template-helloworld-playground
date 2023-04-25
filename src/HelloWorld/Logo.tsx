import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Arc} from './Arc';
import {Atom} from './Atom';
import React, {} from 'react';

export const Logo: React.FC<{
	color1: string;
	color2: string;
}> = ({color1, color2}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const development = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const rotationDevelopment = spring({
		config: {
			damping: 100,
			mass: 0.5,
		},
		fps: videoConfig.fps,
		frame,
	});

	const scale = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	const logoRotation = interpolate(
		frame,
		[0, videoConfig.durationInFrames],
		[0, 360]
	);

	return (
		<AbsoluteFill
			style={{
				transform: `scale(${scale}) rotate(${logoRotation}deg)`,
			}}
		>
			<Arc
				rotateProgress={rotationDevelopment}
				progress={development}
				rotation={30}
				color1={color1}
				color2={color2}
			/>
			<Arc
				rotateProgress={rotationDevelopment}
				rotation={90}
				progress={development}
				color1={color1}
				color2={color2}
			/>
			<Arc
				rotateProgress={rotationDevelopment}
				rotation={-30}
				progress={development}
				color1={color1}
				color2={color2}
			/>
			<Atom scale={rotationDevelopment} color1={color1} color2={color2} />
		</AbsoluteFill>
	);
};
