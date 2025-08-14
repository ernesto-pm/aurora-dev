import {useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getAllAssistantTemplatesOptions, getAllAssistantTemplatesQueryKey,
    getAllMemoryBlocksForAssistantTemplatesOptions,
    getAllMemoryBlocksForAssistantTemplatesQueryKey,
    getAllMemoryBlockTemplatesOptions
} from "~/services/aurora/@tanstack/react-query.gen";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import {
    associateAssistantWithMemoryBlock,
    AuroraLettaIntegrationAssistantTemplate,
    AuroraLettaIntegrationMemoryBlockTemplate, deleteAssistantTemplate,
} from "~/services/aurora";
import {Button} from "~/components/ui/button";
import {useState} from "react";


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
    if (!assistantsTemplatesData || !memoryBlocksTemplates) return <div>No data was available from server!!</div>

    return (
        <div className="w-full p-5">

            <div className="text-lg font-semibold mb-5">
                Associate assistant template with memory blocks
            </div>


            <div className="flex flex-row space-x-2">
                {
                    assistantsTemplatesData.map(
                        (assistant) => (
                            <AssistantCard
                                assistant={assistant}
                                memoryBlocks={memoryBlocksTemplates}
                                key={assistant.id}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

interface AssistantCardProptypes {
    assistant: AuroraLettaIntegrationAssistantTemplate
    memoryBlocks: AuroraLettaIntegrationMemoryBlockTemplate[]
}

function AssistantCard(props: AssistantCardProptypes) {
    const queryClient = useQueryClient()
    const {label, model_name} = props.assistant
    const [selectedMemoryBlock, setSelectedMemoryBlock] = useState<AuroraLettaIntegrationMemoryBlockTemplate | null>(null)
    const [selectedMemoryBlockId, setSelectedMemoryBlockId] = useState<string>("")
    const {isLoading, isError, error, data} = useQuery({
        ...getAllMemoryBlocksForAssistantTemplatesOptions({
            body: {
                assistantId: props.assistant.id
            }
        })
    })

    function onSelectMemoryBlock(blockId: string) {
        setSelectedMemoryBlockId(blockId)
        const selectedMemoryBlock = props.memoryBlocks.filter(block => block.id === blockId)[0]
        if (selectedMemoryBlock) {
            setSelectedMemoryBlock(selectedMemoryBlock)
        }
    }

    async function addMemoryBlockAssociation() {
        const response = await associateAssistantWithMemoryBlock({body: {
            assistantId: props.assistant.id,
                memoryBlockId: selectedMemoryBlockId
        }, throwOnError: true})

        if (response.data) {
            await queryClient.invalidateQueries({
                queryKey: getAllMemoryBlocksForAssistantTemplatesQueryKey({body: {
                    assistantId: props.assistant.id
                }})
            })
        }
    }

    async function deleteAssistant() {
        await deleteAssistantTemplate({
            body: {
                assistantId: props.assistant.id
            }
        })

        await queryClient.invalidateQueries({
            queryKey: getAllAssistantTemplatesQueryKey()
        })
    }


    if (isLoading) return <div>Loading, please wait...</div>
    if (isError) return <div>{error.message}</div>
    if (!data) return <div>No data returned from server</div>


    return (
        <div className="p-3 bg-zinc-200 max-w-[450px] rounded-lg">

            <div className="font-semibold text-center mb-2">
                {label}
            </div>

            <div className="text-sm flex flex-col">
                <div>
                    <span className="font-semibold">Model Name:</span> {model_name}
                </div>
                <div>
                    <span className="font-semibold">Created At:</span> {props.assistant.created_at}
                </div>
                <div>
                    <span className="font-semibold">Id:</span> {props.assistant.id}
                </div>
                <div>
                    <span className="font-semibold">System Prompt:</span> {props.assistant.system_prompt}
                </div>
            </div>

            <div className="my-2 text-sm">
                <div className="font-semibold">
                    Associated blocks:
                </div>
                <div className="p-2">
                    {
                        data.map(
                            block => (<div key={block.id}>{block.label}</div>)
                        )
                    }
                </div>
            </div>

            <div className="my-2 text-sm">
                <div className="font-semibold mb-2">
                    Associate new blocks:
                </div>

                <div className="px-2 flex flex-row space-x-2">
                    <Select onValueChange={onSelectMemoryBlock} value={selectedMemoryBlockId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a memory block" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                props.memoryBlocks.map(
                                    (block) => (
                                        <SelectItem value={block.id} key={block.id}>{block.label}</SelectItem>
                                    )
                                )
                            }
                        </SelectContent>
                    </Select>

                    <Button
                        onClick={addMemoryBlockAssociation}
                        disabled={!selectedMemoryBlockId}
                    >
                        Associate
                    </Button>
                </div>

                {
                    selectedMemoryBlock
                    &&
                    <div className="mt-2 px-2 flex flex-col text-sm">
                        <div>
                            <span className="font-semibold">Id:</span> {selectedMemoryBlock.id}
                        </div>
                        <div>
                            <span className="font-semibold">Label:</span> {selectedMemoryBlock.label}
                        </div>
                        <div>
                            <span className="font-semibold">Description:</span> {selectedMemoryBlock.description}
                        </div>
                    </div>
                }

            </div>

            <div>
                <Button variant="destructive" onClick={deleteAssistant}>
                    Delete
                </Button>
            </div>
        </div>
    )
}