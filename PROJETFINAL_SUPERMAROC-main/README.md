\# 🛒 SuperMaroc — Distributed Supermarket Management System



SuperMaroc is a distributed supermarket management platform developed using \*\*Java, Spring Boot, Java RMI, MySQL, and JavaScript\*\*.



The project demonstrates a distributed architecture where multiple supermarket stores can manage products and inventory through a centralized backend while customers can browse products and place orders through a web interface.



The system currently includes two SuperMaroc stores:



\- 📍 SuperMaroc Agadir

\- 📍 SuperMaroc Casablanca



\---



\## 🚀 Main Features



\### 👤 Customer Web Application



The customer interface allows users to:



\- Browse available supermarket products

\- Search products by name

\- Filter products by category

\- Browse products from multiple SuperMaroc stores

\- Add products to a shopping cart

\- Update product quantities in the cart

\- Remove products from the cart

\- Calculate the cart total automatically

\- Submit an order

\- Display product images dynamically

\- View product reviews

\- Use a responsive web interface



Orders are validated by the backend before being processed.



\---



\### 🛠️ Mini Admin Dashboard



The Mini Admin interface provides supermarket management features including:



\- Real-time product loading from the backend

\- Product creation

\- Product editing

\- Product deletion

\- Product details visualization

\- Product search

\- Category filtering

\- Stock-status filtering

\- Store-based product management

\- Low-stock detection

\- Out-of-stock detection

\- Inventory value calculation

\- Product statistics

\- CSV export

\- Product image visualization

\- Database synchronization / refresh



The dashboard communicates directly with the SuperMaroc REST API.



\---



\## 🏪 Multi-Store Architecture



SuperMaroc currently manages two stores:



| ID | Store | Location |

|---|---|---|

| 1 | SuperMaroc Agadir | Agadir, Morocco |

| 2 | SuperMaroc Casablanca | Casablanca, Morocco |



Each product is associated with a specific store using its `storeId`.



This makes it possible to maintain separate inventory levels for each supermarket while using the same centralized system.



\---



\## 🧺 Product Categories



The database currently contains four main product categories:



| ID | Category |

|---|---|

| 1 | Fruits |

| 2 | Boissons |

| 3 | Produits laitiers |

| 4 | Épicerie |



\---



\## 🏗️ Architecture



The project follows a distributed multi-layer architecture.



```text

Customer Web Interface

&#x20;       │

&#x20;       │ HTTP / REST

&#x20;       ▼

Spring Boot REST API

&#x20;       │

&#x20;       │ Java RMI

&#x20;       ▼

RMI Services

&#x20;       │

&#x20;       ▼

DAO Layer

&#x20;       │

&#x20;       ▼

MySQL Database





Mini Admin Interface

&#x20;       │

&#x20;       │ HTTP / REST

&#x20;       ▼

Spring Boot REST API

```



The architecture separates:



\- User interfaces

\- REST communication

\- Distributed services

\- Business logic

\- Data access

\- Database persistence



\---



\## 💻 Technologies Used



\### Backend



\- Java 17

\- Spring Boot 3.2.1

\- Spring Web

\- Spring Data JPA

\- Java RMI

\- JDBC

\- Maven

\- Spring Security Crypto

\- BCrypt

\- Jakarta Validation



\### Database



\- MySQL



\### Frontend



\- HTML5

\- CSS3

\- JavaScript

\- Bootstrap 5

\- Font Awesome

\- Swiper.js

\- Chart.js



\### Development Tools



\- Visual Studio Code

\- MySQL Workbench

\- Git

\- GitHub

\- Maven



\---



\## 📁 Project Structure



```text

PROJETFINAL\_SUPERMAROC/

│

├── backend/

│   ├── src/

│   ├── pom.xml

│   └── ...

│

├── client-web/

│   ├── index.html

│   ├── products.html

│   ├── index.css

│   ├── script.js

│   └── ...

│

├── mini-admin/

│   ├── index.html

│   ├── products.html

│   ├── products.js

│   ├── products.css

│   ├── sales.html

│   ├── alerts.html

│   ├── orders.html

│   ├── suppliers.html

│   ├── inventory.html

│   └── ...

│

├── database/

│   ├── supermaroc\_data.sql

│   ├── demo\_products.sql

│   └── ...

│

└── pom.xml

```



\---



\## 🔌 REST API



The product management interface communicates with:



```text

GET    /api/admin/produits

POST   /api/admin/produits

PUT    /api/admin/produits

DELETE /api/admin/produits/{id}

```



\### Product Object



Products contain the following main information:



```json

{

&#x20; "productId": 1,

&#x20; "storeId": 1,

&#x20; "categoryId": 1,

&#x20; "name": "Product Name",

&#x20; "price": 10.0,

&#x20; "quantity": 50,

&#x20; "description": "Product description",

&#x20; "imagePath": "https://example.com/product.jpg"

}

```



\---



\## 🛍️ Order Processing



