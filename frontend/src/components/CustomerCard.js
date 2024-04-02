import { useCustomerContext } from "../hooks/useCustomerContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const CustomerCard = ({ customer,onDelete }) => {
  // const { dispatch } = useCustomerContext();
  // const { user } = useAuthContext();

  return (
    <div className="w-full p-5 flex justify-between bg-white">
      <div>
        <h4 className="text-2xl text-primary font-bold">{customer.name}</h4>
        <p>
          <strong>Email: </strong>
          {customer.email}
        </p>
        <p>
          <strong>Phone: </strong>
          {customer.phone}
        </p>
        <p className="text-sm font-light text-gray-500">
          {formatDistanceToNow(new Date(customer.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <button
          type="button"
          className="material-symbols-outlined"
          onClick={onDelete}
        >
          delete
        </button>
        <Link to={customer._id} className="px-5 py-1 bg-primary">
          View
        </Link>
      </div>
    </div>
  );
};

export default CustomerCard;
