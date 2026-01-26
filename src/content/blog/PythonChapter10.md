---
title: "Chapter 10_OOP"
description: "Object-Oriented Programming principles: Classes, Objects, Inheritance, Polymorphism, Encapsulation, and Magic Methods."
pubDate: "Jan 22 2026"
---

> object is the ultimate ancestor of every class in Python.
> 
> gives you: Basic, universal behavior that all Python objects share ( identity, ...)
# I. Classes and Objects

## 1. Create a Class

> To create a class, use the keyword `class`:

```python
class MyClass:
  x = 5   # Class variable
```

---

## 2. Create Object

> Now we can use the class named MyClass to create objects:
```python
ob1 = MyClass()
ob2 = MyClass()

ob1.x = 7 # creates x attribute for ob1 ( doens't use Myclass.x attr)
print(ob2.x) # 7 (uses the class attr)

```

> class scope:
>
> instance → class → parent classes

## 3. Delete Objects

> You can delete objects by using the `del` keyword:
```python
del p1
``` 

## 4. The pass Statement

> `class` definitions cannot be empty, but if you for some reason have a `class` definition with no content, put in the `pass` statement to avoid getting an error.
```python
class Person:
  pass
```


---
---
<br><br><br><br>



# II. `__init__()` Method (constructor)

## 1. `__init__()` 

```python
class Person:
    n = 0 # <-- class variables (can be accessed only with obj.attr and MyClass.attr)
    def __init__(self, name, age):
        self.name = name  # <-- instances variables (can be accessed only with obj.attr)
        self.age = age

p1 = Person("Emil", 36)

print(p1.name)
print(p1.age)

# self <=> this in java.

```
> `self` is a reference to the current instance of the class.

---

## 2. Without `__init__()`

> Without the `__init__()` method, you would need to set properties manually for each object.

```python
class Person:
  pass

p1 = Person()
p1.name = "Tobias"
p1.age = 25

print(p1.name)
print(p1.age)
```
---

> You can also set default values for parameters in the `__init__()` method.


## 3. `self` Parameter

> `self` parameter must be the first parameter of any method in the class. 
>
> It does not have to be named `self`, you can call it whatever you like.

```python
# Using myobject, self and abc.
class Person:
  def __init__(myobject, name, age):
    myobject.name = name
    myobject.age = age

  def greet(self):
    return "Hello, " + self.name

  def welcome(abc):
    message = abc.greet() # Call one method from another method using self.
    print(message + "! Welcome to our website.")

p1 = Person("Emil", 36) # Python secretly rewrites it as: `Person.greet(p1)`.
p1.greet()
```


---
---
<br><br><br><br>


# II.part2 `__del__()` Method (destructor)
Called when object is garbage-collected (not deterministic).
```python
class A:
    def __del__(self):
        print("Destroyed")

```
> It is only called by Python's garbage collector when the reference count of an object reaches zero.
>
> meaning there are no more variables or attributes pointing to that specific object.
>
> also when an object is deleted by `del obj`


---
---
<br><br><br><br>


# III. Properties

## 1. Public, Protected, Private attributes 

> (just a label convention and not forced by python)

**Public (no underscore)**
```python
class A:
    def __init__(self):
        self.x = 10

a = A()
print(a.x)     # OK
```

---
**Protected (_var) → convention only**
```python
class A:
    def __init__(self):
        self._y = 20

a = A()
print(a._y)    # Works, but "should not" be used outside
```

---
**Private (__var) → name mangling**
```python
class A:
    def __init__(self):
        self.__z = 30

a = A()
# print(a.__z)       ❌ AttributeError
print(a._A__z)       # ✔ name mangled

```

> `name mangled` (When an attribute starts with two leading underscores, Python rewrites its name internally)
>
> It prevents subclasses from accidentally overriding internal attributes.

---



## 2. Add New Properties
> You can add new properties to existing objects:

```python
class Person:
  def __init__(self, name):
    self.name = name

p1 = Person("Tobias")

p1.age = 25 # new property added (added only to this specific object)
p1.city = "Oslo" # same thing here!

print(p1.name)
print(p1.age)
print(p1.city)
```




## 3. Modify Properties
```python
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

p1 = Person("Tobias", 25)
print(p1.age)

p1.age = 26 # modified
print(p1.age)
```

## 4. Delete Properties
```python
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

p1 = Person("Linus", 30)

del p1.age # deleted

print(p1.name) # This works
# print(p1.age) # This would cause an error
```

---
---
<br><br><br><br>

# IV. Methods

## 1. Private method

> same thing here, just a convention

```python
class A:
    def __secret(self): # name mangled -> _A__secret()
        return "hidden"

    def show(self):
        return self.__secret()

a = A()
print(a.show())
print(a._A__secret())

```


## 2. Instance Methods

> must have self as the first parameter.

```python
class A:
    def f(self):
        pass


a.f()  # →  A.f(a)
```

## 3. static-like behavior methods

```python
class A:
    def f():
        pass

a = A()
a.f() # ❌ Error
A.f() # ✅ Works now!

```


