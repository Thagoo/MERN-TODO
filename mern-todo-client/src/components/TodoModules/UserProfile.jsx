import React from "react";
import {
  Avatar,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function UserProfile({ userDetails }) {
  return (
    <>
      <List
        sx={{
          mx: 2,
        }}
      >
        <Box
          component="div"
          sx={{
            display: `flex`,
            justifyContent: "center",
            alignItems: "center",
            my: 2,
            mx: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <ListItemAvatar>
            <Avatar src="" />
          </ListItemAvatar>
          <ListItemText
            sx={{ fontWeight: `bold` }}
            primary={userDetails.name}
            secondary={userDetails.email}
          />
        </Box>
        <Divider variant="middle" sx={{ m: `4vh` }} color="primary" />
        <ListItem>
          <ListItemAvatar sx={{ minWidth: `40px` }}>
            <AssignmentIcon />
          </ListItemAvatar>
          <ListItemText primary="Today's Tasks" />
        </ListItem>
        <List sx={{ mx: 6 }} disablePadding>
          <ListItem>
            <CircleIcon fontSize="small" color="primary" />
            <ListItemText secondary="Personal" />
          </ListItem>
          <ListItem>
            <CircleIcon fontSize="small" color="secondary" />
            <ListItemText secondary="Health" />
          </ListItem>
          <ListItem>
            <CircleIcon fontSize="small" color="warning" />
            <ListItemText secondary="Work" />
          </ListItem>
          <ListItem>
            <CircleIcon fontSize="small" color="info" />
            <ListItemText secondary="Other" />
          </ListItem>
        </List>
        <ListItem>
          <ListItemAvatar sx={{ minWidth: `40px` }}>
            <NotificationsNoneIcon />
          </ListItemAvatar>
          <ListItemText primary="Reminders" />
        </ListItem>
      </List>
    </>
  );
}

export default UserProfile;
