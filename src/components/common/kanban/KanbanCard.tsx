import React from "react";
import { Card, Typography, Grid, IconButton } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import AvatarDropdown from "@/components/ui/dropdowns/AvatarDropdown";
import { IKanbanCardType } from "@/types/components.types/kanban.types";

interface KanbanCardProps {
  card: IKanbanCardType;
  assigneeOptions: string[];
  onAssigneeChange: (newAssignee: string, cardId: string) => Promise<void>;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  assigneeOptions,
  onAssigneeChange,
}) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: "16px", padding: "8px 16px" }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <AvatarDropdown
            assignee={card.assignee}
            assigneeOptions={assigneeOptions}
            onAssigneeChange={async (newAssignee) =>
              onAssigneeChange(newAssignee, card._id)
            }
          />
        </Grid>
        <Grid item xs>
          <Typography variant="h4" component="div">
            {card.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {card.description.slice(0, 100)}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={() => window.open(card.url, "_blank")}>
            <LinkIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  );
};

export default KanbanCard;
