---
title: "Introduction to NumPy"
description: "A comprehensive guide to NumPy, covering array creation, indexing, slicing, data types, and essential array operations for efficient numerical computing in Python."
pubDate: "Feb 05 2026"
---


# I. Getting Started

> NumPy stands for Numerical Python.
>
> NumPy is a Python library used for working with arrays.
>
> It also has functions for working in domain of linear algebra, fourier transform, and matrices.
>
> NumPy provides an array object optimized for fast numerical operations, often tens of times faster than Python lists for math-heavy tasks.


## 1. Why Python lists fall short (Motivation)

```python
>>> height = [1.73, 1.68, 1.71, 1.89, 1.79]
>>> height
```
`[1.73, 1.68, 1.71, 1.89, 1.79]`

```python
>>> weight = [65.4, 59.2, 63.6, 88.4, 68.7]
>>> weight
```
` [65.4, 59.2, 63.6, 88.4, 68.7]`

```python
>>> weight / height ** 2
```
`TypeError: unsupported operand type(s) for ** or pow(): 'list' and 'int'`

---

This fails because:
- lists don’t support element-wise math
- ** and / have no meaning for lists



## 2. NumPy arrays and vectorized operations

NumPy solves this by allowing operations over entire arrays at once (vectorization).

```python
import numpy as np
np_height = np.array(height)
print(np_height) # array([1.73, 1.68, 1.71, 1.89, 1.79])

np_weight = np.array(weight)
print(np_weight) # array([65.4, 59.2, 63.6, 88.4, 68.7])


bmi = np_weight / np_height ** 2
print(bmi) # array([21.85171573, 20.97505669, 21.75028214, 24.7473475 , 21.44127836])

```
Now the math works because:
- operations are applied element by element
- no loops are needed
- performance is much higher

---

## 3. Python list vs NumPy array behavior

Same syntax. Very different meaning.
```python
py_list = [1, 2, 3]
np_array = np.array([1, 2, 3])

print(py_list + py_list) # [1, 2, 3, 1, 2, 3]

print(np_array + np_array) # [2 4 6] (array([2, 4, 6]) in IPython/Jupyter)
```
Why?
- lists: + means concatenation
- NumPy arrays: + means element-wise addition


## 4. Subsetting and boolean masking (NumPy superpower)


```python
bmi[0]          # single element,  21.85
bmi > 23        # boolean array (boolean mask), [False, False, False, True, False]
bmi[bmi > 23]   # filtered values (apply mask), array([24.74])
```

> **Note:** Boolean masking will be explained later with more details!

## 5. Data type rule (Constraint, not a feature)

NumPy arrays contain only one data type.

```python
np.array([1.0, 'is', True]) # array(['1.0', 'is', 'True'], dtype='<U32')
```
NumPy chooses a single common type, here strings, and converts everything.

---
---
<br><br><br><br>


# II. Creating, Indexing, and Slicing Arrays

## 1. Creating Arrays
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

print(arr) # [1 2 3 4 5]

print(type(arr)) # <class 'numpy.ndarray'>
```

---

To create an `ndarray`, we can pass a `list`, `tuple` or any `array-like object` into the `array()` method, and it will be converted into an `ndarray`:
```python
import numpy as np

arr = np.array((1, 2, 3, 4, 5)) # 1-D Array

print(arr)
```

---

**2-D Arrays**
```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr)
```

---
**Higher Dimensional Arrays**
```python
import numpy as np

arr = np.array([1, 2, 3, 4], ndmin=5)

print(arr) # [[[[[1 2 3 4]]]]]
print('number of dimensions :', arr.ndim) # number of dimensions : 5

```


## 2. Array Indexing

```python
import numpy as np

arr_1D = np.array([1, 2, 3, 4])
arr_2D = np.array([[1,2,3,4,5], [6,7,8,9,10]])

print(arr_1D[0])
print('5th element on 2nd row: ', arr_2D[1, 4]) # <=> arr_2D[1][4]


