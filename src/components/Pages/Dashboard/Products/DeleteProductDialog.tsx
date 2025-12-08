import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


interface DeleteProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isPending: boolean;
    count?: number;
}

const DeleteProductDialog = ({ open, onOpenChange, onConfirm, isPending, count = 1 }: DeleteProductDialogProps) => {

    const isMultiple = count > 1;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {isMultiple ? "Products" : "Product"}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {isMultiple ? `these ${count} products` : "this product"}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-5">
                    <DialogClose asChild>
                        <Button variant="outline" type="button" disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteProductDialog;
