import { PrismaClient, UserRole, ProjectStatus, MilestoneStatus, PaymentStatus, MachineStatus, BinStatus, AuditStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ========================
  // Users
  // ========================
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      role: UserRole.ADMIN,
    },
  })

  const consultant = await prisma.user.create({
    data: {
      name: "Consultant Jane",
      email: "consultant@example.com",
      role: UserRole.CONSULTANT,
    },
  })

  const client = await prisma.user.create({
    data: {
      name: "Client John",
      email: "client@example.com",
      role: UserRole.CLIENT,
    },
  })

  // ========================
  // Consultancy
  // ========================
  const project = await prisma.project.create({
    data: {
      title: "Waste Management Strategy",
      description: "Consultancy project for improving municipal waste handling.",
      status: ProjectStatus.ACTIVE,
      clientId: client.id,
      consultantId: consultant.id,
      milestones: {
        create: [
          {
            title: "Initial Assessment",
            description: "Conduct waste flow analysis.",
            status: MilestoneStatus.COMPLETED,
            amount: 1000,
          },
          {
            title: "Final Report",
            description: "Submit full strategy report.",
            status: MilestoneStatus.IN_PROGRESS,
            amount: 2000,
          },
        ],
      },
    },
  })

  await prisma.payment.create({
    data: {
      userId: client.id,
      serviceType: "CONSULTANCY",
      entityId: project.id,
      amount: 1000,
      currency: "USD",
      status: PaymentStatus.SUCCEEDED,
      transactionId: "txn_123456",
    },
  })

  // ========================
  // Composting
  // ========================
  const machine = await prisma.compostingMachine.create({
    data: {
      name: "Composter X100",
      location: "Factory Site A",
      status: MachineStatus.RUNNING,
      clientId: client.id,
    },
  })

  await prisma.compostSale.create({
    data: {
      buyerName: "Green Farm",
      volumeKg: 500,
      price: 250,
    },
  })

  await prisma.compostingProcess.create({
    data: {
      stage: "processing",
      inputKg: 600,
      outputKg: 500,
      efficiency: 83.3,
      machineId: machine.id,
    },
  })

  await prisma.trainingSession.create({
    data: {
      topic: "Onsite Composting Best Practices",
      trainer: "Trainer Mary",
      date: new Date(),
      completed: false,
    },
  })

  await prisma.farmSupply.create({
    data: {
      farmName: "Happy Cows Ltd.",
      volumeKg: 1000,
      deliveryDate: new Date(),
    },
  })

  // ========================
  // Waste Collection
  // ========================
  const route = await prisma.route.create({
    data: {
      name: "Route 1",
      area: "Downtown",
      bins: {
        create: [
          {
            identifier: "BIN-001",
            location: "Main Street",
            status: BinStatus.FULL,
          },
          {
            identifier: "BIN-002",
            location: "2nd Avenue",
            status: BinStatus.EMPTY,
          },
        ],
      },
      schedules: {
        create: [
          {
            date: new Date(),
            notes: "Morning collection",
          },
        ],
      },
    },
  })

  // ========================
  // Smart Waste
  // ========================
  await prisma.smartAuditRequest.create({
    data: {
      clientId: client.id,
      status: AuditStatus.PENDING,
    },
  })

  await prisma.alert.create({
    data: {
      type: "BIN_FULL",
      message: "Bin BIN-001 is full and needs collection.",
    },
  })

  await prisma.insightReport.create({
    data: {
      title: "Monthly Waste Trends",
      content: "Overall waste reduced by 12% compared to last month.",
    },
  })

  // ========================
  // Chat
  // ========================
  const thread = await prisma.chatThread.create({
    data: {
      serviceType: "CONSULTANCY",
      entityId: project.id,
      participants: {
        connect: [{ id: admin.id }, { id: consultant.id }, { id: client.id }],
      },
    },
  })

  await prisma.chatMessage.createMany({
    data: [
      {
        content: "Welcome to the project chat.",
        senderId: admin.id,
        threadId: thread.id,
      },
      {
        content: "Thanks, looking forward to collaborating.",
        senderId: consultant.id,
        threadId: thread.id,
      },
      {
        content: "Happy to get started!",
        senderId: client.id,
        threadId: thread.id,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
