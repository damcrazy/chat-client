import './App.css';

//hooks
import useLocalStorage from './hooks/useLocalStorage';

//components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { ContactsProvider } from './contexts/ContactsProvider';
import { ConversationsProvider } from './contexts/ConversationsProvider';
import { SocketProvider } from './contexts/SocketProvider';

function App() {
  const [id, setId] = useLocalStorage('id',"0");
  const dashboard = (
    <>
    {/* {id} */}
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} setId={setId} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    </>
  )
  return (
    id != "0"  ? dashboard : <Login id={setId} />
  );
}

export default App;
