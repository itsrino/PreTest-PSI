# API Routes Documentation

## List of Routes

### Checkout
- **POST** `/checkout`  
  - Description: Process checkout transaction.

### Companies
- **POST** `/companies`  
  - Description: Create a new company.
- **GET** `/companies`  
  - Description: Retrieve a list of companies.

### Authentication
- **POST** `/auth/register`  
  - Description: Register a new user.
- **POST** `/auth/login`  
  - Description: Authenticate a user and return an access token.
- **GET** `/auth/profile`  
  - Description: Get the authenticated user's profile.
- **GET** `/auth/logout`  
  - Description: Logout the authenticated user and invalidate the session.
