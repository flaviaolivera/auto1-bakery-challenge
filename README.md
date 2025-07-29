# Bakery App – Auto1 Frontend Challenge
![bakery shop](https://static.vecteezy.com/system/resources/previews/002/045/877/large_2x/fancy-bakery-shop-with-trees-and-bike-vector.jpg)


## 🚀 Live Demo Links

- **[🌐 Live Application](https://auto1-bakery-challenge.vercel.app/)** - Full functional demo
- **[📚 Storybook Documentation](https://auto1-bakery-storybook.vercel.app/)** - Interactive component library
- **[📦 GitHub Repository](https://github.com/flaviaolivera/auto1-bakery-challenge)** - Source code and documentation

## 📋 Project Overview

Web application developed for a local bakery expanding their business online. I implemented a natural user flow with modern architecture and additional features to enhance the overall experience.

### 🎯 Key Technical Decision

**Enhanced User Flow**: To create a more natural shopping experience, I expanded from the 2 pages outlined in the requirements (product list + success page) to include a complete customer journey:
- Home → Product listing with quick-add functionality
- Cart → Order review with quantity management  
- Checkout → Customer information form
- Success/Error → Confirmation with ability to place new orders

This approach provides a more familiar e-commerce experience for users.

## ✅ Requirements Fulfilled

### 📋 Basic Requirements (100% Completed)
- ✅ **Product listing** with name, thumbnail, and prices
- ✅ **Quantity selector** with available stock control
- ✅ **Dynamic total price** updated in real-time
- ✅ **Out of stock states** clearly differentiated
- ✅ **Success page** after placing order
- ✅ **Multiple consecutive orders** without reload
- ✅ **React + Bootstrap 5** per technical specifications

### 🛠️ Core Tech Stack
- ✅ **React 18** with TypeScript for type safety
- ✅ **Bootstrap 5** for responsive design
- ✅ **Sass** as CSS preprocessor (plus requirement)

## 🌟 Advanced Features Implemented

### 🏗️ Architecture & Patterns
- **Full TypeScript** implementation with typed interfaces
- **Zustand** for global state management (Observer pattern)
- **Facade Pattern** in ApiService for API abstraction
- **Modular architecture** with separation of concerns
- **Custom hooks** for reusable logic

### 🎨 Advanced User Experience
- **Fully responsive design** (mobile-first approach)
- **Micro-animations** with Framer Motion
- **Loading states** and skeletons for all operations
- **Toast notifications** for immediate feedback
- **Robust validations** with Zod schemas
- **Error boundaries** and comprehensive error handling

### 🔧 Development Tools
- **Storybook** deployed for component documentation
- **ESLint + Prettier** for code quality
- **Jest + React Testing Library** for unit testing
- **React Router v6** for SPA navigation
- **React Hot Toast** for UX notifications

## 🏛️ Project Architecture

src/
├── types/                    # TypeScript interfaces
│   ├── Product.ts
│   ├── CartItem.ts
│   ├── Order.ts
│   └── CustomerInfo.ts
│
├── stores/                   # Zustand state management
│   ├── productStore.ts
│   └── cartStore.ts
│
├── services/                 # Business logic layer
│   └── ApiService.ts        # Facade pattern for API
│
├── components/              # Modular components
│   ├── layout/             # Layout components
│   ├── common/             # Reusable components
│   │   ├── buttons/
│   │   ├── forms/
│   │   └── media/
│   ├── products/           # Product-specific components
│   ├── cart/              # Cart-specific components
│   └── checkout/          # Checkout form and summary
│
├── pages/                  # Main views
│   ├── Home/
│   ├── Cart/
│   ├── Checkout/
│   └── Confirmation/
│
├── schemas/               # Zod validations
│   └── checkoutSchema.ts
│
├── stories/              # Storybook documentation
├── hooks/               # Custom React hooks
└── utils/               # Helper functions


## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### 🔧 Server Setup
bash
cd A1G-FE-challenge
npm install
npm run start

*Server running on port 3001*

### 🖥️ Frontend Setup
bash
cd A1G-FE-challenge/client
npm install
npm run start

*Application available at http://localhost:3000*

### 📚 Storybook Setup
bash
cd A1G-FE-challenge/client
npm run storybook

*Storybook available at http://localhost:6006*

### 🧪 Run Tests
bash
cd A1G-FE-challenge/client
npm run test


## 🎯 Development Methodology

**Approach**: Incremental development with functional deliverables at each phase

### Completed Phases:
1. **Setup & Foundations** - Complete tech stack configuration
2. **Data Layer** - TypeScript interfaces, Zustand stores, services
3. **Base Components** - Reusable component library  
4. **Core Customer Flow** - End-to-end main user flow
5. **Checkout & Confirmation** - Complete purchase process
6. **Polish & UX** - Responsive design, animations, loading states
7. **Extra Features** - Custom hooks, advanced optimizations
8. **Testing & Quality** - Unit tests, ESLint, strict TypeScript
9. **Storybook** - Component documentation and deployment

## 🛡️ Error Handling & Validations

### Frontend
- **Stock control** before adding products to cart
- **Form validations** with Zod schemas
- **Data format validation** (email, phone) with visual feedback

### Backend Integration
- **Network error handling** with retry logic
- **API error responses** handled appropriately
- **Fallback UI** for critical errors
- **Toast notifications** for immediate feedback

## 🏅 Technical Challenges Overcome

### 🔧 Version Compatibility
Careful dependency management ensuring compatibility between React 18, TypeScript, Zustand, and the complete ecosystem.

### 🎨 Smooth Animations
Implementation of micro-animations with Framer Motion that enhance UX without impacting performance.

### ⚖️ Architectural Balance
**No over-engineering**: Maintaining simplicity while building with scalable mindset. Avoiding unnecessary complexity while covering real use cases.

### 🚀 Deployment & Configuration
Successful configuration of deployments for both the main application and Storybook documentation.

## 🎨 Design Decisions

- **Enhanced fidelity** to original design with UX improvements
- **Mobile-first approach** with optimized breakpoints
- **Visual consistency** through design system in Storybook
- **Micro-interactions** that guide users naturally
- **Loading states** that maintain engagement during operations

## 🔍 Testing & Quality

- **Unit tests** for utilities and critical components
- **Integration tests** for main flows
- **TypeScript strict mode** for complete type safety
- **ESLint + Prettier** for code consistency
- **Storybook** as living component documentation

## 📈 Future Improvements

- **Payment integration** with Stripe or similar
- **Admin dashboard** for product management
- **Dark mode** theme implementation
- **i18n integration** for multi-language support

---

## 📋 Original Challenge Requirements

*Below are the original challenge instructions that were provided:*

## Context

The local bakery would like to extend its business by offering their products online. They approached you to help them build an app for this purpose.

This app should list all the different bakery products and needs to give the option to order them. 

Luckily the bakery provides an [API](#api-reference) as well as a [design](#design) for you to work with.

## Product Requirements

As a customer:

- [ ] I want to see a list of all products the bakery offers.
- [ ] For each product I want to see:
    - [ ] Product name
    - [ ] Product thumbnail
    - [ ] Product price
- [ ] For each product I want to be able: 
  - [ ] to select the amount I want to order
  - [ ] to not select more items than are available
- [ ] I want to see the total price of all my selected products.
- [ ] I want to see a "disabled" state if a product is out of stock.
- [ ] I want to see a success page once I ordered
- [ ] I want to be able to submit multiple orders

## Your Task

Create a React application that fulfills all requirements above, plus any nice-to-have requirements you wish to include.

For that, you will need to make requests to the API delivered in this repository.

If you are not able to implement a particular requirement, please provide a description of what and why you could not implement it.

### Design
For the layout of each page, please refer to the provided screens:

- [Index page](./assets/screens/index.png)
- [Success page](./assets/screens/success.png)

Font being used in these screens is [Montserrat](https://fonts.google.com/specimen/Montserrat) and can be embedded from Google Fonts.

## Tech Requirements

- React
- Bootstrap 3, 4 or 5
- Using any CSS preprocessor is a plus

## Instructions

- Fork this repo
- Build a clean and well-structured solution
- Send it to [frontend-marketing-challenge@auto1-group.com](mailto:frontend-marketing-challenge@auto1-group.com) as a zip container (please name is as A1G-FE-challenge-${your_name})

## API Reference

#### Get all items

```http
  GET /api/storage
```

- Returns an array `storage`
- Inside of `storage` are multiple objects with the following structure:

| Key | Type | Description |
| :-------- | :------- | :--- |
| `name` | `string` | Name of item |
| `stock` | `integer` | Number of items in stock |
| `price` | `number` | Price of item |

#### Post order

```http
  POST /api/order
```

- Expects an array `items`
- Inside of `items` one or multiple objects of the following structure are expected:

| Key | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. name of item to order |
| `quantity` | `integer` | **Required**. quantity of item to order |

- the api will return status code 200 and `{message: 'success'}` if the order went through
- the api will return status code 400 and `{error: 'ERROR_MESSAGE', errorItem: 'ITEM_NAME'}` if the quantity is too high for a certain item

## Setup and run server
```
cd A1G-FE-challenge
npm i
npm run start
```


## Setup and run frontend
```
cd A1G-FE-challenge/client
npm i
npm run start
```


## Credits

Icons made by [Freepik](https://www.freepik.com)</a> from [https://www.flaticon.com/](www.flaticon.com)
