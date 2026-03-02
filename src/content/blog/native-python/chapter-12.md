---
title: "Chapter 12_Multithreading"
description: "Understanding concurrency in Python, the Global Interpreter Lock (GIL), and using the threading module."
pubDate: "Jan 24 2026"
---

# Introduction to multithreading in python
> Used to perform multiple tasks concurrently (multitasking)

> `threading.Thread(target=my_function)`

---

Multithreading in Python is about concurrency, not raw parallelism, most of the time 

Python threads share the same memory space, which makes communication easy but introduces coordination problems. 
The famous twist is the `GIL (Global Interpreter Lock)`: only one thread executes Python bytecode at a time in CPython.

---

> So what’s the point then?
>
> Threads shine when tasks are I/O-bound:
> - waiting for files
> - network requests
> - APIs
> - databases
> - sleeping, polling, blocking calls

---

**While one thread waits, another can run.**
```python
from threading import Thread
import time

def work():
    time.sleep(2)
    print("done")

t = Thread(target=work)
t.start()
print("main continues")

"""
The main thread starts.

You create a second thread and start it.

The second thread immediately calls time.sleep(2) → it blocks itself.

While that thread is sleeping, the main thread keeps running.

The main thread prints "main continues" and then usually finishes.

After ~2 seconds, the sleeping thread wakes up and prints "done".

"""
```

---

**Note:**
```python
from threading import Thread
import time

def work():
    time.sleep(2) # releases the GIL (A sleeping thread is not runnable, Only runnable threads compete for execution)
    print("done")

t = Thread(target=work)
t.start()
print("main continues")
while True:
    pass  


"""
Even here, the second thread will still run.

Why?

CPython periodically releases the GIL (every ~5ms)

This lets other threads run

So after sleep(2) finishes, the worker thread gets a turn and prints "done"
"""

# A Python thread can only be blocked forever if another thread holds the GIL forever. (This does not happen with normal Python code.)
# ( It can happen only with badly written C extensions. )
```

---

**Waiting for threads and passing arguments**
```python
from threading import Thread
import time

def work(name):
    time.sleep(2)
    print(f"Hey {name} the work is done")

def walk()
    time.sleep(4)
    print("sleep done")

t1 = Thread(target=work, args= ("John",)) # args must be passed as a tuple.
t1.start()


t2 = Thread(target=walk)
t2.start()

t1.join() # wait for the thread to finish, before continuing for the rest of the program
t2.join() # The main thread waiting
print("main continues")


```
