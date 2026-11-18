import { Vehicle, Driver, FuelStation, FuelCoupon, FuelTransaction, AnomalyAlert, FuelPriceRecord, MaintenanceRecord } from '../types';

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-01',
    plateNumber: '3-04921 AA',
    branchCode: 'DD-CUST-01',
    model: 'Toyota Land Cruiser V8 (Anti-Smuggling Patrol)',
    fuelType: 'Diesel',
    tankCapacityLiters: 130,
    standardKmPerLiter: 7.5,
    currentOdometer: 48210,
    department: 'Enforcement & Anti-Smuggling',
    assignedDriverId: 'drv-01',
    status: 'Active'
  },
  {
    id: 'veh-02',
    plateNumber: '3-11823 AA',
    branchCode: 'DD-CUST-02',
    model: 'Toyota Hilux Double Cabin 4x4',
    fuelType: 'Diesel',
    tankCapacityLiters: 80,
    standardKmPerLiter: 10.2,
    currentOdometer: 32450,
    department: 'Mobile Surveillance Team',
    assignedDriverId: 'drv-02',
    status: 'Active'
  },
  {
    id: 'veh-03',
    plateNumber: '3-08912 AA',
    branchCode: 'DD-CUST-03',
    model: 'Isuzu NPR Cargo Inspection Truck',
    fuelType: 'Diesel',
    tankCapacityLiters: 120,
    standardKmPerLiter: 6.8,
    currentOdometer: 61900,
    department: 'Cargo Inspection & Warehousing',
    assignedDriverId: 'drv-03',
    status: 'Active'
  },
  {
    id: 'veh-04',
    plateNumber: '3-02145 AA',
    branchCode: 'DD-CUST-04',
    model: 'Toyota Corolla Sedan (Administrative Pool)',
    fuelType: 'Petrol',
    tankCapacityLiters: 50,
    standardKmPerLiter: 13.5,
    currentOdometer: 21500,
    department: 'General Services & Administration',
    assignedDriverId: 'drv-04',
    status: 'Active'
  },
  {
    id: 'veh-05',
    plateNumber: '3-15609 AA',
    branchCode: 'DD-CUST-05',
    model: 'Toyota Hilux Single Cabin',
    fuelType: 'Diesel',
    tankCapacityLiters: 80,
    standardKmPerLiter: 10.0,
    currentOdometer: 54100,
    department: 'Railway Customs Station',
    assignedDriverId: 'drv-05',
    status: 'Maintenance'
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'drv-01',
    fullName: 'Kebede Tadesse Bekele',
    faydaId: 'FD-893104829',
    licenseNumber: 'ET-DL-98231',
    phone: '+251 911 234 567',
    department: 'Enforcement & Anti-Smuggling',
    status: 'Verified'
  },
  {
    id: 'drv-02',
    fullName: 'Mohammed Ahmed Aliyi',
    faydaId: 'FD-442910834',
    licenseNumber: 'ET-DL-44120',
    phone: '+251 922 345 678',
    department: 'Mobile Surveillance Team',
    status: 'Verified'
  },
  {
    id: 'drv-03',
    fullName: 'Dawit Mekonnen Haile',
    faydaId: 'FD-771920384',
    licenseNumber: 'ET-DL-77382',
    phone: '+251 913 456 789',
    department: 'Cargo Inspection & Warehousing',
    status: 'Verified'
  },
  {
    id: 'drv-04',
    fullName: 'Hassan Omar Dirie',
    faydaId: 'FD-129384756',
    licenseNumber: 'ET-DL-12893',
    phone: '+251 931 567 890',
    department: 'General Services & Administration',
    status: 'Verified'
  },
  {
    id: 'drv-05',
    fullName: 'Tigist Alemu Demissie',
    faydaId: 'FD-665432190',
    licenseNumber: 'ET-DL-66541',
    phone: '+251 942 678 901',
    department: 'Railway Customs Station',
    status: 'Verified'
  }
];

export const initialStations: FuelStation[] = [
  {
    id: 'stn-01',
    name: 'TotalEnergies Station - Dire Dawa Central',
    location: 'Kebele 04, Main Industrial Road',
    iotStatus: 'Online',
    dieselPricePerLiter: 74.85,
    petrolPricePerLiter: 82.10,
    dailyReservedLiters: 5000
  },
  {
    id: 'stn-02',
    name: 'Nile Petroleum Terminal - Customs Depot',
    location: 'Railway Station Hub, Dire Dawa',
    iotStatus: 'Online',
    dieselPricePerLiter: 74.85,
    petrolPricePerLiter: 82.10,
    dailyReservedLiters: 4000
  },
  {
    id: 'stn-03',
    name: 'National Oil (NOC) Station #4',
    location: 'Lager Road, Dire Dawa',
    iotStatus: 'Online',
    dieselPricePerLiter: 74.85,
    petrolPricePerLiter: 82.10,
    dailyReservedLiters: 3500
  }
];

