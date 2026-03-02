---
title: "Chapter 7_Standard Libraries"
description: "Exploring essential Python standard libraries: Math, Random, Datetime (Timezones), and Regular Expressions (Re)."
pubDate: "Jan 19 2026"
---

# I. Math & Random

## 1. Math

### 1.1 Built-in Math Functions

```python
min()
max()
pow(x, y)
round() # Uses round-half-to-even (banker’s rounding)
# Example:
round(2.5)   # 2
round(3.5)   # 4
```

### 1.2 The Math Module

> Python has also a built-in module called `math`

```python
import math

x = math.sqrt(value)
x = math.ceil(value) # rounds a number upwards to its nearest integer
x = math.floor(value) # rounds a number downwards to its nearest integer
pi = math.pi

```


---
---
<br><br><br><br>

## 2. Random

```python
import random

random.random()              # random float in [0.0, 1.0)
random.randint(a, b)         # random integer between a and b (inclusive)
random.choice(sequence)      # random element from a sequence
random.sample(population, k) # k unique random elements (no replacement)
random.shuffle(sequence)     # randomly reorders a mutable sequence in place
random.seed(x)               # sets the random generator seed (reproducible results)

```

---
---
<br><br><br><br>

# II. Dates & Times

## 1. Working with Dates and Times
```python
from datetime import datetime, date 
# The datetime module contains many classes.
# `datetime` represents date + time
# `date` represents date only (no time)

# With this import style, you can access these classes
# directly without prefixing them with `datetime.`
```

---

### 1.1 Current Date ( `.now()`, `.today()` )
```python
import datetime # datetime module

# Datetime:
currentDateTime = datetime.datetime.now()  
# Access the datetime class from the datetime module
# and call the class method `.now()` to get current date and time


# Example output: 2026-01-10 09:14:40.638612
# Contains: year, month, day, hour, minute, second, microsecond

# ----------------------------------------------------------------------------------------------------------------

# Date:
currentDate = datetime.date.today() # Returns the current date in the following format: YYYY-MM-DD

```

---


### 1.2 Creating Dates Objects

> **Note:** Dates in the following examples are created by class constructors.

**1 Datetime objects** `(a specific point in time)`


```python
import datetime
# Format:
datetime_format = datetime.datetime(year, month, day, hour=0, minute=0, second=0,
 microsecond=0, tzinfo=None)

# String representation:
# YYYY-MM-DD HH:MM:SS[.microseconds][+/-HH:MM]

# Example
x = datetime.datetime(2020, 5, 17) 
print(x) # 2020-05-17 00:00:00


# Example with timezone
tz = datetime.timezone.utc
x = datetime.datetime(2020, 5, 17, 14, 30, tzinfo=tz)
print(x)  # 2020-05-17 14:30:00+00:00
```

---

**2. Date Objects** `(a calendar date)`
```python
import datetime
# Format:
date_format = datetime.date(year, month, day)


# String representation:
# YYYY-MM-DD

# Example:
x = datetime.date(2020, 5, 17)
print(x) # 2020-05-17
```

---

**3. Timedelta Objects** `(a duration / time difference)`
```python
import datetime
# Format:
timedelta_format = datetime.timedelta(
    days=0,
    seconds=0,
    microseconds=0,
    milliseconds=0,
    minutes=0,
    hours=0,
    weeks=0
)
# hours/minutes/... aren’t stored directly, only days/seconds/microseconds.

# String representation:
# [<days> day[s], ]HH:MM:SS


# Example:
td = datetime.timedelta(days=1, hours=9, minutes=30)
print(td)  # 1 day, 9:30:00
```

---

### 1.3 Attributes of a date
```python
import datetime # datetime module

currentDateTime = datetime.datetime.now() 

# Date Attributes:
(year, month, day) = (
    currentDateTime.year,
    currentDateTime.month,
    currentDateTime.day
)

# DateTime attributes: (date attributes + time attributes)
(hours, minutes, seconds, microseconds) = (
    currentDateTime.hour,
    currentDateTime.minute,
    currentDateTime.second,
    currentDateTime.microsecond
)

# Timedelta attributes:
td = datetime.timedelta(days=15)

(days, seconds, microseconds) = (
    td.days, # Whole days
    td.seconds, # Remaining seconds (< 1 day)
    td.microseconds, # Remaining microseconds (< 1 second)
)
```

---

### 1.4 Methods of a Date

**1. Finding the weekday `.weekday()`**
```python
import datetime
currDateTime = datetime.datetime.now()

print(currDateTime.weekday())
# Returns an integer in range [0, 6]
# 0 = Monday, ..., 6 = Sunday

```

