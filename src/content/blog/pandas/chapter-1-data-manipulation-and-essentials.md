---
title: "Chapter 1_ Data manipulation & Essentials"
description: "A guide on creating and exporting DataFrames, inspecting data, broadcasting, sorting, subsetting, and computing summary statistics."
pubDate: "Feb 26 2026"
---

# 1. Creating Dataframes

| name   | breed       | height | weight | date of birth |
|--------|-------------|--------|--------|---------------|
| Ginger | Dachshund   | 22     | 10     | 2019-03-14    |
| Scout  | Dalmatian   | 59     | 25     | 2019-05-09    |

---

## 1.1. Creating `Dataframes` from a `List of Dictionaries`

- Constructed row by row

```python
import pandas as pd

list_of_dicts = [
    {"name": "Ginger", "breed": "Dachshund", "height_cm": 22,
     "weight_kg": 10, "date_of_birth": "2019-03-14"},
    {"name": "Scout", "breed": "Dalmatian", "height_cm": 59,
     "weight_kg": 25, "date_of_birth": "2019-05-09"}
]

new_dogs = pd.DataFrame(list_of_dicts)
```



## 1.2. Creating `Dataframes` from a `Dictionary of Lists`

- Constructed column by column

```python
import pandas as pd

dict_of_lists = {
    "name": ["Ginger", "Scout"],
    "breed": ["Dachshund", "Dalmatian"],
    "height_cm": [22, 59],
    "weight_kg": [10, 25],
    "date_of_birth": ["2019-03-14",
    "2019-05-09"]
}
new_dogs = pd.DataFrame(dict_of_lists)
```



## 1.3. Load data into `DataFrames` (importing data)

```python
import pandas as pd

# 1. From CSV
df_csv = pd.read_csv("dogs.csv")

## or 
df = pd.read_csv("smth.csv", index_col=0) # telling pandas that the first column (index 0) should be the index.

# 2. From Excel
# Specify the sheet name if it's not the first one
df_excel = pd.read_excel("dogs.xlsx", sheet_name="Sheet1")

# 3. From JSON
df_json = pd.read_json("dogs.json")
```



## 1.4. Saving Your Work (Exporting data)

```python
import pandas as pd
from sqlalchemy import create_engine

# Setup a sample DataFrame
df = pd.DataFrame({
    'ID': [1, 2, 3],
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Score': [95, 88, 92]
})

# --- THE BIG FOUR ---

# 1. CSV (The universal standard)
# index=False prevents a useless 'Unnamed: 0' column on reload -> because it does save the index as 'Unamed :0': list_of_index
df.to_csv("data.csv", index=False, sep=",", encoding="utf-8")
"""
The reason this is so dangerous for beginners is that it compounds. If you save a file 3 times without index=False, your data will eventually look like this:

    Unnamed: 0.2  Unnamed: 0.1  Unnamed: 0    Name  Score
0              0             0           0   Alice     95
1              1             1           1     Bob     88



## If you have duplicate unnamed columns, Pandas appends a suffix like .1, .2 to keep them unique.('Unamed: 0.1' 'Unamed: 0.2')
"""

# 2. EXCEL (The business standard)
# Requires: pip install openpyxl
df.to_excel("data.xlsx", index=False, sheet_name="Results")

# 3. JSON (The web standard)
# 'records' orientation is the most common format for web APIs
df.to_json("data.json", orient="records", indent=4)

# 4. MARKDOWN (The documentation standard)
# Requires: pip install tabulate
# Perfect for pasting into your blog or GitHub README
markdown_table = df.to_markdown(index=False)
with open("data.md", "w") as f:
    f.write(markdown_table)


# --- ADVANCED / PRO FORMATS ---

# 5. PICKLE (The Python standard)
# Best for intermediate steps; preserves Python data types perfectly
df.to_pickle("data.pkl")

# 6. SQL (The database standard)
# Requires: pip install sqlalchemy
# engine = create_engine('sqlite:///my_database.db')
# df.to_sql("table_name", con=engine, if_exists="replace")

# 7. CLIPBOARD (The "Quick Share" standard)
# Copies to your RAM so you can Ctrl+V into Excel or Slack immediately
df.to_clipboard(index=False)

# etc

```

