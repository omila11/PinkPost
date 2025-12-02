import React, { useState } from 'react';

const categories = [
  { 
    name: 'Sweet Treats', 
    subcategories: ['Chocolates', 'Candy Jars', 'Cookies', 'Cupcakes', 'Macarons', 'Brownies']
  },
  {
    name: 'Drinks',
    subcategories: ['Coffee Sachets', 'Hot Chocolate Mix', 'Tea Bags', 'Mini Juice Bottles', 'Milk Tea Packets']
  },
  {
    name: 'Beauty',
    subcategories: ['Scented Candles', 'Bath Bombs', 'Body Lotion', 'Face Masks', 'Lip Balm', 'Perfume Minis']
  },
  {
    name: 'Lifestyle Items',
    subcategories: ['Keychains', 'Mini Photo Frames', 'Notebooks', 'Pens', 'Stickers', 'Pocket Mirrors']
  },
  {
    name: 'Soft Items',
    subcategories: ['Small Plush Toys', 'Soft Towels', 'Mini Pillows']
  },
  {
    name: 'Handmade',
    subcategories: ['Handmade Soaps', 'Essential Oils', 'Herbal Packets', 'Beeswax Candles']
  },
  {
    name: 'Accessories',
    subcategories: ['Bracelets', 'Necklaces', 'Earrings', 'Watches', 'Hair Clips']
  },
  {
    name: 'Tech',
    subcategories: ['Earbuds', 'Phone Covers', 'Power Bank', 'Phone Stand']
  },
  {
    name: 'Snacks',
    subcategories: ['Chips', 'Nuts', 'Crackers']
  },
  { name: 'Flowers', subcategories: [] }
];