## 4. static methods
> Dont have access to class data (class attr, instance attr, etc)
>
> Belongs to a class, usually used for general utility functions.

```python
class A:
    @staticmethod
    def add(x, y):
        return x + y

a = A()
a.add(1,2) # Allows this !
A.add(1,2) 
```

## 5. class methods
> Allow operations related to class itself. (class attrs, etc)
> 
> Methods that uses 'class attr' (class data), or require access to the class itself.
>
>
> Take (cls) as the first parameter, which represents the class itself.

```python
class A:
    count = 0

    @classmethod
    def inc(cls):
        cls.count += 1

A.inc()
```


## 6. `@property` decorator

> This decorator is used to define a method as a property (accessed like an attribute).
> 
> Benefit: Add additional logic when read, write, or delete attributes.
>
> Gives you getter, setter, and deleter method.

```python
class Rectangle:
    def __init__(self, width, height):
        self._width = width
        self._height = height

    # ----------------------------------------------
    
    ## getters called automatically
    @property
    def width(self):
        # add additional logic
        return f"{self._width:.1f}cm"

    @property
    def height(self):
        return f"{self._height:.1f}cm"


    # ----------------------------------------------

    ## setters called automatically
    @width.setter
    def width(self, new_width):
        # add additional logic
        if (new_width > 0):
            self._width = new_width
        else:
            print("Width must be > 0")


    @height.setter
    def height(self, new_height):
        if (new_height > 0):
            self._height = new_height
        else:
            print("height must be > 0")

    
    # -----------------------------------------------

    ## deleter called automatically
    @width.deleter
    def width(self):
        del self._width
        print("Width has been deleted")


    @height.deleter
    def height(self):
        del self._height
        print("Height has been deleted")



rect = Rectangle(1,5)
print(rect.width) # 1cm -> calls the width getter

rect.width = 0  # prints -> 'Width must be > 0'

del rect.width # prints -> 'Width has been deleted'
```





## 7. Dunder / magic methods
> They are automatically called by many of Python's built-in operations.
>
> They allow developers to define or customize the behavior of objects

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __del__(self):
        print("Destroyed")

    # --------------------------------------------------

    def __str__(self):
        return f"Point({self.x}, {self.y})"

    # --------------------------------------------------

    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)

    
    def __eq__(self, other):
        return (self.x == other.x) and (self.y == other.y)


p = Point(2, 3) # calls __init__
del p    # calls __del__


p1 = Point(2, 3); p2 = Point(1, 2); p3 = Point(3, 2)
p3 = p1 + p2  # calls __add__
p1 == p2  # calls __eq__, returns False

print(p1)  # calls __str__
```



## 8. Delete Methods

```python
class Person:
  def __init__(self, name):
    self.name = name

  def greet(self):
    print("Hello!")

p1 = Person("Emil")

del Person.greet # deleted

p1.greet() # This will cause an error
```


---
---
<br><br><br><br>



# V. Inheritance

> `class Child(Parent)`


## 1.Basic Inheritance


**Case1: using parent `__init()__`**
```python
class Person:
    def __init__(self):
        self.role = "human"

class Student(Person): # this does NOT auto-create attributes you need __init__
    pass 


s = Student() # in this case Student use it's parent __init__() method 
print(s.role)  # works
```

---

**Case2: overiding parent `__init()__`**
```python
...
class Student(Person):
  def __init__(self, fname, lname):
    Person.__init__(self, fname, lname) # to keep the attr inherited from the parent.

```


## 2. Using `super()`

> Allows a child class to call methods from parent class.

```python
class Student(Person):
  def __init__(self, fname, lname):
    super().__init__(fname, lname)
```


## 3. Multiple inheritance

### **3.1 Multiple inheritance**
> One class inherits from more than one parent. C(A, B)
>
> C gets attributes and methods from both A and B.
>
> If names clash, Python follows the `MRO (Method Resolution Order)`: MRO defines the order Python follows to find attributes or methods, respecting parent order and visiting each class once.
```python
class C(A, B):
    pass

```
---

### **3.2 Multilevel inheritance**
> A class inherits from a class that already inherits from another. C(B) <-- B(A) <-- A
>
> Python handles this cleanly using the same MRO logic.
```python
class A: pass
class B(A): pass
class C(B): pass
```

---
### **3.3 MRO**
> note that `MRO` is only used in inheritance!!!

> Also the same method also used for `attributes multiple inheritance`.

> Python always checks the instance itself first.
>
> Only then it walks the MRO through classes.

**Multiple inheritance**
```python
class A:
    def speak(self): print("A")

class B:
    def speak(self): print("B")

class C(A, B):
    pass

c = C()
c.speak() # A
```
Because the MRO is:
```python
C -> A -> B -> object
# Left parent wins. (left to right rule)
```


---

**Multilevel inheritance**

Diamond problem Example:
```python
class A:
    def f(self): print("A")

class B(A):
    pass

class C(A):
    def f(self): print("C")

class D(B, C):
    pass
```

```
search order: D → B → C → A → object

D → no f

B → no f

C → ✅ f found → stop

```

---


No diamond problem Example:
```python
class A:
    def f(self):
        print("A")

