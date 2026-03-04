---
title: "Chapter 2_ Feature engineering, Transformation & Accessors"
description: "Learn about conditional transformations, binning, mapping, applying logic, vectorization, scaling, encoding, and using accessors."
pubDate: "Feb 27 2026"
---

# I. Transformation

## 1. Conditional Transformation

> When you need to create a new column based on logic from other columns.

### 1.1. `np.where()` (Vectorized If-Else)

> Perfect for simple binary (A or B) logic.

```python
import numpy as np

# Syntax: np.where(condition, value_if_true, value_if_false)
df["is_adult"] = np.where(df["age"] >= 18, "Yes", "No")
```

---

### 1.2. `np.select()` (Vectorized If-Elif-Else)

> The professional way to handle multiple conditions without nesting.

```python
# 1. Define conditions
conditions = [
    (df["score"] >= 90),
    (df["score"] >= 80),
    (df["score"] < 80)
]
# 2. Define choices (applied when condition is True)
choices = ["A", "B", "C"]

# 3. Apply
df["grade"] = np.select(conditions, choices, default="F") 
# default is used when none of the conditions evaluate to True.


"""

Think of np.select() as:
    if cond1:
        choice1
    elif cond2:
        choice2
    elif cond3:
        choice3
    else:
        default

but applied to an entire column at once (vectorized).

"""
```
> **`np.select` Rule:** Always order your conditions from most specific to least specific (or highest to lowest). 
 The first True encountered is the final result for that row.

---

```python
# 💡 READ ME: This example uses the '.str' accessor (explained in Section II). 
# If you aren't familiar with '.str.contains' yet, focus on the np.select() 
# structure for now, then come back to this once you finish the chapter!

# Example1: (Goal : Creating a job_category column)

# 1. Define category labels
job_categories = ["Data Science", "Data Analytics",
"Data Engineering", "Machine Learning",
"Managerial", "Consultant"]

# 2. Define keyword patterns
data_science = "Data Scientist | NLP"
data_analyst = "Analyst | Analytics"
data_engineer = "Data Engineer | ETL | Architect | Infrastructure"
ml_engineer = "Machine Learning |ML | Big Data | AI"
manager = "Manager | Head | Director | Lead | Principal| Staff"
consultant = "Consultant | Freelance"


# 3. Define conditions
conditions = [
(salaries["Designation"].str.contains(data_science)),
(salaries["Designation"].str.contains(data_analyst)),
(salaries["Designation"].str.contains(data_engineer)),
(salaries["Designation"].str.contains(ml_engineer)),
(salaries["Designation"].str.contains(manager)),
(salaries["Designation"].str.contains(consultant))

]


# 4. Apply `np.select`
salaries["Job_Category"] = np.select(conditions,
                                    job_categories,
                                    default="Other")

# 5. Visualize
sns. countplot (data=salaries, x="Job_Category")
plt. show ()

```

---

```python
# Example 2: (Goal : Creating a Duration_category column)

# 1. Define categories
flight_categories = ["Short-haul","Medium","Long-haul"]


# 2. Define duration patterns (regex)
short_flights = "^0h|^1h|^2h|^3h|^4h"

medium_flights = "^5h|^6h|^7h|^8h|^9h"

long_flights = "^10h|^11h|^12h|^13h|^14h|^15h|^16h"

# 3. Define condtions
conditions = [
    (planes["Duration"].str.contains(short_flights)),
    (planes["Duration"].str.contains(medium_flights)),
    (planes["Duration"].str.contains(long_flights))]

# 4. Apply `np.select`
planes["Duration_Category"] = np.select(conditions, 
                                        flight_categories,
                                        default="Extreme duration")

# 5. Visualize:
sns.countplot(data=planes, x="Duration_Category")
plt.show()



```



## 2. Binning & Categorization

> Transforming continuous numbers into discrete groups.

### 2.1. `pd.cut()` (Fixed-Width Binning)

> You define the edges. Useful for specific business rules (e.g., Age Brackets).

