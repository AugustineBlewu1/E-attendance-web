import { useEffect, useState } from "react"
import HttpService from "../../services/HttpService";
import { Courses, LoginResponse, User } from "../../services/User";
import { useSelector } from "react-redux";
import { UserState } from "../../services/userReducer";



function QrCodePage() {
    const user  = useSelector<UserState>((state) => state);

    const [courses, SetCourses] = useState<Courses[]>([]);

    console.log('user', user)

    useEffect(() => {
        getCourse()
    }, [])


   const getCourse = async () => {
    const course = await HttpService.getWithToken<Courses[]>(
        "http://127.0.0.1/api/v1/courses",
        `${(user as User)?.accessToken}`
      );
    console.log('Courses',course)
    SetCourses(course);
    }

    console.log('Courses',courses)

return (
    <>

    <div>Testing</div>
    </>
)

}


export default QrCodePage