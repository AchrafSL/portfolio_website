---
title: "Chapter 9_Errors & Modules"
description: "Handling errors with try/except/finally, creating custom exceptions, and structuring code with Modules and Packages."
pubDate: "Jan 21 2026"
---

# I. Errors
## 1. Overview

> - The `try` block lets you test a block of code for errors.
>
> - The `except` block lets you handle the error.
>
> - The `else` block lets you execute code when there is no error.
>
> - The `finally` block lets you execute code, regardless of the result of the try- and except blocks.

> To throw (or raise) an exception if a condition occurs, use the `raise` keyword.



```python
try:
  print(x)
except NameError: # Specific exceptions first
  print("Variable x is not defined")
except: # General exceptions last 
  print("Something else went wrong")
else:
  print("Nothing went wrong")
finally:
  print("The 'try except' is finished")

# the above order matters!


# Bare except: also catches `KeyboardInterrupt` and `SystemExit`, which is almost never what you want.
# Correct and safe: `except Exception:`
```



```python
x = -1

if x < 0:
  raise Exception("Sorry, no numbers below zero") #  # discouraged: too generic
```

```python
if x < 0:
    raise ValueError("x must be non-negative")
```


```python
x = "hello"

if not type(x) is int: 
  raise TypeError("Only integers are allowed")
```

## 2. Custom Exception with a Message
```python
class InvalidNameError(Exception):
    pass


# Usage:
name = "test1"
if name == "test1":
  raise InvalidNameError(f"Invalid name: {name}")


# Output:
"""
Traceback (most recent call last):
  File "c:\Users\...\codeTest.py", line 9, in <module>
    raise InvalidNameError(f"Invalid name: {name}")
InvalidNameError: Invalid name: test1

"""

```



---
---
<br><br><br><br>





# II. Modules & Packages


## 1. Terminology

> A `script` is a Python file (.py) that is intended to be `executed directly`, usually to perform some task.
>
> A `module` is a Python file that is intended to be `imported by other Python code`, rather than run directly.
>
> `package`: A directory full of python code to be imported.
- e.g. `numpy`
> `subpackage`: A smaller package inside a package.
> - e.g. `numpy.random`
> 
> `library`: Either a package, or a collection of packages.


## 2. Creating your first python package

```text
my_package/       
├── __init__.py
└── module.py
```

> `module.py` contains all the package code. 
>
> `__init__.py` marks this directory as a python package. ( used to structure the package imports later )



## 3. Subpackages

```text
mysklearn/                  ← package
├── __init__.py
│
├── preprocessing/          ← subpackage
│   ├── __init__.py
│   ├── normalize.py        ← module
│   └── standardize.py      ← module
│
├── regression/             ← subpackage
│   ├── __init__.py
│   └── regression.py       ← module
│
└── utils.py                ← module
```

> you should place closely related function and classes in the same module, and related modules in the same subpackage.


## 4. package, subpackage and module documentation

- `Package doc` is placed as a docstring at the top of `__init__.py` and summarizes the whole package.
- `Subpackage doc` is similarly placed at the top of the subpackage’s `__init__.py` and describes what kind of modules it groups.
- `Module doc` is written at the top of the module file and describes what that file provides.

---
<br>

`mysklearn/__init__.py`
```python
"""
mysklearn

A lightweight educational machine learning package.
Provides basic preprocessing and regression utilities
implemented from scratch, for learning purposes.
"""
```
> This documents the whole package.

---
<br>

