// Static data for the application - no backend required

export const staticBooks = [
  {
    id: "1",
    title: "ABC Journey With Girl",
    description: "Join your child on a fun-filled adventure as they explore the alphabet! From apples to zebras...",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    ageRange: { minAge: 3, maxAge: 4 },
    idealFor: "girl",
    discountPct: 10,
    orderCount: 7,
    price: 29.99
  },
  {
    id: "2",
    title: "Girl and the Moon Goddess",
    description: "Take your child on a whimsical journey filled with laughter...",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    ageRange: { minAge: 5, maxAge: 10 },
    idealFor: "girl",
    discountPct: 10,
    price: 34.99
  },
  {
    id: "3",
    title: "Boy The Dinos Need You",
    description: "Imagine waking up to find a glowing dinosaur footprint...",
    coverImage: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    ageRange: { minAge: 3, maxAge: 6 },
    idealFor: "boy",
    discountPct: 10,
    orderCount: 1,
    price: 32.99
  },
  {
    id: "4",
    title: "The Amazing Adventures",
    description: "A heartwarming story about a boy who loves ice cream...",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    ageRange: { minAge: 3, maxAge: 5 },
    idealFor: "boy",
    discountPct: 10,
    orderCount: 25,
    price: 28.99
  }
];

export const staticUser = {
  email: "admin@example.com",
  name: "Admin User",
  role: "user",
  id: "user-1"
};

export const staticOrders = [
  {
    id: "order-1",
    bookTitle: "ABC Journey With Girl",
    status: "completed",
    date: "2024-01-15",
    total: 29.99
  },
  {
    id: "order-2",
    bookTitle: "Space Adventure",
    status: "pending",
    date: "2024-01-20",
    total: 34.99
  }
];

export const staticMyBooks = [
  {
    id: "book-1",
    chapterTitle: "Emma's Magical Adventure",
    storySummary: "Join Emma on a magical journey through enchanted forests and mystical lands.",
    childAge: "5-8 years",
    childName: "Emma",
    coverPageImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    paymentStatus: "paid",
    isBookInCart: false,
    gender: "girl"
  },
  {
    id: "book-2",
    chapterTitle: "Alex's Space Mission",
    storySummary: "Follow Alex as he explores distant planets and meets friendly aliens.",
    childAge: "6-10 years",
    childName: "Alex",
    coverPageImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop",
    paymentStatus: "pending",
    isBookInCart: true,
    gender: "boy"
  }
];

// Authentication helpers
export const AUTH_CREDENTIALS = {
  email: "admin@example.com",
  password: "password123"
};

export const ADMIN_CREDENTIALS = {
  email: "admin@starmebooks.com",
  password: "admin123"
};

export const staticAdmin = {
  email: "admin@starmebooks.com",
  name: "Admin User",
  role: "admin",
  id: "admin-1"
};

export const isValidCredentials = (email: string, password: string): boolean => {
  return email === AUTH_CREDENTIALS.email && password === AUTH_CREDENTIALS.password;
};

export const isValidAdminCredentials = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

// Static admin data
export const staticAdminStats = {
  totalUser: 1250,
  orderInTransit: 45,
  totalRevenue: "$125,430",
  totalOrder: 892
};

export const staticRevenueData = [
  { monthYear: "Jan 2024", totalAmount: 15000 },
  { monthYear: "Feb 2024", totalAmount: 18000 },
  { monthYear: "Mar 2024", totalAmount: 22000 },
  { monthYear: "Apr 2024", totalAmount: 19000 },
  { monthYear: "May 2024", totalAmount: 25000 },
  { monthYear: "Jun 2024", totalAmount: 28000 }
];

export const staticCountryData = [
  ["Country", "Users"],
  ["United States", 450],
  ["United Kingdom", 320],
  ["Canada", 180],
  ["Australia", 150],
  ["Germany", 200]
];

export const staticRecentOrders = [
  {
    id: "ORD-001",
    currency: "USD",
    createdAt: "2024-01-15T10:30:00Z",
    shippingMethod: "Standard",
    status: "paid",
    recipient: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      city: "New York"
    },
    personalizedBooks: [
      {
        title: "Emma's Adventure",
        childName: "Emma",
        childAge: "5 years",
        coverPageImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop"
      }
    ]
  },
  {
    id: "ORD-002",
    currency: "USD",
    createdAt: "2024-01-14T15:45:00Z",
    shippingMethod: "Express",
    status: "pending",
    recipient: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "+1987654321",
      city: "Los Angeles"
    },
    personalizedBooks: [
      {
        title: "Alex's Space Journey",
        childName: "Alex",
        childAge: "7 years",
        coverPageImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop"
      }
    ]
  }
];

export const staticBlogs = [
  {
    id: "1",
    title: "Creating Magical Stories for Children",
    description: "Learn how to craft engaging stories that capture children's imagination",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    content: "<h2>Introduction to Storytelling</h2><p>Creating magical stories for children is an art that combines creativity, understanding of child psychology, and engaging narrative techniques.</p><h3>Key Elements</h3><p>Every great children's story needs memorable characters, an engaging plot, and valuable life lessons.</p>",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "The Benefits of Personalized Books",
    description: "Discover why personalized books make reading more engaging for children",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    content: "<h2>Why Personalization Matters</h2><p>When children see themselves as the hero of their own story, reading becomes more meaningful and engaging.</p><h3>Educational Benefits</h3><p>Personalized books improve reading comprehension and foster a love for literature.</p>",
    updatedAt: "2024-01-14T15:45:00Z"
  }
];

