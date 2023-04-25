import {spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Logo} from './HelloWorld/Logo';
import {myCompSchema2, Subtitle,} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import { z, zColor } from 'remotion';

export const myCompSchema = z.object({
  textTitle: z.string(),
  textColor: z.string(),
	Subtitle2: myCompSchema2,
	atomColor: zColor(),
	atomColor2: zColor()
});

export const HelloWorld: React.FC<z.infer<typeof myCompSchema>> = ({textTitle: propOne, textColor: propTwo, Subtitle2, atomColor, atomColor2}) => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	// Animate from 0 to 1 after 25 frames
	const logoTranslationProgress = spring({
		frame: frame - 25,
		fps,
		config: {
			damping: 100,
		},
	});

	// Move the logo up by 150 pixels once the transition starts
	const logoTranslation = interpolate(
		logoTranslationProgress,
		[0, 1],
		[0, -150]
	);

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill style={{opacity}}>
				<AbsoluteFill style={{transform: `translateY(${logoTranslation}px)`}}>
					<Logo color1={atomColor} color2={atomColor2}/>
				</AbsoluteFill>
				{/* Sequences can shift the time for its children! */}
				<Sequence from={35}>
					<Title titleText={propOne} titleColor={propTwo} />
				</Sequence>
				{/* The subtitle will only enter on the 75th frame. */}
				<Sequence from={75}>
					<Subtitle textSubTitle={Subtitle2.textSubTitle} textSubTitleColor={Subtitle2.textSubTitleColor}/>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