class E:
    def f(self):
        print("E")

class C(A):
    def f(self):
        print("C")

class B(E):
    pass

class D(B, C):
    pass
```


```
Search order:
D itself → first
B → direct parent
E → parent of B
C → second direct parent of D
A → parent of C
object → topmost

--------------------------

Results:
D → no f
B → no f
E → has f → prints "E"

```


```
Python computes this using the C3 linearization algorithm. Fancy name, simple goal:
    - Keep parent order
    - Never visit a class twice
    - Avoid contradictions
```
---

**MRO intuition (no diamond):**
```
Python searches left-to-right through parents.
For each parent, it follows its chain down to the end before moving to the next parent.
Each class is visited in order, and lookup stops at the first match.
```

---

**MRO intuition (diamond inheritance):**
```
Python searches left-to-right through parents, exploring each parent’s chain “depth-first.”
If a class can be reached through multiple paths, Python visits it only once, at the position determined by C3 linearization, avoiding the diamond problem.
Lookup stops at the first match.
```


## 4. Composition vs Inheritance

**Composition (preferred often)**
```python
class Engine:
    pass

class Car:
    def __init__(self):
        self.engine = Engine()
```

---
---
<br><br><br><br>

# VI. Polymorphism

> - `Overloading` doesn’t exist in Python: the second function with the same name overwrites the first.
>
> - `Method overriding` exists: subclasses can redefine methods inherited from a parent class.
>

---

There are two ways to achieve polymorphism:
- 1. Inheritance 
- 2. "Duck typing"

---

## 1. Inheritance Polymorphism
```python
from abc import ABC, abstractmethod  # ABC (Abstract Base Classes)

# Abstract base class (interface)
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

# Concrete subclasses implementing the abstract method
class Circle(Shape):
    def __init__(self, r):
        self.r = r
    
    def area(self):
        return 3.14 * self.r ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side
    
    def area(self):
        return self.side ** 2

# Polymorphic behavior
shapes = [Circle(5), Square(4)]

# shape = Shape()  ❌ Error, cannot instantiate ABC

for shape in shapes:
    print(shape.area())
```

## 2. Duck Typing

> Object must have the minimum necessary attributes/methods
>
> "If it looks like a duck and quacks like a duck, it must be a duck".

Key idea: ( Duck typing = focus on capabilities, not types)
```
- You don’t check for the class type (isinstance)

- You just use the methods/attributes you need

- As long as the object supports them, your code works
```

```python
class Duck:
    def quack(self):
        print("Quack!")

class Person:
    def quack(self):
        print("I can quack too!")

def make_it_quack(entity):
    entity.quack()  # We don’t care if it’s a Duck or a Person

d = Duck()
p = Person()

make_it_quack(d)  # Quack!
make_it_quack(p)  # I can quack too!

# Polymorphism is achieved by calling methods that objects support, without caring about their class.
```


---
---
<br><br><br><br>



# VII.Inner Classes

> Inner class object is NOT created automatically.

```python
class Outer:
  def __init__(self):
    self.name = "Outer Class"

  class Inner:
    def __init__(self):
      self.name = "Inner Class"

    def display(self):
      print("This is the inner class")

outer = Outer()
print(outer.name)
```

## Access Inner class from outside:
inner = outer.Inner() # Now the Inner object is created
inner.display()

```

> Inner classes in Python do not automatically have access to the outer class instance.
>
> If you want the inner class to access the outer class, you need to pass the outer class instance as a parameter:

```python
class Outer:
  def __init__(self):
    self.name = "Emil"

  class Inner:
    def __init__(self, outer):
      self.outer = outer

    def display(self):
      print(f"Outer class name: {self.outer.name}")

outer = Outer()
inner = outer.Inner(outer)
inner.display()
```


> Examples:
```python
# Practical Example
class Car:
  def __init__(self, brand, model):
    self.brand = brand
    self.model = model
    self.engine = self.Engine()

  class Engine:
    def __init__(self):
      self.status = "Off"

    def start(self):
      self.status = "Running"
      print("Engine started")

    def stop(self):
      self.status = "Off"
      print("Engine stopped")

  def drive(self):
    if self.engine.status == "Running":
      print(f"Driving the {self.brand} {self.model}")
    else:
      print("Start the engine first!")

car = Car("Toyota", "Corolla")
car.drive()
car.engine.start()
car.drive()
```


```python
# Multiple Inner Classes
class Computer:
  def __init__(self):
    self.cpu = self.CPU()
    self.ram = self.RAM()

  class CPU:
    def process(self):
      print("Processing data...")

  class RAM:
    def store(self):
      print("Storing data...")

computer = Computer()
computer.cpu.process()
computer.ram.store()


```


---
---
<br><br><br><br>


# VIII. Dataclasses (Modern Python)

> Purpose: reduce boilerplate code for classes that mainly store data.
>
> Automatically generates `__init__`, `__repr__`, `__eq__`, and other methods.

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p1 = Point(2, 3)
p2 = Point(2, 3)

print(p1)      # Point(x=2, y=3)
print(p1 == p2) # True (automatically compares attributes)

```
