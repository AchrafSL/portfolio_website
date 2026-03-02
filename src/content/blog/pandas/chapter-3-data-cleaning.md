---
title: "Chapter 3_ Data Cleaning"
description: "A comprehensive guide on handling missing data, data type constraints, uniformity, cross-field validation, and text data problems."
pubDate: "Feb 04 2026"
---

# I. Basics

## 1. Checking for NaN Values:
```python
df.isna()
df.isna().any()     # Per column has NaN?
df.isna().sum()     # Count NaN per column
```

## 2. Plotting Missing Values:
```python
df.isna().sum().plot(kind="bar")
```

## 3. Removing NaNs:
```python
df.dropna()
```

## 4. Filling NaNs:
```python
df.fillna(0)
```

## 5. Deleting Rows/Columns:
```python
df.drop("row_label")                   # Delete row by label
df.drop(df.index, inplace = True)    
df.drop(["col1", "col2"], axis=1)       # Delete columns
df = df.iloc[1:, 1:]                    # Delete first row & col
```


## 6. Replacing Column Values
```python
# Manual reassignment (simplest case)
df["col"] = "new_value"  # Reassign manually like a dictionary key-value update

# Using .map() for conditional mapping
df["qualify"] = df["qualify"].map({"yes": True, "no": False})
# map() applies a dictionary to replace values exactly matching the keys,  but allow NaN for missing keys.

# Using .replace() for substitution
df["qualify"] = df["qualify"].replace({"yes": True, "no": False})
# replace() substitutes values directly (similar to Excel's "Find and Replace")
```

## 7. Indentify duplicates:
```python
duplicates = df.duplicated() # Return a series of boolean values, True for duplicated and False for non duplicated values.
df[duplicates] # get duplicated rows


# By default, pandas uses the following settings:
df.duplicated(subset=None, keep='first')

# When subset=None, pandas only marks a row as a duplicate if every single value in that row is identical to another row.

# By default, the very first time pandas sees a piece of data, it marks it as False (not a duplicate). Every time it sees that data again later in the dataframe, it marks it as True.

# The Fix: Use keep=False to mark every copy of a duplicate as True.


df.duplicated(subset = ["first_name","lastname","address"], keep = False)

```

---
* **subset:** List of column names to check for duplication.
* **keep:** Whether to keep **first** ( `'first'` ), **last** ( `'last'` ) or **all** ( `False` ) duplicate values.

---



## 8. Drop Duplicates:
```python
df.drop_duplicates(subset=["name", "lastname"])

# takes the same arguments as `.duplicated()` method + `inplace` argument. 
```


<br><br><br>
<br><br><br>






# II. Common data problems


## 1. Data type constraints

> Ensuring columns have the correct "behavior".

```python
# Print sum of all Revenue column
sales['Revenue'].sum()
```

```CMD
'23153$1457$36865$32474$472$27510$16158$5694$6876$40487$807$6893$9153$6895$4216 ..
```

> We got this results because Revenue here is a `str` and have that `$` in the end 

```python
# Remove $ from Revenue column
sales['Revenue'] = sales['Revenue'].str.strip('$')
sales['Revenue'] = sales['Revenue'].astype('int')
```

```python
# Verify that Revenue is now an integer
assert sales['Revenue'].dtype == 'int'
```

---

> ⚠️ Always verify `dtype` before performing actions to ensure data integrity.
```python
# Check the dtype
print(df['col'].dtype)

# Fix (Type conversion)
df['col'] = df['col'].astype('category')  # For Categorical
df['col'] = pd.to_datetime(df['col'])     # For Datetime
df['col'] = pd.to_datetime(df['col']).dt.date     # For Date
# To convert to date directly u need to provide the date format with a string, so it's easier this way.

# Force numeric conversion (errors='coerce' turns "missing" strings into NaN)
df["sales"] = pd.to_numeric(df["sales"], errors="coerce")
```

---

### 1.1 `.select_dtypes()`
> One of it's common usage is to Quickly find which columns are "objects" so you can convert them to proper dates or categories.

```python
# Select only numeric columns (integers and floats)
df_numeric = df.select_dtypes(include=['number'])

# Select only text/categorical columns
df_objects = df.select_dtypes(include=['object'])

# Exclude specific types (e.g., get everything EXCEPT integers)
df_no_ints = df.select_dtypes(exclude=['int64'])
```

