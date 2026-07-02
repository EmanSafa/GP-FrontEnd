import { FaStar, FaQuoteLeft } from 'react-icons/fa';

interface IProps {
  img: string;
  user: string;
  userComment: string;
  userImg: string;
}

const UserFeedback = ({ user, userComment, userImg }: IProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 relative flex flex-col items-center text-center max-w-md w-full transition-transform hover:-translate-y-1 hover:shadow-lg duration-300">
      {/* User Avatar */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
        <img
          src={userImg}
          alt={user}
          className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover bg-plate-1"
        />
      </div>

      {/* Quote Icon */}
      <div className="text-plate-1 mt-10 mb-4">
        <FaQuoteLeft className="w-8 h-8 text-plate-2 opacity-30" />
      </div>

      {/* Comment */}
      <p className="text-gray-600 italic leading-relaxed mb-6 flex-grow">"{userComment}"</p>

      {/* User Name */}
      <h3 className="text-lg font-bold text-gray-800 mb-0.5">{user}</h3>

      {/* Verified Badge */}
      <p className="text-xs text-plate-6 font-semibold tracking-wider uppercase mb-4">
        Verified Buyer
      </p>

      {/* Star Rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar key={star} className="w-4 h-4 text-plate-7" />
        ))}
      </div>
    </div>
  );
};

export default UserFeedback;
