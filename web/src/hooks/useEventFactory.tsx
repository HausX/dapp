import { useToast } from "@/components/ui/use-toast";
import { ContractAddress } from "@/enums/contract-address.enum";
import { CreateEventArgs } from "@/types/create-event.type";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi";
import eventFactoryABI from '@/contracts/eventFactory.json'
import { useDebounce } from 'usehooks-ts'

const useEventFactory = (event: CreateEventArgs) => {
	const { toast } = useToast();
	const debouncedValue = useDebounce(event, 500);
	const { config } = usePrepareContractWrite({
		address: ContractAddress.EventFactory || '',
		abi: eventFactoryABI,
		functionName: 'createEvent',
		enabled: Boolean(debouncedValue),
		args: [debouncedValue],
		onSuccess(data: any): any {
			return data;
		},
		onError(error: any): any {
			return error;
		},
	});

	const { write: createEvent, data: eventData } = useContractWrite({
		...config,
		request: config.request,
		onSuccess() {
			toast({
				title: 'Transaction pending...',
			});
		},
		onError(error: any) {
			console.log(error);
			toast({
				title: 'Error... transaction reverted...',
				variant: 'destructive',
			});
		},
	});

	const { status: eventStatus } = useWaitForTransaction({
		hash: eventData?.hash,
		onSuccess: () => {
			toast({
				title: `Success! Your event has been created!`,
			});
		},
	});

	return { createEvent, eventData, eventStatus }
};

export default useEventFactory
