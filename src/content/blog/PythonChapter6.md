---
title: "Chapter 6_Functions, Decorators & Context Managers"
description: "Defining functions, handling arguments (*args, **kwargs), scope (LEGB), decorators, and context managers."
pubDate: "Jan 26 2026"
---

> Functions, decorators, and context managers are grouped as “reusable/composable code” patterns.

# I. Defining Functions

## 1. Python Functions

`def` and `return` statements:

```python
# Procedure:
def my_procedure():
    # T1
    # Returns None by default

# Function:
def my_function():
    # T2
    return smth

# calling a function (or procedure)
my_procedure()
smth = my_function()

```

If you need to create a function placeholder without any code, use the `pass` statement:

```python
def my_function():
  pass
```


## 2. Function Arguments

**1. Arguments vs parameters:**
```python
def my_function(name): # name is a parameter
  print("Hello", name)

my_function("Emil") # "Emil" is an argument

```

---

**2. Default Parameter Values:**
```python
def my_function(name = "friend"):
  print("Hello", name)

my_function("Emil") # Hello Emil
my_function() # Hello friend


# Rule: non-defaults must come first
def my_func(age, name = 'friend'):
  print(age,name)

```

---

**3. Keyword Arguments (kwargs):**

> * You can send arguments with the key = value syntax.
> 
> * This way, with keyword arguments, the order of the arguments does not matter.

```python
def my_function(animal, name):
  print("I have a", animal)
  print("My", animal + "'s name is", name)

my_function(animal = "dog", name = "Buddy")
my_function(name = "Buddy", animal = "dog")
```

---

**4. Positional Arguments:**

> * When you call a function with arguments without using keywords, they are called positional arguments.
>
> * The order matters with positional arguments.

```python
def my_function(animal, name):
  print("I have a", animal)
  print("My", animal + "'s name is", name)

my_function("dog", "Buddy")
```

---

**5. Mixing Positional and Keyword Arguments:**

> * However, positional arguments must come before keyword arguments.

```python 
def my_function(animal, name, age):
  print("I have a", age, "year old", animal, "named", name)

my_function("dog", name = "Buddy", age = 5)

# This will throw an error:
# my_function(name="Buddy", "dog", age=5)  -> ❌
```

---

**6. Return Values / Passing Different Data Types:**

> * You can send any data type as an argument to a function
>
> * and you can return any data type, including lists, tuples, dictionaries, and more.

```python
def my_function(list1):
    print(list1)
    return (10, 20) # returns a tuple

list1 = [1,2,3]
x, y = my_function(list1)
```

---

**7. Positional-Only Arguments:**

> * You can specify that a function can have ONLY positional arguments.
> 
> * To specify positional-only arguments, add `, /` after the arguments:

```python
def my_function(name, /):
  print("Hello", name)

my_function("Emil") # With , / you will get an error if you try to use keyword arguments
```

---

**8. Keyword-Only Arguments:**


> * To specify that a function can have only keyword arguments, add `*,` before the arguments:

```python
def my_function(*, name):
  print("Hello", name)

my_function(name = "Emil") # With *, you will get an error if you try to use positional arguments.
```

---

**9. Combining Positional-Only and Keyword-Only**

> * Arguments before / are positional-only, and arguments after * are keyword-only:

```python
def my_function(a, b, /, *, c, d):
  return a + b + c + d

result = my_function(5, 10, c = 15, d = 20)

```

---


## 3. *args and **kwargs

> Arbitrary Arguments - *args
>
> Arbitrary Keyword Arguments - **kwargs
>
> Check chapter 2 for more details

---

**1. Using `*args` with Regular Arguments**


You can combine regular parameters with `*args`. Regular parameters must come before `*args`

> Because Parameters defined after `*args` in the function signature become keyword-only parameters.


```python
def my_function(greeting, *names):
  for name in names:
    print(greeting, name)

my_function("Hello", "Emil", "Tobias", "Linus")
```

---


**2. Using `**kwargs` with Regular Arguments**

You can combine regular parameters with `**kwargs`. Regular parameters must come before `**kwargs`

> Because `**kwargs` must come last and collects any remaining keyword arguments not assigned to regular parameters

```python
def my_function(username, **details):
  print("Username:", username)
  print("Additional details:")
  for key, value in details.items():
    print(" ", key + ":", value)

my_function("emil123", age = 25, city = "Oslo", hobby = "coding")


```

---


**3. Combining `*args` and `**kwargs`**

You can use both *args and **kwargs in the same function.

