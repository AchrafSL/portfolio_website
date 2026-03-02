---
title: "Chapter 5_Control Flow & Iteration"
description: "Mastering control flow with conditional statements, loops (while, for), iterators, and generators."
pubDate: "Jan 17 2026"
---

# I. **Conditional Statements**

## 1. `if` ... `else`

### 1) `if` :
```python
if cond:
    # T1
```

---

### 2) `elif`:
```python
if cond:
    # T1
elif cond:
    # T2
```

---

### 3) `else`:
```python
if cond:
    # T1
else:
    # T2
```

```python
if cond:
    # T1
elif cond:
    # T2
else:
    # T3
```

---

### 4) Shorthand `if` (ternary operator)
```python
# One-line if statement:
if cond: action

# Short Hand If ... else
value/action_if_true if condition else value/action_if_false



# -----------------------------------------------------------

# Examples:
if a > b: print("a is greater than b")

print("A") if a > b else print("B")

bigger = a if a > b else b

```

---

### 5) Pass Statement

> **Note**
> if statements cannot be empty, but if you for some reason have an `if` statement with no content,
>
> put in the `pass` statement to avoid getting an error.
>
>  it's also commonly used with loops, functions, and classes.

```python
# Examples:
if age < 18:
  pass # TODO: Add underage logic later


def calculate_discount(price):
  pass # TODO: Implement discount logic

```

---

## 2. Match
```python
match expression:
  case x:
    code block
  case y:
    code block
  case z:
    code block
```

---

> **Note** (Default Value)
>
> Use the underscore character `_` as the last case value if you want a code block to execute when
>
> there are no other matches.
>
> If `_` is at the top an exception will raise called: `SyntaxError: wildcard makes remaining patterns unreachable`.


```python
day = 4
match day:
  case 6:
    print("Today is Saturday")
  case 7:
    print("Today is Sunday")
  case _:
    print("Looking forward to the Weekend")
```

---

> **Note** (Combine Values)
>
> Use the pipe character `|` as an or operator in the case evaluation to check for more than one value match in one case.


```python
day = 4
match day:
  case 1 | 2 | 3 | 4 | 5:
    print("Today is a weekday")
  case 6 | 7:
    print("I love weekends!")
```

---

> **Note** (If Statements as Guards)
>
> You can add `if` statements in the case evaluation as an extra condition-check.


```python
month = 5
day = 4
match day:
  case 1 | 2 | 3 | 4 | 5 if month == 4:
    print("A weekday in April")
  case 1 | 2 | 3 | 4 | 5 if month == 5:
    print("A weekday in May")
  case _:
    print("No match")
```


---
---
<br><br><br><br>

# II. **Loops**

## 3. While loops:
```python
while cond:
    # T1
```

## 4. For loops:
```python
for item in iterable:
    # T1
```

## 5. `do .. while` equivalent: 
```python
while True:
    # code runs at least once
    x = int(input("Enter a number: "))
    
    if not cond:
        break

# This behaves exactly like do { ... } while (condition);
```


## 6. `range()`:
```python
range(stop) # [0,...., stop-1]
range(start, stop) # [start, ... ,stop-1 ]
range(start, stop, step) 
```
range() does NOT create a list in memory.
It returns a range object (lazy, iterable).


## 7. `enumerate()` (Loop Power Tool):
```python
# instead of :
for i in range(len(items)):
    print(i, items[i])

# better:
for i, val in enumerate(items):
    print(i, val)
```


## 8. `zip()` (Iterating Multiple Iterables):
```python
names = ["A", "B"]
ages = [20, 30]

for name, age in zip(names, ages):
    print(name, age)
```



## 9. `break`, `continue`, `else` in loops:

### 9.1 `break`:
> **Note**
> With the break statement we can stop the loop before it has looped through all the items.

```python
# for loop:
for x in fruits:
  print(x)
  if x == "banana":
    break


# while loop:
i = 1
while i < 6:
  print(i)
  if i == 3:
    break
  i += 1    
```

---

### 9.2 `continue`:
> **Note**
> With the continue statement we can stop the current iteration, and continue with the next.

```python
# for loop:
for x in fruits:
  if x == "banana":
    continue
  print(x)


# while loop:
i = 0
while i < 6:
  i += 1
  if i == 3:
    continue
  print(i)
```

---

### 9.3 `else`:

> **Note**
> Specifies a block of code to be executed when the loop is finished

```python
# for loop:
for x in range(6):
  print(x)
else:
  print("Finally finished!")


# while loop:
i = 1
while i < 6:
  print(i)
  i += 1
else:
  print("i is no longer less than 6")

```

> **Note**
> The else block will NOT be executed if the loop is stopped by a `break` statement.


---
---
<br><br><br><br>



# III. Iterators:

## 1. Iterator vs Iterable

> **Note: (Iterable)**:
>
> An object is iterable if it has `__iter__()` method.
> ```python
> iter(list1)   # works → iterable
> ```
> If `iter(obj)` works → `obj` is iterable.
> <hr>
> ⚠️ Iterables can create multiple iterators

---

> **Note: (Iterator)**
>
> An iterator is an object that:
> * Remembers its current position 
> * Returns elements one at a time  ( `next()` method)
> * Stops when exhausted. ( ⚠️ When finished → `StopIteration` is raised. )
> ---
> It implements two methods:
> * `__iter__()`
> * `__next__()`
> ---
> ⚠️ Iterators are single-use


