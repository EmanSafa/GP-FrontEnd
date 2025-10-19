interface IProps {
  title: string;
  image: string;
}

const CategoryCard = ({ title, image }: IProps) => {
  return (
    <div className="flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-transform"> 
      <span className="w-[130px] h-[130px] flex items-center justify-center bg-white border-[1px] rounded-full border-[#5D0505]">
       <img src={image} alt={title} className="w-[82px] h-[100px] object-cover" />
      </span>
      <h2>{title}</h2>
    </div>
  );
};

export default CategoryCard;