---

**2. Full duration in seconds `.total_seconds()`**
```python
# Example:
import datetime
td = datetime.timedelta(days=15) 

total_seconds = td.total_seconds() # Returns total duration as a float
total_hours = total_seconds / 3600
```

---

**3.Replacing parts of a date/datetime**
```python
# For dates:
new_date = old_date.replace(year=None, month=None, day=None)

# --------------------------------------------------------------

# For datetimes:
new_datetime = old_datetime.replace(year=None, month=None, day=None,
    hour=None, minute=None, second=None,
    microsecond=None, tzinfo=None
)

# Example:
new_date = old_date.replace(year=2025)


```

---

### 1.5 Math with dates:

> Dates can’t be added to other dates; use `timedelta` objects for arithmetic.

```python
from datetime import date, datetime, timedelta

d1 = date(2017, 11, 5)
d2 = date(2017, 12, 4)
d3 = date(2016, 1, 1)

# date + date   ❌ invalid
```

**0. Sorting dates**
```python
d_list = [d2, d1, d3]
print(sorted(d_list)) # [datetime.date(2016, 1, 1), datetime.date(2017, 11, 5), datetime.date(2017, 12, 4)]
```

---

**1. Min / Max of two dates**
```python
dates = [d1, d2, d3]

print(min(dates))  # 2016-01-01 (earliest date)
print(max(dates))  # 2017-12-04 (latest date)
```

---

**2. Comparing dates**
```python
print(d1 < d2)   # True
print(d1 == d2)  # False
print(d1 > d2)   # False

# Dates are compared chronologically (year → month → day)
```

---

**3. Subtracting two dates**
```python
# Returns a timedelta (duration between two events)

td = d2 - d1
print(td)          # 29 days, 0:00:00
print(td.days)     # 29
```

---


**4. Adding / subtracting timedelta to/from a date**
```python
td = timedelta(days=29)

print(d1 + td)  # 2017-12-04
print(d2 - td)  # 2017-11-05

# Python handles month lengths, leap years, etc.
```

---

**5. Working with datetime objects**
```python
# Works the same way as date objects
dt1 = datetime(2024, 1, 1, 10, 0)
dt2 = datetime(2024, 1, 2, 15, 30)

dt_delta = dt2 - dt1
print(dt_delta)                   # 1 day, 5:30:00
print(dt_delta.total_seconds())   # total duration in seconds
```

----

**6. Checking if a date is in a range**
```python
start = date(2024, 1, 1)
end = date(2024, 12, 31)
today = date.today()

print(start <= today <= end)  # True if today is in 2024
```

---




### 1.6 Turning dates into strings (`Date/Datetime` `->` `String`)


**1. ISO 8601 format**
```python
import datetime
# ISO 8601 provides a standardized, human-readable format
# for dates and datetimes. Useful for comparisons, storage, and APIs.


# ---- Dates ----
d1 = datetime.date(2017, 11, 5)
print(d1.isoformat())  
# Output: '2017-11-05'
# Format: YYYY-MM-DD


# ---- Datetimes ----
dt1 = datetime.datetime(2024, 1, 10, 15, 30, 45)
print(dt1.isoformat())
# Output: '2024-01-10T15:30:45'
# Format: YYYY-MM-DDTHH:MM:SS


# ---- Datetime with timezone ----
tz = datetime.timezone.utc
dt2 = datetime.datetime(2024, 1, 10, 15, 30, tzinfo=tz)
print(dt2.isoformat())
# Output: '2024-01-10T15:30:00+00:00'
# Format: YYYY-MM-DDTHH:MM:SS+/-HH:MM


# Notice the 'T' separator and timezone
```

---

**2. Custom formats with `strftime()`**
```python
import datetime
d1 = datetime.datetime(2018, 6, 1)

print(d1.strftime("%Y")) # 2018
print(d1.strftime("The year is %Y")) # The year is 2018
print(d1.strftime("%Y/%m/%d")) # 2018/06/01


```
> Tip: %Y = year, %m = month, %d = day, %H = hour (24h), %I = hour (12h), %M = minutes, %S = seconds, ...

---


### 1.7 Turning strings into dates (`String` `->` `Date/Datetime`)