print('Last element from 2nd dim: ', arr_2D[1, -1]) # Negative indexing
```

## 3. Array Slicing

**1-D Arrays**
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7])

# includes start index, excludes end index
print(arr[1:5])      # Output: [2 3 4 5]

# Slice from index 4 to the end
print(arr[4:])       # Output: [5 6 7]

# Slice from the beginning to index 4 (not included)
print(arr[:4])       # Output: [1 2 3 4]

# Negative Slicing: index 3 from the end to index 1 from the end
print(arr[-3:-1])    # Output: [5 6]

# (Step = 2) Return every other element from index 1 to 5
print(arr[1:5:2])    # Output: [2 4]

# (Step = 2) Return every other element from the entire array 
print(arr[::2])      # Output: [1 3 5 7]
```

**2-D Arrays**
```python
import numpy as np

arr_2d = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])

# From the second element (row 1), slice index 1 to 4
print(arr_2d[1, 1:4])   # Output: [7 8 9]

# From both elements (rows 0 and 1), return index 2
print(arr_2d[0:2, 2])   # Output: [3 8]

# From both elements, slice index 1 to 4 (returns a 2-D array)
print(arr_2d[0:2, 1:4]) 
# Output:
# [[2 3 4]
#  [7 8 9]]

```

## 4. Subsetting/Filtering using boolean masking

```python
array = np.array([1, 3, 6, 8, 2])

cond = array > 5 # Boolean mask (vectorized comparison) -> (Creates a boolean array by applying the condition to each element)
array[cond] # Boolean indexing: filters array using the mask -> (Returns only the elements that satisfy the condition)
```

> In NumPy, you filter an array using a boolean index list. (called boolean mask)
> Boolean masking lets you filter arrays without loops.

---
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7])

filter_arr = arr % 2 == 0   # boolean mask
# You can use any boolean array or list
# as long as its length matches the array being indexed

newarr = arr[filter_arr]

print(filter_arr)
print(newarr)

```

> ⚠️ **Reminder:** The boolean mask must have the **same shape** as the array being indexed.

---
---
<br><br><br><br>


# III. Data Types
```python
import numpy as np

arr = np.array([1, 2, 3])
print(arr.dtype)   # int64
```

You can explicitly specify the data type:
```python
arr = np.array([1, 2, 3], dtype=float)
print(arr)         # [1. 2. 3.]
print(arr.dtype)   # float64

```
---
Converting Data Type on Existing Arrays:`.astype(type)`
```python
import numpy as np

arr = np.array([1.1, 2.1, 3.1])

newarr = arr.astype(int)

print(newarr) # [1 2 3]
print(newarr.dtype) # int64
```

---
---
<br><br><br><br>



# IV. Arrays attributes

## 1. Overview
NumPy arrays expose metadata about their structure.
```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])
```

---

**Common attributes**
```python
arr.ndim     # number of dimensions (2)
arr.shape    # shape of the array (2, 3)
arr.size     # total number of elements (6)
arr.dtype    # data type of elements
arr.base     # Check if Array Owns its Data (return `None` if the array owns the data, Else return original object)
```

## 2. Copy vs View (Memory behavior)

> The copy owns the data and any changes made to the copy will not affect original array, and any changes made to the original array will not affect the copy.

> The view does not own the data and any changes made to the view will affect the original array, and any changes made to the original array will affect the view.

---

**COPY** 
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
cpyArr = arr.copy() 
arr[0] = 42

print(arr) # [42  2  3  4  5]
print(cpyArr) # [1 2 3 4 5]

# The copy SHOULD NOT be affected by the changes made to the original array.
```

---
**VIEW** 
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
cpyArr = arr.view()
arr[0] = 42

print(arr) # [42  2  3  4  5]
print(cpyArr) # [42  2  3  4  5]

# The view SHOULD be affected by the changes made to the original array.
```
---
Make Changes in the VIEW:
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
cpyArr = arr.view()
cpyArr[0] = 31

print(arr) # [31  2  3  4  5]
print(cpyArr) # [31  2  3  4  5]

# The original array SHOULD be affected by the changes made to the view.
```