The order must be:
- 1. regular parameters
- 2. *args
- 3. **kwargs



```python
def my_function(title, *args, **kwargs):
  print("Title:", title)
  print("Positional arguments:", args)
  print("Keyword arguments:", kwargs)

my_function("User Info", "Emil", "Tobias", age = 25, city = "Oslo")
```

---

**4. Function Parameter Boundaries `(*, *args, /)`**

  | Definition             | Effect                   |
  | ---------------------- | ------------------------ |
  | `def f(a, b, *, c, d)` | `c, d` → keyword-only    |
  | `def f(a, *b, c, d)`   | `c, d` → keyword-only    |
  | `def f(a, b, /, c, d)` | `a, b` → positional-only |


---

## 4. Scope

### 4.1 Global Keyword


> The `global` keyword makes the variable global.
>
> And refer to a global variable by using the global keyword.

```python
# Example1:
def myfunc():
  global x
  x = 300

myfunc()

print(x)

# ---

#Example2:
x = 300

def myfunc():
  global x
  x = 200

myfunc()

print(x)
```

---

### 4.2 Nonlocal Keyword

> The `nonlocal` keyword makes the variable belong to the outer function.


```python
# Example1:
def myfunc1():
  x = "Jane"
  def myfunc2():
    nonlocal x
    x = "hello"
  myfunc2()
  return x

print(myfunc1())

```

---

### 4.3 The LEGB Rule

```python
x = "global"

def outer():
  x = "enclosing"
  def inner():
    x = "local"
    print("Inner:", x)
  inner()
  print("Outer:", x)

outer()
print("Global:", x)
```

---

## 5. Best practices

> Some good practices:
>
> Don’t repeat yourself (write functions to avoid repetition) (DRY)
>
> Do one thing ( function has only one responsibility ) ( for example either import or plot the data)

---

### 5.1 type annotations:

```python
# for mutable variables default variables are bad: reason will be explained in the next section.
def example(
    c: list[int] | int,
    d: set[str],
    e: dict[str, int],
    a: int = 0,  # defaults must come after non-defaults
    b: str = "",
) -> None | str:
    pass
```

---

### 5.2 Pass by assignment:
```python
# mutable arguments:
def foo(x):
  x[0] = 99

l1 = [1,2,3]
foo(l1)
print(l1) # [99, 2, 3] -> because list are mutable now x and l1 points to the same object


# Immutable arguments:
def foo(x):
  x = x + 99

x1 = 1
foo(x1) # x1 = 1  -> because int are immutable when we did x = x + 99 it's another object 

# mutable default arguments are dangerous:
def foo(l1 = []):
  l1.append(1)
  print(l1)

foo() # [1]
foo() # [1, 1] -> ⚠ Problem: Default arguments are evaluated once at function definition time, so the same list is reused across calls.

# the correct way to do it:
def foo(l1 = None):
  if l1 is None:
    l1 = []
  l1.append(1)
  print(l1)

foo() # [1]
foo() # [1]
```

---


### 5.3 Docstrings

> it does explain what does the function do.
>
> there are many styles including: (Google style, numpydoc, reStructuredText, EpyText, etc)

---

Google style:
* Google: simple, readable in docstrings.
```python
def function(arg_1, arg_2=42):
    """
    Description of what the function does.

    Args:
        arg_1 (str): Description of arg_1 that can break onto the next line
            if needed.
        arg_2 (int, optional): Write optional when an argument has a default
            value.

    Returns:
        bool: Optional description of the return value.
        Extra lines are not indented.

    Raises:
        ValueError: Include any error types that the function intentionally
            raises.

    Notes:
        Add any extra notes here.
    """
    pass
```

---

Numpy Style:
* Numpy: preferred in scientific computing / NumPy, SciPy projects.
```python
def function(arg_1, arg_2=42):
    """
    Description of what the function does.

    Parameters
    ----------
    arg_1 : expected type of arg_1
        Description of arg_1.
    arg_2 : int, optional
        Write optional when an argument has a default value.
        Default=42.

    Returns
    -------
    The type of the return value
        Can include a description of the return value.
        Replace "Returns" with "Yields" if this function is a generator.
    """
    pass
```

Retrieving docStrings:
```python
# __doc__ attribute:
print(function.__doc__)

# getdoc() from inspect module to get a cleaner docstring without extra indentation:
import inspect 
print(inspect.getdoc(function))

# help() function
help(function) # prints directly to stdout

```

