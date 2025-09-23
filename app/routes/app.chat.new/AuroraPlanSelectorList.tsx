import {Info} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getAllAssistantBrainsOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {cn} from "~/lib/utils";

interface AuroraPlanSelectorListProps {
    selectedValue?: string;
    onValueChange?: (value: string) => void;
}

export default function AuroraPlanSelectorList({ selectedValue, onValueChange }: AuroraPlanSelectorListProps) {
    const {data, isLoading, isError, error} = useQuery({
        ...getAllAssistantBrainsOptions()
    })

    if (isLoading || data === undefined) return <div>Cargando cerebros...</div>
    if (isError) return <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex-1 flex items-center justify-center text-gray-500">Aun no existe ningun cerebro para el asistente!</div>

    const handleModelSelect = (modelId: string) => {
        onValueChange?.(modelId);
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="text-lg font-semibold">
                2. Haz click en el tipo de cerebro para tu asistente
            </div>

            <div className="flex flex-row items-center gap-x-1">
                <div className="text-sm text-muted-foreground">
                    <Info className="h-4"/>
                </div>

                <div className="text-sm text-muted-foreground">
                    El tipo de cerebro determina que tan inteligente y creativo es tu asistente, te damos varias opciones para que escojas el que mejor se alinea
                    con tu objetivo para esta conversacion.
                </div>
            </div>

            <div className="flex flex-row gap-5">
                {
                    data.map((model) => (
                        <div
                            key={model.id}
                            onClick={() => handleModelSelect(model.id)}
                            className={cn(
                                "p-5 bg-sidebar border-sidebar rounded-lg shadow-md flex flex-col gap-5 max-w-[350px] cursor-pointer transition-all hover:shadow-lg",
                                selectedValue === model.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:bg-sidebar/80"
                            )}
                        >
                            <div className="font-semibold text-md">
                                {model.display_name}
                            </div>
                            <div className="text-sm">
                                {model.description}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}