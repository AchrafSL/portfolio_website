---
title: "Chapter 3_Collections"
description: "Deep dive into Python collections: Lists, Tuples, Sets, and Dictionaries."
pubDate: "Jan 26 2026"
---

# I. Python Collections

Python collections are built-in container data types used to store
multiple values in a single variable.

Main collection types:
- list   → mutable, ordered
- tuple  → immutable, ordered
- set    → mutable, unordered, unique elements
- dict   → mutable, ordered (Python 3.7+)


---
---
<br><br><br><br>


# II. Lists (Mutable, Ordered, Iterable)

## 1. Creation:

```python
list1 = [ ]
list2 = list()
```

## 2. Access:

### 2.1 Length:
```python
len(list1)
```

---

### 2.2 By Index:
```python
list1[i]
```

---

### 2.3 By slicing:
```python
list1[i:j]
```

---

### 2.4 Membership:
```python
val in list1
```
> `not in` also exists

---

### 2.5 Looping:
```python
for i in list1 # method 1

for i in range(len(list1)) # method 2

while ( i < len(list1) ): # method 3
```

---

## 3. Modification:

### 3.1 Change Items:

#### 3.1.1 Change item value:
```python
list1[i] = new_val
```

---

#### 3.1.2 Change range of items values:
```python
list1[i:j] = list2
# ⚠️ If len(list2) is different from (j - i), the list size will change accordingly.

# Example:
list1 = ['a', 'b', 'c','d']
list1[0:2] = [0]
print(list1) # [0, 'c', 'd']
```
---


### 3.2 Add Items:

#### 3.2.1 Insert an item to the end
```python
list1.append(val) 
```

---

#### 3.2.2 Insert an item at a specific index
```python
list1.insert(index, val)
```

---

#### 3.2.3 Append elements from another iterable ( list, tuple, dict, ... )
```python
list1.extend(iterable1)
# If iterable1 is a dict, only keys are added.
```

---

### 3.3 Remove Items:

#### 3.3.1 Remove an item from the end:
```python
list1.pop()
```

---

#### 3.3.2 Remove val first occurrence:
```python
list1.remove(val)
```

---

#### 3.3.3 Remove an item from a specific index:
```python
list1.pop(index)
del list1[index]
```   

---

#### 3.3.4 Remove the entire list:
```python
del list1
```

---

#### 3.3.5 Clear list items:
```python
list1.clear()
```

---


## 4. List Comprehension:
> List comprehension offers a shorter syntax when you want to create a new list based on the values of an existing list.
>
>
>```python
>newlist = [expression for item in iterable if condition]
># the `if` part is optional
># which is useful for filtering the iterable items.
># you can also add a condition as an expression to control the outcome
>```

```python
#Examples:
newlist = [x for x in range(10)]
newlist = [x for x in range(10) if x < 5]
newlist = [x if x != "banana" else "orange" for x in fruits] # Expression here is a shorthand if-else
```

## 5. Sort Lists:

### 5.1 `.sort([reverse = True], [key = keyFunc])`
```python
# key func is a function that returns a number/thing that will be used to sort the list
# Example:
list1.sort(key = str.lower) # case insensitive sort.
```

---

### 5.2 Reverse order:
```python
list1.reverse()
```

---

## 6. Copy Lists:

### 6.1 `.copy()`:
```python
list2 = list1.copy()
```

---

### 6.2 `list()`:
```python
list2 = list(list1)
```

---

### 6.3 Using slicing:
```python
list2 = list1[:]
```

---

## 7. Join Lists:

### 7.1 `+ Operator`:
```python
list3 = list1 + list2
```

---

### 7.2 `.extend()`:
```python
list1.extend(list2)
```

---

### 7.3 `for loop + append()`:
```python
for x in list2:
    list1.append(x)
```

---


## 8. Other methods:
```python
list1.index( val ) # First occurrence index
list1.count( val ) 
```



---
---
<br><br><br><br>


# III. Tuples (Immutable, Ordered, Iterable)

> **Note**:
> Tuples items are unchangeable but there is a way around it : tuple ->(convert) list -> modify list -> tuple 
>
> Tuples are immutable but can contain mutable objects.

## 1. Creation:
```python

tuple1 = ('a', 'b', 'c') # multiple items
tuple2 = ('a', ) # Single item
tuple3 = ('a') # ❌ False not a tuple, type = str

```

## 2. Access:

### 2.1 Length:
```python
len(tuple1)
```

---

### 2.2 By Index:
```python
tuple1[i]
```

---

### 2.3 By slicing:
```python
tuple1[i:j]
```

---

### 2.4 Membership:
```python
val in tuple1
```
> `not in` also exists

---

### 2.5 Looping:
```python
for i in tuple1 # method 1

for i in range(len(tuple1)) # method 2

while ( i < len(tuple1) ): # method 3
```

---


## 3. Modification:

### 3.1 Change item value
```python
x = ('a', 'b')
l1 = list(x)
l1[0] = 0
x = tuple(l1)
```

---

### 3.2 Add items:
```python
x = ('a','b')
l1 = list(x)
l1.append('c')
x = tuple(l1)
```

---

### 3.3 Add tuple to an existing tuple
```python
x = ('a', 'b')
y = ('c', 'd')

z = x + y # creates another object

```

---

### 3.4 Remove items:
```python
x = ('a', 'b')
l1 = list(x)
l1.remove('a')
x = tuple(l1)
```

---

### 3.5 Delete tuple:
```python
del thisTuple
```

---

## 4. Unpacking

