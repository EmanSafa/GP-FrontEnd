import * as React from 'react';
import { useAuthStore } from '@/store/authStore';
import { useVersionStore } from '@/store/versionStore';
import { useThemeStore } from '@/store/themeStore';
import { authApi } from '@/api/authApi';
import { useHighlightStore } from '@/store/highlightStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { navigationConfig } from '../../ui/navbar-styles';

interface UpgradeSessionDialogProps {
  isOpen: boolean;
  pendingLevel: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const UpgradeSessionDialog = ({
  isOpen,
  pendingLevel,
  onClose,
  onSuccess,
}: UpgradeSessionDialogProps) => {
  const [password, setPassword] = React.useState('');
  const [isUpgrading, setIsUpgrading] = React.useState(false);
  const [upgradeError, setUpgradeError] = React.useState('');
  const currentUser = useAuthStore((state) => state.user);
  const currentLevel = useThemeStore((state) => state.currentLevel);

  const handleUpgradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpgradeError('');
    setIsUpgrading(true);

    if (!currentUser?.email) {
      setUpgradeError('No authenticated user found.');
      setIsUpgrading(false);
      return;
    }

    try {
      // Temporarily switch active version to v2 so that the login post requests /api/v2/auth/login
      // and authApi.login stores the V2 JWT token correctly.
      useVersionStore.getState().setVersion('v2');

      await authApi.login({
        email: currentUser.email,
        password: password,
      });

      // Confirm level change and close modal
      useThemeStore.getState().setLevel(pendingLevel);
      useHighlightStore.getState().resetBugScanner();
      setPassword('');
      onSuccess();
    } catch (err) {
      // Revert the version state if authentication failed
      const prevVersion = navigationConfig.levelToVersion[currentLevel] ?? 'v1';
      useVersionStore.getState().setVersion(prevVersion);
      const errorMessage =
        err instanceof Error ? err.message : 'Invalid password. Please try again.';
      setUpgradeError(errorMessage);
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleCancelUpgrade = () => {
    setPassword('');
    setUpgradeError('');
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleCancelUpgrade();
      }}
    >
      <DialogContent className="max-w-md bg-white border-none p-6 text-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-plate-8">
            Upgrade Security Session
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm mt-1">
            You are switching to <span className="font-semibold text-blue-600">Blue Box (V2)</span>.
            Because Blue Box uses JWT-based security, please enter your password to upgrade your
            session and remain logged in.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            void handleUpgradeSubmit(e);
          }}
          className="mt-4 space-y-4"
        >
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Account
            </label>
            <div className="bg-gray-50 px-3 py-2 rounded-md border border-gray-100 text-sm text-gray-700 font-medium">
              {currentUser?.email}
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="upgrade-password"
              className="text-xs font-semibold text-gray-400 uppercase tracking-wider block"
            >
              Password
            </label>
            <Input
              id="upgrade-password"
              type="password"
              isPassword
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-200 focus-visible:ring-blue-500/20"
              required
              disabled={isUpgrading}
            />
          </div>

          {upgradeError && (
            <div className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md p-2.5">
              {upgradeError}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelUpgrade}
              disabled={isUpgrading}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpgrading || !password}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-colors"
            >
              {isUpgrading ? 'Upgrading...' : 'Upgrade Session'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