> There are a lot of pip-installable CLI tools that generate docstring template so you can save time.

<u>Example: </u>

```cli
pyment -w -o numpydoc file.py

-w : overwrite file
-o numpydoc : output in numpy style

```



---
---
<br><br><br><br>



# II. Lambda Functions & Functional Tools:

## 1. `lambda`

> A lambda function is a small anonymous function.

> A lambda function can take any number of arguments, but can only have one expression.

> The expression is executed and the result is returned
> ```python
> Syntax:
> lambda arguments : expression
> ```

```python
# Example:
x = lambda a, b, c : a + b + c
print(x(5, 6, 2))


# Usage: ( Functions maker)
def myfunc(n):
  return lambda a : a * n

mydoubler = myfunc(2)
mytripler = myfunc(3)

print(mydoubler(11))
print(mytripler(11))
```



## 2. `map()`, `filter()`, `reduce()`

### 2.1 `map()` 
The `map()` function applies a function to every item in an iterable:
```python
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)
```

---

### 2.2 `filter()`
The `filter()` function creates a list of items for which a function returns True:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
odd_numbers = list(filter(lambda x: x % 2 != 0, numbers))
print(odd_numbers)
```

---

### 2.3 `reduce()`
The `reduce()` function from the `functools module` applies a function cumulatively to the items of a sequence, reducing it to a single value.

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Multiply all numbers together
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 120 (1*2*3*4*5)
```


---
---
<br><br><br><br>



# III. Decorators
> Decorators use:
> * functions as objects
> * nested function
> * nonlocal scope
> * closures

---

## 1. Functions are objects

In Python, functions are first-class objects. This means they can be:
* assigned to variables

* stored in lists or dictionaries

* passed as arguments to other functions

* returned from functions

```python
def func1():
    print("Hello from func1")
  
# List of functions 
list_of_func = [func1,open, print]
list_of_func[2]("this is print func") #  Call the third function in the list (print)

# Dictionary of functions
dict_of_func = {
  'my_func': func1,
  "open_file": open,
  "kteb":print
}

dict_of_func['kteb']("this is print func") # Call the function stored under key 'kteb' (print)
```

---
## 2. Closures

> A closure is a function object that remembers values from its enclosing scope, even after that scope has finished execution.



### 2.1 attaching nonlocal variables to nested functions

```python
def foo():
  a = 5
  def bar():
    print(a)
  return bar

func = foo()
func() # 5

# when foo return the bar function, python attach any nonlocal variable that bar was going to need to the function object.
```

```python
type(func.__closure__) # <class 'tuple'>

len(func.__closure__) # 1

func.__closure__[0].cell_contents # 5

```

---

### 2.2 Closures and deletion

```python
x = 25
def foo(val):
  def bar():
    print(val)
  return bar

func = foo(x)
func() # 25

del x
func() # 25 -> because x was added to the closure attached to func().
```

---

### 2.3 Closures and Overwriting

```python

x = 25
def foo(val):
  def bar():
    print(val)
  return bar

x = foo(x)
x() # 25 -> it works also.
```

---

## 3. Decorators:

> A decorator is a wrapper that you can place around a function that changes that function's behavior.
>
> (modify the input/output, or the function behavior)
>
> A decorator can be called multiple times. Just place the decorator above the function you want to decorate.

### 3.1 Basic Decorator
Define the decorator first, then apply it with `@decorator_name` above the function.

```python
def double_args(func):
  def wrapper(a, b):
    return func(a*2, b*2) # from the closure
  return wrapper


@double_args # <=> multiply = double_args(multiply) after the function definition.
def multiply(a,b):
  return a*b

multiply(1,5) # 2 * 10 = 20;  -> will call the wrapper function with 1 and 5.
multiply.__closure__[0].cell_contents  # python stores the original multiply function in the new function's closure. 
# because the decorator returned a wrapper that references it.
```

---

### 3.2 *args and **kwargs
Sometimes the decorator function has no control over the arguments passed from decorated function, to solve this problem,
add `(*args, **kwargs)` to the wrapper function, this way the wrapper function can accept any number, and any type of arguments, and pass them to the decorated function.

```python
# Secure the function with *args and **kwargs arguments:
def changecase(func):
  def myinner(*args, **kwargs):
    return func(*args, **kwargs).upper()
  return myinner

def myfunction(nam):
  return "Hello " + nam

myfunction = changecase(myfunction)

print(myfunction("John"))
```

---

### 3.3 Decorator With Arguments

