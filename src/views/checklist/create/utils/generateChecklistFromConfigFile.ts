import ApiService from "@/services/ApiService";
import { OTHER_CONFIGS } from "@/views/wizard/configs";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateChecklistFromConfigFile = async (
  configs: Record<string, string>,
  _cityData: any,
  checklistName: string,
  other_configs: string[]
) => {
  if (!configs) {
    return [];
  }

  const availableTags = await ApiService.get("/checklist/get-all-tags");
  let tags: string[] = availableTags.data
    .map((tag: any) => tag.name)
    .filter((tag: string) => !tag.includes("Not required"));

  // Mapping of CSV config keys to tag names and expected value types and values
  const configToTagMap: {
    [key: string]: {
      tag: string;
      type: "boolean" | "string" | "number";
      falseValue?: any;
    };
  } = {
    driver_call_rider: {
      tag: "RCD/DCR",
      type: "boolean",
      falseValue: false,
    },
    show_phone_button_in_rider_app: {
      tag: "RCD/DCR",
      type: "boolean",
      falseValue: false,
    },
    stack_version: {
      tag: "OnDemand",
      type: "string",
      falseValue: "1p0_on_demand",
    },
    // Add more mappings as needed
  };

  // Function to check if the config value is considered false
  const isFalseValue = (
    value: any,
    type: "boolean" | "string" | "number",
    falseValue?: any
  ) => {
    switch (type) {
      case "boolean":
        return (
          value === "false" || value === false || value === "0" || value === 0
        );
      case "string":
        return value === falseValue;
      case "number":
        return value === "0" || value === 0;
      default:
        return false;
    }
  };

  // Filter tags based on the configs and the mapping
  Object.keys(configs).forEach((key) => {
    const config = configToTagMap[key];
    if (config && isFalseValue(configs[key], config.type, config.falseValue)) {
      tags = tags.filter((tag) => tag !== config.tag);
    }
  });

  // Ensure tags specified in other_configs are kept
  const filteredTags = tags.filter(
    (tag) => !OTHER_CONFIGS.includes(tag) || other_configs.includes(tag)
  );

  return {
    name: checklistName,
    tags: filteredTags,
  };
};
