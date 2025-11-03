import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const ShippingInfoEditDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Shipping Information</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address-qP4z17X">Street address</Label>
            <Input
              id="address-qP4z17X"
              placeholder="5 Saied Street, Farouk Street , Floor 4"
              value={"5 Saied Street, Farouk Street , Floor 4"}
              className="mt-2"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city-sT5y91B">City</Label>
              <Input
                id="city-sT5y91B"
                value={"Zagazig"}
                className="mt-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state-wX3k85M">Governorate</Label>
              <Input
                id="state-wX3k85M"
                placeholder="NY"
                value={"El Sharqia"}
                className="mt-2"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="zipCode-vZ9q46N">ZIP code</Label>
              <Input
                id="zipCode-vZ9q46N"
                placeholder="10001"
                value={"171717"}
                className="mt-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-bH7l52P">Country</Label>
              <Select value={"egypt"}>
                <SelectTrigger id="country-bH7l52P" className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

export default ShippingInfoEditDialog;
