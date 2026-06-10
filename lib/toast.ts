// Simple toast notification system
export const toast = {
  success: (message: string) => {
    console.log('✓', message);
    alert(message);
  },
  error: (message: string) => {
    console.error('✗', message);
    alert('Error: ' + message);
  },
};

export const Toaster = () => null;
