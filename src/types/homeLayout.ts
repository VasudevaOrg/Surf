export interface HomeLayoutResponse {
  layout: LayoutBlock[];
  app_configuration: any;
  // Add other fields as needed
}

export interface LayoutBlock {
  block_id: number;
  type: string; // e.g., "banners", "products", "categories"
  properties: any;
  content: any;
  // We need to inspect correct fields from the dump
}