> Decorators can accept their own arguments by adding another wrapper level.
>
> A decorator factory takes an argument and transforms the behavior based on the argument value.

```python
def run_n_times(n):
  def decorator(func):
    def wrapper(*args, **kwargs):
      for i in range(n):
        func(*args, **kwargs)
    return wrapper
  return decorator

n = int(input("how many runs: "))

@run_n_times(n)
def print_sum(a, b):
  print(a + b)


# Example2:
run_three_times = run_n_times(3)
```

---

### 3.4 Multiple Decorators
> You can use multiple decorators on one function.

> This is done by placing the decorator calls on top of each other.

> Decorators are called in the reverse order, starting with the one closest to the function.

---

### 3.5 Preserving Function Metadata

> Functions in Python has metadata that can be accessed using the `__name__` ( function's name) and `__doc__` attributes.
>
> But, when a function is decorated, the metadata of the original function is lost.
>
> To fix this, Python has a built-in function called `functools.wraps` that can be used to preserve the original function's name and docstring.

```python
import functools

def changecase(func):
  @functools.wraps(func)
  def myinner(*args, **kwargs):
    return func(*args, **kwargs).upper()
  return myinner

@changecase
def myfunction(nam):
  return "Hello " + nams


print(myfunction.__name__) # this will preserve the original func name.
```

---
---
<br><br><br><br>



# IV. Context Managers

## 1. Using context managers

A Context manager is a type of function that: 
* Set up a context
* Runs your code
* Removes the context 


```python
#Example:
with open("my_file.txt") as file:
  text = file.read()
  length = len(text)

print("the file is {} characters long".format(length))

# Set up a context by opening the file
# let you run any code you want on that file
# Removes the context by closing the file

# -----------------------------------------------------

# Syntax:
with <context-manager>(<args>) as <variable-name>:
  # Run your code here.
  # This code is runing 'inside the context'.

# This code runs after context is removed.
```



## 2. Writing context managers

* Class-based ( defines `__enter__` and `__exit__`)
* Function-Based

### Function-based:
```python
import contextlib
@contextlib.contextmanager
def my_context():
  # Add any set up code your context needs
  yield 
  # Add any teardown code your context needs
```

* 1. Define a function
* 2. (optional) Add any set up code your context needs.
* 3. Use the `yield` keyword.
* 4. (optional) Add any teardown code your context needs.
* 5. Add the `@contextlib.contextmanager` decorator. ( `import contextlib` ) 


> **Note**:
>
> Context manager function is technically a `generator` that `yields` a single value.


### 2.1 Yielding a value or None
```python
#Example1: (Yielding a value)
import contextlib
@contextlib.contextmanager
def database(url):
  # set up db connection
  db = postgress.connect(url)

  yield db

  # teardown db connection
  db.disconnect()


with database(url) as my_db:
  cours_list = my_db.execute(
    " SELECT * FROM COURSES "
  )

```


```python
#Example2: (Yielding None)  -> a context manager that changes the current dir
import os
import contextlib
@contextlib.contextmanager
def in_dir(path):
  # save current working dir:
  old_dir  = os.getcwd()

  # switch to new working dir:
  os.chdir(path)

  yield 

  # Change back to previous working dir:
  os.chdir(old_dir)


with in_dir(path):
  project_files = os.listdir()
```


Additional example ( Timer context manager)
```python
import time
import contextlib
@contextlib.contextmanager
def timer():
  """Time the execution of a context block.

  Yields:
    None
  """
  start = time.time()
  # Send control back to the context block
  yield
  end = time.time()
  print('Elapsed: {:.2f}s'.format(end - start))

with timer():
  print('This should take approximately 0.25 seconds')
  time.sleep(0.25)
```

---

## 3. Advanced Context Managers

### 3.1 Nested contexts

```python
# 1. Nested form:
# Open both files:
with open(src) as f_src:
  with open(dist) as f_dist:
    # Read and write each line, one at a time
    for line in f_src:
      f_dist.write(line)



# 2. cleaner form:
with open(src) as f_src, open(dst) as f_dst:
    for line in f_src:
        f_dst.write(line)
```

---

### 3.2 Handling Errors:

```python
import contextlib
@contextlib.contextmanager
def get_printer(ip):
  p = connect_to_printer(ip)

  try:
    yield p
  finally:
    p.disconnect("disconnect from printer")

doc = {"text": "This is my text"}

with get_printer(ip) as  printer:
  printer.print_page(doc['txt']) # Exception raised but it will handeled in finally block
```
