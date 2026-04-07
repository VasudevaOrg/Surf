export interface VendorDetailsData {
  company_id: string;
  company: string;
  image_url: string;
  company_description: string;
  average_rating: string | null;
  discussion?: {
    posts_count: number;
  };
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  // Add other fields from the API if needed
}

export interface VendorDetailsScreenProps {
  route: {
    params: {
      vendorId: string;
      vendorName: string;
      isVendor: boolean;
    };
  };
}
