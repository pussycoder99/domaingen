export const TLDs = ['.com', '.io', '.ai', '.app', '.co', '.xyz', '.net', '.org'];

// NOTE: Replace this with your actual WHMCS URL. 
// This can be set in an environment variable for better security and flexibility.
const WHMCS_URL_TEMPLATE = 'https://portal.snbdhost.com/cart.php?a=add&domain=register&query={domain}';

export const generateWhmcsLink = (domain: string) => {
  return WHMCS_URL_TEMPLATE.replace('{domain}', domain);
};

export type TldAvailability = {
  tld: string;
  available: boolean;
};

export type DomainSuggestion = {
  baseName: string;
  tlds: TldAvailability[];
};

export const checkDomainAvailability = async (baseNames: string[]): Promise<DomainSuggestion[]> => {
  // Simulate network delay to mimic a real API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  return baseNames.map(baseName => ({
    baseName,
    tlds: TLDs.map(tld => {
      let available = Math.random() > 0.3; // 70% chance of being available
      // Make popular TLDs less likely to be available
      if (tld === '.com' || tld === '.io' || tld === '.ai') {
        available = Math.random() > 0.8; // 20% chance
      }
      return { tld, available };
    }),
  }));
};
