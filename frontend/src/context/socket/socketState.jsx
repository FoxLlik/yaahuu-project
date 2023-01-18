
import { Manager } from "socket.io-client";

import SocketContext from "./socketContext";

export default function SocketState({ children })
{
    const manager = new Manager(process.env.REACT_APP_SOCKET_URL)
    const socket = manager.socket('/')

    return (
        <SocketContext.Provider
            value={{
                manager,
                socket
            }}
        >
            {children}
        </SocketContext.Provider>
    )

}
