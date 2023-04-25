import {Composition} from 'remotion';
import {HelloWorld, myCompSchema} from './HelloWorld';
import {Logo} from './HelloWorld/Logo';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				schema={myCompSchema}
				defaultProps={{
					textTitle: 'Remotion remotion remotion' as const,
					textColor: 'green' as const,
					Subtitle2: {
						textSubTitle: 'Hello' as const,
						textSubTitleColor: 'red' as const,
					},
					atomColor: '#c8b9df' as const,
					atomColor2: '#77609a' as const,
				}}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{color1: 'red', color2: 'blue'}}
			/>
		</>
	);
};