**parsing with `strptime()`**
```python
import datetime
dt = datetime.datetime.strptime("str to transfer", "formatting string (must match the string exactly)")
# If the string does not match the format, ValueError is raised.
# strptime always returns a datetime object.

# ---------------------------------------------------------------------------------------------------------------
# Example:
# Datetime:
dt_object = datetime.datetime.strptime("2026-01-10", "%Y-%m-%d")

# ---------------------------------------------------------------------------------------------------------------

# Date:
date_object = datetime.datetime.strptime("2026-01-10", "%Y-%m-%d").date() 
# there is no `.strptime()` equivalent in the date class.


# Note: `.date()` removes the time part and returns a `date` object.
```

### 1.8 Timestamp
> timestamp: number of seconds since `1970-01-01 00:00:00` (Unix epoch)

```python
import datetime
ts = 1980518820

# convert timestamp to datetime:
dt = datetime.datetime.fromtimestamp(ts)
## fromtimestamp() uses the local timezone

# -------------------------------------------------

# convert datetime to timestamp:
ts = dt.timestamp()
```

## 2. Time Zones and Daylight Saving

> Arithmetic across DST requires timezone-aware datetimes; always consider converting to `UTC`.

### 2.1 UTC offsets

> UTC (Coordinated Universal Time)
>
> - The UK is the reference point: **UTC+0**  
> - Countries **East** of the UK are **UTC +x** (ahead of UTC)  
> - Countries **west** of the UK are **UTC -x** (behind UTC)

---

```python
import datetime

# Creating a timezone object ( accepts timedelta arg )

## Morocco timezone: MTZ ( UTC + 1 )
MTZ  = datetime.timezone(datetime.timedelta(hours=1))

## Timezone-aware datetime:
dt = datetime.datetime(2026, 1, 1, 18, 24, 3, tzinfo=MTZ)
```

---

**How to get the date and time in another country at a given moment** `.astimezone(TZObj)`
```python
import datetime

# Example: datetime in Morocco
MTZ = datetime.timezone(datetime.timedelta(hours=1))  # Morocco UTC+1
dt_ma = datetime.datetime(2026, 1, 1, 18, 24, 3, tzinfo=MTZ) # 2026-01-01 18:24:03+01:00

# Convert to datetime in India
IndiaTZ = datetime.timezone(datetime.timedelta(hours=5, minutes=30))  # India UTC+5:30
indiaDT = dt_ma.astimezone(IndiaTZ)

print(indiaDT) # Output: 2026-01-02 00:54:03+05:30

```

---

> Note: `.astimezone()` converts a datetime with a timezone to another timezone, keeping the same `instant` in time.
>
> ⚠️ Note: `.astimezone()` **requires a timezone-aware datetime**. Naive datetimes (without tzinfo) will raise an error.
>

---

> If you use `.replace(tzinfo=...)` instead, the clock time stays the same, only the UTC offset changes, it does not adjust for the actual moment in time.

```python
# Example with .replace():
wrongIndiaDT = dt_ma.replace(tzinfo=IndiaTZ)
print(wrongIndiaDT)
# Output: 2026-01-01 18:24:03+05:30
# Notice the time didn’t change, so the "instant" is now wrong
```

---

### 2.2 Time zone database


**TZ database from `dateutil` module**

> TZ database is updated 3–4 times a year whenever time zone rules change.  
>
> Format for `tz.gettz()`: `"Continent/City"`  
>
> The city should be the nearest major city in the timezone.

```python
import datetime
from dateutil import tz

# Eastern Time (New York)
et_tz = tz.gettz("America/New_York")

```

---

### 2.3 Starting daylight saving time (DST)

> 🌱 Spring (“spring forward”)
>
> 01:59 → 03:00
>
> - The hour 02:00–02:59 never exists
> - One hour is skipped

---


**The importance of setting up the UTC in datetime comparison**
```python
from datetime import datetime, timezone, timedelta
## ❌ Problem: comparing naive datetimes

# Time just BEFORE DST jump 
spring_ahead_0159am = datetime(2017,3,12,1,59,59)

# Time just AFTER DST jump 
spring_ahead_3am = datetime(2017,3,12,3,0,0)

# As can be seen it says 1h1s has passed, but only 1 has been elapsed:
elapsed = (spring_ahead_3am - spring_ahead_0159am).total_seconds()
print(elapsed)  # 3601.0 | 1h:1s passed


# -----------------------------------------------------------------------------------------

## ✅ Correct approach: use timezone-aware datetimes
Tz0 = timezone(timedelta(hours = 0))
Tz1 = timezone(timedelta(hours = 1))

# Time BEFORE DST jump (UTC+0)
spring_ahead_0159am = spring_ahead_0159am.replace(tzinfo=Tz0)

# Time AFTER DST jump (UTC+1)
spring_ahead_3am = spring_ahead_3am.replace(tzinfo=Tz1)


elapsed = (spring_ahead_3am - spring_ahead_0159am).total_seconds()
print(elapsed)  # 1.0 | 1s passed

```

