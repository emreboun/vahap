import React from "react";
import { Box, Typography } from "@mui/material";
import {
  AccessTimeFilledRounded,
  AttachFileRounded,
  LocationOn,
  SignalCellularAltRounded,
  TimerOutlined,
} from "@mui/icons-material";
import { formatDuration } from "@/utils/data";
import { turkcetarih_formati } from "@/utils";

interface Lecture {
  minElo?: number;
  maxElo?: number;
}

interface EventTicket {
  date: string;
  url?: string;
  location?: string;
}

interface ProductItemProps {
  item: {
    name: string;
    thumbnail: string;
    duration: number;
    pgnCount: number;
    lecture?: Lecture;
    eventTicket?: EventTicket;
  };
}

export const MetadataItem: React.FC<{
  icon: React.ReactNode;
  text: string;
}> = ({ icon, text }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
    {icon}
    <Typography color='textSecondary' fontSize={{ xs: 13, md: 14 }}>
      {text}
    </Typography>
  </Box>
);

export const LectureDetails: React.FC<{ lecture: Lecture }> = ({ lecture }) => (
  <MetadataItem
    icon={
      <SignalCellularAltRounded
        sx={{ fontSize: 19, color: "text.secondary" }}
      />
    }
    text={`Önerilen Seviye: ${lecture.minElo} - ${lecture.maxElo}`}
  />
);

export const EventTicketDetails: React.FC<{ eventTicket: EventTicket }> = ({
  eventTicket,
}) => (
  <>
    <MetadataItem
      icon={
        <AccessTimeFilledRounded sx={{ fontSize: 19, color: "primary.main" }} />
      }
      text={turkcetarih_formati(new Date(eventTicket.date))}
    />
    <MetadataItem
      icon={<LocationOn sx={{ fontSize: 21, color: "primary.main" }} />}
      text={eventTicket.url ?? eventTicket.location ?? "Bilinmeyen Konum"}
    />
  </>
);

export const ProductDetails: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <Box
      sx={{
        py: 0.5,
        minHeight: 48,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        component='h2'
        fontWeight={600}
        fontSize={15}
        sx={{ px: 1, py: 0.2, opacity: 0.99 }}
      >
        {item.name}
      </Typography>
      {item.lecture && <LectureDetails lecture={item.lecture} />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        {item.duration > 0 && (
          <MetadataItem
            icon={
              <TimerOutlined sx={{ fontSize: 19, color: "text.secondary" }} />
            }
            text={formatDuration(item.duration)}
          />
        )}
        {item.pgnCount > 0 && (
          <MetadataItem
            icon={
              <AttachFileRounded
                sx={{ fontSize: 19, color: "text.secondary" }}
              />
            }
            text={`${item.pgnCount} Döküman`}
          />
        )}
        {item.eventTicket && (
          <EventTicketDetails eventTicket={item.eventTicket} />
        )}
      </Box>
    </Box>
  );
};