---

```python
# A common real-world use case is filling missing values differently based on the data type:


## Automatically fill numeric NaNs with 0 and object NaNs with "Missing"
num_cols = df.select_dtypes(include='number').columns
obj_cols = df.select_dtypes(include='object').columns

df[num_cols] = df[num_cols].fillna(0)
df[obj_cols] = df[obj_cols].fillna("Unknown")
```

---



## 2. Data range constraints

> Handling values that are physically or logically impossible.(Out of range movie ratings, Subscription dates in the future, ..)

* Dropping the data is the simplest option (You could lose essential information)
* Setting custom min & max
* Treat as missing and impute 
* Setting Custom value depending on buisness assumptions


### 2.1. Dropping the Data

> This is the "cleanest" but most aggressive method. You simply remove the entire row if the value is physically impossible.

* **Best for:** Large datasets where the number of out-of-range rows is very small (e.g., < 1%).

* **Risk:** You might lose valuable information in other columns of that same row.


```python
# 1. Dropping out-of-range values

# method 1:
df = df[df["age"] <= 120]
assert df["age"].max() <= 120

# method 2:
df.drop(df[df["age"] > 120].index, inplace = True)
assert df["age"].max() <= 120

...
```

---

### 2.2. Setting Custom Min & Max (Clipping)

> As we discussed, this "squishes" the outliers into a specific range. Instead of deleting the record, you force it to the nearest "logical" boundary.

* **Best for:** When you want to keep the data points but prevent extreme outliers from skewing your machine learning models (like Linear Regression).

```python
# Clipping (Capping) - Better for preventing outlier distortion

# method 1:
df["height"] = df["height"].clip(lower=30, upper=250)
## Lower Bound: Any value less than 30 is replaced by 30.
## Upper Bound: Any value greater than 250 is replaced by 250.


# method 2:

## custom max:
df.loc[ df["age"] > 120, "age"] = 120

## custom min:
df.loc[ df["age"] < 0, "age"] = 0

...
```


---

### 2.3. Treat as Missing and Impute

> Here, you acknowledge that a height of 500cm is likely a recording error. You replace the impossible value with NaN (Not a Number) and then fill it using a statistical measure like the **mean** or **median**.

* **Best for:** When you need to maintain the sample size but don't want the "clipped" values to create a false spike at the boundaries (30 or 250).


```python
import numpy as np

# Step A: Turn out-of-range values into NaN
df.loc[(df["height"] < 30) | (df["height"] > 250), "height"] = np.nan

# Step B: Fill those NaNs with the median height of the rest of the group
df["height"] = df["height"].fillna(df["height"].median())
```

---


### 2.4. Setting Custom Values Based on Business Assumptions

> Sometimes, the "error" follows a predictable pattern. For example, if you see a height of 1.75 in a column where everyone else is 175, you might assume the unit was meters instead of centimeters. Or, you might assign a specific "flag" value.

* **Best for:** Domain-specific corrections where you have an "intuition" or a rule about why the data is wrong.

```python
# Example: If height is below 3 (likely meters), multiply by 100
df.loc[df["height"] < 3, "height"] = df["height"] * 100

# Example: If still out of range, set to a 'default' based on a business rule 
# (e.g., the average height for that specific demographic/gender)
df.loc[df["height"] > 250, "height"] = 170
```



## 3. Uniqueness constraints

> Identifying and resolving duplicate records.


### 3.1 Total Redundancy (Identical Rows)
When rows are 100% identical, they are **redundant records**. Keeping them leads to double-counting and incorrect statistics.

**The simple solution is to keep only one of these records and drop the others to ensure your dataset remains lean and accurate.**

```python
df.drop_duplicates() # keep only the first occurence 

# Find duplicates across specific columns (e.g., same person, same date)
df.duplicated(subset=["first_name", "last_name", "dob"], keep=False)

# Drop duplicates but keep the one with the most recent timestamp
df.sort_values("timestamp", ascending=False).drop_duplicates(subset="user_id")
```

---

### 3.2 Attribute Conflicts (Partial Duplicates):
When multiple records refer to the same entity (e.g., same `user_id`, or same {`first_name` + `last_name` + `address`} ) but contain conflicting attributes, you must apply a **Consolidation Strategy** to achieve a `"Single Version of Truth"`.

