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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Order, OrderFormData } from "@/types/types";
import { useState, useEffect } from "react";

interface OrderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    order: Order | null;
    onSubmit: (data: OrderFormData) => void;
    isPending: boolean;
}

const OrderDialog = ({ open, onOpenChange, order, onSubmit, isPending }: OrderDialogProps) => {
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        if (order) {
            setStatus(order.status);
        }
    }, [order]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data: OrderFormData = {
            status: status as "pending" | "shipped" | "delivered" | "cancelled" | "processing",
        };

        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Update Order Status</DialogTitle>
                        <DialogDescription>
                            Change the status of order #{order?.order_number}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-5">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Order Status</Label>
                            <Select
                                value={status}
                                onValueChange={setStatus}
                                disabled={isPending}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="auth" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Status"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDialog;
