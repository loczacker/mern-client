import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        googleLogin().then(async (userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if (user) {
                const userImp = {
                    _id: user.uid,
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL || "https://i.pinimg.com/564x/d0/7b/a6/d07ba6dcf05fa86c0a61855bc722cb7a.jpg",
                    role: 'user',
                    address: "",
                    phone: "",
                    about: ""
                }

                if (user.email && user.displayName) {
                    try {
                        const emailCheck = await axios.get(`http://localhost:5001/check-email/${user.email}`);
                        if (!emailCheck.data.exists) {
                            await axios.post('http://localhost:5001/new-user', userImp);
                            navigate('/');
                            console.log("Registration Successful!");
                        } else {
                            console.log("Email already exists.");
                            navigate('/');
                        }
                    } catch (error) {
                        console.error("Error when checking or adding new user:", error);
                    }
                }
            }
        }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    };

    return (
        <div className="flex items-center justify-center my-3">
            <button 
            onClick={() => handleLogin()}
            className="flex items-center outline-none bg-white border border-gray-300 
            rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
            <FcGoogle className="h-6 w-6 mr-2"/>
                <span>Continue with Google</span>
            </button>
        </div>
    )
}

export default GoogleLogin;