```python
# Find duplicates:
column_names = ['first_name' , 'last_name' , 'address' ]
duplicates = height_weight.duplicated(subset = column_names, keep = False)
height_weight[duplicates].sort_values(by = 'first_name')

# Group by the unique identifier and resolve conflicts with math
df_resolved = df.groupby("user_id").agg({
    "weight": "mean",          # Take the average of conflicting weights
    "height": "max",           # Take the tallest recorded height
    "timestamp": "first",      # Keep the date of the very first entry
    "city": "last"             # Assume the most recent (last) city is correct
}).reset_index()  

## "merges" multiple rows that refer to the same entity into a single, clean record based on the rules you defined.
```






# III. Text and categorical data problems


## 1. Membership constraints

Categorical data must belong to a predefined, finite set of values. If a value is not in that list, it is logically invalid (e.g., a "Marriage Status" of "Purple" makes no sense).

**The Dropping Solution**
The simplest way to handle invalid categories is to filter them out entirely, keeping only the records that match your "Master List."


| Data Type | Example Categories | Why it fails? | Numeric Representation |
| --- | --- | --- | --- |
| **Marriage Status** | `unmarried`, `married` | User typed "N/A" or "single". | `0, 1` |
| **Income Category** | `0-20K`, `20-40K`, `40K+` | Value is `100,000` (numeric, not category). | `0, 1, 2` |
| **Loan Status** | `default`, `paid`, `no_loan` | Value is `NaN` or a typo like `pyaid`. | `0, 1, 2` |



```python
# Check:
# run .unique() to see exactly what "junk" values are in your column:
print(df['marriage_status'].unique()) # See all unique values to find the unexpected ones
```
---

```python
inconsistent_categories = set(study_data['blood_type']) .difference(categories['blood_type'])
inconsistent_rows = study_data['blood_type'].isin(inconsistent_categories)
inconsistent_data = study_data[inconsistent_rows]
# Drop inconsistent categories and get consistent data only
consistent_data = study_data[~inconsistent_rows]
```


**There is other solution such as `Remapping Categories`, `Inferring Categories`**



## 2. Categorical variables

> Key operations for Categorical Variables:
>
> I) Standardizing Values (Fixing Inconsistency)
> - Inconsistent fields: `'married'`, `'Maried'`, `'UNMARRIED'`, `'not married'` ..
> - Trailing white spaces: `'married '`, `' married '` ..
>
>II) Collapsing too many categories to few
> - **Binning** (Creating new groups): `0-20K`, `20-40K` categories ... from continuous household income data 
> - **Mapping** groups to new ones: Mapping household income categories to 2 `'rich'` , `'poor'`
>
> III) Making sure data is of type `category`

---

### 2.1. Standardizing Values (Fixing Inconsistency)

Before cleaning, you must identify the inconsistencies. Using frequency counts allows you to see typos and variations clearly.
```python
# Inspecting for inconsistencies:

# For series:
df['marriage_status'].value_counts()

# For Dataframes
df.groupby('marriage_status').count()
```

---


To ensure consistency, we usually convert all text to lowercase/uppercase and remove any leading or trailing spaces that are invisible to the eye but seen by the computer.
```python
# 1. Standardize capitalization (choose lower or upper)
df['marriage_status'] = df['marriage_status'].str.lower()

# 2. Remove trailing/leading white spaces
df['marriage_status'] = df['marriage_status'].str.strip()
```

---

For more specific inconsistencies (like different phrases for the same thing), we use a dictionary.
```python
# 3. Final label cleanup
# Use .replace() because it ONLY updates the keys found in the dictionary.
# Avoid .map() here, as it turns any value not in the dictionary into NaN.
df['marriage_status'] = df['marriage_status'].replace({'not married': 'unmarried'})
```

---


### 2.2. Collapsing too many categories to few

#### 2.2.1. Binning (Create categories out of data)

**Using `pd.qcut()`**

```python
# Print income_group column

# Using qcut()
import pandas as pd
group_names = ['0-200K', '200K-500K', '500K+']
demographics['income_group' ] = pd.qcut(demographics['household_income'], q = 3, labels = group_names)

demographics[['income_group', 'household_income']]

# pd.qcut splits the data into 3 equal-sized quantiles (tertiles).
# Since boundaries are data-driven, labels may not align with expected group range names.

# Example: Having household_income as 172,831 and income_group as '200k-500k' 
# just because this number lays in the second Tertile( 3 groups: Tertiles, 4 groups: Quartiles, ...).
```

