import Skeleton from '@mui/material/Skeleton'
import makeBlockie from 'ethereum-blockies-base64'
import type { CSSProperties, ReactElement } from 'react'
import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'

export interface IdenticonProps {
	classNames: string;
	username: string;
}

const Identicon = ({ classNames, username }: IdenticonProps): ReactElement => (
	<Avatar className={cn(classNames)}>
		<AvatarImage src={makeBlockie(username)} alt={username} />
		<AvatarFallback>{username}</AvatarFallback>
	</Avatar>
)

export default Identicon