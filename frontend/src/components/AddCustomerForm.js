import { useState } from "react";
import { useCustomerContext } from "../hooks/useCustomerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import InputField from "./common/Input";
import Button from "./common/Button";

const AddCustomerForm = () => {
  const { dispatch } = useCustomerContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const customer = { name, email, phone };

    const response = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    console.log("create customer______" ,json)
    if (response.ok) {
      setName("");
      setEmail("");
      setPhone("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_CUSTOMERS", payload: json });
    }
  };

  return (
    <form
      className="w-full flex flex-col gap-3 p-10  bg-white h-full"
      onSubmit={handleSubmit}
    >
      <h3>Add a Customer</h3>

      <InputField
        label="Name:"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        label="Email:"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        label="Phone:"
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <Button type="submit">Add</Button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddCustomerForm;