---

**Using `pd.cut()`**
```python
# Using cut() - create category ranges and names
ranges = [0, 200000, 500000, np.inf]  # np.inf <-> infinity
group_names = ['0-200K', '200K-500K', '500K+']
# Create income group column
demographics['income_group' ] = pd.cut(demographics['household_income'], bins=ranges, labels=group_names)

demographics[['income_group', 'household_income']]


"""
Note:  By default, 200,000 is placed in the first group (0-200K).
This is because pd.cut() uses "right-closed" intervals by default (right=True). 
"""
```

---

#### 2.2.2 Mapping (Map categories to fewer ones)
```python
# Create mapping dictionary and replace
mapping = {'Microsoft' : 'DesktopOS', 'MacOS' : 'DesktopOS' , 'Linux' : 'DesktopOS' ,
'IOS': 'MobileOS', 'Android': 'Mobile0S'}

devices['operating_system' ] = devices['operating_system'].replace(mapping)

devices['operating_system' ].unique () # Output: array(['DesktopOS', 'MobileOS' ], dtype=object)
```

---



## 3. Cleaning text data

```python
# Example:

# 1. Standardize prefixes (e.g., +0500-571437 -> 000500-571437)
df["phone"] = df["phone"].str.strip().str.replace("+", "00", regex=False)

# 2. Remove delimiters like dashes (e.g., 000500-571437 -> 000500571437)
df["phone"] = df["phone"].str.strip().str.replace("-", "")

# 3. Nullify invalid numbers shorter than 10 digits (e.g., +18424 -> NaN)
digits = df['phone'].str.len()
df.loc[digits < 10, 'phone'] = np.nan

# 4. Strip all remaining non-digits like parentheses (e.g., (01706)25891 -> 0170625891)
df["phone"] = df["phone"].str.strip().str.replace(r"\D", "", regex=True)

# 5. Verification:
assert df['phone'].str.len().min() >= 10

assert df['phone'].str.contains("+|-").any() == False

assert df['phone'].str.contains(r'\D', regex=True) == False
```








# IV. Advanced data problems


## 1. Uniformity
> Ensuring units are identical (e.g., all weights in KG, all dates in ISO format).

---

### 1.1 Conversion based on metadata
> If your dataset includes a "flag" or "unit" column, you can use logic to standardize everything to a single unit.

```python
# Convert Fahrenheit to Celsius where the unit flag is 'F'
df.loc[df["unit"] == "F", "temp"] = (df["temp"] - 32) * 5/9

# Standardize the unit column to 'C'
df["unit"] = "C"
```

---

### 1.2 Conversion based on Data Analysis

> Sometimes the unit is missing, and you have to infer it by looking for outliers that don't make physical sense (e.g., a $45^\circ\text{C}$ day in New York in March).

---

**Step 1: Visualization (The Outlier Check)**
Visualizing data is the fastest way to spot uniformity issues.

```python
import matplotlib.pyplot as plt

# Create scatter plot to find values that don't fit the expected range
plt.scatter(x='Date', y='Temperature', data=temperatures)
plt.title('Temperature in Celsius March 2019 - NYC')
plt.xlabel('Dates')
plt.ylabel('Temperature in Celsius')
plt.show()

# Analysis: If most data is between 0-25°C but some points are at 60-80°C, 
# those outliers are likely in Fahrenheit.
```

---

**Step 2: Statistical Conversion**
Once identified, you can isolate and fix only the values that exceed a logical threshold.

```python
# Isolate values above a realistic Celsius threshold (e.g., 40°C)
temp_fah = temperatures.loc[temperatures['Temperature'] > 40, 'Temperature']

# Convert isolated values to Celsius
temp_cels = (temp_fah - 32) * (5/9)

# Update the original DataFrame with the corrected values
temperatures.loc[temperatures['Temperature'] > 40, 'Temperature'] = temp_cels

# Assert: Verify that no value now exceeds the logical maximum
assert temperatures['Temperature'].max() < 40


```

---


