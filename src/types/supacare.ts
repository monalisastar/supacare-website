// src/types/supacare.ts
// Shared TypeScript Enums + Interfaces
// Generated to match your Prisma schema for Supacare SOS

export enum UserRole {
  ADMIN = "ADMIN",
  CONSULTANT = "CONSULTANT",
  CLIENT = "CLIENT",
  PARTNER = "PARTNER",
  CUSTOMER = "CUSTOMER",
}

export enum ProjectStatus {
  NEW = "NEW",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
}

export enum MilestoneStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum CarbonStage {
  CONCEPT = "CONCEPT",
  VALIDATION = "VALIDATION",
  VERIFICATION = "VERIFICATION",
  ISSUANCE = "ISSUANCE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentEntityType {
  CONSULTANCY = "CONSULTANCY",
  CARBON = "CARBON",
  WASTE = "WASTE",
  MACHINE = "MACHINE",
  COMPOST_SALE = "COMPOST_SALE",
  SMART_AUDIT = "SMART_AUDIT",
  SUBSCRIPTION = "SUBSCRIPTION",
}

export enum MachineStatus {
  RUNNING = "RUNNING",
  MAINTENANCE = "MAINTENANCE",
  OFFLINE = "OFFLINE",
}

export enum BinStatus {
  EMPTY = "EMPTY",
  PARTIAL = "PARTIAL",
  FULL = "FULL",
  DAMAGED = "DAMAGED",
}

export enum AuditStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum ChatMessageType {
  TEXT = "TEXT",
  FILE = "FILE",
  IMAGE = "IMAGE",
}

export enum MessageRole {
  USER = "USER",
  AI = "AI",
  SYSTEM = "SYSTEM",
}

export enum NotificationType {
  BIN_FULL = "BIN_FULL",
  MACHINE_OFFLINE = "MACHINE_OFFLINE",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
  PROJECT_UPDATE = "PROJECT_UPDATE",
}

export enum ContentType {
  TEXT = "TEXT",
  RICH_TEXT = "RICH_TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  PDF = "PDF",
  GALLERY = "GALLERY",
  COMPONENT = "COMPONENT",
}

/// ===========================
/// FRONTEND-SAFE INTERFACES
/// ===========================

export interface SupacareUser {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface ConsultancyProject {
  id: string
  title: string
  description?: string
  status: ProjectStatus
  clientId: string
  consultantId?: string
  createdAt: string
  updatedAt: string
}

export interface PaymentRecord {
  id: string
  userId: string
  amount: number
  currency: string
  entityType: PaymentEntityType
  status: PaymentStatus
  createdAt: string
}

/// ===========================
/// DASHBOARD TYPE HELPERS
/// ===========================

export interface OperationsSnapshotProps {
  role?: UserRole
  data?: Record<string, any>
}

export interface ProjectsOverviewProps {
  role?: UserRole
  data?: any[]
}

export interface DashboardSummaryProps {
  role?: UserRole
  summaryData?: Record<string, number>
}
