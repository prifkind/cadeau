"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Recipient from "./Recipient";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecipients,
  setSingleRecipient,
} from "../../store/recipientSlice";
import { useUser } from "@auth0/nextjs-auth0";
import { getUser } from "../../store/userSlice";
import AddNewModal from "./(addnew)/AddNewModal";

function Sidebar() {
  const { userId, isLoadingRedux } = useSelector((store) => store.user);
  const { recipients, singleRecipient } = useSelector(
    (store) => store.recipients
  );
  const [addNewModalIsShown, setAddNewModalIsShown] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (isLoading) {
    } else if (!isLoading && !userId) {
      dispatch(getUser(user));
    } else if (userId && recipients.length === 0) {
      dispatch(fetchRecipients(userId));
    } else if (userId && recipients && !singleRecipient.id) {
      if (
        pathname.includes("preferences") ||
        pathname.includes("saved") ||
        pathname.includes("notes")
      ) {
        const parsed = pathname.split("/")[2].split("%20").join(" ");
        const newRecipient = recipients.filter(
          (recipient) =>
            recipient.name === parsed
        );
        dispatch(setSingleRecipient(newRecipient[0].id));
      }
    }
  }, [dispatch, isLoading, recipients, singleRecipient, userId]);

  return (
    <div className="flex flex-col justify-between w-full h-full rounded-md bg-white shadow-xl">
      <div className="flex flex-col justify-start w-full text-center grow min-h-0">
        <div className="flex justify-center items-center h-[40px] bg-cblue-700 text-cwhite rounded-t-md shadow-md z-10">
          <h3>Gift Recipients</h3>
        </div>
        <div
          className="w-full h-full grow min-h-0 overflow-y-scroll"
          aria-label="Sidebar"
        >
          <div className="overflow-y-scroll py-4 px-3 bg-white rounded">
            <ul className="space-y-2">
              {isLoadingRedux ? (
                <li>Loading Recipients..</li>
              ) : (
                recipients.map((recipient, index) => {
                  return <Recipient recipient={recipient} key={index} />;
                })
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="m-4 h-[10%]">
        <button
          onClick={() => setAddNewModalIsShown(true)}
          className="shadow-xl rounded-md uppercase bg-gradient-to-br from-cblue-700 to-cblue-500 text-cwhite text-center w-full h-full hover:scale-105 ease-in duration-100"
        >
          <h3>Add Recipient +</h3>
        </button>
      </div>
      <AddNewModal
        firstTime={false}
        addNewModalIsShown={addNewModalIsShown}
        setAddNewModalIsShown={setAddNewModalIsShown}
      />
    </div>
  );
}

export default Sidebar;
