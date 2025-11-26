interface InfoFieldProps {
  label: string;
  value: string | undefined;
  className?: string;
}

const InfoField = ({ label, value, className = "" }: InfoFieldProps) => {
  return (
    <div className={className}>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="font-medium text-sm">{value || "N/A"}</p>
    </div>
  );
};

export default InfoField;
