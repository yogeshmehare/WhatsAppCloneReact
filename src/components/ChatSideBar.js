import React,{useState,useEffect} from 'react'
import ProfileAndAccountSettings from './ProfileAndAccountSettings'
import { Avatar, IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SearchOutlined } from '@mui/icons-material';
import ChatItem from './ChatItem';
import db from '../firebase';
import { collection, getDocs } from 'firebase/firestore/lite';
import { Link } from "react-router-dom";



const ChatSideBar = () => {

  // const [loginStatus, setLoginStatus] = useState(false)
  // const [userFullName, setUserFullName] = useState("")
  let userFullName = 'Yogesh Mehare'
  let loginStatus = true

  //let ImageUrl = "/profile/profileIcon.jpg";
  let ImageUrl = "";

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db,"rooms"))
      setRooms(snapshot.docs.map((doc)=>({
          id : doc.id,
          data : doc.data()
      })))
    }
    fetchData();
  }, [rooms])
  

  return (
    <>
    <div className='sidebar basis-1/3 bg-slate-50 border-r border-r-slate-300'>
      <div className="sidebar_header flex justify-between p-3">

        <div className='sidebarHeaderLeft'>
          {loginStatus && ImageUrl !== "" && <div><Avatar alt="ProfileIcon" src={ImageUrl} /></div>}
          {loginStatus && ImageUrl === "" && <ProfileAndAccountSettings fullName={userFullName} />}
        </div>
        <div className='sidebarHeaderRight flex items-center justify-between'>
          <IconButton>
            <DonutLargeIcon className='mx-1' />
          </IconButton>
          <IconButton>
            <ChatIcon className='mx-1' />
          </IconButton>
          <IconButton>
            <MoreVertIcon className='mx-1' />
          </IconButton>
        </div>
      </div>
      <div className='sidebar_search flex items-center bg-slate-200 w-full justify-center'>
        <div className="rounded-2xl border border-slate-300 m-2 p-2.5 h-8 bg-white items-center flex justify-between">
          <SearchOutlined/>
          <input placeholder='Search or start new chat' className='mx-2 outline-none cursor-auto caret-slate-400'/>
        </div>
      </div>

      <div className="sidebar_chats">
        {
          rooms.map((room)=>(
            <Link to={`/rooms/${room.id}`} key={room.id}>
              <ChatItem id={room.id} data={room.data.Name}/>
            </Link>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default ChatSideBar