`mysklearn/preprocessing/__init__.py`
```python
"""
Preprocessing subpackage.

Contains data preprocessing utilities such as
normalization and standardization functions.
"""
> Each subpackage explains what kind of modules it groups.


---
<br>

`mysklearn/preprocessing/normalize.py`
```python
"""
Normalization utilities.

Functions for scaling numerical data to a fixed range,
typically [0, 1].
"""
```
> Documents what this specific file provides.

---
<br>



## 5. Structuring imports

> **Note!** A module containing relative imports cannot be executed directly with `python file.py`. (only works inside packages)

### 5.1 Without package imports

When you do:
```python
import package
```
- Only the package is imported.
- `Subpackages` and `modules` are NOT imported automatically.

<br>

You must import them explicitly:
```python
import package.subpackage
import package.subpackage.module
```

> **Note**: `import package.subpackage` does not import the subpackage’s modules.
>
> **The solution** is `internal imports`:  ( import modules into subpackages and subpackages into the package)

---

### 5.2 importing subpackages into `packages`


```text
mysklearn/                  
├── __init__.py   ← Here!
│
├── preprocessing/          
│   ├── __init__.py
│   ├── normalize.py        
│   └── standardize.py      
│
├── regression/             
│   ├── __init__.py
│   └── regression.py       
│
└── utils.py                
```

---

In `mysklearn/__init__.py`

**Using absolute imports**
```python
from mysklearn import preprocessing
```
> - Used most - more explicit

---

**Using relative imports**
```python
from . import preprocessing
```
> - Used sometimes - shorter and sometimes simpler 
> - `.` means the current file's parent directory
---


> After this, the **subpackage itself is accessible**, but **its modules are not imported automatically**.


---

### 5.3 importing modules into `subpackages/packages`

```text
mysklearn/                  
├── __init__.py  
│
├── preprocessing/          
│   ├── __init__.py   ← Here!
│   ├── normalize.py        
│   └── standardize.py      
│
├── regression/             
│   ├── __init__.py
│   └── regression.py       
│
└── utils.py                
```

---

In `mysklearn/preprocessing/__init__.py`

**Using absolute imports**
```python
from mysklearn.preprocessing import normalize
```


---

**Using relative imports**
```python
from . import normalize
```

---



### 5.4 importing functions into `subpackage`

> Assuming you want only one function to be accessible to users, the others are only helper functions

```text
mysklearn/                  
├── __init__.py  
│
├── preprocessing/          
│   ├── __init__.py   ← Here!
│   ├── normalize.py        
│   └── standardize.py      
│
├── regression/             
│   ├── __init__.py
│   └── regression.py       
│
└── utils.py                
```

---

In `mysklearn/preprocessing/__init__.py`

**Using absolute imports**
```python
from mysklearn.preprocessing.normalize import normalize_data_func
```


---

**Using relative imports**
```python
from .normalize import normalize_data_func
```

> With this, you can use the following shorter import path to access it:`mysklearn.preprocessing.normalize_data_func`

---

### 5.5 importing between sibling modules

> sometimes if a module file is getting too big, you might split it into multiple files.

> here some of the functions from normalize have been moved to funcs.py
>
> but we still need to use them inside the normalize module

```text
mysklearn/                  
├── __init__.py  
│
├── preprocessing/          
│   ├── __init__.py   
│   ├── normalize.py  ← Here!
|   ├── funcs.py
│   └── standardize.py      
│
├── regression/             
│   ├── __init__.py
│   └── regression.py       
│
└── utils.py                
```

---

In `normalize.py`

**Using absolute imports**
```python
from mysklearn.preprocessing.funcs import (mymax, mymin)
```


---

**Using relative imports**
```python
from .funcs import mymax, mymin
```

---

### 5.6 import between modules far apart

```text
mysklearn/                  
├── __init__.py  
│
├── preprocessing/          
│   ├── __init__.py   
│   ├── normalize.py  ← Here!
|   ├── funcs.py
│   └── standardize.py ← Here!     
│
├── regression/             
│   ├── __init__.py
│   └── regression.py ← Here!    
│
└── utils.py                
```

---

A custom exception `MyException` is in `utils.py`

In `normalize.py`, `standardize.py` and `regression.py`

**Using absolute imports**
```python
from mysklearn.utils import MyException
```


---

**Using relative imports**
```python
from ..utils import MyException
```

---


### 5.7 Relative import cheat sheet

- `from . import module`
  - From current directory, import `module`

- `from .. import module`
  - From one directory up, import `module`

- `from .module import function`
  - From module in current directory, import `function`

- `from ..subpackage.module import function`
  - From subpackage one directory up, from `module` in that subpackage, import `function`





## 6. Install Your Package 

### 6.1 Why install your package?

```text
home/
├── mysklearn                  <-- in same directory
│   ├── __init__.py
│   ├── preprocessing
│   │   ├── __init__.py
│   │   ├── normalize.py
│   │   └── standardize.py
│   ├── regression
│   │   ├── __init__.py
│   │   └── regression.py
│   └── utils.py
└── example_script.py          <-- in same directory
```

inside `example_script.py`
```python
import mysklearn
# This Import works because the script and the package are in the same directory.
```

---

> If the script and the package are in different directories, Python will not find the package by default.
>
> This results in an import error.

```text
home/
|-- mypackages
|   |-- mysklearn     <---
|   |   |-- __init__.py
|   |   |-- preprocessing
|   |   |   |-- __init__.py
|   |   |   |-- normalize.py
|   |   |   `-- standardize.py
|   |   `-- regression
|   |       |-- __init__.py
|   |       `-- regression.py
`-- myscripts
    `-- example_script.py     <---
```


