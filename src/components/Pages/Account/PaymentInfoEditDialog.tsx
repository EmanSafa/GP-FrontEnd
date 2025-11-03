import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentInfoEditDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Payment Information</DialogTitle>
          <DialogDescription>
            Make changes to your payment information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="cardName">Name on Card</Label>
            <Input id="cardName" value="Mirna Abdelrahman" />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input id="cardNumber" value="**********" />
          </div>
          <div>
            <Label htmlFor="expiryDate">Valid Through</Label>
            <Input id="expiryDate" value="12/4" />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" value="123" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button type="submit" variant={"auth"}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentInfoEditDialog;