---
**Check if Array Owns its Data**
> Every NumPy array has the attribute `base` that returns `None` if the array owns the data.
>
> Otherwise, the `base`  attribute refers to the `original object`.
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5])

x = arr.copy()
y = arr.view()

print(x.base) # None
print(y.base) # [1 2 3 4 5]
```

---
---
<br><br><br><br>


# V. Arrays methods

## 1. Type conversion: `.astype(type)`
Convert array to a different data type.
```python
arr = np.array([1, 2, 3])
arr_f = arr.astype(float)
```
- returns a new array
- original array unchanged

## 2. Array Reshaping: `.reshape()`
Change array shape without changing data.

### **2.1 Reshape From 1-D to 2-D**
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])

newarr = arr.reshape(4, 3)

print(newarr)
"""
Output:
    [[ 1  2  3]
    [ 4  5  6]
    [ 7  8  9]
    [10 11 12]]
"""
```
- returns a view **when possible**, otherwise a copy

> because it does return a view for contiguous arrays
> else it does return a copy

> Contiguous array → view 
> Non-contiguous array (like a sliced array) → copy

---


### **2.2 Automatic inference:** (Unknown Dimension)
> You are allowed to have `one` "unknown" dimension.
>
> Pass `-1` as the value, and NumPy will calculate this number for you.

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])
newarr = arr.reshape(-1, 2)

print(newarr)
"""
Output:
    [[1 2]
    [3 4]
    [5 6]]
"""
```

---

### **2.3 Can We Reshape Into any Shape?**

> We can reshape an 8 elements 1D array into 4 elements in 2 rows 2D array but we cannot reshape it into a 3 elements 3 rows 2D array as that would require 3x3 = 9 elements.
>
> Try converting 1D array with 8 elements to a 2D array with 3 elements in each dimension (will raise an error):

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])

newarr = arr.reshape(3, 3) # ValueError: cannot reshape array of size 8 into shape (3,3)

print(newarr)
``` 

---

### **2.4 Flattening the arrays**

Flattening array means converting a multidimensional array into a 1D array.

We can use reshape(-1) to do this:
```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

newarr = arr.reshape(-1)

print(newarr)
```

## 3. Array Iterating

### **3.1 Iterating Arrays**
```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

for x in arr: # 2 iterations
  print(x)

"""
Output:
    [1 2 3]
    [4 5 6]
"""
```
- If we iterate on a n-D array it will go through n-1th dimension one by one.
<br><br>

---

To return the actual values, the scalars, we have to iterate the arrays in each dimension.

```python
# Iterate on each scalar element of the 2-D array:
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

for x in arr:
  for y in x:
    print(y)

"""
Output:
    1
    2
    3
    4
    5
    6
"""
```

---

### **3.2 Iterating Arrays Using `np.nditer(npArray)`**

> Efficiently iterate over every scalar element in a multidimensional array 
>
> without the performance overhead or complexity of nested loops.

```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6]])

for x in np.nditer(arr):
  print(x)

"""
Output:
    1
    2
    3
    4
    5
    6
"""
```

---

### **3.3 Enumerated Iteration Using `np.ndenumerate(npArray)`**

> np.ndenumerate() is an iterator that yields each element's multi-dimensional index (as a tuple) and its value simultaneously.
>
> Output: coordination_Tuple value

```python
import numpy as np

arr = np.array([1, 2, 3])

for idx, x in np.ndenumerate(arr):
  print(idx, x)

"""
Output:
    (0,) 1
    (1,) 2
    (2,) 3
"""
```

```python
import numpy as np

arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])

for idx, x in np.ndenumerate(arr):
  print(idx, x)

"""
Output:
    (0, 0) 1
    (0, 1) 2
    (0, 2) 3
    (0, 3) 4
    (1, 0) 5
    (1, 1) 6
    (1, 2) 7
    (1, 3) 8
"""
```

---

## 4. Joining Array

