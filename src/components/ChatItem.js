import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';


const ChatItem = ({id,data}) => {

    const [Image, setImage] = useState('')

    useEffect(() => {
            async function fetchImgFromAPI() {
              let randomStr = Math.floor(Math.random() * 5000)
              let imageUrl = `https://avatars.dicebear.com/api/avataaars/${randomStr}.svg`
              let res = await fetch(imageUrl);
              if(res.ok){
                setImage(res.url)
              }
            }
            fetchImgFromAPI();
    }, [])

    return (
        <>
            <div className="chatItem flex items-center border-b border-slate-300 p-1">
                
                {Image!=='' && <Avatar src={Image} className=' p-1 ml-3 bg-green-200 border border-slate-400' alt="profileIcon" />}
                {Image==='' && <Avatar src="demoAvatar.svg" className=' p-1 ml-3 bg-green-200 border border-slate-400' alt="profileIcon" />}
                <div className='ml-2 '>
                    <p className='font-bold'>{data}</p>
                    <p className='font-thin'>Last Message....</p>
                </div>
            </div>

        </>
    )
}

export default ChatItem