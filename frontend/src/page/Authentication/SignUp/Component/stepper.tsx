import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps: string[] = [
  'Thông tin cá nhân',
  'Mật khẩu',
  'Vai trò',
];

export default function Steps({ currStep }: { currStep: number }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}