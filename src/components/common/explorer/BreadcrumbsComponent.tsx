import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

interface IBreadcrumbsComponentProps {
  root: string;
}

const BreadcrumbsComponent: React.FC<IBreadcrumbsComponentProps> = ({
  root,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = new URLSearchParams(location.search).get("path") || "";
  const paths = path.split("/").filter(Boolean);

  const handleClick = (index: number) => {
    const newPath = paths.slice(0, index + 1).join("/");

    navigate(`?path=/${newPath}`);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 2 }}>
      <Link
        underline="hover"
        color="inherit"
        onClick={() => navigate(root)}
        sx={{ cursor: "pointer" }}
      >
        Root
      </Link>
      {paths.map((segment, index) => (
        <Link
          key={index}
          underline="hover"
          color="inherit"
          onClick={() => handleClick(index)}
          sx={{ cursor: "pointer" }}
        >
          {segment}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
