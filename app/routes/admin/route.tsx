import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import CreateLettaMemoryBlockTemplate from "~/routes/admin/CreateLettaMemoryBlockTemplate";
import CreateLettaAssistantTemplate from "./CreateLettaAssistantTemplate";
import AssociateAssistantAndMemoryBlocks from "~/routes/admin/AssociateAssistantAndMemoryBlocks";

export default function Admin() {
    return (
        <div className="w-full">
            <Tabs defaultValue="create-memory-block-template">

                <TabsList>
                    <TabsTrigger value="create-memory-block-template">
                        Create Letta Memory Block Template
                    </TabsTrigger>

                    <TabsTrigger value="create-assistant-template">
                        Create Assistant Template
                    </TabsTrigger>

                    <TabsTrigger value="associate-assistant-and-memory-blocks">
                        Associate Assistant & Memory Blocks
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="create-memory-block-template">
                    <CreateLettaMemoryBlockTemplate/>
                </TabsContent>

                <TabsContent value="create-assistant-template">
                    <CreateLettaAssistantTemplate/>
                </TabsContent>

                <TabsContent value="associate-assistant-and-memory-blocks">
                    <AssociateAssistantAndMemoryBlocks/>
                </TabsContent>
            </Tabs>
        </div>
    )
}