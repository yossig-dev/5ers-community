export type ProgramType = "evaluation" | "competition" | "funded" | "demo";
export type AssetType = "CFD" | "Futures";
export type ProgramStatus = "active" | "disabled";

export type Program = {
  id: string;
  size: string;
  cost: number;
  balance: number;
  asset: AssetType;
  status: ProgramStatus;
  expirationDate: Date;
  type: ProgramType;
  accountNumber: string;
  programName: string;
  purchaseDate: Date;
};

// Mock programs data (sorted newest to oldest)
export const MOCK_PROGRAMS: Program[] = [
  {
    id: "prog7",
    size: "$200k",
    cost: 999,
    balance: 203450.20,
    asset: "Futures",
    status: "active",
    expirationDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    type: "funded",
    accountNumber: "#BC-201548",
    programName: "Elite Bootcamp $200k",
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "prog5",
    size: "$50k",
    cost: 349,
    balance: 52340.80,
    asset: "CFD",
    status: "active",
    expirationDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    type: "competition",
    accountNumber: "#CT-450123",
    programName: "Monthly Contest $50k",
    purchaseDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
  {
    id: "prog2",
    size: "$25k",
    cost: 155,
    balance: 27840.20,
    asset: "CFD",
    status: "active",
    expirationDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), // 28 days
    type: "evaluation",
    accountNumber: "#HS-200892",
    programName: "High Stakes $25k",
    purchaseDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
  },
  {
    id: "prog4",
    size: "$25k",
    cost: 155,
    balance: 27120.30,
    asset: "CFD",
    status: "active",
    expirationDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
    type: "funded",
    accountNumber: "#BC-100567",
    programName: "Bootcamp $25k",
    purchaseDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
  },
  {
    id: "prog1",
    size: "$100k",
    cost: 599,
    balance: 108450.75,
    asset: "CFD",
    status: "active",
    expirationDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days
    type: "funded",
    accountNumber: "#BC-100345",
    programName: "Bootcamp $100k",
    purchaseDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000), // 35 days ago
  },
  {
    id: "prog3",
    size: "$10k",
    cost: 79,
    balance: 11650.50,
    asset: "Futures",
    status: "disabled",
    expirationDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Expired 5 days ago
    type: "evaluation",
    accountNumber: "#HG-301247",
    programName: "Hyper Growth $10k",
    purchaseDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
  },
  {
    id: "prog6",
    size: "$5k",
    cost: 0,
    balance: 5000.00,
    asset: "Futures",
    status: "active",
    expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    type: "demo",
    accountNumber: "#DEMO-789456",
    programName: "Demo Account",
    purchaseDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
  },
];

export function getProgramTypeColor(type: ProgramType): string {
  switch (type) {
    case "evaluation":
      return "yellow";
    case "competition":
      return "purple";
    case "funded":
      return "red";
    case "demo":
      return "cyan";
  }
}

export function getProgramTypeLabel(type: ProgramType): string {
  switch (type) {
    case "evaluation":
      return "Evaluation";
    case "competition":
      return "Competition";
    case "funded":
      return "Funded";
    case "demo":
      return "Demo";
  }
}
