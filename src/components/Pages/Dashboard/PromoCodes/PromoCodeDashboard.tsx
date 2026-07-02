'use client';

import { useState } from 'react';
import DataTable from '../shared/DataTable';
import type { PromoCode, PromoCodeFormData, PaginationData } from '@/types/types';
import {
  useGetAllPromoCodes,
  useCreatePromoCode,
  useUpdatePromoCode,
  useDeletePromoCode,
} from '@/hooks/Admin/usePromoCodesAdmin';
import { Button } from '@/components/ui/button';
import PromoCodeDialog from './PromoCodeDialog';
import DeletePromoCodeDialog from './DeletePromoCodeDialog';
import { promoCodesAdminApi } from '@/lib/apiClient';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { getColumns } from './columns';

const PromoCodeDashboard = () => {
  const { data: promoCodes, isLoading } = useGetAllPromoCodes();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [rowSelection, setRowSelection] = useState({});

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoCode | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: createPromo, isPending: isCreatePending } = useCreatePromoCode();
  const { mutateAsync: updatePromo, isPending: isUpdatePending } = useUpdatePromoCode(
    selectedPromo ? selectedPromo.id : 0
  );
  const { mutateAsync: deletePromo, isPending: isDeletePending } = useDeletePromoCode(
    selectedPromo ? selectedPromo.id : 0
  );

  // Client-side pagination logic
  const totalPromos = promoCodes?.length || 0;
  const totalPages = Math.ceil(totalPromos / perPage);

  // Ensure current page is valid
  const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

  const paginatedPromos =
    promoCodes?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];

  const pagination: PaginationData = {
    total: totalPromos,
    perPage: perPage,
    page: currentPage,
    totalPages: totalPages,
  };

  const selectedPromoIds = paginatedPromos
    ? Object.keys(rowSelection)
        .map((index) => paginatedPromos[Number(index)]?.id)
        .filter((id) => id !== undefined)
    : [];

  const handleDeleteSelected = () => {
    if (!selectedPromoIds.length) return;
    setIsBulkDelete(true);
    setDeleteDialogOpen(true);
  };

  const handleCreateSubmit = (data: PromoCodeFormData) => {
    createPromo(data)
      .then(() => {
        setCreateDialogOpen(false);
      })
      .catch((error) => {
        console.error('Failed to create promo code:', error);
      });
  };

  const handleUpdateSubmit = (data: PromoCodeFormData) => {
    updatePromo(data)
      .then(() => {
        setEditDialogOpen(false);
        setSelectedPromo(null);
      })
      .catch((error) => {
        console.error('Failed to update promo code:', error);
      });
  };

  const handleDeleteConfirm = () => {
    const promise = isBulkDelete
      ? Promise.all(selectedPromoIds.map((id) => promoCodesAdminApi.delete(id))).then(() => {
          toast.success(`Successfully deleted ${selectedPromoIds.length} promo codes`);
          setRowSelection({});
          void queryClient.invalidateQueries({ queryKey: ['promo-codes'] });
        })
      : deletePromo();

    promise
      .then(() => {
        setDeleteDialogOpen(false);
        setSelectedPromo(null);
        setIsBulkDelete(false);
      })
      .catch((error) => {
        console.error('Failed to delete promo code:', error);
        toast.error('Failed to delete promo code(s)');
      });
  };

  const openEditDialog = (promo: PromoCode) => {
    setSelectedPromo(promo);
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (promo: PromoCode) => {
    setIsBulkDelete(false);
    setSelectedPromo(promo);
    setDeleteDialogOpen(true);
  };

  const columns = getColumns({
    onEdit: openEditDialog,
    onDelete: openDeleteDialog,
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading promo codes...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Promo Codes Dashboard</h1>
        <div className="flex items-center gap-2">
          {selectedPromoIds.length > 0 && (
            <Button onClick={handleDeleteSelected}>
              Delete Selected ({selectedPromoIds.length})
            </Button>
          )}
          <Button variant={'auth'} onClick={() => setCreateDialogOpen(true)}>
            Add Promo Code
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginatedPromos}
        pagination={pagination}
        onPageChange={setPage}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />

      {/* Create Promo Code Dialog */}
      {createDialogOpen && (
        <PromoCodeDialog
          key="create-promo"
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateSubmit}
          isPending={isCreatePending}
        />
      )}

      {/* Edit Promo Code Dialog */}
      {editDialogOpen && selectedPromo && (
        <PromoCodeDialog
          key={`edit-promo-${selectedPromo.id}`}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          promo={selectedPromo}
          onSubmit={handleUpdateSubmit}
          isPending={isUpdatePending}
        />
      )}

      {/* Delete Promo Code Dialog */}
      <DeletePromoCodeDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isPending={isDeletePending}
        count={isBulkDelete ? selectedPromoIds.length : 1}
      />
    </div>
  );
};

export default PromoCodeDashboard;
