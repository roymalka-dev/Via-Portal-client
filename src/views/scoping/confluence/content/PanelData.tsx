/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { scopingBadges } from "../elements/badge";

export const PanelData = (configurations: CityConfigurations | any) => {
  const content = `
       <h2>[${configurations.city_short_code.toUpperCase()}]-[${
    configurations.city_id
  }] | 2.0 Upgrade [${configurations.date}]</h2>

    <ac:structured-macro ac:name="panel">
      <ac:parameter ac:name="bgColor">#E6F7FF</ac:parameter> <!-- Blue background color -->
      <ac:rich-text-body>
        <p>This is the new 2.0 upgrade city scoping template which summarizes the services behavior on 1.0 and expectations for the upgrade process.</p>
        <p>Fields tagged with:</p>
        <ul>
          <li>${
            scopingBadges.upgradeTeam
          } - to be filled out by the 2.0 upgrade implementation team</li>
          <li>${scopingBadges.acsa} - to be filled out by ACSA</li>
          <li>${
            scopingBadges.ps
          } - to be filled out by the Partner Success manager</li>
          <li>${
            scopingBadges.mandatory
          } - fields which need to be filled <strong>before</strong> the PS review</li>
          <li>${
            scopingBadges.generatedWithTool
          } - fields created using the portal scoping tool</li>
        </ul>
        <p>PS - please complete as soon as your upgrade Slack channel is opened by Mackenzie and before partner training.</p>
      </ac:rich-text-body>
    </ac:structured-macro>`;
  return content;
};
