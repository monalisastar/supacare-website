import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProjectStatus, MilestoneStatus, UserRole, Project, Milestone } from "@prisma/client";

// ==========================
// Incoming milestone payload
// ==========================
interface MilestoneInput {
  title: string;
  description?: string;
  amount?: number;
  dueDate?: string;
}

// ==========================
// Full project input
// ==========================
interface ProjectInput {
  title: string;
  description?: string;
  clientId?: string;
  consultantId?: string;
  milestones?: MilestoneInput[];
}

// ==========================
// CREATE new consultancy project (Client/Admin only)
// ==========================
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const role = user.role ?? UserRole.CLIENT;
    if (role !== UserRole.CLIENT && role !== UserRole.ADMIN) {
      return NextResponse.json(
        { error: "Only clients or admins can create projects" },
        { status: 403 }
      );
    }

    // ✅ Cast body to ProjectInput
    const body: ProjectInput = await req.json();
    const { title, description, clientId, consultantId, milestones } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    // If a CLIENT is creating, enforce their own id
    const finalClientId = role === UserRole.CLIENT ? user.id : clientId;
    if (!finalClientId) {
      return NextResponse.json(
        { error: "Client ID is required (Admin must provide one)" },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description: description || "",
        status: ProjectStatus.NEW,
        client: { connect: { id: finalClientId } },
        consultant: consultantId ? { connect: { id: consultantId } } : undefined,
        milestones: milestones?.length
          ? {
              // ✅ milestones typed as MilestoneInput[]
              create: milestones.map((m) => ({
                title: m.title,
                description: m.description || "",
                amount: m.amount ?? 0,
                status: MilestoneStatus.PENDING,
                dueDate: m.dueDate ? new Date(m.dueDate) : undefined,
              })),
            }
          : undefined,
      },
      include: { client: true, consultant: true, milestones: true },
    });

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    console.error("New Project API Error (POST):", error);
    return NextResponse.json(
      { error: "Failed to create new project" },
      { status: 500 }
    );
  }
}

// ==========================
// FETCH new consultancy projects (role-based)
// ==========================
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const role = user.role ?? UserRole.CLIENT;

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const q = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "createdAt";
    const order = (searchParams.get("order") || "desc") as "asc" | "desc";
    const skip = (page - 1) * limit;

    // base filter: NEW projects only
    let where: Record<string, any> = { status: ProjectStatus.NEW };

    if (role === UserRole.CLIENT) {
      where.clientId = user.id;
    }
    if (role === UserRole.CONSULTANT) {
      return NextResponse.json(
        { error: "Consultants cannot view NEW projects" },
        { status: 403 }
      );
    }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    const validSortFields = ["title", "createdAt", "updatedAt"];
    const orderBy = validSortFields.includes(sort)
      ? { [sort]: order }
      : { createdAt: "desc" };

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: { client: true, consultant: true, milestones: true },
      }),
      prisma.project.count({ where }),
    ]);

    // ✅ Explicitly type `p` and `m`
    const projectsWithProgress = projects.map(
      (p: Project & { milestones: Milestone[] }) => {
        const totalMilestones = p.milestones.length;
        const completed = p.milestones.filter(
          (m: Milestone) => m.status === MilestoneStatus.COMPLETED
        ).length;

        return {
          ...p,
          progress: totalMilestones
            ? Math.round((completed / totalMilestones) * 100)
            : 0,
        };
      }
    );

    return NextResponse.json({
      projects: projectsWithProgress,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
      role,
    });
  } catch (error) {
    console.error("New Project API Error (GET):", error);
    return NextResponse.json(
      { error: "Failed to fetch new projects" },
      { status: 500 }
    );
  }
}
