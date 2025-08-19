import {AlertDialogConfig, useAlertDialog} from "~/contexts/AlertDialogContext";

export const useAlert = () => {
    const { openDialog } = useAlertDialog();

    return {
        success: (title: string, description: string, actionText?: string, onAction?: () => void) =>
            openDialog({ title, description, variant: 'success', actionText, onAction }),

        error: (title: string, description: string, actionText?: string, onAction?: () => void) =>
            openDialog({ title, description, variant: 'error', actionText, onAction }),

        warning: (title: string, description: string, actionText?: string, onAction?: () => void) =>
            openDialog({ title, description, variant: 'warning', actionText, onAction }),

        info: (title: string, description: string, actionText?: string, onAction?: () => void) =>
            openDialog({ title, description, variant: 'info', actionText, onAction }),

        custom: (config: AlertDialogConfig) => openDialog(config),
    };
};