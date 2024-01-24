import { Component } from '@angular/core';

interface ShoppingItem {
  name: string;
  quantity: number;
  isPurchased: boolean;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent {
  data: ShoppingItem[] = [
    { name: 'Tomato', quantity: 3, isPurchased: true },
    { name: 'Apple', quantity: 6, isPurchased: false },
    { name: 'Cookies', quantity: 2, isPurchased: false },
  ];

  message: string = '';
  itemPurchasedCount: number = this.purchasedItemsCounter();

  purchaseItem(i: number) {
    if (i < 0 || i >= this.data.length) {
      throw new Error('Index cannot be negative.');
    }

    this.data[i].isPurchased = !this.data[i].isPurchased;

    this.changePurchasedMessage();
  }

  changePurchasedMessage() {
    if (this.isAllPurchasedCheck()) {
      this.message = 'All items have been purchased';
    } else {
      this.message = '';
    }

    this.itemPurchasedCount = this.purchasedItemsCounter();
  }

  isAllPurchasedCheck() {
    for (let i = 0; i < this.data.length; i++) {
      if (!this.data[i].isPurchased) {
        return false;
      }
    }
    return true;
  }

  purchasedItemsCounter() {
    let count = 0;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isPurchased) {
        count++;
      }
    }
    return count;
  }

  ////////////////
  // INPUT BOX

  itemName: string = '';
  itemQuantity: number = 1;

  addItem() {
    if (this.itemName.length == 0 || this.itemQuantity <= 0) {
      throw new Error('Input not valid.');
    }

    // Troubleshouting
    console.log(
      'Adding item:',
      this.itemName,
      ', Quantity: ',
      this.itemQuantity
    );

    const itemToAdd: ShoppingItem = {
      name: this.itemName,
      quantity: this.itemQuantity,
      isPurchased: false,
    };

    this.data.push(itemToAdd);

    this.itemName = '';
    this.itemQuantity = 1;

    this.changePurchasedMessage();
  }

  // TODO: Implement DELETE and EDIT button
}
