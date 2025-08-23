import { Box, Typography } from "@mui/material";

function InfoRow({ label, value }) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row", sm: "column" }} // stack on mobile, row on md+
      justifyContent={{ xs: "flex-start", md: "space-between" }}
      alignItems={{ xs: "flex-start", md: "center" }}
      sx={{ mb: 1 }}
    >
      <Typography
        variant="h6"
        sx={{ flexShrink: 0, mb: { xs: 0.5, md: 0 } }}
      >
        {label}:
      </Typography>

      <Box
        sx={{
          textAlign: { xs: "left", md: "right" },
          flexGrow: 1,
          ml: { md: 2 },
          wordBreak: "break-word",
          whiteSpace: "normal", // ensures wrapping instead of overflow
        }}
      >
        {typeof value === "string" ? (
          <Typography variant="body1">{value}</Typography>
        ) : (
          value
        )}
      </Box>

    </Box>
  );
}

export default InfoRow;