> **Axis intuition**
> - axis=0 → vertical (rows)
> - axis=1 → horizontal (columns)
> - axis always refers to the direction you collapse or join along

### **4.1 Joining NumPy Arrays using `np.concatenate()`**

> This one joins arrays along an existing axis. You are extending something that already exists.

```python
import numpy as np

arr1 = np.array([[1, 2], [3, 4]])
"""
[1 2]
[3 4]
"""

arr2 = np.array([[5, 6], [7, 8]])
"""
[5 6]
[7 8]
"""

arr = np.concatenate((arr1, arr2)) # default `axis = 0`
print(arr)
"""
Vertical concatenation:
    [1 2]  
    [3 4]
    [5 6]
    [7 8]
"""
```

---

```python
import numpy as np

arr1 = np.array([[1, 2], [3, 4]])
"""
[1 2]
[3 4]
"""

arr2 = np.array([[5, 6], [7, 8]])
"""
[5 6]
[7 8]
"""

arr = np.concatenate((arr1, arr2), axis=1)
print(arr)
"""
Horizontal concatenation:
    [1 2]  [5 6]
    [3 4]  [7 8]
"""

```

---
Special case:
```python

import numpy as np

a = np.array([[1,2,3],
[4,5,6]])

b = np.array([[1,1,1],
[2,2,2]])

arr = np.concatenate((a,b), axis = None) 
print(arr)
"""
Output:
    [1 2 3 4 5 6 1 1 1 2 2 2]
"""
```
> `axis=None` flattens all input arrays before concatenation, returning a 1-D array.
---

### **4.2 Joining Arrays Using `np.stack()`**

> This one creates a brand-new axis. You are not extending a dimension, you are inventing one.

```python
import numpy as np

a = np.array([[1,2,3],
[4,5,6]])

b = np.array([[1,1,1],
[2,2,2]])

arr = np.stack((a,b)) # default axis = 0, vertical stack

print(arr)
"""
Output: (adds an extra dimension) -> 3D
[[[1 2 3]
  [4 5 6]]

 [[1 1 1]
  [2 2 2]]]
"""
```

---
> axis 1 and 2 have totally different behaviour than the rest.

### **4.3 Joining arrays Using `np.vstack()` and `np.hstack()`

**`np.vstack`**

> does the same thing as `np.stack()` but without adding that extra dimension.

```python
import numpy as np

a = np.array([[1,2,3],
[4,5,6]])

b = np.array([[1,1,1],
[2,2,2]])

arr = np.vstack((a,b)) 

print(arr)
"""
Output:
    [[1 2 3]
    [4 5 6]
    [1 1 1]
    [2 2 2]]
"""
```

---

**`np.hstack()`**

> stack horizontally

```python
import numpy as np

a = np.array([[1,2,3],
[4,5,6]])

b = np.array([[1,1,1],
[2,2,2]])

arr = np.hstack((a,b)) 

print(arr)
"""
Output:
    [[1 2 3 1 1 1]
    [4 5 6 2 2 2]]
"""
```

---

## 5. Splitting Array


### **5.1 Splitting arrays Using `np.array_split()`**

> we pass it the array we want to split and the number of splits.

```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])

newarr = np.array_split(arr, 3)

print(newarr) # [array([1, 2]), array([3, 4]), array([5, 6])]
```

---

If the array has less elements than required, it will adjust from the end accordingly.
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 6])

newarr = np.array_split(arr, 4)

print(newarr) # [array([1, 2]), array([3, 4]), array([5]), array([6])]
```

---
> **Note:** We also have the method `split()` available but it will not adjust the elements when elements are less in source array for splitting like in example above, `array_split()` worked properly but `split()` would fail.

---
**Splitting 2-D Arrays**

```python
import numpy as np

arr = np.array([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]])

newarr = np.array_split(arr, 3)

print(newarr)
"""
Output:
[array([[1, 2], [3, 4]]),
 array([[5, 6], [7, 8]]),
 array([[ 9, 10], [11, 12]])]
"""

