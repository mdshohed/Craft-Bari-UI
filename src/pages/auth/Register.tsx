import { Link, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { message } from "antd";
import { useUserSignUpMutation } from "../../redux/features/auth/authApi";
import { TUser } from "@/types/types";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState<TUser>({} as TUser);

  const [userSignUp, { data: user, error: userError }] = useUserSignUpMutation();

  console.log("data => ", user);
  console.log("error => ", userError);

  const onSubmit = async (e: FieldValues) => {
    e.preventDefault();
    const hide = message.loading('processing...');

    for (const key in register) {
      if (register[key as keyof TUser] === "") {
        return message.error("field is required!");
      }
    }
    if (register.password !== register.cpassword) {
      
      return message.error("Password Not Match!");
    }
    try {
      const formData = new FormData();
      let payload = {
        password: register.password, 
        customer: {
          name: register.name,
          email: register.email,
          contactNumber: register.phone,
          address: register.address,
          password: register.password, 
          gender: "MALE"
        }
      }
      
      formData.append("data", JSON.stringify(payload));
      await userSignUp(formData).unwrap();
      message.success("Register Successful!");
      hide();
      navigate(`/login`);
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  return (
    <div className="overflow-hidden py-10 lg:pb-24  bg-zinc-50 text-surface/75 ">
      <div className="flex flex-col  font-[sans-serif]">
        <div className="max-w-md w-full mx-auto border bg-white border-gray-200 rounded-md p-8">
          <h2 className=" text-center text-2xl font-bold">
            Sign Up
          </h2>
          {/* <Card> */}
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                <div>
                  <label className=" text-sm mb-2 block">
                    User Name
                  </label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, name: e.target.value })
                    }
                    name="name"
                    type="text"
                    className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none  hover:border-blue-300"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className=" text-sm mb-2 block">
                    Email
                  </label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                    name="email"
                    type="text"
                    className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none  hover:border-blue-300"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className=" text-sm mb-2 block">
                    Phone
                  </label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, phone: e.target.value })
                    }
                    name="phone"
                    type="text"
                    className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none  hover:border-blue-300"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className=" text-sm mb-2 block">
                    Address
                  </label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, address: e.target.value })
                    }
                    name="address"
                    type="text"
                    className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none  hover:border-blue-300"
                    placeholder="Address"
                  />
                </div>
                <div>
                  <label className=" text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, password: e.target.value })
                    }
                    name="password"
                    type="password"
                    className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none  hover:border-blue-300"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label className=" text-sm mb-2 block">
                    Confirm Password
                  </label>
                  <input
                    onChange={(e) =>
                      setRegister({ ...register, cpassword: e.target.value })
                    }
                    name="cpassword"
                    type="password"
                    className="text-black bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-none  hover:border-blue-300"
                    placeholder="Confirm password"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className=" ml-3 block text-sm"
                  >
                    I accept the{" "}
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Create an account
                </button>
              </div>
              <p className=" text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login Now
                </Link>
              </p>
            </form>
          {/* </Card> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
