---
title: "Chapter 4_ Working With Dates And Categorical Data"
description: "A comprehensive guide on handling dates, times, resampling, categorical data types, and encoding strategies in pandas."
pubDate: "Mar 01 2026"
---

# I. Working with dates

## 1. Importing/Converting datetimes

> When importing, use parse_dates. If the data is already loaded, use pd.to_datetime.

```python
# Option A: At Import
rides = pd.read_csv('capital-onebike.csv', 
                    parse_dates=['Start date', 'End date'])

# Option B: Manual Conversion
# Note: Ensure no spaces in the format string (e.g., "%H:%M:%S")
rides['Start date'] = pd.to_datetime(rides['Start date'], 
                                     format="%Y-%m-%d %H:%M:%S")
```

## 2. Operations

> To access datetime properties, use the `.dt` accessor. Subtracting two datetimes creates a Timedelta.

```python
# Calculate duration (Result is a Timedelta object)
rides['duration'] = rides['End date'] - rides['Start date']

# Convert Timedelta to a numeric value (seconds)
rides['duration'].dt.total_seconds().head(5)

# Extract specific parts
divorce["marriage_year"] = divorce["marriage_date"].dt.year
divorce["marriage_day_name"] = divorce["marriage_date"].dt.day_name() # e.g., "Sunday"

# Aggregations on Timedeltas
rides['duration'].sum()
rides['duration'].mean()
rides['duration'].sum() / timedelta(days=91)

# Check for anomalies (Negative duration usually implies a Daylight Savings shift)
negative_durations = rides[rides['duration'].dt.total_seconds() < 0]
```


## 3. Resampling Data `.resample()`

> `.resample()` is like `.groupby()`, but specifically for time frequencies.

```python
# 'D' = Day, 'W' = Week, 'ME' = Month End, 'YE' = Year End
rides.resample('ME', on='Start date')['duration'].mean()

"""
Output:
    Start date

    2017-10-31 1886.454

    2017-11-30 854.175
    2017-12-31 635.101

    Freq: ME, Name: Duration seconds, dtype: float64
"""
```


## 4. Grouping and Resampling

> You can combine standard grouping with time-based resampling to see trends across categories.

```python
# Median duration per month, split by Member type
grouped = rides.groupby('Member type')\
               .resample("ME", on="Start date")['duration']\
               .median()


"""
Output:
    Member type  Start date
    Casual       2017-10-31    1636.0
                 2017-11-30    1159.5
                 2017-12-31     850.0
    Member       2017-10-31     671.0
                 2017-11-30     655.0
                 2017-12-31     387.5
    Name: Duration, dtype: float64

"""
```

## 5. Timezones & Daylight Saving Time (DST)

> By default, Python datetimes are **naive** (no offset). Moving them to **aware** requires `.dt.tz_localize()`.

> **Note:** During DST "Fall Back" events, the same time occurs twice. This causes an `AmbiguousTimeError`.


```python
# rides['Start date'] contains timezone-naive datetimes
# (timestamps without timezone information)

# Add a timezone using tz_localize()
rides['Start date'].dt.tz_localize("America/New_York")


# Assign the localized result back to the column
rides['Start date'] = rides['Start date']\
    .dt.tz_localize("America/New_York")


"""
Error:
AmbiguousTimeError → happens during DST change
when the same local time occurs twice.
"""


# Handle ambiguous timestamps
# ambiguous='NaT' → unclear times become NaT (Not a Time)

rides['Start date'] = rides['Start date']\
    .dt.tz_localize("America/New_York", ambiguous='NaT')

rides['End date'] = rides['End date']\
    .dt.tz_localize("America/New_York", ambiguous='NaT')


# NaT = missing/invalid datetime value
```

> For more details, check the Naive datetime section in the Python datetime chapter.



## 6. plot results

> Pandas handles the x-axis formatting automatically when you plot a Series with a datetime index.

```python
# line plot by default:
rides\
.resample ('D', on = 'Start date')\
['Duration seconds']\
.mean()\
.plot()
```









# II. Working with categorical data



Considerations for categorical data From EDA course -> pd.crosstab



## 1. What does it mean to be "categorical"?
**Categorical**
- Finite number of groups (or categories)
- These categories are usually fixed or known (eye color, hair color, etc.)
- Known as qualitative data

---

**Numerical**
- Known as quantitative data
- Expressed using a numerical value
- Is usually a measurement (height, weight, IQ, etc.)







