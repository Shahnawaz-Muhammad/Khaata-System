import { useCustomerContext } from "../hooks/useCustomerContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ItemCard = ({ item, onDelete}) => {

  console.log("card",item)

  
  return (
    <div className="w-full p-5 flex justify-between bg-white">
      <div>
        <h4 className="text-2xl text-primary font-bold">{item?.name}</h4>
        <p>
          <strong>Description: </strong>
          {item?.description}
        </p>
        <p>
          <strong>Price: </strong>
          {item?.cost}
        </p>
        {/* <p className="text-sm font-light text-gray-500">
          {formatDistanceToNow(new Date(item.createdAt), {
            addSuffix: true,
          })}
        </p> */}
      </div>
      <div className="flex flex-col justify-start ">
        <div>
          <button
            className="material-symbols-outlined"
            onClick={onDelete}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
