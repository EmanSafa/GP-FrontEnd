import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Eye, EyeOff } from "lucide-react";

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  saveInfo?: boolean;
}

interface Props {
  formData: PaymentData;
  handleInputChange: (field: string, value: string | boolean) => void;
  handleCardNumberChange: (value: string) => void;
  handleExpiryChange: (value: string) => void;
  showCvv: boolean;
  setShowCvv: (v: boolean) => void;
}

const StepPayment = ({
  formData,
  handleInputChange,
  handleCardNumberChange,
  handleExpiryChange,
  showCvv,
  setShowCvv,
}: Props) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-sm font-medium">Payment method</Label>
        <RadioGroup defaultValue="card" className="space-y-3">
          <div className="flex items-center space-x-3 rounded-lg border p-4">
            <RadioGroupItem value="card" id="card-payment-cN9m74K" />
            <CreditCard className="text-muted-foreground size-5" />
            <Label
              htmlFor="card-payment-cN9m74K"
              className="flex-1 cursor-pointer"
            >
              Credit or debit card
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber-dK5p83L">Card number</Label>
          <Input
            id="cardNumber-dK5p83L"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            maxLength={19}
            className="mt-2"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="expiryDate-fJ6r29M">Expiry</Label>
            <Input
              id="expiryDate-fJ6r29M"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={(e) => handleExpiryChange(e.target.value)}
              maxLength={5}
              className="mt-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv-gH8s34N">CVV</Label>
            <div className="relative">
              <Input
                id="cvv-gH8s34N"
                type={showCvv ? "text" : "password"}
                placeholder="123"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={4}
                className="mt-2 pe-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute end-0 top-1/2 h-full -translate-y-1/2 cursor-pointer hover:bg-transparent"
                onClick={() => setShowCvv(!showCvv)}
              >
                {showCvv ? (
                  <EyeOff className="text-muted-foreground size-4" />
                ) : (
                  <Eye className="text-muted-foreground size-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cardName-hI9t45O">Name on card</Label>
            <Input
              id="cardName-hI9t45O"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={(e) => handleInputChange("cardName", e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">{/* Additional options */}</div>
    </div>
  );
};

export default StepPayment;
