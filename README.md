
# VidLock

VidLock is a video paywall application built using modern web technologies like Next.js, Auth.js, Neon (Postgres Database), Bunny CDN, Drizzle ORM, Hono JS (RPC), and Razorpay for seamless payment integration. It enables content creators to securely host their video content, allowing only premium members to access videos. The application uses Embed View Token Authentication to ensure that video URLs are protected and only accessible by paid members.


## Features

- OAuth Authentication: Secure user login using GitHub through Auth.js.
- Neon + Drizzle ORM: Efficient database management with Neon for Postgres and Drizzle ORM for schema management and queries.
- Bunny CDN: High-performance video hosting using Bunny CDN to serve content quickly and securely.
- Payment Integration: Integrated with Razorpay for smooth and secure premium upgrades and payments.
- Embed View Token Authentication: Protects video URLs, ensuring that only premium users can access and view videos.
- Premium Membership: Users can view videos only after upgrading to a premium membership by paying the fees via Razorpay.
- Access Control: Non-premium users are prompted to upgrade their accounts to access restricted content.
## Tech Stack

**Client:** Next.js, Auth.js, shadcn ui, Bunny CDN

**Server:** Next.js, Auth.js, Neon( PostgreSQL), Hono.js, Razorpay



## Installation

Clone the repository:

```bash
  git clone https://github.com/ShagunDubey1/VidLock.git
  cd vid-lock
```
    
Install dependencies:

```bash
    npm Install
```

Set up environment variables:

Create a .env file in the root directory and add the following:

```bash
    NEXT_PUBLIC_BUNNY_CDN_URL=your_bunny_cdn_url
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    DATABASE_URL=your_postgres_neon_url
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Run the migrations using Drizzle ORM:

```bash
   npm run db-migrate
```

Start the development server:

```bash
   npm run dev
```