```python
# Bins: 0-12 (Child), 12-19 (Teen), 19-100 (Adult)
df["age_group"] = pd.cut(df["age"], bins=[0, 12, 19, 100], labels=["Child", "Teen", "Adult"])
```


---

### 2.2. `pd.qcut()` (Quantile Binning)

> Pandas calculates edges so each bin has the same number of rows.

```python
# Split into 4 equal quartiles (25% of data each)
df["price_tier"] = pd.qcut(df["price"], q=4, labels=["Budget", "Mid", "High", "Luxury"])
```


## 3. Mapping & Applying Logic

### 3.1. Replacing Column Values (`.map()` vs `.replace()`) :
```python
# Manual reassignment (simplest case)
df["col"] = "new_value"  # Reassign manually like a dictionary key-value update

# Using .map() for conditional mapping
df["qualify"] = df["qualify"].map({"yes": True, "no": False})
# map() applies a dictionary to replace values exactly matching the keys, Replaces everything not in the dict with NaN.

# Using .replace() for substitution
df["qualify"] = df["qualify"].replace({"yes": True, "no": False})
# replace() Only replaces what you specify; keeps everything else as is.
```


### 3.2. `.apply()` (The Last Resort)

> Use this when NumPy doesn't have a vectorized solution. It is slow because it loops row-by-row.

```python
# Applying a custom function across rows
df["custom"] = df.apply(lambda row: row["A"] * 2 if row["B"] > 0 else 0, axis=1)
```

---

## 4. Vectorization

Combining multiple columns into a single ratio or score.

```python
# Feature: Body Mass Index (BMI)
# Weight (kg) / [Height (m)]^2
df["bmi"] = df["weight_kg"] / (df["height_cm"] / 100)**2

# Feature: Sales Growth Ratio
df["growth_ratio"] = (df["this_year"] - df["last_year"]) / df["last_year"]
```

> Note: **Vectorization** is roughly 100x to 1000x faster than `.apply()` because it performs operations at the C-level via NumPy rather than the Python-level loop.

<br><br><br>

> (Optional Part) ↓

<br><br><br>

## 5. Encoding
> Converting categorical text into numbers so algorithms can process them.

### 5.1. One-Hot Encoding (`pd.get_dummies()`)

> Creates a new column for every unique category (Binary 0 or 1). Best for nominal data (no inherent order, e.g., Colors, Cities).

```python
# Convert 'Color' column into 'Color_Red', 'Color_Blue', etc.
df_encoded = pd.get_dummies(df, columns=["color"], drop_first=True)
# drop_first=True prevents the 'dummy variable trap' (multicollinearity)
```

---


### 5.2. Label/Ordinal Encoding

> Assigns a unique integer to each category. Best for ordinal data (clear ranking, e.g., "Low", "Medium", "High").

```python
# Manual mapping to preserve order
mapping = {"Low": 1, "Medium": 2, "High": 3}
df["priority_scored"] = df["priority"].map(mapping)
```


## 6. Scaling

> Bringing features to the same range so large numbers don't dominate the model.

### 6.1. Min-Max Scaling (Normalization)
Rescales data to a fixed range, usually 0 to 1. Use this when you don't necessarily have a Gaussian (Normal) distribution.

$$x_{scaled} = \frac{x - x_{min}}{x_{max} - x_{min}}$$

```python
from sklearn.preprocessing import MinMaxScaler

scaler = MinMaxScaler()
df["price_scaled"] = scaler.fit_transform(df[["price"]])
```

---

