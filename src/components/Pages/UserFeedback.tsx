import { FaStar } from "react-icons/fa";

interface IProps {
  img: string;
  user: string;
  userComment: string;
  userImg: string;
}
const UserFeedback = ({ img, user, userComment, userImg }: IProps) => {
  return (
    <div className="relative w-full max-w-md h-[600px] rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      />

      {/* Overlay Card */}
      <div className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl shadow-2xl p-8">
        {/* User Avatar */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img
            src={userImg}
            alt={user}
            className="w-16 h-16 rounded-full border-4 border-white object-cover"
          />
        </div>

        {/* User Name */}
        <h3 className="text-xl font-bold text-gray-900 text-center mt-6 mb-1">
          {user}
        </h3>

        {/* Verified Badge */}
        <p className="text-sm text-gray-500 text-center mb-4">Verified Buyer</p>

        {/* Comment */}
        <p className="text-gray-600 text-center mb-4 italic leading-relaxed">
          " {userComment} "
        </p>

        {/* Star Rating */}
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4].map((star) => (
            <FaStar key={star} className="w-5 h-5 text-[#880909]" />
          ))}
          <FaStar className="w-5 h-5 text-[#880909]/10" />
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
