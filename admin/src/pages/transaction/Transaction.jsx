import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import "./transaction.css";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await userRequest.get("/orders/");
      const transactionsData = response.data;
      setTransactions(transactionsData.reverse());
      console.log(transactions);
    } catch (error) {
      console.error("Error getting transactions:", error);
    }
  };

  const handleSentClick = async (transactionId) => {
    try {
      // Make a DELETE request to delete the order
      await userRequest.delete(`/orders/${transactionId}`);
      console.log(`Order ID ${transactionId} marked as Sent and deleted.`);
      // Refresh the transactions after deletion
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="transactionsPage">
      <h1>Transactions</h1>
      <div className="transactionsContainer">
        {transactions.map((transaction) => (
          <div className="transactionItem" key={transaction._id}>
            <p className="transactionId">
              <b>Transaction ID:</b> {transaction._id}
            </p>
            <p className="transactionCost">
              <b>Cost:</b> {transaction.amount}
            </p>
            <p className="transactionUser">
              <b>User ID:</b> {transaction.userId}
            </p>
            <p className="transactionDate">
              <b>Ordered At:</b> {format(transaction.createdAt)}
            </p>
            <div className="transactionButtons">
              <button
                className="button button-sent"
                onClick={() => handleSentClick(transaction._id)}
              >
                Sent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
