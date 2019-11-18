import React,{useEffect,useState} from 'react';
import NewInfo from "./NewInfo"
import { Table, Form, Button,Modal } from 'react-bootstrap'
import Info from "./Components/Info"
import Connect from "./InfoConnect"
import "./Styles/newInfoStyle.css"
import Search from "./Components/search"
import Login from "./Components/login"
import LoginConnect from "./loginConnect"
import Category from "./Components/category"
import { MDBIcon } from "mdbreact";
import Map from "./Components/map"
import Question from "./Components/question"

function App() {

  const [data, setData] = useState([]);
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [click, setClick] = useState(false)
  const [list, setList] = useState([]);
  const [sort, setSort] = useState({});
  const [show, setShow] = useState(false);
  const [word, setWord] = useState("")

  /*
  useEffect( () => {
    async function fectData(){
      let data = await Connect.getAll()
      setData(data)
      console.log(user)

      
      let a = []
      const set = new Set([])
      data.forEach(element => {
        console.log(set)
        set.add(element.category)
      });

      set.forEach(element => {
        a.push({
          key: element,
          list: []
        })
      });
      data.forEach(o =>{
        for (let index = 0; index < a.length; index++) {
          if(o.category === a[index].key){
            a[index].list.push(o)
          } 
        }
      })
      console.log(a)
      setList(a)
      
    }
    fectData()

  },[]);
*/
  

  useEffect(() => {
    async function start(){
      const loggedUserJSON = sessionStorage.getItem('LoggedInfoUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        Connect.setToken(user.token)
        let data = await Connect.getAll()
        setData(data)
      }
    }
    start()
  }, [])

  const handeLogin = async (event) =>{
    event.preventDefault()
    try {

      const user = await LoginConnect.login({
        username, password
      })

      sessionStorage.setItem(
        'LoggedInfoUser', JSON.stringify(user)
      ) 

      Connect.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log("Logged in")

      let data = await Connect.getAll()
      setData(data)
      
    } catch (exception) {
      console.log(user)
    }
  }

  const logOut = () =>{
    console.log("hello")
    setUser(null)
    sessionStorage.clear()
  }

  const allData = data.map((data) =>
    <div  key={data.id} className="shadowBackround2" >
      <Info  word={word} title={data.title} user={user} category={data.category} text={data.text} id={data.id} setData={setData} link={data.link} pic={data.pic}/>
    </div>
  )
  
  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(!show);

   
  if(user == null){
    return (
      <div className="keskita">
        
        {user === null ? 
        <div>
          <h1 className="keskita2">Welcome to the info bank 2019, please login</h1>
      <Login setUsername={setUsername} handeLogin={handeLogin} setPassword={setPassword} click={click} setClick={setClick}/> 
        </div>
        : <Button onClick={logOut}>Log out username: {user.username}</Button>}
      </div>
    )
  }else if(user.admin === false){
    return (
      <div>
        {show === true && <Map handleClose={handleClose} show={show}/>}
        
        {user === null ? 
        <Login setUsername={setUsername} handeLogin={handeLogin} setPassword={setPassword} click={click} setClick={setClick}/> 
        : <Button onClick={logOut}>Log out username: {user.username}</Button>}
        
        <div className="sticky">
          <Search data={data} setData={setData} word={word} setWord={setWord}/>
        </div>
        
        {allData}
        <MDBIcon icon="map-marked-alt" onClick={handleShow} className="map fa fa-camera-retro fa-3x"/>
        {console.log(user)}
      </div>
    )
  }    

  return (
    <div  >
      
        {show === true && <Map handleClose={handleClose} show={show}/>}
        
        {user === null ? 
        <Login setUsername={setUsername} handeLogin={handeLogin} setPassword={setPassword} click={click} setClick={setClick}/> 
        : <Button onClick={logOut}>Log out username: {user.username}</Button>}

        {user !== null && <NewInfo setData={setData}/>}
        
        <div className="sticky">
          <Search data={data} setData={setData} word={word} setWord={setWord}/>
        </div>
        
        {allData}
        {console.log(user)}
        <MDBIcon icon="map-marked-alt" onClick={handleShow} className="map fa fa-camera-retro fa-3x"/>
    </div>
  );
}

export default App;

/*
const luettelo = list.map((o) => 
<div>
  <Category data={o} setSort={setSort}/>
</div>
)

/*
<div className="sticky">
{luettelo}
</div>
*/
