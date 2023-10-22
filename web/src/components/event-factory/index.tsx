import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { MAX_FILE_SIZE, RESERVE_PRICE, SALE_TYPE, STREAM_LABELS, checkFileType } from './data';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { cn, getBase64 } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCallback, useState } from 'react';
import { StepperNavProps } from '../StepperNav';
import { CreateEventArgs } from '@/types/create-event.type';
import { parseEther } from 'viem';

const eventFormSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	description: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	banner: typeof window === "undefined" // this is required if your app rendered in server side, otherwise just remove the ternary condition
		? z.undefined()
		: z.any()
			.refine((files) => files?.[0]?.size || 0 >= MAX_FILE_SIZE, `Max file size is 5MB.`)
			.refine(
				(files) => checkFileType(files),
				"Only .jpg, .jpeg, .png and .webp formats are supported."
			).optional(),
	labels: z.array(z.string()).refine((value) => value.some((label) => label), {
		message: "You have to select at least one label.",
	}),
	duration: z.coerce.number({ required_error: "Duration is required." }).positive({ message: "Duration must be a positive number" }),
	// .refine((value) => value < 15, {
	// 	message: "Duration must be less than 15",
	// })
	// .refine((value) => value >= 15 && value < 30, {
	// 	message: "Duration must be between 15 and 30",
	// })
	// .refine((value) => value >= 30 && value < 60, {
	// 	message: "Duration must be between 30 and 60",
	// })
	// .refine((value) => value >= 60 && value <= 120, {
	// 	message: "Duration must be between 60 and 120",
	// })
	date: z.date({
		required_error: "A date is required.",
	}),
	time: z.string().refine((value) => {
		// Regular expression to match the time format (HH:MM)
		const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
		return timeRegex.test(value);
	}, "Invalid time format"),
	type: z.enum(['tips', 'auction', 'quadratic'], {
		required_error: "You need to select a sale type.",
	}),
	reserve_price: z.enum(['20', '50', '100', 'custom']).optional(),
	custom_reserve_price: z.coerce.number().optional(),
	ticket_amount: z.coerce.number().optional(),
	no_cap: z.boolean().default(false).optional(),
	ticket_price: z.boolean().default(true).optional(),
	custom_ticket_price: z.coerce.number().optional(),
})

