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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Brand, BrandFormData } from "@/types/types";

interface BrandDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    brand?: Brand | null;
    onSubmit: (data: BrandFormData) => void;
    isPending: boolean;
}

const BrandDialog = ({ open, onOpenChange, brand, onSubmit, isPending }: BrandDialogProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const imageFile = formData.get("logo") as File;

        let logo: string | File = imageFile;
        if (brand && imageFile.size === 0) {
            logo = brand.logo || "";
        }

        const data: BrandFormData = {
            name: formData.get("name") as string,
            logo: logo as File,
        };

        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{brand ? "Edit Brand" : "Add New Brand"}</DialogTitle>
                        <DialogDescription>
                            {brand ? "Update the brand details below." : "Fill in the details to create a new brand."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Brand Name *</Label>
                            <Input id="name" name="name" defaultValue={brand?.name} required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="logo">Brand Logo * {brand && "(Leave empty to keep existing)"}</Label>
                            <Input id="logo" name="logo" type="file" accept="image/*" required={!brand} />
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="auth" disabled={isPending}>
                            {isPending ? (brand ? "Updating..." : "Creating...") : (brand ? "Save Changes" : "Create Brand")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BrandDialog;
