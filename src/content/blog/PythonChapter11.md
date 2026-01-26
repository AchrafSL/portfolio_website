---
title: "Chapter 11_File Handling"
description: "Reading and writing files, file modes, context managers, and object serialization with Pickle."
pubDate: "Jan 26 2026"
---

# I. File Handling


There are four different methods (modes) for opening a file:
```python
"r" - Read - Default value. Opens a file for reading, error if the file does not exist
"a" - Append - Opens a file for appending, creates the file if it does not exist
"w" - Write - Opens a file for writing, creates the file if it does not exist
"x" - Create - Creates the specified file, returns an error if the file exists
```

---

In addition you can specify if the file should be handled as binary or text mode
```python
"t" - Text - Default value. Text mode

"b" - Binary - Binary mode (e.g. images)
```

---

**Syntax**
```python
f = open("demofile.txt") # Make sure the file exists, or else you will get an error.

# is the same as:
f = open("demofile.txt", "rt")

# Because "r" for read, and "t" for text are the default values, you do not need to specify them.
```



---
---
<br><br><br><br>



# II. Reading Files


## 1. File Open
```python
# The open() function returns a file object, which has a read() method for reading the content of the file:
f = open("demofile.txt")
print(f.read())

# Open a file on a different location:
f = open("D:\\myfiles\welcome.txt")
```

### 1.1 Using the `with` statement

```python
with open("demofile.txt") as f:
  print(f.read())

# Then you do not have to worry about closing your files, the with statement takes care of that.
```

---

## 2. Close Files
>It is a good practice to always close the file when you are done with it.
>
> If you are not using the `with` statement, you must write a close statement in order to close the file:

```python
f = open("demofile.txt")
print(f.readline())
f.close()
```

## 3. Read Only Parts of the File

> By default the `read()` method returns the whole text, but you can also specify how many characters you want to return:
```python
# Return the 5 first characters of the file:
with open("demofile.txt") as f:
  print(f.read(5))
```

### 3.1 Read Lines

> You can return one line by using the readline() method ( the first line ):

```python
with open("demofile.txt") as f:
  print(f.readline())


# By looping through the lines of the file, you can read the whole file, line by line:
with open("demofile.txt") as f:
  for x in f:
    print(x)
```



---



---
---
<br><br><br><br>





# III. Writing files

## 1. Write to an Existing File

> To write to an existing file, you must add a parameter to the `open()` function:
> - `"a"` - Append - will append to the end of the file
> - `"w"` - Write - will overwrite any existing content

```python
with open("demofile.txt", "a") as f:
  f.write("Now the file has more content!")

#open and read the file after the appending:
with open("demofile.txt") as f:
  print(f.read())
```

## 2. Overwrite Existing Content
> To overwrite the existing content to the file, use the `"w"` parameter:

> **Note:** the `"w"` method will overwrite the entire file.

```python
with open("demofile.txt", "w") as f:
  f.write("Woops! I have deleted the content!")

#open and read the file after the overwriting:
with open("demofile.txt") as f:
  print(f.read())
```


## 3. Create a New File

> To create a new file in Python, use the `open()` method, with one of the following parameters:
> - `"x"` - Create - will create a file, returns an error if the file exists
> - `"a"` - Append - will create a file if the specified file does not exists
> - `"w"` - Write - will create a file if the specified file does not exists

```python
f = open("myfile.txt", "x") # Result: a new empty file is created.
```

> **Note:** If the file already exist, an error will be raised.


---
---
<br><br><br><br>





# IV. Pickled files

> Pickle files are Python’s way of putting objects to sleep and waking them up later ( Think of pickle as a memory snapshot, not a data exchange format. )

> `Pickling is serialization`: Python converts an object `(lists, dicts, classes, models, etc.)` into a `byte stream` and saves it to a file `(.pkl)`.
>
> `Unpickling` does the reverse: it reconstructs the exact object in memory.

```python
import pickle

# save
with open("data.pkl", "wb") as f:
    pickle.dump(obj, f)

# load
with open("data.pkl", "rb") as f:
    obj = pickle.load(f)
```

Important truths:
- Pickle is Python-only (not portable across languages).
- It preserves object structure and state, not just data.
- Never unpickle untrusted files → it can execute arbitrary code.

> A pickle file is not “just data”. It’s a program for rebuilding an object.