export const initialCoupons: FuelCoupon[] = [
  {
    id: 'cup-01',
    serialNumber: 'DD-CUP-2026-9001',
    vehicleId: 'veh-01',
    driverId: 'drv-01',
    authorizedLiters: 100,
    fuelType: 'Diesel',
    issuedDate: '2026-11-15',
    expiryDate: '2026-11-25',
    issuedBy: 'Ato Solomon Bekele (Procurement Head)',
    status: 'Active'
  },
  {
    id: 'cup-02',
    serialNumber: 'DD-CUP-2026-9002',
    vehicleId: 'veh-02',
    driverId: 'drv-02',
    authorizedLiters: 70,
    fuelType: 'Diesel',
    issuedDate: '2026-11-16',
    expiryDate: '2026-11-26',
    issuedBy: 'Ato Solomon Bekele (Procurement Head)',
    status: 'Active'
  },
  {
    id: 'cup-03',
    serialNumber: 'DD-CUP-2026-9003',
    vehicleId: 'veh-03',
    driverId: 'drv-03',
    authorizedLiters: 110,
    fuelType: 'Diesel',
    issuedDate: '2026-11-14',
    expiryDate: '2026-11-24',
    issuedBy: 'Ato Solomon Bekele (Procurement Head)',
    status: 'Active'
  }
];

export const initialTransactions: FuelTransaction[] = [
  {
    id: 'tx-01',
    transactionCode: 'TX-DD-88192',
    timestamp: '2026-11-17 08:30:12',
    vehicleId: 'veh-01',
    plateNumber: '3-04921 AA',
    driverId: 'drv-01',
    driverName: 'Kebede Tadesse Bekele',
    faydaId: 'FD-893104829',
    stationId: 'stn-01',
    stationName: 'TotalEnergies Station - Dire Dawa Central',
    couponSerial: 'DD-CUP-2026-8980',
    fuelType: 'Diesel',
    authorizedLiters: 100,
    dispensedLiters: 99.5,
    pricePerLiter: 74.85,
    totalCostEtb: 7447.57,
    odometerReading: 48210,
    previousOdometer: 47460,
    calculatedKmPerLiter: 7.53,
    verificationStatus: 'Verified',
    auditHash: '0x8f9c2b1e4a7d3f6c8b9a0e1f2d3c4b5a6e7f8a9b'
  },
  {
    id: 'tx-02',
    transactionCode: 'TX-DD-88195',
    timestamp: '2026-11-17 10:15:44',
    vehicleId: 'veh-02',
    plateNumber: '3-11823 AA',
    driverId: 'drv-02',
    driverName: 'Mohammed Ahmed Aliyi',
    faydaId: 'FD-442910834',
    stationId: 'stn-02',
    stationName: 'Nile Petroleum Terminal - Customs Depot',
    couponSerial: 'DD-CUP-2026-8985',
    fuelType: 'Diesel',
    authorizedLiters: 70,
    dispensedLiters: 69.8,
    pricePerLiter: 74.85,
    totalCostEtb: 5224.53,
    odometerReading: 32450,
    previousOdometer: 31735,
    calculatedKmPerLiter: 10.24,
    verificationStatus: 'Verified',
    auditHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'
  }
];

export const initialAlerts: AnomalyAlert[] = [
  {
    id: 'alt-01',
    timestamp: '2026-11-18 02:14:00',
    severity: 'Critical',
    type: 'Siphoning Detected',
    description: 'Abrupt tank level drop of 45 liters detected overnight while vehicle parked in unauthorized zone.',
    vehicleId: 'veh-03',
    plateNumber: '3-08912 AA',
    stationId: 'stn-01',
    status: 'Active'
  },
  {
    id: 'alt-02',
    timestamp: '2026-11-17 16:45:20',
    severity: 'Warning',
    type: 'Excess Dispense Volume',
    description: 'Dispensed volume (115L) approached physical tank capacity limit (120L) with low residual mileage.',
    vehicleId: 'veh-03',
    plateNumber: '3-08912 AA',
    stationId: 'stn-02',
    status: 'Investigating'
  }
];

export const initialPrices: FuelPriceRecord[] = [
  {
    id: 'prc-01',
    date: '2026-11-01',
    dieselPrice: 74.85,
    petrolPrice: 82.10,
    approvedBy: 'Ministry of Trade & Regional Integration / Dire Dawa Bureau'
  }
];

export const initialMaintenance: MaintenanceRecord[] = [
  {
    id: 'mnt-01',
    vehicleId: 'veh-05',
    plateNumber: '3-15609 AA',
    serviceType: 'Scheduled 50,000 km Full Overhaul',
    scheduledMileage: 54000,
    status: 'Scheduled',
    date: '2026-11-20'
  },
  {
    id: 'mnt-02',
    vehicleId: 'veh-01',
    plateNumber: '3-04921 AA',
    serviceType: 'Brake Pad & Filter Replacement',
    scheduledMileage: 48500,
    status: 'Scheduled',
    date: '2026-11-22'
  }
];
