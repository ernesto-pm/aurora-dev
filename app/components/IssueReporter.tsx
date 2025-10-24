import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import {Button} from "~/components/ui/button";
import {Megaphone} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";

export default function IssueReporter() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <Megaphone/> Ayúdanos a mejorar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ayúdanos a mejorar
                    </DialogTitle>
                    <DialogDescription className="pt-2">
                        <IssueReporterContent/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function IssueReporterContent() {
    return (
        <Tabs defaultValue="problem">
            <TabsList>
                <TabsTrigger value="problem">Reporta un problema</TabsTrigger>
                <TabsTrigger value="feedback">Déjanos un comentario</TabsTrigger>
            </TabsList>
            <TabsContent value="problem">
                Reporta un problema con la aplicacion
            </TabsContent>
            <TabsContent value="feedback">
                Dejanos algun comentario sobre Aurora.
            </TabsContent>
        </Tabs>
    )
}
