import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  // On component mount, connect to MetaMask and fetch account details
  useEffect(() => {
    const connectToMetaMask = async () => {
      if (window.ethereum) {
        // Connect to MetaMask
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          // Instantiate Web3 with MetaMask provider
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("MetaMask not detected");
      }
    };
    connectToMetaMask();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask) return;
    setTasks([...tasks, newTask]);
    setNewTask("");

    // Send transaction to add task to blockchain
    if (web3) {
      const contractAddress = "0x..."; // replace with your contract address
      const contractABI = []; // replace with your contract ABI
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      contract.methods.addTask(newTask).send({ from: account });
    }
  };

  return (
    <div className="App">
      <h1>Checklist DApp</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Task:
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
