import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import Web3 from 'web3';
import StudentDataset from '../contracts/StudentDataset.json';

// Initialize IPFS
const ipfs = create('/ip4/127.0.0.1/tcp/5001');

// Connect to Ganache (Assuming Ganache is running locally on port 7545)
const web3 = new Web3('http://127.0.0.1:7545');

// Define your smart contract address and ABI
const contractAddress = '0xBdce0F7C66E885eb424A386FE246995B118eC762';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "studentCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "students",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "studentId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "registerStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_cid",
        "type": "uint256"
      }
    ],
    "name": "addCourse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_studentId",
        "type": "uint256"
      }
    ],
    "name": "getCourseIds",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]; 

function generateRandomStudentId() {
  const minId = 1; // Minimum studentId value
  const maxId = 1000000; // Maximum studentId value (adjust as needed)

  // Generate a random studentId within the specified range
  const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

  return randomId;
}

async function isStudentIdUnique(studentId) {
  // Call the smart contract's students mapping to check if the studentId exists
  const student = await StudentDataset.methods.students(studentId).call();
  
  // Check if the student's name is empty, which indicates that the student does not exist
  return student.name === '';
}

async function generateUniqueStudentId() {
  let randomId;

  do {
    randomId = generateRandomStudentId();
  } while (!(await isStudentIdUnique(randomId)));

  return randomId;
}

function StudentRecordForm() {
  const [textData, setTextData] = useState('');
  const [ipfsCid, setIpfsCid] = useState('');
  const [uniqueStudentId, setUniqueStudentId] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setTextData(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uniqueId = await generateUniqueStudentId();

    // Convert the text data to a Uint8Array
    const textEncoder = new TextEncoder();
    const textUint8Array = textEncoder.encode(textData);

    try {
      // Upload the Uint8Array to IPFS
      const ipfsResponse = await ipfs.add(textUint8Array);

      // Get the IPFS CID
      const cid = ipfsResponse.cid.toString();
      console.log('IPFS CID:', cid);

      // Call the smart contract to store the CID
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      setUniqueStudentId(uniqueId);
      await contract.methods.addCourse(uniqueStudentId,cid).send({ from: '0x62b3aD14725266460Ee9afE3e1b769A802218daf' });

      // Update the state to display the CID
      setIpfsCid(cid);

      // Clear the form
      setTextData('');
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Enter the Student Details:</h2>
          <h4>Student Name, Course Name, Date, Issuer</h4>
          <textarea
            rows="2"
            cols="100"
            value={textData}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {ipfsCid && (
        <div>
          <h2>IPFS CID:</h2>
          <p>{ipfsCid}</p>
          <p>{uniqueStudentId}</p>
        </div>
      )}
    </div>
  );
}

export default StudentRecordForm;
