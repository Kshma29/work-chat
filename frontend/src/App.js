
import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Footer from "./components/Footer";
import {useSelector} from 'react-redux';
import { useState } from 'react';
import {AppContext, socket} from './context/appContext';
function App() {
  const [rooms, setRooms]=useState([]);
  const [currentRoom, setCurrentRoom]=useState([]);
  const [members, setMembers]=useState([]);
  const [messages, setMessages]=useState([]);
  const [privateMemberMsg, setPrivateMemberMsg]=useState({});
  const [newMessages, setNewMessages]=useState({});
  const user = useSelector((state) => state.user);
  return (
    <AppContext.Provider value={{socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, }}>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {!user && (<>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
        )}
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Footer />
    </BrowserRouter>
</AppContext.Provider>
  );
}

export default App;
