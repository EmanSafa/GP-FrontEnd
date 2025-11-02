import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface Props {
  formData: ContactData;
  handleInputChange: (field: string, value: string | boolean) => void;
}

const StepContact = ({ formData, handleInputChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email-kL9x23P">Email address</Label>
        <Input
          id="email-kL9x23P"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="mt-2"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName-mN7z84Q">First name</Label>
          <Input
            id="firstName-mN7z84Q"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="mt-2"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName-pL8w45T">Last name</Label>
          <Input
            id="lastName-pL8w45T"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="mt-2"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone-rM6n82S">Phone number (optional)</Label>
        <Input
          id="phone-rM6n82S"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default StepContact;