> **Context Matters:** You might work with weather data from different regions. Using a threshold like $40^\circ\text{C}$ requires knowing the local climate—a $45^\circ\text{C}$ reading might be an outlier in NYC, but it’s a normal summer day in some parts of Morocco!



---


### 1.3 Treating Date data:

**`pd.to_datetime()`**

> Can recognize most formats automatically, sometimes fails with erroneous/unrocognizable formats (eg, 08/03/2026 which one is the month, ..)

```python
# Converts to datetime - but won't work!
birthdays['Birthday' ] = pd.to_datetime(birthdays['Birthday' ]) # Output -> ValueError: month must be in 1 .. 12

# Will work!
birthdays['Birthday' ] = pd.to_datetime(birthdays['Birthday' ],
                                        # Return NA for rows where conversion failed
                                        errors = 'coerce' )

```

---

**`df.dt.strftime("String format")`**

```python
birthdays['Birthday' ] = birthdays['Birthday' ].dt.strftime("%d-%m-%Y")
```

---

**Treating ambiguous date data** 

is `2019-03-08` **in August or March**

Solutions:
- Convert to `NA` and treat accordingly.
- Infer format by understanding data source.
- Infer format by understadning previous and subsequent data in the DataFrame.




---



## 2. Cross field validation

> The use of **multiple** fields in a dataset to sanity check data integrity (e.g., Age vs Date Of Birth).

---

### 2.1. Flight Passenger Data

|  | flight_number | economy_class | business_class | first_class | total_passengers |
| --- | --- | --- | --- | --- | --- |
| **0** | DL140 | 100 | 60 | 40 | 200 |
| **1** | BA248 | 130 | 100 | 70 | 300 |
| **2** | MEA124 | 100 | 50 | 50 | 200 |
| **3** | AFR939 | 140 | 70 | 90 | 300 |
| **4** | TKA101 | 130 | 100 | 20 | 250 |

---

```python
sum_classes = flights[ ['economy_class', 'business_class', 'first_class']].sum(axis = 1)
passenger_equ = ( sum_classes == flights['total_passengers'] )

# Find and filter out rows with inconsistent passenger totals
inconsistent_pass = flights[~passenger_equ]

consistent_pass = flights[passenger_equ]
```

---

### 2.2. Users dataset

```python
import pandas as pd
import datetime as dt

# Convert to datetime and get today's date
users['Birthday'] = pd.to_datetime(users['Birthday'])
today = dt.date.today ()

# For each row in the Birthday column, calculate year difference
age_manual = ( today.year - users['Birthday' ].dt.year )

# Find instances where ages match
age_equ = ( age_manual == users['Age' ] )

# Find and filter out rows with inconsistent age
inconsistent_age = users[~age_equ]

consistent_age = users[age_equ]
```

---

### 2.3. Note:

> what to do when we catch inconsistencies?
> - dropping data.
> - set to missing and impute.
> - Apply rules from domain knowledge.







## 3. Completeness

> Analyzing the gaps in your data.

```python
## 1. Checking for NaN Values:
df.isna()
df.isna().any()     # Per column has NaN?
df.isna().sum()     # Count NaN per column


## 2. Plotting Missing Values:
df.isna().sum().plot(kind="bar")


## 3. Removing NaNs:
df.dropna()
```

---

```python
## Useful package for visualizing and understanding missing data

import missingno as msno
import matplotlib.pyplot as plt

# Visualize missingness
msno.matrix(airquality)
plt.show()
"""
This matrix essentially shows how missing values are distributed across a column.
We see that missing CO2 values are randomly scattered throughout the column.
"""
```

---

```python
# Isolate missing and complete values aside
missing = airquality [airquality['C02'].isna()]
complete = airquality[~airquality['C02'].isna()]


# Describe complete DataFramee
complete.describe ()

# Describe missing DataFramee
missing.describe()


"""
There is a clear dependency between variables: whenever the Temperature drops below 0C the CO2 sensor readings result in null    values (NaN). This suggests a sensor-level hardware failure or an operational limit under sub-zero conditions.
"""

```

---

```python
sorted_airquality = airquality.sort_values(by = 'Temperature')
msno.matrix(sorted_airquality)
plt.show()

"""
Notice how all missing values are on the top?
This is because values are sorted from smallest to largest by default.
 This essentially confirms that CO2 measurements are lost for really low temperatures. Must be a sensor failure!
"""
```