const CreateEvent = ({ onNextStep, onPreviousStep, currentStep }: StepperNavProps) => {
	const [bannerImage, setBannerImage] = useState<unknown | undefined>()
	const onBannerChange = useCallback(async (event: any) => {
		if (event.target.files?.[0]) {
			const base64 = await getBase64(event.target.files[0]);
			setBannerImage(base64);
		}
	}, []);
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: {
			title: "",
			description: "",
			banner: bannerImage,
			labels: [],
			duration: undefined,
			date: undefined,
			time: undefined,
			type: undefined,
			reserve_price: undefined,
			custom_reserve_price: undefined,
			ticket_amount: undefined,
			no_cap: undefined,
			ticket_price: true,
			custom_ticket_price: undefined,
		},
	})

	const onSubmit = (values: z.infer<typeof eventFormSchema>) => {
		console.log({ values });
		const event: CreateEventArgs = {
			startTimeDelta: new Date(values.date).getTime(),
			baseTip: values.reserve_price ? BigInt(parseEther(values.reserve_price.toString() || '0')) : values.custom_reserve_price ? BigInt(parseEther(values.custom_reserve_price.toString() || '0')) : BigInt(parseEther('0')),
			maxTickets: values.ticket_amount ? +values.ticket_amount : values.no_cap ? 1000 : 0,
			ticketPrice: values.ticket_price ? parseEther('0.01') : values.custom_ticket_price ? BigInt(parseEther(values.custom_ticket_price.toString() || '0')) : BigInt(parseEther('0')),
			curatorCut: values.reserve_price ? BigInt(parseEther(values.reserve_price.toString() || '0')) : values.custom_reserve_price ? BigInt(parseEther(values.custom_reserve_price.toString() || '0')) : BigInt(parseEther('0')),
			metadata: ''
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{currentStep === 1 && (
					<div className="w-full space-y-6">
						{/* Event Details */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input type='text' placeholder="My stream" {...field} />
									</FormControl>
									<FormDescription>
										This is the title of your stream.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input type='text' placeholder="I'm showing random cat facts. Come watch!" {...field} />
									</FormControl>
									<FormDescription>
										Tell us what your stream is about.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="banner"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Banner</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/jpeg, image/jpg, image/png, image/webp"
											{...field}
											onChange={(e) => {
												onBannerChange(e);
												const fileList = e.target?.files;
												const newFileList = fileList ? Array.from(fileList) : null;
												Object.defineProperty(e.target, "files", {
													value: newFileList,
													writable: true,
												});
											}}
										/>
									</FormControl>
									<FormDescription>Upload a banner for your stream.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="button" onClick={onNextStep}>Next</Button>
					</div>
				)}

				{currentStep === 2 && (
					<div className="w-full space-y-6">
						{/* Event Labels */}
						<FormField
							control={form.control}
							name="labels"
							render={() => (
								<FormItem className="flex flex-col items-start space-y-3 space-x-0 rounded-md p-4">
									<FormLabel>Add Labels</FormLabel>
									<FormDescription>
										Select the labels you wish to add to your stream.
									</FormDescription>
									<FormItem>
										{STREAM_LABELS.map((label) => (
											<FormField
												key={label.id}
												control={form.control}
												name="labels"
												render={({ field }) => {
													return (
														<FormItem
															key={label.id}
															className="flex flex-row items-start space-x-3 space-y-0"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(label.id)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([...field.value, label.id])
																			: field.onChange(
																				field.value?.filter(
																					(value) => value !== label.id
																				)
																			)
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal capitalize">
																{label.title}
															</FormLabel>
														</FormItem>
													)
												}}
											/>
										))}
									</FormItem>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-x-4">
							<Button type="button" onClick={onPreviousStep}>Previous</Button>
							<Button type="button" onClick={onNextStep}>Next</Button>
						</div>
					</div>
				)}

				{currentStep === 3 && (
					<div className="w-full space-y-6">
						{/* Event Date & Duration */}
						<FormField
							control={form.control}
							name="duration"
							render={() => (
								<FormItem>
									<FormLabel>Duration</FormLabel>
									<FormControl>
										<Input type='number' placeholder="Enter duration" {...form.register("duration")} />
									</FormControl>
									<FormDescription>
										Enter the duration of your stream.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date: any) =>
													date > new Date() || date < new Date("1900-01-01")
												}
												{...form.register("date")}
											/>
										</PopoverContent>
									</Popover>
									<FormDescription>
										Tell us when your stream will be held.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="time"
							render={() => (
								<FormItem>
									<FormLabel>Time</FormLabel>
									<FormControl>
										<Input type='time' placeholder="Enter time" {...form.register("time")} />
									</FormControl>
									<FormDescription>
										Enter the time of your stream.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-x-4">
							<Button type="button" onClick={onPreviousStep}>Previous</Button>
							<Button type="button" onClick={onNextStep}>Next</Button>
						</div>
					</div>
				)}

				{currentStep === 4 && (
					<div className="w-full space-y-6">
						{/* Sales & Tickets */}
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>Sale Type</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											{SALE_TYPE.map(({ id, title }) => (
												<FormItem key={id} className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value={id} />
													</FormControl>
													<FormLabel className="font-normal capitalize">
														{title}
													</FormLabel>
												</FormItem>
											)
											)}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-start gap-6">
							<FormField
								control={form.control}
								name="reserve_price"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>Reserve Price</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1"
											>
												{RESERVE_PRICE.map(({ id, title }) => (
													<FormItem key={id} className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value={id} />
														</FormControl>
														<FormLabel className="font-normal capitalize">
															{title}
														</FormLabel>
													</FormItem>
												)
												)}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="custom_reserve_price"
								render={() => (
									<FormItem>
										<FormLabel>Custom Matic</FormLabel>
										<FormControl>
											<Input className='w-14' type='number' placeholder="00" {...form.register("custom_reserve_price")} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex items-center gap-6">
							<FormField
								control={form.control}
								name="ticket_amount"
								render={() => (
									<FormItem>
										<FormLabel>Ticket Amount</FormLabel>
										<FormControl>
											<Input className='w-14' type='number' placeholder="00" {...form.register("ticket_amount")} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="no_cap"
								render={({ field }) => {
									return (
										<FormItem
											className="flex flex-row items-center space-x-3 space-y-0"
										>
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel className="font-normal">
												No Cap
											</FormLabel>
										</FormItem>
									)
								}}
							/>
						</div>
						<div className="flex items-center gap-6">
							<FormField
								control={form.control}
								name="custom_ticket_price"
								render={() => (
									<FormItem>
										<FormLabel>Ticket Price</FormLabel>
										<FormControl>
											<Input className='w-14' type='number' placeholder="00" {...form.register("custom_ticket_price")} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="ticket_price"
								render={({ field }) => {
									return (
										<FormItem className="flex flex-row items-center space-x-3 space-y-0">
											<FormControl>
												<Checkbox
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
											<FormLabel className="font-normal">
												Default
											</FormLabel>
										</FormItem>
									)
								}}
							/>
						</div>
						<div className="space-x-4">
							<Button type="button" onClick={onPreviousStep}>Previous</Button>
							<Button type="submit">Mint</Button>
						</div>
					</div>
				)}
			</form>
		</Form>
	);
};

export default CreateEvent;