> **Note:** Datetime arithmetic is only reliable when datetimes are timezone-aware.
> - DST cannot be handled correctly without timezones.

---

```python
## ✅ Proper DST-safe version
from datetime import datetime
from dateutil import tz
tz = tz.gettz("America/New_York")

before = datetime(2017, 3, 12, 1, 59, 59, tzinfo=tz)
after  = datetime(2017, 3, 12, 3, 0, 0, tzinfo=tz)

elapsed = (after - before).total_seconds()
print(elapsed)  # 1.0
```

---

### 2.4 Ending daylight saving time

> 🍂 Autumn (“fall back”)
>
> 01:59 → 01:00
>
> - The hour 01:00–01:59 happens twice
> - One hour is repeated

---

**Checking for a specific time that can occur in 2 UTC+0 moments in the same timezone** `tz.datetime_ambiguous()`
```python
from datetime import datetime
from dateutil import tz
et = tz.gettz("US/Eastern")

# 2017-11-05 01:00:00
first_1am = datetime(2017,11,5,1,0,0, tzinfo = et)
tz.datetime_ambiguous(first_1am) # True 
```

---

**Marking the Second Occurrence this datetime appears in this timezone** `tz.enfold()`

> **Note:** fold is only a label in `dateutil`; it does not affect arithmetic.

```python
# 2017-11-05 01:00:00 (again)
second_1am = datetime(2017,11,5,1,0,0, tzinfo = et)
second_1am = tz.enfold(second_1am)  
# same as:
second_1am = second_1am.replace(fold=1)


(second_1am - first_1am).total_seconds() # 0.0s

```

---

**For events that might cross the daylight saving boundaries we need our math in `UTC` aka `UTC+0`**
```python
## Convert to UTC to perform arithmetic across DST boundary
first_1am = first_1am.astimezone(tz.UTC)
second_1am = second_1am.astimezone(tz.UTC)

(second_1am - first_1am).total_seconds() # 3600.0s

```

---
---
<br><br><br><br>


# III. Regular Expressions

> A `RegEx`, or Regular Expression, is a sequence of characters that forms a search pattern.
>
> Python has a built-in package called `re`, which can be used to work with Regular Expressions.

## 1. regex quick guide

| Group | Symbol/Pattern | Description |
|-------|----------------|-------------|
| Character Sets | `[aeiou]`      | Matches a single character in the listed set |
|               | `[^XYZ]`       | Matches a single character **not** in the listed set |
|               | `[a-z0-9]`     | Matches any character in the specified range |
| Special Sequences | `\`          | Signals a special sequence (or escapes special characters) |
|                 | `.`          | Matches any character except newline |
|                 | `\S`         | Matches any non-whitespace character |
|                 | `\s`         | Matches any whitespace character |
| Anchors | `^`            | Matches the **start** of a string, e.g., `^hello` |
|         | `$`            | Matches the **end** of a string, e.g., `planet$` |
| Quantifiers | `*`            | Matches zero or more occurrences |
|             | `*?`           | Matches zero or more occurrences (non-greedy) |
|             | `+`            | Matches one or more occurrences |
|             | `+?`           | Matches one or more occurrences (non-greedy) |
|             | `?`            | Matches zero or one occurrence |
|             | `{}`           | Matches exactly the specified number of occurrences, e.g., `he.{2}o` |
| Others      | `\|`            | Matches either/or, e.g., ``falls\|stays`` |
|             | `()`           | Groups a pattern and captures for extraction |


> (* and +) push outward in both directions (greedy) to match the largest possible string​.

---

## 2. regex methods

### 2.1 The `findall()` Function

> The `findall()` function returns a list containing all matches. (in the order they are found), (No match -> empty list)
```python
import re

txt = "The rain in Spain"
x = re.findall("ai", txt) # Return a list containing every occurrence of "ai"
print(x) # ['ai', 'ai']
```

---

### 2.2 The `search()` Function

> The `search()` function searches the string for a match, and returns a `Match object` if there is a match. (the first occurrence), (No match -> None)

```python
import re

txt = "The rain in Spain"
x = re.search("\s", txt)

