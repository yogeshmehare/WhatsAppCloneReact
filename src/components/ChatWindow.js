import { AttachFile, InsertEmoticon, Mic, MoreVert, Search, SendRounded } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import db from '../firebase';
import { collection, getDocs, query, serverTimestamp, addDoc, doc, orderBy } from 'firebase/firestore/lite';
import { useParams } from 'react-router-dom';
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import 'bootstrap/dist/css/bootstrap.css';
import { OverlayTrigger, Overlay, Popover } from 'react-bootstrap';

const ChatWindow = () => {

    let senderIsUser = true;
    const [MsgToSend, setMsgToSend] = useState('')
    const [Image, setImage] = useState('')
    const dummy = useRef(null);


    const [msgArr, setMsgArr] = useState([{
        user: "",
        msg: "",
        timestamp: ""
    }])

    const [room, setRoom] = useState({
        'Name': 'Room'
    })

    const params = useParams()

    useEffect(() => {
        async function fetchData() {

            const snapshot = await getDocs(collection(db, "rooms"))
            let r;
            snapshot.docs.map((doc) => {
                if (doc.id === params.roomId) {
                    r = {
                        Name: doc.data().Name
                    }
                }
            }
            )
            setRoom(r);
            setTimeout(() => {
                dummy.current.scrollIntoView({ behavior: "smooth" });
                dummy.current.scrollTop = dummy.current.scrollHeight
            }, 300);
        }
        fetchData();
        async function fetchData1() {
            const roomRef = doc(db, 'rooms', params.roomId);

            const q = query(collection(roomRef, "messages"), orderBy('timestamp', 'asc'))

            const snapshot = await getDocs(q)
            let msgs = [];
            snapshot.docs.forEach((doc) => {
                msgs.push(doc.data())
            })
            setMsgArr(msgs);
            setTimeout(() => {
                dummy.current.scrollIntoView({ behavior: "smooth" });
                dummy.current.scrollTop = dummy.current.scrollHeight
            }, 300);
        }
        fetchData1();
    }, [params])

    async function SendMsg(e) {
        e.preventDefault();
        const roomRef = doc(db, 'rooms', params.roomId);
        const item = {
            name: 'S P',
            msg: MsgToSend,
            timestamp: serverTimestamp()
        }
        await addDoc(collection(roomRef, "messages"), item)
        setMsgArr(msgArr => [...msgArr, item]);
        setMsgToSend("")
        setTimeout(() => {
            dummy.current.scrollIntoView({ behavior: "smooth" });
            dummy.current.scrollTop = dummy.current.scrollHeight
        }, 300);
    }

    const addEmoji = e => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setMsgToSend(MsgToSend + emoji)
        // document.getElementById('overLayTrigger').show = false;
        setShow(false)
    }

    const [show, setShow] = useState(false);
    const target = useRef(null);


    const EmojiPicker = (props) => {
        const ref = useRef()

        useEffect(() => {
            new Picker({ ...props, data, ref })
        }, [props])

        return <div ref={ref} />
    }

    // const popoverTop = (
    //     <Popover id="popover-positioned-top" title="">
    //         <EmojiPicker onEmojiSelect={addEmoji} />
    //     </Popover>
    // );



    return (
        <>
            <div className="basis-2/3 flex flex-col max-h-screen">
                <div className='flex-col items-center'>
                    <div className="chatWindowHeader flex items-center justify-between border-b border-slate-300">
                        <div className="chatWindowHeaderLeft ">
                            <div className="chatItem flex items-center border-b border-slate-300 p-1">

                                {Image !== '' && <Avatar src={Image} className=' p-1 ml-3 bg-green-200 border border-slate-400' alt="profileIcon" />}
                                {Image === '' && <Avatar src="demoAvatar.svg" className=' p-1 ml-3 bg-green-200 border border-slate-400' alt="profileIcon" />}
                                <div className='ml-2 '>
                                    <p className='font-bold'>{room.Name}</p>
                                    <p className='font-thin'></p>
                                </div>
                            </div>
                        </div>
                        <div className="chatWindowHeaderRight ">
                            <IconButton>
                                <Search />
                            </IconButton>
                            <IconButton>
                                <AttachFile />
                            </IconButton>
                            <IconButton>
                                <MoreVert />
                            </IconButton>

                        </div>
                    </div>
                </div>

                <div id='chatWindowBody' className="chatWindowBody h-full first-letter:j bg-center bg-[url('img/chatBg.png')] bg-repeat overflow-auto p-8">
                    {senderIsUser && msgArr.map(msg => {
                        return <div key={msg.name + msg.timestamp.seconds} className='flex-col ml-auto w-fit'>
                            <p className='font-bold text-xs pl-1 pt-2'>{msg.name}</p>
                            <div className='bg-green-400 border shadow-sm pt-1 pb-1 p-2 rounded'>
                                <p className='font-semibold text-base'>{msg.msg}</p>
                                <p className='font-extralight ml-auto w-fit text-xs'>{(new Date(msg.timestamp.seconds * 1000)).toLocaleTimeString()}</p>
                            </div>
                        </div>
                    })}
                    {!senderIsUser && <p className='font-semibold bg-white w-fit pt-1 pb-1 p-2 rounded'>Hello.</p>}
                    <div ref={dummy} className="pb-3" />
                </div>

                <div className="chatWindowFooter flex items-center justify-between">
                    {/* 
                    <OverlayTrigger id="overLayTrigger" onClick={setShowValue(true)} show={showValue} placement="top" overlay={popoverTop} className='bg-[#111] text-black'>

                    </OverlayTrigger> */}

                    <IconButton ref={target} onClick={() => setShow(!show)}>
                        <InsertEmoticon>
                        </InsertEmoticon>
                    </IconButton>

                    <Overlay target={target.current} show={show} placement="top" container={target}>
                        {(props) => (
                            // {popoverTop}
                            <Popover {...props}>
                                <EmojiPicker onEmojiSelect={addEmoji} />
                            </Popover>
                        
                        )}


                    </Overlay>



                    <div className='flex-1 items-center justify-center mt-0.5 mb-0.5'>
                        <form action="" className='flex items-center'>
                            <input value={MsgToSend} onChange={(e) => { setMsgToSend(e.target.value) }} placeholder='Enter your message here' className='w-fit rounded-2xl outline-none border border-slate-400 pl-3 pr-3 pt-1 pb-1 flex-1' />
                            <button type='submit' onClick={SendMsg} />
                            <IconButton onClick={SendMsg}>
                                <SendRounded className='border border-slate-300 bg-green-400 rounded-full pl-1' />
                            </IconButton>
                        </form>
                    </div>
                    <IconButton>
                        <Mic className='mr-2' />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

export default ChatWindow