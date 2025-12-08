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
import { Textarea } from "@/components/ui/textarea";
import type { Category, CategoryFormData } from "@/types/types";

interface CategoryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
    onSubmit: (data: CategoryFormData) => void;
    isPending: boolean;
}

const CategoryDialog = ({ open, onOpenChange, category, onSubmit, isPending }: CategoryDialogProps) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const imageFile = formData.get("cat_image") as File;

        let cat_image: string | File = imageFile;
        if (category && imageFile.size === 0) {
            // If editing and no new image, keep existing (logic depends on how backend handles it, 
            // usually we send nothing or the url string if the backend supports it, 
            // but the type says string | File. Let's assume File if new, else string URL or empty if not required)
            cat_image = category.cat_image || "";
        }

        const data: CategoryFormData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            cat_image: cat_image as File,
        };

        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
                        <DialogDescription>
                            {category ? "Update the category details below." : "Fill in the details to create a new category."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Category Name *</Label>
                            <Input id="name" name="name" defaultValue={category?.name} required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea id="description" name="description" defaultValue={category?.description} required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="cat_image">Category Image * {category && "(Leave empty to keep existing)"}</Label>
                            <Input id="cat_image" name="cat_image" type="file" accept="image/*" required={!category} />
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="auth" disabled={isPending}>
                            {isPending ? (category ? "Updating..." : "Creating...") : (category ? "Save Changes" : "Create Category")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryDialog;
