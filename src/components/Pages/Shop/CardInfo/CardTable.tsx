import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { usegetSingleProduct } from "@/hooks/useProducts";
import { useMemo } from "react";

interface CardTableProps {
  id?: number;
}

const CardTable = ({ id }: CardTableProps) => {
  const { data: product } = usegetSingleProduct(id, { enabled: !!id });

  const tableData = useMemo(() => {
    if (!product) return [];

    const basicInfo = [
      { title: "Brand", value: product.brand_name },
      { title: "Category", value: product.category_name },
      { title: "Stock", value: product.stock },
      { title: "Availability", value: product.is_available === "1" ? "In Stock" : "Out of Stock" },
    ];

    let specs: { title: string; value: string }[] = [];
    if (product.specifications) {
      try {
        const parsedSpecs = JSON.parse(product.specifications);
        specs = Object.entries(parsedSpecs).map(([key, value]) => ({
          title: key,
          value: String(value),
        }));
      } catch (e) {
        console.error("Failed to parse specifications", e);
      }
    }

    return [...basicInfo, ...specs].filter(item => item.value);
  }, [product]);

  if (!product) return null;

  return (
    <Table className="mt-20 w-[95%]  mx-auto">
      <TableBody>
        {tableData.map((item, index) => (
          <TableRow
            key={index}
            className={`${index % 2 === 0 ? "bg-[#F8E8E8]" : "bg-white"}`}
          >
            <TableCell className={`w-full  align-top `}>
              <div className="flex justify-between mx-5">
                <span className="font-semibold capitalize">{item.title}</span>
                <span className="text-gray-700">{item.value}</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default CardTable;

{/* </Table>
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
]; */}