### 6.2. Standardization (Z-Score Scaling)
Rescales data to have a mean of 0 and a standard deviation of 1. Best for algorithms that assume normally distributed data (like Linear Regression or SVM).
$$z = \frac{x - \mu}{\sigma}$$

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
df["income_standardized"] = scaler.fit_transform(df[["income"]])
```

<br><br><br>
<br><br><br>



# II. The Power of Accessors

> Accessors are bridges that allow you to use specialized methods on specific data types in a **vectorized** way.
>
> **The Accessor Rule:** You cannot call `.upper()` on a Series. You must use `df["col"].str.upper()`. This is because the accessor provides the vectorized engine for that data type.

## 1. String Accessor (`.str`)

> Used for text cleaning and extraction.

```python
df["name"] = df["name"].str.strip().str.title() # Clean whitespace and Capitalize
df["is_dalmatian"] = df["breed"].str.contains("Help|test", case=False)   # | <-> OR
df["initial"] = df["name"].str[0] # Slice strings like lists
df["title"] = df["name"].str.extract(r'([A-Za-z]+)\.')

df["phone"].str.strip().str.replace(r"\D", "", regex=True)
has_no_degits = df['phone'].str.contains(r'\D', regex=True)
```


## 2. Datetime Accessor (`.dt`)

> **Crucial:** The column must be converted to datetime first.

```python
df["date"] = pd.to_datetime(df["date"])

df["year"] = df["date"].dt.year
df["month_name"] = df["date"].dt.month_name()
df["is_weekend"] = df["date"].dt.dayofweek > 4 # 5 and 6 are Sat/Sun
```


## 3. Categorical Accessor (`.cat`)

> Used after converting a column to `category` to save memory and handle labels.

```python
df["size"] = df["size"].astype("category")
df["size_codes"] = df["size"].cat.codes # Converts 'Small', 'Medium' to 0, 1
df["labels"] = df["size"].cat.categories         # List unique category names
```

## 4. Custom Accessors (Extending Pandas)

> If you find yourself repeating the same complex transformations, you can register your own accessor. This makes your code more readable and reusable across different DataFrames.

### 4.1. Registering a Series Accessor
> Use the `@pd.api.extensions.register_series_accessor` decorator.
```python
import pandas as pd

@pd.api.extensions.register_series_accessor("geo")
class GeoAccessor:
    def __init__(self, pandas_obj):
        self._obj = pandas_obj

    def is_north_america(self):
        """Custom logic to check for NA countries"""
        na_countries = ["USA", "Canada", "Mexico"]
        return self._obj.isin(na_countries)

# --- USAGE ---
# Now your DataFrame has a '.geo' namespace!
df["is_na"] = df["country"].geo.is_north_america()
```

---



### 4.2. Registering a DataFrame Accessor
> Use the `@pd.api.extensions.register_dataframe_accessor` decorator.
```python
@pd.api.extensions.register_dataframe_accessor("cleaner")
class DataCleaner:
    def __init__(self, pandas_obj):
        self._obj = pandas_obj

    def drop_empty_rows(self):
        # Custom cleaning logic
        return self._obj.dropna(how="all")

