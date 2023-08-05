import { useSelector } from "react-redux"

export default function Dashboard() {
    const user = useSelector(({authReducer}) => authReducer) as any

    console.log(user)

    return <>
        {user.username}
    </>
}