# 2. Inspecting & Understanding Data

## 2.1. Inspecting DataFrames:
```python
df.head()          # The first 5 rows, Return a df
df.tail()          # The last 5 rows, Return a df
df.sample(5)       # 5 random rows from anywhere in the data, Return a df

df.info()          # Checking Data Types and Null counts, Doesn't return a df, but it does auto-print.
df.describe()      # Summary statistics (Mean, Max, etc.), Return a df.

df.shape           # DataFrame dimensions, return a tuple (Rows, Cols)
df.axes            # Returns a list: [Row_Index, Column_Names]  -> df.axes[0] : row_index   |   df.axes[1] : Col_names

df.size            # Rows*Cols
df["col"].size     # Rows in Column,  <=>  len(df['col'])
len(df)            # Count of rows

# <------------------ axis argument -------------------->

# Average of each column (Collapses Rows) (DEFAULT)
df.mean(axis=0)            
df.mean(axis="index")      

# Average of each row (Collapses Columns)
df.mean(axis=1)            
df.mean(axis="columns")
```

---


## 2.2. DataFrame Components:
```python
df.values          # Underlying NumPy array     
df.columns         # Column names               
df.index           # Row labels (index)         
```

---

```python
# 1. Single Column Type
df['col'].dtype          # Returns the dtype (e.g., int64, float64)

# 2. All Column Types at Once
df.dtypes                # Returns a Series of dtypes for the whole DF
```
---

**Examples:**

```python
import pandas as pd
import numpy as np

# 1. Setup a basic DataFrame
df = pd.DataFrame({
    'A': [1, 2],
    'B': [3, 4]
})

# 2. CHANGE COLUMNS: This works!
# Useful for renaming everything at once
df.columns = ['ID', 'Value']

# 3. CHANGE INDEX: This works!
# Changes the row labels
df.index = ['First', 'Second']

# 4. CHANGE VALUES: This FAILS
try:
    df.values = np.array([[10, 20], [30, 40]])
except AttributeError as e:
    print(f"Error: {e}") 

# 5. CORRECT WAY to change data
# Use .iloc or .loc to modify the actual underlying values
df.iloc[0, 1] = 99

print(df)

```

---

## 2.3. BroadCasting

> **For example** `df.iloc[0:9, 1] = 99` . NumPy (the engine inside Pandas) automatically "stretches" the data for you.

**Scenario A: Scalar to Slice**

If you give a single number to a big slice, it fills the whole area.

```python
# Turns every cell in the first 5 rows of column 0 into 100
df.iloc[0:5, 0] = 100
```

---

**Scenario B: List to Slice**

If you give a list, it must match the "shape" of the slice.

```python
# If the slice has 3 rows, the list must have 3 items
df.iloc[0:3, 0] = [10, 20, 30]
```


---

**Scenario C: Math Operations**

Broadcasting also works for math. You don't need a for loop!

```python
# Adds 10 to EVERY value in the whole DataFrame instantly
df = df + 10

```

> Imagine you want to do: `df['Price'] * 1.2` (to add a 20% tax).
>
> **Broadcasting** takes that single number 1.2 and "stretches" it into a virtual column of the same size as your data.
>
> **Vectorization** then multiplies the two columns together in one single, lightning-fast step.





# 3. Sorting

## 3.1. Sorting By Columns:
```python
df.sort_values("columnName")                          # Sort by single column
# same as:  df.sort_values(by="colName")
df.sort_values(["col1", "col2"])                      # Sort by multiple columns
df.sort_values("columnName", ascending=False)         # Descending sort,  DEFAULT: ASC
df.sort_values(["col1", "col2"], ascending=[True, False])  # Mixed sort order
```

---

## 3.2. Sorting by Index:
```python
df.sort_index() # DEFAULT: ASC
df.sort_index(level=["col1", "col2"], ascending=[True, False])

# Sorts your column names from A to Z across the top
df.sort_index(axis=1) # axis=1: Sorts the column headers.

```

---

