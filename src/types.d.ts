export interface MenuItemType {
  id: number;
  name: string;
  ingredients: string[];
  price: number;
  emoji: string;
}

export interface OrderItemType {
  item: MenuItemType;
  quantity: number;
}
