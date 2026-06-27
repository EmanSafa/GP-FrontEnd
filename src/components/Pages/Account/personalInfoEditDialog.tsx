import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon, Pencil } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/api/authApi';
import { useUpdateUserProfile, useGetUserProfile } from '@/hooks/useAccount';
import { BugHighlighter } from '@/components/BugScanner/BugHighlighter';
import { useVersionStore } from '@/store/versionStore';

const PersonalInfoEditDialog = () => {
  const { mutate: updateProfile, isPending: updateProfilePending } = useUpdateUserProfile();
  const { user } = useAuthStore();
  const { data: fetchedUser } = useGetUserProfile(Number(user?.id) || 0, { enabled: !!user });
  const activeVersion = useVersionStore((state) => state.activeVersion);

  const userData = fetchedUser ||
    user || {
      name: 'Guest User',
      phone: 'N/A',
      address: 'customer',
      email: 'N/A',
    };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { mutate: updatePassword, isPending: updatePasswordPending } = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Password updated successfully');
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      setShowChangePass(false);
    },
    onError: (error: Error) => {
      const errMsg = error.message || 'Failed to update password. Please try again.';
      toast.error(errMsg);
      setPasswordError(errMsg);
    },
  });
  const handlePassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setPasswordError('');
  };
  const handleConfirmPassInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };
  const handleUpdatePassword = () => {
    if (activeVersion === 'v2' && !currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }

    if (!newPassword || !confirmPassword) {
      setPasswordError('Please fill in both password fields');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    updatePassword({
      email: userData?.email,
      new_password: newPassword,
      ...(activeVersion === 'v2' ? { current_password: currentPassword } : {}),
    });
  };

  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get('username') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    updateProfile(
      {
        userId: user.id,
        data: {
          name,
          phone,
          address,
        },
      },
      {
        onSuccess: () => {
          closeRef.current?.click();
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Personal Information</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue={userData?.name} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" defaultValue={userData?.phone || ''} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" defaultValue={userData?.address || ''} />
            </div>
            <BugHighlighter bugName="CSRF - Cross site request forgery" id="changePasswordBug">
              <div className="flex justify-between w-full items-center gap-4">
                <Label htmlFor="pass" className="text-lg">
                  Password
                </Label>
                <Button
                  variant={'auth'}
                  type="button"
                  onClick={() => setShowChangePass(!showChangePass)}
                >
                  Change password
                </Button>
              </div>
            </BugHighlighter>
            {/* Password */}
            {/* Current Password */}
            {showChangePass && activeVersion === 'v2' && (
              <div className="w-full space-y-1">
                <Label className="leading-5 text-plate-8" htmlFor="currentPassword">
                  Current Password*
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={isCurrentPasswordVisible ? 'text' : 'password'}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                      setPasswordError('');
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsCurrentPasswordVisible((prevState) => !prevState)}
                    className="text-plate-8 hover:text-plate-8/90 focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isCurrentPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isCurrentPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </div>
            )}

            {/* New Password */}
            {showChangePass && (
              <div className="w-full space-y-1">
                <Label className="leading-5 text-plate-8" htmlFor="password">
                  New Password*
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                    onChange={handlePassInput}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsPasswordVisible((prevState) => !prevState)}
                    className="text-plate-8 hover:text-plate-8/90 focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
              </div>
            )}

            {/* Confirm Password */}

            {showChangePass && (
              <div className="w-full space-y-1 ">
                <Label className="leading-5 text-plate-8" htmlFor="confirmPassword">
                  Confirm Password*
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="••••••••••••••••"
                    className="pr-9"
                    onChange={handleConfirmPassInput}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsConfirmPasswordVisible((prevState) => !prevState)}
                    className="text-plate-8 hover:text-plate-8/90 focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                  >
                    {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    <span className="sr-only">
                      {isConfirmPasswordVisible ? 'Hide password' : 'Show password'}
                    </span>
                  </Button>
                </div>
                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
                <Button
                  className="my-4"
                  disabled={updatePasswordPending}
                  variant={'authOutline'}
                  type="button"
                  onClick={handleUpdatePassword}
                >
                  {updatePasswordPending ? 'Updating Password...' : 'Update Password'}
                </Button>
              </div>
            )}
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" variant={'auth'} disabled={updateProfilePending}>
              {updateProfilePending ? 'Saving...' : 'Save Changes'}
            </Button>

            {/* Hidden close button to programmatically close dialog */}
            <DialogClose asChild>
              <button ref={closeRef} className="hidden" type="button">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalInfoEditDialog;