> Using Asterisk `*`
```python
a, *b, c = [1, 2, 3, 4]
print(a, b, c)  # 1 [2, 3] 4
```

## 5. Join, multiply tuples
```python
tuple3 = tuple1 + tuple2 # join tuples

tuple4 = tuple1 * 3 # repeat items

```

## 6. Other methods:
```python
tuple1.count(val)

tuple1.index(val)

```



---
---
<br><br><br><br>


# IV. Sets (Mutable, Unordered, Iterable)

> **Note**
> Sets items should be immutable
> tuples containing mutable objects are NOT allowed inside sets.
>
>```python
> # 1 is considered as True, same thing for 0 for sets
> {1, True}  # only one element
> {0, False} # only one element
>```

## 1. Creation:
```python
set1 = {'a', 'b', 'c'}
set2 = set(('a', 'b', 'c'))
```

## 2. Access:

> **Note**
> set items can't be accessed by index/value nor slicing.
> but it can be accessed using a for loop

### 2.1 For loop:
```python
# this is the only way to access and to loop through a set.
for x in set1:
    print(x)
```

---

### 2.2 Membership:
```python
val in set1
```
> `not in` also exists

---

## 3. Modification:

### 3.1 add item:
```python
set1.add(val)
```

---

### 3.2 add items from another iterable:
```python
set1.update( iterable1 )
```

---

### 3.3 Remove item:
```python
set1.remove(val) # if the val doesn't exist it raises an error
set1.discard(val) # safe option for .remove()
set1.pop() # remove a random val because sets are unordered.
```

---

### 3.4 Clear set:
```python
set1.clear() 
```

---

## 4. Join Sets:

### 4.1 UNION:
```python
set3 = set1.union(set2)
set3 = set1 | set2

set1.update( set2 ) # modifty set1
```

---

### 4.2 INTERSECT:
```python
set3 = set1.intersection(set2)
set3 = set1 & set2

set1.intersection_update(set2)

```

---

### 4.3 DIFFERENCE:
```python
set3 = set1.difference(set2)
set3 = set1 - set2

set1.difference_update(set2)

# Symeteric difference: keep elements, that are not present in both sets
set3 = set1.symmetric_difference(set2)

set1.symmetric_difference_update(set2)
```

---

## 5. FrozenSet (Immutable version of sets)

### 5.1 Creation:
```python
x = frozenset({'a', 'b'})
```

---

### 5.2 Methods:
```python
# return NEW frozensets
x.copy() # returns the same object because frozenSets are immutable.
x.union(other)
x.intersection(other)
x.difference(other)
x.symmetric_difference(other)

# return booleans 
x.issubset(other)
x.issuperset(other)
x.isdisjoint(other)

```


---
---
<br><br><br><br>


# V. Dicts (Mutable, Ordered, Iterable)

## 1. Creation:

> **Note**
> 1) dict keys : immutables 
> 2) Dictionaries preserve insertion order since Python 3.7+


```python
dict1 = {k0:v0, k1:v1, ...}
dict2 = dict( k0 = v0, k1 = v1)
```

## 2. Access:

### 2.1 Length:
```python
len(dict1)
```

---

### 2.2 By key:
```python
dict1[key1]
```

---

### 2.3 By `.get()`:
```python
dict1.get(key1)
dict1.get(key1, default)     # Custom default value

```

---

### 2.4 get keys:
```python
keys = dict1.keys() # returns a dict_keys view (iterable, not a list)
```

---

### 2.5 get values:
```python
values = dict1.values() # returns a dict_values view
```

---

### 2.6 get elements as list of tuples: `[(k0,v0), (k1,v1), ... ]` (as a view, not a list)
```python
dict1.items()
```

> **Note**:
> Views are updated automaticaly

### 2.7 Membership:
```python
key1 in dict1 # checks keys only, not values
```
> `not in` also exists


---


### 2.8 Looping:
```python
for k,v in dict1.items() # method 1

for k in dict1.keys() # method 2 
# or 
for k in dict1 # method 2'


for v in dict1.values() #method 3
```

---

## 3. Modification:


### 3.1 Change/add items:

```python
dict1[ key1 ] = val
dict1.update({key1 : val}) # Can update multiple keys at once

# For both methods:
# Add the item if key1 does not exist.
# Update the value if key1 already exists
```

---

### 3.2 Remove items:
```python
dict1.pop( key1 ) # Remove item by key

dict1.popitem() # removes the last inserted item 

del dict1[ key1 ]

del dict1 # Delete entire dict

dict1.clear()
```

---


## 4. Copy a Dictionary:

```python
dict2 = dict1.copy()

dict2 = dict(dict1)

```

> **Note**
>
> there is also what so called **nested dictionaries** 
>
> example: { "user1":{ "name":"achraf", "lastName":"SL" }, ... }
>
>  dict1["user1"]["name"] 



## 5. Dictionary comprehension:
```python
{key_expr: value_expr for item in iterable [if condition]}
```


## 6. Dictionary Methods:
```python
dict1 = dict.fromkeys(keys, only_one_value) # Returns a dictionary with the specified keys and value 
# if `only_one_value` is not specified it becomes None
value =  dict1.setdefault(key, val) # Returns the value of the specified key. If the key does not exist: insert the key, with the specified value and return it.
```

> **Note `dict.fromkeys()` if `only_one_value` is mutable**
> ```python
>d = dict.fromkeys(['a', 'b'], [])
>d['a'].append(1)
>print(d)  # {'a': [1], 'b': [1]}
>```
