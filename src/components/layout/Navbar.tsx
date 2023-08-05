import { Avatar, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Auth } from "aws-amplify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const user = useSelector(({ authReducer }) => authReducer);

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            flexGrow: 1,
                        }}
                        onClick={() => navigate("/")}
                    >
                        Launch Central
                    </Typography>

                    <>
                        <div onClick={() => navigate("/profile")} className="flex items-center">
                            {user.attributes.picture && (
                                <Avatar
                                    style={{ marginRight: "4px" }}
                                    alt={
                                        user.attributes.preferred_username ?? ""
                                    }
                                    src={user.attributes.picture}
                                />
                            )}
                            <Typography
                                noWrap
                                component="div"
                                style={{ marginRight: "4px" }}
                            >
                                {user.attributes.name + " " + user.attributes.family_name}
                            </Typography>
                        </div>
                        <Button onClick={() => Auth.signOut()} variant="contained">SignOut</Button>
                    </>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