```

---

**Vertical and Horizontal Split**

The example below also returns three 2-D arrays, but they are split along the column (axis=1).
```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18]])

newarr = np.array_split(arr, 3, axis=1)

print(newarr)
"""
Output:
[array([[ 1], [ 4], [ 7], [10], [13], [16]]),
 array([[ 2], [ 5], [ 8], [11], [14], [17]]),
 array([[ 3], [ 6], [ 9], [12], [15], [18]])]
"""
```

---

An alternate solution is using `np.hsplit()` opposite of `np.hstack()`

```python
import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18]])

newarr = np.hsplit(arr, 3)

print(newarr) # same output.

```

---

> **Note:** Similar alternates to `vstack()` and `dstack()` are available as `vsplit()` and `dsplit()`.

## 6. Searching Arrays

### **6.1 Searching arrays Using `np.where()`**

> You can search an array for a certain value, and return the indexes that get a match.

Find the indexes where the value is 4:
```python
import numpy as np

arr = np.array([1, 2, 3, 4, 5, 4, 4])

x = np.where(arr == 4)

print(x) # (array([3, 5, 6]),) -> array tuple
# Which means that the value 4 is present at index 3, 5, and 6.
```



---

### **6.2 Searching arrays Using `np.searchsorted()`

> There is a method called `searchsorted()` which performs a binary search in the array, and returns the `index` where the specified value would be inserted to maintain the search order.
>
> The `searchsorted()` method is assumed to be used on sorted arrays.


Find the indexes where the value 7 should be inserted:
```python
import numpy as np

arr = np.array([6, 7, 8, 9])

x = np.searchsorted(arr, 7)

print(x) # 1
# The number 7 should be inserted on index 1 to remain the sort order.
```

---

> The method starts the search from the left and returns the first index where the number 7 is no longer larger than the next value.

---

By default the left most index is returned, but we can give `side='right'` to return the right most index instead.

```python
import numpy as np

arr = np.array([6, 7, 8, 9])

x = np.searchsorted(arr, 7, side='right') # Find the indexes where the value 7 should be inserted, starting from the right.

print(x) # 2
```


---
**Multiple values search**

Find the indexes where the values 2, 4, and 6 should be inserted:

```python
import numpy as np

arr = np.array([1, 3, 5, 7])

x = np.searchsorted(arr, [2, 4, 6])

print(x) # [1 2 3] 
# containing the three indexes where 2, 4, 6 would be inserted in the original array to maintain the order.
```


## 7. Sorting Arrays

### 7.1 Sorting arrays Using `np.sort()`

> **Note:** This method returns a copy of the array, leaving the original array unchanged.

```python
import numpy as np

arr = np.array([3, 2, 0, 1])

print(np.sort(arr)) # [0 1 2 3]
```

---

If you use the `sort()` method on a 2-D array, both arrays will be sorted:
```python
import numpy as np

arr = np.array([[3, 2, 4], [5, 0, 1]])

print(np.sort(arr))
"""
Output:
[[2 3 4]
 [0 1 5]]
```


## 8. Aggregate functions:

```python
>>> a.sum()       # Array-wise sum
>>> a.min()       # Array-wise minimum value
>>> b.max(axis=0) # Maximum value of an array row
>>> b.cumsum(axis=1)  # Cumulative sum of the elements
>>> a.mean()      # Mean
>>> np.median(b)  # Median
>>> np.corrcoef(a)    # Correlation coefficient
>>> np.std(b)     # Standard deviation
```


## 9. Other functions

```python
>>> np.append(h,g) # Append items to an array
>>> np.insert(a, 1, 5) # Insert items in an array
>>> np.delete(a,[1]) # Delete items from an array

>>> np.multiply(a,b) # Multiplication
>>> np.exp(b) # Exponentiation
>>> np.sqrt(b) # Square root
>>> np.sin(a) # Print sines of an array
>>> np.cos(b) # Element-wise cosine
>>> np.log(a) # Element-wise natural logarithm

etc
```