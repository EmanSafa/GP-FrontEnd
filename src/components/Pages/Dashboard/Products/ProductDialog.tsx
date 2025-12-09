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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Product, productsFormData } from "@/types/types";
import { useGetAllCategories } from "@/hooks/useCategories";
import { useGetAllBrands } from "@/hooks/useBrands";
import { useState, useEffect } from "react";

interface ProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: Product | null;
    onSubmit: (data: productsFormData) => void;
    isPending: boolean;
}

const ProductDialog = ({ open, onOpenChange, product, onSubmit, isPending }: ProductDialogProps) => {
    const { data: categories } = useGetAllCategories();
    const { data: brands } = useGetAllBrands();

    // State to track selected values for controlled components 
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");

    // Initialize state when product changes or dialog opens
    useEffect(() => {
        if (open) {
            if (product) {
                // Ensure we handle potential string/number types safely
                setSelectedCategory(product.category_id ? product.category_id.toString() : "");
                setSelectedBrand(product.brand_id ? product.brand_id.toString() : "");
            } else {
                setSelectedCategory("");
                setSelectedBrand("");
            }
        }
    }, [open, product]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const mainImageFile = formData.get("main_image") as File;
        const additionalImageFiles = formData.getAll("additional_images") as File[];

        let main_image: string | File = mainImageFile;
        if (product && mainImageFile.size === 0) {
            main_image = product.main_image_url || product.main_image || "";
        }

        const additional_images: (string | File)[] = [];
        if (additionalImageFiles.length > 0) {
            additionalImageFiles.forEach(f => {
                if (f.size > 0) {
                    additional_images.push(f);
                }
            });
        }

        const data: productsFormData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
            category_id: Number(selectedCategory), // Use state value
            brand_id: Number(selectedBrand),       // Use state value
            main_image: main_image,
            additional_images: additional_images.length > 0 ? additional_images : undefined,
            specifications: formData.get("specifications") as string,
        };

        onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
                        <DialogDescription>
                            {product ? "Update the product details below." : "Fill in the details to create a new product."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 mt-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Product Name *</Label>
                                <Input id="name" name="name" defaultValue={product?.name} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="price">Price *</Label>
                                <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price} required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={product?.description} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="stock">Stock *</Label>
                                <Input id="stock" name="stock" type="number" defaultValue={product?.stock} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="specifications">Specifications (JSON)</Label>
                                <Input id="specifications" name="specifications" defaultValue={product?.specifications} placeholder='{"key": "value"}' />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category_id">Category *</Label>
                                {/* Hidden input to ensure value might be relevant for some validators, but we use state in handleSubmit */}
                                <input type="hidden" name="category_id" value={selectedCategory} />
                                <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="brand_id">Brand *</Label>
                                <input type="hidden" name="brand_id" value={selectedBrand} />
                                <Select value={selectedBrand} onValueChange={setSelectedBrand} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Brand" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {brands?.map((brand) => (
                                            <SelectItem key={brand.id} value={brand.id.toString()}>
                                                {brand.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="main_image">Main Image * {product && "(Leave empty to keep existing)"}</Label>
                            <Input id="main_image" name="main_image" type="file" accept="image/*" required={!product} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="additional_images">Additional Images</Label>
                            <Input id="additional_images" name="additional_images" type="file" multiple accept="image/*" />
                        </div>
                    </div>

                    <DialogFooter className="mt-8">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" variant="auth" disabled={isPending}>
                            {isPending ? (product ? "Updating..." : "Creating...") : (product ? "Save Changes" : "Create Product")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDialog;