---

> **Solution**: Install the package so Python finds it from any location.



### 6.2 How to make your package installable?

**Setup.py**
- Is used to install the package.
- Contains metadata on the package.

> `setup.py` is still supported but considered legacy. Modern projects use `pyproject.toml`


**Step1: Restructure your package directory**

```text
mysklearn/           <-- outer directory
|-- mysklearn        <--- inner source code directory
|   |-- __init__.py
|   |-- preprocessing
|   |   |-- __init__.py
|   |   |-- normalize.py
|   |   |-- standardize.py
|   |-- regression
|   |   |-- __init__.py
|   |   |-- regression.py
|   |-- utils.py
|-- setup.py         <-- setup script in outer
```

> - Place the `package source` and `setup.py` inside one outer folder named like the package.
> - This naming choice follows common Python project structure conventions.



**Step2: Create `setup.py` file**

```python
# Import required functions
from setuptools import setup, find_packages

# Call setup function
setup(
    author="James Fulton",
    description="A complete package for linear regression.",
    name="mysklearn",
    version="0.1.0",
    packages=find_packages(include=["mysklearn", "mysklearn.*"]),
)

```
> **version number = (major number) . (minor number) . (patch number)**



**Editable installation**

```cli
pip install -e .
```
> pip runs `setup.py` for you
>
> `.` = package in current dir
>
> `-e`= editable :installs in editable mode so changes apply without reinstalling the package.

---


## 7. Dealing with dependencies

> Other packages you import inside your package.

### 7.1 Adding dependencies to `setup.py`

```python
from setuptools import setup, find_packages

setup(
  ...
  install_requires=["pandas", "scipy", "matplotlib"]
)
```

----

### 7.2 Controlling dependency version
```python
from setuptools import setup, find_packages

setup(
  ...
  install_requires=[
    "pandas>=1.0",         # good
    "scipy==1.1",          # bad
    "matplotlib>=2.2.1,<3" # good
  ]
)

# Allow as many package versions as possible
# Get rid of unused dependencies
```
---

### 7.3 Python versions
```python
from setuptools import setup, find_packages

setup(
  ...
  python_requires=">=3.8, !=3.0.*, !=3.1.*",
)
# `*` must be used when we are excluding version numbers.
```

---

### 7.4 Making an env for developers

> show all the package versions used using: `pip freeze`

#### **7.4.1 Save package requirements to a file**
```cli
pip freeze > requirements.txt
```

---

#### **7.4.2 install requirements from file**
```cli
pip install -r requirements.txt
```


```text
mysklearn/
|-- mysklearn
|   |-- __init__.py
|   |-- preprocessing
|   |   |-- __init__.py
|   |   |-- normalize.py
|   |   |-- standardize.py
|   |-- regression
|   |   |-- __init__.py
|   |   |-- regression.py
|   |-- utils.py
|-- setup.py
|-- requirements.txt   <-- developer environment
```

---

> install_requires → users
>
> requirements.txt → developers


## 8. Including licences and writing READMEs

```text
mysklearn/
|-- mysklearn
|   |-- __init__.py
|   |-- preprocessing
|   |   |-- ...
|   |-- regression
|   |   |-- ...
|   |-- utils.py
|-- setup.py
|-- requirements.txt
|-- LICENSE        <--- new files
|-- README.md      <--- added to top directory
|-- MANIFEST.in     <--- ensures non-code files are packaged
```

> `MANIFEST.in` This file tells the packaging tools specifically which extra files to include.
>
> because by default readme and license are not included when someone installs your package.

> `MANIFEST.in` content:
```text
include LICENSE
include README.md
```


