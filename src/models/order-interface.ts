export interface OrderInterface {
   _id: string; // Add this line
  status: 'confirmed' | 'pending' | 'refused'; // Include all expected status values
  date: string;
  shipping_info: string;
  full_name: string;
  userId: string;
  client: string;
  category: string;
  service: string;
  price: number;
  payment: string;
  method: string;
}
