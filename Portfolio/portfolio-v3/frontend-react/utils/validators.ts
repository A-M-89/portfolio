// utils/validators.ts

export function isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());  // Check if the date is valid
  }
  
  export function isNonEmptyString(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }
  