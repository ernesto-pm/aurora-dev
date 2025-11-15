import {getAllBaskets} from "~/services/aurora";
import {useLoaderData, useNavigate} from "@remix-run/react";
import {Button} from "~/components/ui/button";

export async function loader() {
    const {data} = await getAllBaskets({throwOnError: true})

    if (!data) {
        throw new Error("No data was returned")
    }

    return {
        baskets: data
    }
}

export default function MACanastasIndex() {
    const {baskets} = useLoaderData<typeof loader>()
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-5 p-10">
            <div className="text-2xl font-semibold">
                Canastas registradas
            </div>
            <div className="flex flex-row gap-5">
                {baskets.map((basket) => (
                    <div key={basket.id} className="p-5 border-2 border-black/30 rounded-lg flex flex-col gap-5 w-[200px]">
                        <div className="text-center">
                            {basket.name}
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={() => {navigate(`/app/ma-editar-canasta/${basket.id}`)}}>
                                Editar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}