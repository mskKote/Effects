import React from "react";

const prefix = "[useMotionPermission]";
const logWithPrefix = (...args: any[]) => console.log(prefix, ...args);
const errWithPrefix = (...args: any[]) => console.error(prefix, ...args);

export const useMotionPermission = () => {
  // positive state true
  const [permission, setPermission] = React.useState<boolean>(true);

  React.useEffect(() => {
    setPermission(
      typeof (DeviceMotionEvent as any).requestPermission !== "function"
    );
  }, []);

  const requestPermission = React.useCallback(() => {
    try {
      logWithPrefix(
        `typeof`,
        typeof (DeviceMotionEvent as any).requestPermission
      );
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((response: String) => {
            // if (response === 'granted') {
            // TODO: обработать сценарий, где прав не дали
            // }
            setPermission(true);
            logWithPrefix("response", response);
          })
          .catch(console.error);
      } else {
        setPermission(true);
        logWithPrefix("DeviceMotionEvent", JSON.stringify(DeviceMotionEvent));
      }
    } catch (e) {
      errWithPrefix((e as Error).message);
    }
  }, []);

  return { permission, requestPermission };
};