## 2. Ordinal vs. nominal variables
**Ordinal**

- Categorical variables that have a natural order
    - Strongly-Disagree(1)    Disagree(2)    Neutral(3)     Agree(4)   Strongly-Agree(5)

---

**Nominal**

- Categorical variables that cannot be placed into a natural order
    - Blue   Green   Red   Yellow   Purple







## 3. dtypes: categorical
**Default dtype:**
```python
adult["Marital Status"].dtype

"""
Output: (Object type)
    dtype ('0') 
"""
```

---

**Set as categorical:**
```python
adult["Marital Status"] = adult["Marital Status"].astype("category") # this saves memory

adult["Marital Status"].dtype

"""
Output:
    CategoricalDtype (categories=[' Divorced', ' Married-AF-spouse',
    ' Married-civ-spouse', ' Married-spouse-absent', ' Never-married',
    ' Separated', ' Widowed' ], ordered=False)
"""
```

---

**Memory saving**
```python
adult = pd.read_csv("data/adult.csv")
adult["Marital Status"].nbytes # 260488


adult["Marital Status"] = adult["Marital Status"].astype("category")
adult["Marital Status"].nbytes # 32617
```




## 4. Creating a categorical Series
```python
my_data = ["A", "A", "C", "B", "C", "A"]

my_series1 = pd.Series(my_data, dtype="category")
print(my_series1)

"""
Output:
    0   A
    1   A
    2   C
    ...
    dtype: category
    Categories (3, object): [A, B, C]
"""

```

---

```python
my_data = ["A", "A", "C", "B", "C", "A"]

# this way allows us to tell pandas that the categories have a logical order.
my_series2 = pd.Categorical(my_data, categories=["C", "B", "A"], ordered=True)
my_series2

"""
Output:
    [A, A, C, B, C, A]
    Categories (3, object): [C < B < A]
"""
```

---

### 4.1 Specify dtypes when reading data

```python
# 1. Create a dictionary:

adult_dtypes = {"Marital Status": "category"}

# 2. Set the dtype parameter:

adult = pd.read_csv("data/adult.csv", dtype=adult_dtypes)

# 3. Check the dtype :

adult["Marital Status"].dtype
```






## 5. Setting category variables

### 5.1 The .cat accessor object

```
Series.cat.method_name
```

Common parameters:
- new_categories : a list of categories
- inplace, ordered

---

### 5.2 Set categories `.cat.set_categories()`
```python
dogs["coat"] = dogs["coat"].cat.set_categories(
new_categories=["short", "medium", "long"]
)
```

* Values not found in `'new_categories'` will be coerced to NaN.

---

**Check value counts:**
```python
dogs["coat"].value_counts(dropna=False)

"""
Output:
    short    1972
    medium   565
    NaN      220
    Long     180
"""
```

---

**Setting Order**

```python
dogs["coat"] = dogs["coat"].cat.set_categories(
new_categories=["short", "medium", "long"],
                ordered=True

)
dogs ["coat"].head(3)

"""
Output:
    0   short
    1   short
    2   short
    Name: coat, dtype: category
    Categories (3, object): ['short' < 'medium' < 'long' ]
"""

```

> - **Equality (==, !=):** Works on all categorical data.
>
> - **Inequality (<, >, <=, >=):** Works only if `ordered=True`.
>
> - **Arithmetic (+, -, *, /):** Never works directly; requires conversion to numerical codes first.


---

### 5.3 Missing categories
```python
dogs["likes_people"].value_counts(dropna=False)

"""
yes  1991
NaN  938
no   8
"""
```

---

A NaN could mean:

