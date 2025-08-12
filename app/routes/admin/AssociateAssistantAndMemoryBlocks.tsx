import {useQuery} from "@tanstack/react-query";
import {
    getAllAssistantTemplatesOptions,
    getAllMemoryBlockTemplatesOptions
} from "~/services/aurora/@tanstack/react-query.gen";


export default function AssociateAssistantAndMemoryBlocks() {
    const {
        isLoading: assistantsTemplatesLoading,
        data: assistantsTemplatesData,
        isError: assistantsTemplatesIsError
    } = useQuery({
        ...getAllAssistantTemplatesOptions({throwOnError: true})
    })
    const {
        isLoading: memoryBlocksTemplatesLoading,
        data: memoryBlocksTemplates,
        isError: memoryBlocksTemplatesIsError
    } = useQuery({
        ...getAllMemoryBlockTemplatesOptions({throwOnError: true})
    })

    if (assistantsTemplatesLoading || memoryBlocksTemplatesLoading) return <div>Loading data...</div>
    if (assistantsTemplatesIsError || memoryBlocksTemplatesIsError) return <div>Error while getting the data...</div>


    return (
        <div className="w-full p-5">

            <div className="text-lg font-semibold mb-5">
                Associate assistant template with memory blocks
            </div>


            <div className="flex flex-row">
                {
                    assistantsTemplatesData?.map(
                        (assistant) => (
                            <div key={assistant.id} className="p-3 bg-gray-500">
                                {assistant.label}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}