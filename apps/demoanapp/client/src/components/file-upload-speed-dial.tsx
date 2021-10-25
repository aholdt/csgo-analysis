import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { SpeedDial, SpeedDialIcon } from "@mui/material";
import React, { useRef } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    speedDial: {
      position: "absolute",
      right: theme.spacing(2),
    },
  })
);

export default function FileUploadSpeedDial(props: { fileUploadCallback: (e: React.FormEvent<HTMLInputElement>) => void }) {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileUploadClick = () => {
    inputRef.current!.click();
    console.log("ey");
  };

  return (
    <div className={classes.root}>
      <input
        style={{ display: "none" }}
        ref={inputRef}
        accept="dem"
        onInput={(e) => {
          props.fileUploadCallback(e);
        }}
        multiple
        type="file"
      />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        onClick={handleFileUploadClick}
        icon={<SpeedDialIcon />}
        open={false}
      ></SpeedDial>
    </div>
  );
}
