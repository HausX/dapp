import CreateEvent from "@/components/event-factory";
import Layout from "@/components/Layout";
import { StepperNav } from "@/components/StepperNav";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const stepperFormItems = [
	{
		title: "Your Event",
		step: 1,
	},
	{
		title: "Labels",
		step: 2,
	},
	{
		title: "Event Format",
		step: 3,
	},
	{
		title: "Sales & Tickets",
		step: 4,
	},
]

export default function CreateStream() {
	const [step, setStep] = useState(1);
	const handleNextStep = () => {
		setStep(step + 1);
	};
	const handlePreviousStep = () => {
		setStep(step - 1);
	};
	return <Layout>
		<div className="hidden space-y-6 mt-24 px-24 md:block w-full min-h-screen">
			<div className="space-y-0.5">
				<h2 className="text-2xl font-bold tracking-tight">Event Factory</h2>
				<p className="text-muted-foreground">
					Manage your event settings and set event preferences.
				</p>
			</div>
			<Separator className="my-6" />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				<aside className="-mx-4 lg:w-1/5">
					<StepperNav items={stepperFormItems} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} setStep={setStep} currentStep={step} />
				</aside>
				<div className="flex-1 lg:max-w-2xl">
					<CreateEvent onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} currentStep={step} />
				</div>
			</div>
		</div>
	</Layout>
}