## 9. Publishing your package

> `PyPI` (Python package Index) (Online code repo)
> - `pip` installs packages from here.
> - Anyone can upload packages. (free)

---

> When you upload to `PyPI` you upload a `package distribution`
>
> `Distribution package` - a bundled version  of your package which is ready to install.
>
> `Source distribution` - a distribution package which is mostly your source code.
>
> `wheel distribution` - a distribution package which has been processed to make it faster to install. (preferred)

> when you upload to PyPI, it's good practice to upload both `wheel` and `source` distribution.

---

### **9.1 How to build `wheel` and `source` distributions`**

```cli
python setup.py sdist bdist_wheel
```
> - sdist = source distribution
> - bdist_wheel = wheel distribution

---
Results:
```text
mysklearn/
|-- mysklearn
|-- setup.py
|-- requirements.txt
|-- LICENSE
|-- README.md
|-- dist               <--- a dir that contains the distribution files
|   |-- mysklearn-0.1.0-py3-none-any.whl
|   |-- mysklearn-0.1.0.tar.gz
|-- build <--- temporary directory used during the compilation and packaging process
|-- mysklearn.egg-info <-- contains metadata about the package for package managers like pip.
```

---

### **9.2 Upload your distributions**

- To `PyPI`
```cli
twine upload dist/*
```

- To `TestPyPI`
```cli
twine upload -r testpypi dist/*
```


### **9.3 How other people can install your package**

- **Install package from PyPI**
```cli
pip install mysklearn
```

- **Install package from TestPyPI**
```cli
pip install --index-url https://test.pypi.org/simple
            --extra-index-url https://pypi.org/simple
            mysklearn
```


## 10. Testing your package

> Good packages brag about how many tests they have.

### 10.1 Writing tests
```python
def get_ends(x):
    """Get the first and last element in a list"""
    return x[0], x[-1]

def test_get_ends():
    assert get_ends([1,5,39,0]) == (1,0)
    assert get_ends(['n','e','r','d']) == ('n','d') # If something goes wrong -> the test function raise an AssertionError

```

---

### 10.2 Organizing tests inside your package

**Directory Structure:**
```text
mysklearn/
|-- mysklearn     <-- package
|-- tests         <-- tests directory
|-- setup.py
|-- LICENSE
|-- MANIFEST.in

```

---

**Test directory layout**
```text
mysklearn/tests/
|-- __init__.py  <-- empty: Modern `pytest` does not need it.
|-- preprocessing
|   |-- __init__.py
|   |-- test_normalize.py
|   |-- test_standardize.py
|-- regression
|   |-- __init__.py
|   |-- test_regression.py
|-- test_utils.py
```

---
**Code directory layout**
```text
mysklearn/mysklearn/
|-- __init__.py
|-- preprocessing
|   |-- __init__.py
|   |-- normalize.py
|   |-- standardize.py
|-- regression
|   |-- __init__.py
|   |-- regression.py
|-- utils.py
```

---

> Inside the `test module`, there should be a test function for each function defined in the `source module`

<u>Example:</u>

**Inside `test_normalize.py`**

```python
from mysklearn.preprocessing.normalize import (
    find_max, find_min, normalize_data
)

def test_find_max():
    assert find_max([1,4,7,1])==7

def test_find_min():
    assert ...

def test_normalize_data():
    assert ...
```

---

**Inside `normalize.py`**

```python
def find_max(x):
    ...
    return x_max

def find_min(x):
    ...
    return x_min

def normalize_data(x):
    ...
    return x_norm
```

### 10.3 Running test with `pytest`

```text
mysklearn/ <-- navigate to here
|-- mysklearn
|-- tests
|-- setup.py
|-- LICENSE
|-- MANIFEST.in
```

---

```cli
pytest
```

> - `pytest` looks inside the `test` directory.
> - it looks for modules like `test_modulename.py`
> - it looks for functions like `test_functionname()`

> it runs these functions and shows output.

---

**Output**

Example1
```text
============================= test session starts ==============================
platform linux -- Python 3.7.9, pytest-6.1.2, py-1.9.0, pluggy-0.13.1
rootdir: /home/workspace/mypackages/mysklearn    <--   ran in this directory
collected 6 items                                <--   found 6 test functions

tests/preprocessing/test_normalize.py ...                              [ 50%]  <-- progress indicator
tests/preprocessing/test_standardize.py ...                            [100%]

============================== 6 passed in 0.23s ===============================
```

