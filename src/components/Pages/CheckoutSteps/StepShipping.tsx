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
  notes: string;
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
          <Label htmlFor="governorate-wX3k85M">Governorate</Label>
          <Select
            value={formData.governorate}
            onValueChange={(value) => handleInputChange("governorate", value)}
          >
            <SelectTrigger id="governorate-wX3k85M" className="mt-2 w-full">
              <SelectValue placeholder="Select Governorate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cairo">Cairo</SelectItem>
              <SelectItem value="Alexandria">Alexandria</SelectItem>
              <SelectItem value="Giza">Giza</SelectItem>
              <SelectItem value="Dakahlia">Dakahlia</SelectItem>
              <SelectItem value="Red Sea">Red Sea</SelectItem>
              <SelectItem value="Beheira">Beheira</SelectItem>
              <SelectItem value="Fayoum">Fayoum</SelectItem>
              <SelectItem value="Gharbia">Gharbia</SelectItem>
              <SelectItem value="Ismailia">Ismailia</SelectItem>
              <SelectItem value="Monufia">Monufia</SelectItem>
              <SelectItem value="Minya">Minya</SelectItem>
              <SelectItem value="Qalyubia">Qalyubia</SelectItem>
              <SelectItem value="New Valley">New Valley</SelectItem>
              <SelectItem value="Suez">Suez</SelectItem>
              <SelectItem value="Aswan">Aswan</SelectItem>
              <SelectItem value="Assiut">Assiut</SelectItem>
              <SelectItem value="Beni Suef">Beni Suef</SelectItem>
              <SelectItem value="Port Said">Port Said</SelectItem>
              <SelectItem value="Damietta">Damietta</SelectItem>
              <SelectItem value="Sharkia">Sharkia</SelectItem>
              <SelectItem value="South Sinai">South Sinai</SelectItem>
              <SelectItem value="Kafr El Sheikh">Kafr El Sheikh</SelectItem>
              <SelectItem value="Matrouh">Matrouh</SelectItem>
              <SelectItem value="Luxor">Luxor</SelectItem>
              <SelectItem value="Qena">Qena</SelectItem>
              <SelectItem value="North Sinai">North Sinai</SelectItem>
              <SelectItem value="Sohag">Sohag</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
        <Label htmlFor="notes">Delivery Notes</Label>
        <Input
          id="notes"
          placeholder="Please call before delivery"
          value={formData.notes}
          onChange={(e) => handleInputChange("notes", e.target.value)}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default StepShipping;