```python
# 1. PERMANENT CHANGE (The 'Inplace' Way)
# Returns None, modifies original 'df' directly.
df.sort_values('Age', inplace=True)
df.sort_index(inplace=True)

# 2. THE PREVIEW/SAVE WAY (Reassignment)
# Returns a new DataFrame. Original stays safe unless you re-save it. (Helps with method chaining and it's best practice to do it this way)
df = df.sort_values('Age')
df = df.sort_index()

# ⚠️ THE CRITICAL ERROR (Avoid this!)
# df = df.sort_values('Age', inplace=True) 
# Result: df becomes None!

```

> Both `df.sort_values()` and `df.sort_index()` have `inplace` parameter.


# 4. Subsetting & Indexing

## 4.1. Column Selection
```python
df["column1"]                  # Returns Series
df[["column1", "column2"]]     # Returns DataFrame
```

---

## 4.2. Row Filtering

# 4.1.1. Row Slicing Shortcut
```python
# Unlike df["col"] which looks for a header, df[a:b] looks for ROW POSITIONS.

df[0:5]          # Returns the first 5 rows (Rows 0, 1, 2, 3, 4)
# ⚠️ END POINT IS EXCLUDED (Standard Python behavior)

df[:10]          # First 10 rows
df[-5:]          # Last 5 rows (very useful!)
```
---

```python
# 1. SELECTING A SINGLE ROW (Fails)
# df[0]  -> Throws a KeyError (Pandas thinks you are looking for a COLUMN named '0')

# 2. SLICING ROWS (Works)
# df[0:1] -> Returns the first row as a DataFrame.
```

---

### 4.2.2. Logical Conditions:
```python
cond = df["column"] > 10
df[cond]
```

---

### 4.2.3. Multiple Conditions:
```python
cond1 = df["col1"] == 'value1'
cond2 = df["col2"] == 'value2'
df[cond1 & cond2]  # Use & for AND, | for OR
```

```python
# ⚠️ MANDATORY: You MUST wrap each condition in parentheses ()
# Correct:
df[(df["col1"] > 5) & (df["col2"] < 10)] 

# Incorrect (Will throw an error):
# df[df["col1"] > 5 & df["col2"] < 10]
```

---

### 4.2.4. Using `.isin()`:
```python
df["col"].isin(["value1", "value2"])
```

---

### 4.2.5. Using `.between()`:
```python
df["score"].between(15, 20)  # Equivalent to (df["score"] >= 15) & (df["score"] <= 20)
```

---

### 4.2.6 Using `np.query()`:
```python
# Traditional way
df[(df["age"] > 25) & (df["status"] == "Active")]

# The .query() way (Much cleaner!)
df.query("age > 25 and status == 'Active'")

# Using a variable with the @ symbol
min_age = 25
df.query("age > @min_age")
```






## 4.3. Index-based Selection

### 4.3.1. Setting/Resetting Index:
```python
df = df.set_index("column1")
df = df.set_index(["col1", "col2"]) # Multi-level indexes
df.reset_index()
df.reset_index(drop=True)
```

---

### 4.3.2. loc - Label-based Indexing:
```python
# loc is End Point Inclusive (includes the end).

df.loc["Index_Start":"Index_End"]                        # Slice rows
df.loc["Index_Start":"Index_end", "col1":"col3"]         # Slice rows and cols

df.loc[ boolean_serie , 'col']
```

---

```python
#Examples:
df = df.set_index(["breed","color"])


# Subset the outer index level:
df.loc[["labrador","chihuahua"]]
df.loc[:, "name"]


# Subset the inner index level: (with a list of tuples)
x = [ ("labrador","Brown"), ("chihuahua","Tan") ]
df.loc[x]
df.loc[x, "name"]


# inner index level slicing:
df.loc( ("labrador","Brown"):("chihuahua","Tan") )
df.loc( ("labrador","Brown"):("chihuahua","Tan"),   "name":"height_cm" )



# boolean indexing:
df.loc[ df['col'].str.len() > 10, 'breed']


```

---

### 4.3.3. iloc - Position-based Indexing:
```python
# iloc is End Point Exclusive (stops before).

df.iloc[0:5, 0:4]   # First 5 rows, first 4 columns (not inclusive)
```