```python
# Examples:

nums = [1, 2]    # iterable
it = iter(nums)      # iterator

print(next(it))  # 1
print(next(it))  # 2 / iterator consumed ( single use )

# iterable is NOT consumed
for x in nums:
    print(x)

# The for loop actually creates an iterator object and executes the next() method for each loop.



#Example 2:

# or unpack the iterator at once using *
it2 = iter(nums)
print(*it2) # 1 2
```

---

### 1.1 Create an Iterator

> To create an object/class as an iterator you have to implement the methods __iter__() and __next__() to your object.
>
> The __iter__() method acts similar, you can do operations (initializing etc.), but must always return the iterator object itself.
>
> The __next__() method also allows you to do operations, and must return the next item in the sequence.

> **Note: (Example1)** 
>```python
>class MyNumbers:
>  def __iter__(self):
>    self.a = 1
>    return self
>
>  def __next__(self):
>    x = self.a
>    self.a += 1
>    return x
>
>myclass = MyNumbers()
>myiter = iter(myclass)
>
>print(next(myiter))
>```


> The example above would continue forever if you had enough `next()` statements, or if it was used in a `for` loop.
>
> To prevent the iteration from going on forever, we can use the `StopIteration` statement.
>
> In the `__next__()` method, we can add a terminating condition to raise an error if the iteration is done a specified number of times




> **Note: (Example2)**
>```python
> # Stop after 20 iterations
>class MyNumbers:
>  def __iter__(self):
>    self.a = 1
>    return self
>
>  def __next__(self):
>    if self.a > 20:
>        raise StopIteration
>    else:
>      x = self.a
>      self.a += 1
>      return x
>```


---
---
<br><br><br><br>


# IV. Generators:

## 1. generator function:

`Generators` are functions that can pause and resume their execution. ( `lazy evaluation` )

When a `generator function` is called, it returns a `generator object`, which is an `iterator`.

The code inside the function is not executed yet, it is only compiled. The function only executes when you iterate over the generator.

> The `yield` keyword is what makes a function a generator.
>
> When `yield` is encountered, the function's state is saved, and the value is returned. 
>
> The next time the generator is called, it continues from where it left off.


```python
# Generators Saves Memory
def large_sequence(n):
  for i in range(n):
    yield i

# This doesn't create a million numbers in memory
gen = large_sequence(1000000)
# You can manually iterate through a generator using the next() function:
print(next(gen))
print(next(gen))
print(next(gen))
# When there are no more values to yield, the generator raises a StopIteration exception:


# Or using a for loop (lazy evaluated)
for gen in large_sequence(1000000):
  print(gen)
```


## 2. Generator Expressions:

Similar to list comprehensions, you can create generators using generator expressions with parentheses instead of square brackets.

same as iterator: Once a generator is exhausted, it cannot be reused.

> **Syntax:**
> ```python
> (expression for item in iterable if condition)
> ```

```python
gen = (x * x for x in range(5))

print(gen)        # <generator object ...>
print(next(gen)) # 0
print(next(gen)) # 1
print(next(gen)) # 4

# This generates squares one by one, not all at once. (better memory efficiency, lazy evaluation)
```


## 3. Generator Methods:

Generators have special methods for advanced control:

### 3.1 `send()` Method
The send() method allows you to send a value to the generator:

```python
def echo_generator():
  while True:
    received = yield # stops here ( I’m now waiting for someone to send me a value )
    print("Received:", received)

gen = echo_generator()
next(gen)  # Prime the generator
gen.send("Hello")
gen.send("World")

next(gen) # this one here in this context is equivalent to:   gen.send(None)
```


`next(gen)` starts the generator and runs it until the first yield, so it’s ready to receive values via `send()`.

---

### 3.2 `close()` Method

The close() method stops the generator  :

```python
def my_gen():
  try:
    yield 1
    yield 2
    yield 3
  finally:
    print("Generator closed")

gen = my_gen()
print(next(gen))
gen.close()
```

---
---
<br><br><br><br>


# V. Advanced Generators:

## 1. yield from:

Used to hand over part (or all) of a generator’s work to another iterable or generator.
It automatically:
* Iterates over the sub-generator
* Propagates values
* Handles StopIteration internally

`yield from` iterable is equivalent to:
```python
for item in iterable:
    yield item
```

```python
# Example:
def gen1():
    yield 1
    yield 2

def gen2():
    yield from gen1()
    yield 3

for x in gen2():
    print(x)
```

## 2. `throw()` Method:
Injects an exception into a running generator.

This allows error handling inside the generator.

If not caught inside the generator, the exception propagates to the caller.


```python
def my_gen():
    try:
        yield 1
        yield 2
    except ValueError:
        print("Exception caught inside generator")

gen = my_gen()
print(next(gen))
gen.throw(ValueError)

```



## 3. Generator Cleanup (finally):

When a generator is closed (explicitly or implicitly), the finally block is always executed.

This makes generators suitable for resource management.

```python
def my_gen():
    try:
        yield 1
    finally:
        print("Cleanup executed")

gen = my_gen()
gen.close()

```
