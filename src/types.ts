export type LanguageCode = 'en' | 'am' | 'om' | 'so' | 'ti';

export type UserRole = 
  | 'executive'     // Deputy Manager & Branch General Manager
  | 'logistics'     // Logistics & Dispatch Division
  | 'station'       // Fuel Station Connectivity & Daily Coupon Ops
  | 'finance'       // Procurement & Finance Work Process
  | 'property'      // Property Administration & General Services
  | 'audit';        // Internal Audit Division

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  faydaId: string;
  branch: string;
  avatarUrl: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  branchCode: string;
  model: string;
  fuelType: 'Diesel' | 'Petrol';
  tankCapacityLiters: number;
  standardKmPerLiter: number;
  currentOdometer: number;
  department: string;
  assignedDriverId: string;
  status: 'Active' | 'In Transit' | 'Maintenance' | 'Suspended';
}

export interface Driver {
  id: string;
  fullName: string;
  faydaId: string; // e.g. "FD-928374192"
  licenseNumber: string;
  phone: string;
  department: string;
  status: 'Verified' | 'Pending' | 'Suspended';
}

export interface FuelStation {
  id: string;
  name: string;
  location: string;
  iotStatus: 'Online' | 'Offline' | 'Maintenance';
  dieselPricePerLiter: number;
  petrolPricePerLiter: number;
  dailyReservedLiters: number;
}

export interface FuelCoupon {
  id: string;
  serialNumber: string; // e.g. "DD-CUP-2026-9081"
  vehicleId: string;
  driverId: string;
  authorizedLiters: number;
  fuelType: 'Diesel' | 'Petrol';
  issuedDate: string;
  expiryDate: string;
  issuedBy: string;
  status: 'Active' | 'Used' | 'Expired' | 'Flagged';
}

export interface FuelTransaction {
  id: string;
  transactionCode: string; // e.g. "TX-DD-88291"
  timestamp: string;
  vehicleId: string;
  plateNumber: string;
  driverId: string;
  driverName: string;
  faydaId: string;
  stationId: string;
  stationName: string;
  couponSerial: string;
  fuelType: 'Diesel' | 'Petrol';
  authorizedLiters: number;
  dispensedLiters: number;
  pricePerLiter: number;
  totalCostEtb: number;
  odometerReading: number;
  previousOdometer: number;
  calculatedKmPerLiter: number;
  verificationStatus: 'Verified' | 'Anomaly Flagged' | 'Manually Overridden';
  auditHash: string; // Immutable ledger cryptographic hash simulation
  notes?: string;
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  severity: 'Critical' | 'Warning' | 'Notice';
  type: 'Siphoning Detected' | 'Odometer Rollback' | 'Excess Dispense Volume' | 'Route Deviation' | 'Duplicate Coupon' | 'Unverified Fayda ID';
  description: string;
  vehicleId: string;
  plateNumber: string;
  stationId?: string;
  status: 'Active' | 'Investigating' | 'Resolved' | 'Frozen';
}

export interface FuelPriceRecord {
  id: string;
  date: string;
  dieselPrice: number;
  petrolPrice: number;
  approvedBy: string;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  plateNumber: string;
  serviceType: string;
  scheduledMileage: number;
  status: 'Scheduled' | 'Completed' | 'Overdue';
  date: string;
}
