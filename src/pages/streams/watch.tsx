"use client"

import React, { useState, useMemo } from 'react';
import { Player, useCreateStream } from '@livepeer/react';
import { DemoBroadcast } from './broadcast';

interface LiveStreamProps {
	streamUrl: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ streamUrl }) => {
	const [streamName, setStreamName] = useState<string>('');
	const [view, setView] = useState<string>('');
	const {
		mutate: createStream,
		data: stream,
		status,
	} = useCreateStream(streamName ? { name: streamName } : null);

	const isLoading = useMemo(() => status === 'loading', [status]);

	console.log('stream', stream)

	return (
		<div>
			<div style={{ marginBottom: '1em', width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
				<button onClick={() => setView('watch')} style={{ border: '2px solid white', backgroundColor: '#30303000', padding: '1em', marginRight: '1em' }}>
					Watch
				</button>
				<button onClick={() => setView('create')} style={{ border: '2px solid white', backgroundColor: '#30303000', padding: '1em' }}>
					Create
				</button>
			</div>
			{
				view === 'create' && (

					<div style={{ marginBottom: '1em', width: '100%', display: 'flex', alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
						<input
							style={{ marginBottom: '1em', width: '10%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}
							type="text"
							placeholder="Stream name"
							onChange={(e) => setStreamName(e.target.value)}
						/>

						<div>
							{!stream && (
								<button
									onClick={() => {
										createStream?.()
									}}
									disabled={isLoading || !createStream}
									style={{ border: '2px solid white', backgroundColor: '#30303000', padding: '1em' }}
								>
									Create Stream
								</button>
							)}
							<DemoBroadcast streamKey={
								stream?.streamKey || ''
							} />
						</div>
						{/* <Player
              title={stream?.name}
              playbackId={stream?.playbackId || ''}
              autoPlay
              muted
            /> */}
					</div>
				)
			}
			{
				view === 'watch' && (
					<DemoBroadcast streamKey={
						stream?.streamKey || ''
					} />
				)
			}

		</div>
	);
};

export default LiveStream;