---
title: "Chapter 2_Core Data Types"
description: "Core Data Types"
pubDate: "Jan 26 2026"
---


# I. Strings:

## 1. Basics:
```python
a = "Hello" <=> 'Hello'
b =  """Lorem ipsum dolor sit amet,
consectetur adipiscing elit """ # Multiple line str

print(a[1])  # # Strings are sequences (indexable & iterable)

```

---

## 2. Access:

### 2.1 Indexing:
```python
x = 'abc'
print(x[0]) # a
```

---

### 2.2 Slicing

```python
b = "Hello, World!"
print(b[2:5])   # llo
print(b[:5])    # Hello
print(b[2:])    # llo, World!
print(b[-5:-2]) # orl
```

---

### 2.3 Membership
```python
thing in stringVar
thing not in smth
```

---

### 2.4 Length:
```python
len(str1)
```

---

## 3. Modification:

### 3.1 concatenation:
```python
a = "Hello"
b = "World"
c = a + " " + b
print(c)  # Hello World
```

---

### 3.2 builtin-methods:
```python
a = "Hello, World!"
print(a.upper())        # HELLO, WORLD!
print(a.lower())        # hello, world!
print(a.strip())        # removes whitespace
print(a.replace("H", "J"))  # Jello, World!
print(a.split(","))     # ['Hello', ' World!']
print(a.find(','))      # returns the position of `,` (first occurence) (-1 -> element not found)
```

---

### 3.3 Essential String Methods

```python
upper(), lower(), capitalize()
startswith(), endswith()

split(c) # splits from the left, c = seperator char, whitespace (default)
rsplit() # Default separator = whitespace

strip(c), rstrip(), lstrip() # default is whitespace

index()
count()
replace(a, b)
find(smth)
```


---



## 4. f-string:
```python
x = 1
print(f"Value is {x}")

x = 32
f"Value {x}"      # placeholder {}
f"Result {1+2}"   # expression 

# modifier ( A modifier is included by adding a colon `:` followed by a legal formatting type, like `.2f`)
price = 59
txt = f"The price is {price:.2f} dollars"
```




## 5. Raw Strings & Regex:

✅ Regex = raw string + `re` functions

```python
"\\d+"     # ❌ interpreted by Python
r"\\d+"    # ✅ correct for regex

print(r"C:\new\folder")  # raw string
```



---
---
<br><br><br><br>



# II. Booleans:


## 1. Most Values are True

✅ True:
* Non-empty strings
* Non-zero numbers  
* Non-empty lists, tuples, sets, dicts

❌ False:
```python
False <=> None, 0, "", (), [], {}
```

## 2. Custom __len__ Example

👉 Objects with `__len__()` that returns 0 or False evaluate to False

```python
class myclass():
  def __len__(self):
    return 0

myobj = myclass()
print(bool(myobj))  # False
```


---
---
<br><br><br><br>



# III. Operators:

## 1. Arithmetic Operators

```python
# Binary Operators:
x + y   # Addition
x - y   # Subtraction
x * y   # Multiplication
x / y   # Division
x % y   # Modulus
x ** y  # Exponentiation
x // y  # Floor division

# Unary Operators: (+/-) (signes)
+1, -1 
```

## 2. Assignment Operators

```python
=, +=, -=, *=, /=, %=, //=, **=, &=, |=, ^=, >>=, <<=, := ( walrus operator )
```

> **Note (Walrus operator):**
>  
> In Python, conditions allow **expressions only**, not statements.
>
> ❌ Invalid:
> ```python
> if x = 3:
>     pass
> ```
>
>  `:=` evaluates an expression, assigns it to a variable, and returns the value
> ```python
> if (n := len(data)) > 10:
>     print(n)
> ```



## 3. Comparison Operators

```python
==, !=, >, <, <=, >=

Python allows chaining comparison operators:
 ( 1 < x < 10 ) <=> ( 1 < x  and x < 10 )
```

## 4. Logical Operators

```python
and, or, not
```

## 5. Identity Operators

```python
is not
is : returns true if both vars points to the same object
```

## 6. Membership Operators

```python
in, not in  
```


## 7. Bitwise Operators:

