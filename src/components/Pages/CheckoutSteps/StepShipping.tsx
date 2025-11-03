import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingData {
  address: string;
  city: string;
  governorate: string;
  zipCode: string;
  country: string;
}

interface Props {
  formData: ShippingData;
  handleInputChange: (field: string, value: string | boolean) => void;
}

const StepShipping = ({ formData, handleInputChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address-qP4z17X">Street address</Label>
        <Input
          id="address-qP4z17X"
          placeholder="123 Main Street"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city-sT5y91B">City</Label>
          <Input
            id="city-sT5y91B"
            placeholder="New York"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="governorate-wX3k85M">governorate</Label>
          <Input
            id="governorate-wX3k85M"
            placeholder="NY"
            value={formData.governorate}
            onChange={(e) => handleInputChange("governorate", e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="zipCode-vZ9q46N">ZIP code</Label>
          <Input
            id="zipCode-vZ9q46N"
            placeholder="10001"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country-bH7l52P">Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => handleInputChange("country", value)}
          >
            <SelectTrigger id="country-bH7l52P" className="mt-2 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United governorates</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default StepShipping;