print("The first white-space character is located in position:", x.start())
```

---

**Match Object**

> A `Match Object` is an object containing information about the search and the result.

> Match object `attributes/methods`:

> -  `.start()` → returns the position (index) where the match begins in the original string.
> - `.end()` → returns the position (index) where the match ends in the original string (exclusive).
> - `.span()` → returns a tuple (start, end) with the start and end positions of the match.

> - `.group()` → returns the substring that matched the pattern.
> - `.group(n)` → returns the substring matched by the n-th capturing group (n ≥ 1).
> - `.groups()` → returns a tuple of all captured groups.

> - `.string` → returns the original string that was searched.


```python
import re

# Example string
text = "Order 42 shipped on 2026-01-13"

# Regular expression with capturing groups
# (\d+) matches the order number
# (\d{4}-\d{2}-\d{2}) matches the date
pattern = r"(\d+).*?(\d{4}-\d{2}-\d{2})"

# Search for the pattern
m = re.search(pattern, text)

# ---- Using Match object methods and attributes ----
print("Original string:", m.string)
# Output: 'Order 42 shipped on 2026-01-13'

print("Full match:", m.group())
# Output: '42 shipped on 2026-01-13'

print("First group (order number):", m.group(1))
# Output: '42'

print("Second group (date):", m.group(2))
# Output: '2026-01-13'

print("All groups:", m.groups())
# Output: ('42', '2026-01-13')

print("Start of full match:", m.start())
# Output: 6 → '42 shipped on 2026-01-13' starts at index 6

print("End of full match:", m.end())
# Output: 27 → full match ends at index 27 (exclusive)

print("Span of full match:", m.span())
# Output: (6, 27)

print("Start of first group:", m.start(1))
# Output: 6 → '42' starts at index 6

print("End of first group:", m.end(1))
# Output: 8 → '42' ends at index 8 (exclusive)

print("Span of second group:", m.span(2))
# Output: (21, 31) → '2026-01-13'

```

---

**flags example**
```python
re.search("hello", text, re.IGNORECASE) 
```


---

### 2.3 The `split()` Function

> The `split()` function returns a list where the string has been split at each match:

```python
import re

#Split the string at every white-space character:
txt = "The rain in Spain"
x = re.split("\s", txt)
print(x) # ['The', 'rain', 'in', 'Spain']
```

```python
# control the number of occurrences by specifying the `maxsplit` parameter:

import re

#Split the string at the first white-space character:

txt = "The rain in Spain"
x = re.split("\s", txt, 1)
print(x) # ['The', 'rain in Spain']

```

---


### 2.4 The `sub()` Function

> The sub() function replaces the matches with the text of your choice:

```python
import re

#Replace all white-space characters with the digit "9":

txt = "The rain in Spain"
x = re.sub("\s", "9", txt)
print(x) # The9rain9in9Spain

```

```python
#  control the number of replacements by specifying the `count` parameter:
import re

#Replace the first two occurrences of a white-space character with the digit 9:

txt = "The rain in Spain"
x = re.sub("\s", "9", txt, 2)
print(x) # The9rain9in Spain
```


---
---
<br><br><br><br>

# IV. JSON

## 1. Overview

```python
import json

# Python Object → JSON
json.dumps(obj)
json.dump(obj, file)

# JSON → Python Object
json.loads(string)
json.load(file)
```
> Plus note the mapping:
> - dict ↔ object
> - list ↔ array
> - str ↔ string
> - int/float ↔ number
> - True/False ↔ true/false
> - None ↔ null

---

## 2. The `json.dumps()` method

```python
# Use the `indent` parameter to define the numbers of indents (make it easier to read the result):
json.dumps(x, indent=4)

# You can also define the `separators`, default value is (", ", ": "), which means using a comma and a space to separate each object, and a colon and a space to separate keys from values:
json.dumps(x, indent=4, separators=(". ", " = "))


# Use the `sort_keys` parameter to specify if the result should be sorted or not:
json.dumps(x, indent=4, sort_keys=True)
```



---
---
<br><br><br><br>

# V. Other Useful Built-ins
## 1. `os`

> The `os` module provides a way to interact with the operating system.

```python
import os

os.getcwd()          # get current working directory
os.listdir(path)     # list files and directories
os.mkdir("folder")   # create a directory
os.remove("file")    # delete a file
os.environ           # environment variables (mapping)
```

## 2. sys

> The `sys` module provides access to interpreter variables and runtime environment.

```python
import sys

sys.argv        # command-line arguments (list of strings)
sys.exit(exit_code_num)  # exit the program (there is also: `sys.exit()` )
sys.path        # module search paths
sys.version     # Python version string
```



---
---
<br><br><br><br>
