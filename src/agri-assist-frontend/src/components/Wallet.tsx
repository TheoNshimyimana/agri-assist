import { useState } from "react";
import { Button } from "../components/ui/button"; // Assuming you have a Button component.

const WalletPage = () => {
  const [balance, setBalance] = useState(5000); // Example initial balance
  const [transactions, setTransactions] = useState([
    { type: "Deposit", amount: 1000, date: "2025-04-01" },
    { type: "Withdrawal", amount: 200, date: "2025-04-02" },
    { type: "Deposit", amount: 1500, date: "2025-04-03" },
  ]);

  const handleDeposit = (amount: number) => {
    setBalance(balance + amount);
    setTransactions([
      ...transactions,
      { type: "Deposit", amount, date: new Date().toLocaleDateString() },
    ]);
  };

  const handleWithdraw = (amount: number) => {
    if (amount <= balance) {
      setBalance(balance - amount);
      setTransactions([
        ...transactions,
        { type: "Withdrawal", amount, date: new Date().toLocaleDateString() },
      ]);
    } else {
      alert("Insufficient balance!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Wallet
        </h1>

        <div className="mb-6 text-center">
          <h2 className="text-3xl text-gray-800  font-bold">
            Balance: <span className=" text-4xl">FRW {balance.toLocaleString()}</span>
          </h2>
        </div>

        <div className="mb-6 flex justify-around">
          <Button
            variant="outline"
            className="w-1/3 py-1 rounded-lg border bg-green-600 text-white"
            onClick={() => handleDeposit(1000)}
          >
            Deposit
          </Button>
          <Button
            variant="outline"
            className="w-1/3 py-1 rounded-lg border border-blue-600 text-blue-600"
            onClick={() => handleWithdraw(1000)}
          >
            Withdraw
          </Button>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Transaction History
        </h3>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-sm ${
                transaction.type === "Deposit" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium">{transaction.type}</span>
                <span className="font-medium">
                  {transaction.type === "Deposit" ? "+" : "-"} FRW{" "}
                  {transaction.amount}
                </span>
              </div>
              <div className="text-sm text-gray-500">{transaction.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