---

### 3.1. Missingness types:


**Missing Completely at Random (MCAR)**

> Missing completely at random data is when there missing data completely due to randomness,
 and there is no relationship between missing data and remaining values, such data entry errors.

---

**Missing at Random (MAR)**

> Missing at random data is when there is a relationship between missing data and other **observed** values, such as our CO2 data being missing for low temperatures.

---

**Missing Not at Random (MNAR)**

> When data is missing not at random, there is a systematic relationship between the missing data and **unobserved** values. For example, when it's really hot outside, the thermometer might stop working, so we don't have temperature measurements for days with high temperatures.
>
> However, we have no way to tell this just from looking at the data since we can't actually see what the missing temperatures are.

---

### 3.2. How to deal with missing data?

**Simple approaches:**

- Drop missing data.
- Impute with statistical mesures (mean, median, mode ..)

---

**More Complex approaches**

- Imputing using an algorithmic approach.
- Impute with machine learning models.

---


### 3.3. Dealing with missing data:

```python
# Drop missing values
airquality_dropped = airquality.dropna(subset = ['C02'])
airquality_dropped.head()

# Replacing with statistical measures
co2_mean = airquality['C02'].mean()
airquality_imputed = airquality. fillna({'C02': co2_mean})
airquality_imputed.head()
```





# V. Record linkage (Joining Messy Data)

> **Utility:** Used when you need to merge two DataFrames that lack a common unique key (like an ID), or when your "Join Keys" are riddled with typos, abbreviations, or inconsistent formatting.

## 1. Comparing strings (Fuzzy Matching)

> **The Goal:** Quantify the "closeness" of two strings using a score (0-100).
> - **Utility A (Linking):** Join two DataFrames that lack a common unique ID.
> - **Utility B (Cleaning):** Standardize a messy column by "snapping" typos to a master list of correct values.
>
> **The Engine:** Most fuzzy matching (like thefuzz) is powered by the **Levenshtein Distance** algorithm. It calculates the minimum number of single-character edits _(insertions, deletions, or substitutions)_ required to change one word into another.
>
> **Other algorithms:** Hamming, Damerau-Levenshtein, Jaro-Winkler ..

---

```python
## Simple string comparison

# Lets us compare between two strings
from thefuzz import fuzz # install it with `pip install thefuzz`

# Compare reeding vs reading
fuzz.WRatio('Reeding', 'Reading') # 86


## Partial string comparison
fuzz.WRatio('Houston Rockets', 'Rockets') # 90

## string comparison with different order
fuzz.WRatio('Houston Rockets vs Los Angeles Lakers', 'Lakers vs Rockets') # 86
```

---

```python
# Import process
from thefuzz import process

# Define string and array of possible matches
string = "Houston Rockets vs Los Angeles Lakers"
choices = pd. Series(['Rockets vs Lakers', 'Lakers vs Rockets',
'Houson vs Los Angeles', 'Heat vs Bulls' ])

process.extract(string, choices, limit = 2) # Output: [('Rockets vs Lakers', 86, 0), ('Lakers vs Rockets', 86, 1)]
# (choice, similarity, index_in_the_array)
```

---

### 1.1. Collapsing categories with string similarity:

> We Used `.replace()` to collapse "eur" into "Europe".
>
> What if there are too many variations?
> - "Europ", "Europa", "EU", "eur", "Erope" , "Evropa" ..
>
> The answer is **String similarity**.

---

```python
survey['state'].unique() # Contains hundreds of typos.

# categories df contains correct category for each state


# For each correct category
for state in categories['state']:
    # Find potential matches in states with typoes
    matches = process.extract(state, survey['state'], limit = survey.shape[0])
         # Return all possible matches by setting `limit = length of survey df`

    # For each potential match match
    for potential_match in matches:
        # If high similarity score
        if potential_match[1] >= 80:
            # Replace typo with correct category
            survey.loc[survey['state'] == potential_match[0], 'state'] = state 



```

---

## 2. Generating pairs

> For this part we will use 2 dataframes (census_A, census_B)

> Normally we will generate all possible pairs between DataFrames, but if we had big dataframes we will endup generating millons if not billons of pairs
>
> The solution is `Blocking` (Creates pairs based on a matching column)

