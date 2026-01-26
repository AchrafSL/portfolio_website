---
title: "Chapter 1_Core Language Semantics"
description: "Core Language Semantics"
pubDate: "Jan 26 2026"
---


# 1. Output:
```python
print(" ")
print(" ", b)
print(a, b, c) # separates arguments using sep=' ' (default)
print(a + b + c)

a,b,c : str

' ' <=> " "

print(" ", end = c)
c : char delimiter

default c = '\n'
```

---

# 2. Input

```python
x = input('Enter a number: ')
y = int(x)  # convert to integer
```

---

# 3. Comments:
```python
# This is a comment
'''Multi-line comment'''
"""Multi-line comment"""
```

---

# 4. Contiguous Statements

```python
print("Hello"); print("How are you?"); print("Bye bye!")
```

---

# 5. Line Continuation

```python
x = 1 - 1 + 1 \
-1 + 3
print(x)  # 3
```

---

# 6. Exit

```python
exit()  # exits the program
```

---

# 7. Variables:

No need to declare type - Python infers it automatically.

name : only [a-zA-Z0-9_] and != python keyword

## 7.1 multiple values assignmnt:

### 7.1.1. {n-n} (many to many):
```python
a, b, c = 'a', 'b', 'c'
```

---

### 7.1.2. {n-1} (one val to multiple var)
```python
a, b, c = 'c'
```

---

### 7.1.3. Unpack a collection:
```python
list1 = ['a', 'b', 'c']
a, b, c = list1
```


---

## 7.2 D_types:
``` python
type(x) # returns the type of the variable
isinstance(x, int)  # Check Type

# examples in this format: type ( examples )
str ( 'a' ),   int ( 1e5 <=> 1E5 ),   float ( 1.5 ),   complex ( 5j + 1 ),    bool ( True, False )

dict ( {k0:v0, k1:v1, ...} ),   list ( [1,'a', [1,2], 5j, ...] ),   tuple ( (1, 'a', 5j, ...) ),    set ( {1,'a',5j, ...} )

bytes ( b"123" ),  range ( range(5) <=> 0,1,2,3,4 ),   NoneType ( None )

```

---

### 7.2.1 Casting:
```python
x = int(1.5)
float(), bool(), str(), ...

```

---

## 7.3 Escape character:
```python
# \.  -> \ folowed by the char that we want to insert 
# example:
' \\'
' \' ', ...
```

---

## 7.4 Global Variables
```python
x = 'a'

def my_fun():
    global x 
    x = 'b'

my_fun()
print(x) # b 

```

---

> Note: important concepts ->

## 7.5 Mutable vs Immutable Objects:

### 7.5.1. Immutable Objects:
```python
int, float, str, tuple, ...

# any change in these objects results the creation of another one 
# example:
x = 1
x +=1 # this is another object

s = "hi"
s += "!"  # new string object

message = "hello"
message[0] = 'p'   # ❌ TypeError
```

---

### 7.5.2. Mutable Objects:
```python
list, dict, set
```

---

## 7.6 Scope (LEGB Rule)

```python
LEGB Rule (Name Resolution Order)

L — Local
Variables defined inside the current function.

E — Enclosing
Variables in the outer (non-global) functions if you have nested functions. # explicit outer function variable usage: keyword 'nonlocal varbName;'

G — Global
Variables defined at the top level of the module (file).  # explicit global var usage: keyword 'global varName;'

B — Built-ins
Names provided by Python itself (len, sum, print, etc.).
```

👉 A variable name cannot be any Python keyword:
[Python Keywords](https://www.w3schools.com/python/python_ref_keywords.asp)

``` python
# ⚠️ IMPORTANT: Python does NOT have block scope
# `if`, `for`, `while`, `try`, `{}` etc. do NOT create a new scope.

# Python has ONLY TWO scopes for variables:
# 1) Global scope  → variables defined at the module (file) level
# 2) Function scope → variables defined inside a function

# Any variable created inside an `if`, `for`, or `while` block
# belongs to the surrounding scope (global or function).
```

---

# 8. Random Number

```python
import random
print(random.randrange(1, 10))
```


# 9. More About Slicing:

## 9.1 Syntax

```python
seq[start : stop : step]
```
> Python places a cursor at start, moves it by step, and keeps elements only while the cursor moves toward stop.

## 9.2 Defaults
```python
if step > 0: # forward direction
# default:
    start = 0
    stop = len(seq) # to include last elements (because stop is exlusive)



if step < 0: # backward direction
# default:
    start = len(seq) - 1 # the last element
    stop = -1 # (the index bofore index '0' to include index 0, because stop is exlusive)



# step > 0 → index must increase
# step < 0 → index must decrease

# If that condition is false at the start, you get nothing.

# Example: print(s[1:4:-1]) -> gives nothing ''
```


## 9.3 Examples
```python
s = "abcdef"

# forward slicing
print(s[1:4])      # 'bcd'
print(s[:3])       # 'abc'
print(s[3:])       # 'def'
print(s[0:6:2])    # 'ace'

# backward slicing
print(s[::-1])     # 'fedcba'  -> This is another way to reverse a sequence.
print(s[4:1:-1])   # 'edc'
print(s[:1:-1])    # 'fedc'

# empty slice (direction mismatch)
print(s[1:4:-1])   # ''
```



