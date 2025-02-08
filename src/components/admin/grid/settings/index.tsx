import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const GridSettings = () => {
  return (
    <>
      <h2>Ayarlar</h2>
      <Box>
        {/* <ToggleButtonGroup
          value={theme}
          exclusive
          onChange={handleTheme}
          aria-label="theme preference"
          sx={{
            display: "flex",
            "& .MuiToggleButton-root": {
              flex: 1,
              border: "none",
              borderRadius: 0,
            },
            "& .Mui-selected": {
              "& .MuiSvgIcon-root": {
                color: "primary.main",
              },
            },
          }}
        >
          <ToggleButton value="light" aria-label="light theme">
            <LightThemeIcon  />
          </ToggleButton>
          <ToggleButton value="dark" aria-label="dark theme">
            <DarkThemeIcon />
          </ToggleButton>
        </ToggleButtonGroup> */}
      </Box>
    </>
  );
};
