---
title: "Chapter 4_Built-in Functions"
description: "A comprehensive reference of Python's built-in functions for I/O, type conversion, math, iteration, and more."
pubDate: "Jan 16 2026"
---

# 1. Input / Output
```python
print() # Prints to the standard output device

input() # Reads a line from input and returns it as a string
```

# 2. Inspection & Introspection
```python
type() # Returns the type of an object

id() # Returns the id of an object

dir() # Returns a list of the specified object's properties and methods

help() # Executes the built-in help system

repr() # Returns the official string representation of an object
```

# 3. Type Conversion & Constructors
```python
int(), float(), complex()

str(), bool()

list(), tuple(), set(), dict()

bytes(), bytearray(), frozenset()

```

# 4. Numeric & Aggregation 
```python
abs() 

round()

pow()

sum()

min()

max()
```

# 5. Iteration & Ordering 
```python
len()

range()

enumerate() # # Returns an enumerate object (iterator of (index, value) pairs)


#Example:
a = ("John", "Charles", "Mike")
print (list(enumerate(a))) # [(0,'John'), (1, 'Charles'), (2, 'Mike')]

zip() # # Returns a zip object (iterator of tuples)

# If the passed iterables have different lengths, the iterable with the least items decides the length of the new iterator.

# Example:
b = ("Jenny", "Christy", "Monica", "Vicky")
print( list(zip(a, b)) ) # [('John', 'Jenny'), ('Charles', 'Christy'), ('Mike', 'Monica')]


sorted() # returns a list

reversed()

```
> **Note**
> ```python
> sorted() → returns a new list
> list1.sort() → in-place list method
> ```

# 6. Functional Utilities
```python
map() # Returns the specified iterator with the specified function applied to each item

filter() # Use a filter function to exclude items in an iterable object

any() # Returns True if any item in an iterable object is true

all() # Returns True if all items in an iterable object are true
```
