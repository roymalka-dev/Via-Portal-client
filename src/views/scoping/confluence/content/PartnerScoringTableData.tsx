import { scopingBadges } from "../elements/badge";
import { scopingIcons } from "../elements/icons";
import { TableData } from "../PageBuilder";

export const generatePartnerScoringTableData = (): TableData => {
  return {
    headline: "Partner scoring (keep the relevant color)",
    headers: ["Criteria", "Scoring"],
    rows: [
      [
        `Commercial sensitivity / temperature ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        `${scopingIcons.greenCircle} / ${scopingIcons.yellowCircle} / ${scopingIcons.redCircle}`,
      ],
      [
        `Partner tech savviness ${scopingBadges.ps} ${scopingBadges.mandatory}`,
        `${scopingIcons.greenCircle} / ${scopingIcons.yellowCircle} / ${scopingIcons.redCircle}`,
      ],
      [
        `General tech complexity ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
        `${scopingIcons.greenCircle} / ${scopingIcons.yellowCircle} / ${scopingIcons.redCircle}`,
      ],
      [
        `Algo/zone complexity ${scopingBadges.acsa} ${scopingBadges.mandatory}`,
        `${scopingIcons.greenCircle} / ${scopingIcons.yellowCircle} / ${scopingIcons.redCircle}`,
      ],
    ],
  };
};
