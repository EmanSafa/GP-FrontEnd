import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Trash2 } from "lucide-react";
import { useUpdateUserProfilePic, useDeleteUserProfilePic, useGetUserProfilePic } from "@/hooks/useAccount";
import { useAuthStore } from "@/store/authStore";

interface ProfilePictureDialogProps {
    children: React.ReactNode;
    currentImage?: string;
    userName?: string;
}

export const ProfilePictureDialog = ({ children, currentImage, userName }: ProfilePictureDialogProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuthStore();
    const userId = user ? Number(user.id) : 0;

    const { data: userDataForPic } = useGetUserProfilePic(userId);
    const { mutate: updatePhoto, isPending: isUpdating } = useUpdateUserProfilePic();
    const { mutate: deletePhoto, isPending: isDeleting } = useDeleteUserProfilePic();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && userId && userId !== 0) {
            updatePhoto({ userId, photo: file }, {
                onSuccess: () => setIsOpen(false)
            });
        }
    };

    const handleDelete = () => {
        if (userId && userId !== 0) {
            deletePhoto({ userId }, {
                onSuccess: () => setIsOpen(false)
            });
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-white text-black border-none p-0 overflow-hidden flex flex-col h-[500px]">
                <DialogHeader className="p-4 flex flex-row justify-between items-center">
                    <DialogTitle className="text-lg font-normal">Profile photo</DialogTitle>
                </DialogHeader>

                <div className="flex-1 flex items-center justify-center bg-white relative">
                    <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                        {/* Fallback to initials if no image */}
                        {userDataForPic?.has_photo ? (
                            <img
                                src={userDataForPic.photo_url}
                                alt={userDataForPic.filename}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-700 flex items-center justify-center text-6xl font-bold text-slate-400">
                                {userName?.charAt(0) || "U"}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-4 border-t border-gray-700">
                    <div className="flex justify-between items-center max-w-xl mx-auto px-4">
                        <Button
                            variant="ghost"
                            className="flex flex-col items-center gap-2 hover:bg-white/10 text-black h-auto py-2"
                            onClick={triggerFileInput}
                            disabled={isUpdating}
                        >
                            <Camera className="w-5 h-5" />
                            <span className="text-xs">Update photo</span>
                        </Button>

                        <Button
                            variant="ghost"
                            className="flex flex-col items-center gap-2 hover:bg-white/10 text-black h-auto py-2 hover:text-red-400"
                            onClick={handleDelete}
                            disabled={isDeleting || !currentImage}
                        >
                            <Trash2 className="w-5 h-5" />
                            <span className="text-xs">Delete</span>
                        </Button>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </DialogContent>
        </Dialog>
    );
};