# --- USAGE ---
df = df.cleaner.drop_empty_rows()
```




<br><br><br>
<br><br><br>




# III. Feature Engineering

> Feature Engineering is the process of using domain knowledge to create new variables (features/Columns) from raw data that help machine learning models or analytical reports perform better. **All the tools in Sections I & II are the "engines" that drive this process.**

### 1. Common Feature Engineering Strategies

| Goal | Strategy | Tool |
| --- | --- | --- |
| **Simplify Complexity** | Grouping continuous ages into "Life Stages" | `pd.cut()` |
| **Flagging** | Creating a 1/0 column for "Is_Weekend" or "Is_VIP" | `np.where()` / `.dt` |
| **Extraction** | Pulling "Domain Name" from an email address | `.str.extract()` |
| **Normalization** | Creating a "Sales Ratio" (This Year / Last Year) | **Vectorization** |
| **Encoding** | Converting "Size" labels into numbers (0, 1, 2) | `.cat.codes` |

---

### 2. The Golden Rule of Feature Engineering

> **"Information Density over Raw Data"**
> A raw timestamp like `2024-03-14 15:30:00` is hard for a model to understand. Extracting `Is_Lunch_Time (True/False)` or `Day_of_Week (Thursday)` provides **high-density info** that is much more useful for analysis.

---


# IV. Feature Engineering Notes

> Sometimes the format of our data can limit our ability to detect relationships or inhibit the potential performance of machine learning models. One method to overcome these issues is to generate new features from our data!


## 1. Feature Engineering & Data Type Conversion

> Data that appears categorical may contain hidden numerical value. Converting these allows us to calculate **correlation** and improve model performance.

### Example 1: Extracting Numbers from Strings

> A column like `total_stops` (values: "11 stops", "5 stops") is initially treated as `object` (categorical). By stripping the text and converting it to `int`, we can identify its relationship with the target variable.

* **Observation:** After conversion, a strong correlation was found between `total_stops` and `price`.

```python
# Convert "11 stops" -> 11 (Integer)
# We use regex \d+ to find one or more digits
df['total_stops'] = df['total_stops'].str.extract('(\d+)').astype(float)
```

---

### Example 2: Feature Extraction from Dates

> Machine learning models cannot "read" a raw date. We must extract specific features that might influence the target:

* **Logic:** If you suspect that the `month` or `weekday` affects the `price`, you can extract these from the `date_of_journey`.

```python
# Ensure the column is datetime first
df['date_of_journey'] = pd.to_datetime(df['date_of_journey'])

# Extract useful time-based features
df['month'] = df['date_of_journey'].dt.month
df['weekday'] = df['date_of_journey'].dt.weekday # 0=Monday, 6=Sunday
```

---


### Example 3: Binning (Discretization)

> You can create new categorical features from numerical ones to simplify the model's logic.

* **Application:** Creating "Ticket Classes" (Economy, Business, First Class) based on specific `price` ranges.

```python
# Define your price boundaries and labels
# This is Value-based binning (pd.cut)
bins = [0, 1000, 5000, np.inf]
labels = ['Economy', 'Business', 'First Class']

df['ticket_class'] = pd.cut(df['price'], bins=bins, labels=labels)
```

---

## 2. Visualizing Correlation

> The most efficient way to identify which features matter for your model is a **Heatmap**.

```python
# Visualize correlations to decide which features to keep
import seaborn as sns
import matplotlib.pyplot as plt

sns.heatmap(planes.corr(numeric_only=True), annot=True)
plt.title("Correlation Matrix of Flight Data")
plt.show()

```


## 3. Avoiding Spurious Correlations

> During EDA (Exploratory Data Analysis), it is vital to distinguish between a **direct correlation** and a **spurious correlation** (a relationship that appears causal but is actually driven by a third "lurking" variable).

* **The Trap:** You might observe a high correlation between `Total_Stops` and `Price`.

* **The Reality:** In many datasets, `Total_Stops` is simply a proxy for `Duration`. Longer flights usually have more stops, and it is the **Duration** (fuel, crew time, etc.) that truly drives the **Price**.

* **The Level Up:** While basic feature engineering involves just converting types or extracting dates, verifying a spurious correlation is an advanced task.

> **Note:** This is a deeper stage of **EDA** that requires **Sampling and Hypothesis Testing**. It is not "beginner" feature engineering; it requires statistical branches like **Partial Correlation** to prove which variable is the true driver.



## 4. Feature Explosion: The Risk of Over-using `pd.get_dummies()`

> When you apply One-Hot Encoding indiscriminately to every categorical column, you risk triggering the **Curse of Dimensionality**. This happens when the number of features (columns) grows too large relative to your number of rows.

* **Model Memorization:** The model stops learning general patterns and starts "memorizing" the training data, leading to high accuracy on training but failure on new data (**Overfitting**).

* **Computational Cost:** Training time and memory usage increase exponentially, often for diminishing returns in accuracy.
* ..

---


> **Note: The Multicollinearity Problem**
>
> If you forget `drop_first=True`, you create redundant features where one column can be perfectly predicted by the others, which can destabilize linear models, a phenomenon known as the **Dummy Variable Trap**.