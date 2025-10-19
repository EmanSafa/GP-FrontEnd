import React from "react";

type InfoCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  animationDelay?: number | string;
};

const InfoCard = ({title , description, icon, className = "", animationDelay = 0}:InfoCardProps) => {
  const style: React.CSSProperties = {
    animationDelay:
      typeof animationDelay === "number"
        ? `${animationDelay}ms`
        : animationDelay,
  };

  return (
    <div
      className={`flex justify-center border-2 border-[#5D0505] rounded-md p-4 gap-7 items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg hover:bg-[#fffafa] fade-up ${className}`}
      style={style}
    >
      {icon}
      <div>
        <h3 className="font-semibold text-lg uppercase">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
