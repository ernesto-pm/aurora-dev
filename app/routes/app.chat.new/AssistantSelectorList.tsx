import {useQuery} from "@tanstack/react-query";
import {getAllAssistantsOptions} from "~/services/aurora/@tanstack/react-query.gen";
import {Info} from "lucide-react";
import {cn} from "~/lib/utils";

interface AssistantSelectorListProps {
    selectedValue?: string;
    onValueChange?: (value: string) => void;
}

export default function AssistantSelectorList({ selectedValue, onValueChange }: AssistantSelectorListProps) {
    const {data, isLoading, isError, error} = useQuery({
        ...getAllAssistantsOptions()
    })

    if (isLoading || data === undefined) return <div>Cargando asistentes...</div>
    if (isError) return <div className="flex-1 flex items-center justify-center text-red-500">{error.message}</div>
    if (!data || data.length === 0) return <div className="flex-1 flex items-center justify-center text-gray-500">Aun no existe ningun asistente con el que puedas platicar!</div>

    const handleAssistantSelect = (assistantId: string) => {
        onValueChange?.(assistantId);
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="text-lg font-semibold">
                1. Haz click en el asistente que deseas utilizar
            </div>

            <div className="flex flex-row items-center gap-x-1">
                <div className="text-sm text-muted-foreground">
                    <Info className="h-4"/>
                </div>

                <div className="text-muted-foreground text-xs md:text-sm">
                    El tipo de asistente que selecciones determina las capacidades que tiene el asistente. Por ejemplo: un asistente de negocios es mejor proporcionado
                    guianza general de tu negocio mientras que el asistente de marketing es mas creativo para crear ofertas de negocio, etc.
                </div>
            </div>

            <div className="flex flex-row gap-5 flex-wrap">
                {
                    data.map((assistant) => (
                        <div
                            key={assistant.id}
                            onClick={() => handleAssistantSelect(assistant.id)}
                            className={cn(
                                "p-5 bg-sidebar border-sidebar rounded-lg shadow-md flex flex-col gap-5 max-w-[350px] cursor-pointer transition-all hover:shadow-lg",
                                selectedValue === assistant.id
                                    ? "ring-2 ring-primary bg-primary/5"
                                    : "hover:bg-sidebar/80"
                            )}
                        >
                            <div className="font-semibold text-md">
                                {assistant.assistant_name}
                            </div>
                            <div className="text-sm">
                                {assistant.assistant_description}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}