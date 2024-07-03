/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface UseSocketOptions {
  autoConnect?: boolean;
  reconnectionAttempts?: number;
  reconnectionDelay?: number;
  id: string;
  [key: string]: any;
}

export const useSocket = (url: string, options?: UseSocketOptions) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(url, {
      autoConnect: options?.autoConnect ?? true,
      reconnectionAttempts: options?.reconnectionAttempts ?? Infinity,
      reconnectionDelay: options?.reconnectionDelay ?? 1000,
      query: { id: options?.id },
      ...options,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected");
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        // The disconnection was initiated by the server, you need to manually reconnect
        newSocket.connect();
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  const emit = useCallback(
    (event: string, data?: any) => {
      socket?.emit(event, data);
    },
    [socket]
  );

  const on = useCallback(
    (event: string, func: (...args: any[]) => void) => {
      socket?.on(event, func);
      return () => socket?.off(event, func);
    },
    [socket]
  );

  const off = useCallback(
    (event: string, func: (...args: any[]) => void) => {
      socket?.off(event, func);
    },
    [socket]
  );

  return { socket, emit, on, off };
};
