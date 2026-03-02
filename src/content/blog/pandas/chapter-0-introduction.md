---
title: "Chapter 0_ Introduction to pandas"
description: "An introduction to Pandas, NumPy, and Matplotlib, and working with DataFrames and Series."
pubDate: "Feb 25 2026"
---

# I. Introduction

## 1. Pandas, NumPy, and Matplotlib — How They Fit Together

Pandas is built on `Numpy` and `matplotlib`

 - **Numpy** provides fast, multidimensional array objects (`ndarray`) for easy data manipulation that pandas uses to store data.
 - **Matplotlib** has powerful data visualization.

---

## 2. Rectangular Data in Pandas

In Pandas, rectangular (tabular) data is represented by a **`DataFrame`** object.

This concept exists in nearly every data analysis ecosystem:

- **Pandas (Python):** `DataFrame`
- **R:** `data.frame`
- **SQL:** database tables

---

## 3. Why Use a DataFrame If Pandas Uses NumPy Under the Hood?

> **Question:**  
> If Pandas uses NumPy `ndarray`s internally, what is the real utility of a `DataFrame`?

### 3.1 ✅ Answer

While NumPy arrays are **homogeneous** (all elements must share the same data type for performance), a Pandas **DataFrame is heterogeneous**.

A DataFrame acts as a high-level container for multiple NumPy arrays, allowing:

- Each column to hold a different data type in a single table.
- A **single table-like structure** for mixed data.

### 3.2 Beyond Data Types

DataFrames also provide rich **metadata** and high-level features, including:

- **Column labels** and **row indexes**
- **SQL-like operations** (joins, merges, group-bys)
- **Built-in missing data handling** (`NaN`)
- **etc**

All of this would be **extremely difficult and error-prone** to implement using raw NumPy arrays alone.

---

## 4. Pandas Series

A Pandas Series is like a column in a table. It is a one-dimensional array holding data of any type.

### 4.1 Create a simple Pandas Series from a list:

```python
import pandas as pd

a = [1, 7, 2]

# If nothing else is specified, the values are labeled with their index number.([1, 2, ... n])
myvar = pd.Series(a)

print(myvar)
"""
Output:
    0    1
    1    7
    2    2
    dtype: int64
"""
print(myvar[0]) # 1



# Create Labels
myvar = pd.Series(a, index = ["x", "y", "z"])

print(myvar)
"""
Output:
    x    1
    y    7
    z    2
    dtype: int64
"""
print(myvar["y"]) # 7


```

---

### 4.2 Key/Value Objects as Series

```python
import pandas as pd

calories = {"day1": 420, "day2": 380, "day3": 390}

myvar = pd.Series(calories)

print(myvar)
"""
Output:
    day1    420
    day2    380
    day3    390
    dtype: int64
"""



# To select only some of the items in the dictionary, use the index argument and specify only the items you want to include in the Series.

myvar = pd.Series(calories, index = ["day1", "day2"])
print(myvar)
"""
Output:
    day1    420
    day2    380
    dtype: int64
"""
```

> **Note:** The keys of the dictionary become the labels.


# II. Note

## 1. Difference between `np.logical_and`,`np.logical_or()`,`np.logical_and.reduce()`, `np.logical_or.reduce()` and `& / |` 

```python
import numpy as np
import pandas as pd

# ⚠️ WARNING: Never use 'and' or 'or' with DataFrames/Series. 
# They aren't "vectorized" (cannot handle arrays), leading to Ambiguity Errors.
# Use Bitwise operators (&, |) or NumPy logical functions instead.

# 1. THE BITWISE WAY (Standard Pandas)
# & is the vectorized equivalent of 'and'
# | is the vectorized equivalent of 'or'
# ~ is the vectorized equivalent of 'not'
mask = (df['A'] > 5) & (df['B'] < 10) 

# 2. THE NUMPY EQUIVALENTS (Functional)
# np.logical_and()  <==>  &
# np.logical_or()   <==>  |
# np.logical_not()  <==>  ~
mask = np.logical_and(df['A'] > 5, df['B'] < 10)

# 3. SCALING (Best for 3+ conditions)
conds = [df['A'] > 5, df['B'] < 10, df['C'] == 0]
mask = np.logical_and.reduce(conds)

df[mask]


```

---

```python

import numpy as np
import pandas as pd

# 1. THE STANDARD (Best for 2-3 conditions)
# Note: Parentheses () are MANDATORY
mask = (df['A'] > 5) & (df['B'] < 10) & (df['C'] == 0)

# 2. THE LIMITATION (Binary only)
# np.logical_and(cond1, cond2, cond3)  # ❌ ERROR: Only takes 2 args
mask = np.logical_and(df['A'] > 5, df['B'] < 10)  # ✅ Works

# 3. THE PRO SCALABLE WAY (Best for long lists)
# Works like a loop: cond1 AND cond2 AND cond3...
cond_list = [
    df['A'] > 5, 
    df['B'] < 10, 
    df['C'] == 0, 
    df['D'] != 'Pending'
]
mask = np.logical_and.reduce(cond_list)

df[mask]

```

## 2. Usage of (`.any()` and `.all`) for `DataFrames` and `Series`

**On a Series (One Column)**
It returns a single True/False.

`.any()`: Is at least one value True?
`.all():` Are all values True?

```python
# Returns True if there is at least one missing value in 'age'
df["age"].isna().any()
```

---

**On a DataFrame (Full Table)**
It returns a Series of True/False values (by default, one per column). It effectively "reduces" the dimension of the data.

```python
# Returns a Series showing which COLUMNS have at least one NaN
df.isna().any()

# Output looks like:
# name      False
# age       True
# breed     True
# dtype: bool


# Returns a bool answering the question: "Does my entire dataset have ANY missing values anywhere?"
df.isna().any().any() 

# Translation: 
# 1. First .any() -> Checks each column (Returns a Series)
# 2. Second .any() -> Checks that Series (Returns a single Boolean)
```