---

Example2
```text
============================= test session starts ==============================
...
tests/preprocessing/test_normalize.py .F.                              [ 50%]
tests/preprocessing/test_standardize.py ...                            [100%]

==================================== FAILURES ==================================
_________________________________ test_mymax _________________________________
...

tests/preprocessing/test_normalize.py:10: AssertionError
=========================== short test summary info ============================
FAILED tests/preprocessing/test_normalize.py::test_mymax - assert -100 == 100    <-- test_mymax
========================= 1 failed, 5 passed in 0.17s ==========================
```

---

### 10.4 Testing your package with different environments

**To manually test your package with multiple Python versions, you must:**
- Install all required Python versions.
- Create an environment for each Python version.
- Install your package and all its dependencies in each environment.
- Run `pytest` in each environment.

---

**A better solution is `tox`, a tool designed to automate testing with multiple Python versions:**
But you still need to:
- Install all required Python versions.
- run `tox`.

> tox uses Python versions already installed on the system; it does not download them.

---

> - `tox` automatically creates isolated environments for each version.
> - It installs the package and dependencies in each environment.
> - It runs the test suite automatically.

---

#### 10.4.1 Step1: Configure `tox`

Configuration file - `tox.ini`
```text
mysklearn/
|-- mysklearn
|   |-- ...
|-- tests
|   |-- ...
|-- setup.py
|-- LICENSE
|-- MANIFEST.in
|-- tox.ini   <--- configuration file
```

---

In `tox.ini`
```text
[tox]  <-- Headings.
envlist = py38, py39, py310, py311  <-- to test version `X.Y` add pyXY to `envlist`.

[testenv] <-- specify what will happen after package and dependencies installation.
deps = pytest <-- because pytest isn't installed by package dependencies we need to specify it as a tox dependency.
commands =  <-- must be shell commands.
  pytest
  echo "run more commands"
  ...
```

---

#### 10.4.2 Step2: Running `tox`
```text
mysklearn/    <-- navigate to here
|-- mysklearn
|   |-- ...
|-- tests
|   |-- ...
|-- setup.py
|-- LICENSE
|-- MANIFEST.in
|-- tox.ini   
```

---

```cli
tox
```
---

**Success Example Output**
```text
user@machine:~/mysklearn$ tox
.pkg: setup: /home/user/mysklearn/setup.py
.pkg: build_wheel: mysklearn-0.1.0-py3-none-any.whl

py38: install_deps: pytest
py38: install_package: mysklearn-0.1.0-py3-none-any.whl
py38: commands[0]> python --version
Python 3.8.10
py38: commands[1]> pytest
============================= test session starts ==============================
platform linux -- Python 3.8.10, pytest-7.1.2, pluggy-1.0.0
collected 12 items
tests/preprocessing/test_normalize.py .....
tests/preprocessing/test_standardize.py .....
tests/regression/test_regression.py ..
============================== 12 passed in 0.46s ==============================

py39: install_deps: pytest
py39: install_package: mysklearn-0.1.0-py3-none-any.whl
py39: commands[0]> python --version
Python 3.9.18
py39: commands[1]> pytest
============================== 12 passed in 0.43s ==============================

py310: install_deps: pytest
py310: install_package: mysklearn-0.1.0-py3-none-any.whl
py310: commands[0]> python --version
Python 3.10.13
py310: commands[1]> pytest
============================== 12 passed in 0.41s ==============================

py311: install_deps: pytest
py311: install_package: mysklearn-0.1.0-py3-none-any.whl
py311: commands[0]> python --version
Python 3.11.7
py311: commands[1]> pytest
============================== 12 passed in 0.39s ==============================

___________________________________ summary ____________________________________
  py38: commands succeeded
  py39: commands succeeded
  py310: commands succeeded
  py311: commands succeeded
  congratulations :)

```

**Error case example**
```text
...
___________________________________ summary ____________________________________
  py38: commands succeeded
  py39: commands succeeded
ERROR:   py310: commands failed
  py311: commands succeeded
```


> `tox` will skip Python versions not installed on the system.


