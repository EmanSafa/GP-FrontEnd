import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddAdmin } from "@/hooks/Admin/useAddAdmin";

// const addAdminSchema = z.object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     email: z.string().email("Invalid email address"),
//     phone: z.string().min(10, "Phone number must be at least 10 characters"),
//     password: z.string().min(6, "Password must be at least 6 characters"),
// });

type AddAdminValues = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

interface AddAdminDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddAdminDialog({ open, onOpenChange }: AddAdminDialogProps) {
    const { mutate, isPending } = useAddAdmin();

    const {
        register,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm<AddAdminValues>({

        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);

    const onSubmit = (data: AddAdminValues) => {
        mutate(data, {
            onSuccess: () => {
                onOpenChange(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Admin</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input {...register("name")} placeholder="John Doe" />
                            {/* {errors.name && <FieldError>{errors.name.message}</FieldError>} */}
                        </Field>
                        <Field>
                            <FieldLabel>Email</FieldLabel>
                            <Input {...register("email")} type="email" placeholder="john@example.com" />
                            {/* {errors.email && <FieldError>{errors.email.message}</FieldError>} */}
                        </Field>
                        <Field>
                            <FieldLabel>Phone</FieldLabel>
                            <Input {...register("phone")} placeholder="+1234567890" />
                            {/* {errors.phone && <FieldError>{errors.phone.message}</FieldError>} */}
                        </Field>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input {...register("password")} type="password" placeholder="******" />
                            {/* {errors.password && <FieldError>{errors.password.message}</FieldError>} */}
                        </Field>
                    </FieldGroup>
                    <div className="flex justify-end pt-4">
                        <Button type="submit" variant="auth" disabled={isPending}>
                            {isPending ? "Adding..." : "Add Admin"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
