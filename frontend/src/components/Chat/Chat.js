// import React,{useState,useEffect} from "react";
// import queryString from 'query-string';
// //used to retrieve data from URL query
// import io from 'socket.io-client';
// let socket;

// const Chat =({location})=>{
//      const [name, setName] = useState('');
//      const [room, setRoom] = useState('');
//      const[messages,setMessages]=useState([]); //for storing messages
//      const[message,setMessage]=useState(''); //to store and set message

//      const ENDPOINT = 'localhost:5000';
//     useEffect(()=>{
//         //here we want to retrieve data that users have entered while joining
//         const {name,room} = queryString.parse(location.search);
//         socket = io(ENDPOINT);
//     //   console.log(location); //react-router-dom basically provides this prop
//     setName(name);
//     setName(room);
//     // console.log(socket);
//     socket.emit('join',{name,room},()=>{
//     //    alert(error);
//     });
   
//     //return statement is used for unmounting
//     // return ()=>{
//     //     socket.emit('disconnect');
//     //     socket.off();
//     // }
//     },[ENDPOINT,location.search])


//     useEffect(()=>{
//         socket.on('message',(message)=>{
//             setMessages([...messages,message]);
//         })
//     },[messages])  //only want to change if messages array change


//     //function for sending messages
// const sendMessage =(event)=>{
//     event.preventDefault(); //to prevent default behaviour of keypress or button
//     if(message){
//         socket.emit('sendMessage',message,()=>setMessage(''))
//     }
//     console.log('hello');
//     console.log(message, messages);
// }
// return (
//     <div className="outerContainer">
//         <div className="container">
//    <input value={message} onChange={(e)=>setMessage(e.target.value)} onKeyPress={event => event.key==='Enter'?sendMessage(event):null}></input>
//         </div>
//     </div>
// )
// }

// export default Chat;


import React, { useState, useEffect } from "react";
import queryString from "query-string";
// //used to retrieve data from URL query
import io from "socket.io-client";

import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../Infobar/InfoBar";
import Input from "../Input/Input";

import "./Chat.css";

// const ENDPOINT = "https://chit-chat-chatting-app.herokuapp.com/";
const ENDPOINT = "localhost:5000";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");//to store and set message

  const [messages, setMessages] = useState([]); //for storing messages

  useEffect(() => {
    //here we want to retrieve data that users have entered while joining
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;