---

### 4.3.4. Date Slicing:
```python
df["date"].dt.year
df["date"].dt.month
df["date"].dt.day

# This following syntax works only If the date column is an index:
df["2022"]
df["2022-07"]
df["2022-07-15"]

# Use .loc for date slicing to be safe and explicit, if date is the index (DatetimeIndex)
df.loc["2022"]
df.loc["2022-07-01":"2022-07-15"]


# Subsetting based on dates
df[df['col'] > '2016-01-01']
```

---





# 5. Summary Statistics

## 5.1. Numerical Data:

### 5.1.1. Basic Summary Statistics:

```python
df["col"].mean()
df["col"].mode()
df["col"].min()
df["col"].max()
df["col"].median()
df["col"].var()
df["col"].std()
df["col"].sum()
df["col"].quantile()

# --- NOTE ---

df.mean(numeric_only=True)
# In newer versions of Pandas, if you try to run .mean() or .sum() on a DataFrame that contains strings (like Names), it will throw a warning or error.

```

---

### 5.1.2. Aggregate Functions:
```python
# method 1:
df[["col1", "col2"]].agg(["mean", "max"])

# method 2:
summaries = {"height":"max", "weight":"mean"}
df.agg(summaries)

# method 3:
df["height"].agg(["mean", lambda x: x.max() - x.min()])  # Calculate mean and the range (Max - Min)

# method 4: 
df.groupby("gender").agg({
    "height": ["min", "max", "mean"],
    "weight": "median"
})  # # Calculate stats per gender/category

```

---

### 5.1.3. `.transform()`

> **Core Logic:** Unlike `.agg()`, which shrinks data, `.transform()` always returns an output with the same number of rows as the original. It "broadcasts" the result back to every row.

```python
# Method 1: The Group-Broadcast (With groupby)

# Goal: Compare each dog's weight to its breed's average
# Result: A new column where every 'breed: eg, Labrador' has the same avg value
df["breed_avg_weight"] = df.groupby("breed")["weight_kg"].transform("mean")

# Now you can do vectorized math across rows:
df["diff_from_avg"] = df["weight_kg"] - df["breed_avg_weight"]


# Example 2:
salaries["median_by_comp_size"] = salaries.groupby("Company_Size")["Salary_USD"].transform(Lambda x: x.median())
```

---

```python
# Method 2: Element-wise Transformation (Without groupby)

"""
Used for Method Chaining. It applies a function to every cell but "guarantees" the shape won't change (unlike .apply(), which is unpredictable).
"""

# Goal: Clean a numeric column using multiple math steps in a chain
df["score_cleaned"] = df["score"].transform(np.abs).transform(np.sqrt)

# Goal: Apply multiple functions at once (Returns a DataFrame)
df[["log_val", "exp_val"]] = df["col"].transform([np.log, np.exp])
```

> etc

---

### 5.1.4 Cumulative Operations:
```python
df["col"].cumsum()
df["col"].cummax()
df["col"].cummin()
df["col"].cumprod()
```


## 5.2. Categorical Data:

### 5.2.1 Value Counts:
```python
# works on series only.
df["col"].value_counts()
df["col"].value_counts(sort=True)        # Default: descending
df["col"].value_counts(normalize=True)   # Proportions
df["breed"].value_counts(dropna=False) # This gives you the frequency of data AND the count of 'NaN'


# Workaround in dataframes:
df.groupby('col').count()
```

---

### 5.2.2 Other metrics
```python
# --- CATEGORICAL SUMMARY STATISTICS ---

# 1. THE ALL-IN-ONE METHOD
# Returns: count, unique, top, freq
stats = df["breed"].describe()

# 2. THE INDIVIDUAL EQUIVALENTS
count_val  = df["breed"].count()    # Same as 'count' (non-nulls)
unique_val = df["breed"].nunique()  # Same as 'unique' (diversity/spread)
top_val    = df["breed"].mode()[0]  # 'top' is the categorical equivalent of 'mean' (the Typical category).
# Note: .mode() returns a Series (to handle ties/multiple winners),
# so we use [0] to extract the single most frequent value.

freq_val   = df["breed"].value_counts().max() # Same as 'freq' (mode strength)

# --- THE "DIVERSITY" LOGIC ---

# High nunique() -> High diversity (Many different categories)
# Example: df["User_ID"].nunique() (Almost equal to row count)

# Low nunique() -> Low diversity (Concentrated data)
# Example: df["Gender"].nunique() (Usually 2 or 3)



# --- EXPLANATION ----

# Mode (top): This is the Name of the winner.
# Frequency (freq): This is the Score of the winner.

df["col"].nunique()   # Number of unique categories (e.g., "5 unique breeds")
df["col"].unique()    # Returns an array of the unique names themselves
```


