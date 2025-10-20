import { NextResponse } from "next/server";
import { Server } from "socket.io";
import { prisma } from "@/lib/prisma";

export const config = {
  api: { bodyParser: false }, // Required for socket.io
};

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    console.log("WebSocket server initialized");

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      // Listen for new messages from clients
      socket.on("sendMessage", async (msg) => {
        try {
          // Save message in database
          const savedMsg = await prisma.message.create({
            data: {
              userId: msg.userId,
              text: msg.text || "",
              sender: msg.sender,
              fileUrl: msg.fileUrl || null,
              fileType: msg.fileType || null,
            },
          });

          // Broadcast message to all connected clients
          io.emit("message", savedMsg);

          // If user sent a message, simulate AI reply
          if (msg.sender === "USER") {
            io.emit("typing", { userId: msg.userId, typing: true });

            setTimeout(async () => {
              const aiMsg = await prisma.message.create({
                data: {
                  userId: msg.userId,
                  text: `Hello ${msg.userId}, AI Response: "${msg.text}"`,
                  sender: "AI",
                },
              });

              io.emit("message", aiMsg);
              io.emit("typing", { userId: msg.userId, typing: false });
            }, 1500); // 1.5s typing delay
          }
        } catch (err) {
          console.error("Error saving message:", err);
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  } else {
    console.log("WebSocket server already running");
  }

  res.end();
};

export default ioHandler;
