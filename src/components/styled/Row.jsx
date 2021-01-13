import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Card,
  CardMedia,
  SvgIcon,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as NotFoundSvg } from "../../public/img/image-not-found.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "140px",
  },
  media: {
    width: "100px",
    maxHeight: "100%",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function Row(props) {
  const classes = useStyles();

  const { movie, checked, onClick } = props;

  const labelId = `transfer-list-item-${movie}-label`;

  return (
    <ListItem role="listitem" button onClick={onClick(movie)}>
      <Card className={classes.root}>
        <ListItemIcon>
          <Checkbox
            checked={checked.indexOf(movie) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText
          className={classes.title}
          id={labelId}
          primary={`${movie.Title} (${movie.Year})`}
        />
        {movie.Poster === "N/A" ? (
          <SvgIcon>
            <NotFoundSvg />
          </SvgIcon>
        ) : (
          <CardMedia
            className={classes.media}
            image={movie.Poster}
            title="Live from space album cover"
          />
        )}
      </Card>
    </ListItem>
  );
}
