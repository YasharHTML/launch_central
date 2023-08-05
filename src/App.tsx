import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "./components/layout";
import Dashboard from "./components/story/Dashboard";
import PainBoardDiscussion from "./components/story/PainBoardDiscussion";
import {
    Authenticator,
    SelectField,
    WithAuthenticatorProps,
    useAuthenticator,
    withAuthenticator,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";

import "@aws-amplify/ui-react/styles.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setState } from "./store/auth_reducer";
import Profile from "./components/story/Profile";

const router: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "pain_board",
                element: <PainBoardDiscussion />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
        ],
    },
];

Amplify.configure(awsmobile);

function _App({ user }: WithAuthenticatorProps) {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        dispatch(
            setState({ username: user?.username, attributes: user?.attributes })
        );
        setLoaded(true);
    }, []);

    if (!loaded) return <>Loading</>;

    return useRoutes(router);
}

export default withAuthenticator(_App, {
    formFields: {
        signUp: {
            gender: {
                label: "Gender",
                isRequired: true,
            },
            picture: {
                label: "Profile Photo",
                isRequired: true,
            },
            locale: {
                label: "Country",
                isRequired: true,
            }
        },
    },
});
