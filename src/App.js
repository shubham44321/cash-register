import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [billAmount, setBillAmount] = useState("");
  const [cashGiven, setCashGiven] = useState("");
  const [btnVisiblity, setBtnVisiblity] = useState("hidden");
  const [tableVisiblity, setTableVisiblity] = useState("hidden");
  const [btnLabel, setBtnLabel] = useState("Next");
  const [currencies, setCurrencies] = useState([2000, 500, 100, 20, 10, 5, 1]);
  const [giveBackAmount, setgiveBackAmount] = useState(
    Array(currencies.length).fill(0)
  );
  const calculate = () => {
    setgiveBackAmount(Array(currencies.length).fill(0));
    console.log(giveBackAmount);
    const arrayToUpdate = giveBackAmount;
    if (billAmount === "") {
      toast("Please enter Bill amount", { type: "error" });
      return;
    }
    if (btnVisiblity !== "hidden") {
      if (cashGiven === "") {
        toast("Please enter Cash given", { type: "error" });
        return;
      }
    }
    setBtnVisiblity("");
    setBtnLabel("Check");
    const bill = parseInt(Math.round(parseFloat(billAmount)));
    const paid = parseInt(Math.round(parseFloat(cashGiven)));
    if (bill > paid) {
      toast("Cash amount should be greater than Bill amount", {
        type: "error",
      });
      return;
    }
    if (billAmount !== "" && cashGiven !== "") {
      const giveBack = parseInt(paid - bill);
      if (giveBack === 0) {
        setgiveBackAmount(Array(currencies.length).fill(0));
        toast("Thank you for giving exact amount", {
          type: "success",
        });
        return;
      }
      let calculatedGiveBack = giveBack;
      currencies.forEach((currency, index) => {
        if (calculatedGiveBack > 0) {
          if (calculatedGiveBack >= currencies[index]) {
            arrayToUpdate[index] = parseInt(
              calculatedGiveBack / currencies[index]
            );
            calculatedGiveBack = calculatedGiveBack % currencies[index];
          }
        }
      });
      console.log("going in state", arrayToUpdate);
      setgiveBackAmount(arrayToUpdate);
      setTableVisiblity("");
    }
  };
  return (
    <div className="container">
      <ToastContainer />
      <div className="middle-box">
        <h1>Cash Register Manager</h1>
        <p className="desc">
          Enter the bill amount and cash given by the customer and know minimum
          number of notes to return.
        </p>
        <label>Bill Amount:</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          className="inp-price"
          name="bill-ampunt"
          id="bill-ampunt"
        />
        <label className={btnVisiblity}>Cash Given:</label>
        <input
          type="number"
          value={cashGiven}
          onChange={(e) => setCashGiven(e.target.value)}
          className={`inp-price ${btnVisiblity}`}
          name="cash-given"
          id="cash-given"
        />

        <button onClick={calculate} className="btn">
          {btnLabel}
        </button>

        <label className={`res ${tableVisiblity}`}>Cash Given:</label>
        <div id="output">
          <table className={tableVisiblity}>
            <tbody>
              <tr>
                <th>No.of Notes</th>
                {giveBackAmount.map((item, index) => (
                  <td key={index} className="noOfNotes">
                    {item === 0 ? "" : item}
                  </td>
                ))}
              </tr>
              <tr>
                <th>Notes</th>
                {currencies.map((item, index) => (
                  <td key={index}>{item}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
