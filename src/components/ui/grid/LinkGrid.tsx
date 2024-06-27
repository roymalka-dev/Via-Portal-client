import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

interface GridItem {
  name: string;
  icon: React.ReactElement;
  link: string;
}

interface GridComponentProps {
  items: GridItem[];
  linkType?: "inner" | "outer";
}

const LinkGrid: React.FC<GridComponentProps> = ({ items, linkType }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    if (linkType === "inner") {
      navigate(link);
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            style={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              margin: theme.spacing(2),
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`Go to ${item.name}`}
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              <Button
                onClick={() => handleClick(item.link)}
                variant="contained"
                startIcon={item.icon}
                style={{
                  margin: theme.spacing(1),
                  textTransform: "none",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                }}
              >
                {item.name}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LinkGrid;
