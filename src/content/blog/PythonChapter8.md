---
title: "Chapter 8_Network Programming"
description: "Introduction to network programming with Sockets, HTTP requests, urllib, Requests library, and BeautifulSoup."
pubDate: "Jan 26 2026"
---

# 1. Socket (Low-Level)

> A socket allows direct communication between two computers over a network.


> **With sockets, we manually build the HTTP request:**
```python
import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sock.connect(('data.pr4e.org', 80)) # 80 -> port

cmd = 'GET /romeo.txt HTTP/1.0\r\nHost: data.pr4e.org\r\n\r\n'
sock.send(cmd.encode())
```

> **Receiving data:**
```python
while True:
    data = sock.recv(512)
    if not data:
        break
    print(data.decode())

# Full control, Complex and error-prone
```



# 2. HTTP Request

An HTTP request is a text message sent to a server.

Main parts:
- Method (GET)
- Path
- Headers
- Blank line


**Example:**
```text
GET /romeo.txt HTTP/1.0
Host: data.pr4e.org
```




# 3. urllib (Built-in Library)

> urllib is a built-in Python library that hides sockets and HTTP details.

```python
from urllib.request import urlopen

f = urlopen('http://data.pr4e.org/romeo.txt')
for line in f:
    print(line.decode().strip())


# Safer than sockets
```



# 4. requests (Third-Party Library)

> requests is a popular but NOT built-in library.

```python
import requests

r = requests.get('http://data.pr4e.org/romeo.txt')
print(r.text)

# Must be installed with pip
# Very easy to use
```



# 5. BeautifulSoup (bs4)
> BeautifulSoup extracts data from HTML after it is loaded.
>
> For HTML parsing.

```python
from bs4 import BeautifulSoup
from urllib.request import urlopen

html = urlopen('http://www.dr-chuck.com/page1.htm')
soup = BeautifulSoup(html, 'html.parser')

for tag in soup('a'):
    print(tag.get('href', None))

```
