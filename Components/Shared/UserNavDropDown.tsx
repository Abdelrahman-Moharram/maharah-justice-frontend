"use client";
import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { setLogout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { ImageSkeleton } from "../Common";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { GetNameChars } from "../utils/helper";
interface user {
  full_name: string;
  username: string;
  id: string;
}

interface Props {
  user: user;
}

const UserNavDropDown = ({ user }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        router.push("/auth/login");
      });
  };
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="text-color bg-transparent items-center inline-flex w-full justify-center gap-x-2 rounded-full text-sm font-semibold transition">
          {user?.id ? (
            <div className="flex items-center gap-2 ">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6001 7.45825L11.1668 12.8916C10.5251 13.5333 9.47515 13.5333 8.83348 12.8916L3.40015 7.45825"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="font-semibold text-negitaive-color">{user?.full_name}</span>
              {
                <div className="rounded-full border-primary border ">
                  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.4" d="M22 40.3517C32.1252 40.3517 40.3333 32.1436 40.3333 22.0184C40.3333 11.8932 32.1252 3.68506 22 3.68506C11.8747 3.68506 3.66663 11.8932 3.66663 22.0184C3.66663 32.1436 11.8747 40.3517 22 40.3517Z" fill="#B3B3B3"/>
                    <path d="M22 12.7231C18.205 12.7231 15.125 15.8031 15.125 19.5981C15.125 23.3198 18.04 26.3448 21.9083 26.4548C21.9633 26.4548 22.0367 26.4548 22.0733 26.4548C22.11 26.4548 22.165 26.4548 22.2017 26.4548C22.22 26.4548 22.2383 26.4548 22.2383 26.4548C25.9417 26.3265 28.8567 23.3198 28.875 19.5981C28.875 15.8031 25.795 12.7231 22 12.7231Z" fill="#B3B3B3"/>
                    <path d="M34.4299 35.4933C31.1666 38.4999 26.8033 40.3516 21.9999 40.3516C17.1966 40.3516 12.8333 38.4999 9.56995 35.4933C10.0099 33.8249 11.2016 32.3033 12.9433 31.1299C17.9483 27.7933 26.0883 27.7933 31.0566 31.1299C32.8166 32.3033 33.9899 33.8249 34.4299 35.4933Z" fill="#B3B3B3"/>
                  </svg>
                </div>
              }
            </div>
          ) : (
            <ImageSkeleton width="200px" height="30px" rounded-sm="30px" />
          )}
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute left-[10px] z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
          {/* <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      href={`/auth/profile/${user.id}`}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </MenuItem> 
              </div>*/}

          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer w-full text-start"
                  )}
                >
                  تسجيل الخروج
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserNavDropDown;