```python
# Import recordlinkage
import recordlinkage

# Create indexing object 
indexer = recordlinkage.Index() # Indexing object is used to generate pairs

# Generate pairs using 'state' as a blocking variable to reduce the search space
# (Only compares rows where the state is identical)
pairs = indexer.index(census_A, census_B)

# IMPORTANT: Maintain the order of DataFrames (A, B) throughout the entire 
# linkage process. Swapping them later will cause index misalignment.

print(pairs) 
"""
The resulting object, is a pandas multi index object containing pairs of row indices from both DataFrames,
 which is a fancy way to say it is an array containing possible pairs of indices.

Output:
MultiIndex (Levels=[ ['rec-1007-org', 'rec-1016-org', 'rec-1054-org', 'rec-1066-org',
'rec-1070-org', 'rec-1075-org', 'rec-1080-org', 'rec-110-org', 'rec-1146-org',
'rec-1157-org', 'rec-1165-org', 'rec-1185-org', 'rec-1234-org' , 'rec-1271-org' ,
'rec-1280-org', ...
66, 14, 13, 18, 34, 39, 0, 16, 80, 50, 20, 69, 28, 25, 49, 77, 51, 85, 52, 63, 74, 61,
83, 91, 22, 26, 55, 84, 11, 81, 97, 56, 27, 48, 2, 64, 5, 17, 29, 60, 72, 47, 92, 12,
95, 15, 19, 57, 37, 70, 94]], names=['rec_id_1', 'rec_id_2'])
"""
```

---

```python
# Generate the pairs
pairs = indexer.index(census_A, census_B)
# Create a Compare object
compare_cl = recordlinkage.Compare()


# Find exact matches for pairs of date_of_birth and state
compare_cl.exact('date_of_birth', 'date_of_birth' , label='date_of_birth')
compare_cl.exact('state', 'state', label='state')
# Find similar matches for pairs of surname and address_1 using string similarity
compare_cl.string ('surname', 'surname', threshold=0.85, label='surname' )
compare_cl.string('address_1', 'address_1', threshold=0.85, label='address_1')

# .exact() and .string() takes in the column names in question

# Find matches
potential_matches = compare_cl.compute(pairs, census_A, census_B)
```

---

```python
## Finding matching pairs
print(potential_matches)  # 1 for a match, 0 for not a match.
```

| rec_id_1 | rec_id_2 | date_of_birth | state | surname | address_1 |
| --- | --- | --- | --- | --- | --- |
| **rec-1070-org** | rec-561-dup-0 | 0 | 1 | 0.0 | 0.0 |
|  | rec-2642-dup-0 | 0 | 1 | 0.0 | 0.0 |
|  | rec-608-dup-0 | 0 | 1 | 0.0 | 0.0 |
| ... |  |  |  |  |  |
| **rec-1631-org** | rec-4070-dup-0 | 0 | 1 | 0.0 | 0.0 |
|  | rec-4862-dup-0 | 0 | 1 | 0.0 | 0.0 |
|  | rec-629-dup-0 | 0 | 1 | 0.0 | 0.0 |
| ... |  |  |  |  |  |

---


```python
# Filter for pairs with a total matching score of 2 or more
matches = potential_matches[potential_matches.sum(axis=1) >= 2]
print(matches)


"""
To find the rows that are actually the same person, we filter the DataFrame. We only want pairs where multiple columns match (e.g., a total score of 2 or higher).
"""
```



| rec_id_1 | rec_id_2 | date_of_birth | state | surname | address_1 |
| --- | --- | --- | --- | --- | --- |
| **rec-4878-org** | rec-4878-dup-0 | 1 | 1 | 1.0 | 0.0 |
| **rec-417-org** | rec-2867-dup-0 | 0 | 1 | 0.0 | 1.0 |
| **rec-3964-org** | rec-394-dup-0 | 0 | 1 | 1.0 | 0.0 |
| **rec-1373-org** | rec-4051-dup-0 | 0 | 1 | 1.0 | 0.0 |
|  | rec-802-dup-0 | 0 | 1 | 1.0 | 0.0 |
| **rec-3540-org** | rec-470-dup-0 | 0 | 1 | 1.0 | 0.0 |





## 3. Linking DataFrames

