import localforage from "localforage";
import { useState, useEffect } from "react";
import * as friendlyTime from "friendly-time";
import getInfuraUrl from "../../utils/getInfuraUrl";
import FeatherIcon from "feather-icons-react";
import {
  BOTTOM_NAVIGATOR_MARGIN_BOTTOM,
  BOTTOM_NAVIGATOR_MIN_HEIGHT_STRING,
  ENCRYPT_OPTIONS,
  NOTIFICATION_PRIVATE_KEY,
  NOTIFICATIONS,
} from "../../constants";
import JSEncrypt from "jsencrypt";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const notificationsStringified = await localforage.getItem(NOTIFICATIONS);
      if (notificationsStringified) {
        // setNotifications(
        let foragedNotifications = JSON.parse(notificationsStringified);
        try {
          const allNotifications = [];
          const decrypt = new JSEncrypt(ENCRYPT_OPTIONS);
          const privateKey = await localforage.getItem(
            NOTIFICATION_PRIVATE_KEY
          );
          if (privateKey) {
            decrypt.setPrivateKey(privateKey);
          } else {
            history.push("/permissions");
            throw new Error("Private key not present");
          }

          foragedNotifications.forEach((notification) => {
            console.log("nf:", notification);
            if (
              notification.privateNotification &&
              !notification.decrypted // dont bother if it has already been decrypted previously
            ) {
              ["title", "data", "body", "imageHash"].forEach((key) => {
                if (notification[key]) {
                  notification[key] = decrypt.decrypt(notification[key]);
                }
              });

              // also since this notification has reached the user,
              // lets now store it in indexedDB as decrypted because this
              // would become unreadable if user changed their private key later.
              // encryption has already fulfilled its purpose at this point
              notification.decrypted = true;
            }

            allNotifications.push(notification);
          });

          setNotifications(allNotifications);
          await localforage.setItem(
            NOTIFICATIONS,
            JSON.stringify(allNotifications)
          );
        } catch (e) {
          console.log(
            "one or more decryptions failed, go reset private key and delete all previous notifications, coz some of them would be encrypted with non present public keys now.",
            e
          );
          toast.error("one or more decryptions failed, go reset private key");
        }
      }
    })();
  }, []);
  return (
    <div>
      <div
        className="container break-all"
        style={{
          minHeight: BOTTOM_NAVIGATOR_MIN_HEIGHT_STRING,
          marginBottom: BOTTOM_NAVIGATOR_MARGIN_BOTTOM,
        }}
      >
        <h3 className="text-2xl my-4 font-bold">Notifications</h3>
        {notifications.map((notification, idx) => {
          return (
            <a
              href={notification.data}
              target="_blank"
              rel="noreferrer"
              className="card block my-4"
              key={idx}
            >
              {notification.privateNotification && (
                <div className="flex justify-begin my-2">
                  <div className="text-sm bg-primary-700 px-2 py-1 rounded-full text-white flex items-center">
                    <div>E2E Encrypted</div>
                    <FeatherIcon icon="lock" className="ml-2" size={16} />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-6">
                <div className="col-span-5 flex items-center">
                  <h4 className="text-xl">{notification.title}</h4>
                </div>
                <div>
                  {notification.iconHash && (
                    <img
                      className="rounded-lg"
                      src={getInfuraUrl(notification.iconHash)}
                      alt={notification.title}
                    />
                  )}
                </div>
              </div>
              {notification.imageHash && (
                <img
                  className="w-3/4 mx-auto"
                  src={getInfuraUrl(notification.imageHash)}
                  alt={notification.title}
                />
              )}
              <div>{notification.body}</div>
              <div className="text-primary-700 text-right text-sm">
                {friendlyTime(new Date(notification.timestamp))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