---

## 11. Keeping your package stylish

### 11.1 Overview

> Standard Python style is described in PEP8
>
> a style guide dictates how code should be laid out.

> `flake8` static code checker - reads code but doesn't run.

```cli
flake8 features.py
```

```text
features.py:2:1: F401 'math' imported but unused
..
```

```text
<filename>:<line number>:<character number>:<error code> <description>
```

---

**Example**
```text
2:1: F401 'math' imported but unused
4:1: E302 expected 2 blank lines, found 1
7:1: E302 expected 2 blank lines, found 0
5:4: E111 indentation is not a multiple of four
6:4: E111 indentation is not a multiple of four
9:5: F841 local variable 'mean_x' is assigned to but never used
..
```

---

### **11.2 Breaking the rules on purpose**
```python
# noqa (no quality assurance)
x = 6 * x**2 + 2 * x + 4 # noqa
y = 7 + x**5 + 4 * x # noqa: E222  <-- for a specific error.
```

---

### **11.3 Ignoring style violation without comment**
```cli
flake8 --ignore E222 quadratic.py
```

```cli
flake8 --select F401, F841 features.py
```

---

### **11.4 Choosing package settings using setup.cfg**

Creating a `setup.cfg` to store settings
```text
[flake8]

ignore = E302
exclude = setup.py

per-file-ignores =
    example_package/example_package.py: E222
```

---

```text
.
|-- example_package
|   |-- __init__.py
|   `-- example_package.py
|-- tests
|   |-- __init__.py
|   `-- test_example_package.py
|-- README.rst
|-- LICENSE
|-- MANIFEST.in
|-- setup.py
`-- setup.cfg
```

---

**Run `flake8` on the whole package at once**

> You have to navigate to the top of the package, and run `flake8` from the terminal.

---

## 12. Rapid Package Development

### **12.1 Faster package development with templates**

> `cookiecutter` 
>
> Can be used to create empty Python packages.

```cli
cookiecutter <template-url>
```

- More templates [Here](https://cookiecutter.readthedocs.io/en/1.7.2/README.html#a-pantry-full-of-cookiecutters())


---

```cli
cookiecutter https://github.com/audreyr/cookiecutter-pypackageMore 
```


```text
full_name [Audrey Roy Greenfeld]: James Fulton
email [audreyr@example.com]: james@email.com
github_username [audreyr]: MyUsername
project_name [Python Boilerplate]: mysklearn
project_slug [mysklearn]: mysklearn
```
- Project slug - the name used in pip install name

---

```text
...
project_short_description [Python Boilerplate ...]: A Python package for linear
    regression.
pypi_username [MyUsername]:
version [0.1.0]:
```
- description can be manually modified in the readme file later

---

```text
...
use_pytest [n]: y <-- to use `pytest`
use_pypi_deployment_with_travis [y]: n
add_pyup_badge [n]: n
```

---

```text
...
Select command_line_interface:
1 - Click
2 - Argparse
3 - No command-line interface
Choose from 1, 2, 3 [1]: 3
create_author_file [y]: y
```

---

```text 
...
Select open_source_license:
1 - MIT license
2 - BSD license
3 - ISC license
4 - Apache Software License 2.0
5 - GNU General Public License v3
6 - Not open source
Choose from 1, 2, 3, 4, 5, 6 [1]: 6

```

**Final result**
```text
mysklearn/
|-- mysklearn/
|   |-- __init__.py
|   `-- mysklearn.py
|-- tests/
|   |-- __init__.py
|   `-- test_mysklearn.py
|-- MANIFEST.in
|-- README.rst
|-- requirements_dev.txt
|-- setup.cfg
|-- setup.py
|-- tox.ini
|-- AUTHORS.rst
|-- CONTRIBUTING.rst
|-- HISTORY.rst
`-- Makefile
...  <--- This part can be simply deleted.
...
|-- docs/ 
|-- .github/
|-- .editorconfig
|-- .gitignore
`-- .travis.yml
```

---


### **12.2 Version numbers and history**

#### **12.2.1 Overview**

**CONTRIBUTING.md** 

> Invites other developers to work on your package.
>
> Tell them how to get started.


---

**HISTORY.md**

> known as history, __release notes__ or changelog.
>
> Tell users what has changed between versions.

<u><b>Contains: </b></u>

- Section for each released version

- Bullet points of the important changes

- Subsections for:

  - Improvements to existing functions

  - New additions

  - Bugs that have been fixed

  - Deprecations


<u><b>Example: </b></u>

```text
# History

