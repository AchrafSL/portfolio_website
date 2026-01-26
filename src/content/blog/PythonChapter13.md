---
title: "Chapter 13_VirtualEnv"
description: "Creating and managing isolated Python environments using venv for dependency management."
pubDate: "Jan 26 2026"
---

# 1. Virtual Environment (venv)

## 1.1 A virtual environment is a self-contained Python environment:
- Has its **own Python interpreter**.
- Has its **own** `site-packages` **folder** (where libraries are installed).
- Is **isolated** from your system Python or other projects.
- Lets you use **different library versions** per project without conflicts.

---

## 1.2 Using virtual environments is important because:
- It prevents package version conflicts between projects.
- Makes projects more portable and reproducible.
- Keeps your system Python installation clean.
- Allows testing with different Python versions.

---

## 1.3 How to create and use one
```cli
# Create a virtual environment named 'myfirstproject'
C:\Users\Your Name> python -m venv myfirstproject

# --------------------------------------------------------------------------------------------

# Activate it (Linux/macOS)
$ source myfirstproject/bin/activate


# Activate it (Windows)
C:\Users\Your Name> myfirstproject\Scripts\activate


# Result: (The command line will look like this when the virtual environment is active)
(myfirstproject) C:\Users\Your Name>


# --------------------------------------------------------------------------------------------


# Install packages inside the virtual environment
C:\Users\Your Name> pip install requests


# --------------------------------------------------------------------------------------------


# Deactivate when done
C:\Users\Your Name> deactivate

# --------------------------------------------------------------------------------------------


# Delete Virtual Environment (Windows)
C:\Users\Your Name> rmdir /s /q myfirstproject


# Delete Virtual Environment (Linux/macOS)
$ rm -rf myfirstproject

```
