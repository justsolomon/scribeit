import { createStandaloneToast } from '@chakra-ui/react';

export const { toast } = createStandaloneToast();

export const toastErrorMessage = (errorMessage: string) => {
  toast({
    title: errorMessage,
    position: 'bottom-right',
    status: 'error',
    duration: 3000,
  });
};

export const toastSuccessMessage = (message: string) => {
  toast({
    title: message,
    status: 'success',
    position: 'top',
    duration: 3000,
  });
};
