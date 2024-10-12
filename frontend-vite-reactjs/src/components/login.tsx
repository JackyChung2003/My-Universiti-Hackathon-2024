import { ConnectButton, useActiveAccount } from "thirdweb/react"
import { client,chain } from "../utils/constants"
import Counter from "./counter";
import Test from "./test";
import CampaignInfoTemp from "./CampaignInfoTemp";

const Login: React.FC = () => {
    const account = useActiveAccount();
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        }}>
            {account ? (
                <div style={{ textAlign: "center"}}>
                    <ConnectButton 
                        client={client}
                        chain={chain}
                        connectModal={{
                            size: "compact",
                            // size: "wide",
                        }}
                    />
                    {/* <Counter /> */}
                    {/* <Test /> */}
                    <CampaignInfoTemp />
                </div>
            ) : (
                <div style={{ textAlign: "center"}}>
                    <ConnectButton 
                        client={client}
                        chain={chain}
                        connectModal={{
                            size: "compact",
                            // size: "wide",
                        }}
                   />
                </div>
            )}
            
        </div>
    )
}

export default Login;