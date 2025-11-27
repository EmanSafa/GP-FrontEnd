
interface InfoSectionProps {
  title: string;
  editDialog:React.ReactNode;
  children: React.ReactNode;
}

const InfoSection = ({ title, editDialog, children }: InfoSectionProps) => {
  return (
    <div className="bg-[#F5F5F5] rounded-lg p-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">{title}</h2>
        {editDialog}
      </div>
      <div className="h-[2px] w-[98%] text-center mx-auto mb-4 bg-black"></div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default InfoSection;
