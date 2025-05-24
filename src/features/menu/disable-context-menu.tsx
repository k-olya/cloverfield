import { useEffect } from 'react';

/**
 * A component that disables the context menu (right-click menu) across the entire application
 * @returns null - This is a utility component that doesn't render anything
 */
export const DisableContextMenu = () => {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    // Add the event listener when the component mounts
    document.addEventListener('contextmenu', handleContextMenu);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []); // Empty dependency array since we only want to set this up once

  return null; // This component doesn't render anything
};

export default DisableContextMenu; 