const gifts = [
  // Sweet Treats - Chocolates (10 items)
  { id: 1, name: 'Artisan Chocolate Box', price: 8.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate1.jpg', bg: '#3d2817' },
  { id: 2, name: 'Dark Chocolate Truffles', price: 12.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate2.jpg', bg: '#2c1810' },
  { id: 3, name: 'Milk Chocolate Hearts', price: 9.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate3.jpg', bg: '#8b4513' },
  { id: 4, name: 'White Chocolate Bark', price: 10.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate4.jpg', bg: '#f5deb3' },
  { id: 5, name: 'Chocolate Covered Strawberries', price: 14.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate5.jpg', bg: '#cd5c5c' },
  { id: 6, name: 'Belgian Chocolate Pralines', price: 16.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate6.jpg', bg: '#4d2600' },
  { id: 7, name: 'Chocolate Bonbons', price: 13.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate7.jpg', bg: '#6f4e37' },
  { id: 8, name: 'Chocolate Bars Assortment', price: 11.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate8.jpg', bg: '#8b7355' },
  { id: 9, name: 'Sea Salt Caramel Chocolates', price: 15.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate9.jpg', bg: '#a0522d' },
  { id: 10, name: 'Mint Chocolate Collection', price: 12.00, category: 'Sweet Treats', subcategory: 'Chocolates', image: '/images/products/Sweet_Treats/Chocolates/chocolate10.jpg', bg: '#704214' },
  
  // Sweet Treats - Candy Jars (10 items)
  { id: 11, name: 'Gourmet Candy Jar', price: 15.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy1.jpg', bg: '#ff9999' },
  { id: 12, name: 'Mixed Candy Collection', price: 18.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy2.jpg', bg: '#ffb3d9' },
  { id: 13, name: 'Sour Candy Mix', price: 14.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy3.jpg', bg: '#ff6b6b' },
  { id: 14, name: 'Fruit Gummy Bears', price: 12.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy4.jpg', bg: '#ffa07a' },
  { id: 15, name: 'Rock Candy Jar', price: 16.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy5.jpg', bg: '#ff69b4' },
  { id: 16, name: 'Jelly Beans Collection', price: 13.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy6.jpg', bg: '#ff1493' },
  { id: 17, name: 'Lollipop Bouquet', price: 17.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy7.jpg', bg: '#ff00ff' },
  { id: 18, name: 'Hard Candy Mix', price: 11.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy8.jpg', bg: '#ff4500' },
  { id: 19, name: 'Cotton Candy Jar', price: 14.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy9.jpg', bg: '#ffb6c1' },
  { id: 20, name: 'Taffy Collection', price: 15.00, category: 'Sweet Treats', subcategory: 'Candy Jars', image: '/images/products/Sweet_Treats/Candyjars/candy10.jpg', bg: '#ffc0cb' },
  
  // Sweet Treats - Cookies (10 items)
  { id: 21, name: 'Chocolate Chip Cookies', price: 10.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie1.jpg', bg: '#d4a574' },
  { id: 22, name: 'Sugar Cookie Set', price: 11.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie2.jpg', bg: '#e8d4b8' },
  { id: 23, name: 'Oatmeal Raisin Cookies', price: 9.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie3.jpg', bg: '#daa520' },
  { id: 24, name: 'Double Chocolate Cookies', price: 12.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie4.jpg', bg: '#8b4513' },
  { id: 25, name: 'Shortbread Cookies', price: 10.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie5.jpg', bg: '#f5deb3' },
  { id: 26, name: 'Peanut Butter Cookies', price: 11.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie6.jpg', bg: '#cd853f' },
  { id: 27, name: 'Gingerbread Cookies', price: 13.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie7.jpg', bg: '#a0522d' },
  { id: 28, name: 'Snickerdoodle Cookies', price: 10.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie8.jpg', bg: '#deb887' },
  { id: 29, name: 'Decorated Sugar Cookies', price: 14.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie9.jpg', bg: '#ffdab9' },
  { id: 30, name: 'Butter Cookies', price: 9.00, category: 'Sweet Treats', subcategory: 'Cookies', image: '/images/products/Sweet_Treats/Cookies/cookie10.jpg', bg: '#ffe4b5' },
  
  // Sweet Treats - Cupcakes (10 items)
  { id: 31, name: 'Vanilla Cupcakes', price: 14.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake1.jpg', bg: '#ffd9e6' },
  { id: 32, name: 'Red Velvet Cupcakes', price: 16.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake2.jpg', bg: '#cc0000' },
  { id: 33, name: 'Chocolate Cupcakes', price: 15.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake3.jpg', bg: '#4d2600' },
  { id: 34, name: 'Strawberry Cupcakes', price: 14.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake4.jpg', bg: '#ff69b4' },
  { id: 35, name: 'Lemon Cupcakes', price: 13.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake5.jpg', bg: '#fffacd' },
  { id: 36, name: 'Carrot Cake Cupcakes', price: 15.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake6.jpg', bg: '#ffa500' },
  { id: 37, name: 'Funfetti Cupcakes', price: 14.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake7.jpg', bg: '#ffb6c1' },
  { id: 38, name: 'Cookies & Cream Cupcakes', price: 16.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake8.jpg', bg: '#f5f5dc' },
  { id: 39, name: 'Salted Caramel Cupcakes', price: 17.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake9.jpg', bg: '#d2691e' },
  { id: 40, name: 'Coconut Cupcakes', price: 14.00, category: 'Sweet Treats', subcategory: 'Cupcakes', image: '/images/products/Sweet_Treats/Cupcakes/cupcake10.jpg', bg: '#ffffff' },
  
  // Sweet Treats - Macarons (10 items)
  { id: 41, name: 'French Macarons', price: 20.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron1.jpg', bg: '#ffccf2' },
  { id: 42, name: 'Assorted Macarons', price: 22.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron2.jpg', bg: '#e6b3ff' },
  { id: 43, name: 'Pistachio Macarons', price: 21.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron3.jpg', bg: '#93c572' },
  { id: 44, name: 'Raspberry Macarons', price: 20.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron4.jpg', bg: '#e30b5c' },
  { id: 45, name: 'Lavender Macarons', price: 23.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron5.jpg', bg: '#e6e6fa' },
  { id: 46, name: 'Lemon Macarons', price: 20.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron6.jpg', bg: '#fff44f' },
  { id: 47, name: 'Rose Macarons', price: 24.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron7.jpg', bg: '#ff66b2' },
  { id: 48, name: 'Salted Caramel Macarons', price: 22.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron8.jpg', bg: '#c9a063' },
  { id: 49, name: 'Chocolate Macarons', price: 21.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron9.jpg', bg: '#7b3f00' },
  { id: 50, name: 'Vanilla Bean Macarons', price: 20.00, category: 'Sweet Treats', subcategory: 'Macarons', image: '/images/products/Sweet_Treats/Macarons/macaron10.jpg', bg: '#f3e5ab' },
  
  // Sweet Treats - Brownies (10 items)
  { id: 51, name: 'Fudge Brownies', price: 13.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie1.jpg', bg: '#4d2600' },
  { id: 52, name: 'Walnut Brownies', price: 14.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie2.jpg', bg: '#5c3317' },
  { id: 53, name: 'Cheesecake Brownies', price: 16.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie3.jpg', bg: '#f5deb3' },
  { id: 54, name: 'Peanut Butter Brownies', price: 15.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie4.jpg', bg: '#d2691e' },
  { id: 55, name: 'Mint Chocolate Brownies', price: 14.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie5.jpg', bg: '#3d9970' },
  { id: 56, name: 'Caramel Swirl Brownies', price: 15.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie6.jpg', bg: '#a0522d' },
  { id: 57, name: 'Raspberry Brownies', price: 16.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie7.jpg', bg: '#8b008b' },
  { id: 58, name: 'Espresso Brownies', price: 14.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie8.jpg', bg: '#6f4e37' },
  { id: 59, name: 'White Chocolate Brownies', price: 15.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie9.jpg', bg: '#fffaf0' },
  { id: 60, name: 'Triple Chocolate Brownies', price: 17.00, category: 'Sweet Treats', subcategory: 'Brownies', image: '/images/products/Sweet_Treats/Brownies/brownie10.jpg', bg: '#3d1f00' },
  
  // Drinks - Coffee Sachets (10 items)
  { id: 61, name: 'Premium Coffee Sachets', price: 8.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee1.jpg', bg: '#6f4e37' },
  { id: 62, name: 'Instant Latte Mix', price: 9.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee2.jpg', bg: '#8b7355' },
  { id: 63, name: 'Mocha Coffee Sachets', price: 9.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee3.jpg', bg: '#5c4033' },
  { id: 64, name: 'Espresso Sachets', price: 10.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee4.jpg', bg: '#3e2723' },
  { id: 65, name: 'Caramel Coffee Mix', price: 9.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee5.jpg', bg: '#a67c52' },
  { id: 66, name: 'Hazelnut Coffee Sachets', price: 10.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee6.jpg', bg: '#8b6f47' },
  { id: 67, name: 'Vanilla Latte Mix', price: 9.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee7.jpg', bg: '#d2b48c' },
  { id: 68, name: 'French Vanilla Coffee', price: 8.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee8.jpg', bg: '#cdaa7d' },
  { id: 69, name: 'Cappuccino Sachets', price: 9.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee9.jpg', bg: '#967969' },
  { id: 70, name: 'Irish Cream Coffee', price: 10.00, category: 'Drinks', subcategory: 'Coffee Sachets', image: '/images/products/Drinks/Coffee_Sachets/coffee10.jpg', bg: '#7b5e4f' },
  
  // Drinks - Hot Chocolate Mix (10 items)
  { id: 71, name: 'Rich Hot Chocolate', price: 7.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc1.jpg', bg: '#7b3f00' },
  { id: 72, name: 'White Chocolate Mix', price: 8.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc2.jpg', bg: '#f5deb3' },
  { id: 73, name: 'Dark Chocolate Mix', price: 8.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc3.jpg', bg: '#3d2817' },
  { id: 74, name: 'Mint Hot Chocolate', price: 9.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc4.jpg', bg: '#3eb489' },
  { id: 75, name: 'Salted Caramel Chocolate', price: 9.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc5.jpg', bg: '#c68e47' },
  { id: 76, name: 'Peppermint Hot Chocolate', price: 8.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc6.jpg', bg: '#d8f3dc' },
  { id: 77, name: 'Hazelnut Hot Chocolate', price: 9.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc7.jpg', bg: '#a0826d' },
  { id: 78, name: 'Orange Hot Chocolate', price: 8.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc8.jpg', bg: '#ff7f00' },
  { id: 79, name: 'Cinnamon Hot Chocolate', price: 8.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc9.jpg', bg: '#d2691e' },
  { id: 80, name: 'Marshmallow Hot Chocolate', price: 9.00, category: 'Drinks', subcategory: 'Hot Chocolate Mix', image: '/images/products/Drinks/Hot_Chocolate_Mix/hotchoc10.jpg', bg: '#fff8f0' },
  
  // Drinks - Tea Bags (10 items)
  { id: 81, name: 'Green Tea Collection', price: 6.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea1.jpg', bg: '#90ee90' },
  { id: 82, name: 'Herbal Tea Assortment', price: 7.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea2.jpg', bg: '#daa520' },
  { id: 83, name: 'Earl Grey Tea', price: 6.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea3.jpg', bg: '#696969' },
  { id: 84, name: 'Chamomile Tea', price: 6.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea4.jpg', bg: '#f0e68c' },
  { id: 85, name: 'Peppermint Tea', price: 6.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea5.jpg', bg: '#98fb98' },
  { id: 86, name: 'Jasmine Tea', price: 7.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea6.jpg', bg: '#fafad2' },
  { id: 87, name: 'Black Tea Collection', price: 6.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea7.jpg', bg: '#2f1f1f' },
  { id: 88, name: 'Lemon Ginger Tea', price: 7.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea8.jpg', bg: '#ffd700' },
  { id: 89, name: 'Rooibos Tea', price: 6.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea9.jpg', bg: '#cd5c5c' },
  { id: 90, name: 'White Tea Collection', price: 8.00, category: 'Drinks', subcategory: 'Tea Bags', image: '/images/products/Drinks/Tea_Bags/tea10.jpg', bg: '#fffacd' },
  
  // Drinks - Mini Juice Bottles (10 items)
  { id: 91, name: 'Mini Orange Juice', price: 5.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice1.jpg', bg: '#ffa500' },
  { id: 92, name: 'Berry Blend Juice', price: 6.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice2.jpg', bg: '#8b008b' },
  { id: 93, name: 'Apple Juice Mini', price: 5.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice3.jpg', bg: '#9acd32' },
  { id: 94, name: 'Grape Juice', price: 5.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice4.jpg', bg: '#6a0dad' },
  { id: 95, name: 'Mango Juice', price: 6.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice5.jpg', bg: '#ffb347' },
  { id: 96, name: 'Pineapple Juice', price: 6.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice6.jpg', bg: '#ffd700' },
  { id: 97, name: 'Cranberry Juice', price: 6.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice7.jpg', bg: '#dc143c' },
  { id: 98, name: 'Pomegranate Juice', price: 7.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice8.jpg', bg: '#c1272d' },
  { id: 99, name: 'Peach Juice', price: 6.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice9.jpg', bg: '#ffcba4' },
  { id: 100, name: 'Watermelon Juice', price: 6.00, category: 'Drinks', subcategory: 'Mini Juice Bottles', image: '/images/products/Drinks/Mini_Juice_Bottles/juice10.jpg', bg: '#fc6c85' },
  
  // Drinks - Milk Tea Packets (10 items)
  { id: 101, name: 'Classic Milk Tea', price: 7.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea1.jpg', bg: '#d2691e' },
  { id: 102, name: 'Thai Milk Tea', price: 8.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea2.jpg', bg: '#ff8c00' },
  { id: 103, name: 'Matcha Milk Tea', price: 9.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea3.jpg', bg: '#7cb342' },
  { id: 104, name: 'Taro Milk Tea', price: 8.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea4.jpg', bg: '#9575cd' },
  { id: 105, name: 'Brown Sugar Milk Tea', price: 9.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea5.jpg', bg: '#8b4513' },
  { id: 106, name: 'Hokkaido Milk Tea', price: 10.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea6.jpg', bg: '#f5deb3' },
  { id: 107, name: 'Rose Milk Tea', price: 9.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea7.jpg', bg: '#ffb6c1' },
  { id: 108, name: 'Chocolate Milk Tea', price: 8.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea8.jpg', bg: '#6f4e37' },
  { id: 109, name: 'Vanilla Milk Tea', price: 8.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea9.jpg', bg: '#faf0e6' },
  { id: 110, name: 'Okinawa Milk Tea', price: 9.00, category: 'Drinks', subcategory: 'Milk Tea Packets', image: '/images/products/Drinks/Milk_Tea_Packets/milktea10.jpg', bg: '#c19a6b' },
  
  // Beauty - Scented Candles (10 items)
  { id: 111, name: 'Lavender Candle', price: 12.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle1.jpg', bg: '#e6e6fa' },
  { id: 112, name: 'Vanilla Candle', price: 11.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle2.jpg', bg: '#f5f5dc' },
  { id: 113, name: 'Rose Scented Candle', price: 13.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle3.jpg', bg: '#ffb6c1' },
  { id: 114, name: 'Jasmine Candle', price: 12.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle4.jpg', bg: '#fafad2' },
  { id: 115, name: 'Sandalwood Candle', price: 14.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle5.jpg', bg: '#c19a6b' },
  { id: 116, name: 'Eucalyptus Candle', price: 13.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle6.jpg', bg: '#90ee90' },
  { id: 117, name: 'Ocean Breeze Candle', price: 12.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle7.jpg', bg: '#4682b4' },
  { id: 118, name: 'Cinnamon Candle', price: 11.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle8.jpg', bg: '#d2691e' },
  { id: 119, name: 'Citrus Candle', price: 12.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle9.jpg', bg: '#ffa500' },
  { id: 120, name: 'Patchouli Candle', price: 13.00, category: 'Beauty', subcategory: 'Scented Candles', image: '/images/products/Beauty/Scented_Candles/candle10.jpg', bg: '#8b7355' },
  
  // Beauty - Bath Bombs (10 items)
  { id: 121, name: 'Rose Bath Bomb', price: 8.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb1.jpg', bg: '#ffb6c1' },
  { id: 122, name: 'Ocean Breeze Bath Bomb', price: 9.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb2.jpg', bg: '#4682b4' },
  { id: 123, name: 'Lavender Bath Bomb', price: 8.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb3.jpg', bg: '#e6e6fa' },
  { id: 124, name: 'Eucalyptus Mint Bath Bomb', price: 9.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb4.jpg', bg: '#98fb98' },
  { id: 125, name: 'Vanilla Honey Bath Bomb', price: 8.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb5.jpg', bg: '#faf0e6' },
  { id: 126, name: 'Citrus Burst Bath Bomb', price: 9.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb6.jpg', bg: '#ffcc00' },
  { id: 127, name: 'Chamomile Bath Bomb', price: 8.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb7.jpg', bg: '#fffacd' },
  { id: 128, name: 'Jasmine Bath Bomb', price: 9.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb8.jpg', bg: '#f0e68c' },
  { id: 129, name: 'Coconut Bath Bomb', price: 8.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb9.jpg', bg: '#fffaf0' },
  { id: 130, name: 'Berry Bliss Bath Bomb', price: 9.00, category: 'Beauty', subcategory: 'Bath Bombs', image: '/images/products/Beauty/Bath_Bombs/bathbomb10.jpg', bg: '#dda0dd' },
  
  // Beauty - Body Lotion (10 items)
  { id: 131, name: 'Shea Butter Lotion', price: 15.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion1.jpg', bg: '#fffacd' },
  { id: 132, name: 'Coconut Body Cream', price: 14.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion2.jpg', bg: '#ffffff' },
  { id: 133, name: 'Aloe Vera Lotion', price: 13.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion3.jpg', bg: '#98fb98' },
  { id: 134, name: 'Cocoa Butter Lotion', price: 15.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion4.jpg', bg: '#d2691e' },
  { id: 135, name: 'Rose Body Lotion', price: 16.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion5.jpg', bg: '#ffb6c1' },
  { id: 136, name: 'Lavender Body Cream', price: 15.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion6.jpg', bg: '#e6e6fa' },
  { id: 137, name: 'Vanilla Body Lotion', price: 14.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion7.jpg', bg: '#f5f5dc' },
  { id: 138, name: 'Milk & Honey Lotion', price: 16.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion8.jpg', bg: '#fff8dc' },
  { id: 139, name: 'Green Tea Lotion', price: 15.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion9.jpg', bg: '#90ee90' },
  { id: 140, name: 'Argan Oil Lotion', price: 17.00, category: 'Beauty', subcategory: 'Body Lotion', image: '/images/products/Beauty/Body_Lotion/lotion10.jpg', bg: '#f0e68c' },
  
  // Beauty - Face Masks (10 items)
  { id: 141, name: 'Charcoal Face Mask', price: 6.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask1.jpg', bg: '#36454f' },
  { id: 142, name: 'Hydrating Sheet Mask', price: 7.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask2.jpg', bg: '#add8e6' },
  { id: 143, name: 'Collagen Face Mask', price: 8.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask3.jpg', bg: '#ffebcd' },
  { id: 144, name: 'Vitamin C Mask', price: 7.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask4.jpg', bg: '#ffa500' },
  { id: 145, name: 'Aloe Vera Face Mask', price: 6.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask5.jpg', bg: '#98fb98' },
  { id: 146, name: 'Tea Tree Mask', price: 7.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask6.jpg', bg: '#90ee90' },
  { id: 147, name: 'Rose Water Mask', price: 7.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask7.jpg', bg: '#ffb6c1' },
  { id: 148, name: 'Clay Face Mask', price: 6.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask8.jpg', bg: '#d2691e' },
  { id: 149, name: 'Cucumber Face Mask', price: 6.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask9.jpg', bg: '#90ee90' },
  { id: 150, name: 'Gold Face Mask', price: 9.00, category: 'Beauty', subcategory: 'Face Masks', image: '/images/products/Beauty/Face_Masks/mask10.jpg', bg: '#ffd700' },
  
  // Beauty - Lip Balm (10 items)
  { id: 151, name: 'Cherry Lip Balm', price: 4.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm1.jpg', bg: '#de3163' },
  { id: 152, name: 'Mint Lip Balm', price: 4.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm2.jpg', bg: '#98ff98' },
  { id: 153, name: 'Strawberry Lip Balm', price: 4.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm3.jpg', bg: '#fc5a8d' },
  { id: 154, name: 'Vanilla Lip Balm', price: 4.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm4.jpg', bg: '#f5f5dc' },
  { id: 155, name: 'Coconut Lip Balm', price: 5.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm5.jpg', bg: '#fffaf0' },
  { id: 156, name: 'Honey Lip Balm', price: 5.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm6.jpg', bg: '#f0e68c' },
  { id: 157, name: 'Rose Lip Balm', price: 5.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm7.jpg', bg: '#ffb6c1' },
  { id: 158, name: 'Chocolate Lip Balm', price: 4.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm8.jpg', bg: '#6f4e37' },
  { id: 159, name: 'Peach Lip Balm', price: 4.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm9.jpg', bg: '#ffcba4' },
  { id: 160, name: 'Lavender Lip Balm', price: 5.00, category: 'Beauty', subcategory: 'Lip Balm', image: '/images/products/Beauty/Lip_Balm/lipbalm10.jpg', bg: '#e6e6fa' },
  
  // Beauty - Perfume Minis (10 items)
  { id: 161, name: 'Floral Perfume Mini', price: 18.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume1.jpg', bg: '#ff69b4' },
  { id: 162, name: 'Citrus Perfume Mini', price: 17.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume2.jpg', bg: '#ffd700' },
  { id: 163, name: 'Rose Perfume Mini', price: 19.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume3.jpg', bg: '#ffb6c1' },
  { id: 164, name: 'Vanilla Perfume Mini', price: 18.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume4.jpg', bg: '#f5f5dc' },
  { id: 165, name: 'Jasmine Perfume Mini', price: 19.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume5.jpg', bg: '#fafad2' },
  { id: 166, name: 'Ocean Breeze Perfume', price: 17.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume6.jpg', bg: '#4682b4' },
  { id: 167, name: 'Lavender Perfume Mini', price: 18.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume7.jpg', bg: '#e6e6fa' },
  { id: 168, name: 'Sandalwood Perfume', price: 20.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume8.jpg', bg: '#c19a6b' },
  { id: 169, name: 'Musk Perfume Mini', price: 19.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume9.jpg', bg: '#8b7355' },
  { id: 170, name: 'Cherry Blossom Perfume', price: 18.00, category: 'Beauty', subcategory: 'Perfume Minis', image: '/images/products/Beauty/Perfume_Minis/perfume10.jpg', bg: '#ffb7c5' },
  
  // Lifestyle Items - Keychains (10 items)
  { id: 171, name: 'Cute Bear Keychain', price: 5.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain1.jpg', bg: '#cd853f' },
  { id: 172, name: 'Initial Letter Keychain', price: 6.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain2.jpg', bg: '#c0c0c0' },
  { id: 173, name: 'Star Keychain', price: 5.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain3.jpg', bg: '#ffd700' },
  { id: 174, name: 'Heart Keychain', price: 5.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain4.jpg', bg: '#ff69b4' },
  { id: 175, name: 'Moon Keychain', price: 6.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain5.jpg', bg: '#c0c0c0' },
  { id: 176, name: 'Cat Keychain', price: 5.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain6.jpg', bg: '#ff6347' },
  { id: 177, name: 'Flower Keychain', price: 6.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain7.jpg', bg: '#ffb6c1' },
  { id: 178, name: 'Car Keychain', price: 7.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain8.jpg', bg: '#4169e1' },
  { id: 179, name: 'Angel Wings Keychain', price: 6.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain9.jpg', bg: '#ffffff' },
  { id: 180, name: 'Tassel Keychain', price: 7.00, category: 'Lifestyle Items', subcategory: 'Keychains', image: '/images/products/Lifestyle_Items/Keychains/keychain10.jpg', bg: '#dda0dd' },
  
  // Lifestyle Items - Mini Photo Frames (10 items)
  { id: 181, name: 'Gold Mini Frame', price: 8.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame1.jpg', bg: '#ffd700' },
  { id: 182, name: 'Silver Mini Frame', price: 8.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame2.jpg', bg: '#c0c0c0' },
  { id: 183, name: 'Rose Gold Frame', price: 9.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame3.jpg', bg: '#b76e79' },
  { id: 184, name: 'Wooden Mini Frame', price: 7.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame4.jpg', bg: '#8b4513' },
  { id: 185, name: 'White Frame', price: 7.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame5.jpg', bg: '#ffffff' },
  { id: 186, name: 'Heart Shaped Frame', price: 9.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame6.jpg', bg: '#ff69b4' },
  { id: 187, name: 'Floral Border Frame', price: 8.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame7.jpg', bg: '#ffb6c1' },
  { id: 188, name: 'Vintage Frame', price: 10.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame8.jpg', bg: '#daa520' },
  { id: 189, name: 'Modern Black Frame', price: 8.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame9.jpg', bg: '#000000' },
  { id: 190, name: 'Acrylic Frame', price: 9.00, category: 'Lifestyle Items', subcategory: 'Mini Photo Frames', image: '/images/products/Lifestyle_Items/Mini_Photo_Frames/frame10.jpg', bg: '#f0f0f0' },
  
  // Lifestyle Items - Notebooks (10 items)
  { id: 191, name: 'Pocket Notebook', price: 7.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook1.jpg', bg: '#f4a460' },
  { id: 192, name: 'Floral Journal', price: 9.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook2.jpg', bg: '#ffb6c1' },
  { id: 193, name: 'Leather Notebook', price: 12.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook3.jpg', bg: '#8b4513' },
  { id: 194, name: 'Spiral Notebook', price: 6.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook4.jpg', bg: '#4169e1' },
  { id: 195, name: 'Dotted Journal', price: 8.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook5.jpg', bg: '#faf0e6' },
  { id: 196, name: 'Grid Notebook', price: 7.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook6.jpg', bg: '#e0e0e0' },
  { id: 197, name: 'Travel Journal', price: 10.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook7.jpg', bg: '#f0e68c' },
  { id: 198, name: 'Quote Notebook', price: 8.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook8.jpg', bg: '#ffebcd' },
  { id: 199, name: 'Minimalist Notebook', price: 7.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook9.jpg', bg: '#ffffff' },
  { id: 200, name: 'Watercolor Journal', price: 11.00, category: 'Lifestyle Items', subcategory: 'Notebooks', image: '/images/products/Lifestyle_Items/Notebooks/notebook10.jpg', bg: '#add8e6' },
  
  // Lifestyle Items - Pens (10 items)
  { id: 201, name: 'Gel Pen Set', price: 5.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen1.jpg', bg: '#4169e1' },
  { id: 202, name: 'Gold Accent Pen', price: 6.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen2.jpg', bg: '#ffd700' },
  { id: 203, name: 'Fountain Pen', price: 12.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen3.jpg', bg: '#000000' },
  { id: 204, name: 'Ballpoint Pen Set', price: 4.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen4.jpg', bg: '#4169e1' },
  { id: 205, name: 'Rose Gold Pen', price: 7.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen5.jpg', bg: '#b76e79' },
  { id: 206, name: 'Calligraphy Pen', price: 9.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen6.jpg', bg: '#8b4513' },
  { id: 207, name: 'Colorful Pen Set', price: 8.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen7.jpg', bg: '#ff69b4' },
  { id: 208, name: 'Rollerball Pen', price: 6.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen8.jpg', bg: '#c0c0c0' },
  { id: 209, name: 'Pastel Gel Pens', price: 7.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen9.jpg', bg: '#ffb6c1' },
  { id: 210, name: 'Glitter Pen Set', price: 6.00, category: 'Lifestyle Items', subcategory: 'Pens', image: '/images/products/Lifestyle_Items/Pens/pen10.jpg', bg: '#ffd700' },
  
  // Lifestyle Items - Stickers (10 items)
  { id: 211, name: 'Cute Animal Stickers', price: 3.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker1.jpg', bg: '#ffe4e1' },
  { id: 212, name: 'Floral Sticker Pack', price: 4.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker2.jpg', bg: '#f0e68c' },
  { id: 213, name: 'Galaxy Stickers', price: 4.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker3.jpg', bg: '#191970' },
  { id: 214, name: 'Quote Stickers', price: 3.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker4.jpg', bg: '#fafad2' },
  { id: 215, name: 'Food Stickers', price: 4.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker5.jpg', bg: '#ffcccb' },
  { id: 216, name: 'Travel Stickers', price: 4.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker6.jpg', bg: '#87ceeb' },
  { id: 217, name: 'Emoji Stickers', price: 3.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker7.jpg', bg: '#ffeb3b' },
  { id: 218, name: 'Planner Stickers', price: 5.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker8.jpg', bg: '#e6e6fa' },
  { id: 219, name: 'Holographic Stickers', price: 5.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker9.jpg', bg: '#ffd700' },
  { id: 220, name: 'Seasonal Stickers', price: 4.00, category: 'Lifestyle Items', subcategory: 'Stickers', image: '/images/products/Lifestyle_Items/Stickers/sticker10.jpg', bg: '#ff6347' },
  
  // Lifestyle Items - Pocket Mirrors (10 items)
  { id: 221, name: 'Round Pocket Mirror', price: 7.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror1.jpg', bg: '#ffe4b5' },
  { id: 222, name: 'Compact Mirror', price: 8.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror2.jpg', bg: '#dda0dd' },
  { id: 223, name: 'Rose Gold Mirror', price: 9.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror3.jpg', bg: '#b76e79' },
  { id: 224, name: 'Heart Shaped Mirror', price: 8.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror4.jpg', bg: '#ff69b4' },
  { id: 225, name: 'Square Pocket Mirror', price: 7.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror5.jpg', bg: '#c0c0c0' },
  { id: 226, name: 'Floral Pocket Mirror', price: 8.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror6.jpg', bg: '#ffb6c1' },
  { id: 227, name: 'LED Pocket Mirror', price: 12.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror7.jpg', bg: '#ffffff' },
  { id: 228, name: 'Vintage Mirror', price: 10.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror8.jpg', bg: '#daa520' },
  { id: 229, name: 'Magnifying Mirror', price: 9.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror9.jpg', bg: '#f0f0f0' },
  { id: 230, name: 'Embossed Pocket Mirror', price: 8.00, category: 'Lifestyle Items', subcategory: 'Pocket Mirrors', image: '/images/products/Lifestyle_Items/Pocket_Mirrors/mirror10.jpg', bg: '#ffd700' },
  
  // Soft Items - Small Plush Toys (10 items)
  { id: 231, name: 'Mini Teddy Bear', price: 12.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush1.jpg', bg: '#d2691e' },
  { id: 232, name: 'Bunny Plush', price: 13.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush2.jpg', bg: '#ffb6c1' },
  { id: 233, name: 'Unicorn Plush', price: 14.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush3.jpg', bg: '#dda0dd' },
  { id: 234, name: 'Cat Plush', price: 12.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush4.jpg', bg: '#ff6347' },
  { id: 235, name: 'Dog Plush', price: 12.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush5.jpg', bg: '#daa520' },
  { id: 236, name: 'Elephant Plush', price: 13.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush6.jpg', bg: '#778899' },
  { id: 237, name: 'Penguin Plush', price: 12.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush7.jpg', bg: '#000000' },
  { id: 238, name: 'Owl Plush', price: 13.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush8.jpg', bg: '#8b4513' },
  { id: 239, name: 'Panda Plush', price: 14.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush9.jpg', bg: '#000000' },
  { id: 240, name: 'Fox Plush', price: 13.00, category: 'Soft Items', subcategory: 'Small Plush Toys', image: '/images/products/Soft_Items/Small_Plush_Toys/plush10.jpg', bg: '#ff4500' },
  
  // Soft Items - Soft Towels (10 items)
  { id: 241, name: 'Mini Hand Towel', price: 8.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel1.jpg', bg: '#e0ffff' },
  { id: 242, name: 'Embroidered Towel', price: 10.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel2.jpg', bg: '#fff0f5' },
  { id: 243, name: 'Microfiber Towel', price: 9.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel3.jpg', bg: '#add8e6' },
  { id: 244, name: 'Cotton Face Towel', price: 8.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel4.jpg', bg: '#f5f5dc' },
  { id: 245, name: 'Bamboo Towel', price: 11.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel5.jpg', bg: '#90ee90' },
  { id: 246, name: 'Floral Pattern Towel', price: 9.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel6.jpg', bg: '#ffb6c1' },
  { id: 247, name: 'Striped Hand Towel', price: 8.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel7.jpg', bg: '#4682b4' },
  { id: 248, name: 'Personalized Towel', price: 12.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel8.jpg', bg: '#faf0e6' },
  { id: 249, name: 'Monogram Towel', price: 11.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel9.jpg', bg: '#ffffff' },
  { id: 250, name: 'Plush Hand Towel', price: 10.00, category: 'Soft Items', subcategory: 'Soft Towels', image: '/images/products/Soft_Items/Soft_Towels/towel10.jpg', bg: '#ffe4e1' },
  
  // Soft Items - Mini Pillows (10 items)
  { id: 251, name: 'Heart Shaped Pillow', price: 11.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow1.jpg', bg: '#ff69b4' },
  { id: 252, name: 'Cloud Mini Pillow', price: 12.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow2.jpg', bg: '#f0f8ff' },
  { id: 253, name: 'Star Pillow', price: 11.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow3.jpg', bg: '#ffd700' },
  { id: 254, name: 'Moon Pillow', price: 12.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow4.jpg', bg: '#fffaf0' },
  { id: 255, name: 'Round Mini Pillow', price: 10.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow5.jpg', bg: '#ffb6c1' },
  { id: 256, name: 'Square Cushion', price: 11.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow6.jpg', bg: '#e6e6fa' },
  { id: 257, name: 'Animal Face Pillow', price: 13.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow7.jpg', bg: '#cd853f' },
  { id: 258, name: 'Emoji Pillow', price: 12.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow8.jpg', bg: '#ffeb3b' },
  { id: 259, name: 'Floral Mini Pillow', price: 11.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow9.jpg', bg: '#fff0f5' },
  { id: 260, name: 'Velvet Mini Pillow', price: 14.00, category: 'Soft Items', subcategory: 'Mini Pillows', image: '/images/products/Soft_Items/Mini_Pillows/pillow10.jpg', bg: '#9370db' },
  
  // Handmade - Handmade Soaps (10 items)
  { id: 261, name: 'Lavender Handmade Soap', price: 9.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap1.jpg', bg: '#9370db' },
  { id: 262, name: 'Honey Oat Soap', price: 10.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap2.jpg', bg: '#f0e68c' },
  { id: 263, name: 'Rose Clay Soap', price: 11.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap3.jpg', bg: '#ffb6c1' },
  { id: 264, name: 'Charcoal Soap', price: 10.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap4.jpg', bg: '#36454f' },
  { id: 265, name: 'Coconut Milk Soap', price: 9.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap5.jpg', bg: '#fffaf0' },
  { id: 266, name: 'Tea Tree Soap', price: 10.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap6.jpg', bg: '#90ee90' },
  { id: 267, name: 'Goat Milk Soap', price: 11.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap7.jpg', bg: '#fff8dc' },
  { id: 268, name: 'Peppermint Soap', price: 9.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap8.jpg', bg: '#98fb98' },
  { id: 269, name: 'Eucalyptus Soap', price: 10.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap9.jpg', bg: '#90ee90' },
  { id: 270, name: 'Lemon Verbena Soap', price: 10.00, category: 'Handmade', subcategory: 'Handmade Soaps', image: '/images/products/Handmade/Handmade_Soaps/soap10.jpg', bg: '#fffacd' },
  
  // Handmade - Essential Oils (10 items)
  { id: 271, name: 'Peppermint Oil', price: 12.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil1.jpg', bg: '#98ff98' },
  { id: 272, name: 'Eucalyptus Oil', price: 13.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil2.jpg', bg: '#90ee90' },
  { id: 273, name: 'Lavender Oil', price: 14.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil3.jpg', bg: '#e6e6fa' },
  { id: 274, name: 'Tea Tree Oil', price: 13.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil4.jpg', bg: '#90ee90' },
  { id: 275, name: 'Lemon Oil', price: 12.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil5.jpg', bg: '#fff44f' },
  { id: 276, name: 'Rose Oil', price: 16.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil6.jpg', bg: '#ffb6c1' },
  { id: 277, name: 'Orange Oil', price: 12.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil7.jpg', bg: '#ffa500' },
  { id: 278, name: 'Frankincense Oil', price: 15.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil8.jpg', bg: '#d2b48c' },
  { id: 279, name: 'Chamomile Oil', price: 14.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil9.jpg', bg: '#fffacd' },
  { id: 280, name: 'Ylang Ylang Oil', price: 15.00, category: 'Handmade', subcategory: 'Essential Oils', image: '/images/products/Handmade/Essential_Oils/oil10.jpg', bg: '#f0e68c' },
  
  // Handmade - Herbal Packets (10 items)
  { id: 281, name: 'Chamomile Herbs', price: 7.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb1.jpg', bg: '#fffacd' },
  { id: 282, name: 'Dried Lavender', price: 8.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb2.jpg', bg: '#e6e6fa' },
  { id: 283, name: 'Rose Petals', price: 9.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb3.jpg', bg: '#ffb6c1' },
  { id: 284, name: 'Peppermint Leaves', price: 7.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb4.jpg', bg: '#98fb98' },
  { id: 285, name: 'Eucalyptus Leaves', price: 8.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb5.jpg', bg: '#90ee90' },
  { id: 286, name: 'Lemongrass', price: 7.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb6.jpg', bg: '#f0e68c' },
  { id: 287, name: 'Rosemary Sprigs', price: 8.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb7.jpg', bg: '#8fbc8f' },
  { id: 288, name: 'Sage Bundle', price: 9.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb8.jpg', bg: '#9dc183' },
  { id: 289, name: 'Jasmine Flowers', price: 10.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb9.jpg', bg: '#fafad2' },
  { id: 290, name: 'Hibiscus Petals', price: 8.00, category: 'Handmade', subcategory: 'Herbal Packets', image: '/images/products/Handmade/Herbal_Packets/herb10.jpg', bg: '#dc143c' },
  
  // Handmade - Beeswax Candles (10 items)
  { id: 291, name: 'Pure Beeswax Candle', price: 14.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax1.jpg', bg: '#f0e68c' },
  { id: 292, name: 'Honey Scent Beeswax', price: 15.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax2.jpg', bg: '#daa520' },
  { id: 293, name: 'Lavender Beeswax Candle', price: 16.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax3.jpg', bg: '#e6e6fa' },
  { id: 294, name: 'Rose Beeswax Candle', price: 16.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax4.jpg', bg: '#ffb6c1' },
  { id: 295, name: 'Eucalyptus Beeswax', price: 15.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax5.jpg', bg: '#90ee90' },
  { id: 296, name: 'Cinnamon Beeswax Candle', price: 15.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax6.jpg', bg: '#d2691e' },
  { id: 297, name: 'Vanilla Beeswax Candle', price: 14.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax7.jpg', bg: '#f5f5dc' },
  { id: 298, name: 'Peppermint Beeswax', price: 15.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax8.jpg', bg: '#98fb98' },
  { id: 299, name: 'Citrus Beeswax Candle', price: 15.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax9.jpg', bg: '#ffa500' },
  { id: 300, name: 'Unscented Beeswax Candle', price: 13.00, category: 'Handmade', subcategory: 'Beeswax Candles', image: '/images/products/Handmade/Beeswax_Candles/beeswax10.jpg', bg: '#f0e68c' },
  
  // Accessories - Bracelets (10 items)
  { id: 301, name: 'Rose Gold Bracelet', price: 22.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet1.jpg', bg: '#b76e79' },
  { id: 302, name: 'Beaded Bracelet', price: 18.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet2.jpg', bg: '#ff69b4' },
  { id: 303, name: 'Silver Chain Bracelet', price: 20.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet3.jpg', bg: '#c0c0c0' },
  { id: 304, name: 'Charm Bracelet', price: 25.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet4.jpg', bg: '#ffd700' },
  { id: 305, name: 'Leather Bracelet', price: 19.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet5.jpg', bg: '#8b4513' },
  { id: 306, name: 'Friendship Bracelet', price: 15.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet6.jpg', bg: '#ff6347' },
  { id: 307, name: 'Crystal Bracelet', price: 24.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet7.jpg', bg: '#dda0dd' },
  { id: 308, name: 'Bangle Bracelet', price: 21.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet8.jpg', bg: '#ffd700' },
  { id: 309, name: 'Pearl Bracelet', price: 28.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet9.jpg', bg: '#f0ead6' },
  { id: 310, name: 'Infinity Bracelet', price: 20.00, category: 'Accessories', subcategory: 'Bracelets', image: '/images/products/Accessories/Bracelets/bracelet10.jpg', bg: '#c0c0c0' },
  
  // Accessories - Necklaces (10 items)
  { id: 311, name: 'Pendant Necklace', price: 28.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace1.jpg', bg: '#ffd700' },
  { id: 312, name: 'Pearl Necklace', price: 35.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace2.jpg', bg: '#f0ead6' },
  { id: 313, name: 'Heart Necklace', price: 25.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace3.jpg', bg: '#ff69b4' },
  { id: 314, name: 'Layered Necklace', price: 30.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace4.jpg', bg: '#ffd700' },
  { id: 315, name: 'Chain Necklace', price: 22.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace5.jpg', bg: '#c0c0c0' },
  { id: 316, name: 'Crystal Necklace', price: 32.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace6.jpg', bg: '#dda0dd' },
  { id: 317, name: 'Locket Necklace', price: 27.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace7.jpg', bg: '#ffd700' },
  { id: 318, name: 'Initial Necklace', price: 24.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace8.jpg', bg: '#c0c0c0' },
  { id: 319, name: 'Choker Necklace', price: 26.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace9.jpg', bg: '#000000' },
  { id: 320, name: 'Statement Necklace', price: 38.00, category: 'Accessories', subcategory: 'Necklaces', image: '/images/products/Accessories/Necklaces/necklace10.jpg', bg: '#ff4500' },
  
  // Accessories - Earrings (10 items)
  { id: 321, name: 'Gold Hoop Earrings', price: 20.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring1.jpg', bg: '#ffd700' },
  { id: 322, name: 'Stud Earrings', price: 16.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring2.jpg', bg: '#c0c0c0' },
  { id: 323, name: 'Pearl Earrings', price: 24.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring3.jpg', bg: '#f0ead6' },
  { id: 324, name: 'Drop Earrings', price: 22.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring4.jpg', bg: '#dda0dd' },
  { id: 325, name: 'Crystal Earrings', price: 25.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring5.jpg', bg: '#ff69b4' },
  { id: 326, name: 'Dangle Earrings', price: 21.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring6.jpg', bg: '#ffd700' },
  { id: 327, name: 'Tassel Earrings', price: 19.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring7.jpg', bg: '#ff6347' },
  { id: 328, name: 'Geometric Earrings', price: 18.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring8.jpg', bg: '#000000' },
  { id: 329, name: 'Heart Earrings', price: 17.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring9.jpg', bg: '#ff69b4' },
  { id: 330, name: 'Flower Earrings', price: 20.00, category: 'Accessories', subcategory: 'Earrings', image: '/images/products/Accessories/Earrings/earring10.jpg', bg: '#ffb6c1' },
  
  // Accessories - Watches (10 items)
  { id: 331, name: 'Minimalist Watch', price: 45.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch1.jpg', bg: '#000000' },
  { id: 332, name: 'Rose Gold Watch', price: 50.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch2.jpg', bg: '#b76e79' },
  { id: 333, name: 'Silver Watch', price: 48.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch3.jpg', bg: '#c0c0c0' },
  { id: 334, name: 'Gold Watch', price: 55.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch4.jpg', bg: '#ffd700' },
  { id: 335, name: 'Leather Strap Watch', price: 42.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch5.jpg', bg: '#8b4513' },
  { id: 336, name: 'Mesh Band Watch', price: 46.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch6.jpg', bg: '#c0c0c0' },
  { id: 337, name: 'Digital Watch', price: 38.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch7.jpg', bg: '#000000' },
  { id: 338, name: 'Sports Watch', price: 40.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch8.jpg', bg: '#4169e1' },
  { id: 339, name: 'Vintage Watch', price: 52.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch9.jpg', bg: '#daa520' },
  { id: 340, name: 'Bracelet Watch', price: 47.00, category: 'Accessories', subcategory: 'Watches', image: '/images/products/Accessories/Watches/watch10.jpg', bg: '#ffd700' },
  
  // Accessories - Hair Clips (10 items)
  { id: 341, name: 'Pearl Hair Clips', price: 8.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip1.jpg', bg: '#ffffff' },
  { id: 342, name: 'Butterfly Hair Clips', price: 9.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip2.jpg', bg: '#ff69b4' },
  { id: 343, name: 'Flower Hair Clips', price: 8.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip3.jpg', bg: '#ffb6c1' },
  { id: 344, name: 'Gold Hair Clips', price: 10.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip4.jpg', bg: '#ffd700' },
  { id: 345, name: 'Rhinestone Hair Clips', price: 11.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip5.jpg', bg: '#dda0dd' },
  { id: 346, name: 'Bow Hair Clips', price: 7.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip6.jpg', bg: '#ff6347' },
  { id: 347, name: 'Star Hair Clips', price: 8.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip7.jpg', bg: '#ffd700' },
  { id: 348, name: 'Geometric Hair Clips', price: 9.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip8.jpg', bg: '#c0c0c0' },
  { id: 349, name: 'Crystal Hair Clips', price: 12.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip9.jpg', bg: '#add8e6' },
  { id: 350, name: 'Vintage Hair Clips', price: 10.00, category: 'Accessories', subcategory: 'Hair Clips', image: '/images/products/Accessories/Hair_Clips/clip10.jpg', bg: '#daa520' },
  
  // Tech - Earbuds (10 items)
  { id: 351, name: 'Wireless Earbuds', price: 35.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud1.jpg', bg: '#000000' },
  { id: 352, name: 'Pink Earbuds', price: 32.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud2.jpg', bg: '#ff69b4' },
  { id: 353, name: 'White Earbuds', price: 33.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud3.jpg', bg: '#ffffff' },
  { id: 354, name: 'Sport Earbuds', price: 38.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud4.jpg', bg: '#4169e1' },
  { id: 355, name: 'Noise Cancelling Earbuds', price: 42.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud5.jpg', bg: '#000000' },
  { id: 356, name: 'Rose Gold Earbuds', price: 36.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud6.jpg', bg: '#b76e79' },
  { id: 357, name: 'True Wireless Earbuds', price: 40.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud7.jpg', bg: '#c0c0c0' },
  { id: 358, name: 'Gaming Earbuds', price: 37.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud8.jpg', bg: '#ff4500' },
  { id: 359, name: 'Compact Earbuds', price: 30.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud9.jpg', bg: '#000000' },
  { id: 360, name: 'Premium Earbuds', price: 45.00, category: 'Tech', subcategory: 'Earbuds', image: '/images/products/Tech/Earbuds/earbud10.jpg', bg: '#ffd700' },
  
  // Tech - Phone Covers (10 items)
  { id: 361, name: 'Clear Phone Case', price: 12.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case1.jpg', bg: '#f0f0f0' },
  { id: 362, name: 'Glitter Phone Cover', price: 15.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case2.jpg', bg: '#ffd700' },
  { id: 363, name: 'Marble Phone Case', price: 14.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case3.jpg', bg: '#f5f5f5' },
  { id: 364, name: 'Floral Phone Cover', price: 13.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case4.jpg', bg: '#ffb6c1' },
  { id: 365, name: 'Silicone Phone Case', price: 11.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case5.jpg', bg: '#ff69b4' },
  { id: 366, name: 'Leather Phone Cover', price: 18.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case6.jpg', bg: '#8b4513' },
  { id: 367, name: 'Holographic Case', price: 16.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case7.jpg', bg: '#dda0dd' },
  { id: 368, name: 'Matte Black Case', price: 13.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case8.jpg', bg: '#000000' },
  { id: 369, name: 'Gradient Phone Case', price: 14.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case9.jpg', bg: '#ff6347' },
  { id: 370, name: 'Wallet Phone Cover', price: 20.00, category: 'Tech', subcategory: 'Phone Covers', image: '/images/products/Tech/Phone_Covers/case10.jpg', bg: '#8b4513' },
  
  // Tech - Power Bank (10 items)
  { id: 371, name: 'Compact Power Bank', price: 25.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank1.jpg', bg: '#4169e1' },
  { id: 372, name: 'Mini Power Bank', price: 22.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank2.jpg', bg: '#ff69b4' },
  { id: 373, name: 'High Capacity Power Bank', price: 32.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank3.jpg', bg: '#000000' },
  { id: 374, name: 'Wireless Power Bank', price: 35.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank4.jpg', bg: '#ffffff' },
  { id: 375, name: 'Solar Power Bank', price: 38.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank5.jpg', bg: '#228b22' },
  { id: 376, name: 'Slim Power Bank', price: 24.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank6.jpg', bg: '#c0c0c0' },
  { id: 377, name: 'Fast Charging Power Bank', price: 30.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank7.jpg', bg: '#ff4500' },
  { id: 378, name: 'Rose Gold Power Bank', price: 28.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank8.jpg', bg: '#b76e79' },
  { id: 379, name: 'LED Power Bank', price: 26.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank9.jpg', bg: '#4169e1' },
  { id: 380, name: 'Premium Power Bank', price: 40.00, category: 'Tech', subcategory: 'Power Bank', image: '/images/products/Tech/Power_Bank/powerbank10.jpg', bg: '#000000' },
  
  // Tech - Phone Stand (10 items)
  { id: 381, name: 'Adjustable Phone Stand', price: 10.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand1.jpg', bg: '#c0c0c0' },
  { id: 382, name: 'Wooden Phone Stand', price: 12.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand2.jpg', bg: '#8b4513' },
  { id: 383, name: 'Foldable Phone Stand', price: 11.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand3.jpg', bg: '#000000' },
  { id: 384, name: 'Desktop Phone Holder', price: 9.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand4.jpg', bg: '#ffffff' },
  { id: 385, name: 'Rotating Phone Stand', price: 13.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand5.jpg', bg: '#4169e1' },
  { id: 386, name: 'Aluminum Phone Stand', price: 14.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand6.jpg', bg: '#c0c0c0' },
  { id: 387, name: 'Magnetic Phone Stand', price: 15.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand7.jpg', bg: '#000000' },
  { id: 388, name: 'Bedside Phone Stand', price: 11.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand8.jpg', bg: '#ff69b4' },
  { id: 389, name: 'Car Phone Stand', price: 12.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand9.jpg', bg: '#000000' },
  { id: 390, name: 'Multi-Angle Phone Stand', price: 10.00, category: 'Tech', subcategory: 'Phone Stand', image: '/images/products/Tech/Phone_Stand/stand10.jpg', bg: '#ffd700' },
  
  // Snacks - Chips (10 items)
  { id: 391, name: 'Potato Chips', price: 4.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip1.jpg', bg: '#ffd700' },
  { id: 392, name: 'Veggie Chips', price: 5.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip2.jpg', bg: '#90ee90' },
  { id: 393, name: 'BBQ Chips', price: 4.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip3.jpg', bg: '#d2691e' },
  { id: 394, name: 'Sour Cream Chips', price: 4.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip4.jpg', bg: '#f5f5dc' },
  { id: 395, name: 'Salt & Vinegar Chips', price: 4.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip5.jpg', bg: '#f0e68c' },
  { id: 396, name: 'Cheese Chips', price: 5.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip6.jpg', bg: '#ffd700' },
  { id: 397, name: 'Spicy Chips', price: 4.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip7.jpg', bg: '#ff4500' },
  { id: 398, name: 'Sweet Potato Chips', price: 5.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip8.jpg', bg: '#ff8c00' },
  { id: 399, name: 'Baked Chips', price: 4.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip9.jpg', bg: '#daa520' },
  { id: 400, name: 'Kettle Chips', price: 5.00, category: 'Snacks', subcategory: 'Chips', image: '/images/products/Snacks/Chips/chip10.jpg', bg: '#cd853f' },
  
  // Snacks - Nuts (10 items)
  { id: 401, name: 'Mixed Nuts Pack', price: 7.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut1.jpg', bg: '#d2691e' },
  { id: 402, name: 'Honey Roasted Almonds', price: 8.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut2.jpg', bg: '#daa520' },
  { id: 403, name: 'Cashews', price: 9.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut3.jpg', bg: '#f5deb3' },
  { id: 404, name: 'Roasted Peanuts', price: 6.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut4.jpg', bg: '#cd853f' },
  { id: 405, name: 'Pistachios', price: 10.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut5.jpg', bg: '#90ee90' },
  { id: 406, name: 'Walnuts', price: 8.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut6.jpg', bg: '#8b4513' },
  { id: 407, name: 'Pecans', price: 9.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut7.jpg', bg: '#a0522d' },
  { id: 408, name: 'Macadamia Nuts', price: 11.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut8.jpg', bg: '#f5deb3' },
  { id: 409, name: 'Trail Mix', price: 7.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut9.jpg', bg: '#d2691e' },
  { id: 410, name: 'Spiced Nuts Mix', price: 8.00, category: 'Snacks', subcategory: 'Nuts', image: '/images/products/Snacks/Nuts/nut10.jpg', bg: '#cd853f' },
  
  // Snacks - Crackers (10 items)
  { id: 411, name: 'Cheese Crackers', price: 5.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker1.jpg', bg: '#f5deb3' },
  { id: 412, name: 'Whole Grain Crackers', price: 6.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker2.jpg', bg: '#d2b48c' },
  { id: 413, name: 'Butter Crackers', price: 5.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker3.jpg', bg: '#ffd700' },
  { id: 414, name: 'Sesame Crackers', price: 6.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker4.jpg', bg: '#f0e68c' },
  { id: 415, name: 'Multigrain Crackers', price: 6.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker5.jpg', bg: '#daa520' },
  { id: 416, name: 'Rice Crackers', price: 5.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker6.jpg', bg: '#fff8dc' },
  { id: 417, name: 'Herb Crackers', price: 6.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker7.jpg', bg: '#90ee90' },
  { id: 418, name: 'Sourdough Crackers', price: 7.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker8.jpg', bg: '#d2b48c' },
  { id: 419, name: 'Wheat Crackers', price: 5.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker9.jpg', bg: '#daa520' },
  { id: 420, name: 'Gluten-Free Crackers', price: 7.00, category: 'Snacks', subcategory: 'Crackers', image: '/images/products/Snacks/Crackers/cracker10.jpg', bg: '#f5deb3' },
  
  // Flowers (no subcategories)
  { id: 421, name: 'Mini Dried Bouquet', price: 15.00, category: 'Flowers', subcategory: '', image: '/images/products/Flowers/flower1.jpg', bg: '#f5f5f5' },
  { id: 422, name: 'Rose Bouquet', price: 25.00, category: 'Flowers', subcategory: '', image: '/images/products/Flowers/flower2.jpg', bg: '#ffe6f0' },
];

export default function GiftSelector({ selectedGifts, onAddGift, onRemoveGift }) {
  const [activeCategory, setActiveCategory] = useState('Sweet Treats');
  const [activeSubcategory, setActiveSubcategory] = useState('Chocolates');
  const [showSubcategories, setShowSubcategories] = useState(false);

  const filteredGifts = () => {
    if (activeSubcategory) {
      return gifts.filter(gift => 
        gift.category === activeCategory && gift.subcategory === activeSubcategory
      );
    }
    return gifts.filter(gift => gift.category === activeCategory);
  };

  const getGiftQuantity = (giftId) => {
    const gift = selectedGifts.find(g => g.id === giftId);
    return gift ? gift.quantity : 0;
  };

  const handleCategoryClick = (category) => {
    if (category.subcategories.length > 0) {
      // Toggle subcategories dropdown
      if (activeCategory === category.name) {
        setShowSubcategories(!showSubcategories);
      } else {
        setActiveCategory(category.name);
        setActiveSubcategory(category.subcategories[0]); // Set first subcategory
        setShowSubcategories(true);
      }
    } else {
      // For categories without subcategories
      setActiveCategory(category.name);
      setActiveSubcategory('');
      setShowSubcategories(false);
    }
  };

  const handleSubcategoryClick = (categoryName, subcategory) => {
    setActiveCategory(categoryName);
    setActiveSubcategory(subcategory);
    setShowSubcategories(false);
  };

  return (
    <div className="gift-selector-section">
      <h2>Fill it with Gifts</h2>
      
      <div className="category-tabs">
        {categories.map(category => (
          <div 
            key={category.name}
            className="category-wrapper"
          >
            <button
              className={`category-tab ${activeCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
            
            {category.subcategories.length > 0 && showSubcategories && activeCategory === category.name && (
              <div className="subcategory-dropdown">
                {category.subcategories.map(subcategory => (
                  <button
                    key={subcategory}
                    className={`subcategory-item ${activeSubcategory === subcategory ? 'active' : ''}`}
                    onClick={() => handleSubcategoryClick(category.name, subcategory)}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="gifts-grid">
        {filteredGifts().map(gift => {
          const quantity = getGiftQuantity(gift.id);
          return (
            <div key={gift.id} className="gift-item">
              <div className="gift-image-wrapper" style={{ backgroundColor: gift.bg }}>
                <img src={gift.image} alt={gift.name} />
              </div>
              <div className="gift-info">
                <h4>{gift.name}</h4>
                <p className="gift-price">${gift.price.toFixed(2)}</p>
              </div>
              {quantity > 0 ? (
                <div className="quantity-controls">
                  <button onClick={() => onRemoveGift(gift)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => onAddGift(gift)}>+</button>
                </div>
              ) : (
                <button 
                  className="add-gift-btn"
                  onClick={() => onAddGift(gift)}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 5v10M5 10h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
