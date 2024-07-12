/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITab } from "form-stepper";
import * as yup from "yup";

export const getScopingTabs = (fileUploader: (file: File) => void): ITab[] => {
  return [
    {
      name: "General Information",
      fields: [
        {
          label: "City Id",
          name: "city_id",
          type: "number",
          initialValues: "",
          validations: yup
            .number()
            .min(0)
            .max(999)
            .required("City Id is required"),
        },
        {
          label: "Upgrade date",
          name: "date",
          type: "date",
          initialValues: new Date().toISOString().split("T")[0],
          validations: yup
            .date()
            .min(new Date(), "Date must be in the future")
            .required("Date field is required"),
        },
        {
          label: "City confluence overview",
          name: "city_overview_link",
          type: "text",
          validations: yup.string().url(),
        },
        {
          label: "Jira ticket",
          name: "jira_ticket",
          type: "text",
          validations: yup.string().url(),
        },
      ],
    },
    {
      name: "City configurations",
      fields: [
        {
          label: "City configurations file",
          name: "city_configurations",
          type: "file",
          validations: yup.mixed(),
          info: "Upload the csv table from the Jenkins job",
          fileUploadText: "Upload your file",
          fileRemoveText: "Remove the file",
          fileUploader: fileUploader,
          fileDelete: () => {
            console.log("file deleted");
          },
        },
      ],
    },
    {
      name: "Review data",
      fields: [
        {
          label: "City Id",
          name: "city_id",
          type: "number",
          initialValues: "",
          validations: yup
            .number()
            .min(0)
            .max(999)
            .required("City Id is required"),
          disabled: true,
        },
        {
          label: "Upgrade date",
          name: "date",
          type: "date",
          initialValues: new Date().toISOString().split("T")[0],
          validations: yup
            .date()
            .min(new Date(), "Date must be in the future")
            .required("Date field is required"),
        },
        {
          label: "City Short Code",
          name: "city_short_code",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Service Type",
          name: "service_type",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Tenant ID",
          name: "tenant_id",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Region",
          name: "region",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "PS",
          name: "ps",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "PSO",
          name: "pso",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "PSM",
          name: "psm",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "C2C/D2D",
          name: "c2c_d2d",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "App Name",
          name: "app_name",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "App Image",
          name: "app_image",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "IOS Link",
          name: "ios_link",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "IOS Version",
          name: "ios_version",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Android Link",
          name: "android_link",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Android Version",
          name: "android_version",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Web App",
          name: "web_app",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max ETA",
          name: "max_eta",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "End Break Early",
          name: "end_break_early",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Commitment Type",
          name: "commitment_type",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Time Before End of Service",
          name: "time_before_end_of_service",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Time After End of Service",
          name: "time_after_end_of_service",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Rider Billing Type",
          name: "rider_billing_type",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "City Languages",
          name: "languages",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one language"),
          info: "Enter multiple languages",
          maxInputFields: 10,
        },
        {
          label: "City Overview Link",
          name: "city_overview_link",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Jira Ticket",
          name: "jira_ticket",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Welcome Email",
          name: "welcome_email",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Show Rider Feedback Distribution Toggle",
          name: "show_rider_feedback_distribution_toggle",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Allow Shared Phones",
          name: "allow_shared_phones",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "VOC Book Ride Enable Pickup and Dropoff Notes",
          name: "voc_book_ride_enable_pickup_and_dropoff_notes",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Support Travel Reasons",
          name: "support_travel_reasons",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Available Payment Methods Configurations",
          name: "available_payment_methods_configurations",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Menu",
          name: "menu",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Recurring",
          name: "recurring",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Should Trim Last Name",
          name: "should_trim_last_name",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Minimum No Show Wait",
          name: "minimum_no_show_wait",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Minimum No Show Wait Early Arrival",
          name: "minimum_no_show_wait_early_arrival",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Enable Spontaneous Breaks in Prebooking",
          name: "enable_spontaneous_breaks_in_prebooking",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Enable Dynamic Breaks",
          name: "enable_dynamic_breaks",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Min Break Duration in Seconds",
          name: "min_break_duration_in_seconds",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Break Duration in Seconds",
          name: "max_break_duration_in_seconds",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Allow Driver Breaks",
          name: "allow_driver_breaks",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Allow Breaks Anywhere",
          name: "allow_breaks_anywhere",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Calc No Show Wait for Early Arrival Based on Arrival Time",
          name: "calc_no_show_wait_for_early_arrival_based_on_arrival_time",
          type: "text",
          validations: yup.string(),
        },
        {
          label:
            "On-Demand Minimum No Show Wait by Ride Type for Early Arrival",
          name: "on_demand_minimum_no_show_wait_by_ride_type_for_early_arrival",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "On-Demand No Show Priority Order",
          name: "on_demand_no_show_priority_order",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one priority order"),
          info: "Enter multiple priority orders",
          maxInputFields: 5,
        },
        {
          label: "Prebooking Minimum No Show Wait by Ride Type",
          name: "prebooking_minimum_no_show_wait_by_ride_type",
          type: "text",
          validations: yup.string(),
        },
        {
          label:
            "Prebooking Minimum No Show Wait by Ride Type for Early Arrival",
          name: "prebooking_minimum_no_show_wait_by_ride_type_for_early_arrival",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prebooking No Show Priority Order",
          name: "prebooking_no_show_priority_order",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one priority order"),
          info: "Enter multiple priority orders",
          maxInputFields: 5,
        },
        {
          label: "No Show Timer Default Time Seconds",
          name: "no_show_timer_default_time_seconds",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Rider Name Trimming Schema Type",
          name: "rider_name_trimming_schema_type",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Allow Public Transport Proposals",
          name: "allow_public_transport_proposals",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Min Request Distance",
          name: "min_request_distance",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Admin Booking Types",
          name: "admin_booking_types",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one booking type"),
          info: "Enter multiple booking types",
          maxInputFields: 5,
        },
        {
          label: "Immediate Apply Threshold Minutes",
          name: "immediate_apply_threshold_minutes",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prescheduling Timeslot Delta Minutes",
          name: "prescheduling_timeslot_delta_minutes",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Allow Prescheduled Ride Recurring Requests",
          name: "allow_prescheduled_ride_recurring_requests",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prescheduling Days Limit",
          name: "prescheduling_days_limit",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Series Renewal Duration Days",
          name: "series_renewal_duration_days",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "End Recurring Policy",
          name: "end_recurring_policy",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Renew Series Enabled",
          name: "renew_series_enabled",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Shown Recurring Series Types",
          name: "shown_recurring_series_types",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Block Edit Ride by Rider",
          name: "block_edit_ride_by_rider",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prescheduling Arrival Minutes Can't Order",
          name: "prescheduling_arrival_minutes_cant_order",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prescheduling Arrival Minutes Can't Order Admin",
          name: "prescheduling_arrival_minutes_cant_order_admin",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prescheduling Minutes Can't Order Admin",
          name: "prescheduling_minutes_cant_order_admin",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Prescheduling Minutes Can't Order",
          name: "prescheduling_minutes_cant_order",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Waiting List Threshold in Min",
          name: "waiting_list_threshold_in_min",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Show Phone Button in Rider App",
          name: "show_phone_button_in_rider_app",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Distance from Pickup Stop Point",
          name: "max_distance_from_pickup_stop_point",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Distance from Dropoff Stop Point",
          name: "max_distance_from_dropoff_stop_point",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Distance from Stop Point",
          name: "max_distance_from_stop_point",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Distance from Terminal Stop Point",
          name: "max_distance_from_terminal_stop_point",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Distance from Break Terminal Stop Point",
          name: "max_distance_from_break_terminal_stop_point",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Min Driver Break Seconds",
          name: "min_driver_break_seconds",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Max Driver Break Seconds",
          name: "max_driver_break_seconds",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Nightly Logout End Shift Enabled",
          name: "nightly_logout_end_shift_enabled",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Driver Call Rider",
          name: "driver_call_rider",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Flex No Activity Auto End Shift",
          name: "flex_no_activity_auto_end_shift",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Polygon Permission",
          name: "polygon_permission",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Concession Type",
          name: "concessiontype",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one phone number"),
          info: "Enter multiple phone numbers",
          maxInputFields: 5,
        },
        {
          label: "Masked Phone",
          name: "maskedphone",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one phone number"),
          info: "Enter multiple phone numbers",
          maxInputFields: 5,
        },
        {
          label: "Enable Skip Billing v2",
          name: "enable_skip_billing_v2",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Service Hours",
          name: "service_hours",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one"),
          info: "Enter multiple",
          maxInputFields: 5,
        },
        {
          label: "Finalize Config",
          name: "finalize_config",
          type: "text",
          validations: yup.string(),
        },
        {
          label: "Pricing",
          name: "pricing",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one"),
          info: "Enter multiple",
          maxInputFields: 5,
        },
        {
          label: "ACSA Requests",
          name: "acsa_requests",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one"),
          info: "Enter multiple",
          maxInputFields: 5,
        },
        {
          label: "ACSA Vans",
          name: "acsa_vans",
          type: "multi-input",
          initialValues: [""],
          validations: yup
            .array()
            .of(yup.string())
            .min(1, "Enter at least one"),
          info: "Enter multiple",
          maxInputFields: 5,
        },
      ],
    },
  ];
};
