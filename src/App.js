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



  const [id, setId] = useLocalStorage('id');
  const dashboard = (
    <>
    {/* {id} */}
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
    </>
  )
  return (
    id ? dashboard : <Login id={setId} />
  );
}

export default App;