export const staticBookPrices = [
  {
    _id: "price-1",
    currencyCode: "USD",
    currencyName: "US Dollar",
    currencySymbol: "$",
    value: 29.99,
    isActive: true
  },
  {
    _id: "price-2",
    currencyCode: "EUR",
    currencyName: "Euro",
    currencySymbol: "€",
    value: 26.99,
    isActive: true
  }
];


export const staticTemplateDetails = {
  tags: ["adventure", "friendship"],
  shippingModes: ["standard", "express"],
  categoryIds: ["cat-1"],
  isActive: true,
  isDeleted: false,
  language: "English",
  status: "active",
  title: "Emma's Magical Adventure",
  description: "A wonderful story about friendship and courage",
  coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
  ageRange: { _id: "age-1", minAge: 5, maxAge: 8 },
  idealFor: "girl",
  customStoryDetails: {
    _id: "story-1",
    character: "Brave Princess",
    adventure: "Magical Forest Quest",
    morality: "Friendship and Courage"
  },
  pages: 24,
  basePrice: 29.99,
  discountPct: 10,
  genreId: { name: "Adventure", id: "genre-1" },
  reviewAvg: 4.8,
  reviewCount: 156,
  orderCount: 89,
  templateChapters: [
    {
      _id: "ch-1",
      chapterType: "cover",
      chapterTitle: "The Beginning",
      chapterNumber: 0,
      imageGenerationPrompt: "A magical forest with sparkles",
      generatedImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      scaledImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      generatedImageStatus: "complete",
      scaledImageStatus: "complete",
      pages: {
        pageOneText: "Once upon a time, {{{{childName}}}} discovered a magical world.",
        pageTwoText: "{{{{childName}}}} was brave and ready for adventure."
      }
    }
  ]
};

export const staticOrderDetails = {
  id: "ORD-001",
  currency: "USD",
  createdAt: "2024-01-15T10:30:00Z",
  shippingMethod: "standard",
  shippingMethodUid: "dhl_express",
  status: "paid",
  gelatoStatus: "processing",
  recipient: {
    firstName: "John Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postCode: "10001",
    country: "USA"
  },
  personalizeBooks: [
    {
      personalizedBookId: "book-123",
      title: "Emma's Adventure",
      childName: "Emma",
      childAge: "5",
      coverPageImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
      previewPdfUrl: "https://example.com/sample.pdf"
    }
  ],
  shippingQuotes: {
    totalPrice: 5.99,
    minDeliveryDate: "2024-01-25T00:00:00Z",
    maxDeliveryDate: "2024-01-30T00:00:00Z"
  },
  orderSummary: {
    totalBookPrice: 29.99,
    promotionDiscount: 3.00,
    GrandTotal: 32.98
  },
  trackOrderDetails: {
    orderReferenceId: "REF-123456",
    productionStatus: "processing",
    orderItems: [
      {
        itemReferenceId: "item-1",
        status: "passed",
        trackingCode: [{ parcelNumber: 1, trackingCode: "TRK123456", trackingUrl: "https://track.example.com" }],
        productionLog: [
          { date: "2024-01-15T10:30:00Z", printJobId: 12345, message: "Order received" },
          { date: "2024-01-15T11:00:00Z", printJobId: 12345, message: "Processing started" }
        ]
      }
    ]
  }
};

export const staticCurrencyList = [
  { currencyCode: "USD", currencySymbol: "$", currencyName: "US Dollar" },
  { currencyCode: "EUR", currencySymbol: "€", currencyName: "Euro" }
];

export const staticUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    lastLogin: "2024-01-15"
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    lastLogin: "2024-01-14"
  },
  {
    id: "user-3",
    name: "Admin User",
    email: "admin@starmebooks.com",
    role: "Admin",
    lastLogin: "2024-01-16"
  }
];

export const staticBookTemplates = [
  {
    bookTemplateId: "template-1",
    title: "Emma's Magical Adventure",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    basePrice: 29.99,
    idealFor: "girl",
    ageRange: { minAge: 5, maxAge: 8 },
    shippingModes: ["standard", "express"],
    character: "Brave Princess",
    adventure: "Magical Forest Quest",
    morality: "Friendship and Courage"
  },
  {
    bookTemplateId: "template-2",
    title: "Alex's Space Mission",
    coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop",
    basePrice: 34.99,
    idealFor: "boy",
    ageRange: { minAge: 6, maxAge: 10 },
    shippingModes: ["standard"],
    character: "Space Explorer",
    adventure: "Galactic Journey",
    morality: "Bravery and Discovery"
  }
];

export const staticBookTemplateStats = {
  totalBookTemplate: 15,
  activeBookTemplate: 12,
  mostUsedTemplateName: "Emma's Magical Adventure",
  mostUsedTemplateCount: 45
};

export const staticTemplateDetailsAdmin = {
  data: {
    results: staticBookTemplates,
    totalPages: 1,
    totalResults: staticBookTemplates.length
  }
};
