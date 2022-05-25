import ChatSideBar from "./components/ChatSideBar";
import ChatWindow from "./components/ChatWindow";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
      <div className="App grid place-items-center bg-slate-500 h-screen">
        <div className="body flex bg-white h-5/6 w-5/6 shadow-lg">
          <BrowserRouter>
            <ChatSideBar />
            <Routes>
              <Route path='/rooms/:roomId' element={<ChatWindow />} />
              <Route path='/' element={<></>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