Customer orders are processed through the backend.



During checkout, the system:



1\. Receives the selected products and quantities.

2\. Validates the requested products.

3\. Checks product stock.

4\. Ensures the order belongs to one store.

5\. Creates the order.

6\. Creates the associated order items.

7\. Decreases product stock.

8\. Commits the transaction.



Database operations are executed transactionally so that a failed order does not leave inventory in a partially updated state.



\---



\## 🔐 Security



The project includes several backend security improvements:



\- Database credentials are provided through environment variables.

\- Employee passwords are hashed using \*\*BCrypt\*\*.

\- Plain-text employee passwords are not required by the backend authentication logic.

\- Backend input validation is supported using Jakarta Validation.



> Note: the customer-side account interface is a demonstration frontend feature and should not be considered a production authentication system.



\---



\## 🗄️ Database



Create the MySQL database:



```sql

CREATE DATABASE supermaroc

CHARACTER SET utf8mb4

COLLATE utf8mb4\_unicode\_ci;

```



Import the main database:



```bash

mysql --default-character-set=utf8mb4 -u root -p supermaroc < database/supermaroc\_data.sql

```



Optional demo products can then be imported using:



```bash

mysql --default-character-set=utf8mb4 -u root -p supermaroc < database/demo\_products.sql

```



Using `utf8mb4` is recommended to preserve accented product and category names correctly.



\---



\## ⚙️ Configuration



Before running the backend, configure the database credentials as environment variables.



\### Windows PowerShell



```powershell

$env:DB\_USERNAME = "root"

$env:DB\_PASSWORD = Read-Host "Enter MySQL password"

```



This avoids storing the database password directly in the source code.



\---



\## 📦 Build the Backend



From the project root:



```bash

mvn -f backend/pom.xml clean package -DskipTests

```



The generated Spring Boot application is placed inside:



```text

backend/target/

```



\---



\## 🌐 Running the Distributed System



\### 1. Start MySQL



Make sure the MySQL server is running and the `supermaroc` database has been imported.



\### 2. Configure Database Credentials



In PowerShell:



```powershell

$env:DB\_USERNAME = "root"

$env:DB\_PASSWORD = Read-Host "Enter MySQL password"

```



\### 3. Start the RMI Server



After building the project:



```powershell

$cp = "backend\\target\\classes;" + (Get-Content "backend\\target\\classpath.txt" -Raw)

java -cp $cp rmi.RMIServer

```



Keep this terminal running.



\### 4. Start the Spring Boot API



Open another PowerShell terminal and configure the same database environment variables.



Then run:



```powershell

java -jar "backend\\target\\superMaroc-api-0.0.1-SNAPSHOT.jar"

```



The REST API runs locally on:



```text

http://localhost:8888

```



\### 5. Open the Customer Interface



Open:



```text

client-web/index.html

```



\### 6. Open the Mini Admin



Open:



```text

mini-admin/index.html

```



\---



\## 📊 Database Model



The main database entities include:



\- Stores

\- Categories

\- Products

\- Stocks

\- Sales

\- Users / Employees

\- Orders

\- Order Items

\- Product Images



Products are linked to stores and categories, while orders contain one or more order items.



\---



\## 🔄 Distributed Communication



One of the main objectives of SuperMaroc is to demonstrate distributed-system concepts.



The backend uses \*\*Java RMI\*\* for communication between distributed service components, while the web applications communicate with the Spring Boot layer through REST endpoints.



This combination demonstrates communication across multiple layers:



```text

Web Client → REST API → RMI Service → DAO → MySQL

```



\---



\## 🎓 Academic Context



SuperMaroc was developed as an academic distributed-systems project in the \*\*Computer Engineering and Embedded Systems\*\* program.



The project demonstrates practical use of:



\- Distributed systems

\- Java RMI

\- REST APIs

\- Backend development

\- Relational databases

\- Transaction management

\- Web development

\- Inventory management

\- Git and GitHub collaboration



\---



\## 👥 Team Members



\- Noura Abakri

\- Salma Boumart

\- Bahiya El Hajali

\- Fatim-Zahra Bouharroud

\- Khadija Anezzjar



\---



\## 👩‍💻 Contributor



\*\*Noura Abakri\*\*



Computer Engineering \& Embedded Systems  

Ibn Zohr University — Agadir, Morocco



\---



\## 📌 Project Status



The current version includes:



\- ✅ Distributed Java RMI architecture

\- ✅ Spring Boot REST API

\- ✅ MySQL persistence

\- ✅ Multi-store product management

\- ✅ Customer product catalog

\- ✅ Shopping cart

\- ✅ Transactional checkout

\- ✅ Inventory updates

\- ✅ Mini Admin dashboard

\- ✅ Product CRUD operations

\- ✅ Search and filtering

\- ✅ Product images

\- ✅ BCrypt employee password hashing

\- ✅ Demo product dataset



\---



\## 📄 License



This project was developed for academic and educational purposes.