```python
& : bitwise and
| : bitwise or
^ : xor
~ : bitwise not
x<<n : left shift (adding n 0 )
x>>n : right shift
```


## 8. Python Operator Precedence:
```python
()
**
+ - ~ : unary
* / // %
+ - : binary
<< >>
&
^
|
comparisons, identity, membership
not
and 
or


# same order => L -> R evaluation
```




## 9. Special unary operator: (Asterisk *)

* Using * and ** to pass arguments to a function
* Using * and ** to capture arguments passed into a function
* Using * to accept keyword-only arguments
* Using * to capture items during tuple/list unpacking
* Using * to unpack iterables into a list/tuple
* Using ** to unpack dictionaries into other dictionaries
* More details
* etc


> - When `*` and `**` CAPTURE values:
>
>  - `*` collects positional values
>    - → `tuple` in function definitions (`*args`)
>    - → `list` in assignment unpacking (`a, *b = ...`)
>  
>  - `**` collects keyword values ( **it always produces a dict** )
>    - → `dict` in function definitions (`**kwargs`)


### 1) Using * and ** to pass arguments to a function

#### **`*` for positional arguments**

```python
fruits = ['lemon', 'pear', 'tomato']
print(*fruits)
```

This sends each item in the list as a separate positional argument.

---

#### **`**` for keyword arguments**

```python
date_info = {'year': '2020', 'month': '01'}
"{year}-{month}".format(**date_info)
```

This sends each key/value pair as a named argument.


>Python 3.5+ even allows *multiple* `*` or `**` in a call:
> ```python
> print(*nums, *fruits)
> ```

---

### 2) Using * and ** to capture arguments passed into a function

#### **`*args` _ capture any number of positional arguments**

```python
def roll(*dice):
    ...
```

Here `dice` becomes a tuple of all extra positional args.

---

#### **`**kwargs` — capture keyword arguments**

```python
def tag(name, **attributes):
    ...
```

`attributes` becomes a dictionary of extra named args.

---


### 3) Using * to accept keyword-only arguments

If you place a `*` alone in a function signature, all following parameters must be passed by name:

```python
def get_multiple(*keys, dictionary, default=None):
    ...
```

Here `dictionary` and `default` **cannot** be passed positionally. 

This mechanism is used in built-in functions like `sorted` to make some parameters keyword-only.


---

### 4) Using * to capture items during tuple/List unpacking

Python lets you use `*` in assignments to grab multiple items:

```python
first, *rest = fruits
```
`rest` becomes a list of the remaining items. 

<br>
This also works between variables:

```python
first, *middle, last = fruits
```
Only one `*` expression is allowed at a given unpacking level.

---

### 5) Using * to unpack iterables into a list/tuple

Python 3.5+ allows you to “dump” items from an iterable into a new list, tuple, or set:

```python
[*sequence, *reversed(sequence)]
```

This is a powerful alternative to chaining with `+` or converting manually. 
<br>
You can also unpack into tuples and sets:

```python
(*fruits[1:], fruits[0])
{*fruits, *uppercase_fruits}
```

---

### 6) Using ** to unpack dictionaries into other dictionaries


Python 3.5+ lets you expand key/value pairs from one or more dicts into a new dict:

```python
all_info = {**date_info, **track_info}
```

You can also merge with additional keys and override values.

---

### 7) More details:

- 7.1) Function Parameter Boundaries `(*, *args, /)`

  | Definition             | Effect                   |
  | ---------------------- | ------------------------ |
  | `def f(a, b, *, c, d)` | `c, d` → keyword-only    |
  | `def f(a, *b, c, d)`   | `c, d` → keyword-only    |
  | `def f(a, b, /, c, d)` | `a, b` → positional-only |



- 7.2) `*` in function calls force positional evaluation order
```python
def f(a, b, c):
    ...

args = (1, 2, 3)
f(*args)   # positional mapping happens left → right
f(*args, c=5)  # ❌ multiple values for c

```

- 7.3) `**` cannot capture non-string keys
```python
{**{1: "a"}}   # ❌ TypeError
```

- 7.4) `*` unpacking works in return statements
```python
def f():
    return *range(3), 10

# Equivalent to returning a tuple: (0, 1, 2, 10)
```

---

