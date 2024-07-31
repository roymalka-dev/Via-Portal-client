/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";

interface Action {
  key: string;
  description: string;
  action: () => Promise<boolean>;
  delay?: number;
  required?: boolean;
}

interface ProgressWizardProps {
  actions: Action[];
  onComplete: () => void;
  successMessage?: string;
  errorMessage?: string;
}

const ProgressWizard: React.FC<ProgressWizardProps> = ({
  actions,
  onComplete,
  successMessage,
  errorMessage,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<
    ("pending" | "running" | "success" | "failed")[]
  >(actions.map(() => "pending"));
  const [finished, setFinished] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleNext = async () => {
    setStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[activeStep] = "running";
      return newStatus;
    });

    if (actions[activeStep].delay) {
      setTimeout(async () => {
        await runAction();
      }, actions[activeStep].delay);
    } else {
      await runAction();
    }
  };

  const runAction = async () => {
    try {
      const result = await actions[activeStep].action();
      if (result) {
        setStatus((prevStatus) => {
          const newStatus = [...prevStatus];
          newStatus[activeStep] = "success";
          return newStatus;
        });

        if (activeStep < actions.length - 1) {
          setActiveStep((prevStep) => prevStep + 1);
        } else {
          setFinished(true);
        }
      } else {
        handleError();
      }
    } catch (error) {
      handleError();
    }
  };

  const handleError = () => {
    setStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[activeStep] = "failed";
      return newStatus;
    });
    setHasError(true);
    if (actions[activeStep].required) {
      setFinished(true);
    } else {
      if (activeStep < actions.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        setFinished(true);
      }
    }
  };

  useEffect(() => {
    if (status[activeStep] === "pending") {
      handleNext();
    }
  }, [activeStep]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Progress
      </Typography>
      <Box>
        {actions.map((action, index) => (
          <Box
            key={action.key}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              opacity: status[index] === "pending" ? 0.5 : 1,
            }}
          >
            {status[index] === "running" && <CircularProgress size={20} />}
            {status[index] === "success" && <CheckCircleIcon color="success" />}
            {status[index] === "failed" && <CancelIcon color="error" />}
            {status[index] === "pending" && (
              <PauseCircleFilledIcon color="disabled" />
            )}
            <Typography
              variant="body1"
              sx={{
                ml: 2,
                color:
                  status[index] === "failed"
                    ? theme.palette.error.main
                    : "inherit",
              }}
            >
              {action.description}
            </Typography>
          </Box>
        ))}
      </Box>
      {finished && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="h6"
            color={hasError ? "error.main" : "success.main"}
          >
            {hasError ? errorMessage : successMessage}
          </Typography>
          <Button onClick={onComplete} variant="outlined" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProgressWizard;
