import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm() {

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      admin_id: formData.get("admin_id"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/api/login_admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Successfully toasted!')
        console.log(result.fname);
        var timer = new Date(new Date().getTime() + 90 * 60 * 1000);
        const newUser = JSON.stringify(result);
        Cookies.set("userData", newUser, { expires: timer });
        // Redirect to dashboard
        window.location.href = "/dashboard";
        

      } else {
        const errorResult = await response.json();
        alert("Invalid Login Credentials"); // Display error message
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 w-full">
      <div>
        <label className="sr-only">Admin ID</label>
        <input
          type="text"
          id="admin_id"
          name="admin_id"
          placeholder="Admin ID"
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
  );
}
