import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {


  const handleLogin = async (event) => {
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);
    const data = {
      student_id: formData.get("student_id"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      //Replace with IP address of your machine
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Successfully Logged in", {
          position: "top-center",
        });
        console.log(result.fname);
        var timer = new Date(new Date().getTime() + 90 * 60 * 1000);
        const newUser = JSON.stringify(result);
        Cookies.set("userData", newUser, { expires: timer });
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);
        

      } else {
        const errorResult = await response.json();
        toast.error("Invalid Login Credentials", {
          position: "top-center",
        }); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <Toaster/>
    <form onSubmit={handleLogin} className="space-y-4 w-full">
      
      <div>
        <label className="sr-only">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div>
        <label className="sr-only">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        type="submit"
        className="block w-full text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
      >
        Log In
      </button>
    </form>
    </>
  );
}
