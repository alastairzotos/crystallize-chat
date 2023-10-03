import { useAppState } from "./state/state"
import { UsernameSelect } from "./components/username-select";
import { Chats } from "./components/chats";

function App() {
  const { username } = useAppState();

  return (
    <>
      {!username && <UsernameSelect />}
      {!!username && <Chats />}
    </>
  )
}

export default App
