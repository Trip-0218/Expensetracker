import React, { useState } from "react";
import ReactLoading from "react-loading";

export default function SetBudget(props) {
  const [monthlyBudget, setMonthlyBudget] = useState({
    budget: "",
  });
  const [error, setError] = useState({
    budget: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const HandleSetBudget = async (e) => {
    setIsLoading(true);

    setError({
      budget: "",
    });

    const res = await fetch("/expense/setbudget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monthlyBudget),
    });
    const data = await res.json();
    console.log(data);

    if (data.errors) {
      setIsLoading(false);
      setError(data.errors);
    } else {
      setIsLoading(false);
      props.closeModalBudget();
      window.location.reload();
    }
  };

  return (
    <div className="grid grid-cols-5 text-white h-3/4 font-lexend bg-black">
      <div className="col-span-3 bg-black h-fit p-8 py-14 rounded-md">
        <h1 className="font-bold text-xl mt-3">Income</h1>
        <div className="mt-4">
          <label className="w-fit">Enter Your Income</label>
        </div>

        <div className="flex bg-gray-700 w-fit mt-4 p-2 rounded">
          <h1 className="font-bold text-xl">₹</h1>
          <input
            value={monthlyBudget.budget}
            onChange={(e) => {
              const tempBudget = { ...monthlyBudget };
              tempBudget.budget = e.target.value;
              setMonthlyBudget(tempBudget);
            }}
            type="number"
            placeholder=""
            className="setbuget-input bg-gray-700 ml-4 outline-none "
          ></input>
        </div>
        <span className="text-sm text-red-500">{error.msg}</span>

        <div className=" mt-20 bg-black w-fit rounded-md">
          {isLoading ? (
            <ReactLoading
              type="bubbles"
              color="#F5A302"
              height={50}
              width={50}
            />
          ) : (
            <button
              onClick={HandleSetBudget}
              className="p-2 px-3 rounded-lg font-bold text-white bg-gray-700"
            >
              Save Income
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
