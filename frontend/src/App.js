
import AuthState from "context/auth/authState";
import SocketState from "context/socket/socketState";
import GameState from "context/card13/game/gameState";
import PlayerState from "context/card13/player/playerState";

import Layout from "components/Layout";

import Pages from "pages";

function App()
{
    return (
        <AuthState>
            <SocketState>
                <GameState>
                    <PlayerState>
                        <Layout>
                            <Pages />
                        </Layout>
                    </PlayerState>
                </GameState>
            </SocketState>
        </AuthState>
    );
}

export default App;