1. Truly unknown (we didn't check)
2. Not sure (dog likes "some" people)


---


### 5.4 Adding categories `.cat.add_categories()`


**Add categories**
```python
dogs["Likes_people"] = dogs["likes_people"].astype("category")
dogs["likes_people"] = dogs["likes_people"].cat.add_categories(
new_categories=["did not check", "could not tell"]
)
```

- Does not change the value of any data in the DataFrame
- Categories not listed in this method are left alone

---

**Check categories**
```python
dogs["likes_people"].cat.categories

# Output: Index(['no', 'yes', 'did not check' , 'could not tell'], dtype='object')

dogs["Likes_people"].value_counts(dropna=False)
"""
Output:
    yes             1991
    NaN             938
    no              8
    could not tell  0
    did not check   0
"""
```

---

### 5.5 Removing categories `.cat.remove_categories()`

```python
dogs ["coat"] = dogs["coat"].astype ("category")
dogs ["coat"] = dogs["coat"].cat.remove_categories(removals=["wirehaired"])
```

- Values matching categories listed are set to NaN

---

**Check the categories**

```python
dogs["coat"].cat.categories

# Output: Index(['long', 'medium' , 'short'], dtype='object' )
```

---






## 6. Updating/collapsing categories

### 6.1 Renaming categories `cat.rename_categories()`

```python
# Make a dictionary:
my_changes = {"Unknown Mix": "Unknown"}

# Rename the category:
dogs["breed"] = dogs["breed"].cat.rename_categories(my_changes)
```

---

**Renaming categories with a function**
```python
# Update multiple categories:
dogs ['sex'] = dogs['sex'].cat.rename_categories( lambda c: c.title() )
```

---

**Common replacement issues**
- Must use new category names
```python
# Does not work! "Unknown" already exists
use_new_categories = {"Unknown Mix": "Unknown"}
```

---

- Cannot collapse two categories into one
```python
# Does not work! New names must be unique
cannot_repeat_categories = {
"Unknown Mix": "Unknown",
"Mixed Breed": "Unknown"
}
```

---

### 6.2 Collapsing categories `.replace()`

```python
# Create a dictionary and use .replace :

update_colors = {
"black and brown": "black",
"black and tan": "black",
"black and white": "black",

}

dogs["main_color"] = dogs["color"].replace(update_colors)
```

```python
# Check the Series data type:
dogs["main_color"].dtype # Output: dtype('O')
```

---

**Convert back to categorical**

```python
dogs ["main_color"] = dogs["main_color"].astype("category")
dogs["main_color"].cat.categories

"""
Output:
    Index(['apricot', 'black', 'brown', 'brown and white' , 'dotted' , 'golden' ,
    'gray', 'gray and black', 'gray and white', 'red', 'red and white',
    'sable', 'saddle back', 'spotty', 'striped', 'tricolor', 'white',
    'wild boar', 'yellow', 'yellow-brown' ],
    dtype='object')
"""
```


---


### 6.3 Reordering categories `.cat.reorder_categories()`

```python
dogs ['coat' ] = dogs["coat"].cat.reorder_categories(
new_categories = ['short', 'medium', 'wirehaired', 'long' ],
ordered=True
)
```

```python
# Using inplace:
dogs["coat"].cat.reorder_categories(
new_categories = ['short', 'medium', 'wirehaired', 'long' ],
ordered=True,
inplace=True
)
```

> **Note:** Category sequence is preserved in GroupBy output for both `ordered` and `unordered` types; `'ordered=True'` only affects comparison logic.





## 7. Categorical pitfalls

**Using categories can be frustrating**
- Using the .str accessor object to manipulate data converts the Series to an object.

- The `'.apply()' / '.replace()' ..` methods outputs a new Series as an object.

- The common methods of adding, removing, replacing, or setting categories do not all handle
missing categories the same way.

- NumPy functions generally do not work with categorical Series.

---

**Solutions**

### 7.1 Check and convert
```python
# Check
used_cars["color"] = used_cars["color"].astype("category")
used_cars["color"] = used_cars["color"].str.upper()
print(used_cars["color"].dtype) # object
```

```python
# Convert
used_cars["color"] = used_cars["color"].astype("category")
print(used_cars["color"].dtype) # category
```

---

### 7.2 Looking for missing values

> Anytime you are updating categories, whether that is **setting,** **adding,** or **removing**, use **value-counts** to make sure the changes you made worked as intended.

---

```python
used_cars["color"] = used_cars["color"].astype("category")
used_cars["color"].cat.set_categories(["black", "silver", "blue"], inplace=True)
used_cars["color"].value_counts(dropna=False)

"""
Output:
    NaN     18172
    black   7705
    silver  6852
    blue    5802
    Name: color, dtype: int64

we see that over 18,000 entries have become NaN values. If this was not intended, we may need to use a different method for updating the categories.
"""
```

---

### 7.3 Using NumPy arrays

```python
used_cars['number_of_photos' ] = used_cars['number_of_photos'].astype("category")
used_cars['number_of_photos' ].sum() # <--- Gives an Error

# TypeError: Categorical cannot perform the operation sum
```

```python
used_cars['number_of_photos'].astype(int).sum()
```

**Note:**
```python
# .str converts the column to an array
used_cars["color"].str.contains("red")
```



## 8. Label encoding

**The basics:**

- Codes each category as an integer from `O` through `n - 1`, where `n` is the number of categories.
- A `-1` code is reserved for any missing values
- Can save on memory
- Often used in surveys

---

**The drawback:**

- Is not the best encoding method for machine learning (see next lesson)

---

### 8.1 Creating codes `.cat.codes`


**Convert to categorical and sort by manufacturer name**
```python
used_cars['manufacturer_name'] = used_cars['manufacturer_name'].astype("category")
```

---

**Use `.cat.codes`**
```python
# Generates integer codes for categorical data. 
# If the category is ordered, codes follow that specific sequence; 
# otherwise, they are assigned based on alphabetical order.
used_cars['manufacturer_code'] = used_cars['manufacturer_name'].cat.codes
```

---

**Check Output**
```python
print(used_cars[['manufacturer_name', 'manufacturer_code']])
```

---

```text
       manufacturer_name  manufacturer_code
0                 Subaru                 45
1                 Subaru                 45
2                 Subaru                 45
...                  ...                ...
38526           Chrysler                  8
38527           Chrysler                  8
```

---

### 8.2 Code books / data dictionaries

> label encoding is often used in surveys. The responses and their corresponding codes are often kept in a code book or a data dictionary. Consider this variable from the American Housing Survey, where a 1 represents YES and a 2 represents NO, for if a house was built in the last four years


**Creating a code book**

```python
codes = used_cars['manufacturer_name'].cat.codes
categories = used_cars['manufacturer_name']
```

```python
name_map = dict(zip(codes, categories))
print(name_map)

"""
Ouput:
    {45: 'Subaru',
    24: 'LADA',
    12: 'Dodge',
    ...
    }
"""
```

---

**Creating the codes**

```python
used_cars['manufacturer_code'] = used_cars['manufacturer_name'].cat.codes

# Reverting to previous values:
used_cars['manufacturer_code'].map(name_map)
```

---




### 8.3 Boolean coding

**Create a boolean coding:**

```python
used_cars["van_code"] = np.where(
    used_cars["body_type"].str.contains("van", regex=False), 1, 0)

used_cars["van_code"].value_counts()

"""
Output:
    0   34115
    1   4416
    Name: van_code, dtype: int64
"""
```


## 9. One-Hot Encoding

> Using **Label Encoding** can cause models to assume a mathematical relationship (e.g., $3 > 0$) where none exists. To prevent the model from thinking "Gasoline" is "greater than" "Diesel," we use One-Hot Encoding to create binary columns for each category.

---

### 9.1 Basic Implementation

```python
import pandas as pd

# 1. Convert ALL categorical variables in the dataframe:
# This automatically identifies 'object' or 'category' types.
used_cars_oneHot = pd.get_dummies(used_cars) 

# 2. Choosing specific columns:
# Note: Usually, you pass the whole DF and specify 'columns' to keep other data intact.
used_cars_oneHot = pd.get_dummies(used_cars, columns=['odometer_values', 'color'])

# 3. Customizing prefixes:
# If you set prefix="", you get "_black", "_blue". 
# If you want NO underscore at all, you must specify prefix_sep="".
used_cars_oneHot = pd.get_dummies(used_cars, columns=['color'], prefix="cat", prefix_sep="_")

```

---

### 9.2 The Dummy Variable Trap

```python
df_encoded = pd.get_dummies(df, columns=["color"], drop_first=True)

```

>**The problem:** This refers to **Multicollinearity**.
> If you have two categories, "Male" and "Female," and you know someone is NOT Male (0), then they MUST be Female (1). Including both columns provides redundant information. In mathematical terms, one column can be perfectly predicted from the others, which can cause issues for certain models like Linear Regression (it makes the inversion of the feature matrix impossible or unstable).

---

### 9.2 Key Reminders

* **NaN Values:** By default, `pd.get_dummies` ignores `NaN`. If a row is `NaN`, all resulting dummy columns for that feature will be `0`. If you want a specific column for missing data, use `dummy_na=True`.
* **Curse of Dimensionality:** Using one-hot on a column with 1,000 unique values will add 1,000 new columns, which may lead to **overfitting**.
