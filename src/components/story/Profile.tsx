import { Button, Input, Paper } from "@mui/material";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
    const user = useSelector(({ authReducer }) => authReducer);
    const [profile, setProfile] = useState<string>(user.attributes.profile);

    const handleProfileChange = async () => {
        const userInstance = await Auth.currentAuthenticatedUser();
        return Auth.updateUserAttributes(userInstance, { profile }).then(() =>
            window.location.href = "/"
        );
    };

    return (
        <Paper className="p-8 m-16" elevation={16}>
            <Input
                placeholder="Profile"
                className="w-full"
                value={profile}
                onChange={({ target: { value } }) => setProfile(value)}
            />
            <Button variant="outlined" onClick={() => handleProfileChange()}>
                Change Profile
            </Button>
        </Paper>
    );
}
