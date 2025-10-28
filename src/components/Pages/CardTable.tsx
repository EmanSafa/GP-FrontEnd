import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const invoices1 = [
  {
    title: "Colors",
    value: "Mecha Silver, Storm Titanium",
  },
  {
    title: "CPU",
    value: "Octa-core",
  },
  {
    title: "Brand",
    value: "Realme",
  },
  {
    title: "GPU",
    value: "Adreno 810",
  },
  {
    title: "Display Type",
    value: "AMOLED, 120Hz",
  },
  {
    title: "OS",
    value: "Android 15",
  },
  {
    title: "Display Size",
    value: "6.67 inches",
  },
  {
    title: "Internal",
    value: "256GB",
  },
  {
    title: "Display Resolution",
    value: "1080 x 2400 pixels",
  },
  {
    title: "RAM",
    value: "12GB",
  },
  {
    title: "Network",
    value: "4G, 5G",
  },
  {
    title: "Battery Type",
    value: "Si/C Li-Ion 6000 mAh",
  },
  {
    title: "Camera",
    value: "50 MP",
  },
  {
    title: "Battery Size",
    value: "6000 mAh",
  },
  {
    title: "Main Camera",
    value: "50 MP, f/1.8, 27mm (wide)",
  },
  {
    title: "Charging",
    value: "45W wired, 50% in 30 min",
  },

  {
    title: "Front Camera",
    value: "16 MP, f/2.4, 24mm (wide)",
  },
  {
    title: "Sensors",
    value: "Fingerprint (under display, optical)",
  },
];

const CardTable = () => {
  return (
    <Table className="mt-20 w-[95%]  mx-auto">
      <TableBody>
        {invoices1.map((invoice, index) => (
          <TableRow
            key={invoice.title}
            className={`${index % 2 === 0 ? "bg-[#F8E8E8]" : "bg-white"}`}
          >
            <TableCell className={`w-full  align-top `}>
              <div className="flex justify-between mx-5">
                <span className="font-semibold">{invoice.title}</span>
                <span className="text-gray-700">{invoice.value}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default CardTable;
