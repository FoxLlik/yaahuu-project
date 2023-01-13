
import AuthState from "context/auth/authState";

import Layout from "components/Layout";

import Pages from "pages";

function App()
{
    return (
        <AuthState>
            <Layout>
                <Pages />
            </Layout>
        </AuthState>
    );
}

export default App;
