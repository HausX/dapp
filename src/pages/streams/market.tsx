import CreateEvent from "@/components/event-factory";
import { EventMarket } from "@/components/event-market";
import Layout from "@/components/Layout";
import { StepperNav } from "@/components/StepperNav";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function StreamMarket() {
	return <Layout>
		<div className="space-y-6 my-24 px-24 md:block w-full min-h-screen">
			<EventMarket />
		</div>
	</Layout>
}