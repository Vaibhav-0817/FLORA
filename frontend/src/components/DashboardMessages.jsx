import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../server";
import { AiOutlineArrowLeft, AiOutlineSend } from "react-icons/ai";
import styles from "../styles/styles";
import { TfiGallery } from "react-icons/tfi";
import socketIo from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const [conversations, setConversations] = useState([]);
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller,open]);

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  useEffect(() => {
    const getMessage = async () => {
      try {
        const response = await axios.get(
          `${server}/messages/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });

    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member.id !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/messages/create-new-messages`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[90%] rounded overflow-y-scroll m-5 h-[85vh] bg-white">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                key={index}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                sid={seller._id}
                userData={userData}
                setUserData={setUserData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
          activeStatus={activeStatus}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  sid,
  userData,
  setUserData,
  online,
  setActiveStatus
}) => {
  const [user,setUser] = useState()
  const handleClick = (id) => {
    setOpen(true);
  };
  const [active, setActive] = useState(0);
  useEffect(() => {
    setActiveStatus(online)
    const userId = data.members.find((user) => user !== sid);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [sid, data, online, setActiveStatus]);
  return (
    <div
      className={`w-full flex p-3 my-3 bg-gray-200 cursor-pointer ${
        active === index ? "bg-pink-200" : "bg-transparent"
      }`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data) || setUserData(user) || setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={`${user?.avatar.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full"
        ></img>
        {
          online ? (<div className="w-3 h-3 rounded-full absolute bg-green-400 top-[2px] right-[1px]"></div>) : (<div className="w-3 h-3 rounded-full absolute bg-[#c7b9b9] top-[2px] right-[1px]"></div>)
        }
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">{user?.name}</h1>
        <p className="text-[16px] text-[#000c]">
          {data?.lastMessageId !== user?._id
            ? "You:"
            : user?.name.split(" ")[0] + ": "}{" "}
          {data?.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      <div className="w-full flex p-3 justify-between bg-pink-300">
        <div className="flex">
          <img
            src={`${userData?.avatar.url}`}
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[500] font-Roboto">
              {userData?.name}
            </h1>
            <h1>{activeStatus ? 'Active Now' : 'Offline'}</h1>
          </div>
        </div>
        <AiOutlineArrowLeft
          size={25}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      <div className="px-3 h-[65vh] overflow-y-scroll py-3">
        {messages &&
          messages.map((item, index) => (
            <div
              className={`flex my-2 w-full ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== sellerId ? (
                <img
                  src={`${userData?.avatar.url}`}
                  alt=""
                  className="w-10 h-10 mr-2 rounded-full"
                ></img>
              ) : null}{" "}
              <div>
                <div className="w-max py-2 px-3 rounded h-min bg-pink-500 text-white">
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text-[#000000d3] pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>

      <form
        className="p-3 w-full relative flex justify-between items-center"
        onSubmit={sendMessageHandler}
      >
        <div className="w-[3%]">
          <TfiGallery className="cursor-pointer" size={20} />
        </div>
        <div className="800px:w-[97%] w-[90%]">
          <input
            type="text"
            placeholder="Type your message...."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input} focus:outline-pink-300`}
            required
          ></input>
          <input type="submit" hidden value="send" id="send"></input>
          <label htmlFor="send">
            <AiOutlineSend
              size={25}
              className="absolute right-4 top-4 text-pink-500"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
