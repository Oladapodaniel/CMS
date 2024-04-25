export const lightTheme = {
    type: 'light',
    primary: '#136acd',
    // secondary: '#6c757d',
    light_primary: '#ebedff',
    bg_900: '#FFFFFF',
    bg_800: '#F9F9F9',
    bg_700: '#EEF0F2',
    bg_600: '#DADEE1',
    text_900: '#1B1B1F',
    // text_800: '#182024',
    // text_700: '#222A31',
    // text_600: '#38434F',

  };
  
  export const darkTheme = {
    type: 'dark',
    primary: '#17a2b8',
    // secondary: '#343a40',
    light_primary: '#202127',
    bg_900: '#1B1B1F',
    bg_800: '#182024',
    bg_700: '#202127',
    bg_600: '#38434F',
    text_900: '#FFFFFF',
    // text_800: '#F9F9F9',
    // text_700: '#EEF0F2',
    // text_600: '#DADEE1',
  };


// Get the root element
const root = document.documentElement;

// Set a custom CSS variable
root.style.setProperty('--el-color-primary', lightTheme.primary);

// Get the value of a custom CSS variable
// const value = getComputedStyle(root).getPropertyValue('--el-color-primary');
// console.log(value); // Output: 'red'

console.log('sett')