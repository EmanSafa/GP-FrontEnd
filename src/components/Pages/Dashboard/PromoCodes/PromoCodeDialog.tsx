import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldError } from '@/components/ui/field';
import type { PromoCode, PromoCodeFormData } from '@/types/types';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod validation schema matching backend rules
const promoCodeSchema = z
  .object({
    code: z.string().trim().min(1, 'Promo code is required').toUpperCase(),
    description: z.string().trim().optional(),
    discount_type: z.enum(['percentage', 'fixed']),
    discount_value: z.coerce.number().positive('Discount value must be greater than 0'),
    min_order_amount: z.coerce.number().nonnegative('Minimum spend cannot be negative').default(0),
    usage_limit_total: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : Number(val)),
      z.number().positive('Total usage limit must be a positive number').nullable()
    ),
    usage_limit_per_user: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : Number(val)),
      z.number().positive('Per-user limit must be a positive number').nullable()
    ),
    expires_at: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : val),
      z.string().nullable()
    ),
    is_active: z.boolean().default(true),
  })
  .refine(
    (data) => {
      // If percentage, value cannot exceed 100
      if (data.discount_type === 'percentage' && data.discount_value > 100) {
        return false;
      }
      return true;
    },
    {
      message: 'Percentage discount cannot exceed 100%',
      path: ['discount_value'],
    }
  );

type PromoFormValues = z.infer<typeof promoCodeSchema>;

interface PromoCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promo?: PromoCode | null;
  onSubmit: (data: PromoCodeFormData) => void;
  isPending: boolean;
}

const PromoCodeDialog = ({
  open,
  onOpenChange,
  promo,
  onSubmit,
  isPending,
}: PromoCodeDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PromoFormValues>({
    resolver: zodResolver(promoCodeSchema) as Resolver<PromoFormValues>,
    mode: 'onSubmit',
    defaultValues: {
      code: promo?.code ?? '',
      description: promo?.description || '',
      discount_type: promo?.discount_type ?? 'percentage',
      discount_value: promo ? Number(promo.discount_value) : undefined,
      min_order_amount: promo ? Number(promo.min_order_amount) : 0,
      usage_limit_total: promo?.usage_limit_total ?? null,
      usage_limit_per_user: promo?.usage_limit_per_user ?? null,
      expires_at: promo?.expires_at ? promo.expires_at.replace(' ', 'T').substring(0, 16) : null,
      is_active: promo ? !!promo.is_active : true,
    },
  });

  const discountType = watch('discount_type');
  const isActive = watch('is_active');

  const onFormSubmit = (data: PromoFormValues) => {
    let formattedExpiresAt = null;
    if (data.expires_at) {
      formattedExpiresAt = data.expires_at.replace('T', ' ');
      if (formattedExpiresAt.length === 16) {
        formattedExpiresAt += ':00';
      }
    }

    const payload: PromoCodeFormData = {
      code: data.code.trim().toUpperCase(),
      description: data.description || '',
      discount_type: data.discount_type,
      discount_value: data.discount_value,
      min_order_amount: data.min_order_amount,
      usage_limit_total: data.usage_limit_total,
      usage_limit_per_user: data.usage_limit_per_user,
      expires_at: formattedExpiresAt,
      is_active: data.is_active,
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={(e) => {
            void handleSubmit(onFormSubmit)(e);
          }}
          noValidate
        >
          <DialogHeader>
            <DialogTitle>{promo ? 'Edit Promo Code' : 'Add New Promo Code'}</DialogTitle>
            <DialogDescription>
              {promo
                ? 'Update the promo code details below.'
                : 'Fill in the details to create a new promo code.'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-5">
            <Field>
              <Label htmlFor="code">Promo Code *</Label>
              <Input
                id="code"
                placeholder="e.g. SAVE20"
                {...register('code')}
                className="uppercase font-semibold tracking-wider"
              />
              {errors.code && <FieldError>{errors.code.message}</FieldError>}
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g. 20% off on all products"
                {...register('description')}
              />
              {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label>Discount Type *</Label>
                <Select
                  value={discountType}
                  onValueChange={(v) =>
                    setValue('discount_type', v as 'percentage' | 'fixed', { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.discount_type && <FieldError>{errors.discount_type.message}</FieldError>}
              </Field>

              <Field>
                <Label htmlFor="discount_value">Discount Value *</Label>
                <Input
                  id="discount_value"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('discount_value')}
                />
                {errors.discount_value && <FieldError>{errors.discount_value.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="min_order_amount">Min Order Spend ($)</Label>
                <Input
                  id="min_order_amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('min_order_amount')}
                />
                {errors.min_order_amount && (
                  <FieldError>{errors.min_order_amount.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label>Status *</Label>
                <Select
                  value={isActive ? '1' : '0'}
                  onValueChange={(v) => setValue('is_active', v === '1', { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.is_active && <FieldError>{errors.is_active.message}</FieldError>}
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="usage_limit_total">Total Usage Limit</Label>
                <Input
                  id="usage_limit_total"
                  type="number"
                  placeholder="Unlimited"
                  {...register('usage_limit_total')}
                />
                {errors.usage_limit_total && (
                  <FieldError>{errors.usage_limit_total.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label htmlFor="usage_limit_per_user">Per User Limit</Label>
                <Input
                  id="usage_limit_per_user"
                  type="number"
                  placeholder="Unlimited"
                  {...register('usage_limit_per_user')}
                />
                {errors.usage_limit_per_user && (
                  <FieldError>{errors.usage_limit_per_user.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <Label htmlFor="expires_at">Expires At</Label>
              <Input id="expires_at" type="datetime-local" {...register('expires_at')} />
              {errors.expires_at && <FieldError>{errors.expires_at.message}</FieldError>}
            </Field>
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="auth" disabled={isPending}>
              {isPending
                ? promo
                  ? 'Updating...'
                  : 'Creating...'
                : promo
                  ? 'Save Changes'
                  : 'Create Code'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PromoCodeDialog;
