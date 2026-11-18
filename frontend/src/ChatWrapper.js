import { useParams } from "react-router-dom";
import Chat from "./Chat";

function ChatWrapper() {
  const { destinatarioId } = useParams();
  return <Chat destinatarioId={parseInt(destinatarioId)} />;
}

export default ChatWrapper;