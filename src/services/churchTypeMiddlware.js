


export function getSubdomain() {
  let url = window.location.href
  // let url = 'my.churchplus.co'
    try {
      // Check if the URL has a protocol; if not, add 'http://'
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
      }
      
      // Create a URL object
      const urlObj = new URL(url);
      
      // Extract the hostname
      const hostname = urlObj.hostname;
      
      // Split the hostname into parts
      const parts = hostname.split('.');
      
      // Check if there is a subdomain
      if (parts.length > 2) {
        // Return the subdomain (first part)
        return parts.slice(0, parts.length - 2).join('.');
      } else {
        // No subdomain
        return null;
      }
    } catch (e) {
      console.error('Invalid URL:', e);
      return null;
    }
  }
  export default getSubdomain
  