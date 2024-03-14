import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    setLoading(true);

    if (!email || !password) {
      return toast.error("Please fill up all fields!");
    }

    try {
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user.emailVerified) {
        toast.success("You have successfully logged in!");
      } else {
        toast.error("Please verify your email to login.");
      }      
    } catch (error) {
      let errorMessage = 'An error occurred during login.';

      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password.';
      } 
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-[500px] p-6 bg-gray-200 border border-gray-300 rounded-lg">
        <h1 className="text-4xl font-bold mb-1">Mathwise Admin</h1>
        <h2 className="text-xl font-semibold mb-3">Login to continue</h2>
        <div className="flex flex-col mb-2">
          <label className="mb-1">Email: </label>
          <input 
            type="email"
            placeholder="Please enter your email"
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label  className="mb-1">Password: </label>
          <div className="flex items-center w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Please enter your password"
              className="w-full focus:ring-0 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div onClick={toggleShowPassword}>
              {showPassword ? <IoEyeOutline size={15} /> : <IoEyeOffOutline  size={15}/>}
            </div>
          </div>
        </div>
        <button 
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "loading" : "Login"}
        </button>
      </div>
    </div>
  );
}
