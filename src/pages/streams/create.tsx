import CreateEvent from "@/components/create/CreateEvent";
import Layout from "@/components/Layout";

export default function CreateStream() {
	return <Layout>
		<main
			className={`w-full min-h-screen flex-col items-center justify-between mt-24 px-24`}
		>
			<CreateEvent />
		</main>
	</Layout>
}