```python
# 1. Import recordlinkage and generate pairs and compare across columns
...
# 2. Generate potential matches
potential_matches = compare_cl.compute(full_pairs, census_A, census_B)

# 3. Isolate matches with matching values for 3 or more columns
matches = potential_matches[potential_matches.sum(axis = 1) >= 3]

# 4. Extract the indices of the duplicate rows from census_B
duplicate_rows = matches.index.get_level_values(1)  # level(1) refers to the second index in the MultiIndex (census_B)

# 5. Identify unique rows in census_B that do NOT exist in census_A
census_B_new = census_B[~census_B.index.isin(duplicate_rows)] # Remove duplicates

# 6. Link the DataFrames!
full_census = pd.concat([census_A, census_B_new])
```







# VI. Strategies for addressing missing data

- Drop missing values
    - 5% or less of total values

- Impute mean, median, mode
    - Depends on distribution and context

- Impute by sub-group
    - Different experience levels have different median salary


---

## 1. Dropping missing values:

```python
threshold = len(salaries) * 0.05

cols_to_drop = salaries.columns[salaries.isna().sum() <= threshold]

salaries.dropna(subset = cols_to_drop, inplace = True)
```



## 2. Imputing a summary statistic:

```python
cols_with_missing_values = salaries.columns[salaries.isna().sum() > 0]

print(cols_with_missing_values) 
"""
Output:
     Index (['Experience', 'Employment_Status' , 'Company_Size' , 'Salary_USD' ],dtype='object' )
"""

# Impute the first 3 columns
for col in cols_with_missing_values[:-1]:  
    salaries[col].fillna(salaries[col].mode()[0])
```


## 3. Imputing by sub-group

```python
salaries_dict = salaries.groupby("Experience")["Salary_USD"].median().to_dict()
print(salaries_dict)
"""
Output:
    {'Entry': 55380.0, 'Executive' : 135439.0, 'Mid' : 74173.5, 'Senior': 128903.0}
"""

# Because `.fillna()` expects a single value (like a number or string) or a Series/DataFrame that matches the index of your original data.

# We can't just pass the dict

# Solution:
salaries["Salary_USD"] = salaries["Salary_USD"]. fillna(salaries["Experience"].map(salaries_dict) )


```



# VII. Etc

## 1. Handling outliers

> An observation far away from other data points.
> - Median house price: 400,000$
> - Outlier house price: 5,000,000$


### 1.1. Defining an outlier mathematically:

#### 1.1.1. Using the interquartile range (IQR)

- IQR = 75th - 25th percentile

- Upper Outliers > 75th percentile + (1.5 * IQR)

- Lower Outliers < 25th percentile - (1.5 * IQR)

---


```python
## Identifying thresholds

# 75th percentile
seventy_fifth = salaries["Salary_USD"].quantile(0.75)

# 25th percentile
twenty_fifth = salaries["Salary_USD"].quantile(0.25)

# Interquartile range
salaries_iqr = seventy_fifth - twenty_fifth

print(salaries_iqr) # 76305.0



# Upper threshold
upper = seventy_fifth + (1.5 * salaries_iqr)

# Lower threshold
lower = twenty_fifth - (1.5 * salaries_iqr)

print(upper, lower) # 251953.5 -53266.5
```

---

```python
## Indentifying outliers 

salaries[ (salaries["Salary_USD"] < lower) | (salaries["Salary_USD"] > upper) ] \
[["Experience", "Employee_Location", "Salary_USD"]]
```

---


```python
# IQR in Box plot:

sns.boxplot (data=salaries,
y="Salary_USD")

plt. show()
```



---

### 1.2. Why looking for outliers?
- Outliers are extreme values
    - may not accurately represent our data

- Can change the mean and standard
deviation

- Many statistical tests and machine learning models assume normally distributed data; significant skewness (left or right) can bias parameter estimates and reduce model accuracy



---
### 1.3. What to do about outliers?
Questions to ask:
- Why do these outliers exist?
    - More senior roles / different countries pay more
    - Consider leaving them in the dataset

- Is the data accurate?
    - Could there have been an error in data collection?
        - If so, remove them



---
### 1.4. Dropping outliers:
```python
no_outliers = salaries[(salaries["Salary_USD"] > lower) & (salaries["Salary_USD"] < upper)]
```

---






