## 5.3. Grouped Summary Statistics

### 5.3.1. Group By:
```python
import numpy as np

df.groupby('col1')['target_col'].mean()
df.groupby('col1')[[ 'target_col1','target_col2']].mean()

df.groupby(["col1", "col2"])["target_col"].mean()
df.groupby(["col1", "col2"])["target_col"].agg(["mean", "sum", np.min, np.max])

df.groupby('col1').size    # get the size of each group
df.groupby('col1').first() # first row of each group

res = df.groupby("breed")["weight"].mean()
# 'breed' is now the INDEX.
# You cannot access it as a column (e.g., res['breed'] will fail).


res = df.groupby("breed")["weight"].mean().reset_index()
# 'breed' is now a regular COLUMN again.
# You have a clean 0, 1, 2, 3... integer index on the left.


# GroupBy: Named Aggregation (Modern Standard)
df.groupby("breed").agg(
    avg_weight = ("weight_kg", "mean"),
    max_height = ("height_cm", "max")
) # Returns a clean DF with custom column names

# FAILS: This will throw a TypeError
df.agg(avg_weight=("weight_kg", "mean"))  # because named aggregation is designed specifically for groupby.

```

---

### 5.3.3. Pivot Table (Default: mean)

Pivot tables are used to summarize data across groups.  
- `values`: The numeric column you want to summarize  
- `index`: The column(s) you want to group by (like rows in a table)  
- `columns`: Optional second grouping level (like columns in a table)  
- `aggfunc`: Aggregation function (`mean`, `sum`, etc.)  
- `fill_value`: Replace NaN values  
- `margins`: Add total row/column

```python
# Basic pivot table using default aggregation (mean)
df.pivot_table(values="val", index="group_col")

# Specify custom aggregation function
df.pivot_table(values="val", index="group_col", aggfunc="sum")
df.pivot_table(values="val", index="group_col", aggfunc=[np.mean, "sum"])


# Two-level grouping: rows + columns
df.pivot_table(values="val", index="group_col", columns="sub_col", fill_value=0)

# Advanced pivot table with margins (totals)
df.pivot_table(
    values="val",
    index=["group1"],
    columns="group2",
    fill_value=0,
    margins=True
)
```


# 6. Other parts of Pandas

## 6.1 Label Filtering (Boolean Indexing on Labels)
> `df.index[condition]`: Returns row labels/names where the condition is True.
>
> `df.columns[condition]`: Returns column labels/names where the condition is True.


## 6.2 Shifting (Lead and Lag)
```python
# Shift the indexes forward one, padding with NaT
rides['End date'].shift(1).head(3)
```


### 6.2.1. How `.shift()` Works

When you call `.shift(1)`, every value in your column moves down by one position. The first row becomes empty (filled with `NaN` or `NaT`) because there is no "previous" value to pull from.

* **Lag (Past Data):** `shift(1)` — Moves data **down**. Use this to compare the current row with the **previous** one.
* **Lead (Future Data):** `shift(-1)` — Moves data **up**. Use this to compare the current row with the **next** one.

---

#### A. Calculating "Idle Time" (Bike Data)

To find out how long a bike sat at a station between two different users, you need the `End date` of the **previous** ride and the `Start date` of the **current** ride.

```python
# 1. Get the end time of the previous ride
rides['previous_end'] = rides['End date'].shift(1)

# 2. Calculate the "Idle Time"
rides['idle_time'] = rides['Start date'] - rides['previous_end']

```



