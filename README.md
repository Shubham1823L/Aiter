# Defining Models

1. A restaurant has a single menu
2. A menu has multiple categories: 
  1. Starters
  2. Main Course
  3. Desserts, etc...
3. All categories:
  1. Are UNIQUE
  2. Have no items in common => Categories have one to many relationships => 1 item is bound to 1 category which is bound to many items

4. An item can have the following attributes/properties:
  1. Name (UNIQUE)
  2. Price
  3. Traits => Spicy, Sweet, Top Rated, Most ordered, Most reordered,etc ...


Therefore models are: 
1. Category(Name:UNIQUE,one to many with items, maybe an internal order if ai cant resolve what should be eaten first)
2. Item(Name:UNIQUE, many to one with categories, PRICE, TRAITS)


We can expand the item/product logic/model later, for now , we keep it simple.