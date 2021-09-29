import { AppBar, Toolbar, Typography } from "@mui/material";

export default function PageHeader(props: any) {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
