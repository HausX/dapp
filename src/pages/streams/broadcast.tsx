"use client"

import { Broadcast, MediaControllerCallbackState } from '@livepeer/react';
import { useCallback, useState } from 'react';

const broadcastSelector = ({ muted }: MediaControllerCallbackState) => ({
  muted,
});

interface BroadcastProps {
  streamKey: string;
}

export const DemoBroadcast: React.FC<BroadcastProps> = ({ streamKey })  => {
  const [muted, setMuted] = useState(false);
  console.log('stream key', streamKey)
  const onPlaybackStatusUpdate = useCallback(
    (slice: ReturnType<typeof broadcastSelector>) => {
      setMuted(slice.muted);
    },
    [],
  );

  return (
    <Broadcast
      streamKey={streamKey}
      playbackStatusSelector={broadcastSelector}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      theme={{
        radii: { containerBorderRadius: '10px' },
      }}
    />
  );
};