## 0.3.0
### Changed
- Regression fitting sped up using NumPy operations.
### Deprecated
- Support for Python 3.5 has ended.
- `regression.regression` module has been removed.

## 0.2.1
### Fixed
- Fixed bug causing intercepts of zero.

## 0.2.0
### Added
- Multiple linear regression now available in new `regression.multiple_regression` module.
### Deprecated
- 0.2.x will be the last version that supports Python 3.5.
- `regression.regression` module has been renamed `regression.single_regression`. `regression.regression` will be removed in next minor release.

```

---

> **Note**:
>
> - Increase version number when ready for new release.
> - Cannot upload to `PyPI` if not changed.

---


#### **12.2.2 How to update the version number**

```text
mysklearn/
|-- mysklearn/
|   |-- __init__.py          <--- TOP level __init__.py
|   `-- mysklearn.py
|-- setup.py                 <--- 
...
```

---

In `setup.py`
```python
# Import required functions
from setuptools import setup, find_packages

# Call setup function
setup(
    ...
    version='0.1.0',  # <--
    ...
)
```
---

In Top level `__init__.py`
```python
"""
Linear regression for Python
============================

mysklearn is a complete package for implementing
linear regression in python.
"""

__version__ = '0.1.0'  # <---
```
this allows:
```python
print(mysklearn.__version__) # 0.1.0
```

---

#### **12.2.3 `bumpversion` Convenient tool to update all package version numbers**

```text
mysklearn/           <-- navigate to here
|-- mysklearn/
|   |-- __init__.py
|   `-- mysklearn.py
|-- setup.py
...
```

---

```cli
bumpversion major
```

---

```cli
bumpversion minor
```

---

```cli
bumpversion patch
```



---


### **12.3 Makefiles and classifiers**

> Makefiles which will speed up your development
>
> Classifiers which will help people find your package.

---

#### **12.3.1 Classifiers**

> Classifiers provide metadata for your package to help users find it on the Python Package Index (PyPI).

Key Metadata to Include:
- Package status (e.g., Alpha, Beta, Production)

- Your intended audience (e.g., Developers, Science/Research)

- License type (e.g., MIT, Apache)

- Language (e.g., English)

- Versions of Python supported (e.g., 3.6, 3.7, 3.8)


**Example inside setup.py:**
```python
...
setup(
    ...
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
    ],
    ...
)
```
---

#### **12.3.2 Makefiles**

> Used to automate parts of building your package.
>
> simplifies common development tasks into short commands (functions).

```text
clean-build: ## Remove build artifacts
	rm -fr build/
	rm -fr dist/
	rm -fr .eggs/

dist: clean-build ## Build source and wheel package
	python3 setup.py sdist bdist_wheel

test: ## run tests quickly with the default Python
  pytest

release: ## package and upload a release
  twine upload dist/*
```

---

**General Syntax**

```text
function/cmd_Name: prerequisites ## Description of the function
  the cmd/list of cmds


```
---

**Usage**

```text
mysklearn/ <--- navigate to here
...
|-- README.md
|-- setup.py
|-- Makefile
...
```

---

In CLI
```cli
make <function-name>
```

---

**Makefile summary**

```cli
make help
```

---

Output:
```text
clean           remove all build, test, coverage and Python artifacts
clean-build     remove build artifacts
clean-pyc       remove Python file artifacts
clean-test      remove test and coverage artifacts
lint            check style with flake8
test            run tests quickly with the default Python
test-all        run tests on every Python version with tox
release         package and upload a release
dist            builds source and wheel package
install         install the package to the active Python's site-packages
```

---


## 13. `__name__ == "__main__"`

`__name__` is a special variable in Python: 
- If the file is run directly, `__name__` is `"__main__"`.
- If the file is imported, `__name__` is the module’s name.

Code inside `if __name__ == "__main__":` runs only when executed directly.



```python
def greet():
    print("Hello!")

if __name__ == "__main__":
    greet()  # runs only when file executed directly

```
