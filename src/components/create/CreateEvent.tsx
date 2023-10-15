import { useState } from 'react';
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
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from '../ui/button';
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, STREAM_LABELS } from './data';
import { Checkbox } from '../ui/checkbox';

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	description: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	banner: z
		.any()
		.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
		.refine(
			(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
			"Only .jpg, .jpeg, .png and .webp formats are supported."
		),
	labels: z.array(z.string()).refine((value) => value.some((label) => label), {
		message: "You have to select at least one label.",
	}),
})

const CreateEvent = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			banner: "",
			labels: ['visual art']
		},
	})
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [step, setStep] = useState(1);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log({ values });
	};

	const handleNextStep = () => {
		setStep(step + 1);
	};
	const handlePreviousStep = () => {
		setStep(step - 1);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="container">
				{step === 1 && (
					<div className="w-2/3 space-y-6">
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
									<FormLabel>Cover Image</FormLabel>
									<FormControl>
										<Input type='file' placeholder="This my banner" {...field} />
									</FormControl>
									<FormDescription>
										Upload a banner for your stream.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="button" onClick={handleNextStep}>Next</Button>
					</div>
				)}

				{step === 2 && (
					<div className="w-2/3 space-y-6">
						{/* Event Labels */}
						<FormField
							control={form.control}
							name="labels"
							render={() => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormLabel>Add Labels</FormLabel>
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
															<FormLabel className="font-normal">
																{label.title}
															</FormLabel>
														</FormItem>
													)
												}}
											/>
										))}
									</FormItem>
									<FormDescription>
										Select the labels you wish to add to your stream.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="space-x-4">
							<Button type="button" onClick={handlePreviousStep}>Previous</Button>
							<Button type="submit">Submit</Button>
						</div>
					</div>
				)}
			</form>
		</Form >
	);
};

export default CreateEvent;

