"use client";
import { Box, Modal, Paper, Slide } from "@mui/material";
import React, { useRef } from "react";
import { useSidebar } from "./SidebarProvider";

interface SidebarProps {
  direction: "up" | "down";
  children: React.ReactNode;
  enabled: boolean;
  handleClose: (x: any) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  enabled,
  direction,
  handleClose,
}) => {
  const ref = useRef<any>(null);

  return (
    <>
      <Modal
        ref={ref}
        open={enabled}
        onClose={() => handleClose("")}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{
          zIndex: "modal",
          transition: "top 0.2s ease-in-out",
          top: {
            xs: direction === "up" || scrollY < 64 ? 64 : 0,
            md: direction === "up" || scrollY < 100 ? 100 : 0,
          },
          "& .MuiBackdrop-root": {},
        }}
        slotProps={{
          backdrop: {
            sx: {
              transition: "all 0.2s ease-in-out 0.2s",
              top: direction === "up" ? { xs: 64, md: 100 } : 0,
              background:
                "radial-gradient(circle at 10% 130%, RGB(0, 0, 0, 0.22), transparent)",
            },
          },
        }}
        disableScrollLock
      >
        <Slide
          container={ref.current}
          direction={"left"}
          in={enabled}
          timeout={{ enter: 320, exit: 240 }}
          easing={{ enter: "ease-in-out", exit: "ease-out" }}
          mountOnEnter
          unmountOnExit
        >
          <Box
            sx={{
              height: 1 / 1,
              position: "absolute",
              zIndex: "fab",
              right: -2,
              maxWidth: { xs: 1, sm: 4 / 5 },
            }}
          >
            <Paper
              sx={{
                height: 1 / 1,
                width: 1 / 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                py: 0,
                borderLeft: 1,
                borderColor: "rgba(0,0,0,0.33)",
                borderRadius: 0,
              }}
            >
              {children}
            </Paper>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

interface SideProps {
  value: string;
  child: React.ReactNode;
}

interface SidebarsProps {
  list: SideProps[];
  direction: "up" | "down";
  //value: string | null;
  //handleClose: (x: any) => void;
}

export const Sidebars: React.FC<SidebarsProps> = ({
  list,
  direction,
  // value,
  //handleClose,
}) => {
  const { sidebar, onSidebar } = useSidebar();

  return (
    <>
      {list.map((side, i) => (
        <Sidebar
          key={i}
          direction={direction}
          enabled={sidebar === side.value}
          handleClose={() => onSidebar("")}
        >
          {side.child}
        </Sidebar>
      ))}
    </>
  );
};
